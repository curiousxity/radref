import { describe, expect, test } from 'vitest'
import { isSearchShortcut } from './homeSearch'

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
