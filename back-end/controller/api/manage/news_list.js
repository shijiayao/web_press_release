const { mysql_connection } = require('../../mysql/index.js');

module.exports = async function (params, callback) {
  let extraTermArray = [];

  if (params.query.keyword) {
    extraTermArray.push(`(title LIKE '%${params.query.keyword}%' OR content LIKE '%${params.query.keyword}%')`);
  }

  if (params.query.type && Number(params.query.type) !== 0) {
    extraTermArray.push(`type = ${params.query.type}`);
  }

  let mysqlQueryString = extraTermArray.length > 0 ? `SELECT * FROM news WHERE ${extraTermArray.join(' AND ')}` : 'SELECT * FROM news';

  mysql_connection.query(mysqlQueryString, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: 'success', data: result });
  });
};
