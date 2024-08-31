import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      outDir: 'dist',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Midnight',
        short_name: 'Midnight',
        description:
          'Music player, where users can add their tracks from other popular players',
        display: 'fullscreen',
        theme_color: '#ffffff',
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        lang: 'ru',
        icons: [
          {
            src: 'favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'favicon/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'favicon/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'favicon/mstile-70x70.png',
            sizes: '70x70',
            type: 'image/png',
          },
          {
            src: 'favicon/mstile-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'favicon/mstile-150x150.png',
            sizes: '150x150',
            type: 'image/png',
          },
          {
            src: 'favicon/mstile-310x150.png',
            sizes: '310x150',
            type: 'image/png',
          },
          {
            src: 'favicon/mstile-310x310.png',
            sizes: '310x310',
            type: 'image/png',
          },
          {
            src: 'arrows/arrowIcon.svg',
            sizes: '8x14',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/addToMainIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/addToPlaylistIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/addToQueueIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/addTrackIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/alphaSortIcon.svg',
            sizes: '22x16',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/dateSortIcon.svg',
            sizes: '22x22',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/defaultSortIcon.svg',
            sizes: '22x22',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/deleteIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/favoriteicon.svg',
            sizes: '22x20',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/repeatIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/saveIcon.svg',
            sizes: '18x22',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/saveIconChecked.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/shareIcon.svg',
            sizes: '20x20',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/shuffleIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/actionButtons/sourceSortIcon.svg',
            sizes: '20x20',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/back.svg',
            sizes: '27x28',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/dots.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/loop.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/mainPagePauseIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/mainPagePlayIcon.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/next.svg',
            sizes: '27x28',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/pauseIcon.svg',
            sizes: '150x150',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/playIcon.svg',
            sizes: '133x150',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/shuffleIcon.svg',
            sizes: '20x18',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/volume.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/volumeLow.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/playerButtons/volumeOff.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: 'buttons/settingsIcon.svg',
            sizes: '22x23',
            type: 'image/svg+xml',
          },
          {
            src: 'cross/cross.svg',
            sizes: '16x16',
            type: 'image/svg+xml',
          },
          {
            src: '/dot.svg',
            sizes: '17x17',
            type: 'image/svg+xml',
          },
          {
            src: '/home_bg_desktop.webp',
            sizes: '1440x1024',
            type: 'image/webp',
          },
          {
            src: '/home_bg_mobile.webp',
            sizes: '430x932',
            type: 'image/webp',
          },
          {
            src: '/inputs/clear.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/inputs/passwordHide.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/inputs/passwordShowed.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/inputs/search.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/inputs/searchDisabled.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/inputs/searchIconWhite.svg',
            sizes: '20x21',
            type: 'image/svg+xml',
          },
          {
            src: '/isFavourite/checked.svg',
            sizes: '24x25',
            type: 'image/svg+xml',
          },
          {
            src: '/isFavourite/unchecked.svg',
            sizes: '24x25',
            type: 'image/svg+xml',
          },
          {
            src: '/kebab/kebab.svg',
            sizes: '24x25',
            type: 'image/svg+xml',
          },
          {
            src: '/loader/loader.gif',
            sizes: '1000x1000',
            type: 'image/gif',
          },
          {
            src: '/logo.svg',
            sizes: '24x29',
            type: 'image/svg+xml',
          },
          {
            src: '/navBar/addTrack.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/navBar/home.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/navBar/playlist.svg',
            sizes: '24x24',
            type: 'image/svg+xml',
          },
          {
            src: '/navBar/settings.svg',
            sizes: '25x25',
            type: 'image/svg+xml',
          },
          {
            src: '/playlistThumbnail.jpg',
            sizes: '237x237',
            type: 'image/jpeg',
          },
          {
            src: '/playlistThumbnailNew.jpg',
            sizes: '237x237',
            type: 'image/jpeg',
          },
        ],
      },
      // devOptions: { enabled: true }, // to run in dev mode
    }),
  ],
});
