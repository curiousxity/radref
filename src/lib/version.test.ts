/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { versionLine } from './version'

const pkg = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as { version: string }

describe('version line', () => {
  test('package.json carries a real version number', () => {
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/)
    expect(pkg.version).not.toBe('0.0.0')
  })

  test('reads version, build day and commit', () => {
    expect(versionLine({ version: '1.0.0', date: '2026-10-23', commit: '9cc2037' })).toBe(
      'Version 1.0.0 · built 2026-10-23 · 9cc2037',
    )
  })

  test('leaves the commit out when the build had none', () => {
    expect(versionLine({ version: '1.0.0', date: '2026-10-23', commit: '' })).toBe('Version 1.0.0 · built 2026-10-23')
  })
})
