import { describe, expect, test } from 'vitest'
import { categories } from '../data/calculators'
import { categoriesForTab, homePanel, isSearchShortcut, parseHomeTab, queryAfterTabSelect, selectedTab, tabIndexForKey } from './homeTabs'

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

describe('homePanel', () => {
  test('shows the selected tab when there is no query', () => {
    expect(homePanel('studies', '')).toBe('studies')
    expect(homePanel('recent', '   ')).toBe('recent')
  })

  test('a non-blank query replaces any tab content with results', () => {
    expect(homePanel('calculators', 'knee')).toBe('search')
    expect(homePanel('anatomy', ' thyroid ')).toBe('search')
  })
})

describe('queryAfterTabSelect', () => {
  test('choosing a tab clears the search so that tab shows', () => {
    expect(queryAfterTabSelect()).toBe('')
    expect(homePanel('anatomy', queryAfterTabSelect())).toBe('anatomy')
  })
})

describe('tabIndexForKey', () => {
  test('arrows move one tab and wrap at either end', () => {
    expect(tabIndexForKey('ArrowRight', 0, 4)).toBe(1)
    expect(tabIndexForKey('ArrowRight', 3, 4)).toBe(0)
    expect(tabIndexForKey('ArrowLeft', 2, 4)).toBe(1)
    expect(tabIndexForKey('ArrowLeft', 0, 4)).toBe(3)
  })

  test('Home and End jump to the first and last tab', () => {
    expect(tabIndexForKey('Home', 2, 4)).toBe(0)
    expect(tabIndexForKey('End', 1, 4)).toBe(3)
  })

  test('other keys leave the tabs alone', () => {
    expect(tabIndexForKey('Enter', 1, 4)).toBeNull()
    expect(tabIndexForKey('ArrowDown', 1, 4)).toBeNull()
    expect(tabIndexForKey('/', 1, 4)).toBeNull()
  })
})

describe('selectedTab', () => {
  test('the shown tab is selected', () => {
    expect(selectedTab('anatomy', homePanel('anatomy', ''))).toBe('anatomy')
  })

  test('no tab is selected while search results show', () => {
    expect(selectedTab('anatomy', homePanel('anatomy', 'knee'))).toBeNull()
  })
})
