import { describe, expect, test } from 'vitest'
import { categories } from '../data/calculators'
import { categoriesForTab, isSearchShortcut, parseHomeTab } from './homeTabs'

describe('parseHomeTab', () => {
  test('reads a known tab from the query string', () => {
    expect(parseHomeTab('studies')).toBe('studies')
    expect(parseHomeTab('anatomy')).toBe('anatomy')
    expect(parseHomeTab('recent')).toBe('recent')
  })

  test('falls back to calculators for an unknown or missing tab', () => {
    expect(parseHomeTab('bogus')).toBe('calculators')
    expect(parseHomeTab(null)).toBe('calculators')
  })
})

describe('categoriesForTab', () => {
  test('calculators holds every category except Studies and Anatomy', () => {
    const names = categoriesForTab('calculators', categories).map((c) => c.name)
    expect(names).not.toContain('Studies')
    expect(names).not.toContain('Anatomy')
    expect(names).toContain('Trauma')
    expect(names).toEqual(categories.map((c) => c.name).filter((n) => n !== 'Studies' && n !== 'Anatomy'))
  })

  test('studies and anatomy each hold their own category', () => {
    expect(categoriesForTab('studies', categories).map((c) => c.name)).toEqual(['Studies'])
    expect(categoriesForTab('anatomy', categories).map((c) => c.name)).toEqual(['Anatomy'])
  })
})

describe('isSearchShortcut', () => {
  const key = (overrides: Partial<Parameters<typeof isSearchShortcut>[0]> = {}) => ({
    key: '/',
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    defaultPrevented: false,
    target: { tagName: 'BODY' } as unknown as EventTarget,
    ...overrides,
  })

  test('a plain / outside a field focuses search', () => {
    expect(isSearchShortcut(key())).toBe(true)
    expect(isSearchShortcut(key({ target: { tagName: 'A' } as unknown as EventTarget }))).toBe(true)
  })

  test('never fires while typing in a field', () => {
    for (const tagName of ['INPUT', 'TEXTAREA', 'SELECT']) {
      expect(isSearchShortcut(key({ target: { tagName } as unknown as EventTarget }))).toBe(false)
    }
    expect(isSearchShortcut(key({ target: { tagName: 'DIV', isContentEditable: true } as unknown as EventTarget }))).toBe(false)
  })

  test('never fires with a modifier, another key, or an already-handled event', () => {
    expect(isSearchShortcut(key({ ctrlKey: true }))).toBe(false)
    expect(isSearchShortcut(key({ metaKey: true }))).toBe(false)
    expect(isSearchShortcut(key({ altKey: true }))).toBe(false)
    expect(isSearchShortcut(key({ key: '?' }))).toBe(false)
    expect(isSearchShortcut(key({ defaultPrevented: true }))).toBe(false)
  })
})
