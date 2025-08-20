import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,             // Listen on all IPs (needed for ngrok)
    port: 5173,             // Optional: expose a fixed port
    strictPort: true,       // Ensure port doesn't change
    cors: true,             // Enable CORS
    https: false,           // Set true only if you have a local SSL cert
  },
})