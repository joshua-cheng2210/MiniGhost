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
        entryFileNames: 'assets/index.js', // Set a predictable name for the entry file
        chunkFileNames: 'assets/[name].js', // Set a predictable name for chunk files
        assetFileNames: 'assets/[name].[ext]' // Set a predictable name for asset files
      }
    },
    chunkSizeWarningLimit: 1500 // Adjust the chunk size warning limit if needed
  }
});