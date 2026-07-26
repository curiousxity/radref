export type Modality = 'ct' | 'mri'
export type StudyQuality = 'diagnostic' | 'nc'
export type RiskStatus = 'highRisk' | 'notApplicable'
export type TumorInVein = 'yes' | 'no'
export type MalignantNonHcc = 'yes' | 'no'

export type LiradsForm = {
  modality: Modality
  riskStatus: RiskStatus
  studyQuality: StudyQuality
  sizeCm: string
  aphe: boolean
  washout: boolean
  capsule: boolean
  thresholdGrowth: boolean
  tumorInVein: TumorInVein
  malignantNonHcc: MalignantNonHcc
}

export type LiradsCategory = 'LR-1' | 'LR-2' | 'LR-3' | 'LR-4' | 'LR-5' | 'LR-M' | 'LR-TIV' | 'LR-NC'

export type LiradsResult = {
  category: LiradsCategory
  categoryReason: string
  impression: string
  features: string[]
  recommendation: string
}
