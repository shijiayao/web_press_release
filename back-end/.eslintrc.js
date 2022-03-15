module.exports = {
  env: {
    browser: true,
    commonjs: true, // 模块类型 commonjs
    es2021: true,
    node: true
  },
  // 继承配置：包含 eslint-config 的配置
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'prettier'],
  // 全局变量，按需添加。
  globals: {},
  // 解析器
  parser: '@typescript-eslint/parser',
  // 解析器 配置
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module' // 模块类型 import
  },
  // 插件：包含 eslint-plugin 的插件
  plugins: ['html', '@typescript-eslint', 'prettier'],
  settings: {
    'html/report-bad-indent': 'error',
    'html/html-extensions': ['.html', '.we'], // consider .html and .we files as HTML
    'html/xml-extensions': ['.html'], // consider .html files as XML
    'html/javascript-mime-types': ['text/javascript', 'text/jsx'] // also use script tags with a "text/jsx" type attribute
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-this-alias': 'off', // 局部变量 this 可以命名为任意别名
    '@typescript-eslint/no-unused-vars': 'off', // 允许有声明后未被使用的变量或参数
    '@typescript-eslint/no-var-requires': 'off', // require / import
    'prettier/prettier': 'error', // 读取同级目录下 .prettierrc.js 文件配置
    camelcase: 'off', // 允许非驼峰声明
    'comma-dangle': ['error', 'never'], // 不允许尾随逗号，IE8 中遇到尾随逗号时会引发错误。
    eqeqeq: 'off', // 允许使用 ==
    indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['ConditionalExpression'] }], // 缩进空格；SwitchCase 解决 switch 缩进报错问题、ignoredNodes 解决三元表达式报错问题
    'node/handle-callback-err': 'off', // 允许声明 error 但不使用，或者使用 _error
    'linebreak-style': ['error', 'unix'], // 行尾符号，换行风格 unix - LF / Windows - CRLF
    'no-console': 'off', // 允许存在 console
    'no-empty': 'off', // 允许有空的块语句
    'no-extend-native': 'off', // 允许对原生对象原型修改或者添加属性
    'no-undef': 'off', // 允许使用未定义的变量
    'no-unreachable': 'off', // 允许有无法访问的代码
    'no-unused-expressions': 'off', // 允许在表达式中调用函数
    'no-unused-vars': 'off', // 允许有声明后未被使用的变量或参数
    'no-useless-escape': 'off', // 允许使用转义字符
    'no-var': 'off', // 允许使用 var 声明
    'node/no-callback-literal': 'off', // 在调用使用 Node.js 错误优先回调模式的回调函数时，所有错误都应该使用 Error 该类或其子类。使用 undefined 或者 null 没有报错也是可以的。
    'prefer-const': 'off', // 允许不尽量使用 const 声明
    'prefer-regex-literals': 'off', // 允许使用 RegExp 构造函数
    'promise/param-names': 'off', // Promise 不强制使用一致的参数名称（resolve, reject）
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }], // 尽可能使用单引号 avoidEscape: 字符串内有单引号时，允许外层为双引号；allowTemplateLiterals: 允许字符串使用反引号
    semi: ['error', 'always'] // 行尾加分号
  }
};
