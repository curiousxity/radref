export type OradsModality = 'us' | 'mri'
export type OradsMenopausal = 'premenopausal' | 'postmenopausal'
export type OradsCystType = 'simple' | 'nonsimple' | 'solid' | 'classicBenign' | 'multilocular' | 'indeterminate'
export type OradsColorScore = '0' | '1' | '2' | '3' | '4'
export type OradsEnhancement = 'none' | 'minimal' | 'moderate' | 'marked'
export type OradsForm = {
  modality: OradsModality
  menopausal: OradsMenopausal
  sizeCm: string
  cystType: OradsCystType
  solidComponent: boolean
  papillaryProjections: number
  locules: number
  smoothContour: boolean
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
