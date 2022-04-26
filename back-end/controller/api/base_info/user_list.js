const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports.user_list = function (params, callback) {
  let userToken = checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  if (userToken.level >= 1000) {
    callback({}, { code: 10007, message: '用户权限不足', data: {} });

    return;
  }

  mysql_connection.query(`SELECT * FROM user`, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    result.forEach((element) => {
      delete element.password;
    });

    callback({}, { code: 200, message: 'success', data: result });
  });
};
