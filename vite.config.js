import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.IS_HOST === 'true' ? "/" : '/weather-app',
  build: {
    outDir: process.env.IS_HOST === 'true' ? 'public_html' : 'dist',
  },
  server: {
    open: true,
    host: true,
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') }
  },
});