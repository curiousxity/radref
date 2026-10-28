import { existsSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { CALVARIUM_SOURCES, calvariumImages } from '../data/calvariumImages'

const publicDir = new URL('../../public/', import.meta.url)

// The scans are cropped from open-access figures published under CC BY 4.0 (Gomez et al., Insights
// Imaging 2018; Pons Escoda et al., Insights Imaging 2020; three case reports), which allows reuse
// with credit. Each must exist, stay small (they are cached for offline use), and name its source
// figure.
describe('calvarial lesions page images', () => {
  const images = Object.values(calvariumImages)

  test.each(images.map((image) => [image.src, image] as const))('%s exists and is small', (src) => {
    const file = new URL(src.slice(1), publicDir)
    expect(existsSync(file)).toBe(true)
    expect(statSync(file).size).toBeLessThan(40_000)
  })

  test('every image credits a CC BY source figure', () => {
    for (const image of images) {
      expect(Object.keys(CALVARIUM_SOURCES)).toContain(image.source)
      expect(image.figure).toMatch(/^Fig\. \d+[a-zA-Z]?$/)
      expect(image.alt.length).toBeGreaterThan(20)
    }
  })

  test('the page shows each image and the CC BY notice', () => {
    const page = readFileSync(new URL('./CalvariumPage.tsx', import.meta.url), 'utf8')
    for (const key of Object.keys(calvariumImages)) expect(page).toContain(`calvariumImages.${key}`)
    expect(page).toContain('{CC_BY}')
  })
})
