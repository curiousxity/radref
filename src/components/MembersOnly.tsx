import { useLocation } from 'react-router-dom'

/** Where Cloudflare Access sends a reader to sign in; the page there returns them to `to`. */
function signInHref(to: string) {
  return `/members/signin/?to=${encodeURIComponent(to)}`
}

/**
 * Shown in place of a members page whose code could not be loaded: no Access session, or no
 * network and nothing cached. The sign-in link is a full navigation so that Access can step in.
 */
export function MembersOnly() {
  const location = useLocation()
  const offline = typeof navigator !== 'undefined' && navigator.onLine === false

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Members</p>
          <h2>{offline ? 'This page needs a connection' : 'Sign in to read this page'}</h2>
          <p>
            {offline
              ? "Studies, 3D anatomy and protocols are kept on the device only after you have opened them once while signed in. Reconnect and try again."
              : 'Studies, 3D anatomy and protocols are for members. The calculators and classifications stay open to everyone.'}
          </p>
          {!offline && (
            <div className="hero-actions">
              <a href={signInHref(location.pathname + location.search)} className="primary-button">Sign in</a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
