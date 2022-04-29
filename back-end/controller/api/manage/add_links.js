const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = function (params, callback) {
  const { body: data } = params;
  let userToken = checkToken(params.headers.authorization);

  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  console.log(data, {
    name: data.name,
    link: data.link,
    image: data.image,
    edit_time: new Date().toLocaleString(),
    create_time: new Date().toLocaleString()
  });

  mysql_connection.query(
    `INSERT INTO links SET ?`,
    {
      name: data.name,
      link: data.link,
      image: data.image,
      edit_time: new Date().toLocaleString(),
      create_time: new Date().toLocaleString()
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
