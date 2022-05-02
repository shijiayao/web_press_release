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

  let queryObject = params.query;
  let extraTermArray = [];

  if (queryObject.name) {
    extraTermArray.push(`(username LIKE '%${queryObject.name}%' OR nickname LIKE '%${queryObject.name}%' OR email LIKE '%${queryObject.name}%' OR mobile LIKE '%${queryObject.name}%' OR fullname LIKE '%${queryObject.name}%')`);
  }

  /**
   * 0 全部
   * 10 管理员
   * 1000 普通用户
   */
  if (Number(queryObject.userGroup) > 0 && Number(queryObject.userGroup) < 1000) {
    extraTermArray.push(`level <= ${queryObject.userGroup}`);
  } else if (Number(queryObject.userGroup) >= 1000) {
    extraTermArray.push(`level >= ${queryObject.userGroup}`);
  }

  /**
   * 0 全部
   * 1 正常
   * 2 禁用
   * 3 删除
   */
  if (Number(queryObject.userStatus) !== 0) {
    extraTermArray.push(`status = ${queryObject.userStatus}`);
  }

  let mysqlQueryString = extraTermArray.length > 0 ? `SELECT * FROM user WHERE ${extraTermArray.join(' AND ')}` : 'SELECT * FROM user';

  mysql_connection.query(mysqlQueryString, function (error, result) {
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
