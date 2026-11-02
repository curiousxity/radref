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
})

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
