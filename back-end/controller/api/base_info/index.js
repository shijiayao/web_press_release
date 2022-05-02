const path = require('path');
const user_notice_message = require('./user_notice_message.js');
const news_list = require('./news_list.js');
const news_type_list = require('./news_type_list.js');

const primary = path.basename(__dirname);

module.exports = {
  [`/api/${primary}/user_notice_message`]: user_notice_message,
  [`/api/${primary}/news_type_list`]: news_type_list,
  [`/api/${primary}/news_list`]: news_list
};
