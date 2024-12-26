import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    base: './', // Ensure the base path is set correctly for GitHub Pages
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000 // Adjust the chunk size warning limit if needed
  }
});