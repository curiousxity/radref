// Data transcribed from Table 3, Table 4, and Table 6 of the SIR Consensus Guidelines
// for the Periprocedural Management of Thrombotic and Bleeding Risk in Patients Undergoing
// Percutaneous Image-Guided Interventions, Part II: Recommendations (JVIR 2019;30:1168-1184).

export type BleedingRisk = 'low' | 'high'

/** Creatinine clearance bands, used only by the renally cleared agents. */
export type CrClBand = 'ge50' | 'mid' | 'low'

export const crclBands: { key: CrClBand; label: string }[] = [
  { key: 'ge50', label: '50 mL/min or above' },
  { key: 'mid', label: '30 to 49 mL/min' },
  { key: 'low', label: '15 to 29 mL/min' },
]

export type AgentGroup = 'Anticoagulants' | 'Antiplatelets: thienopyridines' | 'Antiplatelets: aspirin and NSAIDs' | 'Glycoprotein IIb/IIIa inhibitors' | 'Other'

export type Agent = {
  key: string
  name: string
  group: AgentGroup
  /** Management before a low bleeding risk procedure. */
  lowWithhold: string
  lowRestart: string
  /** Management before a high bleeding risk procedure. A record keys off creatinine clearance. */
  highWithhold: string | Record<CrClBand, string>
  highRestart: string
  /**
   * Overrides the badge derived from the hold text. Needed where the leading
   * recommendation is prose and the only number sits in a caveat, which a
   * regex would otherwise surface as the headline.
   */
  badge?: string
  /** Extra guidance shown alongside the result, not part of the hold time itself. */
  note?: string
}

export const agents: Agent[] = [
  {
    key: 'ufh',
    name: 'Unfractionated heparin',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold IV heparin for 4 to 6 hours before the procedure and check aPTT or anti-Xa level. For BID or TID dosing of subcutaneous heparin, the procedure may be performed 6 hours after the last dose.',
    highRestart: '6 to 8 hours',
  },
  {
    key: 'lmwh-prophylactic',
    name: 'LMWH, prophylactic dose (enoxaparin)',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 1 dose before the procedure.',
    highRestart: '12 hours',
  },
  {
    key: 'lmwh-therapeutic',
    name: 'LMWH, therapeutic dose (enoxaparin)',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 2 doses, or 24 hours before the procedure. Check anti-Xa level if renal function is impaired.',
    highRestart: '12 hours',
  },
  {
    key: 'dalteparin',
    name: 'LMWH: dalteparin',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 1 dose before the procedure.',
    highRestart: '12 hours',
  },
  {
    key: 'fondaparinux',
    name: 'Fondaparinux',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: {
      ge50: 'Withhold 2 to 3 days.',
      mid: 'Withhold 3 to 5 days.',
      low: 'Withhold 3 to 5 days.',
    },
    highRestart: '24 hours',
    note: 'The guideline splits fondaparinux at a creatinine clearance of 50 mL/min: 2 to 3 days at or above it, 3 to 5 days below it.',
  },
  {
    key: 'argatroban',
    name: 'Argatroban',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 2 to 4 hours before the procedure and check aPTT.',
    highRestart: '4 to 6 hours',
  },
  {
    key: 'bivalirudin',
    name: 'Bivalirudin',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 2 to 4 hours before the procedure and check aPTT.',
    highRestart: '4 to 6 hours',
  },
  {
    key: 'warfarin',
    name: 'Warfarin',
    group: 'Anticoagulants',
    lowWithhold: 'Target INR 3.0 or below. Consider bridging in high thrombosis risk cases.',
    lowRestart: 'Not applicable, or same-day reinitiation for bridged patients',
    highWithhold: 'Withhold 5 days until target INR is 1.8 or below. Consider bridging in high thrombosis risk cases. If the procedure is emergent, use a reversal agent.',
    highRestart: 'Resume the day after the procedure. High thrombosis risk cases may benefit from bridging with LMWH and multidisciplinary management, especially if a reversal agent was used along with vitamin K.',
    note: 'For low bleeding risk procedures requiring arterial access the target is INR below 1.8 for femoral puncture and below 2.2 for radial access. If warfarin is withheld, reinitiation can occur on the procedure day, since its anticoagulant effect is delayed.',
  },
  {
    key: 'apixaban',
    name: 'Apixaban',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: {
      ge50: 'Withhold 4 doses.',
      mid: 'Withhold 6 doses.',
      low: 'Withhold 6 doses.',
    },
    highRestart: '24 hours',
    note: 'If the procedure is emergent, use a reversal agent (andexanet alfa). Consider checking anti-Xa activity or an apixaban level, especially with impaired renal function.',
  },
  {
    key: 'betrixaban',
    name: 'Betrixaban',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 3 doses.',
    highRestart: '24 hours',
    note: 'If the procedure is emergent, use a reversal agent (andexanet alfa). Consider checking anti-Xa activity, especially with impaired renal function.',
  },
  {
    key: 'dabigatran',
    name: 'Dabigatran',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: {
      ge50: 'Withhold 4 doses.',
      mid: 'Withhold 6 to 8 doses.',
      low: 'Withhold 6 to 8 doses.',
    },
    highRestart: '24 hours',
    note: 'If the procedure is emergent, use a reversal agent (idarucizumab). Consider checking a thrombin time or dabigatran level with impaired renal function.',
  },
  {
    key: 'edoxaban',
    name: 'Edoxaban',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 2 doses.',
    highRestart: '24 hours',
    note: 'If the procedure is emergent, use a reversal agent (andexanet alfa). Consider checking anti-Xa activity, especially with impaired renal function.',
  },
  {
    key: 'rivaroxaban',
    name: 'Rivaroxaban',
    group: 'Anticoagulants',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: {
      ge50: 'Defer the procedure until off medication for 2 doses.',
      mid: 'Defer the procedure until off medication for 2 doses.',
      low: 'Defer the procedure until off medication for 3 doses.',
    },
    highRestart: '24 hours',
    note: 'If the procedure is emergent, use a reversal agent (andexanet alfa). Consider checking anti-Xa activity or a rivaroxaban level, especially with impaired renal function.',
  },
  {
    key: 'clopidogrel',
    name: 'Clopidogrel',
    group: 'Antiplatelets: thienopyridines',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold for 5 days before the procedure.',
    highRestart: 'Reinitiation can occur 6 hours after the procedure if using a 75 mg dose, but should occur 24 hours after the procedure if using a loading dose (300 to 600 mg).',
    note: 'Consider checking drug effect, since as many as 30% of patients are poor responders and may not need the full 5 days.',
  },
  {
    key: 'ticagrelor',
    name: 'Ticagrelor',
    group: 'Antiplatelets: thienopyridines',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold for 5 days before the procedure.',
    highRestart: 'Resume the day after the procedure',
  },
  {
    key: 'prasugrel',
    name: 'Prasugrel',
    group: 'Antiplatelets: thienopyridines',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold for 7 days before the procedure.',
    highRestart: 'Resume the day after the procedure',
  },
  {
    key: 'cangrelor',
    name: 'Cangrelor',
    group: 'Antiplatelets: thienopyridines',
    lowWithhold: 'Defer the procedure until off medication. If the procedure is emergent, withhold 1 hour before.',
    lowRestart: 'Multidisciplinary, shared decision making recommended',
    highWithhold: 'Defer the procedure until off medication. If the procedure is emergent, withhold 1 hour before.',
    highRestart: 'Multidisciplinary, shared decision making recommended',
    badge: 'Defer procedure',
    note: 'Patients receiving cangrelor are undergoing PCI or are within the immediate periprocedural period from a cardiac intervention. Discussion with cardiology is suggested.',
  },
  {
    key: 'aspirin',
    name: 'Aspirin',
    group: 'Antiplatelets: aspirin and NSAIDs',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 3 to 5 days before the procedure.',
    highRestart: 'Resume the day after the procedure',
    note: 'Withholding aspirin requires a patient-specific approach weighing the indication for therapy, thrombotic risk, and expected bleeding risk. For high-risk or complex cardiovascular cases, multidisciplinary shared decision making may be helpful.',
  },
  {
    key: 'aspirin-dipyridamole',
    name: 'Aspirin/dipyridamole',
    group: 'Antiplatelets: aspirin and NSAIDs',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Withhold 3 to 5 days before the procedure.',
    highRestart: 'Resume the day after the procedure',
  },
  {
    key: 'nsaids',
    name: 'Non-aspirin NSAIDs',
    group: 'Antiplatelets: aspirin and NSAIDs',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'No recommendation.',
    highRestart: 'Not applicable',
    note: 'Non-aspirin NSAIDs have weak antiplatelet effects and the guideline makes no recommendation. Discontinuation for 5 half-lives should be sufficient to mitigate the effect on platelet function. Selective COX-2 inhibitors such as celecoxib do not interfere with platelet aggregation.',
  },
  {
    key: 'abciximab',
    name: 'Abciximab (long-acting)',
    group: 'Glycoprotein IIb/IIIa inhibitors',
    lowWithhold: 'Withhold 24 hours before the procedure.',
    lowRestart: 'Multidisciplinary, shared decision making recommended',
    highWithhold: 'Withhold 24 hours before the procedure.',
    highRestart: 'Multidisciplinary, shared decision making recommended',
    note: 'Patients receiving a glycoprotein IIb/IIIa inhibitor are undergoing PCI or are within the immediate periprocedural period from a cardiac intervention. Before femoral arterial sheath removal the drug insert recommends aPTT below 50 s and ACT below 170 s.',
  },
  {
    key: 'eptifibatide-tirofiban',
    name: 'Eptifibatide or tirofiban (short-acting)',
    group: 'Glycoprotein IIb/IIIa inhibitors',
    lowWithhold: 'Withhold 4 to 8 hours before the procedure.',
    lowRestart: 'Multidisciplinary, shared decision making recommended',
    highWithhold: 'Withhold 4 to 8 hours before the procedure.',
    highRestart: 'Multidisciplinary, shared decision making recommended',
    note: 'Patients receiving a glycoprotein IIb/IIIa inhibitor are undergoing PCI or are within the immediate periprocedural period from a cardiac intervention. Before femoral arterial sheath removal the drug insert recommends aPTT below 45 s and ACT below 150 s.',
  },
  {
    key: 'cilostazol',
    name: 'Cilostazol',
    group: 'Other',
    lowWithhold: 'Do not withhold',
    lowRestart: 'Not applicable',
    highWithhold: 'Do not withhold',
    highRestart: 'Not applicable',
  },
]

/** Agents whose hold time varies with creatinine clearance. */
export function isRenallyAdjusted(agent: Agent) {
  return typeof agent.highWithhold !== 'string'
}

export const labThresholds: Record<BleedingRisk, { screening: string; inr: string; platelets: string; inrShort: string; plateletsShort: string }> = {
  low: {
    screening: 'PT/INR not routinely recommended. Platelet count and haemoglobin not routinely recommended.',
    inr: 'Correct to within a range of 2.0 to 3.0 or less',
    platelets: 'Transfuse if below 20 × 10⁹/L',
    inrShort: '2.0–3.0',
    plateletsShort: '≥ 20',
  },
  high: {
    screening: 'PT/INR routinely recommended. Platelet count and haemoglobin routinely recommended.',
    inr: 'Correct to within a range of 1.5 to 1.8 or less',
    platelets: 'Transfuse if below 50 × 10⁹/L',
    inrShort: '1.5–1.8',
    plateletsShort: '≥ 50',
  },
}

export const liverDiseaseThresholds = [
  { risk: 'Low', inr: 'Not applicable', platelets: 'Above 20 × 10⁹/L', fibrinogen: 'Above 100 mg/dL' },
  { risk: 'High', inr: 'Below 2.5', platelets: 'Above 30 × 10⁹/L', fibrinogen: 'Above 100 mg/dL' },
]

export const lowRiskProcedures = [
  'Catheter exchanges (gastrostomy, biliary, nephrostomy, abscess, including gastrostomy/gastrojejunostomy conversions)',
  'Diagnostic arteriography and arterial interventions: peripheral, sheath below 6 F, embolotherapy',
  'Diagnostic venography and select venous interventions: pelvis and extremities',
  'Dialysis access interventions',
  'Facet joint injections and medial branch nerve blocks (thoracic and lumbar spine)',
  'IVC filter placement and uncomplicated removal',
  'Lumbar puncture',
  'Nontunneled chest tube placement for pleural effusion',
  'Nontunneled venous access and removal, including PICC placement',
  'Paracentesis',
  'Peripheral nerve blocks, joint, and musculoskeletal injections',
  'Sacroiliac joint injection and sacral lateral branch blocks',
  'Superficial abscess drainage or biopsy (palpable lesion, lymph node, soft tissue, breast, thyroid, superficial bone)',
  'Thoracentesis',
  'Transjugular liver biopsy',
  'Trigger point injections including piriformis',
  'Tunneled drainage catheter placement',
  'Tunneled venous catheter placement and removal, including ports',
]

export const highRiskProcedures = [
  'Ablations: solid organs, bone, soft tissue, lung',
  'Arterial interventions: sheath above 7 F, aortic, pelvic, mesenteric, CNS',
  'Biliary interventions, including cholecystostomy tube placement',
  'Catheter directed thrombolysis (DVT, PE, portal vein)',
  'Deep abscess drainage (lung parenchyma, abdominal, pelvic, retroperitoneal)',
  'Deep nonorgan biopsies (spine, soft tissue in intraabdominal, retroperitoneal, pelvic compartments)',
  'Gastrostomy and gastrojejunostomy placement',
  'Complex IVC filter removal',
  'Portal vein interventions',
  'Solid organ biopsies',
  'Spine procedures with risk of spinal or epidural hematoma (kyphoplasty, vertebroplasty, epidural injections, cervical spine facet blocks)',
  'Transjugular intrahepatic portosystemic shunt',
  'Urinary tract interventions, including nephrostomy tube placement, ureteral dilation, and stone removal',
  'Venous interventions: intrathoracic and CNS',
]
