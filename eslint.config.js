import pluginJs from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
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
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    rules: {
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
