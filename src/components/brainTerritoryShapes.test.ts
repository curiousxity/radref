/// <reference types="node" />
// The app tsconfig only loads vite/client types, so this file pulls in Node's for node:fs.
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { reach, sector } from './brainTerritoryGeometry'
import { FAMILIES, LEVELS } from './brainTerritoryShapes'
import type { Family } from './brainTerritoryShapes'

const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8')
const LIGHT = (css.match(/:root\s*\{[^}]*\}/g) ?? []).join('\n')
const DARK = (css.match(/\[data-theme="dark"\]\s*\{[^}]*\}/g) ?? []).join('\n')

function token(block: string, name: string): string | undefined {
  return block.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-f]{6})\\s*;`, 'i'))?.[1]
}

// WCAG relative luminance and contrast ratio.
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('brain territory geometry', () => {
  const oval = { cx: 100, cy: 100, a: 50, b: 80, n: 2.5 }

  test('reach finds the edge of the oval', () => {
    expect(reach(oval, { x: 100, y: 100 }, 0)).toBeCloseTo(80, 1)
    expect(reach(oval, { x: 100, y: 100 }, 90)).toBeCloseTo(50, 1)
  })

  test('a sector is a closed path of finite numbers', () => {
    const d = sector(oval, { x: 110, y: 100 }, 300, 60, 0.4, 1)
    expect(d.startsWith('M')).toBe(true)
    expect(d.endsWith('Z')).toBe(true)
    expect(d).not.toMatch(/NaN|Infinity/)
  })

  // One closed loop would need a seam from the outer edge to the inner, drawn as a boundary line.
  test('a full ring is two loops, the outer and the inner, with no seam', () => {
    const d = sector(oval, { x: 100, y: 100 }, 0, 360, 0.45, 1)
    expect(d.match(/M/g)).toHaveLength(2)
    expect(d.match(/Z/g)).toHaveLength(2)
  })
})

// The vertices of a path built by the geometry module (M x y L x y ... Z).
function vertices(d: string) {
  const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number)
  return Array.from({ length: n.length / 2 }, (_, i) => ({ x: n[2 * i], y: n[2 * i + 1] }))
}

function insidePolygon(p: { x: number; y: number }, polygon: { x: number; y: number }[]) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [a, b] = [polygon[i], polygon[j]]
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside
  }
  return inside
}

describe('brain territory data', () => {
  test('six axial levels, each with arterial and venous territories', () => {
    expect(LEVELS.map((level) => level.id)).toEqual(['medulla', 'pons', 'midbrain', 'basal-ganglia', 'corona-radiata', 'centrum-semiovale'])
    for (const level of LEVELS) {
      expect(level.parts.flatMap((part) => part.arterial).length, level.id).toBeGreaterThan(0)
      expect(level.parts.flatMap((part) => part.venous).length, level.id).toBeGreaterThan(0)
    }
  })

  test('each territory is in its own mode, has a unique id and a finite path', () => {
    for (const level of LEVELS) {
      for (const mode of ['arterial', 'venous'] as const) {
        const territories = level.parts.flatMap((part) => part[mode])
        expect(new Set(territories.map((t) => t.id)).size, `${level.id} ${mode}`).toBe(territories.length)
        for (const t of territories) {
          expect(FAMILIES[t.family].mode, t.id).toBe(mode)
          expect(t.d, t.id).not.toMatch(/NaN|Infinity/)
          expect(t.name.length, t.id).toBeGreaterThan(3)
          expect(t.supply.length, t.id).toBeGreaterThan(3)
        }
      }
      for (const zone of level.borderZones) expect(zone.family, zone.id).toBe('borderZone')
    }
  })

  // A nucleus or ventricle crossing the edge would open onto the medial surface.
  test('the basal ganglia nuclei and ventricles lie inside the hemisphere', () => {
    const level = LEVELS.find((l) => l.id === 'basal-ganglia')!
    const hemisphere = vertices(level.parts[0].outline)
    const deep = level.parts.slice(1).flatMap((p) => [...p.arterial, ...p.venous]).map((t) => [t.id, t.d])
    const ventricles = level.ventricles.map((d, i) => [`ventricle ${i}`, d])
    for (const [id, d] of [...deep, ...ventricles]) {
      for (const p of vertices(d)) expect(insidePolygon(p, hemisphere), `${id} at ${p.x} ${p.y}`).toBe(true)
    }
  })

  test('every family is drawn at some level', () => {
    const used = new Set<Family>(LEVELS.flatMap((level) => [...level.parts.flatMap((p) => [...p.arterial, ...p.venous]), ...level.borderZones]).map((t) => t.family))
    expect([...used].sort()).toEqual((Object.keys(FAMILIES) as Family[]).sort())
  })

  // Each fill is separated from its neighbours by a line in the figure background colour, so
  // keeping 3:1 against that colour keeps every boundary visible in both themes.
  test.each(Object.entries(FAMILIES))('%s has a token in both palettes with 3:1 on the figure background', (_, info) => {
    for (const block of [LIGHT, DARK]) {
      const fill = token(block, info.token)
      const bg = token(block, '--color-figure-bg')
      expect(fill, info.token).toBeDefined()
      expect(contrast(fill!, bg!), info.token).toBeGreaterThanOrEqual(3)
    }
  })
})
