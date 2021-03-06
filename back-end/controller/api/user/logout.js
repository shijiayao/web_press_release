const { tokenObject, checkToken } = require('../../verification/token.js');

module.exports = async function (params, callback) {
  let userToken = await checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  delete tokenObject[userToken];

  callback({}, { code: 200, message: '成功退出登录', data: {} });
};
