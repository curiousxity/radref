/**
 * Frames one of the standalone 3D viewers in `public/anatomy/`.
 *
 * The viewers are self-contained HTML documents with their own dark palette and
 * their own renderer, so they are embedded rather than ported. `navigateFallbackDenylist`
 * in `vite.config.ts` keeps the service worker from answering the frame's
 * navigation request with the app shell.
 */
import { useSyncExternalStore } from 'react'

function subscribeToOnline(onChange: () => void) {
  window.addEventListener('online', onChange)
  window.addEventListener('offline', onChange)
  return () => {
    window.removeEventListener('online', onChange)
    window.removeEventListener('offline', onChange)
  }
}

/** `navigator.onLine`, kept current. It can report online on a dead network, never the reverse. */
function useOnline() {
  return useSyncExternalStore(subscribeToOnline, () => navigator.onLine, () => true)
}

/** Stated once here rather than in every scrolling viewer's own hint. */
const SCROLLS_IN_FRAME_HINT = 'The page scrolls inside the frame, so on a phone it reads better full screen.'
const NEEDS_NETWORK_HINT = 'This model is not stored for offline use, so it needs an internet connection.'

export function AnatomyViewer({
  file,
  title,
  hint,
  emphasiseFullScreen = false,
}: {
  /** File name under `/anatomy/`. */
  file: string
  /** Accessible name for the frame. */
  title: string
  /** One line on how to drive the viewer. */
  hint: string
  /** Set for viewers that scroll internally, where the embed is the worse phone experience. */
  emphasiseFullScreen?: boolean
}) {
  const src = `/anatomy/${file}`
  // `anatomy/online/` is left out of the Workbox precache (vite.config.ts `globIgnores`).
  const needsNetwork = file.startsWith('online/')
  const online = useOnline()
  // Offline, the frame would show the browser's own error page, so say why instead.
  const unavailable = needsNetwork && !online

  return (
    <section className="info-card anatomy-card">
      <div className="anatomy-actions">
        <a
          className={emphasiseFullScreen ? 'primary-button' : 'secondary-button'}
          href={src}
          target="_blank"
          rel="noreferrer"
        >
          Open full screen
        </a>
        <p className="source-note">
          {emphasiseFullScreen ? `${hint} ${SCROLLS_IN_FRAME_HINT}` : hint}
          {needsNetwork && ` ${NEEDS_NETWORK_HINT}`}
        </p>
      </div>
      {unavailable ? (
        <div className="anatomy-offline" role="status">
          <p>You're offline. This model isn't stored on the device, so it will load here once you're back online.</p>
        </div>
      ) : (
        <div className="anatomy-frame">
          <iframe src={src} title={title} loading="lazy" />
        </div>
      )}
    </section>
  )
}
