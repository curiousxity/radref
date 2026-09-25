import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function CervicalSpinePage() {
  return (
    <AnatomyReferencePage
      name="Cervical spine"
      intro="The cervical spine from the occiput to T1, with the craniocervical ligaments, the posterior ligamentous complex, the cord and the vertebral arteries. Eleven trauma patterns can be laid on the model and graded with a severity slider, from atlanto-occipital dissociation and odontoid fractures to facet dislocation and cord injury, and six injury mechanisms play out step by step. Fixed lateral, AP, open-mouth, axial, oblique and posterior views, with an axial, sagittal or coronal plane through the model."
      sourceNote="Bone and disc meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Ligaments, cord and vertebral arteries are modelled onto these meshes from measured attachment points."
      file="online/cervical-spine.html"
      viewerTitle="Interactive 3D model of cervical spine trauma"
      hint="Drag to rotate, scroll or pinch to zoom. Pathologies and mechanisms are in the header menus; layers, planes and camera views are under Display."
      scrollsInFrame
      notes={[
        'The craniocervical junction is held together almost entirely by ligaments. Raising the severity of atlanto-occipital dissociation with the ligament layer on shows the tectorial membrane and alar ligaments failing while the bones barely move.',
        'A perched facet sits tip to tip and can look almost aligned on a midline sagittal. Turning the model shows the two facet columns standing well off the midline, which is why both have to be scrolled through on every case.',
        'Playing a mechanism through from the first phase shows which column fails first and what goes with it, so a single fracture prompts a search for the injuries that share its force.',
      ]}
    />
  )
}
