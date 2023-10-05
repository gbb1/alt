import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crossOriginIsolation(),

  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },

  //   watch: {
  //     usePolling: true,
  //   },
  //   host: true, // needed for the Docker Container port mapping to work
  //   strictPort: true,
  //   port: 5173, // you can replace this port with any port
  // }
})