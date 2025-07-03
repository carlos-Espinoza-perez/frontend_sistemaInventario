import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem')
    },
    host: 'localhost',
    port: 5173
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["Logo-192.png", "Logo-512.png"],
      manifest: {
        name: "Sistema de inventario",
        short_name: "Inventario",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "Logo-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "Logo-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
