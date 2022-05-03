const path = require('path');
const user_notice_message = require('./user_notice_message.js');

const primary = path.basename(__dirname);

module.exports = {
  [`/api/${primary}/user_notice_message`]: user_notice_message
};
