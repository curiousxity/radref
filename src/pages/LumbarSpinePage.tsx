import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function LumbarSpinePage() {
  return (
    <AnatomyReferencePage
      name="Lumbar spine"
      intro="L1 to S1 with the discs, thecal sac, rootlets and exiting nerve roots, ligamentum flavum, facet joints and epidural fat, beside a synthetic axial T2 of the chosen level. Each pathology can be graded on the model — disc herniation (Fardon), central canal stenosis (Schizas), foraminal stenosis (Lee), spondylolisthesis (Meyerding) and Modic endplate change — and three injury mechanisms can be played through."
      sourceNote="Bone and disc meshes from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP), decimated and re-oriented. Soft tissue is generated from landmarks measured on those meshes."
      file="online/lumbar-spine.html"
      viewerTitle="Interactive 3D model of the lumbar spine, canal and foramina"
      hint="Drag to rotate, scroll or pinch to zoom. Pathologies and mechanisms are in the header menus; layers, imaging planes and camera presets sit under Display options."
      scrollsInFrame
      notes={[
        'A paracentral or subarticular herniation meets the traversing root, a foraminal one the exiting root. Following both roots past the same disc makes it obvious why naming the zone decides which level the surgeon operates on.',
        'The canal is read on the axials and the foramen on parasagittal slices through it. Laying each plane over the model shows why a wide canal says nothing about a tight foramen, and how loss of disc height narrows the foramen with no disc material in it.',
        'An isthmic slip widens the canal from front to back while it narrows the foramen. Playing the pars defect through to anterolisthesis shows where the symptoms actually come from and why the axials alone can falsely reassure.',
      ]}
    />
  )
}
