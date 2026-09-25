import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function TmjPage() {
  return (
    <AnatomyReferencePage
      name="Temporomandibular joint"
      intro="Both temporomandibular joints with the mandible, temporal bones, disc, retrodiscal tissue, capsule and masticator muscles, opened and closed with a slider. Lateral, medial, anterior, superior and oblique views, sagittal oblique, coronal oblique and axial planes, and played mechanisms from the normal opening cycle to reciprocal click, closed lock, contralateral condylar fracture and anterior dislocation."
      sourceNote="Bone and muscle meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). The disc, retrodiscal tissue, capsule and ligament are generated surfaces fitted to this specimen's condyle and fossa, not scanned soft tissue."
      file="online/tmj.html"
      viewerTitle="Interactive 3D model of the temporomandibular joint and articular disc"
      hint="Drag to rotate, right-drag or shift-drag to pan, scroll or pinch to zoom. Views, layers, planes and the jaw-opening slider sit in the Display drawer."
      scrollsInFrame
      notes={[
        'The disc is read at 12 o’clock on a closed-mouth sagittal oblique, and that plane is set by the condyle, not the head. Laying the plane over the joint shows why a straight sagittal slice makes a normal disc look displaced.',
        'Opening is a hinge followed by a slide down the eminence, with the disc riding on the condyle. Stepping the jaw open shows where the intermediate zone should end up and what a disc that fails to reduce does to translation.',
        'Purely medial or lateral disc displacement never shows on the sagittal images. Turning to the anterior view and the coronal oblique plane shows the direction a sagittal-only read misses.',
      ]}
    />
  )
}
