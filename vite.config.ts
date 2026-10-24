import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
  return {
    base: '/jstin.portfolio/',
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(
        process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || ''
      ),
      'import.meta.env.VITE_OPENROUTER_MODEL': JSON.stringify(
        process.env.VITE_OPENROUTER_MODEL || process.env.OPENROUTER_MODEL || ''
      ),
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      hmr: true,
    },
  };
});
