const MD5 = require('js-md5');

module.exports = {
  verification: function (params = {}) {
    return MD5(`${params.path}~${params.nonce}${params.ts}`) === params.s;
  }
};
