const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = async function (params, callback) {
  const { headers, body: data } = params;
  let userToken = await checkToken(headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  let extraTermArray = [];

  if (params.query.keyword) {
    extraTermArray.push(`label LIKE '%${params.query.keyword}%'`);
  }

  let mysqlQueryString = extraTermArray.length > 0 ? `SELECT * FROM news_type WHERE ${extraTermArray.join(' AND ')}` : 'SELECT * FROM news_type';

  mysql_connection.query(mysqlQueryString, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: 'success', data: result });
  });
};
