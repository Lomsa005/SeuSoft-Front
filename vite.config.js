import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'style': path.resolve(__dirname, 'src/assets/styles'),
      'media': path.resolve(__dirname, 'src/assets/media'),
    }
  }
});