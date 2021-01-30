/**
 * @typedef {import('./types/typedefs.js).MiddlewareSettings} MiddlewareSettings
 */

const Client = require('./client');

/**
 * Verifies if the settings are properly provided or not and returns the configuration for the helper function.
 * @param {MiddlewareSettings} settings
 */
const verifySettings = settings => {
  if (typeof settings.id !== 'string') throw Error('Please provide a valid discord client ID as a string.');
  if (typeof settings.secret !== 'string') throw Error('Please provide a valid discord client secret as a string.');
  if (!Array.isArray(settings.scopes)) throw Error('Please provide a valid array of scopes');
  if (typeof settings.redirect !== 'string')
    throw Error('Please provide a valid redirect URI or a redirect endpoint in the Path settings.');

  let url = decodeURIComponent(settings.redirect).substring(8);
  let redirect = url.substring(url.indexOf('/'));
  let options = {
    id: settings.id,
    secret: settings.secret,
    scopes: settings.scopes,
    redirectUri: settings.redirect,
    auth: '/auth',
    redirect: redirect === url ? '/' : redirect,
    login: redirect === url ? '/' : redirect,
    user: [],
    guilds: [],
    connections: []
  };

  let baseUrl = '';

  if (typeof settings.paths === 'object') {
    if (typeof settings.base === 'string') baseUrl = settings.paths.base;
    for (const key of Object.keys(settings.paths)) {
      let path = settings.paths[key];
      if (typeof path === 'string') path = baseUrl + path;
      if (Array.isArray(path)) path = path.map(p => baseUrl + p);
      switch (key) {
      case 'auth':
        if (typeof path === 'string') options.auth = path;
        break;
      case 'login':
        if (typeof path === 'string') options.login = path;
        break;
      case 'all':
        if (typeof path === 'string') {
          options.user.push(path);
          options.guilds.push(path);
          options.connections.push(path);
        } else if (Array.isArray(path)) {
          options.user.push(...path);
          options.guilds.push(...path);
          options.connections.push(...path);
        }
        break;
      case 'user':
        if (typeof path === 'string') options.user.push(path);
        else if (Array.isArray(path)) options.user.push(...path);
        break;
      case 'guilds':
        if (typeof path === 'string') options.guilds.push(path);
        else if (Array.isArray(path)) options.guilds.push(...path);
        break;
      case 'connections':
        if (typeof path === 'string') options.connections.push(path);
        else if (Array.isArray(path)) options.connections.push(...path);
        break;
      }
    }
  }

  return options;
};

/**
 * Generates middleware function for express apps.
 * @param {MiddlewareSettings} settings
 */
let express = settings => {
  let options = verifySettings(settings);

  let client = new Client(options.id, options.secret);
  client.setScopes(...options.scopes);
  client.setRedirect(options.redirectUri);

  return async (req, res, next) => {
    req.discord = { client };

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

module.exports = {
  express
};
