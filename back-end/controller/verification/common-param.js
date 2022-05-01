const MD5 = require('js-md5');

// 验证公共参数
module.exports = {
  verification: function (params = {}) {
    return MD5(`${params.path}~${params.nonce}${params.ts}`) === params.s;
  }
};
