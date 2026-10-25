/**
 * Lichtman staging of Kienböck disease (lunate osteonecrosis), first published by Lichtman
 * and colleagues (J Bone Joint Surg Am 1977), with stage III split into IIIA and IIIB in 1993 and
 * IIIC added later. Shared by the Kienböck calculator and the wrist MRI study.
 *
 * The 1977 paper is paywalled; the stage wording follows Kennedy and Abrams's review (Clin Orthop
 * Relat Res 2019), which describes the original stages and their later changes (claims LI-1 to
 * LI-4 in docs/superpowers/research/2026-10-23-wrist-calculators-sources.md).
 */

export type LichtmanStage = 'I' | 'II' | 'IIIA' | 'IIIB' | 'IIIC' | 'IV'

export const lichtmanStages: LichtmanStage[] = ['I', 'II', 'IIIA', 'IIIB', 'IIIC', 'IV']

/** Kennedy and Abrams 2019, quoted in src/logic/wristClassifications.test.ts. */
export const lichtmanDescriptions: Record<LichtmanStage, string> = {
  // LI-1, LI-4: "Stage I was described as having normal architecture and lunate density but may
  // show a linear or compression fracture", and since 1993 "Stage I including decreased T1 signal on MRI".
  I: 'normal lunate architecture and density on radiographs (a linear or compression fracture may show), with decreased T1 signal on MRI',
  // LI-1: "increased density in the lunate on plain radiographs without a change in the shape,
  // size, or relationship to other carpal bones".
  II: 'increased density of the lunate without change in its shape, size or relation to the other carpal bones',
  // LI-2: IIIA "without fixed scaphoid rotation", radioscaphoid angle < 60°; IIIB "with fixed
  // scaphoid rotation", > 60°, "often seen with a cortical 'ring sign'".
  IIIA: 'collapse of the lunate without fixed scaphoid rotation (radioscaphoid angle under 60°)',
  IIIB: 'collapse of the lunate with fixed scaphoid rotation (radioscaphoid angle over 60°, often a cortical ring sign)',
  // LI-3: "Stage IIIC representing a coronal fracture of the lunate".
  IIIC: 'collapse of the lunate with a coronal fracture of the lunate',
  // LI-1: "Stage IV includes pancarpal arthritis, including radiocarpal arthritis".
  IV: 'pancarpal arthritis, the radiocarpal joint included (Kienböck disease advanced collapse)',
}

export type LichtmanInput = {
  /** Lunate abnormal on imaging. */
  abnormal?: boolean
  sclerosis?: boolean
  collapse?: boolean
  /** Fixed rotation of the scaphoid (radioscaphoid angle over 60°). */
  carpalCollapse?: boolean
  /** A coronal fracture of the collapsed lunate (IIIC). */
  coronalFracture?: boolean
  arthritis?: boolean
}

/** LI-1, LI-2: the stage from the findings, or undefined while they do not decide it. */
export function lichtman(input: LichtmanInput): LichtmanStage | undefined {
  if (input.arthritis) return 'IV'
  if (input.collapse) {
    if (input.coronalFracture) return 'IIIC'
    if (input.carpalCollapse === undefined) return undefined
    return input.carpalCollapse ? 'IIIB' : 'IIIA'
  }
  if (input.sclerosis) return 'II'
  if (input.abnormal) return 'I'
  return undefined
}

export function lichtmanSentence(stage: LichtmanStage): string {
  return `Kienböck disease, Lichtman stage ${stage}: ${lichtmanDescriptions[stage]}.`
}
