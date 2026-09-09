import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function OticCapsulePage() {
  return (
    <AnatomyReferencePage
      name="Otic capsule"
      intro="A rotatable right temporal bone: cochlea, vestibule and the three semicircular canals, with the middle ear and the facial nerve canal shown alongside them. Click a structure to read what it is and where it is looked for on CT and MRI."
      sourceNote="Proportions are simplified for teaching, not for measurement. Use it to fix the spatial relationships, then read the study."
      file="otic-capsule.html"
      viewerTitle="Interactive 3D model of the otic capsule and temporal bone"
      hint="Drag to rotate, scroll to zoom, click any structure. Toggle the middle ear, facial nerve, labels, and a bone-window or fluid-bright T2 look."
      scrollsInFrame={false}
      notes={[
        'The labyrinth is a single continuous fluid space, so a lesion in one part is rarely isolated from the rest — seeing it as one object makes that obvious in a way that axial slices do not.',
        'The facial nerve runs its labyrinthine, tympanic and mastoid segments in close quarters with the cochlea, lateral semicircular canal and oval window. Most of the operative risk lives in those relationships.',
        'Bone-window and heavily T2-weighted looks show almost inverse pictures of the same structures: dense capsule against lucent lumen, versus bright fluid against dark bone.',
      ]}
    />
  )
}
