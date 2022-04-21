// 原生模块
const http = require('http');

// 插件模块
const log4js = require('log4js'); // 日志
const express = require('express'); // node.js Web 应用框架
const mime = require('mime'); // 文件 mime 类型
const compression = require('compression'); // 服务端 GZip 压缩
const multer = require('multer'); // 用于处理 multipart/form-data 类型的表单数据 node.js 中间件，它主要用于上传文件。注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据。

const controller = require('../controller/index.js');

/**
 * 本地服务器构造函数
 * @param {Object} params             参数对象
 * {
 *    url:         [String]  [选填]    本地服务地址，默认为 127.0.0.1
 *    rootPath:    [String]  [选填]    本地服务的根目录，默认为 'D:/'
 *    port:        [Number]  [必填]    端口号
 *    static:      [Object]  [选填]    静态资源目录配置，键值对，键为实际响应目录或文件，值为页面请求的目录或文件数组
 *    indexPage:   [Object]  [选填]    指定访问首页的功能
 *    page404:     [Object]  [选填]    重定向到 404 页面设置
 *    proxy:       [Array]   [选填]    代理服务设置
 * }
 */
class ServerApp {
  constructor(params) {
    this.logger = null;

    this.app = null;

    // server 参数
    this.url = params.url || '127.0.0.1';
    this.rootPath = params.rootPath || '/'; // 根目录路径
    this.port = 12580; // 要开启服务的端口号

    this.init();
  }

  init() {
    const _this = this;

    // 初始化日志模块
    _this.log4jsInit();

    // 创建 express 服务
    _this.app = express();

    _this.log4jsMiddleware();

    // 需要考虑执行顺序
    _this.compression();
    _this.setHeader();
    _this.processingRequests();
    _this.openServer();
  }

  // 日志模块配置
  log4jsInit() {
    const _this = this;

    // 配置说明 参考官方文档
    log4js.configure({
      appenders: {
        console: { type: 'console', layout: { type: 'pattern', pattern: '%[[%d{yyyy/MM/dd hh:mm:ss:SSS}] [%p]%] %m' } },
        file: { type: 'file', layout: { type: 'pattern', pattern: '[%d{yyyy/MM/dd hh:mm:ss:SSS}] [%p] %m' }, filename: './logs/application.log' }
      },
      categories: { default: { appenders: ['console', 'file'], level: 'trace' } },
      pm2: true,
      pm2InstanceVar: 'INSTANCE_ID'
    });

    _this.logger = log4js.getLogger();
  }

  log4jsMiddleware() {
    const _this = this;

    // 配置说明 https://log4js-node.github.io/log4js-node/connect-logger.html
    _this.app.use(log4js.connectLogger(_this.logger, { level: 'auto', format: `[:remote-addr] [:method] [HTTP/:http-version] [:status] [:response-timems] [:url] [:content-length] [:referrer] [:user-agent]` }));
  }

  // 在响应文件前使用服务端 GZip 压缩
  compression() {
    const _this = this;

    _this.app.use(compression());
  }

  // 设置响应头
  setHeader() {
    const _this = this;

    // headers 参数
    let ResponseHeadersConfig = {
      'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild, X-Void-Risk, Authorization',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*'
    };

    // allow custom header and CORS
    _this.app.all('*', (request, response, next) => {
      for (const key in ResponseHeadersConfig) {
        response.header(key, ResponseHeadersConfig[key]);
      }

      let method = request.method.toLocaleUpperCase();

      if (method === 'OPTIONS') {
        response.sendStatus(200); /* 让 options 请求快速返回 */
      } else {
        next();
      }
    });
  }

  // 处理请求
  processingRequests() {
    const _this = this;

    // extended:true 表示使用qs库来解析查询字符串
    // extended:false 表示使用querystring库来解析字符串
    _this.app.use(express.json());
    _this.app.use(express.raw());
    _this.app.use(express.text());
    _this.app.use(express.urlencoded({ limit: '100mb', extended: false }));

    _this.app.use('/', (request, response) => {
      const { method, path, query, body } = request;
      console.log(method, path, query, body);

      if (path.indexOf('/api') === 0) {
        controller[String(path).replace(/-/g, '_')](query, (err, data) => {
          response.json({ code: 200, message: 'succes', data: JSON.parse(data) });
        });
      } else {
        response.json({ code: 404, message: 'Not Found!', result: {} });
      }
    });
  }

  // 开启服务
  openServer() {
    const _this = this;

    // HTTP
    _this.server_http = http.createServer(_this.app).listen(_this.port, () => {
      console.log(`[${_this.server_http.address().port}] http:${_this.url}:${_this.server_http.address().port}`);
    });
  }
}

module.exports = ServerApp;
