import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function FootPage() {
  return (
    <AnatomyReferencePage
      name="Foot"
      intro="The hindfoot, midfoot and forefoot with the Lisfranc complex, plantar fascia, plantar plates and interdigital nerves laid on the real bones. Six pathologies — Lisfranc injury, plantar fasciopathy, Morton neuroma, plantar plate tear, metatarsal stress injury and Charcot foot — each come with a severity slider graded on the published scale, an imaging plane and a report checklist, and four of them can be played as an injury mechanism."
      sourceNote="Bone meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP), decimated and re-oriented. Ligaments, fascia, plantar plates, tendons and nerves are built on attachment points measured from those meshes."
      file="online/foot.html"
      viewerTitle="Interactive 3D model of the foot, Lisfranc complex, plantar fascia and plantar plates"
      hint="Drag to rotate, right-drag or shift-drag to pan, scroll or pinch to zoom, hover a bone to name it. Pathologies and mechanisms sit in the top menus; layers, planes and fixed views are under display options."
      scrollsInFrame
      notes={[
        'The second metatarsal base is recessed into a mortise between the cuneiforms, and there is no ligament from the first to the second base. Looking down from the dorsal view makes the keystone obvious, and shows why C1–M2 widening and second-ray alignment are what a Lisfranc read turns on.',
        'The arch is a line through the talus, navicular, medial cuneiform and first metatarsal. Turning to the medial side shows that line and the plantar fascia underneath it together, which is the sagittal image read first in both fasciopathy and Charcot midfoot collapse.',
        'The plantar plates and the interdigital nerves sit in the same few millimetres under the metatarsal heads, either side of the intermetatarsal ligament. Viewing them from below in the short-axis plane explains why the pseudomass beside a torn plate is so easily called a Morton neuroma, and why the ligament decides which it is.',
      ]}
    />
  )
}
