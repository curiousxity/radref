import { blob, outline, sector } from './brainTerritoryGeometry'
import type { Oval, Point } from './brainTerritoryGeometry'

/*
 * Schematic axial levels for the vascular territories map (BrainTerritoryMap). Not a scan plane:
 * shapes and sizes are simplified. Only the patient's right side (the viewer's left) is drawn;
 * the map mirrors it about the midline. Where each territory sits follows the open reviews in
 * docs/superpowers/research/2026-11-02-brain-territories-sources.md (claims T-C1 to T-C70), several
 * of which draw on Tatu et al. 1996 and 1998; where they disagree on the veins it follows Ota 2024.
 */

export const VIEW = { width: 400, height: 460, midline: 200 }

export type Mode = 'arterial' | 'venous'
export type LevelId = 'medulla' | 'pons' | 'midbrain' | 'basal-ganglia' | 'corona-radiata' | 'centrum-semiovale'

export type Family =
  | 'aca' | 'mca' | 'pca' | 'acha' | 'lenticulostriate' | 'heubner' | 'thalamic'
  | 'vertebral' | 'basilar' | 'pica' | 'aica' | 'sca'
  | 'superior' | 'sylvian' | 'labbe' | 'deep' | 'galenic' | 'petrosal' | 'tentorial'
  | 'borderZone'

export type FamilyInfo = {
  label: string
  mode: Mode
  /** The colour token; perforator families use their parent's colour with stripes. */
  token: string
  striped?: boolean
  /** The page section (element id) that teaches it. */
  section: string
}

export const FAMILIES: Record<Family, FamilyInfo> = {
  aca: { label: 'Anterior cerebral artery', mode: 'arterial', token: '--color-territory-aca', section: 'aca' },
  mca: { label: 'Middle cerebral artery', mode: 'arterial', token: '--color-territory-mca', section: 'mca' },
  pca: { label: 'Posterior cerebral artery', mode: 'arterial', token: '--color-territory-pca', section: 'pca' },
  acha: { label: 'Anterior choroidal artery', mode: 'arterial', token: '--color-territory-acha', section: 'acha' },
  lenticulostriate: { label: 'Lenticulostriate arteries', mode: 'arterial', token: '--color-territory-mca', striped: true, section: 'perforators' },
  heubner: { label: 'Recurrent artery of Heubner', mode: 'arterial', token: '--color-territory-aca', striped: true, section: 'perforators' },
  thalamic: { label: 'Thalamic arteries', mode: 'arterial', token: '--color-territory-pca', striped: true, section: 'perforators' },
  vertebral: { label: 'Vertebral and anterior spinal arteries', mode: 'arterial', token: '--color-territory-vertebral', section: 'brainstem' },
  basilar: { label: 'Basilar artery branches', mode: 'arterial', token: '--color-territory-basilar', section: 'brainstem' },
  pica: { label: 'Posterior inferior cerebellar artery', mode: 'arterial', token: '--color-territory-pica', section: 'cerebellum' },
  aica: { label: 'Anterior inferior cerebellar artery', mode: 'arterial', token: '--color-territory-aica', section: 'cerebellum' },
  sca: { label: 'Superior cerebellar artery', mode: 'arterial', token: '--color-territory-sca', section: 'cerebellum' },
  superior: { label: 'Superior sagittal sinus', mode: 'venous', token: '--color-territory-superior', section: 'venous-superficial' },
  sylvian: { label: 'Superficial middle cerebral vein', mode: 'venous', token: '--color-territory-sylvian', section: 'venous-superficial' },
  labbe: { label: 'Vein of Labbé and transverse sinus', mode: 'venous', token: '--color-territory-labbe', section: 'venous-superficial' },
  deep: { label: 'Deep venous system', mode: 'venous', token: '--color-territory-deep', section: 'venous-deep' },
  galenic: { label: 'Galenic group', mode: 'venous', token: '--color-territory-galenic', section: 'venous-posterior-fossa' },
  petrosal: { label: 'Petrosal group', mode: 'venous', token: '--color-territory-petrosal', section: 'venous-posterior-fossa' },
  tentorial: { label: 'Tentorial group', mode: 'venous', token: '--color-territory-tentorial', section: 'venous-posterior-fossa' },
  borderZone: { label: 'Border zones', mode: 'arterial', token: '--color-territory-border-zone', section: 'border-zones' },
}

export type Territory = { id: string; family: Family; name: string; supply: string; d: string }

/** One structure at a level: a cerebral hemisphere, the brainstem, a cerebellar hemisphere. */
export type Part = {
  outline: string
  /** Midline parts (the brainstem) are drawn half and mirrored, but outlined once, whole. */
  whole?: boolean
  /** CSF round the part, painted before it so it hides what lies beneath. */
  cistern?: string
  arterial: Territory[]
  venous: Territory[]
}

export type Level = {
  id: LevelId
  label: string
  parts: Part[]
  /** Ventricles, drawn over the territories, right side only (mirrored). */
  ventricles: string[]
  /** Overlay for the Border zones switch, arterial mode only. */
  borderZones: Territory[]
}

const t = (id: string, family: Family, name: string, supply: string, d: string): Territory => ({ id, family, name, supply, d })

type Row = [Family, string, string, number, number, number?, number?]

// --- Supratentorial: one hemisphere oval per level. The arterial origin sits near the medial edge,
// so the ACA comes out as a medial strip and the MCA as everything lateral to it; the venous origin
// sits in the white matter beside the lateral ventricle. ---

const hemisphere = (b: number, a = 88): Oval => ({ cx: 105, cy: 230, a, b, n: 2.6 })

function supratentorial(id: LevelId, label: string, o: Oval, from: { arterial: Point; venous: Point }, split: {
  arterial: Row[]
  venous: Row[]
  deep?: { arterial: Territory[]; venous: Territory[] }
  ventricles: string[]
  borderZones: Territory[]
}): Level {
  const build = (rows: Row[], mode: Mode) =>
    rows.map(([family, name, supply, start, end, inner = 0, outer = 1], i) => t(`${id}-${mode[0]}-${family}-${i}`, family, name, supply, sector(o, from[mode], start, end, inner, outer)))
  return {
    id,
    label,
    parts: [
      { outline: outline(o), arterial: build(split.arterial, 'arterial'), venous: build(split.venous, 'venous') },
      ...(split.deep ? [{ outline: '', arterial: split.deep.arterial, venous: split.deep.venous }] : []),
    ],
    ventricles: split.ventricles,
    borderZones: split.borderZones,
  }
}

const CS = hemisphere(150, 80)
const CS_FROM = { arterial: { x: 160, y: 300 }, venous: { x: 130, y: 230 } }
const CR = hemisphere(175)
const CR_FROM = { arterial: { x: 172, y: 325 }, venous: { x: 155, y: 230 } }
const BG = hemisphere(190)
const BG_FROM = { arterial: { x: 165, y: 240 }, venous: { x: 120, y: 230 } }

const centrumSemiovale = supratentorial('centrum-semiovale', 'Centrum semiovale', CS, CS_FROM, {
  arterial: [
    ['aca', 'ACA: medial frontal and parietal convexity', 'Cortical branches of the ACA', 353, 120],
    ['pca', 'PCA: occipital lobe (behind the parieto-occipital sulcus)', 'Cortical branches of the PCA', 120, 200],
    ['mca', 'MCA: lateral convexity', 'Cortical branches of the MCA', 200, 353],
  ],
  venous: [
    ['superior', 'Convexity and its white matter', 'Superficial cortical veins to the superior sagittal sinus', 0, 360, 0.45, 1],
    ['deep', 'Deep white matter', 'Deep medullary veins to the subependymal veins', 0, 360, 0, 0.45],
  ],
  ventricles: [],
  borderZones: [
    t('cs-z-am', 'borderZone', 'Cortical border zone, ACA and MCA', 'Between the ACA and MCA cortical branches', sector(CS, CS_FROM.arterial, 348, 358, 0.3, 1)),
    t('cs-z-mp', 'borderZone', 'Cortical border zone, MCA and PCA', 'Between the MCA and PCA cortical branches', sector(CS, CS_FROM.arterial, 193, 207, 0.3, 1)),
    t('cs-z-int', 'borderZone', 'Internal border zone', 'Between the deep perforating and the cortical penetrating arteries', blob(135, 232, 6, 52, 4)),
  ],
})

const coronaRadiata = supratentorial('corona-radiata', 'Corona radiata', CR, CR_FROM, {
  arterial: [
    ['aca', 'ACA: medial frontal and parietal', 'Cortical branches of the ACA', 350, 120],
    ['pca', 'PCA: occipital', 'Cortical branches of the PCA', 120, 210],
    ['mca', 'MCA: lateral hemisphere', 'Cortical branches of the MCA', 210, 350],
  ],
  venous: [
    ['superior', 'Convexity', 'Superficial cortical veins to the superior sagittal sinus', 290, 220, 0.45, 1],
    ['sylvian', 'Lateral convexity near the Sylvian fissure', 'Superficial middle cerebral vein', 220, 290, 0.45, 1],
    ['deep', 'Deep white matter', 'Deep medullary veins to the subependymal veins', 0, 360, 0, 0.45],
  ],
  ventricles: [blob(178, 228, 9, 55, -4)],
  borderZones: [
    t('cr-z-am', 'borderZone', 'Cortical border zone, ACA and MCA', 'Between the ACA and MCA cortical branches', sector(CR, CR_FROM.arterial, 345, 355, 0.45, 1)),
    t('cr-z-mp', 'borderZone', 'Cortical border zone, MCA and PCA', 'Between the MCA and PCA cortical branches', sector(CR, CR_FROM.arterial, 203, 217, 0.25, 1)),
    t('cr-z-int', 'borderZone', 'Internal border zone',
      'Between the cortical branches of the ACA, MCA or PCA and the deep perforators (lenticulostriate, Heubner, anterior choroidal)', blob(152, 230, 6, 56, -4)),
  ],
})

const basalGanglia = supratentorial('basal-ganglia', 'Basal ganglia and thalamus', BG, BG_FROM, {
  arterial: [
    ['aca', 'ACA: medial frontal', 'Cortical branches of the ACA', 355, 90],
    ['pca', 'PCA: occipital lobe', 'Cortical branches of the PCA', 90, 205],
    ['mca', 'MCA: lateral frontal, insula, lateral temporal and parietal', 'Cortical branches of the MCA', 205, 355],
  ],
  venous: [
    ['superior', 'Medial frontal and parietal', 'Superficial cortical veins to the superior sagittal sinus', 330, 150],
    ['labbe', 'Posterior temporal and lateral occipital', 'Vein of Labbé to the transverse sinus', 150, 230],
    ['sylvian', 'Perisylvian cortex', 'Superficial middle cerebral vein to the sphenoparietal or cavernous sinus', 230, 330],
  ],
  deep: {
    arterial: [
      t('bg-a-heubner', 'heubner', 'Caudate head and anterior limb of the internal capsule', 'Recurrent artery of Heubner (ACA)', blob(168, 178, 12, 21, -15)),
      t('bg-a-ls', 'lenticulostriate', 'Lentiform nucleus and upper internal capsule', 'Lenticulostriate arteries (MCA)', blob(141, 228, 17, 36, 12)),
      t('bg-a-acha', 'acha', 'Posterior limb of the internal capsule', 'Anterior choroidal artery (ICA)', blob(158, 256, 4.5, 24, 25)),
      t('bg-a-thal', 'thalamic', 'Thalamus', 'Thalamic branches of the PCA and posterior communicating artery', blob(175, 266, 12, 27, 15)),
    ],
    venous: [
      t('bg-v-deep-caudate', 'deep', 'Caudate head', 'Thalamostriate vein to the internal cerebral vein', blob(168, 178, 12, 21, -15)),
      t('bg-v-deep-lentiform', 'deep', 'Lentiform nucleus', 'Deep veins to the basal vein of Rosenthal and internal cerebral vein', blob(141, 228, 17, 36, 12)),
      t('bg-v-deep-thal', 'deep', 'Thalamus', 'Internal cerebral vein to the vein of Galen and straight sinus', blob(175, 266, 12, 27, 15)),
    ],
  },
  // Frontal horn, the right half of the third ventricle (against the thalamus), atrium; each stays
  // inside the hemisphere outline.
  ventricles: [blob(183, 176, 6, 19, -15), blob(189, 264, 2.2, 22, 0), blob(176, 335, 6, 15, 25)],
  borderZones: [
    t('bg-z-am', 'borderZone', 'Cortical border zone, ACA and MCA', 'Between the ACA and MCA cortical branches', sector(BG, BG_FROM.arterial, 350, 360, 0.45, 1)),
    t('bg-z-mp', 'borderZone', 'Cortical border zone, MCA and PCA', 'Between the MCA and PCA cortical branches', sector(BG, BG_FROM.arterial, 198, 212, 0.45, 1)),
  ],
})

// --- Infratentorial and the midbrain level. ---

type Wedge = [Family, string, string, number, number]

function midline(o: Oval, from: Point, rows: Wedge[], venous: Wedge[], prefix: string, cistern?: Oval): Part {
  const build = (r: Wedge[], m: string) =>
    r.map(([family, name, supply, start, end], i) => t(`${prefix}-${m}-${i}`, family, name, supply, sector(o, from, start, end)))
  return { outline: outline(o), whole: true, cistern: cistern && outline(cistern), arterial: build(rows, 'a'), venous: build(venous, 'v') }
}

function side(o: Oval, from: Point, rows: Wedge[], venous: Wedge[], prefix: string): Part {
  const build = (r: Wedge[], m: string) =>
    r.map(([family, name, supply, start, end], i) => t(`${prefix}-${m}-${i}`, family, name, supply, sector(o, from, start, end)))
  return { outline: outline(o), arterial: build(rows, 'a'), venous: build(venous, 'v') }
}

const MED = { cx: 200, cy: 192, a: 34, b: 30, n: 2.2 }
const MED_CB = { cx: 136, cy: 280, a: 64, b: 68, n: 2.3 }
const medulla: Level = {
  id: 'medulla',
  label: 'Medulla',
  parts: [
    side(MED_CB, { x: 140, y: 274 }, [
      ['aica', 'Anterior inferior cerebellum and flocculus', 'Anterior inferior cerebellar artery', 290, 15],
      ['pica', 'Inferior cerebellar hemisphere and inferior vermis', 'Posterior inferior cerebellar artery', 15, 290],
    ], [
      ['petrosal', 'Anterior cerebellum', 'Petrosal group to the superior petrosal sinus', 290, 15],
      ['tentorial', 'Inferior and posterior cerebellum', 'Tentorial group to the transverse sinus and torcular', 15, 290],
    ], 'med-cb'),
    // Large anteromedial, small anterolateral, large lateral and small dorsal territories (T-C91).
    midline(MED, { x: 200, y: 192 }, [
      ['vertebral', 'Anteromedial medulla', 'Anterior spinal artery (lower medulla) and paramedian branches of the vertebral artery (upper medulla)', 320, 360],
      ['vertebral', 'Anterolateral medulla', 'Anterior spinal and vertebral arteries; the anterior spinal and posterior inferior cerebellar arteries lower down', 300, 320],
      ['vertebral', 'Lateral medulla', 'Circumferential branches of the vertebral artery mainly, with the posterior inferior cerebellar artery; the basilar and anterior inferior cerebellar arteries higher up', 220, 300],
      ['pica', 'Dorsal medulla', 'Posterior inferior cerebellar and posterior spinal arteries', 180, 220],
    ], [
      ['petrosal', 'Medulla', 'Anterior medullary veins to the petrosal group', 180, 360],
    ], 'med-bs', { cx: 200, cy: 192, a: 40, b: 36, n: 2.2 }),
  ],
  // Lower fourth ventricle, behind the medulla.
  ventricles: [blob(200, 216, 10, 5, 0)],
  borderZones: [],
}

const PONS = { cx: 200, cy: 190, a: 50, b: 42, n: 2.2 }
const PONS_CB = { cx: 136, cy: 292, a: 64, b: 70, n: 2.3 }
const PONS_TEMP = { cx: 95, cy: 110, a: 50, b: 62, n: 2.2 }
const pons: Level = {
  id: 'pons',
  label: 'Pons',
  parts: [
    side(PONS_TEMP, { x: 100, y: 115 }, [
      ['mca', 'Lateral temporal lobe', 'Cortical branches of the MCA', 210, 20],
      ['pca', 'Inferior and medial temporal lobe', 'Cortical branches of the PCA', 20, 210],
    ], [
      ['labbe', 'Lateral and inferior temporal lobe', 'Vein of Labbé to the transverse sinus', 0, 360],
    ], 'pons-temp'),
    // Both modes split the cerebellum at the same angles where they name the same region.
    side(PONS_CB, { x: 140, y: 286 }, [
      ['aica', 'Middle cerebellar peduncle and anterior cerebellum', 'Anterior inferior cerebellar artery', 300, 60],
      ['sca', 'Superior vermis and medial cerebellum', 'Superior cerebellar artery', 60, 150],
      ['pica', 'Suboccipital (posterior inferior) surface of the cerebellum', 'Posterior inferior cerebellar artery', 150, 240],
      ['sca', 'Superior cerebellar hemisphere', 'Superior cerebellar artery', 240, 300],
    ], [
      ['petrosal', 'Anterior cerebellum', 'Petrosal group to the superior petrosal sinus', 300, 60],
      ['galenic', 'Superior vermis and medial cerebellum', 'Galenic group to the vein of Galen', 60, 150],
      ['tentorial', 'Lateral and posterior cerebellum', 'Tentorial group to the transverse sinus', 150, 300],
    ], 'pons-cb'),
    midline(PONS, { x: 200, y: 190 }, [
      ['basilar', 'Anteromedial pons', 'Paramedian branches of the basilar artery', 330, 360],
      ['basilar', 'Anterolateral pons', 'Short circumferential branches of the basilar artery', 280, 330],
      ['aica', 'Lateral pons', 'Anterior inferior cerebellar artery, with lateral pontine perforators from the basilar and superior cerebellar arteries', 220, 280],
      ['sca', 'Dorsal pons (upper pons only)', 'Superior cerebellar artery', 180, 220],
    ], [
      ['petrosal', 'Pons', 'Anterior pontomesencephalic and transverse pontine veins to the petrosal group', 180, 360],
    ], 'pons-bs', { cx: 200, cy: 190, a: 56, b: 48, n: 2.2 }),
  ],
  // Fourth ventricle, behind the pons.
  ventricles: [blob(200, 227, 15, 6, 0)],
  borderZones: [],
}

// The midbrain hemisphere's wedges meet under the uncus, which is drawn over them.
const MID_H = hemisphere(190)
const MID_FROM = { x: 140, y: 226 }
const MID = { cx: 200, cy: 240, a: 40, b: 38, n: 2.2 }
const midbrain: Level = {
  id: 'midbrain',
  label: 'Midbrain',
  parts: [
    side(MID_H, MID_FROM, [
      ['aca', 'Gyrus rectus and medial orbital frontal', 'Cortical branches of the ACA', 2, 70],
      ['pca', 'Medial temporal and occipital lobes', 'Cortical branches of the PCA', 70, 215],
      ['mca', 'Lateral frontal and temporal lobes', 'Cortical branches of the MCA', 215, 2],
    ], [
      ['superior', 'Frontal lobe', 'Frontal cortical veins to the superior sagittal sinus', 330, 75],
      ['labbe', 'Lateral and inferior temporal and occipital', 'Vein of Labbé to the transverse sinus', 75, 260],
      ['sylvian', 'Perisylvian frontal and temporal cortex', 'Superficial middle cerebral vein', 260, 330],
    ], 'mid-h'),
    {
      outline: '',
      arterial: [t('mid-a-acha', 'acha', 'Uncus and anterior hippocampus', 'Anterior choroidal artery', blob(139, 232, 10, 20, 12))],
      venous: [t('mid-v-deep-uncus', 'deep', 'Uncus', 'Uncal vein to the basal vein of Rosenthal', blob(140, 226, 10, 13, 12))],
    },
    midline(MID, { x: 200, y: 240 }, [
      ['basilar', 'Anteromedial midbrain', 'Paramedian perforators of the basilar tip, the P1 segment of the PCA and the superior cerebellar artery', 330, 360],
      ['pca', 'Anterolateral midbrain (upper midbrain)', 'Collicular, anterior choroidal and posterior medial choroidal arteries', 280, 330],
      ['pca', 'Lateral midbrain (upper midbrain)', 'Collicular and posterior medial choroidal arteries and branches of the PCA', 225, 280],
      ['pca', 'Dorsal midbrain (upper midbrain)', 'Collicular and posterior medial choroidal arteries', 180, 225],
    ], [
      ['deep', 'Midbrain', 'Peduncular veins to the basal vein of Rosenthal', 180, 360],
    ], 'mid-bs', { cx: 200, cy: 240, a: 50, b: 50, n: 2.2 }),
  ],
  // Aqueduct, temporal horn.
  ventricles: [blob(200, 268, 3, 4, 0), blob(121, 248, 4, 11, 20)],
  borderZones: [],
}

/** Lowest first, as the level picker lists them. */
export const LEVELS: Level[] = [medulla, pons, midbrain, basalGanglia, coronaRadiata, centrumSemiovale]
