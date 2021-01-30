module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
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
    'curly': [
      'error',
      'multi'
    ],
    'eqeqeq': [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      'error',
      'always',
      {
        'singleValue': false,
        'objectsInArrays': false,
        'arraysInArrays': false
      }
    ],
    'block-spacing': 'error',
    'brace-style': [
      'error',
      '1tbs',
      {
        'allowSingleLine': true
      }
    ],
    'line-comment-position': [
      'error',
      { 'position': 'beside' }
    ],
    'multiline-ternary': 'off',
    'getter-return': 'off',
    'no-async-promise-executor': 'off'
  }
};
