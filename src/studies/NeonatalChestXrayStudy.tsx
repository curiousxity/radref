import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { neonatalChestXrayScans } from '../data/scans/neonatalChestXray'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-11-01 with PubMed, Crossref and Europe PMC reachable, so every reference was
 * matched as it was cited and every claim was read in an abstract or an open full text (Lovrenski,
 * Gallacher, Dahm, Cerone, Rocha, D'Andrea, Verheij, Naseh, Zubi and Hauri-Hohl in full) before it
 * went in. The claims table is docs/superpowers/research/2026-11-01-neonatal-chest-xray-sources.md
 * (N claims). Rule chips and warnings carry their claim IDs. Each tip range is quoted as its source
 * states it; where sources give different ranges, the chip uses the one named in the sources doc and
 * says what the others give.
 */

const LOVRENSKI_DOI = '10.1007/s00330-024-11268-4'
const GALLACHER_DOI = '10.1183/20734735.000716'
const DAHM_DOI = '10.1001/jamapediatrics.2025.2108'
const MARAIS_DOI = '10.1016/j.prrv.2023.05.003'
const NARLA_DOI = '10.1148/radiographics.11.5.1947320'
const BLAYNEY_DOI = '10.1136/fn.71.1.f32'
const THAYYIL_DOI = '10.1055/s-2007-995221'
const CERONE_DOI = '10.3390/children9020169'
const ROST_DOI = '10.1002/(sici)1099-0496(199903)27:3<199::aid-ppul8>3.0.co;2-o'
const ROCHA_DOI = '10.1155/2018/7472964'
const DANDREA_DOI = '10.3389/fped.2021.774705'
const HOELLERING_DOI = '10.1097/pcc.0b013e31829f5efa'
const VERHEIJ_DOI = '10.1155/2010/873167'
const OESTREICH_DOI = '10.1007/s00247-010-1840-2'
const NASEH_DOI = '10.1038/s41390-025-04186-8'
const BARRINGTON_DOI = '10.1002/14651858.CD000505'
const ZUBI_DOI = '10.1155/2023/3241607'
const NOWLEN_DOI = '10.1542/peds.110.1.137'
const ODITA_DOI = '10.1007/bf02016263'
const CIZMECI_DOI = '10.1159/000354545'
const MARKOWITZ_DOI = '10.1148/radiology.167.3.3363127'
const HAURI_DOI = '10.1007/s00431-007-0517-9'
const BURT_DOI = '10.1148/radiology.142.1.7053553'
const JENG_DOI = '10.1016/j.jcma.2012.08.001'

const LOVRENSKI = <Cite doi={LOVRENSKI_DOI}>Lovrenski et al. for the ESPR, Eur Radiol 2025</Cite>
const GALLACHER = <Cite doi={GALLACHER_DOI}>Gallacher et al., Breathe 2016</Cite>
const DAHM = <Cite doi={DAHM_DOI}>Dahm et al., JAMA Pediatr 2025</Cite>
const MARAIS = <Cite doi={MARAIS_DOI}>Marais et al., Paediatr Respir Rev 2023</Cite>
const NARLA = <Cite doi={NARLA_DOI}>Narla et al., RadioGraphics 1991</Cite>
const BLAYNEY = <Cite doi={BLAYNEY_DOI}>Blayney and Logan, Arch Dis Child Fetal Neonatal Ed 1994</Cite>
const THAYYIL = <Cite doi={THAYYIL_DOI}>Thayyil et al., Am J Perinatol 2008</Cite>
const CERONE = <Cite doi={CERONE_DOI}>Cerone and Pinheiro, Children 2022</Cite>
const ROST = <Cite doi={ROST_DOI}>Rost et al., Pediatr Pulmonol 1999</Cite>
const ROCHA = <Cite doi={ROCHA_DOI}>Rocha et al., Can Respir J 2018</Cite>
const DANDREA = <Cite doi={DANDREA_DOI}>D'Andrea et al., Front Pediatr 2022</Cite>
const HOELLERING = <Cite doi={HOELLERING_DOI}>Hoellering et al., Pediatr Crit Care Med 2014</Cite>
const VERHEIJ = <Cite doi={VERHEIJ_DOI}>Verheij et al., Int J Pediatr 2010</Cite>
const OESTREICH = <Cite doi={OESTREICH_DOI}>Oestreich, Pediatr Radiol 2010</Cite>
const NASEH = <Cite doi={NASEH_DOI}>Naseh et al., Pediatr Res 2026</Cite>
const BARRINGTON = <Cite doi={BARRINGTON_DOI}>Barrington, Cochrane Database Syst Rev 2000</Cite>
const ZUBI = <Cite doi={ZUBI_DOI}>Zubi et al., Int J Pediatr 2023</Cite>
const NOWLEN = <Cite doi={NOWLEN_DOI}>Nowlen et al., Pediatrics 2002</Cite>
const ODITA = <Cite doi={ODITA_DOI}>Odita et al., Pediatr Radiol 1992</Cite>
const CIZMECI = <Cite doi={CIZMECI_DOI}>Cizmeci et al., Neonatology 2013</Cite>
const MARKOWITZ = <Cite doi={MARKOWITZ_DOI}>Markowitz, Radiology 1988</Cite>
const HAURI = <Cite doi={HAURI_DOI}>Hauri-Hohl et al., Eur J Pediatr 2008</Cite>
const BURT = <Cite doi={BURT_DOI}>Burt and Lester, Radiology 1982</Cite>
const JENG = <Cite doi={JENG_DOI}>Jeng et al., J Chin Med Assoc 2012</Cite>

const references: LessonReference[] = [
  { citation: 'Lovrenski J, Raissaki M, Plut D, Alexopoulou E, Görkem SB, Ozcan HN, Geiger J, Gräfe D, Sileo C, Caro-Dominguez P, Ciet P. ESR Essentials: imaging of common paediatric pulmonary diseases—practice recommendations by the European Society of Paediatric Radiology. Eur Radiol. 2025;35(8):5037-5052.', doi: LOVRENSKI_DOI },
  { citation: 'Gallacher DJ, Hart K, Kotecha S. Common respiratory conditions of the newborn. Breathe (Sheff). 2016;12(1):30-42.', doi: GALLACHER_DOI },
  { citation: 'Dahm SI, Sett A, Gunn EF, Ramanauskas F, Hall R, Stewart D, Koeppenkastrop S, McKenna K, Gardiner RE, Rao P, Tingay DG. Diaphragm position on chest radiograph to estimate lung volume in neonates. JAMA Pediatr. 2025;179(9):1034-1042.', doi: DAHM_DOI },
  { citation: 'Marais J, Venkatakrishna SSB, Calle-Toro JS, Goussard P, Eber E, Andronikou S. Patient rotation chest X-rays and the consequences of misinterpretation in paediatric radiology. Paediatr Respir Rev. 2023;47:41-50.', doi: MARAIS_DOI },
  { citation: 'Narla LD, Hom M, Lofland GK, Moskowitz WB. Evaluation of umbilical catheter and tube placement in premature infants. RadioGraphics. 1991;11(5):849-863.', doi: NARLA_DOI },
  { citation: 'Blayney MP, Logan DR. First thoracic vertebral body as reference for endotracheal tube placement. Arch Dis Child Fetal Neonatal Ed. 1994;71(1):F32-F35.', doi: BLAYNEY_DOI },
  { citation: 'Thayyil S, Nagakumar P, Gowers H, Sinha A. Optimal endotracheal tube tip position in extremely premature infants. Am J Perinatol. 2008;25(1):13-16.', doi: THAYYIL_DOI },
  { citation: 'Cerone JB, Pinheiro JMB. Tracheal length measurement in intubated neonates to guide the design and use of endotracheal tube glottic depth markings. Children (Basel). 2022;9(2):169.', doi: CERONE_DOI },
  { citation: 'Rost JR, Frush DP, Auten RL. Effect of neck position on endotracheal tube location in low birth weight infants. Pediatr Pulmonol. 1999;27(3):199-202.', doi: ROST_DOI },
  { citation: 'Rocha G, Soares P, Gonçalves A, Silva AI, Almeida D, Figueiredo S, Pissarra S, Costa S, Soares H, Flôr-de-Lima F, Guimarães H. Respiratory care for the ventilated neonate. Can Respir J. 2018;2018:7472964.', doi: ROCHA_DOI },
  { citation: "D'Andrea V, Prontera G, Rubortone SA, Pezza L, Pinna G, Barone G, Pittiruti M, Vento G. Umbilical venous catheter update: a narrative review including ultrasound and training. Front Pediatr. 2022;9:774705.", doi: DANDREA_DOI },
  { citation: 'Hoellering AB, Koorts PJ, Cartwright DW, Davies MW. Determination of umbilical venous catheter tip position with radiograph. Pediatr Crit Care Med. 2014;15(1):56-61.', doi: HOELLERING_DOI },
  { citation: 'Verheij GH, te Pas AB, Witlox RSGM, Smits-Wintjens VEHJ, Walther FJ, Lopriore E. Poor accuracy of methods currently used to determine umbilical catheter insertion length. Int J Pediatr. 2010;2010:873167.', doi: VERHEIJ_DOI },
  { citation: 'Oestreich AE. Umbilical vein catheterization—appropriate and inappropriate placement. Pediatr Radiol. 2010;40(12):1941-1949.', doi: OESTREICH_DOI },
  { citation: 'Naseh N, Wallström L, Sindelar R, Ågren J. Standardized endotracheal tube and intravascular access placement in infants born at 22-23 weeks gestation. Pediatr Res. 2026;99(5):1836-1841.', doi: NASEH_DOI },
  { citation: 'Barrington KJ. Umbilical artery catheters in the newborn: effects of position of the catheter tip. Cochrane Database Syst Rev. 2000;(2):CD000505.', doi: BARRINGTON_DOI },
  { citation: 'Zubi ZBH, Abdullah AFB, Helmi MABM, Hasan TH, Ramli N, Ali AAABM, Mohamed MAS. Indications, measurements, and complications of ten essential neonatal procedures. Int J Pediatr. 2023;2023:3241607.', doi: ZUBI_DOI },
  { citation: 'Nowlen TT, Rosenthal GL, Johnson GL, Tom DJ, Vargo TA. Pericardial effusion and tamponade in infants with central catheters. Pediatrics. 2002;110(1 Pt 1):137-142.', doi: NOWLEN_DOI },
  { citation: 'Odita JC, Khan AS, Dincsoy M, Kayyali M, Masoud A, Ammari A. Neonatal phrenic nerve paralysis resulting from intercostal drainage of pneumothorax. Pediatr Radiol. 1992;22(5):379-381.', doi: ODITA_DOI },
  { citation: 'Cizmeci MN, Akin K, Kanburoglu MK, Akelma AZ, Andan H, Erbukucu O, Tatli MM. The utility of special radiological signs on routinely obtained supine anteroposterior chest radiographs for the early recognition of neonatal pneumothorax. Neonatology. 2013;104(4):305-311.', doi: CIZMECI_DOI },
  { citation: 'Markowitz RI. The anterior junction line: a radiographic sign of bilateral pneumothorax in neonates. Radiology. 1988;167(3):717-719.', doi: MARKOWITZ_DOI },
  { citation: 'Hauri-Hohl A, Baenziger O, Frey B. Pneumomediastinum in the neonatal and paediatric intensive care unit. Eur J Pediatr. 2008;167(4):415-418.', doi: HAURI_DOI },
  { citation: 'Burt TB, Lester PD. Neonatal pneumopericardium. Radiology. 1982;142(1):81-84.', doi: BURT_DOI },
  { citation: 'Jeng MJ, Lee YS, Tsao PC, Soong WJ. Neonatal air leak syndrome and the role of high-frequency ventilation in its prevention. J Chin Med Assoc. 2012;75(11):551-559.', doi: JENG_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/* Vertebral levels. Every tip is recorded as the vertebral body it overlies. */

const LEVELS = [
  'C4', 'C5', 'C6', 'C7',
  'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',
  'L1', 'L2', 'L3', 'L4', 'L5', 'S1',
] as const

const at = (level: string) => LEVELS.indexOf(level as (typeof LEVELS)[number])

/** The levels from `from` to `to`, as options. */
function levelOptions(from: string, to: string): Option[] {
  return LEVELS.slice(at(from), at(to) + 1).map((level) => ({ value: level, label: level }))
}

/** Where a level sits against a range: in it, above it (high) or below it (low). */
function against(level: string, lo: string, hi: string): 'in' | 'high' | 'low' | '' {
  if (at(level) < 0) return ''
  if (at(level) < at(lo)) return 'high'
  if (at(level) > at(hi)) return 'low'
  return 'in'
}

/*
 * The sourced tip ranges, quoted in the sources doc. Where the sources differ, the chip uses:
 * - ETT, T1 to T2: Thayyil's "first or second thoracic vertebrae" and Cerone's acceptable "top of T1
 *   and the bottom of T2" (N3-2, N3-3); Blayney's target, the body of T1, lies inside it (N3-1).
 * - UVC, T8 to T9: D'Andrea's vertebral-body method (N3-7), as Zubi gives it (N3-13); Verheij gives
 *   T9 to T10 (N3-9).
 * - UAC, T6 to T10 high and L3 to L5 low: Narla (N3-4), as Verheij gives it (N3-9); Naseh uses T6 to
 *   T9 and L3 to L4 (N3-11).
 * - PICC, T3 to T5 from an upper limb and T8 to T10 from a lower limb: Zubi, the one source (N3-14).
 */
const ETT_RANGE = ['T1', 'T2'] as const
const UVC_RANGE = ['T8', 'T9'] as const
const UAC_HIGH = ['T6', 'T10'] as const
const UAC_LOW = ['L3', 'L5'] as const
const PICC_UPPER = ['T3', 'T5'] as const
const PICC_LOWER = ['T8', 'T10'] as const

const range = (r: readonly [string, string]) => `${r[0]} to ${r[1]}`

/* Tables for the Learn and Report tabs. */

const tipTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Line or tube</th><th>Tip (as the source states it)</th><th>Other sources</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Endotracheal tube</td><td>T1 or T2 (Thayyil); top of T1 to bottom of T2 acceptable (Cerone)</td><td>Body of T1 (Blayney); 1.5 cm above the carina (Narla). The carina lies at T3 to T5.</td></tr>
        <tr><td className="vessel-name">Umbilical venous catheter</td><td>IVC–right atrium junction; on the vertebral-body method T8 to T9 (D'Andrea)</td><td>T9 to T10 (Verheij); the heart-shadow method is more accurate (Hoellering)</td></tr>
        <tr><td className="vessel-name">Umbilical arterial catheter</td><td>High T6 to T10, low L3 to L5 (Narla)</td><td>T6 to T9 or L3 to L4 (Naseh); high T7 to T9 (Zubi)</td></tr>
        <tr><td className="vessel-name">PICC</td><td>Upper limb: SVC at T3 to T5. Lower limb: IVC at T8 to T10 (Zubi)</td><td>Outside the heart shadow, within the cavae (Nowlen)</td></tr>
        <tr><td className="vessel-name">Nasogastric or orogastric tube</td><td>In the body of the stomach (Narla)</td><td>—</td></tr>
        <tr><td className="vessel-name">Chest drain</td><td>Anterior for air, posterior for fluid (Zubi)</td><td>Medial end at least 1 cm from the spine (Odita)</td></tr>
      </tbody>
    </table>
  </div>
)

const lungTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Pattern</th><th>Who</th><th>Film</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Respiratory distress syndrome</td><td>Preterm</td><td>Low volumes, diffuse granular (ground-glass) opacities, air bronchograms</td></tr>
        <tr><td className="vessel-name">Transient tachypnoea</td><td>Term, often caesarean</td><td>Normal or large volumes, perihilar streaks, fluid in the fissure; clears in 48 to 72 hours</td></tr>
        <tr><td className="vessel-name">Meconium aspiration</td><td>Term or post-term, meconium-stained liquor</td><td>Hyperinflation, coarse irregular opacities, segmental atelectasis</td></tr>
        <tr><td className="vessel-name">Pneumonia</td><td>Preterm or term</td><td>Diffuse opacities or lobar consolidation, with or without effusion; may be normal at first</td></tr>
        <tr><td className="vessel-name">Bronchopulmonary dysplasia</td><td>Preterm on long-term support</td><td>Later: coarse reticular opacities, cystic lucencies, hyperinflation</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'clinical',
    title: 'Step 1. Why the film, and the baby',
    body: (
      <>
        <p>This lesson is for the chest radiograph in the neonatal unit, taken to check lines and tubes, for respiratory distress, or both (the usual film). The European Society of Paediatric Radiology asks for the gestational age and the timing of the film, the method of delivery, the presenting symptoms (such as meconium-stained liquor), the type of ventilation and any fetal ultrasound finding, because the likely diagnosis turns on them ({LOVRENSKI}). The order of the steps is this site's own.</p>
        <p>Before 36 weeks, respiratory distress syndrome (RDS) is the leading cause of morbidity and mortality, and its diagnosis on imaging rests on prematurity and the film ({LOVRENSKI}). Still, 6.4% to 7.8% of RDS is diagnosed at 37 weeks or more, many after caesarean section, and babies of diabetic mothers are at higher risk ({GALLACHER}).</p>
        <p>At term, transient tachypnoea of the newborn (TTN) is the commonest cause of respiratory distress; caesarean delivery, maternal diabetes and obesity are its risk factors ({LOVRENSKI}), and caesarean before labour has started carries the most risk ({GALLACHER}). Meconium-stained liquor points to meconium aspiration, which is more likely after 42 weeks ({GALLACHER}). Early-onset (congenital) pneumonia presents within 48 hours, group B streptococcus is its commonest cause, and prolonged rupture of the membranes, a maternal group B streptococcus swab or maternal fever point to it ({GALLACHER}).</p>
        <p>The commonest cause of air leak is inadequate mechanical ventilation of fragile, immature lungs, and air leaks are commoner the smaller the baby, especially in very low birth weight and meconium-aspirated babies ({JENG}). Pneumothorax is the commonest air leak in ventilated newborns ({ROCHA}).</p>
      </>
    ),
  },
  {
    id: 'technique',
    title: 'Step 2. Technique',
    body: (
      <>
        <p>In young children an AP film is easier to get than a PA. A lateral decubitus AP film is an alternative when an expiratory film is hard to get, and it may show a subtle pneumothorax. The ESPR's checklist: exposure set for the child's age, accurate positioning, the centre at T7, collimation from C3 to the thoracolumbar junction; inspiration checked by the rib count (at least eight posterior ribs, or five anterior ribs, above the diaphragm); rotation checked by symmetric clavicles and evenly spaced anterior ribs ({LOVRENSKI}).</p>
        <p>NICU guidelines commonly quote 7 to 9 posterior ribs as good aeration, fewer than 7 as hypoinflation and more than 9 as hyperinflation. Against CT, though, the diaphragm's rib level was only weakly related to aerated lung volume, too loosely to guide treatment ({DAHM}). The sources differ: the ESPR's general paediatric figure is at least eight ribs; this lesson's chip uses the neonatal 7 to 9 and says how weak a guide it is.</p>
        <p>Rotation is in over half of ICU films of neonates. Rotation makes the side rotated towards look lucent, the side up look larger, the heart and mediastinum seem to move towards the side rotated to, the heart look larger and its outline distorted; and with rotation to the left the tips of the umbilical arterial and venous catheters can look reversed. It can mimic air trapping, collapse, cardiomegaly and effusions, or hide disease ({MARAIS}).</p>
      </>
    ),
  },
  {
    id: 'lines',
    title: 'Step 3. Lines and tubes',
    body: (
      <>
        <p>Record each tip as the vertebral body it overlies, and compare it with the range below. Each range is given as its source states it; where sources differ, the chip uses the one named first and says what the others give.</p>
        {tipTable}
        <h3>Endotracheal tube</h3>
        <p>The clavicles move from film to film and lay above T1 on 83% of films, while the carina lay between T3 and T5; Blayney and Logan recommend placing the tip at the body of T1, as the one reference point ({BLAYNEY}). In babies of 28 weeks or less, a tip at T3 or T4 went with uneven aeration and with pneumothorax, localised interstitial emphysema and right upper lobe collapse, and Thayyil advises keeping the tip at T1 or T2 ({THAYYIL}). In 57 neonates of 22 to 42 weeks, the carina lay at T3 to T5.5 and the middle of the trachea over the body of T1; Cerone's unit accepts a tip anywhere from the top of T1 to the bottom of T2 ({CERONE}). Narla puts the tip 1.5 cm above the carina, with the head neutral ({NARLA}).</p>
        <p>The tip moves down with neck flexion and up with extension, by a mean of 3.1 and 7.4 mm in low birth weight babies ({ROST}). A tube too deep can enter the right main bronchus and cause pneumothorax or collapse; one too shallow risks extubation ({ROCHA}).</p>
        <h3>Umbilical venous catheter</h3>
        <p>The catheter runs up the umbilical vein and through the ductus venosus; its tip belongs at the junction of the inferior vena cava and the right atrium ({DANDREA}), at the confluence of the ductus venosus, hepatic veins and inferior vena cava ({OESTREICH}). On the vertebral-body method, a tip at T8 to T9 is well placed, above T8 high and below T9 low; the cardiac silhouette method, which follows the right atrial border down to the inferior vena cava, is more accurate ({DANDREA}). In Hoellering's 200 films checked against ultrasound, the heart-shadow method was 86% sensitive and 94% specific, the vertebral level 61% and 74%; only 28 tips were well placed, and the target zone was about one T8 body high ({HOELLERING}). Verheij's ideal is T9 to T10, with T8 adequate in some ({VERHEIJ}).</p>
        <p>Without ultrasound, up to 40% of UVCs end up non-central. A tip in the portal system or the liver risks extravasation, liver injury and portal vein thrombosis, and a low line in the portal system or ductus venosus went with necrotising enterocolitis; a tip in the right atrium may cause cardiac complications. For emergency use, the tip sits only 2 to 4 cm in, in the umbilical vein ({DANDREA}). A tip in the heart can cause arrhythmia, pericardial effusion and tamponade ({ZUBI}). Where the tip lies while it is still in the umbilical vein, including the umbilical vein recess, is often confused ({OESTREICH}).</p>
        <h3>Umbilical arterial catheter</h3>
        <p>Narla places a high UAC between T6 and T10 and a low one between L3 and L5 ({NARLA}), as Verheij does ({VERHEIJ}); Naseh uses T6 to T9 and L3 to L4 ({NASEH}). The high position lies above the diaphragm, clear of the coeliac, mesenteric and renal artery origins, and the low one below them ({ZUBI}). In the Cochrane review, high catheters had fewer vascular complications with no more intraventricular haemorrhage, necrotising enterocolitis or death, and the reviewer found no evidence to support low catheters ({BARRINGTON}).</p>
        <h3>PICC</h3>
        <p>From an upper limb, the tip belongs in the superior vena cava at T3 to T5; from a lower limb, in the inferior vena cava between the diaphragm and the right atrium at T8 to T10, and not in the right atrium or the heart. The film should include the upper arm and neck for an arm line, and the abdomen for a leg line; a lateral finds malposition more reliably, especially for a leg line ({ZUBI}). In central-line pericardial effusions, the tip lay within the pericardial reflections in 92%, and the cardiothoracic ratio rose by a mean of 17%; Nowlen advises keeping the tip outside the heart shadow but within the cavae, about 1 cm outside it in preterm and 2 cm at term ({NOWLEN}).</p>
        <h3>Nasogastric or orogastric tube</h3>
        <p>The tip belongs in the body of the stomach ({NARLA}). A radiograph is the only certain way to confirm it; a tip just through the cardia or in the lower oesophagus went with apnoea, desaturation and bradycardia on feeding ({ZUBI}). A tube coiled in an upper oesophageal pouch shows oesophageal atresia, and gas in the stomach then means a distal fistula ({GALLACHER}); a tube that ends in the chest can mean the stomach has herniated through the diaphragm ({LOVRENSKI}).</p>
        <h3>Chest drain</h3>
        <p>For a pneumothorax the tip drains best anterior to the lung, for fluid posterior to it, and an AP and a lateral film are advised after insertion ({ZUBI}). Phrenic nerve palsy after chest drains was related to where the medial end of the drain lay; Odita advises the medial end be no less than 1 cm from the spine on the frontal film ({ODITA}).</p>
        <ScanFigures images={[neonatalChestXrayScans.ettLandmarks, neonatalChestXrayScans.ettRightBronchus, neonatalChestXrayScans.umbilicalCatheters, neonatalChestXrayScans.uvcLateral, neonatalChestXrayScans.uvcInLiver, neonatalChestXrayScans.piccInLiver]} />
      </>
    ),
  },
  {
    id: 'lungs',
    title: 'Step 4. The lungs',
    body: (
      <>
        {lungTable}
        <p><strong>Respiratory distress syndrome.</strong> Low volumes before ventilation, diffuse homogeneous granular opacities and air bronchograms. The ESPR grades it 1 to 4: 1, ground glass with well-expanded lungs and few air bronchograms; 2, more opacity and more air bronchograms, the heart and diaphragm still distinct; 3, coarse granular opacity, poorly expanded lungs, the heart and diaphragm less distinct; 4, complete opacification ("white lungs") with the heart and diaphragm lost. After surfactant, ventilation improves and opacity falls, though low volumes and granularity may persist. Pneumothorax and pulmonary interstitial emphysema are its typical complications ({LOVRENSKI}). The distress worsens over the first 2 to 3 days of life ({GALLACHER}).</p>
        <p><strong>Transient tachypnoea.</strong> Normal or large lungs, perihilar interstitial opacities, blurred vessels and small effusions such as fluid in the minor fissure, clearing with the symptoms in 48 to 72 hours. RDS and TTN can look alike, but TTN has normal or large lungs and RDS small ones ({LOVRENSKI}). TTN should improve and be off oxygen within 2 to 3 days; prolonged support calls for another diagnosis ({GALLACHER}).</p>
        <p><strong>Meconium aspiration.</strong> Hyperinflation, which may be the only finding in mild cases, coarse irregular bilateral opacities with segmental atelectasis and pneumonitis; pneumothorax occurs in up to 10% to 20%. With bilateral coarse opacities, meconium aspiration cannot be told from pneumonia on the film ({LOVRENSKI}).</p>
        <p><strong>Pneumonia.</strong> Alveolar opacities, usually diffuse and bilateral, or lobar consolidation with air bronchograms, coarse or reticular opacities, with or without an effusion; it is on the differential of RDS, TTN and meconium aspiration ({LOVRENSKI}). The film may be normal at first ({GALLACHER}).</p>
        <p><strong>Bronchopulmonary dysplasia.</strong> Early, mild perihilar opacities and fine granularity; later, coarse reticular opacities, cystic lucencies, atelectasis and hyperinflation. It is a clinical diagnosis: born before 32 weeks and still needing oxygen at 36 weeks' postmenstrual age ({LOVRENSKI}). Gallacher defines it as oxygen for at least 28 days and at 36 weeks' corrected age, notes that it affects 73% of babies born at 23 weeks and 23% at 28 weeks, and that the film often does not match how ill the baby is ({GALLACHER}).</p>
        <ScanFigures images={[neonatalChestXrayScans.rdsGrade2, neonatalChestXrayScans.transientTachypnoea, neonatalChestXrayScans.meconiumAspiration]} />
      </>
    ),
  },
  {
    id: 'air-leak',
    title: 'Step 5. Air leak',
    body: (
      <>
        <p>Air leak covers pulmonary interstitial emphysema, pneumothorax, pneumomediastinum, pneumopericardium, pneumoperitoneum, subcutaneous emphysema and systemic air embolism ({JENG}). Pneumothorax is the commonest; it is diagnosed on the film, and a tension pneumothorax needs urgent decompression ({GALLACHER}).</p>
        <p><strong>Pneumothorax on a supine film.</strong> Bedside NICU films are supine, where a pneumothorax may not look classic; in Cizmeci's series, 46% of babies had signs of an occult pneumothorax on films taken 0.5 to 27 hours before it was diagnosed clinically ({CIZMECI}). The signs were a deep sulcus, a medial stripe, basal lucency, an unusually sharp heart and mediastinal border, a large lucent hemithorax and a double diaphragm ({ROCHA}). An anterior junction line is not seen in healthy infants; on a supine neonatal film it means bilateral pneumothorax, specific though not sensitive ({MARKOWITZ}). A lateral decubitus film may show a subtle pneumothorax ({LOVRENSKI}).</p>
        <p><strong>Pulmonary interstitial emphysema.</strong> Interstitial air from ventilator barotrauma: rounded or tubular perihilar lucencies ({LOVRENSKI}).</p>
        <p><strong>Pneumomediastinum.</strong> In infants, air can lift the thymus off the heart, its lobes turned up and out (the spinnaker sign). It is diagnosed on the film alone and is mostly found with air elsewhere ({HAURI}).</p>
        <p><strong>Pneumopericardium.</strong> A halo of air round the heart was the main sign, in 96% of Burt's 50 babies, most of them ventilated preterm babies with RDS; when absent, a pericardial line helped. 72% of them died ({BURT}).</p>
        <ScanFigures images={[neonatalChestXrayScans.supinePneumothorax, neonatalChestXrayScans.interstitialEmphysema, neonatalChestXrayScans.spinnakerSail]} />
      </>
    ),
  },
  {
    id: 'heart',
    title: 'Step 6. Heart, mediastinum, upper abdomen and bones',
    body: (
      <>
        <p>The ESPR's checklist goes on to the mediastinal contours, lines and shift, the heart shadow and pulmonary vessels, and the central airways ({LOVRENSKI}). Rotation can make the heart look large and the mediastinum shifted ({MARAIS}). With a central line in place, a rising cardiothoracic ratio can mark a pericardial effusion ({NOWLEN}).</p>
        <p>A congenital diaphragmatic hernia is usually found before birth; most are posterior (Bochdalek) and 95% are on the left. The postnatal film shows air-filled bowel in the chest, mediastinal shift and, on the left, an abnormal feeding tube position when the stomach has herniated ({LOVRENSKI}). Oesophageal atresia shows as a feeding tube coiled in the upper pouch; gas in the stomach means a fistula from the trachea to the distal oesophagus ({GALLACHER}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 7. Other findings and the impression',
    body: (
      <>
        <p>Lines and tubes come first, each tip with its level and whether it lies in its range; then the lungs, described rather than diagnosed, since the patterns overlap and the diagnosis rests on the history; then anything urgent, such as an air leak. This order is this site's own. The chips name the pattern a film fits; the impression states what is seen.</p>
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

const has = (device: string) => (v: Values) => list(v, 'devices').includes(device)
const lungsAsked = (v: Values) => ['distress', 'both'].includes(str(v, 'reason'))
const preterm = (v: Values) => { const ga = num(v, 'gestation'); return ga !== undefined && ga < 37 }
const term = (v: Values) => { const ga = num(v, 'gestation'); return ga !== undefined && ga >= 37 }
const pattern = (v: Values) => list(v, 'lung-pattern')
const rdsLike = (v: Values) => pattern(v).includes('granular') || pattern(v).includes('white')
const ptx = (v: Values) => ['right', 'left', 'both'].includes(str(v, 'pneumothorax'))
const pie = (v: Values) => ['right', 'left', 'both'].includes(str(v, 'pie'))

const fields = {
  reason: { id: 'reason', kind: 'choice', label: 'Why the film', required: true, options: [
    { value: 'lines', label: 'Lines and tubes check' },
    { value: 'distress', label: 'Respiratory distress' },
    { value: 'both', label: 'Both: lines and the lungs' },
  ] },
  gestation: { id: 'gestation', kind: 'number', label: 'Gestation at birth', unit: 'weeks', min: 22, max: 44, step: 1, required: true, help: 'Under 37 weeks is preterm.' },
  age: { id: 'age', kind: 'number', label: 'Age', unit: 'days', min: 0, max: 180, step: 1, help: 'Day of life; 0 is the first 24 hours.' },
  delivery: { id: 'delivery', kind: 'choice', label: 'Delivery', options: [
    { value: 'vaginal', label: 'Vaginal' },
    { value: 'cs-labour', label: 'Caesarean in labour' },
    { value: 'cs-prelabour', label: 'Caesarean before labour' },
  ] },
  history: { id: 'history', kind: 'multi', label: 'History', options: [
    { value: 'meconium', label: 'Meconium-stained liquor' },
    { value: 'infection', label: 'Infection risk (prolonged rupture of membranes, maternal GBS or fever)' },
    { value: 'diabetes', label: 'Maternal diabetes' },
  ] },
  support: { id: 'support', kind: 'choice', label: 'Respiratory support', options: [
    { value: 'none', label: 'None or oxygen only' },
    { value: 'noninvasive', label: 'CPAP or high flow' },
    { value: 'ventilated', label: 'Ventilated' },
  ] },
  surfactant: { id: 'surfactant', kind: 'choice', label: 'Surfactant given before this film', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },

  projection: { id: 'projection', kind: 'choice', label: 'Projection', required: true, options: [
    { value: 'ap-supine', label: 'AP supine' },
    { value: 'decubitus', label: 'Lateral decubitus' },
    { value: 'other', label: 'Other' },
  ] },
  coverage: { id: 'coverage', kind: 'choice', label: 'Film covers', options: [
    { value: 'chest', label: 'Chest' },
    { value: 'chest-abdomen', label: 'Chest and abdomen' },
  ] },
  rotation: { id: 'rotation', kind: 'choice', label: 'Rotation', required: true, help: 'Clavicles symmetric, anterior ribs evenly spaced?', options: [
    { value: 'none', label: 'Not rotated' },
    { value: 'left', label: 'Rotated to the left' },
    { value: 'right', label: 'Rotated to the right' },
  ] },
  ribs: { id: 'ribs', kind: 'number', label: 'Posterior ribs above the diaphragm', unit: 'ribs', min: 4, max: 12, step: 1, help: 'NICU guidelines commonly quote 7 to 9.' },
  exposure: { id: 'exposure', kind: 'choice', label: 'Exposure', options: [
    { value: 'adequate', label: 'Adequate' },
    { value: 'under', label: 'Underexposed' },
    { value: 'over', label: 'Overexposed' },
  ] },

  devices: { id: 'devices', kind: 'multi', label: 'Lines and tubes', required: true, options: [
    { value: 'ett', label: 'Endotracheal tube' },
    { value: 'uvc', label: 'Umbilical venous catheter' },
    { value: 'uac', label: 'Umbilical arterial catheter' },
    { value: 'ng', label: 'Nasogastric or orogastric tube' },
    { value: 'picc', label: 'PICC' },
    { value: 'drain', label: 'Chest drain' },
    { value: 'none', label: 'None' },
  ] },
  ettLevel: { id: 'ett-level', kind: 'choice', label: 'ETT tip level', required: true, showIf: has('ett'), help: 'T1 to T2; the carina lies at T3 to T5.', options: levelOptions('C4', 'T6') },
  ettBronchus: { id: 'ett-bronchus', kind: 'choice', label: 'ETT in', showIf: has('ett'), options: [
    { value: 'trachea', label: 'The trachea' },
    { value: 'right', label: 'The right main bronchus' },
    { value: 'left', label: 'The left main bronchus' },
  ] },
  ettNeck: { id: 'ett-neck', kind: 'choice', label: 'Head and neck', showIf: has('ett'), options: [
    { value: 'neutral', label: 'Neutral' },
    { value: 'flexed', label: 'Flexed' },
    { value: 'extended', label: 'Extended' },
  ] },
  uvcLevel: { id: 'uvc-level', kind: 'choice', label: 'UVC tip level', required: true, showIf: has('uvc'), help: 'Vertebral-body method: T8 to T9.', options: levelOptions('T1', 'L5') },
  uvcPosition: { id: 'uvc-position', kind: 'choice', label: 'UVC tip on the heart shadow', required: true, showIf: has('uvc'), options: [
    { value: 'junction', label: 'At the IVC–right atrium junction' },
    { value: 'heart', label: 'Within the heart shadow' },
    { value: 'liver', label: 'Below the diaphragm, in the liver' },
    { value: 'umbilical', label: 'In the umbilical vein (short)' },
  ] },
  uacLevel: { id: 'uac-level', kind: 'choice', label: 'UAC tip level', required: true, showIf: has('uac'), help: 'High T6 to T10, low L3 to L5.', options: levelOptions('T1', 'S1') },
  ngPosition: { id: 'ng-position', kind: 'choice', label: 'Gastric tube tip', required: true, showIf: has('ng'), options: [
    { value: 'stomach', label: 'In the body of the stomach' },
    { value: 'goj', label: 'At the gastro-oesophageal junction' },
    { value: 'oesophagus', label: 'In the oesophagus' },
    { value: 'coiled', label: 'Coiled in the upper oesophagus' },
    { value: 'chest', label: 'In a stomach in the chest' },
    { value: 'beyond', label: 'Beyond the stomach' },
  ] },
  piccRoute: { id: 'picc-route', kind: 'choice', label: 'PICC from', required: true, showIf: has('picc'), options: [
    { value: 'upper', label: 'An upper limb' },
    { value: 'lower', label: 'A lower limb' },
  ] },
  piccLevel: { id: 'picc-level', kind: 'choice', label: 'PICC tip level', required: true, showIf: has('picc'), help: 'Upper limb T3 to T5; lower limb T8 to T10.', options: levelOptions('T1', 'L5') },
  piccHeart: { id: 'picc-heart', kind: 'choice', label: 'PICC tip on the heart shadow', showIf: has('picc'), options: [
    { value: 'outside', label: 'Outside it' },
    { value: 'inside', label: 'Within it' },
  ] },
  drainSide: { id: 'drain-side', kind: 'choice', label: 'Chest drain side', required: true, showIf: has('drain'), options: [
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' },
    { value: 'both', label: 'Both' },
  ] },
  drainFor: { id: 'drain-for', kind: 'choice', label: 'Drain for', showIf: has('drain'), options: [
    { value: 'air', label: 'Air' },
    { value: 'fluid', label: 'Fluid' },
  ] },
  drainTip: { id: 'drain-tip', kind: 'choice', label: 'Drain tip', showIf: has('drain'), options: [
    { value: 'anterior', label: 'Anterior' },
    { value: 'posterior', label: 'Posterior' },
    { value: 'unknown', label: 'Not judged (no lateral)' },
  ] },
  drainSpine: { id: 'drain-spine', kind: 'choice', label: 'Medial end of the drain', showIf: has('drain'), options: [
    { value: 'clear', label: '1 cm or more from the spine' },
    { value: 'close', label: 'Within 1 cm of the spine' },
  ] },

  lungVolume: { id: 'lung-volume', kind: 'choice', label: 'Lung volumes', required: true, showIf: lungsAsked, options: [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High (hyperinflated)' },
  ] },
  lungPattern: { id: 'lung-pattern', kind: 'multi', label: 'Lungs', required: true, showIf: lungsAsked, options: [
    { value: 'clear', label: 'Clear' },
    { value: 'granular', label: 'Diffuse fine granular (ground-glass) opacities' },
    { value: 'bronchograms', label: 'Air bronchograms' },
    { value: 'white', label: 'White-out, heart and diaphragm outlines lost' },
    { value: 'perihilar', label: 'Perihilar streaky opacities, blurred vessels' },
    { value: 'fissure', label: 'Fluid in the fissure' },
    { value: 'coarse', label: 'Coarse irregular opacities' },
    { value: 'consolidation', label: 'Lobar consolidation' },
    { value: 'reticular', label: 'Coarse reticular opacities with cystic lucencies' },
    { value: 'effusion', label: 'Pleural effusion' },
  ] },
  rdsGrade: { id: 'rds-grade', kind: 'choice', label: 'RDS grade (ESPR)', showIf: (v) => lungsAsked(v) && rdsLike(v), options: [
    { value: '1', label: '1: ground glass, lungs well expanded, few air bronchograms' },
    { value: '2', label: '2: more opacity and air bronchograms, heart and diaphragm distinct' },
    { value: '3', label: '3: coarse granular, poorly expanded, heart and diaphragm less distinct' },
    { value: '4', label: '4: white lungs, heart and diaphragm lost' },
  ] },

  pneumothorax: { id: 'pneumothorax', kind: 'choice', label: 'Pneumothorax', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' },
    { value: 'both', label: 'Both' },
  ] },
  ptxSigns: { id: 'ptx-signs', kind: 'multi', label: 'Signs of air on a supine film', options: [
    { value: 'lucent', label: 'Large lucent hemithorax' },
    { value: 'sulcus', label: 'Deep sulcus' },
    { value: 'sharp', label: 'Unusually sharp heart or mediastinal border (medial stripe)' },
    { value: 'basal', label: 'Basal lucency' },
    { value: 'double', label: 'Double diaphragm' },
    { value: 'edge', label: 'Visible lung edge' },
    { value: 'junction', label: 'Anterior junction line' },
  ] },
  pie: { id: 'pie', kind: 'choice', label: 'Pulmonary interstitial emphysema', options: [
    { value: 'none', label: 'None' },
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' },
    { value: 'both', label: 'Both' },
  ] },
  pneumomediastinum: { id: 'pneumomediastinum', kind: 'choice', label: 'Pneumomediastinum', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  pneumopericardium: { id: 'pneumopericardium', kind: 'choice', label: 'Pneumopericardium', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },

  heartSize: { id: 'heart-size', kind: 'choice', label: 'Heart shadow', options: [
    { value: 'normal', label: 'Normal size' },
    { value: 'large', label: 'Large' },
  ] },
  mediastinum: { id: 'mediastinum', kind: 'choice', label: 'Mediastinum', options: [
    { value: 'central', label: 'Central' },
    { value: 'right', label: 'Shifted to the right' },
    { value: 'left', label: 'Shifted to the left' },
  ] },
  abdomen: { id: 'abdomen', kind: 'multi', label: 'Upper abdomen', options: [
    { value: 'normal', label: 'Normal bowel gas' },
    { value: 'bowel-chest', label: 'Bowel loops in the chest' },
    { value: 'free-air', label: 'Free air under the diaphragm' },
  ] },
  bones: { id: 'bones', kind: 'choice', label: 'Bones', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Abnormal' },
  ] },
  bonesText: { id: 'bones-text', kind: 'text', label: 'Bone finding', showIf: (v) => str(v, 'bones') === 'abnormal', placeholder: 'e.g. 11 pairs of ribs' },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-pneumothorax', label: 'No pneumothorax' },
    { value: 'no-air-leak', label: 'No air leak' },
  ] },
} satisfies Record<string, Field>

/* Tip verdicts against the sourced ranges. */

function ettVerdict(values: Values): 'in' | 'high' | 'low' | '' {
  return against(str(values, 'ett-level'), ...ETT_RANGE)
}

function uvcVerdict(values: Values): 'in' | 'high' | 'low' | '' {
  return against(str(values, 'uvc-level'), ...UVC_RANGE)
}

/** High or low position, between the two, or above or below both. */
function uacVerdict(values: Values): 'high-in' | 'low-in' | 'between' | 'too-high' | 'too-low' | '' {
  const level = str(values, 'uac-level')
  if (at(level) < 0) return ''
  if (against(level, ...UAC_HIGH) === 'in') return 'high-in'
  if (against(level, ...UAC_LOW) === 'in') return 'low-in'
  if (at(level) < at(UAC_HIGH[0])) return 'too-high'
  if (at(level) > at(UAC_LOW[1])) return 'too-low'
  return 'between'
}

function piccRange(values: Values): readonly [string, string] {
  return str(values, 'picc-route') === 'lower' ? PICC_LOWER : PICC_UPPER
}

function piccVerdict(values: Values): 'in' | 'high' | 'low' | '' {
  return str(values, 'picc-route') ? against(str(values, 'picc-level'), ...piccRange(values)) : ''
}

/** The UVC's vertebral level and its place on the heart shadow point different ways (N3-8). */
function uvcMethodsDisagree(values: Values): boolean {
  const verdict = uvcVerdict(values)
  const position = str(values, 'uvc-position')
  if (!verdict || !position) return false
  return (verdict === 'in' && ['heart', 'liver', 'umbilical'].includes(position)) || (verdict !== 'in' && position === 'junction')
}

/* Rule chips. */

function deriveClinical(values: Values): Derived[] {
  const out: Derived[] = []
  const ga = num(values, 'gestation')
  // N1-2: RDS before 36 weeks. N1-4: TTN at term. N1-5: MAS after 42 weeks.
  if (ga !== undefined && ga < 36) out.push({ label: 'Preterm', value: 'RDS is the leading cause of distress before 36 weeks' })
  if (ga !== undefined && ga >= 37) out.push({ label: 'Term', value: 'TTN is the commonest cause of distress at term' })
  if (ga !== undefined && ga > 42) out.push({ label: 'Post-term', value: 'Meconium aspiration is more likely after 42 weeks' })
  // N1-4: caesarean, especially before labour.
  const delivery = str(values, 'delivery')
  if (delivery === 'cs-prelabour') out.push({ label: 'Delivery', value: 'Caesarean before labour: the largest risk for TTN' })
  else if (delivery === 'cs-labour') out.push({ label: 'Delivery', value: 'Caesarean: the largest risk for TTN, especially before labour' })
  const history = list(values, 'history')
  // N1-5, N1-6, N1-3.
  if (history.includes('meconium')) out.push({ label: 'Meconium', value: 'Points to meconium aspiration' })
  if (history.includes('infection')) out.push({ label: 'Infection risk', value: 'Points to pneumonia; early-onset pneumonia presents within 48 hours' })
  if (history.includes('diabetes')) out.push({ label: 'Maternal diabetes', value: 'A risk factor for both RDS and TTN' })
  // N1-7: ventilation and air leak.
  if (str(values, 'support') === 'ventilated') out.push({ label: 'Ventilated', value: 'Ventilation of immature lungs is the commonest cause of air leak: look for it', tone: 'warn' })
  return out
}

function deriveTechnique(values: Values): Derived[] {
  const out: Derived[] = []
  // N2-3: the effects of rotation.
  if (['left', 'right'].includes(str(values, 'rotation'))) out.push({ label: 'Rotation', value: 'One side lucent, the heart larger and shifted: can mimic or hide disease', tone: 'warn' })
  // N2-2: the commonly quoted rib counts, and how weak a guide they are.
  const ribs = num(values, 'ribs')
  if (ribs !== undefined) {
    if (ribs < 7) out.push({ label: 'Inflation', value: `${ribs} ribs: fewer than 7, hypoinflation as commonly quoted` })
    else if (ribs > 9) out.push({ label: 'Inflation', value: `${ribs} ribs: more than 9, hyperinflation as commonly quoted` })
    else out.push({ label: 'Inflation', value: `${ribs} ribs: within the 7 to 9 commonly quoted` })
    out.push({ label: 'Rib count', value: 'Only weakly related to aerated lung volume on CT' })
  }
  return out
}

function deriveLines(values: Values): Derived[] {
  const out: Derived[] = []
  const devices = list(values, 'devices')
  if (devices.includes('ett')) {
    const level = str(values, 'ett-level')
    const verdict = ettVerdict(values)
    // N3-1, N3-2, N3-3: T1 to T2, with Blayney's T1 target.
    if (verdict === 'in') out.push({ label: 'ETT', value: level === 'T1' ? 'At T1: within T1 to T2, at Blayney\'s target' : `At ${level}: within T1 to T2 (Blayney's target is T1)`, tone: 'good' })
    if (verdict === 'high') out.push({ label: 'ETT', value: `At ${level}: above T1, high`, tone: 'warn' })
    if (verdict === 'low') out.push({ label: 'ETT', value: `At ${level}: below T2, low; the carina lies at T3 to T5`, tone: 'warn' })
    // N3-6: in a main bronchus.
    if (['right', 'left'].includes(str(values, 'ett-bronchus'))) out.push({ label: 'ETT in a bronchus', value: 'Too deep: risks pneumothorax and collapse', tone: 'warn' })
    // N3-5: neck position.
    const neck = str(values, 'ett-neck')
    if (neck === 'flexed') out.push({ label: 'Neck flexed', value: 'The tip moves down with flexion: it will sit higher with the head neutral' })
    if (neck === 'extended') out.push({ label: 'Neck extended', value: 'The tip moves up with extension: it will sit lower with the head neutral' })
  }
  if (devices.includes('uvc')) {
    const level = str(values, 'uvc-level')
    const verdict = uvcVerdict(values)
    // N3-7, N3-9: T8 to T9 (D'Andrea), T9 to T10 (Verheij).
    const verheij = ['T8', 'T10'].includes(level) ? ' (Verheij\'s range is T9 to T10)' : ''
    if (verdict === 'in') out.push({ label: 'UVC level', value: `At ${level}: within T8 to T9${verheij}`, tone: 'good' })
    if (verdict === 'high') out.push({ label: 'UVC level', value: `At ${level}: above T8, high`, tone: 'warn' })
    if (verdict === 'low') out.push({ label: 'UVC level', value: `At ${level}: below T9, low${verheij}`, tone: 'warn' })
    // N3-7, N3-13: where the tip lies on the heart shadow.
    const position = str(values, 'uvc-position')
    if (position === 'junction') out.push({ label: 'UVC tip', value: 'At the cavoatrial junction: the target', tone: 'good' })
    if (position === 'heart') out.push({ label: 'UVC tip', value: 'In the heart: arrhythmia, effusion and tamponade are reported', tone: 'warn' })
    if (position === 'liver') out.push({ label: 'UVC tip', value: 'In the liver: risk of extravasation, liver injury and portal vein thrombosis', tone: 'warn' })
    if (position === 'umbilical') out.push({ label: 'UVC tip', value: 'In the umbilical vein: the short, emergency position (2 to 4 cm in)', tone: 'warn' })
    // N3-8: the heart-shadow method was the more accurate.
    if (uvcMethodsDisagree(values)) out.push({ label: 'Methods disagree', value: 'The heart-shadow method was more accurate than the level (86% against 61% sensitive)', tone: 'warn' })
  }
  if (devices.includes('uac')) {
    const level = str(values, 'uac-level')
    // N3-4, N3-9, N3-11, N3-12, N3-13: high T6 to T10, low L3 to L5 (Narla); T6 to T9 and L3 to L4 (Naseh).
    const verdict = uacVerdict(values)
    if (verdict === 'high-in') out.push({ label: 'UAC', value: `At ${level}: high position, within T6 to T10${level === 'T10' ? ' (Naseh\'s ends at T9)' : ''}`, tone: 'good' })
    if (verdict === 'low-in') {
      out.push({ label: 'UAC', value: `At ${level}: low position, within L3 to L5${level === 'L5' ? ' (Naseh\'s ends at L4)' : ''}`, tone: 'good' })
      out.push({ label: 'High or low', value: 'High catheters had fewer vascular complications (Cochrane)' })
    }
    if (verdict === 'between') out.push({ label: 'UAC', value: `At ${level}: between the high (T6 to T10) and low (L3 to L5) ranges, near the coeliac, mesenteric and renal arteries`, tone: 'warn' })
    if (verdict === 'too-high') out.push({ label: 'UAC', value: `At ${level}: above T6, too high`, tone: 'warn' })
    if (verdict === 'too-low') out.push({ label: 'UAC', value: `At ${level}: below L5, too low`, tone: 'warn' })
  }
  // N2-3: rotation to the left can reverse the umbilical tips.
  if (str(values, 'rotation') === 'left' && (devices.includes('uvc') || devices.includes('uac'))) {
    out.push({ label: 'Rotated left', value: 'The UAC and UVC tips can look reversed', tone: 'warn' })
  }
  if (devices.includes('ng')) {
    // N3-4, N3-16, N3-19, N3-20.
    const position = str(values, 'ng-position')
    if (position === 'stomach') out.push({ label: 'Gastric tube', value: 'In the body of the stomach', tone: 'good' })
    if (position === 'goj' || position === 'oesophagus') out.push({ label: 'Gastric tube', value: 'Short of the stomach: a tip at the cardia or lower oesophagus went with apnoea and bradycardia on feeds', tone: 'warn' })
    if (position === 'coiled') out.push({ label: 'Gastric tube', value: 'Coiled in the upper pouch: oesophageal atresia; gas in the stomach means a distal fistula', tone: 'warn' })
    if (position === 'chest') out.push({ label: 'Gastric tube', value: 'Stomach in the chest: a sign of a left diaphragmatic hernia', tone: 'warn' })
  }
  if (devices.includes('picc')) {
    // N3-14, N3-15.
    const level = str(values, 'picc-level')
    const verdict = piccVerdict(values)
    const r = range(piccRange(values))
    const vein = str(values, 'picc-route') === 'lower' ? 'IVC' : 'SVC'
    if (verdict === 'in') out.push({ label: 'PICC', value: `At ${level}: within ${r} (${vein})`, tone: 'good' })
    if (verdict === 'high') out.push({ label: 'PICC', value: `At ${level}: above ${r}`, tone: 'warn' })
    if (verdict === 'low') out.push({ label: 'PICC', value: `At ${level}: below ${r}`, tone: 'warn' })
    if (str(values, 'picc-heart') === 'inside') out.push({ label: 'PICC in the heart', value: 'Keep the tip outside the heart shadow: within the pericardial reflections in 92% of line effusions', tone: 'warn' })
    if (str(values, 'picc-route') === 'lower' && str(values, 'coverage') === 'chest') out.push({ label: 'Leg line', value: 'Include the abdomen for a lower-limb PICC' })
  }
  if (devices.includes('drain')) {
    // N3-17, N3-18.
    const purpose = str(values, 'drain-for')
    const tip = str(values, 'drain-tip')
    if (purpose === 'air' && tip === 'posterior') out.push({ label: 'Drain', value: 'For air, the tip drains best anterior to the lung', tone: 'warn' })
    if (purpose === 'fluid' && tip === 'anterior') out.push({ label: 'Drain', value: 'For fluid, the tip drains best posterior to the lung', tone: 'warn' })
    if (tip === 'unknown') out.push({ label: 'Drain', value: 'An AP and a lateral are advised after insertion' })
    if (str(values, 'drain-spine') === 'close') out.push({ label: 'Drain near the spine', value: 'Odita advises at least 1 cm, after phrenic nerve palsies', tone: 'warn' })
  }
  return out
}

function deriveLungs(values: Values): Derived[] {
  const out: Derived[] = []
  const volume = str(values, 'lung-volume')
  const p = pattern(values)
  const age = num(values, 'age')
  // N4-1, N1-3: RDS.
  if (rdsLike(values) && volume === 'low') {
    out.push(term(values)
      ? { label: 'RDS', value: 'Pattern of RDS in a term baby: 6.4% to 7.8% of RDS is at 37 weeks or more; consider pneumonia' }
      : { label: 'RDS', value: 'Pattern of respiratory distress syndrome' })
  }
  const grade = str(values, 'rds-grade')
  if (grade) out.push({ label: 'RDS grade', value: `Grade ${grade}` })
  if (rdsLike(values) && str(values, 'surfactant') === 'yes') out.push({ label: 'After surfactant', value: 'Aeration improves and opacity falls; low volumes and granularity may persist' })
  // N4-3, N4-4: TTN, and its time course.
  const ttnSigns = p.includes('perihilar') || p.includes('fissure')
  if (ttnSigns && (volume === 'normal' || volume === 'high')) {
    out.push({ label: 'TTN', value: preterm(values) ? 'Pattern of TTN, though TTN is a disease of term babies' : 'Pattern of transient tachypnoea of the newborn' })
    if (age !== undefined && age >= 3) out.push({ label: 'Day 3 or later', value: 'TTN clears in 48 to 72 hours: look for another cause', tone: 'warn' })
  }
  if (ttnSigns && volume === 'low') out.push({ label: 'Low volumes', value: 'Favour RDS over TTN' })
  // N4-5: MAS, and MAS against pneumonia.
  if (p.includes('coarse')) {
    if (list(values, 'history').includes('meconium') && volume === 'high') out.push({ label: 'MAS', value: 'Pattern of meconium aspiration; pneumothorax in up to 10% to 20%', tone: 'warn' })
    else out.push({ label: 'Coarse opacities', value: 'With bilateral coarse opacities, MAS and pneumonia cannot be told apart' })
  }
  // N4-6: pneumonia.
  if (p.includes('consolidation') || p.includes('effusion')) out.push({ label: 'Pneumonia', value: 'Consolidation or effusion: consider pneumonia; the film may be normal at first' })
  // N4-7: BPD.
  if (p.includes('reticular')) out.push({ label: 'BPD', value: 'Pattern of later BPD; BPD itself is a clinical diagnosis (oxygen at 36 weeks\' postmenstrual age)' })
  return out
}

function deriveAirLeak(values: Values): Derived[] {
  const out: Derived[] = []
  const signs = list(values, 'ptx-signs')
  const side = str(values, 'pneumothorax')
  // N5-3: the commonest air leak.
  if (ptx(values)) out.push({ label: 'Pneumothorax', value: 'The commonest air leak; a tension pneumothorax needs urgent decompression', tone: 'warn' })
  // N5-1, N5-7: signs with no pneumothorax entered.
  if (side === 'none' && signs.length > 0) out.push({ label: 'Occult pneumothorax?', value: '46% showed such signs 0.5 to 27 hours before the clinical diagnosis; a lateral decubitus film may show it', tone: 'warn' })
  // N5-2: the anterior junction line.
  if (signs.includes('junction')) out.push({ label: 'Anterior junction line', value: 'Not seen in healthy infants: means bilateral pneumothorax', tone: 'warn' })
  // N5-4, N4-1.
  if (pie(values)) out.push({ label: 'PIE', value: 'Interstitial air from ventilator barotrauma; a complication of RDS', tone: 'warn' })
  // N5-5.
  if (str(values, 'pneumomediastinum') === 'yes') out.push({ label: 'Pneumomediastinum', value: 'Spinnaker sign: thymus lifted off the heart; mostly with air elsewhere' })
  // N5-6.
  if (str(values, 'pneumopericardium') === 'yes') out.push({ label: 'Pneumopericardium', value: 'Halo of air round the heart (96%); 72% died in Burt\'s series', tone: 'warn' })
  return out
}

function deriveHeart(values: Values): Derived[] {
  const out: Derived[] = []
  const rotated = ['left', 'right'].includes(str(values, 'rotation'))
  // N2-3: rotation and the heart and mediastinum.
  if (str(values, 'heart-size') === 'large' && rotated) out.push({ label: 'Heart size', value: 'Rotation makes the heart look larger' })
  if (['left', 'right'].includes(str(values, 'mediastinum')) && rotated) out.push({ label: 'Shift', value: 'Rotation moves the mediastinum towards the side rotated to' })
  // N3-15: a line tip in the heart with a large heart.
  const lineInHeart = (has('picc')(values) && str(values, 'picc-heart') === 'inside') || (has('uvc')(values) && str(values, 'uvc-position') === 'heart')
  if (str(values, 'heart-size') === 'large' && lineInHeart) out.push({ label: 'Line in the heart', value: 'A rising cardiothoracic ratio can mark a pericardial effusion', tone: 'warn' })
  // N6-2: CDH.
  if (list(values, 'abdomen').includes('bowel-chest')) out.push({ label: 'Bowel in the chest', value: 'Pattern of diaphragmatic hernia, with mediastinal shift; 95% on the left', tone: 'warn' })
  return out
}

/* Report lines. */

const SIDE: Record<string, string> = { right: 'right', left: 'left', both: 'bilateral' }

function clinicalLine(values: Values): string {
  const ga = num(values, 'gestation')
  const age = num(values, 'age')
  const clinical = join([
    ({ lines: 'lines and tubes check', distress: 'respiratory distress', both: 'lines and tubes check and respiratory distress' } as Record<string, string>)[str(values, 'reason')],
    ga !== undefined && `${ga} weeks' gestation`,
    age !== undefined && `day ${age}`,
    picked(values, fields.delivery),
    ...chosen(values, fields.history),
    ({ none: 'no support or oxygen only', noninvasive: 'on CPAP or high flow', ventilated: 'ventilated' } as Record<string, string>)[str(values, 'support')],
    str(values, 'surfactant') === 'yes' && 'surfactant given',
  ])
  return clinical && `Clinical: ${clinical}`
}

function techniqueLine(values: Values): string {
  const ribs = num(values, 'ribs')
  const projection = str(values, 'projection')
  const film = join([
    projection === 'ap-supine' ? `AP supine ${str(values, 'coverage') === 'chest-abdomen' ? 'chest and abdomen' : 'chest'}` : picked(values, fields.projection),
    picked(values, fields.rotation),
    ribs !== undefined && `${ribs} posterior ribs above the diaphragm`,
    str(values, 'exposure') && `exposure ${picked(values, fields.exposure)}`,
  ])
  return film && `Technique: ${film}`
}

function deviceLines(values: Values): string[] {
  const out: string[] = []
  const devices = list(values, 'devices')
  if (devices.includes('none')) out.push('Lines and tubes: none')
  if (devices.includes('ett')) {
    const bronchus = str(values, 'ett-bronchus')
    out.push(`Endotracheal tube: ${join([str(values, 'ett-level') && `tip at ${str(values, 'ett-level')}`, bronchus && `in ${picked(values, fields.ettBronchus)}`, str(values, 'ett-neck') && `head ${picked(values, fields.ettNeck)}`], ', ') || 'present'}`)
  }
  if (devices.includes('uvc')) out.push(`Umbilical venous catheter: ${join([str(values, 'uvc-level') && `tip at ${str(values, 'uvc-level')}`, picked(values, fields.uvcPosition)], ', ') || 'present'}`)
  if (devices.includes('uac')) out.push(`Umbilical arterial catheter: ${str(values, 'uac-level') ? `tip at ${str(values, 'uac-level')}` : 'present'}`)
  if (devices.includes('ng')) out.push(`Gastric tube: ${picked(values, fields.ngPosition) || 'present'}`)
  if (devices.includes('picc')) {
    const route = ({ upper: 'from an upper limb', lower: 'from a lower limb' } as Record<string, string>)[str(values, 'picc-route')]
    const heart = ({ outside: 'outside the heart shadow', inside: 'within the heart shadow' } as Record<string, string>)[str(values, 'picc-heart')]
    out.push(`PICC: ${join([route, str(values, 'picc-level') && `tip at ${str(values, 'picc-level')}`, heart], ', ') || 'present'}`)
  }
  if (devices.includes('drain')) {
    const tip = ({ anterior: 'tip anterior', posterior: 'tip posterior', unknown: 'tip not judged' } as Record<string, string>)[str(values, 'drain-tip')]
    out.push(`Chest drain: ${join([picked(values, fields.drainSide), str(values, 'drain-for') && `for ${picked(values, fields.drainFor)}`, tip, str(values, 'drain-spine') && `medial end ${picked(values, fields.drainSpine)}`], ', ') || 'present'}`)
  }
  return out
}

function lungLine(values: Values): string {
  const volume = str(values, 'lung-volume')
  const p = chosen(values, fields.lungPattern)
  const grade = str(values, 'rds-grade')
  const lungs = join([({ low: 'low volumes', normal: 'normal volumes', high: 'hyperinflated' } as Record<string, string>)[volume], p.length > 0 && p.join(', '), grade && `RDS grade ${grade}`])
  return lungs && `Lungs: ${lungs}`
}

function airLines(values: Values): string[] {
  const out: string[] = []
  const side = str(values, 'pneumothorax')
  const signs = chosen(values, fields.ptxSigns)
  if (side) out.push(`Pneumothorax: ${join([picked(values, fields.pneumothorax), signs.length > 0 && `signs: ${signs.join(', ')}`])}`)
  else if (signs.length > 0) out.push(`Signs of air: ${signs.join(', ')}`)
  if (str(values, 'pie')) out.push(`Pulmonary interstitial emphysema: ${picked(values, fields.pie)}`)
  if (str(values, 'pneumomediastinum')) out.push(`Pneumomediastinum: ${picked(values, fields.pneumomediastinum)}`)
  if (str(values, 'pneumopericardium')) out.push(`Pneumopericardium: ${picked(values, fields.pneumopericardium)}`)
  return out
}

function heartLines(values: Values): string[] {
  const heart = join([str(values, 'heart-size') && `heart shadow ${picked(values, fields.heartSize)}`, str(values, 'mediastinum') && `mediastinum ${picked(values, fields.mediastinum)}`])
  const abdomen = chosen(values, fields.abdomen)
  const bones = str(values, 'bones') === 'abnormal' ? str(values, 'bones-text') || 'abnormal' : picked(values, fields.bones)
  return [
    heart && `Heart and mediastinum: ${heart}`,
    abdomen.length > 0 ? `Upper abdomen: ${abdomen.join(', ')}` : '',
    bones && `Bones: ${bones}`,
  ].filter(Boolean)
}

/* The impression. */

const ETT_WORDS: Record<string, string> = { in: 'within T1 to T2', high: 'high, above T1', low: 'low, below T2' }
const UVC_WORDS: Record<string, string> = { in: 'within T8 to T9', high: 'high, above T8', low: 'low, below T9' }
const UVC_PLACE: Record<string, string> = {
  junction: 'at the IVC–right atrium junction',
  heart: 'within the heart shadow',
  liver: 'below the diaphragm in the liver',
  umbilical: 'in the umbilical vein',
}
const UAC_WORDS: Record<string, string> = {
  'high-in': 'high position, within T6 to T10',
  'low-in': 'low position, within L3 to L5',
  between: 'between the high and low ranges',
  'too-high': 'too high, above T6',
  'too-low': 'too low, below L5',
}
const NG_WORDS: Record<string, string> = {
  stomach: 'in the stomach',
  goj: 'at the gastro-oesophageal junction, short of the stomach',
  oesophagus: 'in the oesophagus',
  coiled: 'coiled in the upper oesophagus',
  chest: 'in a stomach in the chest',
  beyond: 'beyond the stomach',
}

function deviceFindings(values: Values): string[] {
  const out: string[] = []
  const devices = list(values, 'devices')
  if (devices.includes('ett') && str(values, 'ett-level')) {
    const bronchus = ({ right: ' in the right main bronchus', left: ' in the left main bronchus' } as Record<string, string>)[str(values, 'ett-bronchus')] ?? ''
    out.push(`Endotracheal tube tip at ${str(values, 'ett-level')}${bronchus}: ${ETT_WORDS[ettVerdict(values)]}.`)
  }
  if (devices.includes('uvc') && str(values, 'uvc-level')) {
    const place = UVC_PLACE[str(values, 'uvc-position')]
    out.push(`Umbilical venous catheter tip at ${str(values, 'uvc-level')}${place ? `, ${place}` : ''}: ${UVC_WORDS[uvcVerdict(values)]}.`)
  }
  if (devices.includes('uac') && str(values, 'uac-level')) out.push(`Umbilical arterial catheter tip at ${str(values, 'uac-level')}: ${UAC_WORDS[uacVerdict(values)]}.`)
  if (devices.includes('ng') && str(values, 'ng-position')) out.push(`Gastric tube tip ${NG_WORDS[str(values, 'ng-position')]}.`)
  if (devices.includes('picc') && str(values, 'picc-level') && str(values, 'picc-route')) {
    const r = range(piccRange(values))
    const words = ({ in: `within ${r}`, high: `high, above ${r}`, low: `low, below ${r}` } as Record<string, string>)[piccVerdict(values)]
    out.push(`PICC tip at ${str(values, 'picc-level')}${str(values, 'picc-heart') === 'inside' ? ', within the heart shadow' : ''}: ${words}.`)
  }
  if (devices.includes('drain') && str(values, 'drain-side')) {
    const side = str(values, 'drain-side') === 'both' ? 'Bilateral chest drains' : `${upperFirst(str(values, 'drain-side'))} chest drain`
    const tip = ({ anterior: ', tip anterior', posterior: ', tip posterior' } as Record<string, string>)[str(values, 'drain-tip')] ?? ''
    out.push(`${side}${tip}${str(values, 'drain-spine') === 'close' ? ', medial end within 1 cm of the spine' : ''}.`)
  }
  return out
}

/** The lungs, described: the chips name the pattern (N7-1). */
function lungFindings(values: Values): string[] {
  const volume = str(values, 'lung-volume')
  const words = chosen(values, fields.lungPattern).filter((word) => word !== 'clear')
  const volumeWords = ({ low: 'Low lung volumes', normal: 'Normal lung volumes', high: 'Hyperinflated lungs' } as Record<string, string>)[volume]
  if (words.length === 0) {
    if (list(values, 'lung-pattern').includes('clear')) return [!volume || volume === 'normal' ? 'Lungs clear.' : `${volumeWords}, otherwise clear.`]
    return volume && volume !== 'normal' ? [`${volumeWords}.`] : []
  }
  return [volumeWords ? `${volumeWords} with ${andList(words)}.` : `${upperFirst(andList(words))}.`]
}

function urgentFindings(values: Values): string[] {
  const out: string[] = []
  if (ptx(values)) out.push(`${upperFirst(SIDE[str(values, 'pneumothorax')])} pneumothorax.`)
  if (pie(values)) out.push(`${upperFirst(SIDE[str(values, 'pie')])} pulmonary interstitial emphysema.`)
  if (str(values, 'pneumomediastinum') === 'yes') out.push('Pneumomediastinum.')
  if (str(values, 'pneumopericardium') === 'yes') out.push('Pneumopericardium.')
  if (list(values, 'abdomen').includes('bowel-chest')) out.push('Bowel loops in the chest.')
  if (list(values, 'abdomen').includes('free-air')) out.push('Free air under the diaphragm.')
  if (str(values, 'heart-size') === 'large') out.push('Large heart shadow.')
  return out
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || (Array.isArray(values[field.id]) ? list(values, field.id).length > 0 : str(values, field.id) !== '')))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function impression(values: Values): string {
  const found = [...deviceFindings(values), ...lungFindings(values), ...urgentFindings(values)]
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines('Findings as above.', ...negatives)}`
    if (!complete(values)) return ''
    return `Impression: ${lines('No abnormality seen.', ...negatives)}`
  }
  return `Impression: ${lines(...found, other && 'Other findings as above.', ...negatives)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const devices = list(values, 'devices')
  if (devices.includes('none') && devices.length > 1) out.push('Lines and tubes: "None" is ticked with a line or tube.')
  if (list(values, 'lung-pattern').includes('clear') && list(values, 'lung-pattern').length > 1) out.push('Lungs: "Clear" is ticked with an abnormal finding.')
  const negatives = list(values, 'impression-negatives')
  if (negatives.includes('no-pneumothorax') && ptx(values)) out.push('Impression says no pneumothorax, but a pneumothorax is entered.')
  const leak = ptx(values) || pie(values) || str(values, 'pneumomediastinum') === 'yes' || str(values, 'pneumopericardium') === 'yes'
  if (negatives.includes('no-air-leak') && leak) out.push('Impression says no air leak, but an air leak is entered.')
  // N3-8: the two UVC methods disagree.
  if (has('uvc')(values) && uvcMethodsDisagree(values)) out.push('UVC: the vertebral level and the heart shadow disagree; the heart-shadow method was the more accurate (Hoellering).')
  // N2-3: rotation to the left and umbilical lines.
  if (str(values, 'rotation') === 'left' && (devices.includes('uvc') || devices.includes('uac'))) out.push('The film is rotated to the left, which can make the UAC and UVC tips look reversed: check which is which.')
  // N5-1: signs of air with no pneumothorax entered.
  if (str(values, 'pneumothorax') === 'none' && list(values, 'ptx-signs').length > 0) out.push('Signs of air on a supine film are entered with no pneumothorax: look again for an occult one.')
  // N5-2: an anterior junction line with a one-sided pneumothorax.
  if (list(values, 'ptx-signs').includes('junction') && ['right', 'left'].includes(str(values, 'pneumothorax'))) out.push('An anterior junction line means bilateral pneumothorax, but a one-sided pneumothorax is entered.')
  return out
}

function build(values: Values) {
  const text = lines(
    clinicalLine(values),
    techniqueLine(values),
    ...deviceLines(values),
    lungLine(values),
    ...airLines(values),
    ...heartLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

const steps: ReportStep[] = [
  {
    id: 'clinical',
    title: 'Step 1. Why the film, and the baby',
    learn: 'clinical',
    teach: <p>The gestation, age, delivery, history and support decide the likely pattern ({LOVRENSKI}): RDS before 36 weeks; TTN at term, after caesarean; meconium aspiration with stained liquor; pneumonia with infection risks ({GALLACHER}). Ventilation is the commonest cause of air leak ({JENG}).</p>,
    fields: [fields.reason, fields.gestation, fields.age, fields.delivery, fields.history, fields.support, fields.surfactant],
    derive: deriveClinical,
  },
  {
    id: 'technique',
    title: 'Step 2. Technique',
    learn: 'technique',
    teach: <p>Check rotation by the clavicles and anterior ribs, and inspiration by the rib count ({LOVRENSKI}). 7 to 9 posterior ribs is the range NICU guidelines quote, though it is a weak guide to lung volume ({DAHM}). Rotation can mimic or hide disease, and to the left can make the umbilical tips look reversed ({MARAIS}).</p>,
    fields: [fields.projection, fields.coverage, fields.rotation, fields.ribs, fields.exposure],
    derive: deriveTechnique,
  },
  {
    id: 'lines',
    title: 'Step 3. Lines and tubes',
    learn: 'lines',
    teach: (
      <>
        <p>Give each tip as the vertebral body it overlies. ETT T1 to T2 ({THAYYIL}; {CERONE}). UVC at the IVC–right atrium junction, T8 to T9 by level ({DANDREA}), though the heart shadow is the better guide ({HOELLERING}). UAC high T6 to T10 or low L3 to L5 ({NARLA}). PICC T3 to T5 from an arm, T8 to T10 from a leg ({ZUBI}), outside the heart ({NOWLEN}). Gastric tube in the stomach ({NARLA}). Drain anterior for air ({ZUBI}).</p>
        {tipTable}
      </>
    ),
    fields: [
      fields.devices,
      fields.ettLevel, fields.ettBronchus, fields.ettNeck,
      fields.uvcLevel, fields.uvcPosition,
      fields.uacLevel,
      fields.ngPosition,
      fields.piccRoute, fields.piccLevel, fields.piccHeart,
      fields.drainSide, fields.drainFor, fields.drainTip, fields.drainSpine,
    ],
    derive: deriveLines,
  },
  {
    id: 'lungs',
    title: 'Step 4. The lungs',
    learn: 'lungs',
    teach: (
      <>
        <p>Volumes first: RDS is small, TTN normal or large, meconium aspiration large ({LOVRENSKI}). Then the pattern; the diagnosis rests on the history too.</p>
        {lungTable}
      </>
    ),
    fields: [fields.lungVolume, fields.lungPattern, fields.rdsGrade],
    derive: deriveLungs,
  },
  {
    id: 'air-leak',
    title: 'Step 5. Air leak',
    learn: 'air-leak',
    teach: <p>On a supine film look for a deep sulcus, a medial stripe, basal lucency, a sharp heart border, a lucent hemithorax and a double diaphragm ({ROCHA}; {CIZMECI}); an anterior junction line means both sides ({MARKOWITZ}). PIE: perihilar rounded or tubular lucencies ({LOVRENSKI}). Pneumomediastinum lifts the thymus ({HAURI}); pneumopericardium rings the heart ({BURT}).</p>,
    fields: [fields.pneumothorax, fields.ptxSigns, fields.pie, fields.pneumomediastinum, fields.pneumopericardium],
    derive: deriveAirLeak,
  },
  {
    id: 'heart',
    title: 'Step 6. Heart, mediastinum, upper abdomen and bones',
    learn: 'heart',
    teach: <p>Rotation can enlarge the heart and shift the mediastinum ({MARAIS}). A line tip in the heart with a growing heart shadow: think of an effusion ({NOWLEN}). Bowel in the chest with shift is a diaphragmatic hernia ({LOVRENSKI}).</p>,
    fields: [fields.heartSize, fields.mediastinum, fields.abdomen, fields.bones, fields.bonesText],
    derive: deriveHeart,
  },
  {
    id: 'impression',
    title: 'Step 7. Other findings and the impression',
    learn: 'impression',
    teach: <p>Lines and tubes first, each tip with its level and range; then the lungs, described; then anything urgent. This order is this site's own.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'neonatal-chest-xray',
  name: 'Neonatal chest X-ray',
  lede: 'Read a NICU chest radiograph for a lines check, respiratory distress or both: technique, every line and tube tip by vertebral level against its sourced range, the lung patterns of RDS, TTN, meconium aspiration, pneumonia and BPD, air leak on a supine film, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract or its open full text. Where sources give different tip ranges, each is quoted and the chip says which it uses.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'ett',
      question: 'An endotracheal tube tip overlies T3 in a baby born at 26 weeks. What did Thayyil find?',
      options: ['T3 is the target', 'Tips at T3 or T4 went with uneven aeration and more air leak and collapse; keep it at T1 or T2', 'Only a tip in a bronchus matters', 'The clavicles are the better guide'],
      answer: 1,
      explanation: <p>In babies of 28 weeks or less, tips at T3 or T4 went with uneven aeration and adverse outcomes ({THAYYIL}). Blayney found the clavicles too variable and chose the body of T1 ({BLAYNEY}).</p>,
    },
    {
      id: 'carina',
      question: 'Where did the carina lie on neonatal films?',
      options: ['C7 to T1', 'T1 to T2', 'T3 to T5', 'T6 to T8'],
      answer: 2,
      explanation: <p>Between T3 and T5 ({BLAYNEY}); T3 to T5.5 in Cerone's series ({CERONE}).</p>,
    },
    {
      id: 'neck',
      question: 'The head is flexed on the film. Which way has the tube tip moved?',
      options: ['Down, towards the carina', 'Up, towards the larynx', 'It does not move', 'Into the right bronchus always'],
      answer: 0,
      explanation: <p>The tip moved down with flexion and up with extension in every baby ({ROST}).</p>,
    },
    {
      id: 'uvc',
      question: 'A UVC tip lies at T9 but projects inside the heart shadow. Which reading do you trust?',
      options: ['The vertebral level: it is in T8 to T9', 'The heart shadow: it was the more accurate method', 'Neither: only a lateral helps', 'The insertion length'],
      answer: 1,
      explanation: <p>Against ultrasound, the heart-shadow method was 86% sensitive and 94% specific, the vertebral level 61% and 74% ({HOELLERING}; {DANDREA}).</p>,
    },
    {
      id: 'uvc-liver',
      question: 'A UVC tip lies below the diaphragm, in the liver. Why does it matter?',
      options: ['It does not', 'Risk of extravasation, liver injury and portal vein thrombosis', 'It raises the risk of pneumothorax', 'It means the catheter is in the aorta'],
      answer: 1,
      explanation: <p>A tip in the portal system or liver risks extravasation, parenchymal injury and portal thrombosis ({DANDREA}).</p>,
    },
    {
      id: 'uac',
      question: 'A UAC tip lies at L1. How do you report it?',
      options: ['High position', 'Low position', 'Between the high (T6 to T10) and low (L3 to L5) ranges, near the visceral artery origins', 'In the IVC'],
      answer: 2,
      explanation: <p>High is T6 to T10 and low L3 to L5 ({NARLA}); the ranges keep the tip clear of the coeliac, mesenteric and renal origins ({ZUBI}).</p>,
    },
    {
      id: 'picc',
      question: 'A long line from the arm ends inside the heart shadow. What did Nowlen\'s review advise?',
      options: ['Leave it: the right atrium is the target', 'Keep the tip outside the heart shadow, within the cavae', 'Pull it back to the axilla', 'Only an echo can tell'],
      answer: 1,
      explanation: <p>In line-related pericardial effusions the tip lay within the pericardial reflections in 92%; about 1 cm outside the heart shadow in preterm babies and 2 cm at term ({NOWLEN}).</p>,
    },
    {
      id: 'ttn',
      question: 'A term baby born by caesarean before labour has normal-volume lungs, perihilar streaks and fluid in the fissure. What pattern is it?',
      options: ['RDS', 'TTN', 'Meconium aspiration', 'BPD'],
      answer: 1,
      explanation: <p>TTN has normal or large lungs, perihilar opacities and small effusions, and clears in 48 to 72 hours; RDS has low volumes ({LOVRENSKI}). Caesarean before labour is its largest risk ({GALLACHER}).</p>,
    },
    {
      id: 'mas',
      question: 'With bilateral coarse irregular opacities in a term baby, which two cannot be told apart on the film?',
      options: ['RDS and TTN', 'Meconium aspiration and pneumonia', 'BPD and TTN', 'Pneumothorax and PIE'],
      answer: 1,
      explanation: <p>With bilateral coarse opacities, meconium aspiration and neonatal pneumonia cannot be separated ({LOVRENSKI}).</p>,
    },
    {
      id: 'supine',
      question: 'On a supine NICU film, which sign means bilateral pneumothorax?',
      options: ['A deep sulcus on one side', 'An anterior junction line', 'A halo round the heart', 'The spinnaker sign'],
      answer: 1,
      explanation: <p>The anterior junction line is not seen in healthy infants; on a supine neonatal film it means bilateral pneumothorax ({MARKOWITZ}). The halo is pneumopericardium ({BURT}) and the spinnaker sign pneumomediastinum ({HAURI}).</p>,
    },
    {
      id: 'ribs',
      question: 'How well does the rib count at the diaphragm track aerated lung volume in neonates?',
      options: ['Closely: 8 ribs means normal volume', 'Only weakly, too loosely to guide treatment', 'Perfectly on the left', 'Only after surfactant'],
      answer: 1,
      explanation: <p>Against CT, the association was weak ({DAHM}), though 7 to 9 ribs is the range guidelines quote.</p>,
    },
  ],
}

export function NeonatalChestXrayStudyPage() {
  return <StudyPage study={study} />
}
