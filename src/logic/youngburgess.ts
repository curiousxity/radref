/**
 * Young-Burgess classification of pelvic ring injuries by force vector (Young et al.,
 * Radiology 1986; Burgess et al., J Trauma 1990). Shared by the Young-Burgess calculator and
 * the pelvis CT study.
 *
 * Unchecked draft: the wording has not yet been checked against the papers (claims YB-1 to
 * YB-9 in docs/superpowers/research/2026-10-23-pelvis-calculators-sources.md).
 */

export type YbType = 'LC I' | 'LC II' | 'LC III' | 'APC I' | 'APC II' | 'APC III' | 'VS' | 'CMI'

export const ybTypes: YbType[] = ['LC I', 'LC II', 'LC III', 'APC I', 'APC II', 'APC III', 'VS', 'CMI']

export const ybDescriptions: Record<YbType, string> = {
  'LC I': 'sacral compression on the side of impact, with transverse (horizontal) pubic rami fractures', // YB-1
  'LC II': 'lateral compression with an iliac wing (crescent) fracture on the side of impact', // YB-1
  'LC III': 'lateral compression on the side of impact with an open book (AP compression) injury of the other side, the windswept pelvis', // YB-1
  'APC I': 'slight widening of the symphysis or the anterior sacroiliac joint, ligaments stretched but intact', // YB-2
  'APC II': 'widened anterior sacroiliac joint: anterior sacroiliac, sacrospinous and sacrotuberous ligaments torn, posterior sacroiliac ligaments intact', // YB-2
  'APC III': 'complete sacroiliac joint disruption, posterior sacroiliac ligaments torn as well', // YB-2
  VS: 'vertical displacement of a hemipelvis, anteriorly and posteriorly', // YB-3
  CMI: 'combined mechanism, most often lateral compression with vertical shear', // YB-4
}

/** YB-8: stability as usually taught with the classification. */
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

export type YbLateral = 'none' | 'sacral' | 'crescent'
export type YbSacroiliac = 'intact' | 'anterior' | 'complete'

export type YbInput = {
  /** Cranial displacement of a hemipelvis. */
  vertical?: boolean
  /** On the side of impact: sacral compression or horizontal rami fractures, or with an iliac wing fracture too. */
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
    return lateral === 'crescent' ? 'LC II' : 'LC I'
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
 * YB-6: a symphyseal diastasis over 2.5 cm is usually taken to mean the pelvic floor and
 * anterior sacroiliac ligaments are torn (APC II or worse). At exactly 2.5 cm: not over.
 */
export function diastasisOver(mm: number): boolean {
  return mm > 25
}

export function ybSentence(type: YbType): string {
  return `Pelvic ring injury, Young-Burgess ${type} (${ybGroup(type)}): ${ybDescriptions[type]}; usually ${ybStability[type]}.`
}
