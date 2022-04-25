const tokenObject = {};

function checkToken(token) {
  let result = {
    status: true,
    user_id: 0
  };
  let userToken = tokenObject[token];
  let currentTime = new Date().getTime();

  if (userToken && userToken.expires > currentTime) {
    result.user_id = userToken.user_id;
  } else {
    delete tokenObject[token];
    result.status = false;
  }

  return result;
}

module.exports = {
  tokenObject,
  checkToken
};
