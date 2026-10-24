/**
 * Schatzker classification of tibial plateau fractures (Schatzker et al., Clin Orthop Relat
 * Res 1979), with the type III subtypes as Markhardt et al. (Radiographics 2009) give them.
 * Shared by the Schatzker calculator and the knee MRI study's bones step.
 *
 * Unchecked draft: Schatzker 1979 has no abstract on PubMed, so the types are checked against
 * Markhardt's abstract (claims SZ-1 to SZ-6 in
 * docs/superpowers/research/2026-10-23-knee-mri-sources.md). How type IV is broken (SZ-4) is
 * still unchecked.
 */

export type Plateau = 'lateral' | 'medial' | 'both'
/** How the lateral plateau is broken. Only read for a lateral fracture. */
export type LateralPattern = 'split' | 'split-depression' | 'depression'
/** Where a pure depression sits (SZ-3: Markhardt's IIIA lateral, IIIB central). Only read for a pure depression. */
export type DepressionSite = 'lateral' | 'central'

export type SchatzkerInput = {
  plateau?: Plateau
  pattern?: LateralPattern
  depressionSite?: DepressionSite
  /** Does the fracture separate the metaphysis from the diaphysis? */
  dissociation?: boolean
}

export type SchatzkerType = 'I' | 'II' | 'III' | 'IIIA' | 'IIIB' | 'IV' | 'V' | 'VI'

/** Every type in order, for the reference tables. */
export const schatzkerTypes: SchatzkerType[] = ['I', 'II', 'III', 'IIIA', 'IIIB', 'IV', 'V', 'VI']

export type SchatzkerResult = {
  type: SchatzkerType
  /** The type's description, worded to start mid-sentence. */
  description: string
}

export const schatzkerDescriptions: Record<SchatzkerType, string> = {
  I: 'pure split of the lateral plateau',
  II: 'split with depression of the lateral plateau',
  III: 'pure depression of the lateral plateau',
  // SZ-3: Markhardt, "compression fracture of the lateral (type IIIA) or central (type IIIB) plateau".
  IIIA: 'compression fracture of the lateral plateau',
  IIIB: 'compression fracture of the central plateau',
  IV: 'fracture of the medial plateau',
  V: 'bicondylar fracture',
  VI: 'plateau fracture with dissociation of the metaphysis from the diaphysis',
}

const lateralTypes: Record<LateralPattern, SchatzkerType> = {
  split: 'I', // SZ-1
  'split-depression': 'II', // SZ-2
  depression: 'III', // SZ-3
}

// SZ-3: a pure depression is IIIA when lateral and IIIB when central; III while the site is not given.
const depressionTypes: Record<DepressionSite, SchatzkerType> = { lateral: 'IIIA', central: 'IIIB' }

/** The Schatzker type, or undefined while the answers so far do not decide it. */
export function schatzker(input: SchatzkerInput): SchatzkerResult | undefined {
  const type = schatzkerType(input)
  return type && { type, description: schatzkerDescriptions[type] }
}

function schatzkerType({ plateau, pattern, depressionSite, dissociation }: SchatzkerInput): SchatzkerType | undefined {
  // SZ-6: dissociation makes it type VI whatever the plateaus, so it is decided first.
  if (dissociation === true) return 'VI'
  if (dissociation === undefined) return undefined
  if (plateau === 'both') return 'V' // SZ-5
  if (plateau === 'medial') return 'IV' // SZ-4
  if (plateau === 'lateral' && pattern === 'depression' && depressionSite) return depressionTypes[depressionSite]
  if (plateau === 'lateral') return pattern && lateralTypes[pattern]
  return undefined
}

/** One report sentence, e.g. "Tibial plateau fracture, Schatzker type II: split with depression of the lateral plateau." */
export function schatzkerSentence(result: SchatzkerResult, depressionMm?: number): string {
  const depth = depressionMm !== undefined ? `, articular depression ${depressionMm} mm` : ''
  return `Tibial plateau fracture, Schatzker type ${result.type}: ${result.description}${depth}.`
}
