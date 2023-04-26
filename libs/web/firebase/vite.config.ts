/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { join } from 'path';
import { workspaceRoot as root } from '@nrwl/devkit';

const LIB_NAME = 'web-firebase';
const NODE_MODULES = join(root, 'node_modules');

export default defineConfig({
  cacheDir: join(NODE_MODULES, '.vite', LIB_NAME),

  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
    react(),
    viteTsConfigPaths({ root }),
  ],

  build: {
    lib: {
      entry: 'src/index.ts',
      name: LIB_NAME,
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: join(NODE_MODULES, '.vitest'),
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
