import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { calculators, matchesQuery, movedPaths, regionForSlug, regionGroups, regionPath, regionSlug, regions, relatedTo } from './calculators'

describe('registry', () => {
  test('tags are short', () => {
    for (const item of calculators) {
      if (item.tag === undefined) continue
      expect(item.tag.length, item.path).toBeGreaterThan(0)
      expect(item.tag.length, item.path).toBeLessThanOrEqual(12)
    }
  })

  test('tags pin the tag rule: only a version the page states', () => {
    const byPath = (path: string) => {
      const item = calculators.find((i) => i.path === path)
      expect(item, path).toBeDefined()
      return item
    }
    expect(byPath('/lungrads')?.tag).toBe('v2022')
    // The TI-RADS page's title row states "ACR 2017", so the home row may carry it.
    expect(byPath('/tirads')?.tag).toBe('ACR 2017')
  })

  // The author's decision (2026-10-28): body region is the main way in, and each region page lists
  // everything for that area under a heading per kind. The wrist was the worked example.
  test('the wrist region holds the study, the four classifications and the 3D wrist', () => {
    expect(regionGroups('Wrist and hand').map(({ kind, items }) => [kind, items.map((item) => item.path)])).toEqual([
      ['study', ['/studies/wrist-mri']],
      ['classification', ['/mayfield', '/herbert', '/palmer', '/lichtman']],
      ['anatomy', ['/wrist']],
    ])
  })

  test('each fracture classification sits in its joint\'s region', () => {
    const regionOf = (path: string) => calculators.find((item) => item.path === path)?.region
    expect(regionOf('/ao-spine')).toBe('Spine')
    expect(regionOf('/neer')).toBe('Shoulder')
    expect(regionOf('/mason')).toBe('Elbow')
    expect(regionOf('/young-burgess')).toBe('Pelvis')
    expect(regionOf('/letournel')).toBe('Hip')
    expect(regionOf('/schatzker')).toBe('Knee')
    for (const path of ['/hawkins', '/sanders', '/myerson', '/fifth-metatarsal']) expect(regionOf(path), path).toBe('Ankle and foot')
  })

  test('every region lists something, and its address leads back to it', () => {
    for (const region of regions) {
      expect(regionGroups(region).length, region).toBeGreaterThan(0)
      expect(regionForSlug(regionSlug(region))).toBe(region)
      expect(regionPath(region)).toMatch(/^\/regions\/[a-z-]+$/)
    }
    expect(regionForSlug('nowhere')).toBeUndefined()
  })

  test('a page shared with a second region is listed in both', () => {
    const paths = (region: (typeof regions)[number]) => regionGroups(region).flatMap(({ items }) => items.map((item) => item.path))
    expect(paths('Pelvis')).toContain('/studies/pelvis-ct')
    expect(paths('Hip')).toEqual(expect.arrayContaining(['/studies/pelvis-ct', '/letournel', '/pelvis-si']))
    for (const item of calculators) expect(item.alsoIn ?? [], item.path).not.toContain(item.region)
  })

  test('search matches the region and the kind of page', () => {
    const find = (query: string) => calculators.filter((item) => matchesQuery(item, query)).map((item) => item.path)
    expect(find('wrist classification')).toEqual(['/mayfield', '/herbert', '/palmer', '/lichtman'])
    expect(find('studies')).toContain('/studies/knee-mri')
  })

  test('the ankle MRI study links to the 3D ankle, both ways', () => {
    // The study declares related: ['/ankle']; relatedTo makes it show on the ankle page too.
    expect(relatedTo('/ankle').map((item) => item.path)).toContain('/studies/ankle-mri')
    expect(relatedTo('/studies/ankle-mri').map((item) => item.path)).toContain('/ankle')
  })

  test('the knee MRI study and the Schatzker calculator link to the 3D knee and each other', () => {
    const knee = relatedTo('/knee').map((item) => item.path)
    expect(knee).toContain('/studies/knee-mri')
    expect(knee).toContain('/schatzker')
    expect(relatedTo('/schatzker').map((item) => item.path)).toContain('/studies/knee-mri')
  })

  test('the shoulder MRI study and the Neer calculator link to the 3D shoulder and each other', () => {
    const shoulder = relatedTo('/shoulder').map((item) => item.path)
    expect(shoulder).toContain('/studies/shoulder-mri')
    expect(shoulder).toContain('/neer')
    expect(relatedTo('/neer').map((item) => item.path)).toContain('/studies/shoulder-mri')
  })

  test('the wrist MRI study and the four wrist calculators link to the 3D wrist', () => {
    const wrist = relatedTo('/wrist').map((item) => item.path)
    for (const path of ['/studies/wrist-mri', '/mayfield', '/herbert', '/palmer', '/lichtman']) expect(wrist).toContain(path)
    expect(relatedTo('/mayfield').map((item) => item.path)).toContain('/studies/wrist-mri')
  })

  test('the foot MRI study links to the 3D foot and the foot calculators', () => {
    expect(relatedTo('/foot').map((item) => item.path)).toContain('/studies/foot-mri')
    for (const path of ['/hawkins', '/sanders', '/myerson', '/fifth-metatarsal']) {
      expect(relatedTo(path).map((item) => item.path), path).toContain('/studies/foot-mri')
    }
    expect(relatedTo('/myerson').map((item) => item.path)).toContain('/foot')
    expect(relatedTo('/ankle').map((item) => item.path)).toEqual(expect.arrayContaining(['/hawkins', '/sanders']))
  })

  test('the spine trauma CT study links to AO Spine and the 3D spines', () => {
    for (const path of ['/ao-spine', '/cervical-spine', '/lumbar-spine']) {
      expect(relatedTo(path).map((item) => item.path), path).toContain('/studies/spine-trauma-ct')
    }
  })

  test('the pelvis CT study and the two pelvic calculators link to the 3D pelvis and each other', () => {
    const pelvis = relatedTo('/pelvis-si').map((item) => item.path)
    for (const path of ['/studies/pelvis-ct', '/young-burgess', '/letournel']) expect(pelvis).toContain(path)
    for (const path of ['/young-burgess', '/letournel']) {
      expect(relatedTo(path).map((item) => item.path), path).toContain('/studies/pelvis-ct')
    }
  })

  test('the suprahyoid neck study links to the 3D suprahyoid spaces, both ways', () => {
    expect(relatedTo('/suprahyoid-spaces').map((item) => item.path)).toContain('/studies/suprahyoid-neck')
    expect(relatedTo('/studies/suprahyoid-neck').map((item) => item.path)).toContain('/suprahyoid-spaces')
  })

  test('the larynx study links to the 3D larynx, both ways', () => {
    expect(relatedTo('/larynx').map((item) => item.path)).toContain('/studies/larynx')
    expect(relatedTo('/studies/larynx').map((item) => item.path)).toContain('/larynx')
  })

  test('the skull base study links to the 3D skull base, both ways', () => {
    expect(relatedTo('/skull-base').map((item) => item.path)).toContain('/studies/skull-base')
    expect(relatedTo('/studies/skull-base').map((item) => item.path)).toContain('/skull-base')
  })

  test('the brachial plexus study links to the 3D brachial plexus, both ways, and is listed under Shoulder too', () => {
    expect(relatedTo('/brachial-plexus').map((item) => item.path)).toContain('/studies/brachial-plexus')
    expect(relatedTo('/studies/brachial-plexus').map((item) => item.path)).toContain('/brachial-plexus')
    for (const region of ['Spine', 'Shoulder'] as const) {
      expect(regionGroups(region).flatMap(({ items }) => items.map((item) => item.path)), region).toContain('/studies/brachial-plexus')
    }
  })

  test('the elbow studies and the Mason calculator link to the 3D elbow', () => {
    const elbow = relatedTo('/elbow').map((item) => item.path)
    expect(elbow).toContain('/studies/elbow-mri')
    expect(elbow).toContain('/studies/pediatric-elbow')
    expect(elbow).toContain('/mason')
    expect(relatedTo('/mason').map((item) => item.path)).toContain('/studies/elbow-mri')
  })
  // The calvarial lesions and hearing loss pages are teaching pages, not calculators: they are
  // studies, and their old addresses still lead to them.
  test('reference pages are studies and their old paths redirect', () => {
    for (const path of ['/studies/calvarium', '/studies/hearing-loss-ct']) {
      expect(calculators.find((item) => item.path === path)?.kind, path).toBe('study')
    }
    expect(movedPaths['/calvarium']).toBe('/studies/calvarium')
    expect(movedPaths['/hearing-loss-ct']).toBe('/studies/hearing-loss-ct')
    for (const to of Object.values(movedPaths)) expect(calculators.some((item) => item.path === to), to).toBe(true)
  })

  test('companion calculators share a region', () => {
    const regionOf = (path: string) => calculators.find((item) => item.path === path)?.region
    expect(regionOf('/adrenal-chemical-shift')).toBe(regionOf('/adrenal-washout'))
  })
})

describe('members pages', () => {
  // vite.config.ts builds every membersPage import into /members/assets/, which Cloudflare Access
  // guards. The author's decision (2026-10-28): calculators and classifications stay public.
  const source = readFileSync(new URL('./calculators.ts', import.meta.url), 'utf8')

  test('studies, 3D anatomy and protocols load as members pages; the rest stay public', () => {
    for (const item of calculators) {
      const line = source.split('\n').find((l) => l.includes(`path: '${item.path}'`))
      expect(line, item.path).toBeDefined()
      const locked = ['study', 'anatomy', 'protocol'].includes(item.kind)
      expect(line?.includes('component: membersPage('), item.path).toBe(locked)
      expect(line?.includes('component: lazyPage('), item.path).toBe(!locked)
    }
  })

  test('the sign-in page only returns to a path on this site', () => {
    const html = readFileSync(new URL('../../public/members/signin/index.html', import.meta.url), 'utf8')
    const pattern = html.match(/if \(!(\/.+\/)\.test\(to\)\)/)?.[1]
    expect(pattern).toBeDefined()
    const safe = new RegExp(pattern!.slice(1, -1))
    for (const ok of ['/', '/studies/knee-mri', '/studies/knee-mri?tab=report']) expect(safe.test(ok), ok).toBe(true)
    for (const bad of ['//evil.example', '/\\evil.example', 'https://evil.example', 'javascript:alert(1)', '']) expect(safe.test(bad), bad).toBe(false)
  })
})
