const { mysql_connection } = require('../../mysql/index.js');

module.exports = async function (params, callback) {
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
