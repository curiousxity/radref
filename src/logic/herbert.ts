/**
 * Herbert classification of scaphoid fractures (Herbert and Fisher, J Bone Joint Surg Br
 * 1984). Shared by the scaphoid fracture calculator and the wrist MRI study.
 *
 * The 1984 paper is paywalled; the types are checked against AO Surgery Reference's Herbert
 * classification page (Dráč, Kastelec, Suarez; citing Herbert's 1990 book), which adds B5,
 * comminuted (claims HB-1 to HB-5 in
 * docs/superpowers/research/2026-10-23-wrist-calculators-sources.md). Steinmann and Adams
 * (J Orthop Sci 2006) give the same list, B5 included, and word B2 as "displaced or mobile
 * fractures of the waist"; the author chose (2026-10-29) to keep AO's wording. Whether the 1984
 * paper itself has B5 is still unread.
 */

export type HerbertType = 'A1' | 'A2' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'C' | 'D1' | 'D2'

export const herbertTypes: HerbertType[] = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'B5', 'C', 'D1', 'D2']

export const herbertDescriptions: Record<HerbertType, string> = {
  A1: 'fracture of the tubercle', // HB-1
  A2: 'incomplete fracture through the waist', // HB-1
  B1: 'distal oblique fracture', // HB-2
  // HB-2, AO Surgery Reference: "B2 – complete waist fracture".
  B2: 'complete waist fracture',
  B3: 'proximal pole fracture', // HB-2
  B4: 'trans-scaphoid perilunate fracture-dislocation', // HB-2
  // HB-2: AO Surgery Reference, "B5 – comminuted fracture".
  B5: 'comminuted fracture',
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
