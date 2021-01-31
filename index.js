const Client = require('./lib/client')
const middlewares = require('./lib/middlewares');

module.exports = {
  Client, ...middlewares
}