const { mysql_connection } = require('../../mysql/index.js');

module.exports = async function (params, callback) {
  let extraTermArray = [];

  if (params.query.keyword) {
    extraTermArray.push(`content LIKE '%${params.query.keyword}%'`);
  }

  if (params.query.news_id) {
    extraTermArray.push(`news_id = ${params.query.news_id}`);
  }

  let queryResult = {
    user: {},
    remark: []
  };

  let mysqlQueryString = extraTermArray.length > 0 ? `SELECT * FROM remark WHERE ${extraTermArray.join(' AND ')}` : 'SELECT * FROM remark';

  Promise.all([
    new Promise((resolve, reject) => {
      mysql_connection.query('SELECT * FROM user', function (error, result) {
        if (error) {
          console.log('[SELECT ERROR] - ', error.message);
          callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});

          reject();
        }

        result.forEach((element) => {
          queryResult.user[element.user_id] = element.nickname;
        });

        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      mysql_connection.query(mysqlQueryString, function (error, result) {
        if (error) {
          console.log('[SELECT ERROR] - ', error.message);
          callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
          reject();
        }

        queryResult.remark = result;

        resolve();
      });
    })
  ]).then(() => {
    queryResult.remark.forEach((element) => {
      element.user_name = queryResult.user[element.user_id];
      element.reply_user_name = queryResult.user[element.reply_user_id];
    });

    if (params.query.nickname) {
      queryResult.remark = queryResult.remark.filter((element) => new RegExp(params.query.nickname, 'gi').test(element.user_name) || new RegExp(params.query.nickname, 'gi').test(element.reply_user_name));
    }

    callback({}, { code: 200, message: 'success', data: queryResult.remark });
  });
};
