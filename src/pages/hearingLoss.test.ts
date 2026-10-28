import { existsSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { HEARING_LOSS_SOURCES, hearingLossImages } from '../data/hearingLossImages'
import type { HearingLossImage } from '../data/hearingLossImages'

const publicDir = new URL('../../public/', import.meta.url)
const images: HearingLossImage[] = Object.values(hearingLossImages)

// The scans are cropped from open-access figures published under CC BY, which allows reuse and
// adaptation with credit; non-commercial or no-derivatives licences would not. An entry without
// `src` is a planned slot the page skips.
describe('hearing loss CT page images', () => {
  const ready = images.filter((image) => image.src)

  test.each(ready.map((image) => [image.src, image] as const))('%s exists and is small', (src) => {
    const file = new URL(String(src).slice(1), publicDir)
    expect(existsSync(file)).toBe(true)
    expect(statSync(file).size).toBeLessThan(40_000)
  })

  test('every image, planned or added, credits a CC BY source figure', () => {
    for (const image of images) {
      expect(Object.keys(HEARING_LOSS_SOURCES)).toContain(image.source)
      expect(HEARING_LOSS_SOURCES[image.source].licence).toMatch(/^CC BY \d\.\d$/)
      expect(image.figure).toMatch(/^Fig\. \d+[a-zA-Z]?$/)
      expect(image.alt.length).toBeGreaterThan(20)
      if (image.src) expect(image.src).toMatch(/^\/hearing-loss\/[a-z0-9-]+\.jpg$/)
    }
  })

  test('the page uses each image and shows the CC BY notice', () => {
    const page = readFileSync(new URL('./HearingLossCtPage.tsx', import.meta.url), 'utf8')
    for (const key of Object.keys(hearingLossImages)) expect(page).toContain(`hearingLossImages.${key}`)
    expect(page).toContain('{CC_BY}')
    expect(page).toContain('cropped ({source.licence})')
  })
})

describe('hearing loss CT page rules', () => {
  const page = readFileSync(new URL('./HearingLossCtPage.tsx', import.meta.url), 'utf8')

  // Vijayasekaran 2007 (the Cincinnati criteria, as in the temporal bone CT study): "midpoint
  // >= 1.0 mm or operculum >= 2.0 mm" is enlarged.
  test('the vestibular aqueduct thresholds match the temporal bone CT study', () => {
    expect(page).toContain('midpoint is 1.0 mm or more')
    expect(page).toContain('2.0 mm or more')
  })

  // Lee et al. 2009 grading, the same scheme the temporal bone CT study uses.
  test('otosclerosis grades follow Lee et al.', () => {
    expect(page).toContain('Fenestral only is grade 1')
    expect(page).toContain('2A basal turn, 2B middle or apical turns, 2C both, 3 diffuse confluent')
  })

  // Little and Kesser 2006: otic capsule-violating fractures had 25x the SNHL, 5x the facial
  // nerve injury and 8x the CSF leak.
  test('fracture risk figures match Little and Kesser', () => {
    expect(page).toContain('25 times the sensorineural hearing loss, 5 times the facial nerve injury and 8 times the CSF leak')
  })

  test('the source note marks the page as an unchecked draft', () => {
    expect(page).toContain('Unchecked draft, written on 2026-10-28')
  })
})
