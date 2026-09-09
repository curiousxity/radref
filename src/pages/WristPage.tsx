import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function WristPage() {
  return (
    <AnatomyReferencePage
      name="Wrist"
      intro="A right wrist with all eight carpal bones on real bone surfaces, the intrinsic and extrinsic ligaments, the TFCC, the extensor compartments and the contents of the carpal and Guyon's canals. Injury mechanisms cover the fall on an outstretched hand and the Mayfield ladder of perilunate instability, and there is a quiz at the end."
      sourceNote="Real bone surfaces with simplified soft tissue. Use it for spatial relationships, not for measurement."
      file="wrist.html"
      viewerTitle="Interactive 3D model of the wrist, carpus and its ligaments"
      hint="Drag to rotate, scroll to zoom, click any structure. Preset views and a carpal-tunnel view sit along the top."
      scrollsInFrame
      notes={[
        'Perilunate injury progresses around the lunate in a defined sequence, and each stage is named for the joint that has just failed. Watching it run in three dimensions makes the radiographs of stage III and IV far easier to call.',
        'Scapholunate and lunotriquetral ligaments are small, obliquely oriented and routinely missed. Seeing where they sit relative to the standard planes shows why a dedicated sequence is needed to judge them.',
        'The six extensor compartments and the two flexor canals are best learnt as a ring around the distal carpus rather than as a list. One transverse view through the carpal tunnel fixes the whole arrangement.',
      ]}
    />
  )
}
