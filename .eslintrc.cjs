setmodule.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
  },
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off', // We will use generic prop validation if needed, but want to keep it clean
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // 'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};

