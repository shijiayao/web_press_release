const { formatCurrentDate } = require('../../../tools/tools.js');
const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = async function (params, callback) {
  let userToken = await checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  if (userToken.level >= 1000) {
    callback({}, { code: 10007, message: '用户权限不足', data: {} });

    return;
  }

  let bodyObject = params.body;
  let extraTermArray = [];
  let currentTimeObject = formatCurrentDate();
  let currentTime = `${currentTimeObject.YY}-${currentTimeObject.MM}-${currentTimeObject.DD} ${currentTimeObject.HH}:${currentTimeObject.mm}:${currentTimeObject.ss}`;

  /**
   * 0 管理员修改用户信息
   * 1 用户状态设为正常
   * 2 用户状态设为禁用
   * 3 用户状态设为删除
   */
  if (bodyObject.op_type === 0) {
    for (const key in bodyObject) {
      if (key === 'op_type' || key === 'user_id') {
        continue;
      } else {
        extraTermArray.push(`${key} = '${bodyObject[key]}'`);
      }
    }
  } else if (bodyObject.op_type === 1) {
    extraTermArray.push('status = 1');
  } else if (bodyObject.op_type === 2) {
    extraTermArray.push('status = 2');
  } else if (bodyObject.op_type === 3) {
    extraTermArray.push('status = 3');
  }

  extraTermArray.push(`edit_time = '${currentTime}'`);

  let mysqlQueryString = `UPDATE user SET ${extraTermArray.join(', ')} WHERE user_id = ${bodyObject.user_id}`;

  mysql_connection.query(mysqlQueryString, function (error, result, fields) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: '修改成功', data: {} });
  });
};
