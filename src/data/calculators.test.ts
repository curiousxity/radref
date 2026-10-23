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

  test('the knee MRI study and the Schatzker calculator link to the 3D knee and each other', () => {
    const knee = relatedTo('/knee').map((item) => item.path)
    expect(knee).toContain('/studies/knee-mri')
    expect(knee).toContain('/schatzker')
    expect(relatedTo('/schatzker').map((item) => item.path)).toContain('/studies/knee-mri')
  })

  test('the shoulder MRI study and the Neer calculator link to the 3D shoulder and each other', () => {
    const shoulder = relatedTo('/shoulder').map((item) => item.path)
    expect(shoulder).toContain('/studies/shoulder-mri')
    expect(shoulder).toContain('/neer')
    expect(relatedTo('/neer').map((item) => item.path)).toContain('/studies/shoulder-mri')
  })

  test('the elbow studies and the Mason calculator link to the 3D elbow', () => {
    const elbow = relatedTo('/elbow').map((item) => item.path)
    expect(elbow).toContain('/studies/elbow-mri')
    expect(elbow).toContain('/studies/pediatric-elbow')
    expect(elbow).toContain('/mason')
    expect(relatedTo('/mason').map((item) => item.path)).toContain('/studies/elbow-mri')
  })
})
