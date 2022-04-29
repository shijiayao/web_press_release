const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = function (params, callback) {
  const { body: data } = params;
  let userToken = checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  let extraTermArray = [];
  let mysqlQueryString = '';

  /**
   * 0 删除
   * 1 修改
   */
  if (data.type === 0) {
    mysqlQueryString = `DELETE FROM links WHERE id = ${data.id}`;
  } else if (data.type === 1) {
    for (const key in data) {
      if (key === 'type' || key === 'id') {
        continue;
      } else {
        extraTermArray.push(`${key} = '${data[key]}'`);
      }
    }

    extraTermArray.push(`edit_time = '${new Date().toLocaleString()}'`);

    mysqlQueryString = `UPDATE links SET ${extraTermArray.join(', ')} WHERE id = ${data.id}`;
  }

  console.log(mysqlQueryString);

  mysql_connection.query(mysqlQueryString, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: '修改成功', data: result });
  });
};
