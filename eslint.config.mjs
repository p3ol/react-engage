import { defineConfig } from 'eslint/config';
import pooolint from '@poool/eslint-config-react';

export default defineConfig(
  { ignores: [
    'dist',
    '**/dist',
    'coverage',
    '.yarn',
    'node_modules',
    'examples/next/.next/**',
    'examples/next/next-env.d.ts',
  ] },
  {
    languageOptions: {
      globals: {
        globalThis: 'readonly',
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pooolint.configs.recommended,
);
