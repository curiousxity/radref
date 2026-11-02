import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, test } from 'vitest'
import { BrainTerritoryMap, TerritoryCaption } from './BrainTerritoryMap'
import { LEVELS } from './brainTerritoryShapes'
import { captionEntries, familiesShown, territoriesShown } from './brainTerritoryViews'

const level = (id: string) => LEVELS.find((l) => l.id === id)!

describe('brain territory map', () => {
  test('border zones show only in arterial mode with the switch on', () => {
    const bg = level('basal-ganglia')
    expect(familiesShown(bg, 'arterial', false)).not.toContain('borderZone')
    expect(familiesShown(bg, 'arterial', true)).toContain('borderZone')
    expect(familiesShown(bg, 'venous', true)).not.toContain('borderZone')
  })

  test('the legend lists each family at the level once, and only those at the level', () => {
    const families = familiesShown(level('pons'), 'arterial', false)
    expect(new Set(families).size).toBe(families.length)
    expect(families).toEqual(expect.arrayContaining(['basilar', 'aica', 'sca', 'pica', 'mca', 'pca']))
    expect(families).not.toContain('aca')
  })

  test('territoriesShown has every part of the level for the mode', () => {
    const mid = level('midbrain')
    expect(territoriesShown(mid, 'venous', false).length).toBe(mid.parts.flatMap((p) => p.venous).length)
  })

  test('it renders the basal ganglia level by default with a legend button per family', () => {
    const html = renderToStaticMarkup(<BrainTerritoryMap />)
    expect(html).toContain('Basal ganglia and thalamus')
    const families = familiesShown(level('basal-ganglia'), 'arterial', false)
    expect(html.match(/class="bt-key"/g)?.length).toBe(families.length)
    expect(html).toContain('Tap a territory')
  })

  test('a legend selection captions every territory of the family at the level, once each', () => {
    const pons = level('pons')
    const family = 'basilar'
    const entries = captionEntries(pons, 'arterial', false, { family })
    const expected = territoriesShown(pons, 'arterial', false).filter((t) => t.family === family)
    expect(entries.length).toBeGreaterThan(1)
    expect(entries.map((t) => t.id)).toEqual([...new Set(expected.map((t) => t.id))])
    const html = renderToStaticMarkup(<TerritoryCaption level={pons} mode="arterial" zones={false} selection={{ family }} />)
    for (const t of entries) {
      expect(html).toContain(t.name)
      expect(html).toContain(t.supply)
    }
    expect(html).toContain('Read more')
  })

  test('a tapped territory captions only itself', () => {
    const pons = level('pons')
    const [first, second] = captionEntries(pons, 'arterial', false, { family: 'basilar' })
    const html = renderToStaticMarkup(<TerritoryCaption level={pons} mode="arterial" zones={false} selection={{ family: 'basilar', territory: first }} />)
    expect(html).toContain(first.name)
    expect(html).not.toContain(second.name)
  })
})
