import { useMemo, useState } from 'react'

type VesselRow = {
  vessel: string
  typical: string
  ectasia: string
  aneurysmal: string
  notes: string
}

const vessels: VesselRow[] = [
  {
    vessel: 'Ascending aorta',
    typical: 'About 31 ± 4 mm; upper normal often around 4.1 cm.',
    ectasia: '>4.0 cm is commonly considered dilated.',
    aneurysmal: 'About 5.0 cm, or at least 1.5x expected normal caliber.',
    notes: 'Best interpreted with sex/body-size context and consistent measurement technique.',
  },
  {
    vessel: 'Transverse arch / arch',
    typical: 'About 26-28 mm.',
    ectasia: 'Mild enlargement above expected normal for age/sex/body size.',
    aneurysmal: 'Roughly at least 1.5x expected normal caliber.',
    notes: 'Arch thresholds are less commonly quoted as single fixed absolute numbers than ascending or abdominal aorta values.',
  },
  {
    vessel: 'Descending thoracic aorta',
    typical: 'About 24 ± 3 mm; upper normal around 3.0 cm.',
    ectasia: '>3.0 cm is a practical dilation threshold.',
    aneurysmal: 'Often about 3.5-4.0 cm or at least 1.5x expected normal caliber, depending on level and body size.',
    notes: 'Use the same measurement plane and wall-to-wall convention across follow-up studies.',
  },
  {
    vessel: 'Abdominal aorta',
    typical: 'Usually about 2 cm, tapering distally.',
    ectasia: '2.5-2.9 cm is commonly described as ectatic.',
    aneurysmal: '≥3.0 cm defines abdominal aortic aneurysm.',
    notes: 'One of the most standardized large-vessel thresholds in practice.',
  },
  {
    vessel: 'Main pulmonary artery',
    typical: 'Mean about 25-27 mm; common upper normal 29 mm in men and 27 mm in women.',
    ectasia: 'Above those sex-specific cutoffs is enlarged.',
    aneurysmal: 'No single universal aneurysm cutoff; marked enlargement well above normal should be flagged, and values >3.3 cm are clearly abnormal in many CT references.',
    notes: 'Interpret with pulmonary hypertension context and compare with aortic caliber when relevant.',
  },
  {
    vessel: 'Common iliac artery',
    typical: 'Roughly 1.0-1.25 cm.',
    ectasia: 'Ectatic at ≥1.7 cm in men or ≥1.5 cm in women.',
    aneurysmal: '>2.5 cm is a practical aneurysm definition.',
    notes: 'Definitions vary slightly across sources, but >2.5 cm is a useful radiology reference threshold.',
  },
  {
    vessel: 'Internal iliac artery',
    typical: 'Often around 0.5-0.7 cm in routine adult practice.',
    ectasia: 'Ectatic at ≥0.8 cm.',
    aneurysmal: 'Often considered aneurysmal once clearly >1.5x expected caliber; about 1.5 cm is a practical reference threshold.',
    notes: 'Published reference values are less standardized than for the common iliac artery.',
  },
  {
    vessel: 'Popliteal artery',
    typical: 'Normal caliber varies by level; often around 0.7-1.1 cm in adults.',
    ectasia: 'Mild focal enlargement above expected caliber.',
    aneurysmal: 'Usually defined as >1.5x the normal adjacent vessel; ≥2.0 cm is a common practical aneurysm/treatment reference.',
    notes: 'Popliteal aneurysm diagnosis often relies on relative dilation, while 2 cm is commonly used in management discussions.',
  },
  {
    vessel: 'Splenic artery',
    typical: 'Normally only several millimeters in caliber, not near 2 cm.',
    ectasia: 'Focal dilation above expected vessel caliber but below common treatment thresholds.',
    aneurysmal: 'Recognized when clearly focally dilated; >2-2.5 cm is commonly cited as clinically significant, and ≥3 cm is a common asymptomatic treatment threshold.',
    notes: 'Distinguish true aneurysm from tortuosity and calcified chronic lesions.',
  },
  {
    vessel: 'Renal artery',
    typical: 'Usually about 5-6 mm.',
    ectasia: 'Mild focal enlargement above expected vessel caliber.',
    aneurysmal: 'Typically defined by focal dilation; >2 cm is commonly used as a management threshold rather than a strict diagnostic threshold.',
    notes: 'True aneurysm, pseudoaneurysm, and branch aneurysm patterns should be separated in reporting.',
  },
]

const references: { label: string; href?: string }[] = [
  { label: 'Thoracic aorta, Radiopaedia', href: 'https://radiopaedia.org/articles/thoracic-aorta' },
  {
    label: 'Normative reference values of thoracic aortic diameter in the ACRIN 6654 arm of the National Lung Screening Trial, Clinical Imaging 2016',
    href: 'https://pubmed.ncbi.nlm.nih.gov/27203287/',
  },
  { label: 'CT and MRI Assessment of the Aortic Root and Ascending Aorta, AJR', href: 'https://ajronline.org/doi/10.2214/AJR.12.9531' },
  {
    label: 'Aortic Size Assessment by Noncontrast Cardiac Computed Tomography: Normal Limits by Age, Gender, and Body Surface Area, JACC Cardiovasc Imaging 2008',
    href: 'https://pubmed.ncbi.nlm.nih.gov/19356429/',
  },
  { label: 'Ascending aorta dilatation, Radiopaedia', href: 'https://radiopaedia.org/articles/ascending-aorta-dilatation' },
  { label: 'Size, The Common Vein', href: 'https://thecommonvein.com/aorta/size/' },
  {
    label: 'Reference Diameters of the Abdominal Aorta and Iliac Arteries in the Korean Population, Yonsei Med J 2013',
    href: 'https://pubmed.ncbi.nlm.nih.gov/23225798/',
  },
  { label: 'CT measurement of main pulmonary artery diameter, British Journal of Radiology 1998', href: 'https://pubmed.ncbi.nlm.nih.gov/10211060/' },
  {
    label: 'Reference values for normal pulmonary artery dimensions by noncontrast cardiac CT: the Framingham Heart Study',
    href: 'https://pubmed.ncbi.nlm.nih.gov/22178898/',
  },
  { label: 'Pulmonary trunk, Radiopaedia', href: 'https://radiopaedia.org/articles/pulmonary-trunk' },
  {
    label: 'Spectrum of Multi-Detector Computed Tomography Findings that Alter Pulmonary Artery Diameters in Adults, J Korean Soc Radiol 2018',
    href: 'https://jksronline.org/DOIx.php?id=10.3348%2Fjksr.2018.78.6.389',
  },
  {
    label: 'Optimal surveillance and treatment of renal and splenic artery aneurysms, Cleveland Clinic Journal of Medicine 2020',
    href: 'https://pubmed.ncbi.nlm.nih.gov/33229392/',
  },
  { label: 'Size of normal and aneurysmal popliteal arteries: a duplex ultrasound study, J Vasc Surg 2006', href: 'https://pubmed.ncbi.nlm.nih.gov/16520160/' },
  { label: 'Popliteal artery aneurysm, Radiopaedia', href: 'https://radiopaedia.org/articles/popliteal-artery-aneurysm' },
  { label: 'Iliac artery aneurysm, Radiopaedia', href: 'https://radiopaedia.org/articles/iliac-artery-aneurysm-1' },
  { label: 'How many centimeters of an iliac aneurysm should be critical?, University of Tokyo Vascular Surgery', href: 'https://vascular-1su.jp/en/clinical/iliac-artery-aneurysm/' },
  { label: 'Isolated Common Iliac Aneurysm' },
  { label: 'Renal artery, Radiopaedia', href: 'https://radiopaedia.org/articles/renal-artery' },
]

export function VascularDiameterPage() {
  const [filter, setFilter] = useState('')

  const filteredVessels = useMemo(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return vessels
    return vessels.filter((row) => row.vessel.toLowerCase().includes(query))
  }, [filter])

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Quick reference</p>
          <h2>Vascular diameter reference</h2>
          <p>Practical adult reference values for normal caliber, ectasia/dilatation, and aneurysmal dilatation of commonly referenced vessels.</p>
          <p className="source-note">Intended as a radiology quick-reference guide, not a substitute for vessel-specific society guidelines, body-size adjustment, or surgical decision thresholds.</p>
        </div>
      </section>

      <section className="info-card">
        <h3>Key principles</h3>
        <ul className="plain-list">
          <li>Many vascular thresholds vary by sex, age, and body size, especially for the thoracic aorta and pulmonary artery.</li>
          <li>For several peripheral and visceral arteries, aneurysm is often conceptualized as a focal diameter greater than 1.5 times the expected normal vessel diameter rather than by one universal absolute cutoff.</li>
          <li>Some vessels have well-established diagnostic thresholds for aneurysm, whereas others are more often discussed using intervention thresholds in clinical practice.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Diameter reference</h3>
        <div className="form-grid filter-row">
          <label>
            <span>Filter vessels</span>
            <input type="text" placeholder="e.g. aorta, popliteal, renal" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </label>
        </div>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Vessel</th>
                <th>Typical adult diameter</th>
                <th>Ectasia / dilatation</th>
                <th>Aneurysmal dilatation</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredVessels.map((row) => (
                <tr key={row.vessel}>
                  <td className="vessel-name">{row.vessel}</td>
                  <td>{row.typical}</td>
                  <td>{row.ectasia}</td>
                  <td>{row.aneurysmal}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
              {filteredVessels.length === 0 && (
                <tr>
                  <td colSpan={5}>No vessels match "{filter}".</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Practical reporting notes</h3>
        <ul className="plain-list">
          <li>Thoracic aorta: use a consistent plane, ideally orthogonal to the vessel centerline when possible, and avoid mixing outer-to-outer and inner-to-inner methods across serial exams.</li>
          <li>Pulmonary artery: enlargement supports but does not by itself diagnose pulmonary hypertension; clinical context matters.</li>
          <li>Peripheral and visceral arteries: when literature is variable, a note that the vessel measures more than 1.5 times expected caliber can be more defensible than claiming one universal threshold.</li>
          <li>Management thresholds are not the same as diagnostic thresholds. Splenic, renal, iliac, and popliteal aneurysms are often discussed clinically in terms of repair criteria that depend on symptoms, growth, pregnancy risk, distal embolic risk, or anatomy.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          {references.map((ref) => (
            <li key={ref.label}>
              {ref.href ? (
                <a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label}</a>
              ) : (
                ref.label
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
