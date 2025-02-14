import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',   // Ensure Vite serves from 'src'
  server: {
    port: 3000,
  },
});