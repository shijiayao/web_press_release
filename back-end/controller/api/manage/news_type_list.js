const { mysql_connection } = require('../../mysql/index.js');

module.exports = async function (params, callback) {
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
