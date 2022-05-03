const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = async function (params, callback) {
  let userToken = await checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  let queryResult = {
    user: {},
    notice: [],
    message: []
  };

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
      mysql_connection.query(`SELECT * FROM notice WHERE level >= ${userToken.level}`, function (error, result) {
        if (error) {
          console.log('[SELECT ERROR] - ', error.message);
          callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
          reject();
          return;
        }

        queryResult.notice = result;

        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      mysql_connection.query(`SELECT * FROM message WHERE user_id = ${userToken.user_id}`, function (error, result) {
        if (error) {
          console.log('[SELECT ERROR] - ', error.message);
          callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
          reject();
          return;
        }

        queryResult.message = result;

        queryResult.message.forEach((element) => {
          element.reply_user_name = queryResult.user[element.reply_user_id];
        });

        resolve();
      });
    })
  ])
    .then(() => {
      callback({}, { code: 200, message: 'success', data: { notice: queryResult.notice, message: queryResult.message } });
    })
    .catch((err) => {});
};
