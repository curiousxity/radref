/**
 * Schatzker classification of tibial plateau fractures (Schatzker et al., Clin Orthop Relat
 * Res 1979). Shared by the Schatzker calculator and the knee MRI study's bones step.
 *
 * Unchecked draft: the type wording has not yet been checked against the paper (claims
 * SZ-1 to SZ-6 in docs/superpowers/research/2026-10-23-knee-mri-sources.md).
 */

export type Plateau = 'lateral' | 'medial' | 'both'
/** How the lateral plateau is broken. Only read for a lateral fracture. */
export type LateralPattern = 'split' | 'split-depression' | 'depression'

export type SchatzkerInput = {
  plateau?: Plateau
  pattern?: LateralPattern
  /** Does the fracture separate the metaphysis from the diaphysis? */
  dissociation?: boolean
}

export type SchatzkerType = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI'

export type SchatzkerResult = {
  type: SchatzkerType
  /** The type's description, worded to start mid-sentence. */
  description: string
}

export const schatzkerDescriptions: Record<SchatzkerType, string> = {
  I: 'pure split of the lateral plateau',
  II: 'split with depression of the lateral plateau',
  III: 'pure depression of the lateral plateau',
  IV: 'fracture of the medial plateau',
  V: 'bicondylar fracture',
  VI: 'plateau fracture with dissociation of the metaphysis from the diaphysis',
}

const lateralTypes: Record<LateralPattern, SchatzkerType> = {
  split: 'I', // SZ-1
  'split-depression': 'II', // SZ-2
  depression: 'III', // SZ-3
}

/** The Schatzker type, or undefined while the answers so far do not decide it. */
export function schatzker(input: SchatzkerInput): SchatzkerResult | undefined {
  const type = schatzkerType(input)
  return type && { type, description: schatzkerDescriptions[type] }
}

function schatzkerType({ plateau, pattern, dissociation }: SchatzkerInput): SchatzkerType | undefined {
  // SZ-6: dissociation makes it type VI whatever the plateaus, so it is decided first.
  if (dissociation === true) return 'VI'
  if (dissociation === undefined) return undefined
  if (plateau === 'both') return 'V' // SZ-5
  if (plateau === 'medial') return 'IV' // SZ-4
  if (plateau === 'lateral') return pattern && lateralTypes[pattern]
  return undefined
}

/** One report sentence, e.g. "Tibial plateau fracture, Schatzker type II: split with depression of the lateral plateau." */
export function schatzkerSentence(result: SchatzkerResult, depressionMm?: number): string {
  const depth = depressionMm !== undefined ? `, articular depression ${depressionMm} mm` : ''
  return `Tibial plateau fracture, Schatzker type ${result.type}: ${result.description}${depth}.`
}
