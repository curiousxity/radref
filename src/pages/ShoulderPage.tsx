import { AnatomyViewer } from '../components/AnatomyViewer'

export function ShoulderPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Anatomy</p>
          <h2>Shoulder</h2>
          <p>
            The glenohumeral joint with its four cuff tendons, the labrum and glenohumeral ligaments, the coracoacromial
            arch and the AC joint. Lesion sites are marked where they actually sit — Hill-Sachs, Bankart, SLAP, the cuff
            footprint and the rotator interval — and the coronal oblique plane can be laid over the model.
          </p>
          <p className="source-note">
            Bones and muscles from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Capsulolabral
            structures are simplified to show course and attachment.
          </p>
        </div>
      </section>

      <AnatomyViewer
        file="shoulder.html"
        title="Interactive 3D model of the shoulder, rotator cuff and capsulolabral complex"
        hint="Drag to rotate, scroll or pinch to zoom, click any structure. The page scrolls inside the frame, so on a phone it reads better full screen."
        emphasiseFullScreen
      />

      <section className="info-card">
        <h3>Why it is worth turning over</h3>
        <ul className="plain-list">
          <li>
            Cuff tendons are usually described one at a time and imaged as a continuous sheet. Seeing the footprint as a
            single curved insertion explains why tear size is reported in two dimensions and why the supraspinatus and
            infraspinatus are so often involved together.
          </li>
          <li>
            The coronal oblique and sagittal oblique planes are defined by the glenoid, not by the patient. Overlaying
            the plane on the model shows what each one is designed to cut and what it inevitably foreshortens.
          </li>
          <li>
            Anterior dislocation leaves paired lesions at opposite ends of the joint. Turning the humeral head to face
            the glenoid rim makes the Hill-Sachs and Bankart sites obviously two halves of one event.
          </li>
        </ul>
      </section>
    </div>
  )
}
