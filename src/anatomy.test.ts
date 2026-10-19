/// <reference types="node" />
// The app tsconfig only loads vite/client types, so this file pulls in Node's for node:fs.
import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import snapshot from './anatomy-colours.json'

// Guards the 16 standalone anatomy viewers in public/anatomy/ (see CLAUDE.md, Anatomy).
// anatomy-colours.json is a snapshot, taken before any viewer was restyled, of each file's
// colours in two parts:
// - `css`: every custom property in a <style> rule block whose value is a hex or
//   rgb()/rgba() colour, keyed `<selector>|<--name>`. The selector is the block's own,
//   whitespace collapsed, prefixed by any enclosing at-rules joined with ` > `
//   (e.g. `@media (max-width: 760px) > :root|--panel`). A repeat of the same key in a file
//   gets `#2`, `#3`... appended.
// - `script`: every `0xRRGGBB` and quoted '#rrggbb' / '#rgb' literal in the <script> blocks,
//   in document order (the scene clear colours, materials and highlight glows).

const FILES = [
  'otic-capsule.html',
  'ossicular-chain.html',
  'shoulder.html',
  'knee.html',
  'wrist.html',
  'ankle.html',
  'online/tmj.html',
  'online/skull-base.html',
  'online/suprahyoid-spaces.html',
  'online/larynx.html',
  'online/cervical-spine.html',
  'online/brachial-plexus.html',
  'online/lumbar-spine.html',
  'online/pelvis-si.html',
  'online/elbow.html',
  'online/foot.html',
] as const

type File = (typeof FILES)[number]

// Viewers already moved onto public/anatomy/shared/radref.css. The link, theme and
// no-remote-fonts tests run over these; the colour guards below run over all of FILES.
const MIGRATED: readonly File[] = [
  'otic-capsule.html',
  'ossicular-chain.html',
  'shoulder.html',
  'knee.html',
  'wrist.html',
  'ankle.html',
  'online/tmj.html',
  'online/skull-base.html',
  'online/suprahyoid-spaces.html',
  'online/larynx.html',
  'online/cervical-spine.html',
  'online/brachial-plexus.html',
  'online/lumbar-spine.html',
  'online/pelvis-si.html',
  'online/elbow.html',
  'online/foot.html',
]

// Chrome variables (panel, ink, line and the like) that a viewer deliberately points at the
// shared radref.css tokens. An entry is either a full `selector|--name` key from the
// snapshot, exempting that one declaration, or a bare `--name`, exempting the name in every
// selector. Only exempt keys may change value or disappear; every other snapshotted colour
// is a structure or scene colour and must keep its exact value. Script literals are never
// exempt.
const CHROME: Record<File, string[]> = {
  'otic-capsule.html': [
    '--bg',
    '--panel',
    '--line',
    '--line-soft',
    '--ink',
    '--ink-2',
    '--ink-3',
    '--cyan',
    '--cyan-deep',
  ],
  'ossicular-chain.html': [
    '--bg',
    '--panel',
    '--panel2',
    '--ink',
    '--ink2',
    '--ink3',
    '--rule',
    '--rule2',
    '--cut',
  ],
  'shoulder.html': ['--bg', '--panel', '--panel-2', '--line', '--ink', '--ink-soft'],
  'knee.html': ['--ink', '--slate', '--slate-2', '--line', '--paper', '--paper-dim', '--muted'],
  'wrist.html': ['--ink', '--ink-2', '--paper', '--line', '--link'],
  'ankle.html': ['--bg', '--paper', '--ink', '--ink-2', '--line', '--link', '--accent'],
  'online/tmj.html': [
    '--bg',
    '--bg2',
    '--panel',
    '--line',
    '--ink',
    '--ink2',
    '--ink3',
    '--accent',
    '--accent2',
  ],
  'online/skull-base.html': [
    '--bg',
    '--pane',
    '--pane2',
    '--line',
    '--ink',
    '--mute',
    '--amber',
    '--cyan',
  ],
  'online/suprahyoid-spaces.html': [
    '--bg',
    '--bg2',
    '--bg3',
    '--line',
    '--ink',
    '--ink2',
    '--ink3',
    '--accent',
  ],
  'online/larynx.html': [
    '--bg',
    '--bg2',
    '--panel',
    '--line',
    '--ink',
    '--ink2',
    '--ink3',
    '--accent',
  ],
  'online/cervical-spine.html': [
    '--bg',
    '--bg2',
    '--panel',
    '--line',
    '--ink',
    '--dim',
    '--dimmer',
    '--acc',
  ],
  // Full keys, not bare names: the body.light block redeclares the same names, and its values
  // stay pinned (the light-background button keeps them, though nothing reads them now).
  'online/brachial-plexus.html': [
    ':root|--bg',
    ':root|--panel',
    ':root|--line',
    ':root|--ink',
    ':root|--dim',
    ':root|--acc',
    ':root|--acc2',
  ],
  'online/lumbar-spine.html': [
    '--bg',
    '--panel',
    '--panel2',
    '--line',
    '--ink',
    '--dim',
    '--accent',
    '--accent2',
  ],
  'online/pelvis-si.html': [
    '--bg',
    '--bg2',
    '--panel',
    '--line',
    '--line2',
    '--ink',
    '--ink2',
    '--ink3',
    '--hit',
  ],
  'online/elbow.html': [
    '--ink',
    '--ink2',
    '--panel',
    '--line',
    '--line2',
    '--text',
    '--muted',
    '--teal',
    '--teal2',
  ],
  'online/foot.html': [
    '--ink',
    '--ink-2',
    '--line',
    '--line-2',
    '--paper',
    '--paper-dim',
    '--accent',
    '--accent-2',
  ],
}

const colours = snapshot as Record<File, { css: Record<string, string>; script: string[] }>

function read(file: File): string {
  return readFileSync(new URL(`../public/anatomy/${file}`, import.meta.url), 'utf8')
}

const COLOUR = /^(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))$/
const SCRIPT_COLOUR = /0x[0-9a-fA-F]{6}|(['"])#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\1/g

function squash(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/** Colour custom properties by rule block, keyed as in the snapshot (see the top of the file). */
function cssColours(html: string): Record<string, string> {
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1])
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '')
  const found: Record<string, string> = {}
  const stack: string[] = []
  let buf = ''
  for (const ch of css) {
    if (ch === '{') {
      stack.push(squash(buf))
      buf = ''
    } else if (ch === '}') {
      if (stack.length) {
        const selector = stack.join(' > ')
        for (const [, name, raw] of buf.matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) {
          const value = raw.trim()
          if (!COLOUR.test(value)) continue
          let key = `${selector}|${name}`
          for (let n = 2; key in found; n++) key = `${selector}|${name}#${n}`
          found[key] = value
        }
      }
      stack.pop()
      buf = ''
    } else {
      buf += ch
    }
  }
  return found
}

/** Colour literals in the <script> blocks, in document order. */
function scriptColours(html: string): string[] {
  const js = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n')
  return [...js.matchAll(SCRIPT_COLOUR)].map((m) => m[0])
}

function exempt(file: File, key: string): boolean {
  const name = key.slice(key.lastIndexOf('|') + 1).replace(/#\d+$/, '')
  return CHROME[file].includes(key) || CHROME[file].includes(name)
}

describe('anatomy viewers', () => {
  test('every viewer is on the shared stylesheet', () => {
    expect([...MIGRATED].sort()).toEqual([...FILES].sort())
    // FILES itself must list every viewer on disk (public/anatomy/ and its online/ folder;
    // shared/ and vendor/ hold no viewers).
    const onDisk = [
      ...readdirSync(new URL('../public/anatomy/', import.meta.url)),
      ...readdirSync(new URL('../public/anatomy/online/', import.meta.url)).map((n) => `online/${n}`),
    ].filter((n) => n.endsWith('.html'))
    expect(onDisk.sort()).toEqual([...FILES].sort())
  })

  test('the snapshot and the allowlist cover all 16 files', () => {
    expect(Object.keys(colours).sort()).toEqual([...FILES].sort())
    expect(Object.keys(CHROME).sort()).toEqual([...FILES].sort())
  })

  test('links the shared stylesheet', () => {
    for (const file of MIGRATED) {
      const href = file.startsWith('online/') ? '../shared/radref.css' : 'shared/radref.css'
      expect(read(file), file).toContain(`href="${href}"`)
    }
  })

  test('follows the site theme', () => {
    for (const file of MIGRATED) {
      const html = read(file)
      expect(html, file).toContain('radref-theme')
      expect(html, file).toContain("addEventListener('storage'")
    }
  })

  test('no remote fonts or CDNs', () => {
    for (const file of MIGRATED) {
      const html = read(file)
      const links = html.match(/<link\b[^>]*>/g) ?? []
      const scripts = html.match(/<script\b[^>]*\bsrc=[^>]*>/g) ?? []
      for (const tag of [...links, ...scripts]) expect(tag, file).not.toMatch(/https?:\/\//)
      expect(html, file).not.toContain('fonts.googleapis')
      expect(html, file).not.toContain('Source Serif')
    }
  })

  test('structure colours unchanged', () => {
    for (const file of FILES) {
      const current = cssColours(read(file))
      const expected: Record<string, string> = {}
      const actual: Record<string, string | undefined> = {}
      for (const [key, value] of Object.entries(colours[file].css)) {
        if (exempt(file, key)) continue
        expected[key] = value
        actual[key] = current[key]
      }
      expect(actual, file).toEqual(expected)
    }
  })

  // Variables split out of a shared UI/scene variable during the restyle: the UI half moved to
  // --rr-accent, and the scene half kept the old value under a new name, which the snapshot
  // (taken before the split) does not know. Pin them here.
  test('split scene colours keep their old values', () => {
    expect(cssColours(read('otic-capsule.html'))[':root|--cyan-scene']).toBe('#45C8D8')
    expect(cssColours(read('ankle.html'))[':root|--accent-scene']).toBe('#E0A100')
    expect(cssColours(read('online/tmj.html'))[':root|--accent-scene']).toBe('#4fb8c9')
    const skullBase = cssColours(read('online/skull-base.html'))
    expect(skullBase[':root|--amber-scene']).toBe('#e8a33d')
    expect(skullBase[':root|--cyan-scene']).toBe('#5fc6d0')
    expect(cssColours(read('online/larynx.html'))[':root|--accent-scene']).toBe('#e7c46a')
    expect(cssColours(read('online/cervical-spine.html'))[':root|--acc-scene']).toBe('#4fb3d9')
    const brachialPlexus = cssColours(read('online/brachial-plexus.html'))
    expect(brachialPlexus[':root|--acc-scene']).toBe('#f0b83a')
    expect(brachialPlexus[':root|--acc2-scene']).toBe('#5fc3d6')
    expect(cssColours(read('online/lumbar-spine.html'))[':root|--accent-scene']).toBe('#4aa3df')
    expect(cssColours(read('online/elbow.html'))[':root|--teal-scene']).toBe('#4FB3A9')
    expect(cssColours(read('online/foot.html'))[':root|--accent-2-scene']).toBe('#7fb6d9')
  })

  test('scene colours in scripts unchanged', () => {
    for (const file of FILES) {
      expect(scriptColours(read(file)), file).toEqual(colours[file].script)
    }
  })
})
