const path = require('path');
const remark_list = require('./remark_list.js');
const edit_remark = require('./edit_remark.js');
const add_remark = require('./add_remark.js');

const primary = path.basename(__dirname);

module.exports = {
  [`/api/${primary}/remark_list`]: remark_list,
  [`/api/${primary}/edit_remark`]: edit_remark,
  [`/api/${primary}/add_remark`]: add_remark
};
