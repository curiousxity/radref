/**
 * Hawkins classification of talar neck fractures (Hawkins, J Bone Joint Surg Am 1970), with
 * type IV added by Canale and Kelly (J Bone Joint Surg Am 1978). Shared by the Hawkins
 * calculator and the foot MRI study.
 *
 * Unchecked draft: both papers are matched on PubMed (PMIDs 5479485, 417084) but paywalled,
 * and Hawkins' has no abstract. Canale and Kelly's abstract names the first three groups
 * (non-displaced; subtalar subluxation or dislocation; complete dislocation of the body) and
 * the rising rate of osteonecrosis; type IV, the joint wording and the Hawkins sign are still
 * unchecked (claims HK-1 to HK-8 in docs/superpowers/research/2026-10-23-foot-calculators-sources.md).
 */

/** Whether the fracture is displaced, and which joints around the talus are subluxed or dislocated. */
export type HawkinsInput = {
  displaced?: boolean
  subtalar?: boolean
  ankle?: boolean
  talonavicular?: boolean
}

export type HawkinsType = 'I' | 'II' | 'III' | 'IV'

export const hawkinsTypes: HawkinsType[] = ['I', 'II', 'III', 'IV']

export const hawkinsDescriptions: Record<HawkinsType, string> = {
  I: 'undisplaced fracture of the talar neck', // HK-1
  II: 'displaced fracture with subluxation or dislocation of the subtalar joint; the ankle joint is in place', // HK-2
  III: 'displaced fracture with the talar body dislocated from both the subtalar and the ankle joint', // HK-3
  IV: 'as type III, with subluxation or dislocation of the talar head at the talonavicular joint', // HK-4
}

const jointOf: Record<Exclude<HawkinsType, 'I'>, keyof HawkinsInput> = {
  II: 'subtalar',
  III: 'ankle',
  IV: 'talonavicular',
}

const displacedTypes: Exclude<HawkinsType, 'I'>[] = ['II', 'III', 'IV']

/**
 * An undisplaced fracture is type I. A displaced one takes the highest type whose joint is
 * marked. A displaced fracture with no joint marked has no type (HK-6): Hawkins named none.
 */
export function hawkins(input: HawkinsInput): HawkinsType | undefined {
  if (input.displaced !== true) return 'I'
  return [...displacedTypes].reverse().find((type) => input[jointOf[type]] === true)
}

/**
 * HK-5: each type includes the joint injuries of the types before it. The earlier types
 * whose joint is not marked, for a "check" note.
 */
export function hawkinsGaps(input: HawkinsInput): HawkinsType[] {
  const type = hawkins(input)
  if (!type || type === 'I') return []
  return displacedTypes.slice(0, displacedTypes.indexOf(type)).filter((t) => input[jointOf[t]] !== true)
}

export function hawkinsSentence(type: HawkinsType): string {
  return `Talar neck fracture, Hawkins type ${type}: ${hawkinsDescriptions[type]}.`
}
