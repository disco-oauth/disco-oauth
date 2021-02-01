const collections = require('./collection');
const Connections = require('./connection');
const Guilds = require('./guild');
const User = require('./user');

module.exports = {
  ...collections,
  Connections,
  Guilds,
  User
}
