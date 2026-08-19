import { useState, useSyncExternalStore } from 'react'
import { getInstallState, isIosDevice, promptInstall, subscribe } from '../lib/installPrompt'

const iosSteps = 'Tap the Share icon in the browser bar, then choose Add to Home Screen.'
const genericSteps = 'Open your browser menu, then choose Install app or Add to Home Screen.'

export function InstallButton() {
  const { canPrompt, isInstalled } = useSyncExternalStore(subscribe, getInstallState)
  const [showSteps, setShowSteps] = useState(false)

  if (isInstalled) {
    return (
      <div className="hero-stat">
        <span>Installed</span>
        <p>Works with no signal.</p>
      </div>
    )
  }

  async function handleClick() {
    if (canPrompt) {
      // Fall back to written steps if the deferred prompt expired between renders.
      if ((await promptInstall()) === 'unavailable') setShowSteps(true)
      return
    }
    setShowSteps((current) => !current)
  }

  return (
    <div className="hero-stat install-stat">
      <button
        type="button"
        className="primary-button install-button"
        onClick={handleClick}
        aria-expanded={canPrompt ? undefined : showSteps}
      >
        Add to Home Screen
      </button>
      <p>Works with no signal once it is on your home screen.</p>
      {showSteps ? <p className="install-steps">{isIosDevice() ? iosSteps : genericSteps}</p> : null}
    </div>
  )
}
