import type { ReactNode } from 'react'
import { EAR } from './innerEarShapes'

/*
 * Conceptual cutaway of the inner ear: cochlea, vestibule and oval window, the three semicircular
 * canals, internal auditory canal and vestibular aqueduct. Not a CT plane; shapes, scale and
 * relationships are simplified. Drawn for the author with another tool (2026-10-28) and adapted
 * here: colours are theme tokens (--color-ear-* in src/styles.css), text uses the site's system
 * font, and the heading and footnote moved into the figure caption.
 *
 * EarScene is the shared layout: the hearing loss page draws every finding on it, so a finding's
 * position reads the same from card to card. `under` is drawn on the bone, beneath the labyrinth;
 * `children` on top of everything.
 */

type Part = 'iac' | 'aqueduct'

type SceneProps = {
  id: string
  title: string
  desc?: string
  /** The finding figures crop to the ear; the overview keeps room for its labels. */
  viewBox?: string
  /** Leave out a normal structure that the finding redraws. */
  hide?: Part[]
  under?: ReactNode
  children?: ReactNode
}

export function EarScene({ id, title, desc, viewBox = '100 110 980 560', hide = [], under, children }: SceneProps) {
  return (
    <svg className="ear-anatomy" viewBox={viewBox} role="img" aria-labelledby={desc ? `${id}-title ${id}-desc` : `${id}-title`}>
      <title id={`${id}-title`}>{title}</title>
      {desc && <desc id={`${id}-desc`}>{desc}</desc>}
      <path className="ear-bone" d={EAR.bone} />
      <path className="ear-bone-line" d="M 259 224 C 235 278, 241 337, 264 382 M 271 424 C 251 474, 266 535, 299 570" />
      <path className="ear-middle" d={EAR.middleEar} />
      {under}
      {!hide.includes('iac') && <path className="ear-iac" d={EAR.iac} />}
      {[EAR.superior, EAR.posterior, EAR.lateral].map((d) => (
        <g key={d}>
          <path className="ear-canal-edge" d={d} />
          <path className="ear-canal-lumen" d={d} />
        </g>
      ))}
      {!hide.includes('aqueduct') && (
        <>
          <path className="ear-duct-edge" d={EAR.aqueduct} />
          <path className="ear-duct-lumen" d={EAR.aqueduct} />
        </>
      )}
      <path className="ear-labyrinth" strokeWidth={2.5} d="M 525 416 C 485 430, 461 452, 452 482 L 497 505 C 506 474, 530 451, 557 443 Z" />
      <path className="ear-labyrinth" d={EAR.cochlea} />
      <path className="ear-spiral-edge" d={EAR.spiral} />
      <path className="ear-spiral-lumen" d={EAR.spiral} />
      <path className="ear-labyrinth" d={EAR.vestibule} />
      <path className="ear-window" d={EAR.ovalWindow} />
      {children}
    </svg>
  )
}

/** A leader from (x1, y1) to (x2, y2) and a short label at (x2, y2), sized to read at card width. */
export function EarTag({ x1, y1, x2, y2, anchor = 'start', children }: { x1: number; y1: number; x2: number; y2: number; anchor?: 'start' | 'end' | 'middle'; children: string }) {
  const dx = anchor === 'start' ? 8 : anchor === 'end' ? -8 : 0
  return (
    <>
      <path className="ear-leader" d={`M ${x1} ${y1} L ${x2} ${y2}`} />
      <circle className="ear-anchor" cx={x1} cy={y1} r={4} />
      <text x={x2 + dx} y={y2 + 12} textAnchor={anchor} className="ear-tag">{children}</text>
    </>
  )
}

const LEADERS = [
  'M 185 268 L 185 323',
  'M 170 539 L 248 539 L 338 553',
  'M 161 608 L 283 608 L 410 435 L 516 410',
  'M 326 185 L 399 185 L 468 209',
  'M 827 202 L 759 202 L 711 270',
  'M 170 351 L 255 351 L 345 377',
  'M 798 498 L 687 498 L 598 430',
  'M 866 307 L 866 363',
  'M 870 590 L 816 590 L 750 549',
]
const ANCHORS = [[185, 323], [338, 553], [516, 410], [468, 209], [711, 270], [345, 377], [598, 430], [866, 363], [750, 549]]

/** The labelled overview at the top of the hearing loss page. */
export function InnerEarAnatomy() {
  return (
    <EarScene
      id="ear-anatomy"
      viewBox="36 120 1050 520"
      title="Inner ear anatomy, conceptual cutaway"
      desc="Stylised inner ear showing the cochlea, vestibule, oval window, the superior, posterior and lateral semicircular canals, the internal auditory canal and the vestibular aqueduct. Not a literal CT plane; relationships are simplified."
    >
      {LEADERS.map((d) => <path key={d} className="ear-leader" d={d} />)}
      {ANCHORS.map(([cx, cy]) => <circle key={`${cx}-${cy}`} className="ear-anchor" cx={cx} cy={cy} r={3} />)}
      <g className="ear-label">
        <text x="121" y="247">Middle ear</text>
        <text x="64" y="545">Cochlea</text>
        <text x="64" y="614">Oval window</text>
        <text x="162" y="155">Superior</text>
        <text x="162" y="181">semicircular canal</text>
        <text x="838" y="189">Posterior</text>
        <text x="838" y="215">semicircular canal</text>
        <text x="49" y="313">Lateral</text>
        <text x="49" y="339">semicircular canal</text>
        <text x="810" y="505">Vestibule</text>
        <text x="866" y="272" textAnchor="middle">Internal auditory</text>
        <text x="866" y="298" textAnchor="middle">canal (IAC)</text>
        <text x="879" y="585">Vestibular</text>
        <text x="879" y="611">aqueduct</text>
      </g>
    </EarScene>
  )
}
