/**
 * CT panels for the adult hearing loss page. Like the calvarial lesions page, each scan is to be
 * one panel cropped, unchanged apart from conversion to greyscale, from a figure in an
 * open-access paper published under a CC BY licence, credited with its figure.
 *
 * The page was drafted (2026-10-28) in a cloud session that could not reach PubMed Central or
 * Europe PMC, so no scan has been downloaded yet. Each entry below names the figure chosen for it;
 * `src` is left out until the cropped file is in `public/hearing-loss/`. The page shows only
 * entries that have a `src`, and `src/pages/hearingLoss.test.ts` checks those files exist and stay
 * small. See "Hearing loss CT page" in `docs/REMAINING_TASKS.md`.
 */

export type HearingLossImage = {
  /** Path under `public/`, set once the cropped file is added. */
  src?: string
  alt: string
  /** What the arrows point at, from the source figure's caption. */
  caption: string
  source: keyof typeof HEARING_LOSS_SOURCES
  figure: string
}

export const HEARING_LOSS_SOURCES = {
  purohit: { short: 'Purohit et al. 2014', doi: '10.1007/s13244-014-0313-9', licence: 'CC BY' },
} as const

export const CC_BY = 'CC BY'

export const hearingLossImages = {
  fenestral: {
    alt: 'Axial CT: lucency just in front of the oval window on both sides',
    caption: 'Bilateral fenestral otosclerosis.',
    source: 'purohit',
    figure: 'Fig. 2',
  },
  cochlear: {
    alt: 'Axial CT: a lucent ring around the cochlea, inside its dense bony capsule',
    caption: 'Cochlear otosclerosis: the pericochlear "double ring".',
    source: 'purohit',
    figure: 'Fig. 12',
  },
  cochlearCleft: {
    alt: 'Axial CT: a thin curved lucency beside the cochlea in a normal ear',
    caption: 'Cochlear cleft, a normal variant that can be mistaken for an otosclerotic focus.',
    source: 'purohit',
    figure: 'Fig. 7',
  },
  paget: {
    alt: 'Axial CT: demineralised, mottled bone around the cochlea in Paget disease',
    caption: 'Paget disease demineralising the otic capsule, mimicking cochlear otosclerosis.',
    source: 'purohit',
    figure: 'Fig. 16',
  },
} satisfies Record<string, HearingLossImage>
