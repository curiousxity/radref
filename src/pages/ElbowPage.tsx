import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function ElbowPage() {
  return (
    <AnatomyReferencePage
      name="Elbow"
      intro="A right elbow with the collateral ligament complexes, the common flexor and extensor origins, biceps, brachialis and triceps, the ulnar, median and radial nerves, and both fat pads. It flexes from slight hyperextension to 140°, takes a coronal, sagittal or axial plane that can cut the model away, and plays ten injury mechanisms from the paediatric supracondylar fracture to posterolateral rotatory instability."
      sourceNote="Bone and muscle meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). Ligaments, nerves, vessels, fat pads and the olecranon bursa are drawn onto landmarks measured from those meshes."
      file="online/elbow.html"
      viewerTitle="Interactive 3D model of the elbow, collateral ligaments, tendons and nerves"
      hint="Drag to rotate, right-drag or shift-drag to pan, scroll or pinch to zoom, click any structure. Pathologies and injury mechanisms sit in the top menus; layers, planes, views and flexion are in the drawer."
      scrollsInFrame
      notes={[
        'Elbow dislocation tears the soft tissues in a set order around the Horii circle: the LUCL first, then the capsule, then the UCL. Playing the mechanism on the model shows why the lateral ligament, radial head and coronoid are read together, and why the medial side is the last to go.',
        'The fat pad sign and the anterior humeral line are both read on the lateral film, of a distal humerus angled about 30° forward on the shaft. Flexing the model to 90° and looking from the side shows each pad lying in its fossa, and why the line should cross the middle third of the capitellum.',
        'The ulnar nerve, the posterior band of the UCL and Osborne\'s ligament form one small tunnel behind the medial epicondyle. Turning to the medial side with the muscles see-through puts the floor, the roof and the nerve into their real relationship, which is what an axial MR slice through the cubital tunnel is cutting.',
      ]}
    />
  )
}
