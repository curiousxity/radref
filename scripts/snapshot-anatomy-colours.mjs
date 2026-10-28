// Adds a NEW anatomy viewer to src/anatomy-colours.json, the colour snapshot that
// src/anatomy.test.ts checks every viewer against.
//
//   npm run snapshot:anatomy -- online/new-viewer.html [more.html ...]
//
// Paths are relative to public/members/anatomy/. Run it once, when the viewer is first added and
// before any restyle, so the snapshot records its original structure and scene colours.
// It refuses to touch a file that already has an entry: the existing entries are the
// pre-restyle baseline, and regenerating them from the restyled files would bake the new
// chrome values in and stop the test guarding anything. Then add the file to FILES and
// CHROME in src/anatomy.test.ts.
//
// The parsing must match cssColours() and scriptColours() in src/anatomy.test.ts.
import { readFileSync, writeFileSync } from 'node:fs'

const SNAPSHOT = new URL('../src/anatomy-colours.json', import.meta.url)
const COLOUR = /^(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))$/
const SCRIPT_COLOUR = /0x[0-9a-fA-F]{6}|(['"])#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\1/g

function squash(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function cssColours(html) {
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1])
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '')
  const found = {}
  const stack = []
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

function scriptColours(html) {
  const js = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n')
  return [...js.matchAll(SCRIPT_COLOUR)].map((m) => m[0])
}

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error('Usage: npm run snapshot:anatomy -- <viewer.html relative to public/members/anatomy/> ...')
  process.exit(1)
}

const snapshot = JSON.parse(readFileSync(SNAPSHOT, 'utf8'))
for (const file of files) {
  if (file in snapshot) {
    console.error(`${file} is already in the snapshot; its entry is the pre-restyle baseline and is not regenerated.`)
    process.exit(1)
  }
}
for (const file of files) {
  const html = readFileSync(new URL(`../public/members/anatomy/${file}`, import.meta.url), 'utf8')
  snapshot[file] = { css: cssColours(html), script: scriptColours(html) }
  console.log(`${file}: ${Object.keys(snapshot[file].css).length} CSS colours, ${snapshot[file].script.length} script colours`)
}
writeFileSync(SNAPSHOT, JSON.stringify(snapshot, null, 2) + '\n')
