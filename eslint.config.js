const globals = require('globals')
const pluginJs = require('@eslint/js')
const tsEslintPlugin = require('typescript-eslint')
const tsEslintParser = require('@typescript-eslint/parser')

module.exports = [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  },
  pluginJs.configs.recommended,
  ...tsEslintPlugin.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      'keyword-spacing': 'warn',
      'no-trailing-spaces': "warn",
      "eol-last": "warn",
      "eqeqeq": "warn",
      "quotes": ['warn', 'single'],
    }
  }
]