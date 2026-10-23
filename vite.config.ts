import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string }

/** Short commit for the footer; empty outside a git checkout rather than failing the build. */
function gitCommit(): string {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return process.env.GITHUB_SHA?.slice(0, 7) ?? ''
  }
}

// https://vite.dev/config/
export default defineConfig({
  // The footer's version line (src/lib/version.ts); declared in src/buildInfo.d.ts.
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    __BUILD_COMMIT__: JSON.stringify(gitCommit()),
  },
  plugins: [
    react(),
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
        // inside the frame instead of the viewer.
        navigateFallbackDenylist: [/^\/anatomy\//],
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Online-only viewers: together they would add ~8 MB to every install, so
        // they load from the network and are not available offline.
        globIgnores: ['anatomy/online/**'],
      },
    }),
  ],
})
