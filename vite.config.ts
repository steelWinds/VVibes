import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [sveltekit(), svgLoader({ svgo: false })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
