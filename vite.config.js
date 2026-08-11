import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
      // public/manifest.json is already linked from index.html.
      manifest: false,
      injectRegister: null,
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
