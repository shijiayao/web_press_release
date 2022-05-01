const { formatCurrentDate } = require('../../../tools/tools.js');
const MD5 = require('js-md5');
const { mysql_connection } = require('../../mysql/index.js');
const { checkToken } = require('../../verification/token.js');

module.exports = function (params, callback) {
  const { headers, body: data } = params;
  let userToken = checkToken(headers.authorization);
  let errorFlag = false;
  let code = 200;
  let message = '';

  // 新增需要验证权限
  if (!userToken.status) {
    callback({}, { code: 10004, message: '登录已失效', data: {} });

    return;
  }

  if (userToken.level >= 1000) {
    callback({}, { code: 10007, message: '用户权限不足', data: {} });

    return;
  }

  if (!data.username) {
    message = '账号不能为空';
    code = 10001;
    errorFlag = true;
  }

  if (!data.password) {
    message = '密码不能为空';
    code = 10001;
    errorFlag = true;
  }

  if (!data.nickname) {
    message = '昵称不能为空';
    code = 10001;
    errorFlag = true;
  }

  if (!data.email) {
    message = '邮箱不能为空';
    code = 10001;
    errorFlag = true;
  }

  if (!data.mobile) {
    message = '手机号码不能为空';
    code = 10001;
    errorFlag = true;
  }

  if (!data.fullname) {
    message = '姓名不能为空';
    code = 10001;
    errorFlag = true;
  }

  if (data.gender === -1) {
    message = '请选择性别';
    code = 10001;
    errorFlag = true;
  }

  if (errorFlag) {
    callback({ code, message }, {});

    return;
  }

  mysql_connection.query('SELECT * FROM user', function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: err.message } }, {});
      return;
    }

    let repeatFlag = false;

    result.forEach((element) => {
      if (!repeatFlag && data.username === element.username) {
        message = `用户 ${data.username} 已存在`;
        code = 10002;
        repeatFlag = true;
      }

      if (!repeatFlag && data.email === element.email) {
        message = `邮箱 ${data.email} 已存在`;
        code = 10002;
        repeatFlag = true;
      }

      if (!repeatFlag && data.mobile === element.mobile) {
        message = `手机号 ${data.mobile} 已存在`;
        code = 10002;
        repeatFlag = true;
      }
    });

    if (repeatFlag) {
      callback({}, { code, message, data: data });

      return;
    }

    let currentTimeObject = formatCurrentDate();
    let currentTime = `${currentTimeObject.YY}-${currentTimeObject.MM}-${currentTimeObject.DD} ${currentTimeObject.HH}:${currentTimeObject.mm}:${currentTimeObject.ss}`;

    mysql_connection.query(
      `INSERT INTO user SET ?`,
      {
        level: data.level,
        username: data.username,
        password: MD5(data.password),
        nickname: data.nickname,
        email: data.email,
        mobile: data.mobile,
        fullname: data.fullname,
        gender: data.gender,
        status: 1,
        edit_time: currentTime,
        create_time: currentTime
      },
      function (err02, result02) {
        if (err02) {
          console.log('[SELECT ERROR] - ', err02.message);
          callback({ code: 10003, message: '[SELECT ERROR] - ', data: { message: err02.message } }, {});
          return;
        }

        callback({}, { code: 200, message: '注册成功', data: { message: '注册成功' } });
      }
    );
  });
};
