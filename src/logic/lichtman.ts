/**
 * Lichtman staging of Kienböck disease (lunate osteonecrosis), first published by Lichtman
 * and colleagues (J Bone Joint Surg Am 1977), with stage III later split into IIIA and IIIB.
 * Shared by the Kienböck calculator and the wrist MRI study.
 *
 * Unchecked draft: the 1977 paper is matched on PubMed, but its abstract says only that four
 * clinical and radiographic stages were identified, so the stage wording, and who split stage
 * III, have not yet been checked (claims LI-1 to LI-4 in
 * docs/superpowers/research/2026-10-23-wrist-calculators-sources.md). The 1977 paper predates
 * clinical MRI, so stage I no longer says MRI shows it (LI-1, LI-4).
 */

export type LichtmanStage = 'I' | 'II' | 'IIIA' | 'IIIB' | 'IV'

export const lichtmanStages: LichtmanStage[] = ['I', 'II', 'IIIA', 'IIIB', 'IV']

export const lichtmanDescriptions: Record<LichtmanStage, string> = {
  I: 'normal radiographs', // LI-1
  II: 'sclerosis of the lunate without collapse', // LI-1
  IIIA: 'collapse of the lunate with carpal alignment and height maintained', // LI-2
  IIIB: 'collapse of the lunate with carpal collapse (fixed scaphoid rotation)', // LI-2
  IV: 'collapse of the lunate with degenerative changes of the radiocarpal or midcarpal joint', // LI-1
}

export type LichtmanInput = {
  /** Lunate abnormal on imaging. */
  abnormal?: boolean
  sclerosis?: boolean
  collapse?: boolean
  /** Fixed rotation of the scaphoid, with loss of carpal height. */
  carpalCollapse?: boolean
  arthritis?: boolean
}

/** LI-1, LI-2: the stage from the findings, or undefined while they do not decide it. */
export function lichtman(input: LichtmanInput): LichtmanStage | undefined {
  if (input.arthritis) return 'IV'
  if (input.collapse) {
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
