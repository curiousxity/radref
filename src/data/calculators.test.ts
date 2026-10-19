import { describe, expect, test } from 'vitest'
import { calculators, relatedTo } from './calculators'

describe('registry', () => {
  test('tags are short', () => {
    for (const item of calculators) {
      if (item.tag === undefined) continue
      expect(item.tag.length, item.path).toBeGreaterThan(0)
      expect(item.tag.length, item.path).toBeLessThanOrEqual(12)
    }
  })

  test('tags pin the tag rule: only a version the page states', () => {
    const byPath = (path: string) => {
      const item = calculators.find((i) => i.path === path)
      expect(item, path).toBeDefined()
      return item
    }
    expect(byPath('/lungrads')?.tag).toBe('v2022')
    // The TI-RADS page's title row states "ACR 2017", so the home row may carry it.
    expect(byPath('/tirads')?.tag).toBe('ACR 2017')
  })

  test('the ankle MRI study links to the 3D ankle, both ways', () => {
    // The study declares related: ['/ankle']; relatedTo makes it show on the ankle page too.
    expect(relatedTo('/ankle').map((item) => item.path)).toContain('/studies/ankle-mri')
    expect(relatedTo('/studies/ankle-mri').map((item) => item.path)).toContain('/ankle')
  })
})
