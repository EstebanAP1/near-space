import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@data': '/src/data',
      '@images': '/src/images',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
    },
  },
  plugins: [react()],
})
