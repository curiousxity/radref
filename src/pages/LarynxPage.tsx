import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function LarynxPage() {
  return (
    <AnatomyReferencePage
      name="Larynx"
      intro="The laryngeal framework coloured by subsite, with the pre-epiglottic and paraglottic fat, the thyrohyoid and cricothyroid membranes, and the straps, vessels and prevertebral structures as optional layers. Glottic, supraglottic and subglottic cancers and cartilage invasion can be stepped through their AJCC 8th T stages on the model, with axial, coronal and sagittal planes, cut-aways at the midline, ventricle and cords, and fixed views including an endoscopic view from above."
      sourceNote="Thyroid cartilage, hyoid, trachea, straps, vessels and cervical spine from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP), cropped and decimated. The cricoid, arytenoids, epiglottis and mucosal folds are not in BodyParts3D and are built procedurally, anchored to points measured on the real cartilage."
      file="online/larynx.html"
      viewerTitle="Interactive 3D model of the larynx, its subsites and fat spaces"
      hint="Drag to rotate, scroll to zoom, right-drag or two fingers to pan, click a structure. Layers, planes and views sit in the drawer."
      scrollsInFrame={false}
      notes={[
        'The paraglottic space is a thin sheet of fat between the ventricle and the thyroid lamina, continuous with the pre-epiglottic fat above. Seeing it as one space explains how a tumour crosses the ventricle to become transglottic, and why its involvement makes a tumour T3 wherever it started.',
        'The ventricle that divides glottis from supraglottis is a slit best seen on coronal images, while the anterior commissure is judged on a true axial. Passing the planes through the model shows which boundary each plane is built to answer.',
        'Cartilage invasion is staged by depth: inner cortex is T3, through the outer cortex is T4a. Stepping the thyroid lamina and the cricoid through the stages shows where each criterion sits, and why sclerosis means more in the cricoid than in the patchily ossified thyroid cartilage.',
      ]}
    />
  )
}
