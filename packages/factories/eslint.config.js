const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
  ignores: ['eslint.config.js', 'dist', 'src/generated'],
});
