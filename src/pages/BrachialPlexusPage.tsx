import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function BrachialPlexusPage() {
  return (
    <AnatomyReferencePage
      name="Brachial plexus"
      intro="A right brachial plexus traced from the C5–T1 roots through trunks, divisions and cords to the terminal nerves, set among the scalenes, clavicle, first rib and subclavian vessels. Coronal oblique, sagittal oblique and axial planes can be laid over it, the axial one cutting a live T2-style slice, and it plays Parsonage–Turner, traction injury and thoracic outlet compression with their injury mechanisms."
      sourceNote="Bones, muscles and the subclavian artery and vein from BodyParts3D (Database Center for Life Science, CC BY-SA 2.1 JP). The nerves, cord, thecal sac, axillary vessels, cervical rib and all pathology are drawn onto those meshes from measured landmarks, and small branches such as the dorsal scapular and thoracodorsal nerves are left out."
      file="online/brachial-plexus.html"
      viewerTitle="Interactive 3D model of the brachial plexus from roots to terminal nerves"
      hint="Drag to rotate, right-drag or shift-drag to pan, scroll or pinch to zoom, click any structure to name it. Views, layers and imaging planes sit in the drawer."
      scrollsInFrame
      notes={[
        'The plexus is learned as a wiring diagram and imaged as a sheet of cords in fat. Following it from the foramina through the scalene gap, behind the clavicle and round the axillary artery puts each named segment where the coronal oblique actually finds it.',
        'Thoracic outlet syndrome is three tunnels, not one. Raising the arm shows the scalene triangle, the costoclavicular space and the retro-pectoralis minor space each squeezing a different mix of nerve and vessel.',
        'Whether a root is torn from the cord or beyond the ganglion decides surgery. Seeing C5 and C6 tied into their transverse process gutters while C8 and T1 run free explains why the upper roots tend to rupture and the lower ones avulse.',
      ]}
    />
  )
}
