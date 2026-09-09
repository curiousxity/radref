import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function KneePage() {
  return (
    <AnatomyReferencePage
      name="Knee"
      intro="A left knee you can turn in the hand: cruciates and collaterals, both menisci, the extensor mechanism and the posterolateral corner, with the popliteal artery and common peroneal nerve in place. Fixed views from the front, back, either side and down onto the tibial plateau, plus the mechanisms that injure each group."
      sourceNote="Bone anatomy from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Ligament and meniscal geometry is simplified for teaching."
      file="knee.html"
      viewerTitle="Interactive 3D atlas of the knee"
      hint="Drag to rotate, scroll to zoom, click any structure. Preset views sit along the top."
      scrollsInFrame
      notes={[
        'Knee injuries arrive in patterns rather than singly. Seeing which structures share a mechanism — pivot shift, valgus clip, dashboard, hyperextension — tells you where else to look once you have found the first tear.',
        'The menisci are wedges seated on a curved plateau, so their body, root and posterior horn are cut very differently by the same sagittal stack. Looking down on the tibia first makes the sagittal images easier to read.',
        'The posterolateral corner is a small crowded group whose components are easy to name and hard to picture. Rotating to the back and outer side puts the popliteus, LCL and biceps femoris into their real relationships.',
      ]}
    />
  )
}
