module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
  },
  extends: [],
  // extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    // parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {},
};
