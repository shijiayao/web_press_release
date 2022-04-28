const MD5 = require('js-md5');
const { mysql_connection } = require('../../mysql/index.js');
const { tokenObject, checkToken } = require('../../verification/token.js');

module.exports = function (params, callback) {
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
    callback({ code: 10005, message: '用户信息异常', data: {} }, {});
  }

  mysql_connection.query(`SELECT * FROM user WHERE user_id = '${user_id}'`, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    // 验证密码
    if (result[0].password === MD5(password)) {
      mysql_connection.query(`UPDATE user SET password = '${MD5(newPassword)}', edit_time = '${new Date().toLocaleString()}' WHERE user_id = ${user_id} AND password = '${MD5(password)}'`, function (error, result, fields) {
        if (error) {
          console.log('[SELECT ERROR] - ', error.message);
          callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
          return;
        }

        delete tokenObject[authorization];
        callback({}, { code: 200, message: '修改成功', data: {} });
      });
    } else {
      callback({}, { code: 10006, message: '旧密码不正确', data: {} });
    }
  });
};
