import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { appVersion } from './src/lib/version.ts'

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string }

/**
 * Commits on HEAD's first-parent history: one per merge or push to main. The GitHub Action deploys
 * main with full history (fetch-depth: 0); Cloudflare's own Git build, which clones shallow, was
 * disabled on 2026-10-28. A shallow clone would undercount, so it first fetches the rest of the
 * history; if that fails, or outside a git checkout, it returns null and the version falls back to
 * package.json.
 */
function gitCommitCount(): number | null {
  const run = (cmd: string) => execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'], timeout: 60_000 }).toString().trim()
  try {
    if (run('git rev-parse --is-shallow-repository') === 'true') {
      try {
        run('git fetch --unshallow --quiet')
      } catch {
        return null
      }
      if (run('git rev-parse --is-shallow-repository') === 'true') return null
    }
    return Number(run('git rev-list --count --first-parent HEAD'))
  } catch {
    return null
  }
}

/** Short commit for the footer; empty outside a git checkout rather than failing the build. */
function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return process.env.GITHUB_SHA?.slice(0, 7) ?? ''
  }
}

/**
 * The source files of the members pages: every `membersPage(() => import('...'))` in the registry.
 * Read from the source text because the registry itself imports React and every page.
 */
function membersModules(): Set<string> {
  const registry = new URL('./src/data/calculators.ts', import.meta.url)
  const found = new Set<string>()
  for (const [, spec] of readFileSync(registry, 'utf8').matchAll(/membersPage\(\(\) => import\('([^']+)'\)/g)) {
    const base = fileURLToPath(new URL(spec, registry))
    const file = ['.tsx', '.ts'].map((ext) => base + ext).find((candidate) => existsSync(candidate))
    if (!file) throw new Error(`membersPage import not found: ${spec}`)
    found.add(file)
  }
  return found
}

const MEMBERS = membersModules()

/**
 * Modules a signed-out reader never needs: everything reachable only through a members page
 * (shared data such as a members-only image list). Filled in at the end of the module graph, before
 * chunks are named.
 */
const MEMBERS_ONLY = new Set<string>()

/**
 * Members pages (studies, 3D anatomy, protocols), and any module only they use, are built into
 * `/members/assets/`, which Cloudflare Access guards; everything else stays in `/assets/`, open to
 * all. The check fails the build if members-only code lands in a chunk a signed-out reader can
 * fetch, or if a public chunk depends on a members chunk (it would not load for them).
 */
function membersSplit(): Plugin {
  return {
    name: 'radref-members-split',
    apply: 'build',
    buildEnd() {
      // Walk from the entry without stepping into members pages; what is left is members-only.
      const ids = [...this.getModuleIds()]
      const queue = ids.filter((id) => this.getModuleInfo(id)?.isEntry)
      const reached = new Set(queue)
      while (queue.length) {
        const info = this.getModuleInfo(queue.pop()!)
        for (const next of [...(info?.importedIds ?? []), ...(info?.dynamicallyImportedIds ?? [])]) {
          if (reached.has(next) || MEMBERS.has(next)) continue
          reached.add(next)
          queue.push(next)
        }
      }
      MEMBERS_ONLY.clear()
      for (const id of ids) if (!reached.has(id)) MEMBERS_ONLY.add(id)
    },
    generateBundle(_options, bundle) {
      const chunks = Object.values(bundle).filter((file) => file.type === 'chunk')
      const isMembers = (fileName: string) => fileName.startsWith('members/')
      for (const chunk of chunks) {
        if (isMembers(chunk.fileName)) continue
        const leaked = chunk.moduleIds.filter((id) => MEMBERS_ONLY.has(id))
        if (leaked.length) this.error(`members-only code in public chunk ${chunk.fileName}: ${leaked.join(', ')}`)
        const needs = chunk.imports.filter(isMembers)
        if (needs.length) this.error(`public chunk ${chunk.fileName} imports members chunks: ${needs.join(', ')}`)
      }
      const built = new Set(chunks.filter((chunk) => isMembers(chunk.fileName)).map((chunk) => chunk.facadeModuleId))
      const missing = [...MEMBERS].filter((id) => !built.has(id))
      if (missing.length) this.error(`members pages without their own members chunk: ${missing.join(', ')}`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // The footer's version line (src/lib/version.ts); declared in src/buildInfo.d.ts.
  define: {
    __APP_VERSION__: JSON.stringify(appVersion(version, gitCommitCount())),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    __BUILD_COMMIT__: JSON.stringify(gitCommit()),
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: (chunk) =>
          chunk.moduleIds.length && chunk.moduleIds.every((id) => MEMBERS_ONLY.has(id)) ? 'members/assets/[name]-[hash].js' : 'assets/[name]-[hash].js',
      },
    },
  },
  plugins: [
    react(),
    membersSplit(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-32.png', 'favicon-48.png', 'apple-touch-icon.png', 'logo-mark.png'],
      manifest: {
        name: 'Rad Refcalculators',
        short_name: 'RadCalc',
        description: 'Mobile-friendly radiology reference: calculators with report-ready impressions (TI-RADS, LI-RADS, O-RADS, Lung-RADS, Bosniak and more), study pages that build the report step by step and teach the method behind it, and interactive 3D anatomy.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        // Match the site header (--color-bg) so the status bar reads as part of it.
        theme_color: '#fbfbfa',
        background_color: '#fbfbfa',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        // The anatomy viewers are standalone HTML pages, and an iframe load counts as a
        // navigation, so without this the service worker would serve the React shell
        // inside the frame instead of the viewer. Opening a reference PDF is a navigation
        // too, so /references/ is left to the network the same way. /members/ must reach
        // the network so that Cloudflare Access can ask for a sign-in.
        navigateFallbackDenylist: [/^\/members\//, /^\/references\//],
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,ico,woff2}'],
        // Members files are never precached: without a session they are a redirect to the
        // Access login. They are kept instead once fetched while signed in (below).
        globIgnores: ['members/**'],
        runtimeCaching: [
          {
            // Members code, viewers and photos, network first so a new deploy wins, from the
            // cache offline. Only 200s are kept, never an Access redirect. The online-only
            // viewers (~8 MB together) and the sign-in page are left to the network.
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin &&
              url.pathname.startsWith('/members/') &&
              !url.pathname.startsWith('/members/anatomy/online/') &&
              !url.pathname.startsWith('/members/signin/'),
            handler: 'NetworkFirst',
            options: { cacheName: 'members', cacheableResponse: { statuses: [200] } },
          },
        ],
      },
    }),
  ],
})
