import { VitePWA } from 'vite-plugin-pwa';

export default function setupVitePwa() {
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],

  });
}
