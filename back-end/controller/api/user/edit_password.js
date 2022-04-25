const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports.user_info = function (params, callback) {
  const {
    headers: { authorization },
    body: { user_id, password, newPassword }
  } = params;
  let userToken = checkToken(authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  if (userToken.user_id !== user_id) {
  }

  mysql_connection.query(`SELECT * FROM user WHERE user_id = ${user_id} AND password = '${MD5(password)}'`, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    if (result.length <= 0) {
      callback({}, { code: 10005, message: '用户信息异常', data: {} });
    } else {
      delete result[0].password;
      callback(
        {},
        {
          code: 200,
          message: 'success',
          data: {
            ...result[0]
          }
        }
      );
    }
  });
};
