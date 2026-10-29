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

  // The author's decisions of 2026-10-29 settled all five questions of the sources doc
  // (docs/superpowers/research/2026-10-28-hearing-loss-ct-sources.md). Two checklist points are
  // stated by neither Widmann nor Vogl (the sigmoid sinus; otosclerosis closing the round window),
  // so the note keeps "Unchecked draft" and names them.
  test('the source note marks the page as an unchecked draft and names what is still unsourced', () => {
    expect(page).toContain('Unchecked draft: written on 2026-10-28')
    expect(page).toContain('Still unsourced: two points in the cochlear implant checklist, the sigmoid sinus item')
  })

  // Item 46: Widmann et al. 2020 is the primary source for the implant checklist, with Vogl et al.
  // 2015 for the surgical anatomy; Young et al. 2014 (paediatric candidates) is supplementary only.
  test('the implant checklist is adapted from Widmann and Vogl, with Young for children', () => {
    expect(page).toContain('The preoperative cochlear-implant imaging checklist is adapted from')
    expect(page).toContain('with additional surgical-anatomy considerations from')
    expect(page).toContain('For children, see also <Cite doi={DOI.young}>')
  })

  // ACR Appropriateness Criteria, Hearing Loss and/or Vertigo, Variant 3: "MRI head and internal
  // auditory canal without IV contrast, or without and with IV contrast, is recommended for
  // evaluating patients with acquired sensorineural hearing loss." Not one-sided loss in general,
  // and not "with contrast" only.
  test('MRI first is worded as the ACR rates it', () => {
    expect(page).toContain('MRI of the head and internal auditory canals is usually appropriate, either without IV contrast or without and with IV')
    expect(page).not.toMatch(/MRI with contrast|MRI of the internal auditory canals with contrast|one-sided loss/)
  })

  // Verbist lists infectious, inflammatory and autoimmune causes and fracture, without "usually";
  // Buch et al. found chronic otomastoiditis, surgery, trauma, sickle cell disease and meningitis.
  test('labyrinthitis ossificans is not said to follow meningitis usually', () => {
    expect(page).toContain('following an infectious, inflammatory or other inner-ear insult, including meningitis, chronic otomastoiditis, trauma and temporal bone surgery')
    expect(page).not.toContain('usually after meningitis')
  })

  // Manski 1997, Kim 2013 and Jung and Park 2025 ("bilateral ELSTs are considered pathognomonic");
  // Bausch 2016: "The prevalence of VHL germline mutations in apparently sporadic ELSTs was 39%."
  test('a one-sided endolymphatic sac tumour does not exclude VHL', () => {
    expect(page).toContain('bilateral tumours strongly suggest VHL')
    expect(page).toContain('A one-sided tumour does not exclude it')
  })

  // Minor 2003 and Eberhard 2021: an inner-ear ("pseudo-conductive") air-bone gap; a radiological
  // dehiscence alone "is insufficient to make a diagnosis of SCDS".
  test('superior canal dehiscence separates the CT finding from the syndrome', () => {
    expect(page).toContain('"pseudo-conductive" hearing-loss pattern, through a third-window mechanism')
    expect(page).toContain('a dehiscence on CT is not the syndrome')
  })
})
