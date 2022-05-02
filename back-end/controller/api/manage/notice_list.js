const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = async function (params, callback) {
  let userToken = await checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  let extraTermArray = [];

  if (params.query.keyword) {
    extraTermArray.push(`title LIKE '%${params.query.keyword}%' OR content LIKE '%${params.query.keyword}%'`);
  }

  let mysqlQueryString = extraTermArray.length > 0 ? `SELECT * FROM notice WHERE ${extraTermArray.join(' AND ')}` : 'SELECT * FROM notice';

  mysql_connection.query(mysqlQueryString, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: 'success', data: result });
  });
};
