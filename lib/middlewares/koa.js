const Client = require('../client');
const verifySettings = require('./settings');
/**
 * @typedef {import('../types/typedefs.js).MiddlewareSettings} MiddlewareSettings
 */

/**
 * Generates middleware function for express apps.
 * @param {MiddlewareSettings} settings
 */
const koa = settings => {
  let options = verifySettings(settings);

  let client = new Client(options.id, options.secret);
  client.setScopes(...options.scopes);
  client.setRedirect(options.redirectUri);

  return async ctx => {
    ctx.discord = { client };

    if (req.path === options.auth) {
      let { state, link } = req.discord.client.auth;
      res.cookie('user-state', state);
      res.redirect(link);
    } else if (req.path === options.login)
      if (
        req.query.code &&
        req.query.state &&
        req.cookies['user-state'] &&
        req.query.state === req.cookies['user-state']
      ) {
        let key = await req.discord.client.getAccess(req.query.code);
        res.cookie('user-key', key);
        if (options.redirect !== options.login) res.redirect(options.login);
      } else {
        let msg = req.query.code
          ? req.query.state
            ? req.cookies.state
              ? 'Unsafe login request, local state and returned state do not match.'
              : 'No local state found. Unsafe login request.'
            : 'No state returned by discord.'
          : 'Authorization code not found.';
        res.status(400).send('BAD REQUEST :: ' + msg);
      }
    else if (req.cookies['user-key']) {
      req.discord.loggedIn = true;
      if (client.scopes.includes('identify') || client.scopes.includes('email'))
        if (options.user.length < 1 || (options.user.length > 0 && options.user.includes(req.path)))
          req.discord.user = await req.discord.client.getUser(req.cookies['user-key']);

      if (client.scopes.includes('guilds'))
        if (options.guilds.length < 1 || (options.guilds.length > 0 && options.guilds.includes(req.path)))
          req.discord.guilds = await req.discord.client.getGuilds(req.cookies['user-key']);

      if (client.scopes.includes('connections'))
        if (
          options.connections.length < 1 ||
          (options.connections.length > 0 && options.connections.includes(req.path))
        )
          req.discord.connections = await req.discord.client.getConnections(req.cookies['user-key']);
    }

    next();
  };
};

module.exports = koa;