import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const page = readFileSync(new URL('./HaemorrhageMriPage.tsx', import.meta.url), 'utf8')

describe('haemorrhage on MRI page', () => {
  test('has the three table sections, each table named by its heading', () => {
    for (const id of ['haematoma', 'subdural', 'sah-microbleeds']) {
      expect(page, id).toContain(`id="${id}"`)
      expect(page, id).toContain(`aria-labelledby="${id}-title"`)
      expect(page, id).toContain(`id="${id}-title"`)
    }
  })

  test('the haematoma stages are in order', () => {
    const stages = ['Hyperacute', 'Acute', 'Early subacute', 'Late subacute', 'Chronic']
    const at = stages.map((stage) => page.indexOf(`stage: '${stage}'`))
    expect(at.every((i) => i > 0), JSON.stringify(at)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  test('the subdural stages are in order', () => {
    const block = page.slice(page.indexOf('const subduralStages'))
    const at = ['Acute', 'Subacute', 'Chronic'].map((stage) => block.indexOf(`stage: '${stage}'`))
    expect(at.every((i) => i > 0), JSON.stringify(at)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  test('every reference has a DOI', () => {
    const start = page.indexOf('const references')
    const block = page.slice(start, page.indexOf('\n]', start))
    const citations = block.match(/citation:/g)?.length ?? 0
    expect(citations).toBeGreaterThan(3)
    expect(block.match(/doi: /g)?.length).toBe(citations)
  })

  // Every cell was read in its paper first (docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md).
  test('the source note does not mark the page as an unchecked draft', () => {
    expect(page).not.toContain('Unchecked draft')
    expect(page).toContain('every statement was read in its source first')
  })

  // Weerink (H-C21): "The T1 signal remains high due to the persistent presence of inner sphere
  // relaxation" (late subacute, 7-28 days, extracellular methaemoglobin; H-C19, H-C20, H-C21).
  test('late subacute blood is bright on T1 and its methaemoglobin is outside the cells', () => {
    const row = page.slice(page.indexOf("stage: 'Late subacute'"), page.indexOf("stage: 'Chronic'"))
    expect(row).toContain("time: '7–28 days'")
    expect(row).toContain("product: 'Methaemoglobin, outside red cells'")
    expect(row).toContain("t1: 'Bright'")
  })

  // Weerink (H-C27, H-C29): chronic "low signal rim on SWI, T2WI"; Bradley (H-C26): "chronic
  // (ferritin and hemosiderin, short T2)".
  test('chronic haemosiderin is dark on T2 (rim) and SWI (rim)', () => {
    const row = page.slice(page.indexOf("stage: 'Chronic'"), page.indexOf('const subduralStages'))
    expect(row).toContain("product: 'Haemosiderin and ferritin'")
    expect(row).toContain("t2: 'Bright centre, dark rim'")
    expect(row).toContain("swi: 'Dark rim; centre varies'")
  })

  // Weerink (H-C2): "Hyper acute (<24 h) | Oxyhemoglobin"; (H-C4) the T2 signal "remains hyperintense
  // compared to the brain parenchyma".
  test('hyperacute blood is oxyhaemoglobin, under 24 hours, bright on T2', () => {
    const row = page.slice(page.indexOf("stage: 'Hyperacute'"), page.indexOf("stage: 'Acute'"))
    expect(row).toContain("time: 'Under 24 hours'")
    expect(row).toContain("product: 'Oxyhaemoglobin, in red cells'")
    expect(row).toContain("t2: 'Bright'")
  })

  // Wardlaw / STRIVE-1 (H-C62): "we do not recommend an absolute criterion for size"; "generally 2–5 mm
  // in diameter, but up to 10 mm".
  test('the microbleed size is a range with no fixed cut-off', () => {
    expect(page).toContain('Generally 2–5 mm, up to 10 mm; no fixed size cut-off, as blooming varies with field strength and sequence')
  })

  // Popescu MRI (H-C51): "the tSAH appears as fine lines with intense hypersignal" on FLAIR;
  // Weidauer: "hyperintense sulcal signal changes on fluid attenuated inversion recovery (FLAIR)".
  test('subarachnoid blood is bright on FLAIR', () => {
    expect(page).toContain('Bright sulci and cisterns on FLAIR')
  })

  // Charidimou (H-C65): the Boston v2.0 route is one of several, so it is labelled as one route.
  test('the Boston v2.0 criteria are labelled as one route to probable CAA', () => {
    expect(page).toContain('One route to probable CAA (Boston v2.0)')
  })

  // Deferred review notes on the sources document: wording the page must keep.
  test('wording fixes from the cell review', () => {
    expect(page).toContain("time: 'Up to 3 days'")
    expect(page).toContain("time: '4–21 days'")
    expect(page).toContain('Like brain to dark')
    expect(page).not.toContain('iso- to hypodense')
    expect(page).toContain('mixed density on CT suggests fresh blood in a chronic collection')
    expect(page).toContain('The acute FLAIR signal comes from a single paediatric case')
    expect(page).toContain('Multifocal cortical siderosis counts as two or more lobar bleeds towards probable CAA')
  })

  // Perry (H-C53): third generation CT, "neurologically intact adults" with headache peaking within one
  // hour, "interpreted by a qualified radiologist".
  test('the CT sensitivity for subarachnoid haemorrhage keeps Perry\'s cohort limits', () => {
    expect(page).toContain('near 100% sensitive within 6 hours of headache onset on modern CT, in neurologically intact adults, read by a qualified radiologist')
  })

  // Weidauer (H-C52): "T2* WI and SWI show often homogeneous signal loss".
  test('subarachnoid blood is often, not always, dark on SWI and T2* GRE', () => {
    expect(page).toContain('Often dark on SWI and T2* GRE')
  })

  // Weerink (H-C27): the chronic T1 signal "can be iso- or hyperintense due to residual methemoglobin".
  test('the chronic haematoma T1 cell keeps the residual methaemoglobin caveat', () => {
    expect(page).toContain("t1: 'Dark (can be like brain or bright from residual methaemoglobin)'")
  })

  // Tripathy (H-C39): subacute subdural haematomas are "iso to slightly hyperdense" on CT; Popescu: "isodense".
  test('the subacute subdural CT cell cites Tripathy for the slightly bright part', () => {
    const row = page.slice(page.indexOf("stage: 'Subacute'", page.indexOf('const subduralStages')), page.indexOf("stage: 'Chronic'", page.indexOf('const subduralStages')))
    expect(row).toContain('Like brain or slightly bright')
    expect(row).toContain('DOI.tripathy')
  })
})
