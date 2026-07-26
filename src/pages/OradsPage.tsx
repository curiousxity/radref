import { useMemo, useState } from 'react'
import { CopyBlock } from '../components/CopyBlock'
import { Badge } from '../components/Badge'
import { Definition } from '../components/Definition'
import { calculateOrads } from '../logic/orads'
import type { OradsForm } from '../types/orads'

const initialForm: OradsForm = {
  modality: 'us',
  menopausal: 'premenopausal',
  sizeCm: '',
  cystType: 'simple',
  solidComponent: false,
  papillaryProjections: 0,
  locules: 1,
  smoothContour: true,
  ascites: false,
  peritonealDisease: false,
  colorScore: '1',
  enhancingSolidTissue: false,
  fat: false,
  hemorrhagic: false,
  diffusionRestriction: false,
  enhancement: 'none',
}

export function OradsPage() {
  const [form, setForm] = useState<OradsForm>(initialForm)
  const result = useMemo(() => calculateOrads(form), [form])
  function updateField<K extends keyof OradsForm>(field: K, value: OradsForm[K]) { setForm((current) => ({ ...current, [field]: value })) }
  function handleReset() { setForm(initialForm) }
  const isUs = form.modality === 'us'
  return (
    <div className="page page-calculator">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">O-RADS US / MRI</p>
          <h2>O-RADS calculator</h2>
          <p>Branch-aware O-RADS form with separate ultrasound and MRI logic paths.</p>
          <p className="source-note">
            Source: <a href={isUs ? 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/O-RADS/Ultrasound' : 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/O-RADS/MRI'} target="_blank" rel="noopener noreferrer">ACR O-RADS {isUs ? 'Ultrasound' : 'MRI'} risk stratification and management guidance</a>.
          </p>
        </div>
        <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
      </section>
      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Features</h3>
          <div className="form-grid">
            <label><span>Modality</span><select value={form.modality} onChange={(e) => updateField('modality', e.target.value as OradsForm['modality'])}><option value="us">Ultrasound</option><option value="mri">MRI</option></select></label>
            <label><span>Menopausal status</span><select value={form.menopausal} onChange={(e) => updateField('menopausal', e.target.value as OradsForm['menopausal'])}><option value="premenopausal">Premenopausal</option><option value="postmenopausal">Postmenopausal</option></select></label>
            <label><span>Size (cm)</span><input type="number" min="0" step="0.1" inputMode="decimal" value={form.sizeCm} onChange={(e) => updateField('sizeCm', e.target.value)} placeholder="e.g. 3.2" /></label>
            <label>
              <span className="term">Morphology<Definition text="The lesion's overall ultrasound/MRI structure — for example a simple cyst, a unilocular cyst with a solid or papillary component, a multilocular cyst, or a solid mass — which drives the O-RADS risk category." /></span>
              <select value={form.cystType} onChange={(e) => updateField('cystType', e.target.value as OradsForm['cystType'])}><option value="simple">Simple cyst</option><option value="nonsimple">Nonsimple unilocular cyst</option><option value="solid">Solid lesion</option><option value="classicBenign">Classic benign lesion</option><option value="multilocular">Multilocular lesion</option><option value="indeterminate">Indeterminate lesion</option></select>
            </label>
            {isUs && (
              <label>
                <span className="term">Color score<Definition text="Color Doppler score reflecting the amount of blood flow within solid or papillary components; higher scores indicate more vascularity." /></span>
                <select value={form.colorScore} onChange={(e) => updateField('colorScore', e.target.value as OradsForm['colorScore'])}><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select>
              </label>
            )}
            {isUs && (
              <label>
                <span className="term">Papillary projections<Definition text="Solid projections extending from the cyst wall into the lumen, generally counted when at least 3 mm tall." /></span>
                <input type="number" min="0" step="1" value={form.papillaryProjections} onChange={(e) => updateField('papillaryProjections', Number(e.target.value))} />
              </label>
            )}
            {isUs && (
              <label>
                <span className="term">Locules<Definition text="The number of fluid-filled compartments within a cystic lesion, separated by septations." /></span>
                <input type="number" min="1" step="1" value={form.locules} onChange={(e) => updateField('locules', Number(e.target.value))} />
              </label>
            )}
            {isUs && (
              <label className="check-row">
                <input type="checkbox" checked={form.solidComponent} onChange={(e) => updateField('solidComponent', e.target.checked)} />
                <span className="term">Solid component<Definition text="A solid area within an otherwise cystic lesion, as opposed to septations, debris, or a clot." /></span>
              </label>
            )}
            {!isUs && (
              <label>
                <span className="term">Enhancement<Definition text="Degree of contrast enhancement of solid tissue relative to myometrium on dynamic MRI." /></span>
                <select value={form.enhancement} onChange={(e) => updateField('enhancement', e.target.value as OradsForm['enhancement'])}><option value="none">None</option><option value="minimal">Minimal</option><option value="moderate">Moderate</option><option value="marked">Marked</option></select>
              </label>
            )}
            {!isUs && (
              <label className="check-row">
                <input type="checkbox" checked={form.enhancingSolidTissue} onChange={(e) => updateField('enhancingSolidTissue', e.target.checked)} />
                <span className="term">Enhancing solid tissue<Definition text="Solid tissue within the lesion that shows measurable contrast enhancement, as opposed to non-enhancing debris or blood products." /></span>
              </label>
            )}
            {!isUs && (
              <label className="check-row">
                <input type="checkbox" checked={form.fat} onChange={(e) => updateField('fat', e.target.checked)} />
                <span className="term">Fat<Definition text="Macroscopic fat within the lesion, suggesting a dermoid cyst / mature cystic teratoma." /></span>
              </label>
            )}
            {!isUs && (
              <label className="check-row">
                <input type="checkbox" checked={form.hemorrhagic} onChange={(e) => updateField('hemorrhagic', e.target.checked)} />
                <span className="term">Hemorrhagic content<Definition text="Blood products within the lesion, which can mimic solid tissue on imaging but should not enhance." /></span>
              </label>
            )}
            {!isUs && (
              <label className="check-row">
                <input type="checkbox" checked={form.diffusionRestriction} onChange={(e) => updateField('diffusionRestriction', e.target.checked)} />
                <span className="term">Diffusion restriction<Definition text="Restricted water diffusion on DWI/ADC, a feature that raises concern for malignancy or densely cellular tissue." /></span>
              </label>
            )}
            <label className="check-row"><input type="checkbox" checked={form.ascites} onChange={(e) => updateField('ascites', e.target.checked)} /> Ascites</label>
            <label className="check-row"><input type="checkbox" checked={form.peritonealDisease} onChange={(e) => updateField('peritonealDisease', e.target.checked)} /> Peritoneal disease</label>
          </div>
        </article>
        <article className="info-card result-card sticky-card">
          <div className="result-head"><h3>Result</h3><Badge label={result.category} tone={result.category.includes('5') || result.category.includes('4') ? 'warn' : result.category.includes('2') || result.category.includes('1') ? 'good' : 'accent'} /></div>
          <div className="result-panel"><div><p className="metric-label">Category</p><p className="metric-value">{result.category}</p></div><div><p className="metric-label">Features</p><p className="metric-value">{result.features.length}</p></div></div>
          <p className="result-summary">{result.reason}</p>
          <CopyBlock label="Features summary" text={result.features.length ? result.features.join(', ') : 'No suspicious features selected.'} />
          <CopyBlock label="O-RADS impression" text={result.impression} />
          <p className="copy-status">{result.recommendation}</p>
        </article>
      </section>
    </div>
  )
}
