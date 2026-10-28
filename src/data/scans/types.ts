/**
 * Example scans shown on the lessons and quick references. Each is one panel cropped, unchanged
 * apart from conversion to greyscale, from a figure in an open-access paper published under a CC
 * BY licence, which allows reuse and adaptation with credit. The arrows and panel letters are the
 * original authors'. Files live in `public/scans/<page>/`; `src/data/scans/scans.test.ts` checks
 * every list in this folder.
 */

export type ScanSource = {
  short: string
  doi: string
  /** The exact version, from the article's licence statement or, when that gives none, Crossref. */
  licence: `CC BY ${number}.${number}`
}

export type ScanImage = {
  /** Path under `public/`. */
  src: string
  alt: string
  /** What the arrows point at, from the source figure's caption. */
  caption: string
  source: ScanSource
  figure: string
}
