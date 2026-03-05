import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true,
  },
  // Base path for GitHub Pages deployment
  // Change 'daudi-portfolio' to your actual GitHub repo name
  base: '/',
  build: {
    outDir: 'dist',
    // Minify for production security & performance
    minify: 'esbuild',
    // Remove console.logs in production
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        // Cache-busted filenames for production
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
})
