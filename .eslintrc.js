module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 函数的左括号是否缩进
    'space-before-function-paren': 0,
    // 缩进是否检查
    'indent': 0,
    'no-trailing-spaces': 0,
    'eol-last': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
