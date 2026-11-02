import { useState } from 'react'
import { ChoiceGroup } from './ChoiceGroup'
import { FAMILIES, LEVELS, VIEW } from './brainTerritoryShapes'
import type { Family, LevelId, Mode, Territory } from './brainTerritoryShapes'
import { familiesShown, territoriesShown } from './brainTerritoryViews'

/*
 * The vascular territories map: one schematic axial level at a time, coloured by arterial supply
 * or venous drainage. The legend buttons are the keyboard route and the selector; tapping the
 * drawing selects the same thing with the exact sub-territory named. Shapes and their sources are
 * in brainTerritoryShapes.ts.
 */

function paint(family: Family) {
  return FAMILIES[family].striped ? `url(#bt-stripe-${family})` : `var(${FAMILIES[family].token})`
}

function swatch(family: Family) {
  const colour = `var(${FAMILIES[family].token})`
  if (family === 'borderZone') return { background: `repeating-linear-gradient(45deg, ${colour} 0 2px, var(--color-figure-bg) 2px 5px)` }
  return FAMILIES[family].striped
    ? { background: `repeating-linear-gradient(45deg, ${colour} 0 4px, var(--color-figure-bg) 4px 6px)` }
    : { background: colour }
}

type Selection = { family: Family; territory?: Territory }

const MIRROR = `matrix(-1 0 0 1 ${VIEW.width} 0)`

export function BrainTerritoryMap() {
  const [levelId, setLevelId] = useState<LevelId>('basal-ganglia')
  const [mode, setMode] = useState<Mode>('arterial')
  const [zones, setZones] = useState(false)
  const [selected, setSelected] = useState<Selection | null>(null)

  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0]
  const shown = territoriesShown(level, mode, zones)
  const families = familiesShown(level, mode, zones)
  // A selection survives a change of level or mode only if it is still on the map.
  const active = selected && families.includes(selected.family)
    ? { family: selected.family, territory: selected.territory && shown.includes(selected.territory) ? selected.territory : undefined }
    : null

  const state = (t: Territory) => (active ? (t.family === active.family ? ' bt-on' : ' bt-dim') : '')
  const stripes = [...new Set(shown.map((t) => t.family))].filter((f) => FAMILIES[f].striped)

  // Both sides draw the same Territory object, so a tap on either selects the one in `shown`.
  const draw = (t: Territory, key: string, zone = false) => (
    <path
      key={key}
      d={t.d}
      className={`${zone ? 'bt-zone' : 'bt-t'}${state(t)}`}
      style={zone ? undefined : { fill: paint(t.family) }}
      onClick={() => setSelected({ family: t.family, territory: t })}
    />
  )

  return (
    <div className="bt-map">
      <div className="bt-controls">
        <ChoiceGroup label="Level" layout="stack" value={levelId} onChange={setLevelId}
          options={LEVELS.map((l) => ({ value: l.id, label: l.label }))} />
        <ChoiceGroup label="Show" layout="row" value={mode} onChange={setMode}
          options={[{ value: 'arterial', label: 'Arterial' }, { value: 'venous', label: 'Venous' }]} />
        {mode === 'arterial' && (
          <button type="button" className="choice-option bt-zones-toggle" aria-pressed={zones} onClick={() => setZones(!zones)}>
            Border zones {zones ? 'on' : 'off'}
          </button>
        )}
      </div>

      <svg className="bt-svg" viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} role="img" aria-labelledby="bt-title">
        <title id="bt-title">{`${level.label}: ${mode} territories, schematic axial level`}</title>
        <defs>
          {stripes.map((f) => (
            <pattern key={f} id={`bt-stripe-${f}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" style={{ fill: `var(${FAMILIES[f].token})` }} />
              <line x1="0" y1="0" x2="0" y2="6" className="bt-stripe" />
            </pattern>
          ))}
          <pattern id="bt-zone-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="5" className="bt-hatch" />
          </pattern>
        </defs>
        {level.parts.map((part, i) => (
          <g key={i}>
            {part.cistern && <path d={part.cistern} className="bt-csf" />}
            <g>{part[mode].map((t) => draw(t, t.id))}</g>
            <g transform={MIRROR}>{part[mode].map((t) => draw(t, `${t.id}-l`))}</g>
            {part.outline && <path d={part.outline} className="bt-outline" />}
            {part.outline && !part.whole && <path d={part.outline} className="bt-outline" transform={MIRROR} />}
          </g>
        ))}
        {level.ventricles.map((d) => (
          <g key={d}>
            <path d={d} className="bt-csf" />
            <path d={d} className="bt-csf" transform={MIRROR} />
          </g>
        ))}
        {mode === 'arterial' && zones && level.borderZones.map((z) => (
          <g key={z.id}>
            {draw(z, z.id, true)}
            <g transform={MIRROR}>{draw(z, `${z.id}-l`, true)}</g>
          </g>
        ))}
        <text x="12" y="24" className="bt-side">R</text>
        <text x={VIEW.width - 12} y="24" className="bt-side bt-side-end">L</text>
      </svg>

      <p className="bt-caption" aria-live="polite">
        {active ? (
          <>
            <strong>{active.territory?.name ?? FAMILIES[active.family].label}</strong>
            {active.territory && <> · {active.territory.supply}</>}{' '}
            <a href={`#${FAMILIES[active.family].section}`}>Read more</a>
          </>
        ) : 'Tap a territory or pick one below.'}
      </p>

      <ul className="bt-legend">
        {families.map((f) => (
          <li key={f}>
            <button type="button" className="bt-key" aria-pressed={active?.family === f}
              onClick={() => setSelected(active?.family === f ? null : { family: f })}>
              <span className="bt-swatch" style={swatch(f)} aria-hidden="true" />
              {FAMILIES[f].label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
