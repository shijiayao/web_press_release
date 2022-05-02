const { mysql_connection } = require('../mysql/index.js');
const tokenObject = {};

async function checkToken(token) {
  let userResultObject = {
    status: true,
    user_id: 0,
    level: 50000
  };
  let userToken = tokenObject[token];
  let currentTime = new Date().getTime();

  if (userToken && userToken.expires > currentTime) {
    userResultObject.user_id = userToken.user_id;
    await asyncGetUserInfo();
  } else {
    delete tokenObject[token];
    userResultObject.status = false;
  }

  function asyncGetUserInfo() {
    return new Promise((resolve, reject) => {
      mysql_connection.query(`SELECT * FROM user WHERE user_id = ${userToken.user_id}`, function (error, result) {
        if (error) {
          console.log('同步查询用户权限等级 [SELECT ERROR] - ', error.message);
          return;
        }

        userResultObject.level = result[0].level;

        resolve();
      });
    });
  }

  return userResultObject;
}

module.exports = {
  tokenObject,
  checkToken
};
