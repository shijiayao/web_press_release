const path = require('path');
const fs = require('fs');

module.exports.nav_list = function (params, callback) {
  console.log(params);

  fs.readFile(path.resolve(__dirname, '../../files/admin_nav.json'), 'utf8', (err, data) => {
    callback(err, data);
  });
};
