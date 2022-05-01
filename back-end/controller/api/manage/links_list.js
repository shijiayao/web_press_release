const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = function (params, callback) {
  let userToken = checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  let extraTermArray = [];

  if (params.query.name) {
    extraTermArray.push(`name LIKE '%${params.query.name}%'`);
  }

  let mysqlQueryString = extraTermArray.length > 0 ? `SELECT * FROM links WHERE ${extraTermArray.join(' AND ')}` : 'SELECT * FROM links';

  mysql_connection.query(mysqlQueryString, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: 'success', data: result });
  });
};