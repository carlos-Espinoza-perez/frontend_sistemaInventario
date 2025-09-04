import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem')
    },
    host: 'localhost',
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  plugins: [
    react()
  ],
});
