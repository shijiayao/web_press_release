const links = require('./links.js');
const add_links = require('./add_links.js');
const edit_links = require('./edit_links.js');

const primary = 'manage';

module.exports = {
  [`/api/${primary}/links`]: links,
  [`/api/${primary}/add_links`]: add_links,
  [`/api/${primary}/edit_links`]: edit_links
};
