import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-10-29 with PubMed, Crossref and Europe PMC reachable, so every reference was
 * matched as it was cited and every claim was read in an abstract, an open full text (Szaro parts 1
 * and 2, Kifjak) or the ACR's published ratings tables before it went in. The claims table is
 * docs/superpowers/research/2026-10-29-brachial-plexus-sources.md (B claims). Rule chips and
 * warnings carry their claim IDs.
 */

const ACR_2021_DOI = '10.1016/j.jacr.2021.08.014'
const ACR_2017_DOI = '10.1016/j.jacr.2017.02.002'
const ACR_TOS_DOI = '10.1016/j.jacr.2020.01.029'
const SZARO_1_DOI = '10.1016/j.ejro.2021.100392'
const SZARO_2_DOI = '10.1016/j.ejro.2022.100397'
const GILCREASE_DOI = '10.1148/rg.2020200012'
const WADE_2019_DOI = '10.1148/radiol.2019190218'
const WADE_2018_DOI = '10.1177/1753193417729587'
const CARVALHO_DOI = '10.3171/jns.1997.86.1.0069'
const DOI_2002_DOI = '10.3171/spi.2002.96.3.0277'
const BORDALO_DOI = '10.1007/s00701-020-04465-9'
const YOSHIKAWA_DOI = '10.1148/rg.26si065511'
const HAYASHI_DOI = '10.1148/radiol.2232010857'
const SILBERMANN_DOI = '10.1016/j.diii.2013.08.013'
const BERTELLI_DOI = '10.3171/jns.2006.105.6.835'
const CARANCI_DOI = '10.1007/s12306-013-0281-0'
const KORI_DOI = '10.1212/wnl.31.1.45'
const HARPER_DOI = '10.1212/wnl.39.4.502'
const THYAGARAJAN_DOI = '10.1212/wnl.45.3.421'
const QAYYUM_DOI = '10.1148/radiology.214.3.r00mr11837'
const WITTENBERG_DOI = '10.1148/radiographics.20.4.g00jl091023'
const AHMAD_DOI = '10.1038/sj.bjc.6690074'
const KIFJAK_DOI = '10.1093/bjr/tqaf161'
const HEELAN_DOI = '10.1148/radiology.170.3.2916014'
const BRUZZI_DOI = '10.1148/rg.282075710'
const BINDER_DOI = '10.3171/foc.2004.16.5.12'
const JEE_DOI = '10.2214/ajr.183.3.1830629'
const BHARGAVA_DOI = '10.1007/s002470050082'
const WASA_DOI = '10.2214/AJR.09.2724'
const LI_DOI = '10.1016/j.clinimag.2007.05.006'
const GASKIN_DOI = '10.1148/radiol.2402050405'
const SNEAG_2017_DOI = '10.1002/mus.25480'
const SNEAG_2018_DOI = '10.1002/mus.26108'
const SNEAG_2024_DOI = '10.1002/mus.27961'
const DEMONDION_DOI = '10.1148/radiol.2272012111'
const HARDY_DOI = '10.1016/j.otsr.2019.09.020'
const BAUMER_DOI = '10.1007/s00330-013-3060-2'

const ACR_2021 = <Cite doi={ACR_2021_DOI}>ACR Appropriateness Criteria, Plexopathy 2021</Cite>
const ACR_2017 = <Cite doi={ACR_2017_DOI}>ACR Appropriateness Criteria, Plexopathy 2017</Cite>
const ACR_TOS = <Cite doi={ACR_TOS_DOI}>ACR Appropriateness Criteria, Thoracic Outlet Syndrome 2020</Cite>
const SZARO_1 = <Cite doi={SZARO_1_DOI}>Szaro et al., Eur J Radiol Open 2022, part 1</Cite>
const SZARO_2 = <Cite doi={SZARO_2_DOI}>Szaro et al., Eur J Radiol Open 2022, part 2</Cite>
const GILCREASE = <Cite doi={GILCREASE_DOI}>Gilcrease-Garcia et al., RadioGraphics 2020</Cite>
const WADE_2019 = <Cite doi={WADE_2019_DOI}>Wade et al., Radiology 2019</Cite>
const WADE_2018 = <Cite doi={WADE_2018_DOI}>Wade et al., J Hand Surg Eur 2018</Cite>
const CARVALHO = <Cite doi={CARVALHO_DOI}>Carvalho et al., J Neurosurg 1997</Cite>
const DOI_2002 = <Cite doi={DOI_2002_DOI}>Doi et al., J Neurosurg 2002</Cite>
const BORDALO = <Cite doi={BORDALO_DOI}>Bordalo-Rodrigues et al., Acta Neurochir 2020</Cite>
const YOSHIKAWA = <Cite doi={YOSHIKAWA_DOI}>Yoshikawa et al., RadioGraphics 2006</Cite>
const HAYASHI = <Cite doi={HAYASHI_DOI}>Hayashi et al., Radiology 2002</Cite>
const SILBERMANN = <Cite doi={SILBERMANN_DOI}>Silbermann-Hoffman and Teboul, Diagn Interv Imaging 2013</Cite>
const BERTELLI = <Cite doi={BERTELLI_DOI}>Bertelli and Ghizoni, J Neurosurg 2006</Cite>
const CARANCI = <Cite doi={CARANCI_DOI}>Caranci et al., Musculoskelet Surg 2013</Cite>
const KORI = <Cite doi={KORI_DOI}>Kori et al., Neurology 1981</Cite>
const HARPER = <Cite doi={HARPER_DOI}>Harper et al., Neurology 1989</Cite>
const THYAGARAJAN = <Cite doi={THYAGARAJAN_DOI}>Thyagarajan et al., Neurology 1995</Cite>
const QAYYUM = <Cite doi={QAYYUM_DOI}>Qayyum et al., Radiology 2000</Cite>
const WITTENBERG = <Cite doi={WITTENBERG_DOI}>Wittenberg and Adkins, RadioGraphics 2000</Cite>
const AHMAD = <Cite doi={AHMAD_DOI}>Ahmad et al., Br J Cancer 1999</Cite>
const KIFJAK = <Cite doi={KIFJAK_DOI}>Kifjak et al., Br J Radiol 2025</Cite>
const HEELAN = <Cite doi={HEELAN_DOI}>Heelan et al., Radiology 1989</Cite>
const BRUZZI = <Cite doi={BRUZZI_DOI}>Bruzzi et al., RadioGraphics 2008</Cite>
const BINDER = <Cite doi={BINDER_DOI}>Binder et al., Neurosurg Focus 2004</Cite>
const JEE = <Cite doi={JEE_DOI}>Jee et al., AJR 2004</Cite>
const BHARGAVA = <Cite doi={BHARGAVA_DOI}>Bhargava et al., Pediatr Radiol 1997</Cite>
const WASA = <Cite doi={WASA_DOI}>Wasa et al., AJR 2010</Cite>
const LI = <Cite doi={LI_DOI}>Li et al., Clin Imaging 2008</Cite>
const GASKIN = <Cite doi={GASKIN_DOI}>Gaskin and Helms, Radiology 2006</Cite>
const SNEAG_2017 = <Cite doi={SNEAG_2017_DOI}>Sneag et al., Muscle Nerve 2017</Cite>
const SNEAG_2018 = <Cite doi={SNEAG_2018_DOI}>Sneag et al., Muscle Nerve 2018</Cite>
const SNEAG_2024 = <Cite doi={SNEAG_2024_DOI}>Sneag et al., Muscle Nerve 2024</Cite>
const DEMONDION = <Cite doi={DEMONDION_DOI}>Demondion et al., Radiology 2003</Cite>
const HARDY = <Cite doi={HARDY_DOI}>Hardy et al., Orthop Traumatol Surg Res 2019</Cite>
const BAUMER = <Cite doi={BAUMER_DOI}>Baumer et al., Eur Radiol 2014</Cite>

const references: LessonReference[] = [
  { citation: 'Expert Panel on Neurological and Musculoskeletal Imaging; Boulter DJ, Job J, Shah LM, Wessell DE, Lenchik L, Parsons MS, Agarwal V, Appel M, Burns J, Hutchins TA, Kendi AT, Khan MA, Liebeskind DS, Moritani T, Ortiz AO, Shah VN, Singh S, Than KD, Timpone VM, Beaman FD, Corey AS. ACR Appropriateness Criteria® Plexopathy: 2021 update. J Am Coll Radiol. 2021;18(11S):S423-S441.', doi: ACR_2021_DOI },
  { citation: 'Expert Panel on Neurologic Imaging; Bykowski J, Aulino JM, Berger KL, Cassidy RC, Choudhri AF, Kendi AT, Kirsch CFE, Luttrull MD, Sharma A, Shetty VS, Than K, Winfree CJ, Cornelius RS. ACR Appropriateness Criteria® Plexopathy. J Am Coll Radiol. 2017;14(5S):S225-S233.', doi: ACR_2017_DOI },
  { citation: 'Expert Panels on Vascular Imaging, Thoracic Imaging, and Neurological Imaging; Zurkiya O, Ganguli S, Kalva SP, Chung JH, Shah LM, Majdalany BS, Bykowski J, Carter BW, Chandra A, Collins JD, Gunn AJ, Kendi AT, Khaja MS, Liebeskind DS, Maldonado F, Obara P, Sutphin PD, Tong BC, Vijay K, Corey AS, Kanne JP, Dill KE. ACR Appropriateness Criteria® Thoracic Outlet Syndrome. J Am Coll Radiol. 2020;17(5S):S323-S334.', doi: ACR_TOS_DOI },
  { citation: 'Szaro P, McGrath A, Ciszek B, Geijer M. Magnetic resonance imaging of the brachial plexus. Part 1: Anatomical considerations, magnetic resonance techniques, and non-traumatic lesions. Eur J Radiol Open. 2022;9:100392.', doi: SZARO_1_DOI },
  { citation: 'Szaro P, Geijer M, Ciszek B, McGrath A. Magnetic resonance imaging of the brachial plexus. Part 2: Traumatic injuries. Eur J Radiol Open. 2022;9:100397.', doi: SZARO_2_DOI },
  { citation: 'Gilcrease-Garcia BM, Deshmukh SD, Parsons MS. Anatomy, imaging, and pathologic conditions of the brachial plexus. RadioGraphics. 2020;40(6):1686-1714.', doi: GILCREASE_DOI },
  { citation: 'Wade RG, Takwoingi Y, Wormald JCR, Ridgway JP, Tanner S, Rankine JJ, Bourke G. MRI for detecting root avulsions in traumatic adult brachial plexus injuries: a systematic review and meta-analysis of diagnostic accuracy. Radiology. 2019;293(1):125-133.', doi: WADE_2019_DOI },
  { citation: 'Wade RG, Itte V, Rankine JJ, Ridgway JP, Bourke G. The diagnostic accuracy of 1.5T magnetic resonance imaging for detecting root avulsions in traumatic adult brachial plexus injuries. J Hand Surg Eur Vol. 2018;43(3):250-258.', doi: WADE_2018_DOI },
  { citation: 'Carvalho GA, Nikkhah G, Matthies C, Penkert G, Samii M. Diagnosis of root avulsions in traumatic brachial plexus injuries: value of computerized tomography myelography and magnetic resonance imaging. J Neurosurg. 1997;86(1):69-76.', doi: CARVALHO_DOI },
  { citation: 'Doi K, Otsuka K, Okamoto Y, Fujii H, Hattori Y, Baliarsing AS. Cervical nerve root avulsion in brachial plexus injuries: magnetic resonance imaging classification and comparison with myelography and computerized tomography myelography. J Neurosurg. 2002;96(3 Suppl):277-284.', doi: DOI_2002_DOI },
  { citation: 'Bordalo-Rodrigues M, Siqueira MG, Kurimori CO, Carneiro ACR, Martins RS, Foroni L, Oliveira AJM, Solla DJF. Diagnostic accuracy of imaging studies for diagnosing root avulsions in post-traumatic upper brachial plexus traction injuries in adults. Acta Neurochir (Wien). 2020;162(12):3189-3196.', doi: BORDALO_DOI },
  { citation: 'Yoshikawa T, Hayashi N, Yamamoto S, Tajiri Y, Yoshioka N, Masumoto T, Mori H, Abe O, Aoki S, Ohtomo K. Brachial plexus injury: clinical manifestations, conventional imaging findings, and the latest imaging techniques. RadioGraphics. 2006;26 Suppl 1:S133-S143.', doi: YOSHIKAWA_DOI },
  { citation: 'Hayashi N, Masumoto T, Abe O, Aoki S, Ohtomo K, Tajiri Y. Accuracy of abnormal paraspinal muscle findings on contrast-enhanced MR images as indirect signs of unilateral cervical root-avulsion injury. Radiology. 2002;223(2):397-402.', doi: HAYASHI_DOI },
  { citation: 'Silbermann-Hoffman O, Teboul F. Post-traumatic brachial plexus MRI in practice. Diagn Interv Imaging. 2013;94(10):925-943.', doi: SILBERMANN_DOI },
  { citation: 'Bertelli JA, Ghizoni MF. Use of clinical signs and computed tomography myelography findings in detecting and excluding nerve root avulsion in complete brachial plexus palsy. J Neurosurg. 2006;105(6):835-842.', doi: BERTELLI_DOI },
  { citation: 'Caranci F, Briganti F, La Porta M, Antinolfi G, Cesarano E, Fonio P, Brunese L, Coppolino F. Magnetic resonance imaging in brachial plexus injury. Musculoskelet Surg. 2013;97 Suppl 2:S181-S190.', doi: CARANCI_DOI },
  { citation: 'Kori SH, Foley KM, Posner JB. Brachial plexus lesions in patients with cancer: 100 cases. Neurology. 1981;31(1):45-50.', doi: KORI_DOI },
  { citation: 'Harper CM, Thomas JE, Cascino TL, Litchy WJ. Distinction between neoplastic and radiation-induced brachial plexopathy, with emphasis on the role of EMG. Neurology. 1989;39(4):502-506.', doi: HARPER_DOI },
  { citation: 'Thyagarajan D, Cascino T, Harms G. Magnetic resonance imaging in brachial plexopathy of cancer. Neurology. 1995;45(3 Pt 1):421-427.', doi: THYAGARAJAN_DOI },
  { citation: 'Qayyum A, MacVicar AD, Padhani AR, Revell P, Husband JE. Symptomatic brachial plexopathy following treatment for breast cancer: utility of MR imaging with surface-coil techniques. Radiology. 2000;214(3):837-842.', doi: QAYYUM_DOI },
  { citation: 'Wittenberg KH, Adkins MC. MR imaging of nontraumatic brachial plexopathies: frequency and spectrum of findings. RadioGraphics. 2000;20(4):1023-1032.', doi: WITTENBERG_DOI },
  { citation: 'Ahmad A, Barrington S, Maisey M, Rubens RD. Use of positron emission tomography in evaluation of brachial plexopathy in breast cancer patients. Br J Cancer. 1999;79(3-4):478-482.', doi: AHMAD_DOI },
  { citation: 'Kifjak D, Mura R, Khenkina N, Pochepnia S, Heidinger BH, Milos RI, Beer L, Prosch H. Something old something new: introduction to the ninth edition TNM classification of lung cancer. Br J Radiol. 2025;98(1174):1543-1555.', doi: KIFJAK_DOI },
  { citation: 'Heelan RT, Demas BE, Caravelli JF, Martini N, Bains MS, McCormack PM, Burt M, Panicek DM, Mitzner A. Superior sulcus tumors: CT and MR imaging. Radiology. 1989;170(3 Pt 1):637-641.', doi: HEELAN_DOI },
  { citation: 'Bruzzi JF, Komaki R, Walsh GL, Truong MT, Gladish GW, Munden RF, Erasmus JJ. Imaging of non-small cell lung cancer of the superior sulcus: part 2: initial staging and assessment of resectability and therapeutic response. RadioGraphics. 2008;28(2):561-572.', doi: BRUZZI_DOI },
  { citation: 'Binder DK, Smith JS, Barbaro NM. Primary brachial plexus tumors: imaging, surgical, and pathological findings in 25 patients. Neurosurg Focus. 2004;16(5):E11.', doi: BINDER_DOI },
  { citation: 'Jee WH, Oh SN, McCauley T, Ryu KN, Suh JS, Lee JH, Park JM, Chun KA, Sung MS, Kim K, Lee YS, Kang YK, Ok IY, Kim JM. Extraaxial neurofibromas versus neurilemmomas: discrimination with MRI. AJR Am J Roentgenol. 2004;183(3):629-633.', doi: JEE_DOI },
  { citation: 'Bhargava R, Parham DM, Lasater OE, Chari RS, Chen G, Fletcher BD. MR imaging differentiation of benign and malignant peripheral nerve sheath tumors: use of the target sign. Pediatr Radiol. 1997;27(2):124-129.', doi: BHARGAVA_DOI },
  { citation: 'Wasa J, Nishida Y, Tsukushi S, Shido Y, Sugiura H, Nakashima H, Ishiguro N. MRI features in the differentiation of malignant peripheral nerve sheath tumors and neurofibromas. AJR Am J Roentgenol. 2010;194(6):1568-1574.', doi: WASA_DOI },
  { citation: 'Li CS, Huang GS, Wu HD, Chen WT, Shih LS, Lii JM, Duh SJ, Chen RC, Tu HY, Chan WP. Differentiation of soft tissue benign and malignant peripheral nerve sheath tumors with magnetic resonance imaging. Clin Imaging. 2008;32(2):121-127.', doi: LI_DOI },
  { citation: 'Gaskin CM, Helms CA. Parsonage-Turner syndrome: MR imaging findings and clinical information of 27 patients. Radiology. 2006;240(2):501-507.', doi: GASKIN_DOI },
  { citation: 'Sneag DB, Saltzman EB, Meister DW, Feinberg JH, Lee SK, Wolfe SW. MRI bullseye sign: an indicator of peripheral nerve constriction in Parsonage-Turner syndrome. Muscle Nerve. 2017;56(1):99-106.', doi: SNEAG_2017_DOI },
  { citation: 'Sneag DB, Rancy SK, Wolfe SW, Lee SC, Kalia V, Lee SK, Feinberg JH. Brachial plexitis or neuritis? MRI features of lesion distribution in Parsonage-Turner syndrome. Muscle Nerve. 2018;58(3):359-366.', doi: SNEAG_2018_DOI },
  { citation: 'Sneag DB, Urban C, Li TY, Colucci PG, Pedrick EG, Nimura CA, Feinberg JH, Milani CJ, Tan ET. Hourglass-like constrictions on MRI are common in electromyography-confirmed cases of neuralgic amyotrophy (Parsonage-Turner syndrome): a tertiary referral center experience. Muscle Nerve. 2024;70(1):42-51.', doi: SNEAG_2024_DOI },
  { citation: 'Demondion X, Bacqueville E, Paul C, Duquesnoy B, Hachulla E, Cotten A. Thoracic outlet: assessment with MR imaging in asymptomatic and symptomatic populations. Radiology. 2003;227(2):461-468.', doi: DEMONDION_DOI },
  { citation: 'Hardy A, Pougès C, Wavreille G, Behal H, Demondion X, Lefebvre G. Thoracic outlet syndrome: diagnostic accuracy of MRI. Orthop Traumatol Surg Res. 2019;105(8):1563-1569.', doi: HARDY_DOI },
  { citation: 'Baumer P, Kele H, Kretschmer T, Koenig R, Pedro M, Bendszus M, Pham M. Thoracic outlet syndrome in 3T MR neurography: fibrous bands causing discernible lesions of the lower brachial plexus. Eur Radiol. 2014;24(3):756-761.', doi: BAUMER_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, except an eponym such as Horner. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) && !/^Horner/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/* Radiation plexopathy against tumour (B2-7, B3-11, B3-13): what each finding went with in the papers. */

const cancerTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Finding</th><th>Went with</th></tr>
      </thead>
      <tbody>
        <tr><td>A discrete mass in or beside the plexus</td><td className="vessel-name">Tumour</td></tr>
        <tr><td>Thickening and diffuse enhancement, no focal mass; low T1 and T2 signal</td><td className="vessel-name">Radiation fibrosis</td></tr>
        <tr><td>High T2 signal in or near the plexus</td><td className="vessel-name">Both (not useful alone)</td></tr>
        <tr><td>Severe pain, Horner syndrome, lower trunk (clinical)</td><td className="vessel-name">Tumour, in Kori's series</td></tr>
        <tr><td>Painless, lymphoedema, upper plexus (clinical)</td><td className="vessel-name">Radiation, in Kori's series</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. Exam, history and technique',
    body: (
      <>
        <p>The ACR criteria for plexopathy set out three clinical scenarios: a nontraumatic plexopathy with no known malignancy, a traumatic plexopathy (not perinatal), and a plexopathy in a patient with a known malignancy or after treatment ({ACR_2021}). This lesson follows them, with one change: it takes a mass found in or beside the plexus, with no known cancer, as a study of its own. So step 1 offers four: a traction injury, a known cancer, a mass, and a plexopathy with no injury and no known cancer. The order of the steps and the checklists are this site's own.</p>
        <p>For every scenario, a dedicated brachial plexus MRI is the most appropriate first test ({ACR_2021}). In the ACR's ratings, MRI with and without contrast scores 9 (usually appropriate) for a nontraumatic plexopathy and for a known cancer or after treatment. After trauma, MRI without contrast scores 9, MRI with and without contrast 7, and CT myelography 5 (may be appropriate). In a known cancer, whole-body FDG-PET/CT scores 6. When MRI cannot be done, CT gives the next best anatomical view ({ACR_2017}).</p>
        <p>The plexus does not run in one plane, so it needs three planes or 3D sequences that can be reformatted, with T1 and T2 weighting; contrast is used when tumour or infection is suspected, after surgery and after radiation ({SZARO_1}). Increased signal on T2 or STIR is best judged on coronal images, a large field of view allows the other side to be compared, a T1 sequence without fat suppression is useful, and the vessels should be checked ({SZARO_2}).</p>
        <p>After trauma, the plexus is imaged in three planes, contrast is not given routinely, and a cervical spine MRI with heavily T2-weighted images is added for the roots inside the canal ({SZARO_2}).</p>
        <p>At the lung apex, thin coronal and sagittal MRI was more accurate than CT for invasion through the superior sulcus (0.94 against 0.63) ({HEELAN}). CT shows bone erosion best; MRI shows spread into the neural foramina, the spinal cord and the plexus ({BRUZZI}).</p>
        <p>For thoracic outlet syndrome, compression of the nerves and arteries was shown only with the arm raised ({DEMONDION}). For neurogenic thoracic outlet syndrome the ACR rates chest MRI and a chest radiograph as usually appropriate (7) ({ACR_TOS}).</p>
      </>
    ),
  },
  {
    id: 'clinical',
    title: 'Step 2. The history and the side',
    body: (
      <>
        <h3>A traction injury</h3>
        <p>The question is whether the injury is preganglionic or postganglionic. A preganglionic injury (root avulsion) cuts the spinal nerve off from the cord; a postganglionic injury lies in the peripheral nerve. Root avulsion cannot recover by itself, while a postganglionic injury often regains useful function without surgery. Surgery is now done earlier, and nerve conduction studies and EMG are not usually reliable until three weeks after the injury ({SZARO_2}).</p>
        <p>A preganglionic injury needs a nerve transfer; a postganglionic injury is grafted or, if partial, followed ({SZARO_2}). The donors include the intercostal and accessory nerves and the contralateral C7 ({CARANCI}).</p>
        <p>The commonest pattern is the whole plexus, C5 to T1 (about 75%), then the upper plexus, C5 and C6 (about 20%), and less often the lower plexus, C8 and T1 (about 3%). Blunt trauma most often injures the supraclavicular plexus ({SZARO_2}). In complete palsies, Horner syndrome with pain in the hand pointed to avulsion of the lower roots in 93.7%; the lower roots were avulsed in 94% ({BERTELLI}).</p>
        <h3>A known cancer</h3>
        <p>Radiation fibrosis, lung cancer and breast cancer made up almost three-quarters of nontraumatic plexopathies in Wittenberg's series. Radiation fibrosis can come months to years after treatment. Cancer at the lung apex can invade the lower plexus, and breast cancer reaches it because its main lymphatic drainage runs through the apex of the axilla ({WITTENBERG}). Metastases are more common than primary tumours of the plexus; breast cancer, lung cancer and lymphoma are the usual sources, then head and neck cancers. A Pancoast tumour can invade the C8 and T1 roots or the lower trunk, with Horner syndrome in about 20% ({SZARO_1}).</p>
        <p>Radiation plexopathy is seen when the dose exceeds 60 Gy, and the upper trunk is affected most often ({SZARO_1}). Knowing when radiotherapy was given is critical to the diagnosis ({GILCREASE}).</p>
        <p>Kori's 100 patients with cancer and a plexopathy: severe pain in 80% with tumour but 19% with radiation injury; the lower trunk in 72% of tumours, and 32% also had epidural tumour; the upper plexus in 78% of radiation injuries; Horner syndrome more common with tumour and lymphoedema with radiation. With symptoms within a year of radiotherapy, doses over 6000 R went with radiation damage and lower doses with tumour ({KORI}). Harper found otherwise for the site: the distribution of weakness did not help, while pain, the time course, a discrete mass on CT and myokymia on EMG did ({HARPER}).</p>
        <h3>A mass</h3>
        <p>Primary tumours of the plexus are rare. Of Binder's 25, 15 were schwannomas, 5 neurofibromas, 4 malignant peripheral nerve sheath tumours and 1 a desmoid; 8 patients (32%) had neurofibromatosis, and 60% came with a palpable mass ({BINDER}). Gilcrease-Garcia names peripheral nerve sheath tumours as the commonest primary tumours ({GILCREASE}); Szaro names neurofibroma, about 30% of them in neurofibromatosis type 1 ({SZARO_1}).</p>
        <h3>A plexopathy with no injury and no known cancer</h3>
        <p>Neuralgic amyotrophy (Parsonage-Turner syndrome) starts with acute burning pain in the shoulder, then sensory change, weakness and wasting, usually of the upper plexus. It is diagnosed from the history, the examination and EMG; MRI is for atypical cases or when a history of trauma is unclear ({SZARO_1}).</p>
        <p>Thoracic outlet syndrome is compression of the plexus or the subclavian artery or vein. The neurogenic form makes up 90%, and its diagnosis is mainly clinical; MRI confirms it and looks for a cause that needs surgery ({SZARO_1}).</p>
      </>
    ),
  },
  {
    id: 'findings',
    title: 'Step 3. Roots, plexus and muscles',
    body: (
      <>
        <h3>A traction injury: the roots</h3>
        <p>Acute preganglionic injury shows as some mix of a pseudomeningocele, absent roots, deformed root sleeves, a displaced cord, blood or scar in the canal, denervation of the back muscles, and a syrinx. An absent root is more specific than a pseudomeningocele ({SZARO_2}). In Wade's series, a pseudomeningocele was 68% accurate as a marker of avulsion, and not reliable ({WADE_2018}); an avulsion can be present with no pseudomeningocele at all ({SILBERMANN}).</p>
        <p>In the paraspinal muscles, abnormal enhancement was 88% sensitive for root avulsion and high T2 signal 83%, and the multifidus was the most accurate muscle to look at ({HAYASHI}).</p>
        <p>In a meta-analysis of 11 studies, 72% of patients had at least one avulsed root. MRI was 93% sensitive and 72% specific for avulsion, root by root; the authors judged its accuracy modest and kept early surgical exploration as the preferred way to diagnose it ({WADE_2019}).</p>
        <p>Sources disagree on CT myelography. Against intradural exploration, CT myelography was 85% accurate and MRI 52% ({CARVALHO}); CT myelography was also more accurate in upper plexus injuries ({BORDALO}), and Yoshikawa's review made it the preferred first test ({YOSHIKAWA}). Doi found the same sensitivity, 92.9%, for MRI and for myelography with CT myelography ({DOI_2002}), and the ACR rates MRI above CT myelography ({ACR_2021}).</p>
        <h3>A traction injury: beyond the foramen</h3>
        <p>An acute postganglionic injury is a lesion in continuity or a tear: a difference from the other side, swelling, or a partial or complete rupture. The report should stress a complete rupture of one part or retraction of the whole plexus. Chronic injuries show as scar, fibrosis or a neuroma. A haematoma against the plexus suggests injury ({SZARO_2}).</p>
        <p>Szaro relates the signal to the grade of injury: a bright nerve of normal size with normal muscles is neuropraxia (grade 1); a bright nerve in continuity with abnormal muscle is grades 2 to 4; focal enlargement with mixed signal is a neuroma in continuity (grade 4); and complete discontinuity shows blood or fibrosis in the gap (grade 5). Muscle oedema can appear 24 hours after the injury, followed by atrophy and fat ({SZARO_2}).</p>
        <p>Szaro's checklist also asks about the clavicle and ribs, the phrenic nerve and the vessels: CT angiography shows where and how far an axillary artery is dissected ({SZARO_2}). Knowing whether a graftable C5 root is present is important, and enhancement in the scalene triangle did not predict the state of the root ({SILBERMANN}).</p>
        <h3>A known cancer</h3>
        <p>A mass beside the plexus was highly predictive of tumour and was the most useful way to tell it from radiation plexopathy. Increased T2 signal was common in both and did not help ({THYAGARAJAN}). After breast cancer treatment, MRI was 96% sensitive and 95% specific for recurrence ({QAYYUM}). Radiation fibrosis shows thickening and diffuse enhancement of the plexus with no focal mass, and soft tissue of low signal on T1 and T2 ({WITTENBERG}).</p>
        <p>Szaro reads high T2 signal as tumour and low signal as fibrosis, and finds contrast inconclusive, since tumour, treatment change and fibrosis can all enhance ({SZARO_1}). That differs from Thyagarajan's finding on T2 above; this lesson gives both.</p>
        {cancerTable}
        <p>FDG-PET/CT can help separate radiation plexitis from recurrence, though it shows little of the plexus itself ({ACR_2017}). In Ahmad's pilot study, 14 of 19 patients with breast cancer and a plexopathy had abnormal uptake at the plexus; of the 9 of them who also had CT, 6 had a CT that was normal or showed no clear recurrence ({AHMAD}).</p>
        <p>At the lung apex, a Pancoast tumour is T4 when it clearly involves the plexus beyond the T1 root (C8 or higher roots, the trunks, divisions, cords or terminal nerves), the subclavian vessels, the vertebral bodies, the lamina or the spinal canal; invasion of thoracic nerve roots such as T1 and T2, or the stellate ganglion, is T3 ({KIFJAK}).</p>
        <h3>A mass</h3>
        <p>In Jee's series, a target sign on T2 with central enhancement favoured neurofibroma (63% against 3% of schwannomas), and a fascicular appearance with a thin bright rim on T2 favoured schwannoma (48% against 8%); no finding or combination made the diagnosis certain ({JEE}). The target sign was in all 12 neurofibromas and in 1 of 11 malignant tumours ({BHARGAVA}).</p>
        <p>Benign tumours were smaller (mean 3.4 cm, against 8.2 cm), well defined, and continuous with a nerve, and showed the split fat and target signs more often; malignant ones were larger, with an infiltrative margin ({LI}). Wasa named four features of a malignant peripheral nerve sheath tumour against a neurofibroma: a larger size, peripheral enhancement, an oedema-like zone around it, and a cystic area inside it. Two or more were 61% sensitive and 90% specific, and such a tumour should be biopsied. In neurofibromatosis type 1, uneven T1 signal also helped. The abstract gives no size cut-off ({WASA}).</p>
        <p>A mass beside the plexus can compress or displace it. Except for lipoma, MRI cannot name most benign soft-tissue lesions, so a biopsy may be considered ({SZARO_1}).</p>
        <h3>A plexopathy with no injury and no known cancer</h3>
        <p>In neuralgic amyotrophy, the suprascapular nerve was involved in 97% of shoulders and the axillary nerve in 50%, judged by high T2 signal and fatty atrophy of the muscles ({GASKIN}). Sneag found the plexus itself normal in 24 of 27 patients, with focal constrictions in 32 of 38 nerves, and read the disease as one or more mononeuropathies ({SNEAG_2018}). Szaro describes diffuse oedema of the upper plexus instead, though MRI is often normal ({SZARO_1}); the two differ, and this lesson asks you to follow the branches.</p>
        <p>Hourglass constrictions were seen in 90.2% of patients with EMG-confirmed neuralgic amyotrophy ({SNEAG_2024}). Just above them, a bullseye sign (a bright rim around a dark centre across the nerve) marked 21 of 23 constrictions, all confirmed at surgery ({SNEAG_2017}).</p>
        <p>In thoracic outlet syndrome, MRI found a cause in 71% of patients who went to surgery, so 29% were false negatives: specific enough to plan surgery, not sensitive enough to screen. It was 100% sensitive and specific for a cervical rib ({HARDY}). About 6% of people have a cervical rib, and one does not mean thoracic outlet syndrome by itself ({SZARO_1}). Fibrous bands and rib anomalies compressing the plexus were seen on MR neurography, with high T2 signal in the compressed C8 nerve, lower trunk or medial cord, all confirmed at surgery ({BAUMER}). Nerve compression was seen in 7% of patients and in no volunteer ({DEMONDION}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 4. Other findings and the impression',
    body: (
      <>
        <p>After trauma, always say whether a root avulsion is present or suspected ({SZARO_2}), then which roots, then what lies beyond the foramen and at what level. For a known cancer, say whether there is a mass and what it touches, or describe the plexus if there is none. For a mass, give its nerve, size and features. For a plexopathy, give the nerves and muscles involved, and any cause at the thoracic outlet. This order is this site's own.</p>
      </>
    ),
  },
]

/* The report. */

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

function picked(values: Values, field: { id: string; options: Option[] }): string {
  const value = str(values, field.id)
  return value ? lowerFirst(optionLabel(field, value)) : ''
}

function chosen(values: Values, field: { id: string; options: Option[] }): string[] {
  return list(values, field.id).map((value) => lowerFirst(optionLabel(field, value)))
}

/** "a, b and c". */
function andList(items: string[]): string {
  return items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

const isTrauma = (v: Values) => str(v, 'history') === 'trauma'
const isCancer = (v: Values) => str(v, 'history') === 'cancer'
const isMass = (v: Values) => str(v, 'history') === 'mass'
const isPlexopathy = (v: Values) => str(v, 'history') === 'plexopathy'
const afterTreatment = (v: Values) => isCancer(v) && str(v, 'cancer-question') === 'after'
const avulsion = (v: Values) => isTrauma(v) && str(v, 'avulsion') === 'present'
const postInjured = (v: Values) => isTrauma(v) && ['oedema', 'neuroma', 'partial', 'complete'].includes(str(v, 'post'))
const cancerMass = (v: Values) => isCancer(v) && str(v, 'tumour') === 'mass'
const cancerDiffuse = (v: Values) => isCancer(v) && str(v, 'tumour') === 'diffuse'
const apexShown = (v: Values) => cancerMass(v) && str(v, 'primary') === 'lung'
const fromNerve = (v: Values) => isMass(v) && str(v, 'origin') === 'nerve'
const suspectedNa = (v: Values) => isPlexopathy(v) && str(v, 'suspected') === 'na'
const suspectedTos = (v: Values) => isPlexopathy(v) && str(v, 'suspected') === 'tos'

const ROOTS: Option[] = ['C5', 'C6', 'C7', 'C8', 'T1'].map((root) => ({ value: root, label: root }))

const fields = {
  history: { id: 'history', kind: 'choice', label: 'Study', required: true, options: [
    { value: 'trauma', label: 'Traction injury: preganglionic or postganglionic?' },
    { value: 'cancer', label: 'Known cancer: tumour spread, or plexopathy after treatment' },
    { value: 'mass', label: 'Mass in or beside the plexus' },
    { value: 'plexopathy', label: 'Plexopathy with no injury and no known cancer' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  missingTrauma: { id: 'missing-trauma', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && isTrauma(v), options: [
    { value: 'spine', label: 'Cervical spine with heavily T2-weighted images of the roots' },
    { value: 'coronal', label: 'Coronal fat-suppressed T2 or STIR with both sides in view' },
    { value: 't1', label: 'T1 without fat suppression' },
  ] },
  missingOther: { id: 'missing-other', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && !isTrauma(v) && str(v, 'history') !== '', options: [
    { value: 'coronal', label: 'Coronal fat-suppressed T2 or STIR with both sides in view' },
    { value: 't1', label: 'T1 without fat suppression' },
    { value: 'post', label: 'Fat-suppressed contrast-enhanced T1' },
  ] },

  side: { id: 'side', kind: 'choice', label: 'Side', required: true, showIf: (v) => str(v, 'history') !== '', options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Both', label: 'Both' },
  ] },
  pattern: { id: 'pattern', kind: 'choice', label: 'Clinical pattern', showIf: isTrauma, options: [
    { value: 'total', label: 'Whole plexus (C5 to T1)' },
    { value: 'upper', label: 'Upper plexus (C5 and C6, or C5 to C7)' },
    { value: 'lower', label: 'Lower plexus (C8 and T1)' },
    { value: 'other', label: 'Patchy or unclear' },
  ] },
  traumaSigns: { id: 'trauma-signs', kind: 'multi', label: 'Clinical signs', showIf: isTrauma, options: [
    { value: 'horner', label: 'Horner syndrome' },
    { value: 'hand-pain', label: 'Pain in the hand' },
  ] },
  weeks: { id: 'weeks', kind: 'number', label: 'Time since injury', unit: 'weeks', min: 0, max: 520, step: 1, showIf: isTrauma },

  primary: { id: 'primary', kind: 'choice', label: 'Primary cancer', showIf: isCancer, options: [
    { value: 'breast', label: 'Breast' },
    { value: 'lung', label: 'Lung' },
    { value: 'lymphoma', label: 'Lymphoma' },
    { value: 'other', label: 'Other' },
  ] },
  cancerQuestion: { id: 'cancer-question', kind: 'choice', label: 'Question', required: true, showIf: isCancer, options: [
    { value: 'staging', label: 'Tumour spread to the plexus (staging)' },
    { value: 'after', label: 'New plexopathy after treatment: tumour or radiation?' },
  ] },
  rtDose: { id: 'rt-dose', kind: 'number', label: 'Radiotherapy dose to the region', unit: 'Gy', min: 0, max: 150, step: 1, showIf: afterTreatment },
  rtMonths: { id: 'rt-months', kind: 'number', label: 'Time from radiotherapy to symptoms', unit: 'months', min: 0, max: 600, step: 1, showIf: afterTreatment },
  cancerSigns: { id: 'cancer-signs', kind: 'multi', label: 'Clinical signs', showIf: afterTreatment, options: [
    { value: 'pain', label: 'Severe pain' },
    { value: 'horner', label: 'Horner syndrome' },
    { value: 'lymphoedema', label: 'Lymphoedema of the arm' },
  ] },

  nf1: { id: 'nf1', kind: 'choice', label: 'Neurofibromatosis', showIf: isMass, options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },

  suspected: { id: 'suspected', kind: 'choice', label: 'Clinical question', showIf: isPlexopathy, options: [
    { value: 'na', label: 'Neuralgic amyotrophy (Parsonage-Turner): acute pain, then weakness' },
    { value: 'tos', label: 'Thoracic outlet syndrome: symptoms with the arm raised' },
    { value: 'other', label: 'Other or not stated' },
  ] },
  armRaised: { id: 'arm-raised', kind: 'choice', label: 'Images with the arm raised', showIf: suspectedTos, options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ] },

  // B4-1: required, since the report should always say whether a root avulsion is present or suspected.
  avulsion: { id: 'avulsion', kind: 'choice', label: 'Root avulsion (preganglionic)', required: true, showIf: isTrauma, options: [
    { value: 'none', label: 'No sign of it' },
    { value: 'present', label: 'Present' },
  ] },
  avulsedRoots: { id: 'avulsed-roots', kind: 'multi', label: 'Avulsed roots', showIf: avulsion, options: ROOTS },
  avulsionSigns: { id: 'avulsion-signs', kind: 'multi', label: 'Signs', showIf: avulsion, options: [
    { value: 'absent', label: 'Root absent in the canal' },
    { value: 'pseudomeningocele', label: 'Pseudomeningocele' },
    { value: 'sleeve', label: 'Deformed root sleeve' },
    { value: 'cord', label: 'Cord displaced' },
    { value: 'canal', label: 'Blood or scar in the canal' },
    { value: 'paraspinal', label: 'Paraspinal muscle oedema or enhancement' },
    { value: 'syrinx', label: 'Syrinx' },
  ] },
  post: { id: 'post', kind: 'choice', label: 'Beyond the foramen (postganglionic)', required: true, showIf: isTrauma, options: [
    { value: 'normal', label: 'Normal, same as the other side' },
    { value: 'oedema', label: 'Bright or swollen, in continuity' },
    { value: 'neuroma', label: 'Focal enlargement, mixed signal (neuroma in continuity)' },
    { value: 'partial', label: 'Partial rupture' },
    { value: 'complete', label: 'Complete rupture' },
  ] },
  postLevel: { id: 'post-level', kind: 'multi', label: 'Level', showIf: postInjured, options: [
    { value: 'roots', label: 'Roots, outside the foramen' },
    { value: 'trunks', label: 'Trunks' },
    { value: 'divisions', label: 'Divisions' },
    { value: 'cords', label: 'Cords' },
    { value: 'branches', label: 'Terminal branches' },
  ] },
  retraction: { id: 'retraction', kind: 'choice', label: 'Stumps retracted', showIf: (v) => isTrauma(v) && str(v, 'post') === 'complete', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  gap: { id: 'gap', kind: 'number', label: 'Gap between the stumps', unit: 'cm', min: 0, max: 20, step: 0.1, showIf: (v) => isTrauma(v) && str(v, 'post') === 'complete' },
  associated: { id: 'associated', kind: 'multi', label: 'Also', showIf: isTrauma, options: [
    { value: 'haematoma', label: 'Haematoma against the plexus' },
    { value: 'fracture', label: 'Clavicle or rib fracture' },
    { value: 'vessel', label: 'Vascular injury (dissection, pseudoaneurysm, occlusion)' },
    { value: 'diaphragm', label: 'Raised hemidiaphragm (phrenic nerve)' },
  ] },

  tumour: { id: 'tumour', kind: 'choice', label: 'Plexus', required: true, showIf: isCancer, options: [
    { value: 'none', label: 'No mass, plexus normal' },
    { value: 'mass', label: 'Mass in or against the plexus' },
    { value: 'diffuse', label: 'Thickened or bright, no focal mass' },
  ] },
  massEffect: { id: 'mass-effect', kind: 'choice', label: 'The mass', showIf: cancerMass, options: [
    { value: 'compresses', label: 'Compresses or displaces the plexus' },
    { value: 'infiltrates', label: 'Encases or infiltrates the plexus' },
  ] },
  parts: { id: 'parts', kind: 'multi', label: 'Parts involved', showIf: (v) => isCancer(v) && ['mass', 'diffuse'].includes(str(v, 'tumour')), options: [
    { value: 'upper', label: 'Upper trunk (C5 and C6)' },
    { value: 'middle', label: 'Middle trunk (C7)' },
    { value: 'lower', label: 'Lower trunk (C8 and T1)' },
    { value: 'cords', label: 'Cords (below the clavicle)' },
  ] },
  diffuseSignal: { id: 'diffuse-signal', kind: 'choice', label: 'Signal', showIf: cancerDiffuse, options: [
    { value: 'low', label: 'Low on T1 and T2' },
    { value: 'high', label: 'High on T2' },
  ] },
  apex: { id: 'apex', kind: 'multi', label: 'A lung apex tumour reaches', showIf: apexShown, options: [
    { value: 't1-root', label: 'The T1 root or the stellate ganglion' },
    { value: 'c8', label: 'C8 or a higher root, the trunks or the cords' },
    { value: 'spine', label: 'Vertebral body, lamina or spinal canal' },
    { value: 'subclavian', label: 'Subclavian artery or vein' },
  ] },

  origin: { id: 'origin', kind: 'choice', label: 'The mass', required: true, showIf: isMass, options: [
    { value: 'nerve', label: 'Arises from a nerve, which enters and leaves it' },
    { value: 'separate', label: 'Separate from the nerves, displacing them' },
    { value: 'infiltrative', label: 'Ill-defined, infiltrating the plexus' },
  ] },
  element: { id: 'element', kind: 'choice', label: 'Part of the plexus', showIf: isMass, options: [
    { value: 'root', label: 'Root' },
    { value: 'trunk', label: 'Trunk' },
    { value: 'division', label: 'Division' },
    { value: 'cord', label: 'Cord' },
    { value: 'branch', label: 'Terminal branch' },
  ] },
  massSize: { id: 'mass-size', kind: 'number', label: 'Largest size', unit: 'cm', min: 0, max: 40, step: 0.1, showIf: isMass },
  nstSigns: { id: 'nst-signs', kind: 'multi', label: 'Signs', showIf: fromNerve, options: [
    { value: 'target', label: 'Target sign on T2' },
    { value: 'central', label: 'Central enhancement' },
    { value: 'fascicular', label: 'Fascicular appearance on T2' },
    { value: 'rim', label: 'Thin bright rim on T2' },
    { value: 'split-fat', label: 'Split fat sign' },
  ] },
  malignant: { id: 'malignant', kind: 'multi', label: 'Features of malignancy (Wasa)', showIf: (v) => isMass(v) && ['nerve', 'infiltrative'].includes(str(v, 'origin')), options: [
    { value: 'large', label: 'Large' },
    { value: 'peripheral', label: 'Peripheral enhancement' },
    { value: 'oedema', label: 'Oedema-like zone around it' },
    { value: 'cyst', label: 'Cystic area inside it' },
  ] },
  fat: { id: 'fat', kind: 'choice', label: 'Fat signal on every sequence', showIf: (v) => isMass(v) && str(v, 'origin') === 'separate', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },

  plexus: { id: 'plexus', kind: 'choice', label: 'Plexus and branches', required: true, showIf: isPlexopathy, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Abnormal' },
  ] },
  plexusSigns: { id: 'plexus-signs', kind: 'multi', label: 'Signs', showIf: (v) => isPlexopathy(v) && str(v, 'plexus') === 'abnormal', options: [
    { value: 'bright', label: 'Bright or swollen nerve' },
    { value: 'constriction', label: 'Hourglass constriction or bullseye sign' },
    { value: 'compressed', label: 'Compressed at the thoracic outlet' },
  ] },
  nerves: { id: 'nerves', kind: 'multi', label: 'Nerves whose muscles are denervated', showIf: isPlexopathy, options: [
    { value: 'suprascapular', label: 'Suprascapular (supraspinatus, infraspinatus)' },
    { value: 'axillary', label: 'Axillary (deltoid, teres minor)' },
    { value: 'long-thoracic', label: 'Long thoracic (serratus anterior)' },
    { value: 'other', label: 'Other' },
  ] },
  outlet: { id: 'outlet', kind: 'multi', label: 'At the thoracic outlet', showIf: suspectedTos, options: [
    { value: 'cervical-rib', label: 'Cervical rib' },
    { value: 'band', label: 'Fibrous band' },
    { value: 'scalene', label: 'Large or accessory scalene muscle' },
    { value: 'rib', label: 'First rib or clavicle anomaly' },
  ] },

  denervation: { id: 'denervation', kind: 'choice', label: 'Muscles', showIf: (v) => str(v, 'history') !== '', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'oedema', label: 'Oedema-like signal' },
    { value: 'fatty', label: 'Atrophy and fat' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. small left pleural effusion' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-avulsion', label: 'No root avulsion' },
    { value: 'no-mass', label: 'No mass in or around the plexus' },
  ] },
} satisfies Record<string, Field>

/* Rule chips. */

function deriveTechnique(values: Values): Derived[] {
  const out: Derived[] = []
  const history = str(values, 'history')
  // B1-2: the ACR ratings for each scenario.
  if (history === 'trauma') out.push({ label: 'ACR', value: 'MRI without contrast 9; with and without 7; CT myelography 5' })
  else if (history === 'cancer') out.push({ label: 'ACR', value: 'MRI with and without contrast 9; FDG-PET/CT 6' })
  else if (history) out.push({ label: 'ACR', value: 'MRI with and without contrast 9' })
  return out
}

function deriveClinical(values: Values): Derived[] {
  const out: Derived[] = []
  if (isTrauma(values)) {
    // B2-3: how often each pattern is seen.
    const pattern = str(values, 'pattern')
    if (pattern === 'total') out.push({ label: 'Pattern', value: 'Whole plexus: the commonest, about 75%' })
    if (pattern === 'upper') out.push({ label: 'Pattern', value: 'Upper plexus: about 20%' })
    if (pattern === 'lower') out.push({ label: 'Pattern', value: 'Lower plexus: about 3%' })
    // B2-4: Horner syndrome with hand pain, in complete palsies.
    const signs = list(values, 'trauma-signs')
    if (pattern === 'total' && signs.includes('horner') && signs.includes('hand-pain')) out.push({ label: 'Lower roots', value: 'Horner syndrome with hand pain: lower root avulsion in 93.7%', tone: 'warn' })
    // B2-1: EMG before three weeks.
    const weeks = num(values, 'weeks')
    if (weeks !== undefined && weeks < 3) out.push({ label: 'EMG', value: 'Not usually reliable until three weeks after the injury' })
  }
  if (afterTreatment(values)) {
    // B2-7: dose and timing in Kori's series.
    const dose = num(values, 'rt-dose')
    const months = num(values, 'rt-months')
    if (dose !== undefined && months !== undefined && months <= 12) {
      out.push(dose > 60
        ? { label: 'Dose', value: 'Over 60 Gy, symptoms within a year: went with radiation damage' }
        : { label: 'Dose', value: '60 Gy or less, symptoms within a year: went with tumour', tone: 'warn' })
    }
    const signs = list(values, 'cancer-signs')
    if (signs.includes('pain') || signs.includes('horner')) out.push({ label: 'Clinical', value: 'Severe pain and Horner syndrome were commoner with tumour', tone: 'warn' })
    if (signs.includes('lymphoedema')) out.push({ label: 'Lymphoedema', value: 'Commoner with radiation injury' })
  }
  // B2-11, B3-20: neurofibromatosis.
  if (isMass(values) && str(values, 'nf1') === 'yes') out.push({ label: 'Neurofibromatosis', value: 'Uneven T1 signal also pointed to a malignant tumour' })
  // B2-13, B2-14, B1-6: how each plexopathy is diagnosed.
  if (suspectedNa(values)) out.push({ label: 'Neuralgic amyotrophy', value: 'Diagnosed from the history, examination and EMG; MRI for atypical cases' })
  if (suspectedTos(values)) {
    out.push({ label: 'Thoracic outlet', value: 'Diagnosis mainly clinical; MRI shows a cause' })
    if (str(values, 'arm-raised') === 'no') out.push({ label: 'Arm down only', value: 'Compression was shown only with the arm raised', tone: 'warn' })
  }
  return out
}

/** How many of Wasa's four features (B3-20) are ticked. */
function wasaCount(values: Values): number {
  return list(values, 'malignant').length
}

function deriveFindings(values: Values): Derived[] {
  const out: Derived[] = []
  if (isTrauma(values)) {
    const pre = str(values, 'avulsion')
    // B3-5: MRI accuracy for avulsion.
    if (pre === 'present') out.push({ label: 'MRI for avulsion', value: '93% sensitive, 72% specific; surgical exploration remains the reference' })
    if (pre === 'none') out.push({ label: 'MRI for avulsion', value: '93% sensitive: a normal MRI does not exclude it' })
    const signs = list(values, 'avulsion-signs')
    // B3-1, B3-2: a pseudomeningocele without an absent root.
    if (signs.includes('pseudomeningocele') && !signs.includes('absent')) out.push({ label: 'Pseudomeningocele', value: 'Not reliable alone (68% accurate); an absent root is more specific', tone: 'warn' })
    // B3-4: the paraspinal muscles.
    if (signs.includes('paraspinal')) out.push({ label: 'Paraspinal muscles', value: 'Enhancement 88% sensitive; the multifidus is the most accurate' })
    // B3-8: the grade of injury from the nerve and muscle signal.
    const post = str(values, 'post')
    const muscles = str(values, 'denervation')
    if (post === 'oedema' && muscles === 'normal') out.push({ label: 'Grade', value: 'Bright nerve, normal muscles: neuropraxia (grade 1)' })
    if (post === 'oedema' && (muscles === 'oedema' || muscles === 'fatty')) out.push({ label: 'Grade', value: 'Bright nerve, abnormal muscles: grades 2 to 4' })
    if (post === 'neuroma') out.push({ label: 'Grade', value: 'Neuroma in continuity (grade 4)' })
    // B3-7: report a complete rupture or retraction.
    if (post === 'complete') out.push({ label: 'Complete rupture', value: 'Stress it, and any retraction, in the report (grade 5)', tone: 'warn' })
    // B3-10: the vessels, ribs and phrenic nerve.
    const also = list(values, 'associated')
    if (also.includes('vessel')) out.push({ label: 'Vessels', value: 'CT angiography shows where and how far an axillary artery is dissected', tone: 'warn' })
    if (also.includes('fracture') || also.includes('diaphragm')) out.push({ label: 'Nerve transfer', value: 'Alert the surgeon: rib fractures and phrenic palsy bear on intercostal nerve transfers' })
  }
  if (isCancer(values)) {
    const tumour = str(values, 'tumour')
    // B3-11: a mass predicts tumour.
    if (tumour === 'mass') out.push({ label: 'Mass', value: 'Highly predictive of tumour', tone: 'warn' })
    // B3-13, B3-14, B3-11: no focal mass.
    if (tumour === 'diffuse') {
      const signal = str(values, 'diffuse-signal')
      if (signal === 'low') out.push({ label: 'No focal mass', value: 'Thickening with low T1 and T2 signal: radiation fibrosis' })
      if (signal === 'high') out.push({ label: 'High T2', value: 'Seen with both tumour and radiation; FDG-PET/CT may help', tone: 'warn' })
    }
    // B2-7, B2-8: the site, which the series disagree on.
    const parts = list(values, 'parts')
    if (afterTreatment(values) && parts.length > 0) {
      if (parts.includes('lower')) out.push({ label: 'Lower trunk', value: 'Involved in 72% of tumours (Kori); the distribution of weakness did not help (Harper)' })
      else if (parts.includes('upper')) out.push({ label: 'Upper plexus', value: 'Involved in 78% of radiation injuries (Kori); the distribution of weakness did not help (Harper)' })
    }
    // B2-7: epidural tumour.
    if (tumour === 'mass' && parts.includes('lower')) out.push({ label: 'Canal', value: 'Check the foramina: 32% also had epidural tumour' })
    // B3-16: a lung apex tumour, T3 or T4.
    const apex = list(values, 'apex')
    if (apex.some((item) => ['c8', 'spine', 'subclavian'].includes(item))) out.push({ label: 'Superior sulcus', value: 'T4', tone: 'warn' })
    else if (apex.includes('t1-root')) out.push({ label: 'Superior sulcus', value: 'T3 (thoracic root or stellate ganglion only)' })
  }
  if (isMass(values)) {
    const signs = list(values, 'nst-signs')
    // B3-18: the target sign.
    if (signs.includes('target')) out.push({ label: 'Target sign', value: 'In 12 of 12 neurofibromas, 1 of 11 malignant tumours' })
    // B3-17: neurofibroma against schwannoma.
    if (signs.includes('target') && signs.includes('central')) out.push({ label: 'Neurofibroma', value: 'Target sign with central enhancement: 63%, against 3% of schwannomas' })
    if (signs.includes('fascicular') && signs.includes('rim')) out.push({ label: 'Schwannoma', value: 'Fascicular with a thin bright rim: 48%, against 8% of neurofibromas' })
    // B3-19: the split fat sign.
    if (signs.includes('split-fat')) out.push({ label: 'Split fat', value: 'Commoner in benign tumours' })
    // B3-20: two or more of Wasa's four features.
    const count = wasaCount(values)
    if (count >= 2) out.push({ label: 'Malignant?', value: `${count} of Wasa's 4 features: suspicious (2 or more 61% sensitive, 90% specific); biopsy`, tone: 'warn' })
    // B3-19: an infiltrative margin.
    if (str(values, 'origin') === 'infiltrative') out.push({ label: 'Margin', value: 'Infiltrative: a feature of malignancy', tone: 'warn' })
    // B3-21: fat.
    const fat = str(values, 'fat')
    if (fat === 'yes') out.push({ label: 'Lipoma', value: 'The benign lesion MRI can name' })
    if (fat === 'no') out.push({ label: 'Not fat', value: 'Most benign soft-tissue lesions other than lipoma need a biopsy to name' })
  }
  if (isPlexopathy(values)) {
    const nerves = list(values, 'nerves')
    // B3-22: the nerves in neuralgic amyotrophy.
    if (suspectedNa(values) && nerves.includes('suprascapular')) out.push({ label: 'Suprascapular', value: 'Involved in 97% of shoulders; axillary in 50%' })
    // B3-23, B3-25: the plexus proper is usually normal.
    if (suspectedNa(values) && str(values, 'plexus') === 'normal') out.push({ label: 'Normal plexus', value: 'Normal in 24 of 27: follow the branches for constrictions' })
    // B3-24: hourglass constrictions.
    if (list(values, 'plexus-signs').includes('constriction')) out.push({ label: 'Constriction', value: 'In 90.2% of EMG-confirmed neuralgic amyotrophy' })
    if (suspectedTos(values)) {
      const outlet = list(values, 'outlet')
      // B3-26, B3-28: the cervical rib.
      if (outlet.includes('cervical-rib')) out.push({ label: 'Cervical rib', value: 'MRI 100% sensitive and specific; but a rib alone does not mean the syndrome' })
      // B3-27: fibrous bands.
      if (outlet.includes('band')) out.push({ label: 'Fibrous band', value: 'With T2 signal in C8, the lower trunk or medial cord: confirmed at surgery' })
      // B3-26: a negative MRI.
      if (str(values, 'plexus') === 'normal' && outlet.length === 0) out.push({ label: 'No cause seen', value: '29% false negatives: MRI does not rule it out', tone: 'warn' })
    }
  }
  // B3-9: denervated muscle.
  const muscles = str(values, 'denervation')
  if (muscles === 'oedema') out.push({ label: 'Muscles', value: 'Acute denervation (from 24 hours after a nerve injury)' })
  if (muscles === 'fatty') out.push({ label: 'Muscles', value: 'Later denervation: atrophy and fat' })
  return out
}

/* Report lines. */

const TECHNIQUE: Record<string, string> = {
  trauma: 'brachial plexus MRI in three planes without contrast, with the cervical spine and heavily T2-weighted images of the roots',
  cancer: 'brachial plexus MRI in three planes, T1 without fat suppression, fat-suppressed T2 and fat-suppressed contrast-enhanced T1',
  mass: 'brachial plexus MRI in three planes, T1 without fat suppression, fat-suppressed T2 and fat-suppressed contrast-enhanced T1',
  plexopathy: 'brachial plexus MRI in three planes, T1 without fat suppression, fat-suppressed T2 and fat-suppressed contrast-enhanced T1',
}

function techniqueLines(values: Values): (string | false)[] {
  const history = str(values, 'history')
  const protocol = str(values, 'protocol')
  const missing = isTrauma(values) ? chosen(values, fields.missingTrauma) : chosen(values, fields.missingOther)
  const raised = suspectedTos(values) && str(values, 'arm-raised') === 'yes' ? ', with images with the arm raised' : ''
  return [
    history && `Study: ${picked(values, fields.history)}`,
    protocol === 'complete' && history && `Technique: ${TECHNIQUE[history]}${raised}`,
    protocol === 'incomplete' && `Technique: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
  ]
}

function clinicalLines(values: Values): (string | false)[] {
  const side = str(values, 'side')
  if (isTrauma(values)) {
    const weeks = num(values, 'weeks')
    const clinical = join([lowerFirst(side), picked(values, fields.pattern), ...chosen(values, fields.traumaSigns), weeks !== undefined && `${weeks} weeks after the injury`], ', ')
    return [clinical && `Clinical: ${clinical}`]
  }
  if (isCancer(values)) {
    const dose = num(values, 'rt-dose')
    const months = num(values, 'rt-months')
    const clinical = join([
      lowerFirst(side),
      ({ breast: 'breast cancer', lung: 'lung cancer', lymphoma: 'lymphoma', other: 'other cancer' } as Record<string, string>)[str(values, 'primary')],
      ({ staging: 'staging', after: 'new plexopathy after treatment' } as Record<string, string>)[str(values, 'cancer-question')],
      dose !== undefined && `${dose} Gy`,
      months !== undefined && `symptoms ${months} months after radiotherapy`,
      ...chosen(values, fields.cancerSigns),
    ], ', ')
    return [clinical && `Clinical: ${clinical}`]
  }
  if (isMass(values)) {
    const clinical = join([lowerFirst(side), str(values, 'nf1') === 'yes' && 'neurofibromatosis'], ', ')
    return [clinical && `Clinical: ${clinical}`]
  }
  if (isPlexopathy(values)) {
    const suspected = str(values, 'suspected')
    const clinical = join([lowerFirst(side), suspected === 'na' && 'suspected neuralgic amyotrophy', suspected === 'tos' && 'suspected thoracic outlet syndrome'], ', ')
    return [clinical && `Clinical: ${clinical}`]
  }
  return []
}

function findingLines(values: Values): (string | false)[] {
  const out: (string | false)[] = []
  if (isTrauma(values)) {
    const pre = str(values, 'avulsion')
    if (pre === 'none') out.push('Roots: no sign of avulsion')
    if (pre === 'present') {
      out.push(`Roots: avulsion${list(values, 'avulsed-roots').length > 0 ? ` of ${list(values, 'avulsed-roots').join(', ')}` : ''}`)
      const signs = chosen(values, fields.avulsionSigns)
      if (signs.length > 0) out.push(`Signs: ${signs.join(', ')}`)
    }
    if (str(values, 'post')) {
      const levels = chosen(values, fields.postLevel)
      const gap = num(values, 'gap')
      out.push(`Beyond the foramen: ${join([picked(values, fields.post), levels.length > 0 && levels.join(', '), str(values, 'retraction') === 'yes' && 'stumps retracted', gap !== undefined && `gap ${gap} cm`], ', ')}`)
    }
    const also = chosen(values, fields.associated)
    if (also.length > 0) out.push(`Also: ${also.join(', ')}`)
  }
  if (isCancer(values) && str(values, 'tumour')) {
    out.push(`Plexus: ${join([picked(values, fields.tumour), picked(values, fields.massEffect), picked(values, fields.diffuseSignal)], ', ')}`)
    const parts = chosen(values, fields.parts)
    if (parts.length > 0) out.push(`Parts involved: ${parts.join(', ')}`)
    const apex = chosen(values, fields.apex)
    if (apex.length > 0) out.push(`Lung apex tumour reaches: ${apex.join(', ')}`)
  }
  if (isMass(values) && str(values, 'origin')) {
    const size = num(values, 'mass-size')
    out.push(`Mass: ${join([picked(values, fields.origin), str(values, 'element') && `the ${picked(values, fields.element)}`, size !== undefined && `${size} cm`], ', ')}`)
    const signs = chosen(values, fields.nstSigns)
    if (signs.length > 0) out.push(`Signs: ${signs.join(', ')}`)
    const malignant = chosen(values, fields.malignant)
    if (malignant.length > 0) out.push(`Features of malignancy: ${malignant.join(', ')}`)
    if (str(values, 'fat') === 'yes') out.push('Fat signal on every sequence')
  }
  if (isPlexopathy(values) && str(values, 'plexus')) {
    out.push(`Plexus and branches: ${join([picked(values, fields.plexus), ...chosen(values, fields.plexusSigns)], ', ')}`)
    const outlet = chosen(values, fields.outlet)
    if (outlet.length > 0) out.push(`Thoracic outlet: ${outlet.join(', ')}`)
    const nerves = chosen(values, fields.nerves)
    if (nerves.length > 0) out.push(`Denervated muscles: ${nerves.join(', ')}`)
  }
  if (str(values, 'denervation')) out.push(`Muscles: ${picked(values, fields.denervation)}`)
  return out
}

/* The impression. */

function sided(side: string, rest: string): string {
  const word = side === 'Both' ? 'Bilateral' : side
  return word ? `${word} ${lowerFirst(rest)}` : upperFirst(rest)
}

const POST_WORDS: Record<string, string> = {
  oedema: 'injury in continuity (oedema or swelling)',
  neuroma: 'neuroma in continuity',
  partial: 'partial rupture',
  complete: 'complete rupture',
}

const ELEMENT_WORDS: Record<string, string> = {
  root: 'a root',
  trunk: 'a trunk',
  division: 'a division',
  cord: 'a cord',
  branch: 'a terminal branch',
}

const NERVE_WORDS: Record<string, string> = {
  suprascapular: 'suprascapular',
  axillary: 'axillary',
  'long-thoracic': 'long thoracic',
}

function traumaFindings(values: Values): string[] {
  const out: string[] = []
  const side = str(values, 'side')
  const roots = list(values, 'avulsed-roots')
  if (str(values, 'avulsion') === 'present') out.push(`${sided(side, `root avulsion (preganglionic injury)${roots.length > 0 ? ` of ${andList(roots)}` : ''}`)}.`)
  const post = str(values, 'post')
  if (POST_WORDS[post]) {
    const levels = chosen(values, fields.postLevel)
    const gap = num(values, 'gap')
    const detail = join([str(values, 'retraction') === 'yes' && 'with retracted stumps', gap !== undefined && `a gap of ${gap} cm`], ', ')
    out.push(`${sided(side, `postganglionic ${POST_WORDS[post]}${levels.length > 0 ? ` at the ${andList(levels)}` : ''}`)}${detail ? `, ${detail}` : ''}.`)
  }
  if (str(values, 'avulsion') === 'none' && post === 'normal') out.push('No sign of root avulsion or postganglionic injury.')
  else if (str(values, 'avulsion') === 'none' && post) out.push('No sign of root avulsion.')
  else if (str(values, 'avulsion') === 'present' && post === 'normal') out.push('No postganglionic injury seen.')
  if (list(values, 'associated').includes('vessel')) out.push('Vascular injury.')
  return out
}

function cancerFindings(values: Values): string[] {
  const side = str(values, 'side')
  const tumour = str(values, 'tumour')
  const parts = chosen(values, fields.parts).map((part) => part.replace(/ \(.*\)$/, ''))
  const where = parts.length > 0 ? ` (${andList(parts)})` : ''
  if (tumour === 'none') return ['No mass in or around the brachial plexus.']
  if (tumour === 'mass') {
    const verb = str(values, 'mass-effect') === 'infiltrates' ? 'encasing or infiltrating' : str(values, 'mass-effect') === 'compresses' ? 'compressing' : 'involving'
    const out = [`${sided(side, `mass ${verb} the brachial plexus${where}`)}.`]
    const apex = list(values, 'apex')
    if (apex.some((item) => ['c8', 'spine', 'subclavian'].includes(item))) out.push('Superior sulcus tumour: T4 by its extent.')
    else if (apex.includes('t1-root')) out.push('Superior sulcus tumour: at least T3.')
    return out
  }
  if (tumour === 'diffuse') {
    const signal = str(values, 'diffuse-signal')
    if (signal === 'low') return [`${sided(side, `brachial plexus thickened${where}, low on T1 and T2, with no focal mass`)}.`]
    if (signal === 'high') return [`${sided(side, `brachial plexus thickened${where}, high on T2, with no focal mass`)}.`]
    return [`${sided(side, `brachial plexus thickened${where}, no focal mass`)}.`]
  }
  return []
}

function massFindings(values: Values): string[] {
  const side = str(values, 'side')
  const origin = str(values, 'origin')
  const size = num(values, 'mass-size')
  const sizeText = size !== undefined ? `${size} cm ` : ''
  const element = ELEMENT_WORDS[str(values, 'element')]
  const out: string[] = []
  if (origin === 'nerve') {
    const signs = chosen(values, fields.nstSigns)
    out.push(`${sided(side, `${sizeText}mass arising from ${element ?? 'the brachial plexus'}${signs.length > 0 ? `, with ${andList(signs)}` : ''}`)}.`)
  }
  if (origin === 'separate') {
    out.push(`${sided(side, `${sizeText}mass beside the brachial plexus, displacing it${str(values, 'fat') === 'yes' ? ', with fat signal on every sequence' : ''}`)}.`)
  }
  if (origin === 'infiltrative') out.push(`${sided(side, `${sizeText}ill-defined mass infiltrating ${element ?? 'the brachial plexus'}`)}.`)
  const malignant = chosen(values, fields.malignant)
  if (wasaCount(values) >= 2) out.push(`Features of malignancy: ${andList(malignant)}.`)
  return out
}

function plexopathyFindings(values: Values): string[] {
  const side = str(values, 'side')
  const out: string[] = []
  const signs = list(values, 'plexus-signs')
  const nerves = list(values, 'nerves').filter((nerve) => nerve !== 'other').map((nerve) => NERVE_WORDS[nerve])
  if (signs.includes('constriction')) out.push(`${sided(side, `hourglass constriction${nerves.length > 0 ? ` of the ${andList(nerves)} nerve${nerves.length > 1 ? 's' : ''}` : ''}`)}.`)
  else if (signs.includes('bright')) out.push(`${sided(side, `abnormal signal or swelling of the ${nerves.length > 0 ? `${andList(nerves)} nerve${nerves.length > 1 ? 's' : ''}` : 'brachial plexus'}`)}.`)
  if (nerves.length > 0 && str(values, 'denervation') && str(values, 'denervation') !== 'normal') {
    out.push(`Denervation of the muscles supplied by the ${andList(nerves)} nerve${nerves.length > 1 ? 's' : ''}.`)
  }
  const outlet = chosen(values, fields.outlet)
  if (outlet.length > 0) out.push(`${sided(side, `${andList(outlet)} at the thoracic outlet${signs.includes('compressed') ? ', compressing the brachial plexus' : ''}`)}.`)
  else if (signs.includes('compressed')) out.push(`${sided(side, 'brachial plexus compressed at the thoracic outlet')}.`)
  if (str(values, 'plexus') === 'normal' && outlet.length === 0 && nerves.length === 0) out.push('Brachial plexus normal.')
  return out
}

function denervationFinding(values: Values): string[] {
  // The plexopathy impression names the nerves itself.
  if (isPlexopathy(values) && list(values, 'nerves').some((nerve) => nerve !== 'other')) return []
  const muscles = str(values, 'denervation')
  if (muscles === 'oedema') return ['Acute denervation of the muscles supplied.']
  if (muscles === 'fatty') return ['Chronic denervation: atrophy and fat in the muscles supplied.']
  return []
}

function findings(values: Values): string[] {
  const out = isTrauma(values) ? traumaFindings(values) : isCancer(values) ? cancerFindings(values) : isMass(values) ? massFindings(values) : isPlexopathy(values) ? plexopathyFindings(values) : []
  return [...out, ...denervationFinding(values)]
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function impression(values: Values): string {
  const found = findings(values)
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines(limited, 'Findings as above.', ...negatives)}`
    if (!complete(values)) return ''
    return `Impression: ${lines(limited, 'No abnormality seen.', ...negatives)}`
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  if (negatives.includes('no-avulsion') && avulsion(values)) out.push('Impression says no root avulsion, but an avulsion is entered.')
  const massEntered = cancerMass(values) || (isMass(values) && str(values, 'origin') !== '')
  if (negatives.includes('no-mass') && massEntered) out.push('Impression says no mass, but a mass is entered.')
  // B3-1: an avulsion entered with none of its signs.
  if (avulsion(values) && list(values, 'avulsion-signs').length === 0 && list(values, 'avulsed-roots').length > 0) {
    out.push('Root avulsion is entered with none of its signs: check for an absent root, a pseudomeningocele, the root sleeves, the cord and the paraspinal muscles.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...clinicalLines(values),
    ...findingLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. Exam, history and technique',
    learn: 'technique',
    teach: <p>A dedicated brachial plexus MRI first, in every scenario ({ACR_2021}). Three planes, coronal fat-suppressed T2 or STIR with both sides in view, T1 without fat suppression ({SZARO_2}); contrast for a tumour or after radiation ({SZARO_1}); the cervical spine after trauma ({SZARO_2}).</p>,
    fields: [fields.history, fields.protocol, fields.missingTrauma, fields.missingOther],
    derive: deriveTechnique,
  },
  {
    id: 'clinical',
    title: 'Step 2. The history and the side',
    learn: 'clinical',
    teach: (
      <>
        <p>Trauma: root avulsion does not recover by itself and needs a nerve transfer; a postganglionic injury can be grafted or recover ({SZARO_2}). After radiotherapy: the dose, when it was given and the clinical signs ({KORI}; {GILCREASE}).</p>
        <p>Neuralgic amyotrophy and thoracic outlet syndrome are diagnosed mainly clinically; MRI looks for a cause ({SZARO_1}). Arm raised for the thoracic outlet ({DEMONDION}).</p>
      </>
    ),
    fields: [
      fields.side,
      fields.pattern, fields.traumaSigns, fields.weeks,
      fields.primary, fields.cancerQuestion, fields.rtDose, fields.rtMonths, fields.cancerSigns,
      fields.nf1,
      fields.suspected, fields.armRaised,
    ],
    derive: deriveClinical,
  },
  {
    id: 'findings',
    title: 'Step 3. Roots, plexus and muscles',
    learn: 'findings',
    teach: (
      <>
        <p>Trauma: an absent root is more specific than a pseudomeningocele ({SZARO_2}; {WADE_2018}); look at the multifidus ({HAYASHI}). Beyond the foramen: in continuity, partial or complete rupture, retraction ({SZARO_2}).</p>
        <p>Known cancer: a mass was highly predictive of tumour ({THYAGARAJAN}); thickening without a mass, dark on T1 and T2, went with radiation fibrosis ({WITTENBERG}). Mass: target, fascicular and split fat signs, and Wasa's four features ({JEE}; {WASA}).</p>
        {cancerTable}
      </>
    ),
    fields: [
      fields.avulsion, fields.avulsedRoots, fields.avulsionSigns, fields.post, fields.postLevel, fields.retraction, fields.gap, fields.associated,
      fields.tumour, fields.massEffect, fields.parts, fields.diffuseSignal, fields.apex,
      fields.origin, fields.element, fields.massSize, fields.nstSigns, fields.malignant, fields.fat,
      fields.plexus, fields.plexusSigns, fields.nerves, fields.outlet,
      fields.denervation,
    ],
    derive: deriveFindings,
  },
  {
    id: 'impression',
    title: 'Step 4. Other findings and the impression',
    learn: 'impression',
    teach: <p>After trauma, always say whether a root is avulsed ({SZARO_2}); then the level beyond the foramen. Cancer: mass or none, and what it touches. Mass: nerve, size, features. Plexopathy: nerves, muscles, outlet.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'brachial-plexus',
  name: 'Brachial plexus MRI',
  lede: 'Read a brachial plexus MRI for a traction injury, a known cancer, a mass or a plexopathy with no clear cause: root avulsion and what lies beyond the foramen, tumour against radiation plexopathy, nerve sheath tumours, neuralgic amyotrophy and the thoracic outlet, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract, its open full text or the ACR\'s published ratings.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'acr',
      question: 'Which first test do the ACR criteria rate highest for a traumatic brachial plexopathy?',
      options: ['CT myelography', 'Brachial plexus MRI without contrast', 'Ultrasound of the neck', 'FDG-PET/CT'],
      answer: 1,
      explanation: <p>MRI without contrast scores 9, MRI with and without contrast 7, and CT myelography 5 ({ACR_2021}).</p>,
    },
    {
      id: 'preganglionic',
      question: 'Why does it matter whether a root injury is preganglionic?',
      options: ['It changes the contrast dose', 'A root avulsion cannot recover by itself and needs a nerve transfer', 'Preganglionic injuries always recover', 'It decides whether to image the other side'],
      answer: 1,
      explanation: <p>Root avulsion cuts the spinal nerve off from the cord and does not recover; a postganglionic injury can be grafted or recover ({SZARO_2}).</p>,
    },
    {
      id: 'pseudomeningocele',
      question: 'A pseudomeningocele is seen at C7, and the C7 root looks present. What did Wade find about pseudomeningoceles?',
      options: ['They prove avulsion', 'They were 68% accurate for avulsion and not reliable', 'They rule out avulsion', 'They only occur after surgery'],
      answer: 1,
      explanation: <p>A pseudomeningocele was 68% accurate as a marker of avulsion ({WADE_2018}); an absent root is more specific ({SZARO_2}).</p>,
    },
    {
      id: 'multifidus',
      question: 'Which paraspinal muscle was the most accurate indirect sign of a root avulsion?',
      options: ['Trapezius', 'Multifidus', 'Levator scapulae', 'Longus colli'],
      answer: 1,
      explanation: <p>Abnormal enhancement of the paraspinal muscles was 88% sensitive, and the multifidus was the most accurate ({HAYASHI}).</p>,
    },
    {
      id: 'meta',
      question: 'In the meta-analysis of MRI for root avulsion, how did MRI perform per root?',
      options: ['93% sensitive, 72% specific', '72% sensitive, 93% specific', '100% sensitive and specific', '50% sensitive, 50% specific'],
      answer: 0,
      explanation: <p>Its accuracy was modest, and early surgical exploration stayed the preferred way to diagnose avulsion ({WADE_2019}).</p>,
    },
    {
      id: 'radiation',
      question: 'Two years after radiotherapy for breast cancer, the plexus is thickened and dark on T1 and T2, with no focal mass. What fits best?',
      options: ['Recurrent tumour', 'Radiation fibrosis', 'Neuralgic amyotrophy', 'A schwannoma'],
      answer: 1,
      explanation: <p>Thickening and diffuse enhancement without a focal mass, with low T1 and T2 signal, is radiation fibrosis ({WITTENBERG}); a mass was highly predictive of tumour ({THYAGARAJAN}).</p>,
    },
    {
      id: 'kori',
      question: 'In Kori\'s series, which clinical picture suggested tumour rather than radiation injury?',
      options: ['Painless upper trunk weakness with lymphoedema', 'Severe pain, lower trunk weakness and Horner syndrome', 'Weakness only with the arm raised', 'Bilateral symptoms'],
      answer: 1,
      explanation: <p>Painful lower trunk lesions with Horner syndrome implied tumour; painless upper trunk lesions with lymphoedema suggested radiation ({KORI}). Harper found that the distribution of weakness did not help ({HARPER}).</p>,
    },
    {
      id: 'pancoast',
      question: 'A Pancoast tumour clearly involves the C8 root. What T category is it?',
      options: ['T2', 'T3', 'T4', 'It depends only on size'],
      answer: 2,
      explanation: <p>Involvement of C8 or higher roots, the trunks, divisions or cords is T4; thoracic nerve roots such as T1 alone are T3 ({KIFJAK}).</p>,
    },
    {
      id: 'schwannoma',
      question: 'A mass along a cord has a fascicular appearance and a thin bright rim on T2. Which tumour do these favour?',
      options: ['Neurofibroma', 'Schwannoma', 'Lipoma', 'Metastasis'],
      answer: 1,
      explanation: <p>Both together were in 48% of schwannomas and 8% of neurofibromas; a target sign with central enhancement favoured neurofibroma ({JEE}).</p>,
    },
    {
      id: 'wasa',
      question: 'A nerve sheath tumour shows peripheral enhancement and a cystic area inside it. What did Wasa advise?',
      options: ['No follow-up', 'Two or more of the four features make it suspicious: biopsy', 'Repeat MRI in five years', 'Surgery without biopsy'],
      answer: 1,
      explanation: <p>Two or more of a large size, peripheral enhancement, a surrounding oedema-like zone and a cystic area were 61% sensitive and 90% specific for a malignant tumour ({WASA}).</p>,
    },
    {
      id: 'na',
      question: 'Which nerve was almost always involved in Parsonage-Turner syndrome on shoulder MRI?',
      options: ['Long thoracic', 'Suprascapular', 'Musculocutaneous', 'Subscapular'],
      answer: 1,
      explanation: <p>The suprascapular nerve in 97% of shoulders, the axillary nerve in 50% ({GASKIN}).</p>,
    },
    {
      id: 'tos',
      question: 'MRI for thoracic outlet syndrome shows no cause. What does Hardy\'s series say?',
      options: ['The syndrome is excluded', 'MRI had 29% false negatives and is not sensitive enough to screen', 'A cervical rib must have been missed', 'Nerve compression is common in volunteers'],
      answer: 1,
      explanation: <p>MRI found a cause in 71% of patients who had surgery; it was specific enough to plan surgery but not sensitive enough to screen ({HARDY}).</p>,
    },
  ],
}

export function BrachialPlexusStudyPage() {
  return <StudyPage study={study} />
}
