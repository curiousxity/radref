import { AnatomyViewer } from '../components/AnatomyViewer'

export function KneePage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Anatomy</p>
          <h2>Knee</h2>
          <p>
            A left knee you can turn in the hand: cruciates and collaterals, both menisci, the extensor mechanism and
            the posterolateral corner, with the popliteal artery and common peroneal nerve in place. Fixed views from
            the front, back, either side and down onto the tibial plateau, plus the mechanisms that injure each group.
          </p>
          <p className="source-note">
            Bone anatomy from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Ligament and meniscal
            geometry is simplified for teaching.
          </p>
        </div>
      </section>

      <AnatomyViewer
        file="knee.html"
        title="Interactive 3D atlas of the knee"
        hint="Drag to rotate, scroll to zoom, click any structure. Preset views sit along the top. The page scrolls inside the frame, so on a phone it reads better full screen."
        emphasiseFullScreen
      />

      <section className="info-card">
        <h3>Why it is worth turning over</h3>
        <ul className="plain-list">
          <li>
            Knee injuries arrive in patterns rather than singly. Seeing which structures share a mechanism — pivot
            shift, valgus clip, dashboard, hyperextension — tells you where else to look once you have found the first
            tear.
          </li>
          <li>
            The menisci are wedges seated on a curved plateau, so their body, root and posterior horn are cut very
            differently by the same sagittal stack. Looking down on the tibia first makes the sagittal images easier to
            read.
          </li>
          <li>
            The posterolateral corner is a small crowded group whose components are easy to name and hard to picture.
            Rotating to the back and outer side puts the popliteus, LCL and biceps femoris into their real relationships.
          </li>
        </ul>
      </section>
    </div>
  )
}
