/**
 * Young-Burgess classification of pelvic ring injuries by force vector (Young et al.,
 * Radiology 1986; Burgess et al., J Trauma 1990). Shared by the Young-Burgess calculator and
 * the pelvis CT study.
 *
 * The 1986 and 1990 papers are paywalled; the type wording and the 2.5 cm are checked against
 * Alton and Gee's review, which describes Young's 1986 types (Clin Orthop Relat Res 2014; claims
 * YB-1 to YB-9 in docs/superpowers/research/2026-10-23-pelvis-calculators-sources.md).
 */

export type YbType = 'LC I' | 'LC II' | 'LC III' | 'APC I' | 'APC II' | 'APC III' | 'VS' | 'CMI'

export const ybTypes: YbType[] = ['LC I', 'LC II', 'LC III', 'APC I', 'APC II', 'APC III', 'VS', 'CMI']

export const ybDescriptions: Record<YbType, string> = {
  'LC I': 'sacral compression on the side of impact, with transverse (horizontal) pubic rami fractures', // YB-1
  // YB-1, Alton and Gee: "The resulting posterior pelvic injury in LC II patterns may be a sacral
  // fracture, sacroiliac ligament and joint disruption, or crescent fracture-dislocation of the ilium."
  'LC II': 'lateral compression with the posterior ring broken on the side of impact through the ilium (crescent fracture-dislocation) or the sacroiliac joint',
  'LC III': 'lateral compression on the side of impact with an open book (AP compression) injury of the other side, the windswept pelvis', // YB-1
  // YB-2: "APC I injuries show less than 2.5 cm of symphyseal widening and have no posterior instability".
  'APC I': 'symphysis widened less than 2.5 cm, with no posterior instability',
  'APC II': 'widened anterior sacroiliac joint: anterior sacroiliac, sacrospinous and sacrotuberous ligaments torn, posterior sacroiliac ligaments intact', // YB-2
  'APC III': 'complete sacroiliac joint disruption, posterior sacroiliac ligaments torn as well', // YB-2
  VS: 'vertical displacement of a hemipelvis, anteriorly and posteriorly', // YB-3
  // YB-4: "The majority of the complex injury patterns originally described by Young et al.
  // resulted from LC injuries being combined with AP or VS patterns."
  CMI: 'combined mechanism, most often lateral compression with AP compression or vertical shear',
}

/**
 * YB-8: stability as usually taught alongside the classification. It is not part of Young and
 * Burgess's system: "The concept of stability, central to the AO/OTA classification system, is
 * not a part of the Young and Burgess classification" (Alton and Gee).
 */
export const ybStability: Record<YbType, string> = {
  'LC I': 'stable',
  'LC II': 'rotationally unstable, vertically stable',
  'LC III': 'rotationally unstable, vertically stable',
  'APC I': 'stable',
  'APC II': 'rotationally unstable, vertically stable',
  'APC III': 'rotationally and vertically unstable',
  VS: 'rotationally and vertically unstable',
  CMI: 'unstable',
}

export type YbLateral = 'none' | 'sacral' | 'crescent' | 'sacroiliac'
export type YbSacroiliac = 'intact' | 'anterior' | 'complete'

export type YbInput = {
  /** Cranial displacement of a hemipelvis. */
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
