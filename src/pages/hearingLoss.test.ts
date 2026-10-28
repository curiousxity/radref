import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

// The scans are checked with every other page's in src/data/scans/scans.test.ts.
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
