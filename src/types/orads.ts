export type OradsModality = 'us' | 'mri'
export type OradsMenopausal = 'premenopausal' | 'postmenopausal'
export type OradsCystType = 'simple' | 'nonsimple' | 'solid' | 'classicBenign' | 'multilocular' | 'indeterminate'
/** The O-RADS US v2022 "Classic Benign Lesions" table; the last three are extraovarian. */
export type OradsClassicType = 'hemorrhagic' | 'dermoid' | 'endometrioma' | 'paraovarian' | 'inclusion' | 'hydrosalpinx'
/** O-RADS US colour score: 1 is no flow, 4 is very strong flow. */
export type OradsColorScore = '1' | '2' | '3' | '4'
export type OradsEnhancement = 'none' | 'minimal' | 'moderate' | 'marked'
export type OradsForm = {
  modality: OradsModality
  menopausal: OradsMenopausal
  sizeCm: string
  cystType: OradsCystType
  /** Which classic benign lesion, when `cystType` is 'classicBenign'. */
  classicType: OradsClassicType
  solidComponent: boolean
  papillaryProjections: number
  locules: number
  smoothContour: boolean
  /** A cyst's inner wall or septation is irregular (under 3 mm high; 3 mm or more is a solid component). */
  irregularWall: boolean
  ascites: boolean
  peritonealDisease: boolean
  colorScore: OradsColorScore
  enhancingSolidTissue: boolean
  fat: boolean
  hemorrhagic: boolean
  diffusionRestriction: boolean
  enhancement: OradsEnhancement
}

export type OradsCategory = 'O-RADS 0' | 'O-RADS 1' | 'O-RADS 2' | 'O-RADS 3' | 'O-RADS 4' | 'O-RADS 5'

export type OradsResult = {
  category: OradsCategory
  reason: string
  impression: string
  recommendation: string
  features: string[]
}
