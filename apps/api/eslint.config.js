const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  languageOptions: { globals: { process: 'readonly' } },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
