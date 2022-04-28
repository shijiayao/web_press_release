const base_info = require('./base_info/index.js');
const upload = require('./upload/index.js');
const user = require('./user/index.js');
const manage = require('./manage/index.js');

module.exports = {
  ...base_info,
  ...upload,
  ...user,
  ...manage
};
