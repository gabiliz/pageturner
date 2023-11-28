/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    include: ['**/*.test.tsx', "**/*.test.ts"],
    exclude: [
      ...configDefaults.exclude,
    ],
    coverage: {
      reportsDirectory: 'src/tests/unit/coverage',
      provider: 'v8',
    }
  },
});