/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { appVersion, versionLine } from './version'

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

  // Every deploy from main gets a higher patch number: the first-parent commit count rises by one
  // with each merge or push, and major and minor stay under hand control in package.json.
  test('takes major and minor from package.json and the patch from the commit count', () => {
    expect(appVersion('1.0.0', 158)).toBe('1.0.158')
    expect(appVersion('1.2.7', 158)).toBe('1.2.158')
  })

  test('a later commit on main gives a higher version', () => {
    expect(appVersion('1.0.0', 159)).not.toBe(appVersion('1.0.0', 158))
  })

  test('falls back to package.json without a usable count', () => {
    expect(appVersion('1.0.0', null)).toBe('1.0.0')
    expect(appVersion('1.0.0', 0)).toBe('1.0.0')
  })
})
