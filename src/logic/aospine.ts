/**
 * AO Spine injury classification for the subaxial cervical spine (Vaccaro et al., Eur Spine
 * J 2016) and the thoracolumbar spine (Vaccaro et al., Spine 2013). Both share the A, B and C
 * morphology; the subaxial system adds facet injuries. Shared by the AO Spine calculator and
 * the spine trauma CT study.
 *
 * Unchecked draft: both papers are matched on PubMed but paywalled. The thoracolumbar types,
 * order, neurology, modifiers and notation are checked against AO Spine's own thoracolumbar
 * poster (AO Foundation 2020, CC BY-NC-ND 4.0, hosted unchanged at
 * public/references/aospine-thoracolumbar-poster.pdf). The subaxial facets, neurology and
 * modifiers are still unchecked (claims AO-1 to AO-12 in
 * docs/superpowers/research/2026-10-23-spine-calculators-sources.md).
 */

export type AoRegion = 'subaxial' | 'thoracolumbar'

export type AoBody = 'A0' | 'A1' | 'A2' | 'A3' | 'A4'
export type AoType = AoBody | 'B1' | 'B2' | 'B3' | 'C'

export const aoTypes: AoType[] = ['A0', 'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C']
export const aoBodies: AoBody[] = ['A0', 'A1', 'A2', 'A3', 'A4']

/** AO-1 to AO-3, worded after the thoracolumbar poster. */
export const aoDescriptions: Record<AoType, string> = {
  // "Minor, nonstructural fractures, which do not compromise the structural integrity of the
  // spinal column such as transverse process or spinous process fractures." It said "no vertebral
  // body fracture, or ..."; the poster's algorithm gives no fracture at all as "No injury".
  A0: 'minor, non-structural fracture such as a transverse or spinous process fracture',
  A1: 'wedge-compression fracture of a single endplate, posterior wall intact',
  A2: 'split or pincer fracture of both endplates, posterior wall intact',
  A3: 'incomplete burst fracture, through a single endplate and the posterior wall',
  A4: 'complete burst fracture, through both endplates and the posterior wall',
  // "Monosegmental pure osseous failure of the posterior tension band. The classical Chance fracture."
  B1: 'monosegmental failure of the posterior tension band through bone only (the classic Chance fracture)',
  // "Bony and/or ligamentary failure of the posterior tension band together with a Type A fracture."
  B2: 'posterior tension band failure through the ligaments, or through bone and ligament',
  // "Anterior structures, especially the ALL are ruptured but there is a posterior hinge".
  B3: 'anterior tension band failure (hyperextension), the anterior longitudinal ligament torn with a posterior hinge',
  // "Displacement or dislocation ... Can be combined with subtypes of A or B."
  C: 'displacement or dislocation (translation)',
}

export type PosteriorTensionBand = 'intact' | 'bony' | 'ligamentous'

export type AoInput = {
  /** Displacement or translation beyond the physiological range, in any plane. */
  translation?: boolean
  anteriorTensionBand?: boolean
  posteriorTensionBand?: PosteriorTensionBand
  /** With no vertebral body fracture: a transverse or spinous process fracture (A0). */
  processFracture?: boolean
  /** Number of vertebral body endplates fractured. */
  endplates?: 0 | 1 | 2
  posteriorWall?: boolean
}

/**
 * AO-1: the vertebral body type from the endplates and the posterior wall. With no body fracture
 * it is A0 only when a process is fractured; otherwise there is no type A injury (the poster's
 * "No injury").
 */
export function aoBody(input: Pick<AoInput, 'endplates' | 'posteriorWall' | 'processFracture'>): AoBody | undefined {
  const endplates = input.endplates ?? 0
  if (endplates === 0) return !input.posteriorWall && input.processFracture ? 'A0' : undefined
  if (endplates === 1) return input.posteriorWall ? 'A3' : 'A1'
  return input.posteriorWall ? 'A4' : 'A2'
}

/**
 * AO-4: the most severe injury names the type, C over B over A, and B3 over B2 over B1. A B or
 * C injury also carries the vertebral body type when the body is fractured (AO-5).
 */
export function aoSpine(input: AoInput): { type: AoType; body?: AoBody } | undefined {
  const body = aoBody(input)
  const withBody = (type: AoType) => ({ type, ...(body && body !== 'A0' ? { body } : {}) })
  if (input.translation) return withBody('C')
  if (input.anteriorTensionBand) return withBody('B3')
  if (input.posteriorTensionBand === 'ligamentous') return withBody('B2')
  if (input.posteriorTensionBand === 'bony') return withBody('B1')
  return body ? { type: body } : undefined
}

export function aoGroup(type: AoType): string {
  return type === 'C' ? 'translation' : type.startsWith('B') ? 'tension band injury' : 'compression injury'
}

/* Subaxial facet injuries (AO-6). */

export type AoFacet = 'F1' | 'F2' | 'F3' | 'F4'

export const aoFacets: AoFacet[] = ['F1', 'F2', 'F3', 'F4']

export const aoFacetDescriptions: Record<AoFacet, string> = {
  F1: 'undisplaced facet fracture, fragment under 1 cm high and under 40% of the lateral mass',
  F2: 'facet fracture that may be unstable: fragment 1 cm or more high, 40% or more of the lateral mass, or displaced',
  F3: 'floating lateral mass (pedicle and lamina both fractured)',
  F4: 'pathological subluxation, or a perched or dislocated facet',
}

/** AO-6: F1 against F2 from the fragment, at 1 cm and 40% (the boundary is the site's reading). */
export function aoFacetFracture(heightMm: number, lateralMassPercent: number, displaced: boolean): AoFacet {
  return displaced || heightMm >= 10 || lateralMassPercent >= 40 ? 'F2' : 'F1'
}

/** AO-7: the same facet injury on both sides is written once with BL. */
export function aoFacetCode(right?: AoFacet, left?: AoFacet): string {
  if (right && right === left) return `${right} BL`
  return [right && `${right} right`, left && `${left} left`].filter(Boolean).join(', ')
}

/* Neurology and modifiers (AO-8 to AO-10). */

export type AoNeuro = 'N0' | 'N1' | 'N2' | 'N3' | 'N4' | 'NX'

export const aoNeuros: AoNeuro[] = ['N0', 'N1', 'N2', 'N3', 'N4', 'NX']

export function aoNeuroDescription(neuro: AoNeuro, region: AoRegion): string {
  return {
    N0: 'neurologically intact',
    N1: 'transient deficit, now resolved',
    N2: region === 'thoracolumbar' ? 'radicular symptoms' : 'radiculopathy',
    N3: region === 'thoracolumbar' ? 'incomplete spinal cord injury or any degree of cauda equina injury' : 'incomplete spinal cord injury',
    N4: 'complete spinal cord injury',
    NX: 'cannot be examined',
  }[neuro]
}

export const aoModifiers: Record<AoRegion, Record<string, string>> = {
  subaxial: {
    M1: 'posterior capsuloligamentous complex injury without complete disruption',
    M2: 'critical disc herniation',
    M3: 'stiffening or metabolic bone disease (DISH, ankylosing spondylitis, OPLL)',
    M4: 'vertebral artery abnormality',
  },
  thoracolumbar: {
    M1: 'indeterminate injury to the tension band on imaging, with or without MRI',
    M2: 'patient-specific comorbidity that may argue for or against surgery (such as ankylosing spondylitis, or burns over the injured spine)',
  },
}

export type AoFull = {
  region: AoRegion
  morphology: { type: AoType; body?: AoBody }
  facet?: string
  neuro?: AoNeuro
  /**
   * AO-9: continued spinal cord compression. The thoracolumbar poster lists "+" with the
   * neurology grades without tying it to one; the subaxial "+" is kept with N3 only (unchecked).
   */
  compression?: boolean
  modifiers?: string[]
}

/**
 * The code. Thoracolumbar follows the poster's nomenclature, the primary type then the secondary
 * injury, neurology and modifiers in brackets: "C (A3; N3; M2)", "A4 (N0; M1)". Subaxial keeps
 * the site's own notation, e.g. "B2 (A1); F4 BL; N3+; M3", until its paper is checked.
 */
export function aoCode({ region, morphology, facet, neuro, compression, modifiers = [] }: AoFull): string {
  if (region === 'thoracolumbar') {
    const inside = [morphology.body, neuro && `${neuro}${compression ? '+' : ''}`, ...modifiers].filter(Boolean)
    return `${morphology.type}${inside.length > 0 ? ` (${inside.join('; ')})` : ''}`
  }
  return [
    `${morphology.type}${morphology.body ? ` (${morphology.body})` : ''}`,
    facet,
    neuro && `${neuro}${compression && neuro === 'N3' ? '+' : ''}`,
    ...modifiers,
  ].filter(Boolean).join('; ')
}

const regionName: Record<AoRegion, string> = { subaxial: 'subaxial cervical', thoracolumbar: 'thoracolumbar' }

export function aoSentence(full: AoFull, level?: string): string {
  const { type, body } = full.morphology
  return `${level ? `${level}: ` : ''}AO Spine ${regionName[full.region]} ${aoCode(full)}: ${aoDescriptions[type]}${body ? `, with a type ${body} vertebral body fracture` : ''}.`
}
