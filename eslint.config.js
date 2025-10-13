import pluginJs from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'e2e-results/**',
      '**/.unlighthouse/**',
      'node_modules/**',
    ],
  },
  // Flat Configs
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  reactPlugin.configs.flat.recommended,
  hooksPlugin.configs.flat.recommended,
  // Default Configs
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Base Warnings
      'no-console': 'warn',

      // Formatting
      'prettier/prettier': [
        'error',
        {
          semi: true,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          useTabs: false,
        },
      ],

      // React
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
