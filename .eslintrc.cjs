module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'simple-import-sort',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'simple-import-sort/imports': [
      'error',
      {
        'groups': [
          ['^react'],
          ['^@?shared/helpers', '^@?shared/types'],
          ['^@?modules/.*$'],
          ['^@?components/.*$'],
          ['^@?ui/.*$'],
          ['^@?assets/.*$'],
        ],
      }
    ],
  },
}
