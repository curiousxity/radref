import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Kept apart from vite.config.ts so the tests do not load the PWA plugin.
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
})
