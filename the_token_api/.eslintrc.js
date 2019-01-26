module.exports = {
  root: true,

  env: {
    node: true,
    es6: true
  },

  parserOptions: {
    ecmaVersion: 2017
},

  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'space-before-function-paren': ['error', {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    'indent': ['error', 2],
    'quotes': ['error', 'single']
  }
}
