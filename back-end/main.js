const packageName = require('./controller/mysql/index.js');
const ServerApp = require('./server/server_config.js');


const app = new ServerApp({
  port: 12580
});
