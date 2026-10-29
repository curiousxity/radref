/**
 * Young-Burgess classification of pelvic ring injuries by force vector (Young et al.,
 * Radiology 1986; Burgess et al., J Trauma 1990). Shared by the Young-Burgess calculator and
 * the pelvis CT study.
 *
 * The 1986 and 1990 papers are paywalled; the type wording and the 2.5 cm are checked against
 * Alton and Gee's review, which describes Young's 1986 types (Clin Orthop Relat Res 2014),
 * Halawi's review (J Clin Orthop Trauma 2015) and Leone's open imaging review (Diagnostics 2022),
 * whose table also gives stability by type (claims YB-1 to YB-9, and the author's decisions of
 * 2026-10-29, in docs/superpowers/research/2026-10-23-pelvis-calculators-sources.md).
 */

export type YbType = 'LC I' | 'LC II' | 'LC III' | 'APC I' | 'APC II' | 'APC III' | 'VS' | 'CMI'

export const ybTypes: YbType[] = ['LC I', 'LC II', 'LC III', 'APC I', 'APC II', 'APC III', 'VS', 'CMI']

export const ybDescriptions: Record<YbType, string> = {
  'LC I': 'sacral compression on the side of impact, with transverse (horizontal) pubic rami fractures', // YB-1
  // YB-1, Alton and Gee: "The resulting posterior pelvic injury in LC II patterns may be a sacral
  // fracture, sacroiliac ligament and joint disruption, or crescent fracture-dislocation of the ilium."
  'LC II': 'lateral compression with the posterior ring broken on the side of impact through the ilium (crescent fracture-dislocation) or the sacroiliac joint',
  // YB-1, Leone: "the lateral compression force is associated with a contralateral
  // anteroposterior compression force, with an external rotation of the contralateral hemipelvis
  // (“windswept pelvis”)".
  'LC III': 'lateral compression on the side of impact with external rotation (AP compression) of the other hemipelvis, the windswept pelvis',
  // YB-2, decision 33: "APC I injuries show less than 2.5 cm of symphyseal widening and have no
  // posterior instability" (Alton and Gee). 2.5 cm is the conventional threshold; published
  // thresholds vary (Halawi's table), so the page adds that caveat.
  'APC I': 'symphyseal diastasis, conventionally less than 2.5 cm, with no posterior instability',
  'APC II': 'widened anterior sacroiliac joint: anterior sacroiliac, sacrospinous and sacrotuberous ligaments torn, posterior sacroiliac ligaments intact', // YB-2
  // YB-2, decision 35: "anterior and posterior sacroiliac joint diastasis" (Leone); "APCIII can be
  // differentiated from VS injury by the absence of vertical displacement of the hemipelvis" (Halawi).
  'APC III': 'complete sacroiliac joint disruption, anterior and posterior sacroiliac ligaments torn; vertical displacement need not be present',
  // YB-3, decision 34: "VS injuries result from an axially loaded force delivered over one or both
  // hemipelves" (Alton and Gee); "Vertical displacement of one or both hemipelvices" (Halawi);
  // "a destruction of the posterior elements of the pelvis and a cranial shift of the hemipelvis
  // ... Anteriorly, this kind of trauma may show a disruption of the pubic symphysis and vertical
  // fracture of the pubic rami" (Leone). It said "of a hemipelvis".
  VS: 'vertical (cranial) displacement of one or both hemipelves from an axial force, with the anterior and posterior ring disrupted',
  // YB-4, decision 38: "Complex injury patterns are a combination of any three primary patterns
  // (APC, LC, or VS)" (Alton and Gee); "A combination of the above injuries" (Halawi). It said
  // "most often lateral compression with AP compression or vertical shear"; the commonest pairing
  // (Leone: lateral compression with vertical shear) is on the page, apart from the definition.
  CMI: 'combined mechanism: features of more than one primary pattern (lateral compression, AP compression, vertical shear)',
}

/**
 * YB-8: the usual stability implication of each type (decision 37). Young-Burgess classifies by
 * force vector; the patterns inform the assessment of stability but do not replace looking at the
 * posterior ring (Alton and Gee: "The concept of stability, central to the AO/OTA classification
 * system, is not a part of the Young and Burgess classification"; Leone: "The Young and Burgess
 * classification combines the mechanism and the stability of the fractures").
 *
 * Leone's Table 1: LC and APC grade 1 "Stable", grade 2 "Rotational instability", grade 3
 * "Multidirectional instability"; vertical shear and combined mechanism "Multidirectional
 * instability". LC III (decision 36) was "rotationally unstable, vertically stable": now unstable,
 * with the degree and direction set by the posterior ring (Leone: "the degree of involvement of the
 * posterior tension band, affect the stability of the pelvic ring"; Tile type B is "vertically
 * stable, due to an incomplete disruption of the posterior arch structures", type C "a complete
 * disruption"). APC III (decision 35) stays vertically unstable even without vertical displacement.
 */
export const ybStability: Record<YbType, string> = {
  'LC I': 'stable',
  'LC II': 'rotationally unstable, vertically stable',
  'LC III': 'unstable, to a degree and in a direction set by the posterior ring injury',
  'APC I': 'stable',
  'APC II': 'rotationally unstable, vertically stable',
  'APC III': 'rotationally and vertically unstable, even without vertical displacement',
  VS: 'rotationally and vertically unstable',
  CMI: 'unstable',
}

export type YbLateral = 'none' | 'sacral' | 'crescent' | 'sacroiliac'
export type YbSacroiliac = 'intact' | 'anterior' | 'complete'

export type YbInput = {
  /** Cranial displacement of one or both hemipelves. */
  vertical?: boolean
  /**
   * On the side of impact: sacral compression or horizontal rami fractures, or with the
   * posterior ring broken through the ilium (crescent) or the sacroiliac joint as well (LC II).
   */
  lateral?: YbLateral
  /** With lateral compression: the other hemipelvis opened (externally rotated). */
  otherSideOpen?: boolean
  /** Without lateral compression: the symphysis widened. */
  symphysisWidened?: boolean
  /** The worse sacroiliac joint: anterior widening only, or anterior and posterior. */
  sacroiliac?: YbSacroiliac
}

/**
 * The type from the CT findings. Vertical displacement wins: with lateral compression it is a
 * combined mechanism, otherwise vertical shear (YB-3, YB-4). Lateral compression comes next,
 * and AP compression is graded by the sacroiliac joint (YB-1, YB-2). Undefined when nothing
 * here shows a ring disruption.
 */
export function youngBurgess(input: YbInput): YbType | undefined {
  const lateral = input.lateral ?? 'none'
  if (input.vertical) return lateral === 'none' ? 'VS' : 'CMI'
  if (lateral !== 'none') {
    if (input.otherSideOpen) return 'LC III'
    return lateral === 'sacral' ? 'LC I' : 'LC II'
  }
  if (input.sacroiliac === 'complete') return 'APC III'
  if (input.sacroiliac === 'anterior') return 'APC II'
  return input.symphysisWidened ? 'APC I' : undefined
}

export function ybGroup(type: YbType): string {
  if (type.startsWith('LC')) return 'lateral compression'
  if (type.startsWith('APC')) return 'AP compression'
  return type === 'VS' ? 'vertical shear' : 'combined mechanical injury'
}

/**
 * YB-6: "In the original description by Young et al., a 2.5-cm diastasis at the symphysis pubis
 * was the criterion to differentiate APC I from APC II injuries" (Alton and Gee). The review
 * gives APC I as "less than 2.5 cm" and APC II as "greater than 2.5 cm", so exactly 2.5 cm is
 * left as not over (the site's reading).
 */
export function diastasisOver(mm: number): boolean {
  return mm > 25
}

export function ybSentence(type: YbType): string {
  return `Pelvic ring injury, Young-Burgess ${type} (${ybGroup(type)}): ${ybDescriptions[type]}; usually ${ybStability[type]}.`
}
