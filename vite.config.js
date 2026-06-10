import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/online-courses-catalog/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
