const path = require('path');
const links_list = require('./links_list.js');
const add_links = require('./add_links.js');
const edit_links = require('./edit_links.js');
const notice_list = require('./notice_list.js');
const add_notice = require('./add_notice.js');
const edit_notice = require('./edit_notice.js');
const news_type_list = require('./news_type_list.js');
const add_news_type = require('./add_news_type.js');
const edit_news_type = require('./edit_news_type.js');
const news_list = require('./news_list.js');
const add_news = require('./add_news.js');
const edit_news = require('./edit_news.js');

const primary = path.basename(__dirname);

module.exports = {
  [`/api/${primary}/links_list`]: links_list,
  [`/api/${primary}/add_links`]: add_links,
  [`/api/${primary}/edit_links`]: edit_links,
  [`/api/${primary}/notice_list`]: notice_list,
  [`/api/${primary}/add_notice`]: add_notice,
  [`/api/${primary}/edit_notice`]: edit_notice,
  [`/api/${primary}/news_type_list`]: news_type_list,
  [`/api/${primary}/add_news_type`]: add_news_type,
  [`/api/${primary}/edit_news_type`]: edit_news_type,
  [`/api/${primary}/news_list`]: news_list,
  [`/api/${primary}/add_news`]: add_news,
  [`/api/${primary}/edit_news`]: edit_news
};
