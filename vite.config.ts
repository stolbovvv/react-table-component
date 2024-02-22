import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-table-component/',
  resolve: {
    alias: {
      components: '/src/components',
      assets: '/src/assets',
      styles: '/src/styles',
      hooks: '/src/hooks',
      store: '/src/store',
      types: '/src/types',
      data: '/src/data',
    },
  },
});
