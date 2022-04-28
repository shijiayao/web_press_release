const image = require('./image.js');

const primary = 'upload';

module.exports = {
  [`/api/${primary}/image`]: image
};
