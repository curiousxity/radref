/**
 * Myerson classification of tarsometatarsal (Lisfranc) fracture-dislocations (Myerson et al.,
 * Foot Ankle 1986). Shared by the Myerson calculator and the foot MRI study.
 *
 * Not labelled "Unchecked draft" (the author's choice, 2026-10-29): the paper is matched on PubMed (PMID 3710321) but paywalled, and its abstract
 * does not give the types. The five types are checked against the tables in Diebal et al. (Sports
 * Health 2013) and Tzatzairis et al. (World J Orthop 2019), and the A, B2 and C1 wording follows
 * the author's decision of 2026-10-29 as far as those tables support it. B2 states the alignment of
 * the first metatarsal with the medial cuneiform, not that the first joint is intact (author's
 * decision, 2026-10-29, second round; Gupta et al., Curr Probl Diagn Radiol 2008); whether the paper names
 * any further pattern (MY-6) is still unchecked (claims MY-1 to MY-6 in
 * docs/superpowers/research/2026-10-23-foot-calculators-sources.md). The later proposed type D
 * for subtle injuries is not part of the 1986 types and is not output here; the page and the
 * study describe it in a note.
 */

/** How the first metatarsal is displaced at its tarsometatarsal joint. */
export type FirstRay = 'none' | 'medial' | 'with-lesser'

/** How many of the second to fifth metatarsals are displaced (laterally, or with the first in type A). */
export type LesserRays = 'none' | 'some' | 'all'

export type MyersonInput = { first: FirstRay; lesser: LesserRays }

export type MyersonType = 'A' | 'B1' | 'B2' | 'C1' | 'C2'

export const myersonTypes: MyersonType[] = ['A', 'B1', 'B2', 'C1', 'C2']

export const myersonDescriptions: Record<MyersonType, string> = {
  // MY-1, Tzatzairis: "Dislocation of M1-M5 in the same direction". Was "in one direction,
  // laterally or dorsoplantar (homolateral)"; open sources differ on the direction (MY-1 note).
  A: 'all five metatarsals displaced together in the same direction',
  B1: 'the first metatarsal displaced medially', // MY-2
  // MY-2, Diebal: "Lateral dislocations—involving any of the 4 lateral metatarsals"; the first is
  // B1's alone ("involving only the M1 joint", Tzatzairis). Alignment, not "in place" or "intact":
  // Gupta 2008, Fig. 7, "The alignment of the first metatarsal and first cuneiform appears to be
  // within normal limits ... this would have been classified as a Type B, lateral dislocation".
  B2: 'lateral displacement of one or more of metatarsals 2 to 5, with maintained alignment of the first metatarsal with the medial cuneiform',
  // MY-3, Tzatzairis: "Divergent, incomplete dislocation involving M1 and some of the lateral metatarsals".
  C1: 'the first metatarsal displaced medially and some, but not all, of metatarsals 2 to 5 laterally (partial divergence)',
  C2: 'the first metatarsal displaced medially and all of metatarsals 2 to 5 laterally', // MY-3
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
