import { AnatomyViewer } from '../components/AnatomyViewer'

export function OssicularChainPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Anatomy</p>
          <h2>Ossicular chain</h2>
          <p>
            Malleus, incus and stapes in the tympanic cavity, with the eardrum, the tensor tympani and stapedius, and
            the surrounding walls and landmarks. A slice is reconstructed through the same model, so the shape and its
            projection sit side by side.
          </p>
          <p className="source-note">
            Movement in the animation is exaggerated many thousandfold; real footplate travel at conversational loudness
            is a fraction of a micrometre.
          </p>
        </div>
      </section>

      <AnatomyViewer
        file="ossicular-chain.html"
        title="Interactive 3D model of the ossicular chain with a reconstructed slice"
        hint="Drag to rotate, scroll to zoom, double-click to reset. The page scrolls inside the frame, so on a phone it reads better full screen."
        emphasiseFullScreen
      />

      <section className="info-card">
        <h3>What the slice view is for</h3>
        <ul className="plain-list">
          <li>
            The chain is oblique to every standard plane, so no single axial or coronal slice contains all of it. Pairing
            the model with its own reconstruction shows exactly which parts a given plane cuts and which it misses.
          </li>
          <li>
            Agreement between CT and surgical findings is good for the malleus and for the incus body and short process,
            but noticeably worse for the long process and the stapes.
          </li>
          <li>
            An absent-looking incus long process is not proof of erosion, and a present-looking one does not rule it out.
          </li>
        </ul>
      </section>
    </div>
  )
}
