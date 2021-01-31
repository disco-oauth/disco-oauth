/**
 * @typedef {import('../types/typedefs.js).MiddlewareSettings} MiddlewareSettings
 */

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

module.exports = verifySettings;