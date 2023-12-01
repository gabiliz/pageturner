/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.tsx', "**/*.test.ts"],
    exclude: [
      ...configDefaults.exclude,
    ],
    coverage: {
      reportsDirectory: 'src/tests/unit/coverage',
      provider: 'v8',
      exclude: [
        'node_modules/**',
        'src/components/ui/**',
        'src/utils/api.ts',
        '.next/**',
        'src/lib/**',
        'src/pages/api/**',
        '*.cjs',
        '*.mjs',
        '*.config.*',
        'src/tests/mock.ts',
        'src/server/*.ts',
        'src/server/api/*.ts',
        'src/*.mjs',
        'next-env.d.ts',
        'src/pages'
      ]
    }
  },
});