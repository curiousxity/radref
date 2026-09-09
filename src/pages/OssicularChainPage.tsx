import { AnatomyReferencePage } from '../components/AnatomyReferencePage'

export function OssicularChainPage() {
  return (
    <AnatomyReferencePage
      name="Ossicular chain"
      intro="Malleus, incus and stapes in the tympanic cavity, with the eardrum, the tensor tympani and stapedius, and the surrounding walls and landmarks. A slice is reconstructed through the same model, so the shape and its projection sit side by side."
      sourceNote="Movement in the animation is exaggerated many thousandfold; real footplate travel at conversational loudness is a fraction of a micrometre."
      file="ossicular-chain.html"
      viewerTitle="Interactive 3D model of the ossicular chain with a reconstructed slice"
      hint="Drag to rotate, scroll to zoom, double-click to reset."
      scrollsInFrame
      notesHeading="What the slice view is for"
      notes={[
        'The chain is oblique to every standard plane, so no single axial or coronal slice contains all of it. Pairing the model with its own reconstruction shows exactly which parts a given plane cuts and which it misses.',
        'Agreement between CT and surgical findings is good for the malleus and for the incus body and short process, but noticeably worse for the long process and the stapes.',
        'An absent-looking incus long process is not proof of erosion, and a present-looking one does not rule it out.',
      ]}
    />
  )
}
