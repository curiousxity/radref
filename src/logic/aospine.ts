/**
 * AO Spine injury classification for the subaxial cervical spine (Vaccaro et al., Eur Spine
 * J 2016) and the thoracolumbar spine (Vaccaro et al., Spine 2013). Both share the A, B and C
 * morphology; the subaxial system adds facet injuries. Shared by the AO Spine calculator and
 * the spine trauma CT study.
 *
 * Unchecked draft: the wording has not yet been checked against the papers (claims AO-1 to
 * AO-12 in docs/superpowers/research/2026-10-23-spine-calculators-sources.md).
 */

export type AoRegion = 'subaxial' | 'thoracolumbar'

export type AoBody = 'A0' | 'A1' | 'A2' | 'A3' | 'A4'
export type AoType = AoBody | 'B1' | 'B2' | 'B3' | 'C'

export const aoTypes: AoType[] = ['A0', 'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'C']
export const aoBodies: AoBody[] = ['A0', 'A1', 'A2', 'A3', 'A4']

export const aoDescriptions: Record<AoType, string> = {
  A0: 'no vertebral body fracture, or a minor fracture that does not affect stability (spinous or transverse process, lamina)', // AO-1
  A1: 'wedge-compression fracture of a single endplate, posterior wall intact', // AO-1
  A2: 'split or pincer fracture of both endplates, posterior wall intact', // AO-1
  A3: 'incomplete burst fracture, through a single endplate and the posterior wall', // AO-1
  A4: 'complete burst fracture, through both endplates and the posterior wall', // AO-1
  B1: 'posterior tension band failure through bone only (transosseous, Chance)', // AO-2
  B2: 'posterior tension band failure through the ligaments, with or without bone', // AO-2
  B3: 'anterior tension band failure (hyperextension)', // AO-2
  C: 'translation or displacement in any direction', // AO-3
}

export type PosteriorTensionBand = 'intact' | 'bony' | 'ligamentous'

export type AoInput = {
  /** Displacement or translation beyond the physiological range, in any plane. */
  translation?: boolean
  anteriorTensionBand?: boolean
  posteriorTensionBand?: PosteriorTensionBand
  /** Number of vertebral body endplates fractured. */
  endplates?: 0 | 1 | 2
  posteriorWall?: boolean
}

/** AO-1: the vertebral body type from the endplates and the posterior wall. */
export function aoBody(input: Pick<AoInput, 'endplates' | 'posteriorWall'>): AoBody | undefined {
  const endplates = input.endplates ?? 0
  if (endplates === 0) return input.posteriorWall ? undefined : 'A0'
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
    N2: 'radiculopathy',
    N3: region === 'thoracolumbar' ? 'incomplete spinal cord or cauda equina injury' : 'incomplete spinal cord injury',
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
    M1: 'indeterminate injury to the tension band, on imaging or examination',
    M2: 'patient-specific comorbidity (such as ankylosing spondylitis or DISH)',
  },
}

export type AoFull = {
  region: AoRegion
  morphology: { type: AoType; body?: AoBody }
  facet?: string
  neuro?: AoNeuro
  /** AO-9: ongoing cord compression with an incomplete deficit. */
  compression?: boolean
  modifiers?: string[]
}

/** The code, e.g. "B2 (A1); F4 BL; N3+; M3". The vertebral body type in brackets is the site's notation. */
export function aoCode({ morphology, facet, neuro, compression, modifiers = [] }: AoFull): string {
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
