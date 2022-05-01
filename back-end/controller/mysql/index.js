const mysql = require('mysql2');
const config = require('./config.js');

const mysql_connection = mysql.createConnection(config);

mysql_connection.connect();

mysql_connection.query('SELECT * FROM user', function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log(`user 正常`);
});

mysql_connection.query('SELECT * FROM links', function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log(`links 正常`);
});

mysql_connection.query('SELECT * FROM notice', function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log(`notice 正常`);
});

mysql_connection.query('SELECT * FROM news_type', function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log(`news_type 正常`);
});

mysql_connection.query('SELECT * FROM news', function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log(`news 正常`);
});

module.exports = {
  mysql_connection: mysql_connection
};
