import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function PelvisSiPage() {
  return (
    <AnatomyReferencePage
      name="Pelvis and sacroiliac joints"
      intro="The bony pelvis with its ring ligaments, the sacroiliac joints, both proximal femora and L5. Fractures can be laid on the model by pattern — Young–Burgess pelvic ring injuries, Denis sacral zones, Judet–Letournel acetabular types — alongside ASAS sacroiliitis lesions, and the camera snaps to the projection that shows each one: AP, inlet, outlet, both Judet obliques, and the semicoronal and semiaxial SI planes."
      sourceNote="Bone meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Ligaments and joint surfaces are built on attachment points measured from those meshes."
      file="online/pelvis-si.html"
      viewerTitle="Interactive 3D model of the pelvis, sacroiliac joints and acetabulum"
      hint="Drag to rotate, scroll or pinch to zoom, tap a bone to name it. Pathologies and mechanisms are in the header menus; layers, imaging planes and camera presets sit under Display."
      scrollsInFrame
      notes={[
        'The inlet and outlet views are the AP pelvis tilted to look along and across the ring. Snapping between them on the model shows why sacral ala buckling and anterior SI widening are inlet findings, and why vertical displacement belongs to the outlet.',
        'The sacroiliac joint lies oblique to every standard plane, which is why it is imaged semicoronal and semiaxial to the sacrum. Turning to those planes also shows the thin iliac-side cartilage where erosion and sclerosis tend to appear first.',
        'The acetabulum sits between an anterior and a posterior column, and the two Judet obliques each bring one of them into profile. Rotating between the obturator and iliac obliques makes the elementary fracture types far easier to hold in mind.',
      ]}
    />
  )
}
