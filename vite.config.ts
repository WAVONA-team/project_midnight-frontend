import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      manifest: {
        name: 'Midnight',
        short_name: 'Mdnght',
        description: 'Music player, where users can add their tracks from other popular players',
        display: 'fullscreen',
        theme_color: '#ffffff',
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        icons: [],
      },
      // devOptions: { enabled: true }, // to run in dev mode
    }),
  ],
});
