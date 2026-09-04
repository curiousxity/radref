import { AnatomyViewer } from '../components/AnatomyViewer'

export function AnklePage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Anatomy</p>
          <h2>Ankle</h2>
          <p>
            A rotatable ankle and hindfoot built on real bone surfaces: the mortise and tarsus, the lateral and deltoid
            ligament complexes, the syndesmosis, and the four tendon compartments running past the malleoli. Click a
            structure to read what it does, how it fails and what to look for on imaging, or step through an injury
            mechanism.
          </p>
          <p className="source-note">
            Bone meshes come from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Soft tissue is
            simplified and drawn to show course and attachment, not calibre.
          </p>
        </div>
      </section>

      <AnatomyViewer
        file="ankle.html"
        title="Interactive 3D model of the ankle, its ligaments and tendons"
        hint="Drag to rotate, scroll to zoom, click any structure. Injury mechanisms play step by step. The page scrolls inside the frame, so on a phone it reads better full screen."
        emphasiseFullScreen
      />

      <section className="info-card">
        <h3>Why it is worth turning over</h3>
        <ul className="plain-list">
          <li>
            The lateral ligaments fail in a fixed order — ATFL first, then CFL, PTFL last — and that order only makes
            sense once you can see how each one is oriented relative to the axis the ankle rolls about.
          </li>
          <li>
            A high ankle sprain and an ordinary inversion sprain are separated by a few centimetres and a very different
            recovery. Seeing the interosseous ligament and membrane above the mortise makes the distinction concrete.
          </li>
          <li>
            The peroneal, posterior tibial and flexor hallucis longus tendons all curve sharply around bone, which is
            where they subluxate, tear and get imaged obliquely. Rotating the model shows which slice actually cuts each
            one transversely.
          </li>
        </ul>
      </section>
    </div>
  )
}
