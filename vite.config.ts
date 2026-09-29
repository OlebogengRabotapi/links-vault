import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If you deploy to GitHub Pages at https://<user>.github.io/<repo>/,
// set base to '/<repo>/'. If you deploy to a custom domain or a root
// path (e.g. Vercel/Netlify), leave it as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/links-vault/',
});
