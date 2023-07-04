/// <reference types="vitest" />
import { join } from 'path';

import { workspaceRoot as root } from '@nrwl/devkit';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const APP_NAME = 'web';
const NODE_MODULES = join(root, 'node_modules');

export default defineConfig({
  cacheDir: join(NODE_MODULES, '.vite', APP_NAME),

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: [NODE_MODULES, '.pnpm', '@fontsource/**/*.woff2'],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), viteTsConfigPaths({ root })],

  test: {
    globals: true,
    cache: {
      dir: join(root, 'node_modules/.vitest'),
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
