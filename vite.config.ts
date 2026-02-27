import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // GitHub Pages: https://username.github.io/<repo>/
  // � GitHub Actions ���������:
  // GH_PAGES="true"
  // REPO_NAME="<repo>"
  const repo = '';
  const isGhPages = false;
  const base = (isGhPages && repo) ? ('/' + repo + '/') : '/';

  return {
    plugins: [react(), tailwindcss()],
    base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
