import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/control-gastos-contextapi/', 
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('axios')) {
              return 'vendor-axios'
            }
            return 'vendor'
          }
          if (id.includes('/src/hooks')) {
            return 'hooks'
          }
          if (id.includes('/src/components')) {
            return 'components'
          }
        }
      }
    },
    chunkSizeWarningLimit: 700
  }
})
