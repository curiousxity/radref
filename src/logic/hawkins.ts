/**
 * Hawkins classification of talar neck fractures (Hawkins, J Bone Joint Surg Am 1970), with
 * type IV added by Canale and Kelly (J Bone Joint Surg Am 1978). Shared by the Hawkins
 * calculator and the foot MRI study.
 *
 * Both papers are matched on PubMed (PMIDs 5479485, 417084) but paywalled. The four types, the
 * joints, the cumulative reading of the types (HK-5, from the review's classification figure) and
 * the Hawkins sign are checked against Alton, Patton and Gee's review (Clin Orthop Relat Res 2015;
 * claims HK-1 to HK-8 in docs/superpowers/research/2026-10-23-foot-calculators-sources.md). Type IV
 * follows the review's figure, which lists all three joints; its text says "ankle or subtalar"
 * (the author's decision, 2026-10-29).
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
  // HK-1, Alton: "a minimally displaced fracture line ... The talus retains its anatomic position
  // in the ankle and the subtalar joint remains reduced". Canale and Kelly's abstract: "non-displaced".
  I: 'undisplaced or minimally displaced fracture of the talar neck, with the subtalar and ankle joints in place',
  II: 'displaced fracture with subluxation or dislocation of the subtalar joint; the ankle joint is in place', // HK-2
  III: 'displaced fracture with the talar body dislocated from both the subtalar and the ankle joint', // HK-3
  // HK-4, Alton's Fig. 1: "Type IV is a talar neck fracture with subtalar, tibiotalar, and
  // talonavicular dislocations"; the text: "dislocation or subluxation of the head of the talus
  // from the talonavicular joint".
  IV: 'displaced fracture with subtalar and tibiotalar (ankle) dislocation, plus subluxation or dislocation of the talar head at the talonavicular joint',
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
 * HK-5: each type includes the joint injuries of the types before it (Alton's Fig. 1: type II
 * subtalar; III subtalar and tibiotalar; IV subtalar, tibiotalar and talonavicular). The earlier
 * types whose joint is not marked, for a "check" note (the site's handling).
 */
export function hawkinsGaps(input: HawkinsInput): HawkinsType[] {
  const type = hawkins(input)
  if (!type || type === 'I') return []
  return displacedTypes.slice(0, displacedTypes.indexOf(type)).filter((t) => input[jointOf[t]] !== true)
}

export function hawkinsSentence(type: HawkinsType): string {
  return `Talar neck fracture, Hawkins type ${type}: ${hawkinsDescriptions[type]}.`
}
