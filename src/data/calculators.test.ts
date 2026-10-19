import { describe, expect, test } from 'vitest'
import { calculators } from './calculators'

describe('registry', () => {
  test('tags are short', () => {
    for (const item of calculators) {
      if (item.tag === undefined) continue
      expect(item.tag.length, item.path).toBeGreaterThan(0)
      expect(item.tag.length, item.path).toBeLessThanOrEqual(12)
    }
  })

  test('tags pin the tag rule: only a version the page states', () => {
    expect(calculators.find((i) => i.path === '/lungrads')?.tag).toBe('v2022')
    expect(calculators.find((i) => i.path === '/tirads')?.tag).toBeUndefined()
  })
})
