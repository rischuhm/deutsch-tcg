import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/deutsch-tcg/',
  publicDir: 'assets',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SatzMeister — Deutsch-TCG',
        short_name: 'SatzMeister',
        description: 'Lerne Deutsch mit Sammelkarten: Baue Sätze, sammle Punkte, öffne täglich Booster.',
        theme_color: '#1f2937',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/deutsch-tcg/',
        icons: [
          { src: 'icons/app-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/app-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  test: {
    include: ['src/**/*.test.ts']
  }
});
