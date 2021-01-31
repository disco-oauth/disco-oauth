const verifySettings = require('./settings');
const expressMiddleware = require('./express');
const koaMiddleware = require('./koa');

module.exports = {
  verifySettings,
  expressMiddleware,
  koaMiddleware
}