const { formatCurrentDate } = require('../../../tools/tools.js');
const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = async function (params, callback) {
  const { body: data } = params;
  let userToken = await checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  let currentTimeObject = formatCurrentDate();
  let currentTime = `${currentTimeObject.YY}-${currentTimeObject.MM}-${currentTimeObject.DD} ${currentTimeObject.HH}:${currentTimeObject.mm}:${currentTimeObject.ss}`;

  let insertData = {
    news_id: data.news_id,
    user_id: userToken.user_id,
    reply_user_id: data.reply_user_id || null,
    content: data.content,
    edit_time: currentTime,
    create_time: currentTime
  };

  mysql_connection.query(`INSERT INTO remark SET ?`, insertData, function (error, result) {
    if (error) {
      console.log('[SELECT ERROR] - ', error.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
      return;
    }

    callback({}, { code: 200, message: '新增成功！', data: result });

    if (data.reply_user_id) {
      mysql_connection.query(
        `INSERT INTO message SET ?`,
        {
          news_id: data.news_id,
          user_id: data.reply_user_id,
          reply_user_id: userToken.user_id,
          content: data.content,
          edit_time: currentTime,
          create_time: currentTime
        },
        function (error02, result02) {
          if (error02) {
            console.log('[SELECT ERROR] - ', error.message);
          }
        }
      );
    }
  });
};
