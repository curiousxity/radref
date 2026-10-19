/// <reference types="node" />
// The app tsconfig only loads vite/client types, so this file pulls in Node's for node:fs.
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  THEME_COLORS,
  THEME_KEY,
  clearStoredTheme,
  nextThemeChoice,
  parseStoredTheme,
  readStoredTheme,
  resolveTheme,
  themeToggleLabel,
  writeStoredTheme,
} from './theme'

describe('theme choice', () => {
  it('cycles system, light, dark, then back to system', () => {
    expect(nextThemeChoice('system')).toBe('light')
    expect(nextThemeChoice('light')).toBe('dark')
    expect(nextThemeChoice('dark')).toBe('system')
  })

  it('labels the toggle with the current choice and what a tap does', () => {
    expect(themeToggleLabel('system')).toBe('Theme: system. Switch to light')
    expect(themeToggleLabel('light')).toBe('Theme: light. Switch to dark')
    expect(themeToggleLabel('dark')).toBe('Theme: dark. Follow system')
  })

  it('clearing removes the key, so the system setting is followed', () => {
    const removed: string[] = []
    clearStoredTheme({ removeItem: (key) => { removed.push(key) } })
    expect(removed).toEqual([THEME_KEY])
  })

  it('clearing survives blocked storage', () => {
    expect(() => clearStoredTheme({ removeItem: () => { throw new Error('blocked') } })).not.toThrow()
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('SecurityError')
      },
    })
    try {
      expect(() => clearStoredTheme()).not.toThrow()
    } finally {
      if (original) Object.defineProperty(globalThis, 'localStorage', original)
      else delete (globalThis as { localStorage?: unknown }).localStorage
    }
  })
})

describe('theme', () => {
  it('parses only the two known values', () => {
    expect(parseStoredTheme('dark')).toBe('dark')
    expect(parseStoredTheme('light')).toBe('light')
    expect(parseStoredTheme('blue')).toBeNull()
    expect(parseStoredTheme(null)).toBeNull()
  })

  it('follows the system only when nothing is stored', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme(null, false)).toBe('light')
    expect(resolveTheme('light', true)).toBe('light')
  })

  it('treats blocked storage as nothing stored', () => {
    expect(readStoredTheme({ getItem: () => { throw new Error('blocked') } })).toBeNull()
    expect(() =>
      writeStoredTheme('dark', { setItem: () => { throw new Error('blocked') } }),
    ).not.toThrow()
  })

  it('survives a localStorage getter that throws', () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('SecurityError')
      },
    })
    try {
      expect(readStoredTheme()).toBeNull()
      expect(() => writeStoredTheme('dark')).not.toThrow()
    } finally {
      if (original) Object.defineProperty(globalThis, 'localStorage', original)
      else delete (globalThis as { localStorage?: unknown }).localStorage
    }
  })
})

// index.html cannot import THEME_COLORS: its pre-paint script and theme-color metas repeat
// the two backgrounds as literals.
describe('index.html theme colours', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')

  it('theme-color metas use THEME_COLORS', () => {
    const light = html.match(/<meta name="theme-color" media="\(prefers-color-scheme: light\)" content="([^"]+)"/)
    const dark = html.match(/<meta name="theme-color" media="\(prefers-color-scheme: dark\)" content="([^"]+)"/)
    expect(light?.[1]).toBe(THEME_COLORS.light)
    expect(dark?.[1]).toBe(THEME_COLORS.dark)
  })

  it('the pre-paint script uses THEME_COLORS', () => {
    const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? ''
    expect(script).toContain('radref-theme')
    const pick = script.match(/theme === 'dark' \? '(#[0-9a-fA-F]{6})' : '(#[0-9a-fA-F]{6})'/)
    expect(pick?.[1]).toBe(THEME_COLORS.dark)
    expect(pick?.[2]).toBe(THEME_COLORS.light)
    // No other colour literal hides in the script.
    expect(script.match(/#[0-9a-fA-F]{3,8}\b/g)?.sort()).toEqual([THEME_COLORS.dark, THEME_COLORS.light].sort())
  })
})
