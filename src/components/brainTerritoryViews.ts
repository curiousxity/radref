import type { Family, Level, Mode, Territory } from './brainTerritoryShapes'

export function territoriesShown(level: Level, mode: Mode, zones: boolean): Territory[] {
  const drawn = level.parts.flatMap((part) => part[mode])
  return mode === 'arterial' && zones ? [...drawn, ...level.borderZones] : drawn
}

export function familiesShown(level: Level, mode: Mode, zones: boolean): Family[] {
  return [...new Set(territoriesShown(level, mode, zones).map((t) => t.family))]
}

/** What the caption names for a selection: the tapped territory alone, or every territory of the
 *  selected family on the map, once each (the mirrored side draws the same objects). */
export function captionEntries(level: Level, mode: Mode, zones: boolean, selection: { family: Family; territory?: Territory }): Territory[] {
  if (selection.territory) return [selection.territory]
  const seen = new Set<string>()
  return territoriesShown(level, mode, zones).filter((t) => {
    if (t.family !== selection.family || seen.has(t.id)) return false
    seen.add(t.id)
    return true
  })
}
