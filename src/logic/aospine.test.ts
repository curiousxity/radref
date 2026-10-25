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
    // A0 was given for no fracture at all. The thoracolumbar poster's algorithm: no body
    // fracture and "Vertebral process fracture" YES → "A0 Insignificant injury"; NO → "No injury".
    expect(aoBody({ endplates: 0 })).toBeUndefined()
    expect(aoBody({})).toBeUndefined()
    expect(aoBody({ endplates: 0, processFracture: true })).toBe('A0')
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
    expect(aoSpine({ processFracture: true })).toEqual({ type: 'A0' })
    expect(aoSpine({ posteriorTensionBand: 'bony', processFracture: true })).toEqual({ type: 'B1' })
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
    // The poster: "N3 Incomplete spinal cord injury or any degree of cauda equina injury".
    expect(aoNeuroDescription('N3', 'thoracolumbar')).toBe('incomplete spinal cord injury or any degree of cauda equina injury')
    expect(aoNeuroDescription('N3', 'subaxial')).toBe('incomplete spinal cord injury')
    expect(aoCode({ region: 'subaxial', morphology: { type: 'C' }, neuro: 'N3', compression: true })).toBe('C; N3+')
    expect(aoCode({ region: 'subaxial', morphology: { type: 'C' }, neuro: 'N4', compression: true })).toBe('C; N4')
    // The thoracolumbar poster lists "+ Continued spinal cord compression" without tying it to N3.
    expect(aoCode({ region: 'thoracolumbar', morphology: { type: 'C' }, neuro: 'N4', compression: true })).toBe('C (N4+)')
  })

  // The thoracolumbar poster's nomenclature examples: "T8-T9: C (T9: A3; N3; M2)" and "L1: A4 (N0; M1)".
  test('thoracolumbar code follows the poster', () => {
    expect(aoCode({ region: 'thoracolumbar', morphology: { type: 'C', body: 'A3' }, neuro: 'N3', modifiers: ['M2'] })).toBe('C (A3; N3; M2)')
    expect(aoCode({ region: 'thoracolumbar', morphology: { type: 'A4' }, neuro: 'N0', modifiers: ['M1'] })).toBe('A4 (N0; M1)')
    expect(aoCode({ region: 'thoracolumbar', morphology: { type: 'A1' } })).toBe('A1')
  })

  test('the full code and sentence', () => {
    const full = { region: 'subaxial' as const, morphology: { type: 'B2' as const, body: 'A1' as const }, facet: 'F4 BL', neuro: 'N1' as const, modifiers: ['M3'] }
    expect(aoCode(full)).toBe('B2 (A1); F4 BL; N1; M3')
    expect(aoSentence(full, 'C5–C6')).toBe('C5–C6: AO Spine subaxial cervical B2 (A1); F4 BL; N1; M3: posterior tension band failure through the ligaments, or through bone and ligament, with a type A1 vertebral body fracture.')
    expect(aoSentence({ region: 'thoracolumbar', morphology: { type: 'A3' } })).toBe('AO Spine thoracolumbar A3: incomplete burst fracture, through a single endplate and the posterior wall.')
  })
})
