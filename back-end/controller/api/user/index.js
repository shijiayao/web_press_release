const { register } = require('./register.js');
const { login } = require('./login.js');
const { logout } = require('./logout.js');
const { user_info } = require('./user_info.js');
const { edit_password } = require('./edit_password.js');

const primary = 'user';

module.exports = {
  [`/api/${primary}/register`]: register,
  [`/api/${primary}/login`]: login,
  [`/api/${primary}/logout`]: logout,
  [`/api/${primary}/user_info`]: user_info,
  [`/api/${primary}/edit_password`]: edit_password,
};
