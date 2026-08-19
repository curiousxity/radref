/**
 * Home-screen install state.
 *
 * The `beforeinstallprompt` event fires as soon as the browser decides the app
 * is installable, which is usually before React has mounted. Listening from
 * inside a component would miss it, so this module starts listening at import
 * time (it is imported by `main.tsx`) and hands the captured event to whoever
 * asks for it later.
 */

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export type InstallState = {
  /** A native install prompt is available right now. */
  canPrompt: boolean
  /** The app is already running from the home screen. */
  isInstalled: boolean
}

const standaloneQuery = window.matchMedia('(display-mode: standalone)')

function isStandalone() {
  // iOS Safari reports installed apps through a non-standard navigator flag.
  const iosStandalone = (navigator as Navigator & { standalone?: boolean }).standalone === true
  return standaloneQuery.matches || iosStandalone
}

let deferredPrompt: BeforeInstallPromptEvent | null = null
let snapshot: InstallState = { canPrompt: false, isInstalled: isStandalone() }
const listeners = new Set<() => void>()

function setState(next: Partial<InstallState>) {
  snapshot = { ...snapshot, ...next }
  listeners.forEach((listener) => listener())
}

window.addEventListener('beforeinstallprompt', ((event: Event) => {
  // Suppress the browser's own mini-infobar so the hero button owns the flow.
  event.preventDefault()
  deferredPrompt = event as BeforeInstallPromptEvent
  setState({ canPrompt: true })
}) as EventListener)

window.addEventListener('appinstalled', () => {
  deferredPrompt = null
  setState({ canPrompt: false, isInstalled: true })
})

standaloneQuery.addEventListener('change', (event) => {
  setState({ isInstalled: event.matches })
})

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getInstallState() {
  return snapshot
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferredPrompt) return 'unavailable'

  // A deferred prompt can only be used once, so drop it before showing it.
  const event = deferredPrompt
  deferredPrompt = null
  setState({ canPrompt: false })

  await event.prompt()
  const { outcome } = await event.userChoice
  return outcome
}

/** iOS never fires `beforeinstallprompt`, so those users need the manual steps. */
export function isIosDevice() {
  const isIphone = /iPad|iPhone|iPod/.test(navigator.userAgent)
  // iPadOS presents itself as a desktop Mac, distinguishable only by touch support.
  const isIpad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  return isIphone || isIpad
}
