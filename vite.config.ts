import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://amalsouli.github.io/Portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
});
