import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    deps: {
      inline: true,
    },
    globals: true,
    // https://github.com/vitejs/vite/issues/8378
    // needed to fix graphql being loaded twice...once as cjs and once as mjs
    server: { deps: { fallbackCJS: true } },
    setupFiles: './src/setupTests.js',
    threads: false,
  },
} as UserConfig & { test: any });
