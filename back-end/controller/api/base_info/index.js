const { user_list } = require('./user_list.js');

const primary = 'base_info';

module.exports = {
  [`/api/${primary}/user_list`]: user_list
};
