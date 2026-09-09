import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function ShoulderPage() {
  return (
    <AnatomyReferencePage
      name="Shoulder"
      intro="The glenohumeral joint with its four cuff tendons, the labrum and glenohumeral ligaments, the coracoacromial arch and the AC joint. Lesion sites are marked where they actually sit — Hill-Sachs, Bankart, SLAP, the cuff footprint and the rotator interval — and the coronal oblique plane can be laid over the model."
      sourceNote="Bones and muscles from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Capsulolabral structures are simplified to show course and attachment."
      file="shoulder.html"
      viewerTitle="Interactive 3D model of the shoulder, rotator cuff and capsulolabral complex"
      hint="Drag to rotate, scroll or pinch to zoom, click any structure."
      scrollsInFrame
      notes={[
        'Cuff tendons are usually described one at a time and imaged as a continuous sheet. Seeing the footprint as a single curved insertion explains why tear size is reported in two dimensions and why the supraspinatus and infraspinatus are so often involved together.',
        'The coronal oblique and sagittal oblique planes are defined by the glenoid, not by the patient. Overlaying the plane on the model shows what each one is designed to cut and what it inevitably foreshortens.',
        'Anterior dislocation leaves paired lesions at opposite ends of the joint. Turning the humeral head to face the glenoid rim makes the Hill-Sachs and Bankart sites obviously two halves of one event.',
      ]}
    />
  )
}
