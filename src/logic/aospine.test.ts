import { describe, expect, test } from 'vitest'
import { aoBody, aoCode, aoFacetCode, aoFacetFracture, aoNeuroDescription, aoSentence, aoSpine } from './aospine'

/*
 * AO Spine subaxial cervical and thoracolumbar classification. Each case quotes its claim from
 * docs/superpowers/research/2026-10-23-spine-calculators-sources.md by ID. The papers are
 * matched on PubMed, but only the claims marked verified there were read in an abstract; the
 * rest of the wording is still from memory.
 */

describe('AO Spine morphology (unchecked)', () => {
  // AO-1: "A1 wedge (one endplate), A2 split or pincer (both), A3 incomplete burst (one endplate
  // and the posterior wall), A4 complete burst (both and the wall)."
  test('the vertebral body type from the endplates and posterior wall', () => {
    expect(aoBody({ endplates: 0 })).toBe('A0')
    expect(aoBody({})).toBe('A0')
    expect(aoBody({ endplates: 1 })).toBe('A1')
    expect(aoBody({ endplates: 2 })).toBe('A2')
    expect(aoBody({ endplates: 1, posteriorWall: true })).toBe('A3')
    expect(aoBody({ endplates: 2, posteriorWall: true })).toBe('A4')
    // A posterior wall fracture with no endplate fractured is not a named type.
    expect(aoBody({ endplates: 0, posteriorWall: true })).toBeUndefined()
  })

  // AO-2, AO-3, AO-4: C over B over A; B3 over B2 over B1.
  test('the most severe injury names the type', () => {
    expect(aoSpine({ endplates: 1 })).toEqual({ type: 'A1' })
    expect(aoSpine({ posteriorTensionBand: 'bony' })).toEqual({ type: 'B1' })
    expect(aoSpine({ posteriorTensionBand: 'ligamentous', endplates: 1, posteriorWall: true })).toEqual({ type: 'B2', body: 'A3' })
    expect(aoSpine({ anteriorTensionBand: true, posteriorTensionBand: 'ligamentous' })).toEqual({ type: 'B3' })
    expect(aoSpine({ translation: true, anteriorTensionBand: true, endplates: 2, posteriorWall: true })).toEqual({ type: 'C', body: 'A4' })
    expect(aoSpine({ posteriorWall: true })).toBeUndefined()
  })
})

describe('AO Spine subaxial facets (unchecked)', () => {
  // AO-6: "F1 under 1 cm and under 40% of the lateral mass; F2 1 cm or more, 40% or more, or displaced."
  test('F1 against F2 at 1 cm and 40%', () => {
    expect(aoFacetFracture(9, 39, false)).toBe('F1')
    expect(aoFacetFracture(10, 10, false)).toBe('F2')
    expect(aoFacetFracture(5, 40, false)).toBe('F2')
    expect(aoFacetFracture(5, 10, true)).toBe('F2')
  })

  // AO-7: the same injury on both sides is written with BL.
  test('the facet code by side', () => {
    expect(aoFacetCode('F4', 'F4')).toBe('F4 BL')
    expect(aoFacetCode('F2', 'F1')).toBe('F2 right, F1 left')
    expect(aoFacetCode(undefined, 'F3')).toBe('F3 left')
    expect(aoFacetCode()).toBe('')
  })
})

describe('AO Spine code and sentence (unchecked)', () => {
  // AO-8: N3 covers the cauda equina in the thoracolumbar system. AO-9: "+" for ongoing compression.
  test('neurology', () => {
    expect(aoNeuroDescription('N3', 'thoracolumbar')).toBe('incomplete spinal cord or cauda equina injury')
    expect(aoNeuroDescription('N3', 'subaxial')).toBe('incomplete spinal cord injury')
    expect(aoCode({ region: 'subaxial', morphology: { type: 'C' }, neuro: 'N3', compression: true })).toBe('C; N3+')
    expect(aoCode({ region: 'subaxial', morphology: { type: 'C' }, neuro: 'N4', compression: true })).toBe('C; N4')
  })

  test('the full code and sentence', () => {
    const full = { region: 'subaxial' as const, morphology: { type: 'B2' as const, body: 'A1' as const }, facet: 'F4 BL', neuro: 'N1' as const, modifiers: ['M3'] }
    expect(aoCode(full)).toBe('B2 (A1); F4 BL; N1; M3')
    expect(aoSentence(full, 'C5–C6')).toBe('C5–C6: AO Spine subaxial cervical B2 (A1); F4 BL; N1; M3: posterior tension band failure through the ligaments, with or without bone, with a type A1 vertebral body fracture.')
    expect(aoSentence({ region: 'thoracolumbar', morphology: { type: 'A3' } })).toBe('AO Spine thoracolumbar A3: incomplete burst fracture, through a single endplate and the posterior wall.')
  })
})
