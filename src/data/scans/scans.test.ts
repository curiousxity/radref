import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import type { ScanImage } from './types'

const publicDir = new URL('../../../public/', import.meta.url)
const srcDir = new URL('../../', import.meta.url)

// Every list in this folder: one module per page, exporting `<page>Scans`.
const modules = import.meta.glob<Record<string, Record<string, ScanImage>>>(['./*.ts', '!./types.ts', '!./sources.ts', '!./*.test.ts'], { eager: true })
const lists = Object.entries(modules).flatMap(([path, exports]) =>
  Object.entries(exports).map(([name, list]) => ({ path, name, list })),
)

const sourceFiles = readdirSync(srcDir, { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.tsx$/.test(file))
  .map((file) => readFileSync(new URL(file, srcDir), 'utf8'))
  .join('\n')

// The scans are cropped from open-access figures published under CC BY, which allows reuse and
// adaptation with credit; non-commercial or no-derivatives licences would not. They are precached
// for offline use, so each must stay small.
describe.each(lists)('$name', ({ path, name, list }) => {
  const images = Object.values(list)
  const folder = path.replace(/^\.\/|\.ts$/g, '').replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

  test('exports are named for the page', () => {
    expect(name).toMatch(/^[a-z][A-Za-z]*Scans$/)
  })

  test.each(images.map((image) => [image.src, image] as const))('%s exists, is small and is credited', (src, image) => {
    expect(src).toMatch(new RegExp(`^/scans/${folder}/[a-z0-9-]+\\.jpg$`))
    const file = new URL(src.slice(1), publicDir)
    expect(existsSync(file)).toBe(true)
    expect(statSync(file).size).toBeLessThan(40_000)
    expect(image.source.licence).toMatch(/^CC BY \d\.\d$/)
    expect(image.source.doi).toMatch(/^10\.\d{4,}\//)
    expect(image.figure).toMatch(/^Fig\. \d+[a-zA-Z]?$/)
    expect(image.alt.length).toBeGreaterThan(20)
  })

  test('a page shows every image', () => {
    for (const key of Object.keys(list)) expect(sourceFiles).toContain(`${name}.${key}`)
  })
})
