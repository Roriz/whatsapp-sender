module.exports = {
  env: {
    browser: true,
    es6: true
  },
  plugins: ['vue'],

  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended'
  ],

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  rules: {
    'import/no-unresolved': 'off',
    'import/no-console': 'off',
  },
}
