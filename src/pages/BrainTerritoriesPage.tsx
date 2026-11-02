import { BrainTerritoryMap } from '../components/BrainTerritoryMap'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

// Every statement below was read in its paper first (abstract or open full text); the claims, their
// verdicts and the quoted sentences are in
// docs/superpowers/research/2026-11-02-brain-territories-sources.md.
const DOI = {
  liu: '10.1038/s41597-022-01923-0',
  tatu2012: '10.1159/000333602',
  chandra: '10.4103/bc.bc_10_17',
  zedde2022: '10.3390/jcm11237205',
  nouh: '10.3389/fneur.2014.00030',
  rauch: '10.1007/s00062-024-01418-y',
  blaszczyk: '10.3390/brainsci14080763',
  tatu1996: '10.1212/wnl.47.5.1125',
  tatu1998: '10.1212/wnl.50.6.1699',
  ota1: '10.1161/SVIN.123.001050',
  ota2: '10.1161/SVIN.123.001060',
  li: '10.3389/fradi.2021.687045',
  moralesAnterior: '10.1007/s00276-024-03359-0',
  arboix: '10.1186/1471-2377-9-30',
  dogariu: '10.25122/jml-2023-0127',
  yu: '10.7150/ijms.22631',
  osiowski: '10.1007/s00701-024-06327-0',
  lazzaro: '10.3174/ajnr.A2044',
  bogousslavsky: '10.1212/wnl.44.11.2032',
  mangla: '10.1148/rg.315105014',
  lambert: '10.1177/2324709616665409',
  deSousa: '10.1155/2017/5409430',
  wardlaw: '10.1016/S1474-4422(13)70124-8',
  sadik: '10.3390/life12081215',
  oliveira: '10.1590/0100-3984.2021.0019',
  moralesPosterior: '10.1007/s00276-024-03358-1',
  deMiquel: '10.3389/fneur.2021.680515',
  saposnik: '10.1161/STR.0000000000000456',
  ferro: '10.1177/2396987317719364',
  canedo: '10.1148/rg.2019190015',
  pai: '10.25259/JCIS_187_2020',
  zedde2025: '10.3390/neurolint17010009',
  leach: '10.1148/rg.26si055174',
}

const references: LessonReference[] = [
  { citation: 'Liu CF, Hsu J, Xu X, et al. Digital 3D brain MRI arterial territories atlas. Sci Data. 2023;10(1):74. Open access (CC BY 4.0).', doi: DOI.liu },
  { citation: 'Tatu L, Moulin T, Vuillier F, Bogousslavsky J. Arterial territories of the human brain. Front Neurol Neurosci. 2012;30:99-110.', doi: DOI.tatu2012 },
  { citation: 'Chandra A, Li WA, Stone CR, Geng X, Ding Y. The cerebral circulation and cerebrovascular disease I: anatomy. Brain Circ. 2017;3(2):45-56. Open access.', doi: DOI.chandra },
  { citation: 'Zedde M, Grisendi I, Pezzella FR, et al. Acute onset quadriplegia and stroke: look at the brainstem, look at the midline. J Clin Med. 2022;11(23):7205. Open access (CC BY 4.0).', doi: DOI.zedde2022 },
  { citation: 'Nouh A, Remke J, Ruland S. Ischemic posterior circulation stroke: a review of anatomy, clinical presentations, diagnosis, and current management. Front Neurol. 2014;5:30. Open access (CC BY).', doi: DOI.nouh },
  { citation: 'Rauch M, Berkefeld J, Klonowski M, Hattingen E, Weidauer S. Thalamo-mesencephalic branches of the posterior cerebral artery: a 3D rotational angiography study. Clin Neuroradiol. 2024;34(3):693-701. Open access (CC BY 4.0).', doi: DOI.rauch },
  { citation: 'Błaszczyk M, Ochwat K, Necka S, et al. The arterial anatomy of the cerebellum: a comprehensive review. Brain Sci. 2024;14(8):763. Open access (CC BY 4.0).', doi: DOI.blaszczyk },
  { citation: 'Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of human brain: brainstem and cerebellum. Neurology. 1996;47(5):1125-1135.', doi: DOI.tatu1996 },
  { citation: 'Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of the human brain: cerebral hemispheres. Neurology. 1998;50(6):1699-1708.', doi: DOI.tatu1998 },
  { citation: 'Ota T. Functional cerebral venous anatomy from the viewpoint of venous collaterals part I, supratentorial superficial and deep venous system. Stroke Vasc Interv Neurol. 2024;4(2):e001050. Open access.', doi: DOI.ota1 },
  { citation: 'Ota T. Functional cerebral venous anatomy: a perspective on venous collaterals part II, infratentorial venous system. Stroke Vasc Interv Neurol. 2024;4(2):e001060. Open access.', doi: DOI.ota2 },
  { citation: 'Li AY, Tong E, Yedavalli VS. A case-based review of cerebral venous infarcts with perfusion imaging and comparison to arterial ischemic stroke. Front Radiol. 2021;1:687045. Open access (CC BY).', doi: DOI.li },
  { citation: 'Morales-Roccuzzo D, Sabahi M, Obrzut M, et al. A primer to vascular anatomy of the brain: an overview on anterior compartment. Surg Radiol Anat. 2024;46(6):829-842. Open access (CC BY 4.0).', doi: DOI.moralesAnterior },
  { citation: 'Arboix A, García-Eroles L, Sellarés N, et al. Infarction in the territory of the anterior cerebral artery: clinical study of 51 patients. BMC Neurol. 2009;9:30. Open access (CC BY 2.0).', doi: DOI.arboix },
  { citation: 'Dogariu OA, Dogariu I, Vasile CM, et al. Diagnosis and treatment of watershed strokes: a narrative review. J Med Life. 2023;16(6):842-850. Open access (CC BY 3.0).', doi: DOI.dogariu },
  { citation: 'Yu J, Xu N, Zhao Y, Yu J. Clinical importance of the anterior choroidal artery: a review of the literature. Int J Med Sci. 2018;15(4):368-375. Open access.', doi: DOI.yu },
  { citation: 'Osiowski A, Stolarz K, Osiowski M, Klepinowski T, Taterra D. The prevalence and anatomy of recurrent artery of Heubner: a meta analysis with neurosurgical considerations. Acta Neurochir (Wien). 2024;166(1):431. Open access (CC BY 4.0).', doi: DOI.osiowski },
  { citation: 'Lazzaro NA, Wright B, Castillo M, et al. Artery of Percheron infarction: imaging patterns and clinical spectrum. AJNR Am J Neuroradiol. 2010;31(7):1283-1289.', doi: DOI.lazzaro },
  { citation: 'Bogousslavsky J, Maeder P, Regli F, Meuli R. Pure midbrain infarction: clinical syndromes, MRI, and etiologic patterns. Neurology. 1994;44(11):2032-2040.', doi: DOI.bogousslavsky },
  { citation: 'Mangla R, Kolar B, Almast J, Ekholm SE. Border zone infarcts: pathophysiologic and imaging characteristics. RadioGraphics. 2011;31(5):1201-1214.', doi: DOI.mangla },
  { citation: 'Lambert SL, Williams FJ, Oganisyan ZZ, Branch LA, Mader EC Jr. Fetal-type variants of the posterior cerebral artery and concurrent infarction in the major arterial territories of the cerebral hemisphere. J Investig Med High Impact Case Rep. 2016;4(3):2324709616665409. Open access (CC BY 3.0).', doi: DOI.lambert },
  { citation: 'de Sousa CS, de Miranda CL, Avelino MC, et al. Thrombosis of the azygos anterior cerebral artery. Case Rep Radiol. 2017;2017:5409430. Open access (CC BY 4.0).', doi: DOI.deSousa },
  { citation: 'Wardlaw JM, Smith EE, Biessels GJ, et al. Neuroimaging standards for research into small vessel disease and its contribution to ageing and neurodegeneration. Lancet Neurol. 2013;12(8):822-838. Open access.', doi: DOI.wardlaw },
  { citation: 'Sadik JC, Jianu DC, Sadik R, et al. Imaging of cerebral venous thrombosis. Life (Basel). 2022;12(8):1215. Open access (CC BY 4.0).', doi: DOI.sadik },
  { citation: 'Oliveira IM, Duarte JÁ, Dalaqua M, et al. Cerebral venous thrombosis: imaging patterns. Radiol Bras. 2022;55(1):54-61. Open access (CC BY 4.0).', doi: DOI.oliveira },
  { citation: 'Morales-Roccuzzo D, Sabahi M, Obrzut M, et al. Posterior vascular anatomy of the encephalon: a comprehensive review. Surg Radiol Anat. 2024;46(6):843-857. Open access (CC BY 4.0).', doi: DOI.moralesPosterior },
  { citation: 'de Miquel MA. Posterior fossa venous drainage. Front Neurol. 2021;12:680515. Open access (CC BY).', doi: DOI.deMiquel },
  { citation: 'Saposnik G, Bushnell C, Coutinho JM, et al. Diagnosis and management of cerebral venous thrombosis: a scientific statement from the American Heart Association. Stroke. 2024;55(3):e77-e90.', doi: DOI.saposnik },
  { citation: 'Ferro JM, Bousser MG, Canhão P, et al. European Stroke Organization guideline for the diagnosis and treatment of cerebral venous thrombosis, endorsed by the European Academy of Neurology. Eur Stroke J. 2017;2(3):195-221. Open access.', doi: DOI.ferro },
  { citation: 'Canedo-Antelo M, Baleato-González S, Mosqueira AJ, et al. Radiologic clues to cerebral venous thrombosis. RadioGraphics. 2019;39(6):1611-1628.', doi: DOI.canedo },
  { citation: 'Pai V, Khan I, Sitoh YY, Purohit B. Pearls and pitfalls in the magnetic resonance diagnosis of dural sinus thrombosis: a comprehensive guide for the trainee radiologist. J Clin Imaging Sci. 2020;10:77. Open access.', doi: DOI.pai },
  { citation: 'Zedde M, Pascarella R. Non-thrombotic filling defects in cerebral veins and sinuses: when normal structures mimic a disease. Neurol Int. 2025;17(1):9. Open access (CC BY 4.0).', doi: DOI.zedde2025 },
  { citation: 'Leach JL, Fortuna RB, Jones BV, Gaskill-Shipley MF. Imaging of cerebral venous thrombosis: current techniques, spectrum of findings, and diagnostic pitfalls. RadioGraphics. 2006;26 Suppl 1:S19-S41.', doi: DOI.leach },
]

export function BrainTerritoriesPage() {
  return (
    <div className="page bt-page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Study</p>
          <h2>Vascular territories of the brain</h2>
          <p>
            Where an infarct or a venous lesion lies tells you which artery or vein to look at. Use the map to place it, then read the section for that
            territory. Territories vary a great deal between people (<Cite doi={DOI.liu}>Liu et al.</Cite>), and the cortical territories have a
            smallest and a largest extent (<Cite doi={DOI.tatu2012}>Tatu et al. 2012</Cite>), so a boundary on the map is typical, not fixed.
          </p>
          <p className="source-note">
            Written on 2026-11-02 with the paper databases reachable; every statement was read in its source (an abstract or an open full text) first.
            The drawings are schematics, not to scale.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>Map</h3>
        <figure className="fm-figure">
          <BrainTerritoryMap />
          <figcaption>
            Schematic axial levels, not scan planes; the patient's right is on the left, as on a scan. The arterial territories are drawn as the open
            reviews describe them (<Cite doi={DOI.chandra}>Chandra et al.</Cite>, <Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>,{' '}
            <Cite doi={DOI.nouh}>Nouh et al.</Cite>, <Cite doi={DOI.rauch}>Rauch et al.</Cite>, <Cite doi={DOI.blaszczyk}>Błaszczyk et al.</Cite> and
            others cited below), several of which draw on the sections of <Cite doi={DOI.tatu1996}>Tatu et al. (1996)</Cite> and{' '}
            <Cite doi={DOI.tatu1998}>(1998)</Cite>; the venous territories after <Cite doi={DOI.ota1}>Ota</Cite> (<Cite doi={DOI.ota2}>parts I and
            II</Cite>) and <Cite doi={DOI.li}>Li et al.</Cite>
          </figcaption>
        </figure>
        <ul className="plain-list">
          <li>
            Tatu and colleagues drew the dominant arterial territories of the brainstem and cerebellum on 12 axial sections (
            <Cite doi={DOI.tatu1996}>Tatu et al. 1996</Cite>), and did the same for the hemispheres, with how far the cortical territories of the
            ACA, MCA and PCA vary (<Cite doi={DOI.tatu1998}>Tatu et al. 1998</Cite>).
          </li>
          <li>
            An atlas built from 1,298 strokes found MCA infarcts commonest, then PCA, vertebrobasilar and ACA (<Cite doi={DOI.liu}>Liu et al.</Cite>).
          </li>
        </ul>
      </section>

      <section className="info-card" id="hemispheres">
        <h3>The cerebral hemispheres</h3>
        <p className="fm-lead">
          An arterial infarct is a wedge of lost grey–white differentiation in one arterial territory (<Cite doi={DOI.li}>Li et al.</Cite>).
        </p>

        <h4 className="fm-subhead" id="aca">Anterior cerebral artery</h4>
        <ul className="plain-list">
          <li>
            The medial surface of the frontal lobe and the superomedial parietal lobe, up to the parieto-occipital sulcus, the precuneus included; it
            does not reach the medial occipital lobe (<Cite doi={DOI.chandra}>Chandra et al.</Cite>).
          </li>
          <li>
            Its cortex covers the superior frontal gyrus and the top of the precentral and postcentral gyri, the strip facing the falx that holds the
            leg area (<Cite doi={DOI.moralesAnterior}>Morales-Roccuzzo et al.</Cite>).
          </li>
          <li>
            Below, its medial orbitofrontal branch supplies the gyrus rectus and the orbital gyri (<Cite doi={DOI.moralesAnterior}>Morales-Roccuzzo
            et al.</Cite>).
          </li>
          <li>ACA infarcts are uncommon: 1.8% of cerebral infarcts in one registry (<Cite doi={DOI.arboix}>Arboix et al.</Cite>).</li>
        </ul>

        <h4 className="fm-subhead" id="mca">Middle cerebral artery</h4>
        <ul className="plain-list">
          <li>
            The insula and opercula, the superior and middle temporal gyri, the inferior parietal lobule, the inferior and middle frontal gyri and
            most of the precentral and postcentral gyri (<Cite doi={DOI.chandra}>Chandra et al.</Cite>): the lateral surface of the hemisphere, less
            the ACA's strip and the lower temporal lobe, which is PCA (<Cite doi={DOI.dogariu}>Dogariu et al.</Cite>).
          </li>
          <li>
            The superior division runs from the orbitofrontal area to the posterior parietal lobe; the inferior division from the temporal pole to the
            angular area (<Cite doi={DOI.chandra}>Chandra et al.</Cite>).
          </li>
          <li>Its M1 perforators are the lenticulostriate arteries (see Deep perforators, below).</li>
          <li>
            The MCA is the commonest site of stroke (<Cite doi={DOI.chandra}>Chandra et al.</Cite>; <Cite doi={DOI.liu}>Liu et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead" id="pca">Posterior cerebral artery</h4>
        <ul className="plain-list">
          <li>
            The occipital lobe, the inferior and medial temporal lobe and the back of the inferior parietal lobe, with deep branches to the thalamus,
            midbrain and choroid plexus (<Cite doi={DOI.chandra}>Chandra et al.</Cite>).
          </li>
          <li>
            Deep structures were involved in almost 30% of pure PCA infarcts, and most PCA infarcts (84% to 100%) cause a visual field defect (
            <Cite doi={DOI.chandra}>Chandra et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead" id="acha">Anterior choroidal artery</h4>
        <ul className="plain-list">
          <li>
            Deep branches to the posterior two-thirds of the internal capsule, the optic and auditory radiations beside it, the medial globus
            pallidus and the tail of the caudate; superficial branches to the uncus, hippocampal head, amygdala and lateral geniculate body (
            <Cite doi={DOI.chandra}>Chandra et al.</Cite>).
          </li>
          <li>
            Sources differ on how much of the capsule it takes: the posterior limb (<Cite doi={DOI.yu}>Yu et al.</Cite>), or the genu and the inferior
            half of the posterior limb (<Cite doi={DOI.moralesAnterior}>Morales-Roccuzzo et al.</Cite>).
          </li>
          <li>
            Its perforators to the posterior limb of the internal capsule have no collateral supply, so an AChA occlusion infarcts it; the classic
            triad is hemiparesis, hemianaesthesia and hemianopia (<Cite doi={DOI.yu}>Yu et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead" id="perforators">Deep perforators</h4>
        <ul className="plain-list">
          <li>
            <strong>Lenticulostriate arteries</strong> (from M1): the head and body of the caudate, the upper anterior limb, genu and front of the
            posterior limb of the internal capsule, the putamen and the lateral pallidum (<Cite doi={DOI.chandra}>Chandra et al.</Cite>; another
            review gives them most of the globus pallidus, <Cite doi={DOI.dogariu}>Dogariu et al.</Cite>).
          </li>
          <li>
            <strong>Recurrent artery of Heubner</strong>: usually the largest medial lenticulostriate branch of the ACA, present in 97.5% of
            hemispheres. It supplies the front of the caudate, the anterior third of the putamen, the front of the outer globus pallidus and the
            anteroinferior anterior limb of the internal capsule. Its infarct (mediobasal striatum) gives weakness of the face and arm, with aphasia
            when it is on the dominant side (<Cite doi={DOI.osiowski}>Osiowski et al.</Cite>).
          </li>
          <li>
            <strong>Thalamus</strong>: supplied mainly by small vessels from the posterior communicating artery and the P1 and P2 segments of the
            PCA, in four territories: anterior (polar or tuberothalamic artery, from the posterior communicating artery), paramedian (paramedian
            arteries, from P1), inferolateral (thalamogeniculate arteries, from P2) and posterior (posterior choroidal arteries, from P2) (
            <Cite doi={DOI.lazzaro}>Lazzaro et al.</Cite>).
          </li>
          <li>
            The polar artery is absent in 30% to 60% of people, and the paramedian arteries then supply the anterior thalamus too (
            <Cite doi={DOI.lazzaro}>Lazzaro et al.</Cite>).
          </li>
          <li>
            An inferolateral (thalamogeniculate) infarct gives the Dejerine–Roussy syndrome, with chronic pain on the opposite side (
            <Cite doi={DOI.rauch}>Rauch et al.</Cite>).
          </li>
        </ul>
      </section>

      <section className="info-card" id="brainstem">
        <h3>Brainstem</h3>
        <p className="fm-lead">
          Brainstem branches fall into four groups by where they enter: anteromedial (paramedian), anterolateral, lateral and posterior. Each
          supplies its own territory, and the territories change in size from level to level (<Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
        </p>
        <ul className="plain-list">
          <li>
            Most medullary and pontine infarcts are paramedian, sharply marginated and long in the sagittal plane, and they stop at the midline: the
            paramedian branches never cross it. Midbrain infarcts can cross it, as their many branches are not limited to a paramedian distribution (
            <Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead">Medulla</h4>
        <ul className="plain-list">
          <li>A large anteromedial, a small anterolateral, a large lateral and a small dorsal territory (<Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).</li>
          <li>
            Anteromedial: the anterior spinal artery in the lower medulla, paramedian branches of the vertebral artery higher up. Anterolateral: the
            anterior spinal and vertebral arteries, the anterior spinal and posterior inferior cerebellar arteries lower down (
            <Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
          <li>
            Lateral: mostly from circumferential branches of the vertebral artery; the PICA supplies the rest of the lateral and the posterior medulla,
            and from below upwards the PICA, basilar, vertebral and AICA all contribute. Dorsal: the posterior spinal arteries below, the
            PICA above (<Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
          <li>
            The lateral medullary (Wallenberg) syndrome is the commonest medullary syndrome, about 2% of ischaemic strokes; the medial medullary
            (Dejerine) syndrome is up to four times rarer (<Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
          <li>
            Medial medullary infarct: weakness and loss of position and vibration sense on the opposite side, with tongue weakness on the same side.
            Bilateral medial medullary infarcts can give a heart-shaped lesion on MRI, the "heart appearance sign" (
            <Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead">Pons</h4>
        <ul className="plain-list">
          <li>
            Anteromedial, anterolateral and lateral territories; a dorsal territory only in the upper pons (<Cite doi={DOI.zedde2022}>Zedde et al.
            2022</Cite>).
          </li>
          <li>
            Anteromedial: pontine perforators from the basilar artery, entering at the basilar sulcus (<Cite doi={DOI.zedde2022}>Zedde et al.
            2022</Cite>; <Cite doi={DOI.nouh}>Nouh et al.</Cite>).
          </li>
          <li>
            Anterolateral: short circumferential branches of the basilar (<Cite doi={DOI.nouh}>Nouh et al.</Cite>;{' '}
            <Cite doi={DOI.chandra}>Chandra et al.</Cite>), or perforators from the AICA entering at the pontomedullary sulcus (
            <Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
          <li>
            Lateral: lateral pontine perforators from the basilar, AICA or SCA, the AICA mainly in the lower pons. Dorsal (upper pons): the SCA (
            <Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
          <li>
            Ventral paramedian infarcts are the commonest, two of every three isolated pontine infarcts (<Cite doi={DOI.zedde2022}>Zedde et al.
            2022</Cite>). Proximal basilar occlusion takes the lower pons and gives the locked-in syndrome (<Cite doi={DOI.nouh}>Nouh et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead">Midbrain</h4>
        <ul className="plain-list">
          <li>
            Four fairly constant territories; the PCA's share grows from below upwards (<Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>).
          </li>
          <li>
            Anteromedial (paramedian): perforators of the basilar, the SCA and P1 (<Cite doi={DOI.zedde2022}>Zedde et al. 2022</Cite>). In the upper
            midbrain, the anterolateral group is the collicular, anterior choroidal and posterior medial choroidal arteries; the lateral group the
            collicular and posterior medial choroidal arteries and the PCA; the posterior group the collicular and posterior medial choroidal arteries
            (<Cite doi={DOI.rauch}>Rauch et al.</Cite>).
          </li>
          <li>
            Pure midbrain infarcts are mostly in the middle midbrain, in the paramedian territory of the basilar; infarcts in the PCA's midbrain
            territory are less common, and in the SCA's extremely rare (<Cite doi={DOI.bogousslavsky}>Bogousslavsky et al.</Cite>).
          </li>
          <li>
            Top of the basilar: the midbrain, thalami and the medial temporal and occipital lobes (<Cite doi={DOI.nouh}>Nouh et al.</Cite>).
          </li>
        </ul>
      </section>

      <section className="info-card" id="cerebellum">
        <h3>Cerebellum</h3>
        <ul className="plain-list">
          <li>
            <strong>PICA</strong>: the inferior posterior cerebellar hemisphere, the inferior vermis and the lateral medulla (
            <Cite doi={DOI.nouh}>Nouh et al.</Cite>), its cortical branches running on the suboccipital and inferior vermian surface. Its typical
            infarct is the lateral medullary (Wallenberg) syndrome, the dorsolateral medulla being hit most often (<Cite doi={DOI.blaszczyk}>Błaszczyk
            et al.</Cite>).
          </li>
          <li>
            <strong>AICA</strong>: the lateral pons, the middle cerebellar peduncle, the anterior inferior cerebellum, the flocculus and the inner ear.
            AICA infarcts are rare and give the lateral pontine (AICA) syndrome (<Cite doi={DOI.blaszczyk}>Błaszczyk et al.</Cite>;{' '}
            <Cite doi={DOI.nouh}>Nouh et al.</Cite>).
          </li>
          <li>
            <strong>SCA</strong>: the superior cerebellar hemisphere and vermis and the superior cerebellar peduncle (<Cite doi={DOI.blaszczyk}>Błaszczyk
            et al.</Cite>). The SCA syndrome is limb ataxia on the same side with vertigo, nystagmus, dysarthria and gait ataxia (
            <Cite doi={DOI.nouh}>Nouh et al.</Cite>).
          </li>
        </ul>
      </section>

      <section className="info-card" id="border-zones">
        <h3>Border zones, variants and lacunes</h3>
        <h4 className="fm-subhead">Border zones</h4>
        <ul className="plain-list">
          <li>
            Border zone infarcts lie at the junction of two main arterial territories and make up about 10% of brain infarcts. There are two kinds,
            external (cortical) and internal (subcortical). Internal ones come mainly from low flow; external ones are believed to result from embolism, not
            always with hypoperfusion (<Cite doi={DOI.mangla}>Mangla et al.</Cite>).
          </li>
          <li>
            External border zone infarcts are triangular, cortical or cortico-subcortical: ACA–MCA in the frontal lobe, from the frontal horn to the
            cortex; MCA–PCA in the parieto-occipital region, from the occipital horn to the cortex (<Cite doi={DOI.dogariu}>Dogariu et al.</Cite>).
          </li>
          <li>
            Internal border zone infarcts lie between the deep perforators (lenticulostriate, Heubner, anterior choroidal) and the cortical branches
            of the ACA, MCA or PCA. Usually there are more than three lesions of at least 3 mm, in a line parallel to the lateral ventricle in the
            centrum semiovale or corona radiata; confluent ones form a band (the "string of pearls"), partial ones a rosary (
            <Cite doi={DOI.dogariu}>Dogariu et al.</Cite>).
          </li>
          <li>
            Bilateral ACA–MCA border zone infarcts can give proximal arm weakness, the "man in the barrel" (<Cite doi={DOI.dogariu}>Dogariu et
            al.</Cite>); bilateral parieto-occipital (MCA–PCA) ones, Balint's syndrome (<Cite doi={DOI.nouh}>Nouh et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead">Variants</h4>
        <ul className="plain-list">
          <li>
            <strong>Fetal PCA</strong>: the PCA arises from the internal carotid artery, mostly on one side; reported in 10% to 29% of people (
            <Cite doi={DOI.nouh}>Nouh et al.</Cite>), though figures vary between reports (<Cite doi={DOI.chandra}>Chandra et al.</Cite>). Embolism in
            the anterior circulation can then infarct the PCA territory, alone or with the MCA and ACA territories of the same hemisphere (
            <Cite doi={DOI.lambert}>Lambert et al.</Cite>).
          </li>
          <li>
            <strong>Artery of Percheron</strong>: a single thalamic perforator from one P1 that supplies both paramedian thalami and the rostral
            midbrain (<Cite doi={DOI.nouh}>Nouh et al.</Cite>). Its occlusion gives four patterns:
            both paramedian thalami with the midbrain (43%), without the midbrain (38%), with the anterior thalami and midbrain (14%), and with the anterior thalami without the midbrain (5%).
            A V-shaped FLAIR or DWI signal along the surface of the midbrain at the interpeduncular fossa (the "V sign") was seen in 67% of those with
            midbrain involvement (<Cite doi={DOI.lazzaro}>Lazzaro et al.</Cite>).
          </li>
          <li>
            The thalamic involvement is asymmetric in two-thirds (<Cite doi={DOI.nouh}>Nouh et al.</Cite>); the clinical triad is altered mental
            status, vertical gaze palsy and memory impairment (<Cite doi={DOI.lazzaro}>Lazzaro et al.</Cite>). Deep venous thrombosis also takes both
            thalami (see Deep veins, below).
          </li>
          <li>
            <strong>Azygos ACA</strong>: one trunk supplies both medial frontal lobes (0.3% to 2% of people); its occlusion gives bifrontal infarcts (
            <Cite doi={DOI.deSousa}>de Sousa et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead">Lacunes</h4>
        <ul className="plain-list">
          <li>
            A recent small subcortical infarct is an infarct in the territory of one perforating arteriole, under 20 mm across in the axial plane (
            <Cite doi={DOI.wardlaw}>Wardlaw et al., STRIVE</Cite>).
          </li>
          <li>
            A lacune is a round or ovoid, subcortical, fluid-filled cavity of 3 mm to about 15 mm, from an old small infarct or haemorrhage in the
            territory of one perforating arteriole (<Cite doi={DOI.wardlaw}>Wardlaw et al., STRIVE</Cite>).
          </li>
          <li>
            Lacunar infarcts lie in the perforator territories (lenticulostriate, thalamoperforating, pontine): the basal ganglia, thalamus and pons (
            <Cite doi={DOI.dogariu}>Dogariu et al.</Cite>).
          </li>
        </ul>
      </section>

      <section className="info-card" id="venous">
        <h3>Venous drainage</h3>
        <p className="fm-lead">
          Three networks drain the brain: the superficial (cortical) veins, the deep veins and the posterior fossa veins, all into the dural sinuses
          and then the jugular veins (<Cite doi={DOI.sadik}>Sadik et al.</Cite>).
        </p>
        <ul className="plain-list">
          <li>
            Veins vary far more than arteries: cerebral veins have no valves, the direction of flow is not constant, and the function of a vein
            differs from person to person (<Cite doi={DOI.ota1}>Ota, part I</Cite>; <Cite doi={DOI.li}>Li et al.</Cite>). The cortical veins are the
            most variable; the large deep veins and the sinuses are easy to identify (<Cite doi={DOI.sadik}>Sadik et al.</Cite>).
          </li>
          <li>
            Venous infarcts cross arterial boundaries, are often bilateral and asymmetrical, and bleed in nearly two-thirds (
            <Cite doi={DOI.sadik}>Sadik et al.</Cite>). The oedema is mainly in the subcortical and periventricular white matter, with the cortex
            spared and grey–white differentiation relatively kept (<Cite doi={DOI.li}>Li et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead" id="venous-superficial">Superficial veins</h4>
        <ul className="plain-list">
          <li>
            The lateral and medial surfaces of the frontal, parietal and occipital lobes drain to the superior sagittal sinus; the perisylvian cortex
            to the superficial middle cerebral vein and cavernous sinus; the lateral and basal temporal and occipital lobes to the transverse sinus (
            <Cite doi={DOI.ota1}>Ota, part I</Cite>). Another review gives the transverse sinus and vein of Labbé, when dominant, the posterior
            temporal and inferior parietal lobes (<Cite doi={DOI.li}>Li et al.</Cite>).
          </li>
          <li>
            Three named anastomotic veins link them: the superficial middle cerebral vein, the vein of Trolard (to the superior sagittal sinus) and
            the vein of Labbé (over the inferolateral temporal lobe to the transverse sinus). Their sizes are reciprocal: when one is large, another is
            often small or absent (<Cite doi={DOI.li}>Li et al.</Cite>).
          </li>
          <li>
            The superior sagittal sinus collects the superficial veins and the straight sinus the deep veins; both reach the torcular (
            <Cite doi={DOI.sadik}>Sadik et al.</Cite>).
          </li>
          <li>
            <strong>Superior sagittal sinus thrombosis</strong>: frontal and parietal lesions and haematomas, parasagittal and often bilateral (
            <Cite doi={DOI.sadik}>Sadik et al.</Cite>; <Cite doi={DOI.oliveira}>Oliveira et al.</Cite>). Small juxtacortical haemorrhages, with
            little or no oedema, are seen almost only with superior sagittal sinus occlusion and are specific for venous thrombosis (
            <Cite doi={DOI.li}>Li et al.</Cite>).
          </li>
          <li>
            <strong>Transverse sinus thrombosis</strong>: temporal and occipital lesions (<Cite doi={DOI.sadik}>Sadik et al.</Cite>;{' '}
            <Cite doi={DOI.oliveira}>Oliveira et al.</Cite>); in one series, inferior temporal and cerebellar lesions (<Cite doi={DOI.li}>Li et
            al.</Cite>).
          </li>
          <li>
            <strong>Vein of Labbé thrombosis</strong>: a temporal lesion on the same side as the thrombosis, sometimes with the thrombosed vein beside
            it as a band dense on CT and bright on T1 (<Cite doi={DOI.sadik}>Sadik et al.</Cite>); posterior temporal and anterior parietal
            haemorrhage (<Cite doi={DOI.li}>Li et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead" id="venous-deep">Deep veins</h4>
        <ul className="plain-list">
          <li>
            The basal ganglia, thalami and internal capsules drain through the deep veins (<Cite doi={DOI.li}>Li et al.</Cite>), and the deep white
            matter through deep medullary veins to the subependymal veins of the lateral ventricles. Most deep veins drain into the internal cerebral
            veins, some into the basal veins of Rosenthal, and both head to the vein of Galen (<Cite doi={DOI.ota1}>Ota, part I</Cite>), which joins
            the inferior sagittal sinus to form the straight sinus (<Cite doi={DOI.sadik}>Sadik et al.</Cite>).
          </li>
          <li>
            <strong>Deep venous thrombosis</strong> (internal cerebral veins, vein of Galen, straight sinus): the thalami, often both, and sometimes the
            caudate and the deep white matter (<Cite doi={DOI.sadik}>Sadik et al.</Cite>; <Cite doi={DOI.oliveira}>Oliveira et al.</Cite>).
          </li>
          <li>
            Both thalami: think of the artery of Percheron and of straight sinus thrombosis (<Cite doi={DOI.sadik}>Sadik et al.</Cite>). A venous
            infarct does not keep to one thalamic arterial zone (<Cite doi={DOI.lazzaro}>Lazzaro et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead" id="venous-posterior-fossa">Posterior fossa veins</h4>
        <ul className="plain-list">
          <li>
            The posterior fossa veins end as bridging veins in three groups: galenic (to the vein of Galen), petrosal (to the petrosal sinuses) and
            tentorial (to the tentorial sinuses), all ultimately emptying into the transverse, straight or superior petrosal sinus (
            <Cite doi={DOI.moralesPosterior}>Morales-Roccuzzo et al.</Cite>). This is Rhoton's grouping of the bridging veins (
            <Cite doi={DOI.deMiquel}>de Miquel</Cite>).
          </li>
          <li>
            The galenic group drains the upper brainstem and the superior cerebellum; the petrosal group the brainstem and the anterior cerebellum;
            the tentorial group the posterior cerebellum, toward the torcular (<Cite doi={DOI.deMiquel}>de Miquel</Cite>;{' '}
            <Cite doi={DOI.ota2}>Ota, part II</Cite>).
          </li>
        </ul>
      </section>

      <section className="info-card" id="sinus-thrombosis">
        <h3>Dural venous sinus thrombosis</h3>
        <p className="fm-lead">
          The diagnosis rests on MRI with MR venography or CT with CT venography (<Cite doi={DOI.saposnik}>AHA, Saposnik et al.</Cite>). Each
          venography is a reliable alternative to catheter angiography (<Cite doi={DOI.ferro}>ESO, Ferro et al.</Cite>, weak recommendations). MRI is
          the most sensitive and specific test, and contrast-enhanced MR venography the most accurate MR technique (<Cite doi={DOI.canedo}>Canedo-Antelo
          et al.</Cite>).
        </p>
        <p className="fm-lead">
          Imaging gives direct signs, the clot itself (bright, or a filling defect), and indirect signs: oedema, venous infarct, subarachnoid or
          parenchymal haemorrhage (<Cite doi={DOI.sadik}>Sadik et al.</Cite>).
        </p>

        <h4 className="fm-subhead">Direct signs</h4>
        <ul className="plain-list">
          <li>
            <strong>Dense sinus and cord sign</strong>: fresh clot is dense on plain CT, best seen in the first week (sensitivity 64%, specificity
            97%), and its density fades after that (<Cite doi={DOI.sadik}>Sadik et al.</Cite>). Reported sensitivities of the cord sign range from
            25% to 64% (<Cite doi={DOI.li}>Li et al.</Cite>). Plain CT is normal in 30%, so a normal CT does not exclude thrombosis (
            <Cite doi={DOI.sadik}>Sadik et al.</Cite>).
          </li>
          <li>
            <strong>Empty delta</strong>: after contrast, the sinus wall enhances round a non-enhancing clot. To count,
            it must be seen on several sections; it is most often seen between 5 days and 2 months after the event (<Cite doi={DOI.sadik}>Sadik et al.</Cite>).
          </li>
          <li>
            <strong>Filling defect</strong> on CT or MR venography (<Cite doi={DOI.sadik}>Sadik et al.</Cite>; <Cite doi={DOI.oliveira}>Oliveira et
            al.</Cite>).
          </li>
          <li>
            <strong>Loss of the flow void</strong>, often best seen on T2 or FLAIR, though slow flow can do the same (<Cite doi={DOI.oliveira}>Oliveira
            et al.</Cite>).
          </li>
          <li>
            <strong>Clot signal by age</strong>: under 5 days, T1 iso and T2 iso to dark; from 5 to 30 days, T1 bright and T2 iso to bright; older
            than a month, T1 and T2 iso to bright (<Cite doi={DOI.sadik}>Sadik et al.</Cite>, Table 4). The windows are approximate; the sources
            give different ones (<Cite doi={DOI.li}>Li et al.</Cite>).
          </li>
          <li>
            <strong>Blooming</strong>: acute clot is dark on SWI and T2* gradient echo (<Cite doi={DOI.li}>Li et al.</Cite>), which show thrombosed
            cortical veins well (<Cite doi={DOI.sadik}>Sadik et al.</Cite>).
          </li>
          <li>
            <strong>DWI</strong>: the clot can be bright, even without a parenchymal lesion (<Cite doi={DOI.oliveira}>Oliveira et al.</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead">Indirect signs</h4>
        <ul className="plain-list">
          <li>
            Seen in 60% to 80%: multiple bilateral infarcts or haematomas, bilateral thalamic oedema and temporo-occipital lesions; subarachnoid
            haemorrhage too (<Cite doi={DOI.sadik}>Sadik et al.</Cite>). Which sinus each pattern points to is under Venous drainage, above.
          </li>
        </ul>

        <h4 className="fm-subhead">Mimics and pitfalls</h4>
        <ul className="plain-list">
          <li>
            <strong>Arachnoid granulations</strong>: round defects with the signal of CSF, stuck to the sinus wall, most often in the transverse and
            superior sagittal sinuses (<Cite doi={DOI.sadik}>Sadik et al.</Cite>), especially the lateral part of the transverse sinus, and always
            bright on T2 (<Cite doi={DOI.pai}>Pai et al.</Cite>). They do not fill the whole sinus as a clot does (<Cite doi={DOI.oliveira}>Oliveira et
            al.</Cite>).
          </li>
          <li>
            <strong>A hypoplastic or absent transverse sinus</strong>, in about 20% to 39% of people (<Cite doi={DOI.zedde2025}>Zedde and
            Pascarella</Cite>). It is often the left; the groove, jugular foramen and internal jugular vein are small on the same side, often with a
            large sinus on the other (<Cite doi={DOI.sadik}>Sadik et al.</Cite>). If the jugular foramen is small too, a narrow sinus may be a normal
            variant (<Cite doi={DOI.oliveira}>Oliveira et al.</Cite>).
          </li>
          <li>
            <strong>Flow gaps on time-of-flight MR venography</strong>, common in hypoplastic sinuses. In one study (Ayanzen et al., as cited) they
            were seen in 31% of non-dominant transverse sinuses, and none in dominant transverse sinuses or the rest of the dural venous system (
            <Cite doi={DOI.pai}>Pai et al.</Cite>; <Cite doi={DOI.zedde2025}>Zedde and Pascarella</Cite>). Contrast-enhanced MR venography, which does
            not depend on flow, confirms the sinus is patent (<Cite doi={DOI.zedde2025}>Zedde and Pascarella</Cite>).
          </li>
          <li>
            <strong>In-plane saturation</strong>: signal loss where a patent sinus runs in the plane of a time-of-flight acquisition (
            <Cite doi={DOI.pai}>Pai et al.</Cite>).
          </li>
          <li>
            <strong>The other way round</strong>: a subacute clot, bright on T1, can shine through on time-of-flight venography and be taken for flow (
            <Cite doi={DOI.pai}>Pai et al.</Cite>). A chronic clot can enhance and look like a patent sinus (<Cite doi={DOI.sadik}>Sadik et
            al.</Cite>).
          </li>
          <li>
            <strong>Dense sinuses without clot</strong>: a high haematocrit, polycythaemia or dehydration (<Cite doi={DOI.sadik}>Sadik et al.</Cite>),
            and newborns; the arteries then look dense too. Diffuse brain oedema can make the veins look relatively dense (
            <Cite doi={DOI.oliveira}>Oliveira et al.</Cite>).
          </li>
          <li>
            <strong>A false empty delta</strong>: an early split of the superior sagittal sinus, a septum, or a high or asymmetric torcular (
            <Cite doi={DOI.sadik}>Sadik et al.</Cite>; <Cite doi={DOI.li}>Li et al.</Cite>). Septa make thin, straight, sharp-edged defects (
            <Cite doi={DOI.pai}>Pai et al.</Cite>).
          </li>
          <li>
            Knowing the normal venous anatomy and its variants is what avoids these pitfalls (<Cite doi={DOI.leach}>Leach et al.</Cite>).
          </li>
        </ul>
      </section>

      <LessonReferences references={references} />
    </div>
  )
}
