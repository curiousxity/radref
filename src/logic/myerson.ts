/**
 * Myerson classification of tarsometatarsal (Lisfranc) fracture-dislocations (Myerson et al.,
 * Foot Ankle 1986). Shared by the Myerson calculator and the foot MRI study.
 *
 * Unchecked draft: the type wording has not yet been checked against the paper (claims MY-1
 * to MY-6 in docs/superpowers/research/2026-10-23-foot-calculators-sources.md).
 */

/** How the first metatarsal is displaced at its tarsometatarsal joint. */
export type FirstRay = 'none' | 'medial' | 'with-lesser'

/** How many of the second to fifth metatarsals are displaced (laterally or dorsoplantar). */
export type LesserRays = 'none' | 'some' | 'all'

export type MyersonInput = { first: FirstRay; lesser: LesserRays }

export type MyersonType = 'A' | 'B1' | 'B2' | 'C1' | 'C2'

export const myersonTypes: MyersonType[] = ['A', 'B1', 'B2', 'C1', 'C2']

export const myersonDescriptions: Record<MyersonType, string> = {
  A: 'all five metatarsals displaced in one direction, laterally or dorsoplantar (homolateral)', // MY-1
  B1: 'the first metatarsal displaced medially', // MY-2
  B2: 'one or more of the lesser metatarsals displaced laterally', // MY-2
  C1: 'the first metatarsal displaced medially and some of the lesser metatarsals laterally', // MY-3
  C2: 'the first metatarsal displaced medially and all the lesser metatarsals laterally', // MY-3
}

const groups: Record<string, string> = { A: 'total incongruity', B: 'partial incongruity', C: 'divergent' }

/** MY-4: A total incongruity, B partial incongruity, C divergent. */
export function myersonGroup(type: MyersonType): string {
  return groups[type.charAt(0)]
}

/**
 * The type from the displacement pattern. Undefined when nothing is displaced, and for a
 * pattern Myerson did not name, such as the first metatarsal going laterally with only some
 * of the lesser ones (MY-6).
 */
export function myerson({ first, lesser }: MyersonInput): MyersonType | undefined {
  if (first === 'with-lesser') return lesser === 'all' ? 'A' : undefined
  if (first === 'medial') return lesser === 'none' ? 'B1' : lesser === 'some' ? 'C1' : 'C2'
  return lesser === 'none' ? undefined : 'B2'
}

export function myersonSentence(type: MyersonType): string {
  return `Tarsometatarsal (Lisfranc) fracture-dislocation, Myerson type ${type} (${myersonGroup(type)}): ${myersonDescriptions[type]}.`
}
