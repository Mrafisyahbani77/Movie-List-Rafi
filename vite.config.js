import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// file:///home/faker/Movie-List-Rafi/vite.config.js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
