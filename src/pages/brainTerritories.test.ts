import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { FAMILIES } from '../components/brainTerritoryShapes'

const page = readFileSync(new URL('./BrainTerritoriesPage.tsx', import.meta.url), 'utf8')

// Every claim on the page was read in its paper first; the claims, verdicts and quoted evidence are
// in docs/superpowers/research/2026-11-02-brain-territories-sources.md (T-C numbers below).
describe('brain territories page', () => {
  // The map's "Read more" links go to these sections.
  test('every territory family has its section on the page', () => {
    for (const section of new Set(Object.values(FAMILIES).map((f) => f.section))) {
      expect(page, section).toContain(`id="${section}"`)
    }
  })

  // The sticky header would otherwise cover the heading a "Read more" link lands on.
  test('the section anchors clear the sticky header', () => {
    const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8')
    expect(page).toContain('className="page bt-page"')
    expect(css).toContain('.bt-page .info-card[id], .bt-page .fm-subhead[id] { scroll-margin-top: calc(var(--header-h) + 1rem); }')
  })

  test('every reference has a DOI', () => {
    const start = page.indexOf('const references')
    // The block ends at the closing bracket on its own line (the type annotation has a `]` too).
    const block = page.slice(start, page.indexOf('\n]', start))
    const citations = block.match(/citation:/g)?.length ?? 0
    expect(citations).toBeGreaterThan(5)
    expect(block.match(/doi: /g)?.length).toBe(citations)
  })

  test('the source note does not mark the page as an unchecked draft', () => {
    expect(page).not.toContain('Unchecked draft')
    expect(page).toContain('The drawings are schematics')
    expect(page).not.toContain('not yet reviewed')
  })

  // A high-riding jugular bulb is left off: no read source names it as a mimic (T-C158).
  test('the sinus thrombosis section has the mimics', () => {
    for (const mimic of ['arachnoid granulation', 'hypoplastic', 'flow gap', 'haematocrit']) {
      expect(page.toLowerCase(), mimic).toContain(mimic)
    }
    expect(page.toLowerCase()).not.toContain('jugular bulb')
  })

  // Tatu was read in abstract only, so the caption credits the open reviews for what is drawn.
  test('the map caption credits the reviews the territories were read in', () => {
    expect(page).toContain("Schematic axial levels, not scan planes; the patient's right is on the left, as on a scan.")
    expect(page).toContain('several of which draw on the sections of')
  })

  // T-C112, Lazzaro 2010: "1) bilateral paramedian thalamic with midbrain (43%), 2) bilateral
  // paramedian thalamic without midbrain (38%), 3) bilateral paramedian thalamic with anterior
  // thalamus and midbrain (14%), and 4) bilateral paramedian thalamic with anterior thalamus without
  // midbrain (5%)."
  test('the artery of Percheron patterns match Lazzaro', () => {
    expect(page).toContain('both paramedian thalami with the midbrain (43%), without the midbrain (38%), with the anterior thalami and midbrain (14%), and with the anterior thalami without the midbrain (5%)')
  })

  // T-C142, Sadik 2022: "To be positive, the sign of the empty delta must be visualized on several
  // sections. The empty delta sign is most often visible between 5 days and 2 months after the event."
  test('the empty delta sign is worded as Sadik gives it', () => {
    expect(page).toContain('it must be seen on several sections')
    expect(page).toContain('most often seen between 5 days and 2 months')
  })

  // T-C131, Sadik 2022: "parenchymal temporal lesions ipsilateral to the thrombosis and a
  // spontaneously hyperdense (CT) and hypersignal T1 (MRI) extra-axial band corresponding to the
  // thrombosed vein of Labbé".
  test('vein of Labbé thrombosis gives a temporal lesion on the same side', () => {
    expect(page).toContain('a temporal lesion on the same side as the thrombosis')
    expect(page).toContain('dense on CT and bright on T1')
  })

  // T-C133, Sadik 2022: "One of the differential diagnoses of straight sinus thrombosis is thrombosis
  // of the artery of Percheron." Lazzaro 2010: venous infarction does "not respect the specific
  // arterial territory of the paramedian or anterior thalamic arterial zones".
  test('bilateral thalami point to the deep veins or the artery of Percheron', () => {
    expect(page).toContain('Both thalami: think of the artery of Percheron and of straight sinus thrombosis')
    expect(page).toContain('does not keep to one thalamic arterial zone')
  })

  // T-C68, Zedde 2022: "The lateral medulla oblongata is mostly supplied by the circumferentially
  // penetrating branches from the VA, while the PICA supplies the remaining lateral and posterior
  // portion of the medulla oblongata."
  test('the lateral medulla is mostly vertebral, the rest PICA', () => {
    expect(page).toContain('mostly from circumferential branches of the vertebral artery; the PICA supplies the rest of the lateral and the posterior medulla')
  })

  // T-C94, Zedde 2022: paramedian penetrating branches "perforate the paramedian brainstem and never
  // cross the midline"; "At the midbrain level, midline infarctions can be visualized".
  test('paramedian medullary and pontine infarcts stop at the midline; midbrain ones can cross it', () => {
    expect(page).toContain('stop at the midline')
    expect(page).toContain('Midbrain infarcts can cross it')
  })

  // T-C151, Pai 2020 and Zedde 2025 (citing Ayanzen): "31% of non-dominant transverse sinuses
  // exhibited flow gaps, but none were seen in dominant transverse sinuses or the rest of the dural
  // venous system". Not a share "of normal people".
  test('flow gaps are given for non-dominant transverse sinuses only', () => {
    expect(page).toContain('31% of non-dominant transverse sinuses')
    expect(page).toContain('none in dominant transverse sinuses')
    expect(page).not.toContain('of normal people')
  })

  // T-C145, Sadik 2022, Table 4: "Less than 5 Days Old: T1 Isosignal, T2 Hypo/Isosignal; from D5 to
  // D30: T1 Hypersignal, T2 Iso/Hypersignal; Older than 1 Month: T1 Iso/Hypersignal, T2
  // Iso/Hypersignal".
  test('clot signal by age follows Sadik, Table 4', () => {
    expect(page).toContain('under 5 days, T1 iso and T2 iso to dark')
    expect(page).toContain('from 5 to 30 days, T1 bright and T2 iso to bright')
    expect(page).not.toContain('bright on both')
  })

  // T-C141: Li 2021, the cord sign "has a reported sensitivity ranging 25–64%"; Sadik 2022, CT
  // "results remain normal in 30% of cases". Oliveira's "one third" is for direct signs in general,
  // not plain CT, so it is not used.
  test('the cord sign sensitivity is given as a range, and a normal CT does not exclude thrombosis', () => {
    expect(page).toContain('25% to 64%')
    expect(page).toContain('a normal CT does not exclude thrombosis')
    expect(page).not.toContain('one third')
  })
})
