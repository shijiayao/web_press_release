const { checkToken } = require('../../verification/token.js');

module.exports = async function (params, callback) {
  let userToken = await checkToken(params.headers.authorization);

  let url = '/static/image/';

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  } else {
    for (const key in params.files) {
      url += params.files[key][0].fieldname + '/' + params.files[key][0].filename;
    }

    callback({}, { code: 200, message: '上传成功', data: { url } });
  }
};
