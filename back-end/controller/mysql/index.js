const mysql = require('mysql2');
const config = require('./config.js');

const mysql_connection = mysql.createConnection(config);

mysql_connection.connect();

mysql_connection.query('SELECT * FROM user', function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log(`user 正常\n`);
});

module.exports = {
  mysql_connection: mysql_connection
};
