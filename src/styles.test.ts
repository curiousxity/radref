/// <reference types="node" />
// The app tsconfig only loads vite/client types, so this file pulls in Node's for node:fs.
// (A `?raw` import does not work here: vitest empties CSS imports.)
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { THEME_COLORS } from './lib/theme'

const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8')

// The light palette is the `:root { … }` block, the dark one the `[data-theme="dark"] { … }`
// block. A media query may redeclare a non-colour token on `:root` (the compact header height).
const ROOT_BLOCK = /:root\s*\{[^}]*\}/g
const DARK_BLOCK = /\[data-theme="dark"\]\s*\{[^}]*\}/g

// CSS named colours (CSS Color 4). `transparent` and `currentColor` are allowed, so absent.
const NAMED_COLOURS = new Set(
  `aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue
  blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk
  crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki
  darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen
  darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue
  dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite
  gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki
  lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan
  lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen
  lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen
  magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen
  mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream
  mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid
  palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum
  powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown
  seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen
  steelblue tan teal thistle tomato turquoise violet wheat white whitesmoke yellow
  yellowgreen`.split(/\s+/),
)

function blocks(pattern: RegExp): string {
  return (css.match(pattern) ?? []).join('\n')
}

function colourTokens(block: string): Map<string, string> {
  const tokens = new Map<string, string>()
  for (const [, name, value] of block.matchAll(/(--color-[\w-]+)\s*:\s*([^;]+);/g)) {
    tokens.set(name, value.trim())
  }
  return tokens
}

describe('site stylesheet', () => {
  test('colour literals only appear in the token blocks', () => {
    const rest = css.replace(ROOT_BLOCK, '').replace(DARK_BLOCK, '')
    expect(rest.match(/#[0-9a-f]{3,8}\b/gi)).toBeNull()
    expect(rest.match(/rgba?\(/gi)).toBeNull()
  })

  test('no other colour notation or named colour outside the token blocks', () => {
    const rest = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(ROOT_BLOCK, '').replace(DARK_BLOCK, '')
    expect(rest.match(/(?<![\w-])(hsla?|hwb|lab|lch|oklab|oklch|color-mix|color)\(/gi)).toBeNull()

    const found: string[] = []
    for (const [, property, value] of rest.matchAll(/([\w-]+)\s*:\s*([^;{}]+)[;}]/g)) {
      const words = value
        .replace(/var\([^)]*\)/g, '')
        .replace(/'[^']*'|"[^"]*"/g, '')
        .match(/(?<![\w-])[a-z]+(?![\w-])/gi) ?? []
      for (const word of words) {
        const name = word.toLowerCase()
        if (!NAMED_COLOURS.has(name)) continue
        // A mask only reads alpha, so its opaque stop is not a palette colour.
        if (property === 'mask-image' && name === 'black') continue
        found.push(`${property}: ${value.trim()}`)
      }
    }
    expect(found).toEqual([])
  })

  test('dark theme defines every colour token', () => {
    const light = [...colourTokens(blocks(ROOT_BLOCK)).keys()].sort()
    const dark = [...colourTokens(blocks(DARK_BLOCK)).keys()].sort()
    expect(light.length).toBeGreaterThan(0)
    expect(dark).toEqual(light)
  })

  test('no serif face', () => {
    expect(css).not.toContain('Source Serif')
    expect(css).not.toContain('@font-face')
  })

  test('page backgrounds match the theme-color values', () => {
    expect(colourTokens(blocks(ROOT_BLOCK)).get('--color-bg')).toBe(THEME_COLORS.light)
    expect(colourTokens(blocks(DARK_BLOCK)).get('--color-bg')).toBe(THEME_COLORS.dark)
  })
})

// public/members/anatomy/shared/radref.css repeats the site palette as --rr-* tokens for the anatomy
// viewers (its header comment says to change them together). Light is on :root, dark on
// [data-theme="dark"], as here.
describe('anatomy stylesheet tokens', () => {
  const rr = readFileSync(new URL('../public/members/anatomy/shared/radref.css', import.meta.url), 'utf8')
  const RR_ROOT = /:root\s*\{[^}]*\}/
  const RR_DARK = /\[data-theme="dark"\]\s*\{[^}]*\}/

  function rrTokens(block: string): Map<string, string> {
    const tokens = new Map<string, string>()
    for (const [, name, value] of block.matchAll(/(--rr-[\w-]+)\s*:\s*([^;]+);/g)) tokens.set(name, value.trim())
    return tokens
  }

  const RR_TO_SITE: Record<string, string> = {
    '--rr-bg': '--color-bg',
    '--rr-surface': '--color-surface',
    '--rr-hairline': '--color-hairline',
    '--rr-border': '--color-border',
    '--rr-text': '--color-text',
    '--rr-muted': '--color-text-muted',
    '--rr-accent': '--color-accent',
    '--rr-warn': '--color-warn',
    '--rr-good': '--color-good',
  }

  const rrLight = rrTokens(rr.match(RR_ROOT)?.[0] ?? '')
  const rrDark = rrTokens(rr.match(RR_DARK)?.[0] ?? '')
  const siteLight = colourTokens(blocks(ROOT_BLOCK))
  const siteDark = colourTokens(blocks(DARK_BLOCK))

  test('theme tokens equal the site tokens in both themes', () => {
    for (const [rrName, siteName] of Object.entries(RR_TO_SITE)) {
      expect(rrLight.get(rrName), `light ${rrName}`).toBeDefined()
      expect(rrLight.get(rrName), `light ${rrName}`).toBe(siteLight.get(siteName))
      expect(rrDark.get(rrName), `dark ${rrName}`).toBeDefined()
      expect(rrDark.get(rrName), `dark ${rrName}`).toBe(siteDark.get(siteName))
    }
  })

  test('the always-dark viewport matches --color-viewport', () => {
    // --rr-view-bg is declared once, on :root, and holds in both themes.
    expect(rrLight.get('--rr-view-bg')).toBeDefined()
    expect(rrDark.has('--rr-view-bg')).toBe(false)
    expect(rrLight.get('--rr-view-bg')).toBe(siteLight.get('--color-viewport'))
    expect(rrLight.get('--rr-view-bg')).toBe(siteDark.get('--color-viewport'))
  })
})
