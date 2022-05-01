const { formatCurrentDate } = require('../../../tools/tools.js');
const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = function (params, callback) {
  const { body: data } = params;
  let userToken = checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  let currentTimeObject = formatCurrentDate();
  let currentTime = `${currentTimeObject.YY}-${currentTimeObject.MM}-${currentTimeObject.DD} ${currentTimeObject.HH}:${currentTimeObject.mm}:${currentTimeObject.ss}`;

  mysql_connection.query(
    `INSERT INTO notice SET ?`,
    {
      level: data.level,
      title: data.title,
      content: data.content,
      edit_time: currentTime,
      create_time: currentTime
    },
    function (error, result) {
      if (error) {
        console.log('[SELECT ERROR] - ', error.message);
        callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: error.message } }, {});
        return;
      }

      callback({}, { code: 200, message: '新增成功！', data: result });
    }
  );
};
