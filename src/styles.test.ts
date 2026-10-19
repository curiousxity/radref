/// <reference types="node" />
// The app tsconfig only loads vite/client types, so this file pulls in Node's for node:fs.
// (A `?raw` import does not work here: vitest empties CSS imports.)
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { THEME_COLORS } from './lib/theme'

const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8')

// The light palette is the `:root { … }` block, the dark one the `[data-theme="dark"] { … }`
// block. A media query may redeclare a non-colour token on `:root` (the compact header height).
const ROOT_BLOCK = /:root\s*\{[^}]*\}/g
const DARK_BLOCK = /\[data-theme="dark"\]\s*\{[^}]*\}/g

function blocks(pattern: RegExp): string {
  return (css.match(pattern) ?? []).join('\n')
}

function colourTokens(block: string): Map<string, string> {
  const tokens = new Map<string, string>()
  for (const [, name, value] of block.matchAll(/(--color-[\w-]+)\s*:\s*([^;]+);/g)) {
    tokens.set(name, value.trim())
  }
  return tokens
}

describe('site stylesheet', () => {
  test('colour literals only appear in the token blocks', () => {
    const rest = css.replace(ROOT_BLOCK, '').replace(DARK_BLOCK, '')
    expect(rest.match(/#[0-9a-f]{3,8}\b/gi)).toBeNull()
    expect(rest.match(/rgba?\(/gi)).toBeNull()
  })

  test('dark theme defines every colour token', () => {
    const light = [...colourTokens(blocks(ROOT_BLOCK)).keys()].sort()
    const dark = [...colourTokens(blocks(DARK_BLOCK)).keys()].sort()
    expect(light.length).toBeGreaterThan(0)
    expect(dark).toEqual(light)
  })

  test('no serif face', () => {
    expect(css).not.toContain('Source Serif')
    expect(css).not.toContain('@font-face')
  })

  test('page backgrounds match the theme-color values', () => {
    expect(colourTokens(blocks(ROOT_BLOCK)).get('--color-bg')).toBe(THEME_COLORS.light)
    expect(colourTokens(blocks(DARK_BLOCK)).get('--color-bg')).toBe(THEME_COLORS.dark)
  })
})
