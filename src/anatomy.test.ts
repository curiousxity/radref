/// <reference types="node" />
// The app tsconfig only loads vite/client types, so this file pulls in Node's for node:fs.
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import snapshot from './anatomy-colours.json'

// Guards the 16 standalone anatomy viewers in public/anatomy/ (see CLAUDE.md, Anatomy).
// anatomy-colours.json is a snapshot, taken before any viewer was restyled, of every custom
// property in each file whose value is a hex or rgb()/rgba() colour. Where a file declares
// the same property twice (brachial plexus's `body.light` overrides), only the first,
// `:root`, value was recorded.

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

// Chrome variables (panel, ink, line and the like) that a viewer deliberately points at the
// shared radref.css tokens. Only names listed here may change value or disappear; every
// other snapshotted colour is a structure or scene colour and must keep its value.
const CHROME: Record<File, string[]> = {
  'otic-capsule.html': [],
  'ossicular-chain.html': [],
  'shoulder.html': [],
  'knee.html': [],
  'wrist.html': [],
  'ankle.html': [],
  'online/tmj.html': [],
  'online/skull-base.html': [],
  'online/suprahyoid-spaces.html': [],
  'online/larynx.html': [],
  'online/cervical-spine.html': [],
  'online/brachial-plexus.html': [],
  'online/lumbar-spine.html': [],
  'online/pelvis-si.html': [],
  'online/elbow.html': [],
  'online/foot.html': [],
}

const colours = snapshot as Record<File, Record<string, string>>

function read(file: File): string {
  return readFileSync(new URL(`../public/anatomy/${file}`, import.meta.url), 'utf8')
}

/** Every value each custom property is given in the document's <style> blocks. */
function declarations(html: string): Map<string, string[]> {
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n')
  const found = new Map<string, string[]>()
  for (const [, name, value] of css.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) {
    found.set(name, [...(found.get(name) ?? []), normalise(value)])
  }
  return found
}

/** Case and spacing do not change a colour: `#1E2A38` = `#1e2a38`, `rgba(0, 0, 0, .1)` = `rgba(0,0,0,.1)`. */
function normalise(value: string): string {
  return value.replace(/\s+/g, '').toLowerCase()
}

describe('anatomy viewers', () => {
  test('the snapshot and the allowlist cover all 16 files', () => {
    expect(Object.keys(colours).sort()).toEqual([...FILES].sort())
    expect(Object.keys(CHROME).sort()).toEqual([...FILES].sort())
  })

  // for (const file of FILES) {
  //   const href = file.startsWith('online/') ? '../shared/radref.css' : 'shared/radref.css'
  //   expect(read(file), file).toContain(`href="${href}"`)
  // }
  test.todo('links the shared stylesheet')

  // for (const file of FILES) {
  //   const html = read(file)
  //   expect(html, file).toContain('radref-theme')
  //   expect(html, file).toContain("addEventListener('storage'")
  // }
  test.todo('follows the site theme')

  // for (const file of FILES) {
  //   const html = read(file)
  //   const links = html.match(/<link\b[^>]*>/g) ?? []
  //   const scripts = html.match(/<script\b[^>]*\bsrc=[^>]*>/g) ?? []
  //   for (const tag of [...links, ...scripts]) expect(tag, file).not.toMatch(/https?:\/\//)
  //   expect(html, file).not.toContain('fonts.googleapis')
  //   expect(html, file).not.toContain('Source Serif')
  // }
  test.todo('no remote fonts or CDNs')

  test('structure colours unchanged', () => {
    for (const file of FILES) {
      const current = declarations(read(file))
      for (const [name, value] of Object.entries(colours[file])) {
        if (CHROME[file].includes(name)) continue
        expect(current.get(name) ?? [], `${file} ${name}`).toContain(normalise(value))
      }
    }
  })
})
