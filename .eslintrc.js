module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console':  'off',
    'no-debugger':  'off',
    'no-warning-comments': 'off',
    "no-suggestions-comments": "off",
    // 禁用所有提示信息
    "no-informational-comments": "off"
  }
}
