import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function SkullBasePage() {
  return (
    <AnatomyReferencePage
      name="Skull base"
      intro="The skull base from above and below with its foramina ringed and all twelve cranial nerves routed through them, alongside the ICA, basilar artery and sigmoid-jugular system. Pathologies — perineural spread along V2, V3 and VII, jugular foramen masses, skull base fractures and central lesions — can be laid over the model with a severity slider, an axial, coronal or sagittal plane can be passed through it, and fixed views include the cavernous sinus, jugular foramen and pterygopalatine fossa."
      sourceNote="Bone, brainstem and optic nerve meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP), decimated and clipped above the skull base. Cranial nerves, vessels and lesions are drawn on those meshes, and openings the bone mesh lacks are placed from measured neighbours and flagged."
      file="online/skull-base.html"
      viewerTitle="Interactive 3D model of the skull base foramina and cranial nerves"
      hint="Drag to rotate, right-drag or shift-drag to pan, scroll or pinch to zoom, click a ring or a nerve. Layers, planes and views sit in the drawer at the bottom left."
      scrollsInFrame
      notes={[
        'Perineural tumour travels along connections, not just along one nerve. Following V2 back through the pterygopalatine fossa and the vidian canal to the geniculate ganglion shows how a cheek primary reaches the facial nerve, and why a normal segment does not clear the nerve upstream.',
        'The foramina are learned as a list and read as holes in a curved floor seen one slice at a time. Looking at them from above and then from below makes it clear which openings sit in the axial plane together and which ones only a coronal image will show.',
        'A transverse fracture across the clivus runs through foramen lacerum and both carotid canals on its way from one petrous apex to the other. Playing the lateral blow puts CN VI at Dorello canal and the ICA on the fracture line, which is why the report asks for CTA.',
      ]}
    />
  )
}
