import globals from 'globals';
import pluginJs from '@eslint/js';
import { ESLint } from 'eslint';
import pluginReact from 'eslint-plugin-react';
import { typescriptEslintPlugin } from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: '@typescript-eslint/parser', 
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended, 
  {
    plugins: ['@typescript-eslint'], 
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off', 
      '@typescript-eslint/no-unused-vars': ['warn'], 
     
    },
  },
  pluginReact.configs.recommended, 
];
