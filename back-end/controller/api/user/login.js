const MD5 = require('js-md5');
const { mysql_connection } = require('../../mysql/index.js');
const { tokenObject } = require('../../verification/token.js');

module.exports = function (params, callback) {
  const {
    body: { username, password }
  } = params;

  mysql_connection.query(`SELECT * FROM user WHERE (username = '${username}' OR email = '${username}' OR mobile = '${username}') AND password = '${MD5(password)}'`, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    let token = '';
    let today = new Date(new Date().setHours(0, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000).getTime();

    if (result.length <= 0) {
      callback({}, { code: 10004, message: '用户名或者密码不正确', data: {} });
    } else if (result[0].status !== 1) {
      callback({}, { code: 10005, message: '该用户处于非正常状态，请联系管理员', data: { token } });
    } else {
      token = MD5(username + today);
      tokenObject[token] = { user_id: result[0].user_id, expires: today };
      callback({}, { code: 200, message: '登录成功', data: { token } });
    }
  });
};
