/**
 * Herbert classification of scaphoid fractures (Herbert and Fisher, J Bone Joint Surg Br
 * 1984). Shared by the scaphoid fracture calculator and the wrist MRI study.
 *
 * Unchecked draft: the type wording has not yet been checked against the paper (claims HB-1
 * to HB-5 in docs/superpowers/research/2026-10-23-wrist-calculators-sources.md).
 */

export type HerbertType = 'A1' | 'A2' | 'B1' | 'B2' | 'B3' | 'B4' | 'C' | 'D1' | 'D2'

export const herbertTypes: HerbertType[] = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'C', 'D1', 'D2']

export const herbertDescriptions: Record<HerbertType, string> = {
  A1: 'fracture of the tubercle', // HB-1
  A2: 'incomplete fracture through the waist', // HB-1
  B1: 'distal oblique fracture', // HB-2
  B2: 'complete fracture of the waist', // HB-2
  B3: 'proximal pole fracture', // HB-2
  B4: 'trans-scaphoid perilunate fracture-dislocation', // HB-2
  C: 'delayed union', // HB-3
  D1: 'established non-union, fibrous', // HB-4
  D2: 'established non-union, sclerotic (pseudarthrosis)', // HB-4
}

const groups: Record<string, string> = { A: 'acute stable', B: 'acute unstable', C: 'delayed union', D: 'non-union' }

/** HB-5: A is acute stable, B acute unstable, C delayed union, D non-union. */
export function herbertGroup(type: HerbertType): string {
  return groups[type.charAt(0)]
}

export function herbertSentence(type: HerbertType): string {
  return `Scaphoid fracture, Herbert type ${type} (${herbertGroup(type)}): ${herbertDescriptions[type]}.`
}
