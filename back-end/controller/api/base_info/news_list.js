const { mysql_connection } = require('../../mysql/index.js');

module.exports = async function (params, callback) {
  mysql_connection.query(`SELECT * FROM news`, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: 'success', data: result });
  });
};
