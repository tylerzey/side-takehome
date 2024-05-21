import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config = {
  plugins: [tsconfigPaths()],
  test: {
    include: ['**/*.spec.?(c|m)[jt]s?(x)'],
    setupFiles: ['./src/setupTests.js'],
    maxConcurrency: 1,
  },
} satisfies UserConfig & { test: any };

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(config);
