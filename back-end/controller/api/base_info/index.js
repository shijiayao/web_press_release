const { nav_list } = require('./nav_list.js');

const primary = 'base_info';

module.exports = {
  [`/api/${primary}/nav_list`]: nav_list
};
