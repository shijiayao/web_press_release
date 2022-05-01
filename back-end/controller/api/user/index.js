const register = require('./register.js');
const login = require('./login.js');
const logout = require('./logout.js');
const user_info = require('./user_info.js');
const add_user = require('./add_user.js');
const user_list = require('../user/user_list.js');
const edit_password = require('./edit_password.js');
const edit_user = require('./edit_user.js');

const primary = 'user';

module.exports = {
  [`/api/${primary}/register`]: register,
  [`/api/${primary}/login`]: login,
  [`/api/${primary}/logout`]: logout,
  [`/api/${primary}/user_info`]: user_info,
  [`/api/${primary}/add_user`]: add_user,
  [`/api/${primary}/user_list`]: user_list,
  [`/api/${primary}/edit_password`]: edit_password,
  [`/api/${primary}/edit_user`]: edit_user
};
