import { describe, expect, it } from 'vitest'
import { parseStoredTheme, readStoredTheme, resolveTheme, writeStoredTheme } from './theme'

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
})
