import type { Family, Level, Mode, Territory } from './brainTerritoryShapes'

export function territoriesShown(level: Level, mode: Mode, zones: boolean): Territory[] {
  const drawn = level.parts.flatMap((part) => part[mode])
  return mode === 'arterial' && zones ? [...drawn, ...level.borderZones] : drawn
}

export function familiesShown(level: Level, mode: Mode, zones: boolean): Family[] {
  return [...new Set(territoriesShown(level, mode, zones).map((t) => t.family))]
}
