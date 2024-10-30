import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//cd petshop-frontend -> npm run dev
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server:
  {
    port:3000
  }
})
