import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function SuprahyoidSpacesPage() {
  return (
    <AnatomyReferencePage
      name="Suprahyoid neck spaces"
      intro="The ten suprahyoid spaces in the Harnsberger scheme — parapharyngeal, masticator, carotid and parotid, with the pharyngeal mucosal, retropharyngeal, perivertebral, buccal, sublingual and submandibular spaces around them — built around the skull base, mandible and muscles. An axial, coronal or sagittal T1-style slice runs alongside the model, a mass localiser shows how a mass from each neighbour shifts the parapharyngeal fat, and four pathologies are laid on the model."
      sourceNote="Bone, tooth and muscle meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP), decimated and cropped. The spaces are modelled onto them, the vessels are drawn to the hollows measured on the skull base, and the muscles are slimmer than in most patients, so the fat planes look generous."
      file="online/suprahyoid-spaces.html"
      viewerTitle="Interactive 3D model of the suprahyoid neck spaces"
      hint="Drag to rotate, right-drag or shift-drag to pan, scroll to zoom, click a space in the model or on the slice. Layers, planes and camera views sit in the drawer."
      scrollsInFrame
      notes={[
        'A deep face mass rarely starts in the parapharyngeal fat. Seeing the fat as a triangle with a neighbour on every side makes the direction it is pushed read directly as the space of origin.',
        'Deep-lobe parotid tumours and true parapharyngeal masses sit either side of the stylomandibular tunnel. Turning the model to look between the ramus and the styloid shows why a widened tunnel and a missing fat plane point to the parotid.',
        'The masticator space runs above the zygomatic arch and up to the foramen ovale along V3. Following it from below shows where a temporal fossa collection or perineural spread hides once the axial stack leaves the jaw.',
      ]}
    />
  )
}
