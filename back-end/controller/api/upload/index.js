const path = require('path');
const image = require('./image.js');

const primary = path.basename(__dirname);

module.exports = {
  [`/api/${primary}/image`]: image
};
