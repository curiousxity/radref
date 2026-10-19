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
