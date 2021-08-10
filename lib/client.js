const jwt = require('jsonwebtoken'),
  phin = require('phin'),
  uid = require('uid');

const { User, Guilds, Connections, UserCollection, ConnectionsCollection, GuildsCollection } = require('./types');

const APIError = require('./errors/api');

/**
 * @typedef {( 'bot'|'connections'|'email'|'identify'|'guilds'|'guilds.join'|'gdm.join'|'messages.read'|'rpc'|'rpc.api'|'rpc.notifications.read'|'webhook.incoming'|'applications.builds.upload'|'applications.builds.read'|'applications.store.update'|'applications.entitlements'|'relationships.read'|'activities.read'|'activities.write'|'applications.commands'|'applications.commands.update' )} Scope
 */
const scopesList = [
  'bot',
  'connections',
  'email',
  'identify',
  'guilds',
  'guilds.join',
  'gdm.join',
  'messages.read',
  'rpc',
  'rpc.api',
  'rpc.notifications.read',
  'webhook.incoming',
  'applications.builds.upload',
  'applications.builds.read',
  'applications.store.update',
  'applications.entitlements',
  'relationships.read',
  'activities.read',
  'activities.write',
  'applications.commands',
  'applications.commands.update'
];

/**
 * A discord OAuth2 client.
 *
 * @property {string[]} scopes A list of scopes that the client will generate the authentication link for.
 * @property {string} redirectURI A redirect URI from the list at discord application OAuth2 settings.
 * @property {UserCollection} users A collection of {@link User} objects being used for caching.
 * @property {GuildsCollection} guilds A collection of {@link Guilds} objects being used for caching.
 * @property {ConnectionsCollection} connections A collection of {@link Connections} objects being used for caching.
 * @property {{link: string, state: string}} auth The auth data generated for just one use. Contains link and state variable.
 */
class Client {
  /**
   * Create a new OAuth2 Client.
   *
   * @param {string} clientId The discord application's client ID.
   * @param {string} clientSecret The discord application's client secret.
   *
   * @example new Client('my-client-id', 'my-super-secret-client-secret');
   */
  constructor(clientId, clientSecret) {
    this._id = clientId;
    this._secret = clientSecret;
    this._baseUrl = 'https://discord.com/api/';
    this.scopes = [];
    this.redirectURI = '';
    this.users = new UserCollection(this);
    this.guilds = new GuildsCollection(this);
    this.connections = new ConnectionsCollection(this);
  }

  /**
   * Set the scopes for future requests
   *
   * @chainable
   * @param {Scope | Array<Scope>} scopes The list of scopes that the user will authorize.
   *
   * @example myClient.setScopes('identify', 'guilds');
   * @example myClient.setScopes(['identify', 'email', 'connections']);
   */
  setScopes(...scopes) {
    if (scopes.length < 1) throw new Error('No scopes were provided.');
    if (Array.isArray(scopes[0])) scopes = scopes.flat();

    for (const scope of scopes) {
      if (!scopesList.includes(scope)) throw new Error('Invalid scope provided.');
      if (this.scopes.includes(scope.trim().toLowerCase())) continue;

      this.scopes.push(scope.trim().toLowerCase());
    }
    return this;
  }

  /**
   * Set the redirect URI for future requests.
   *
   * @chainable
   * @param {string} redirectUri One of the redirect URI from discord application settings.
   *
   * @example myClient.setRedirect('http://localhost:3000/login');
   */
  setRedirect(redirectUri) {
    if (redirectUri.startsWith('http://') || redirectUri.startsWith('https://')) this.redirectURI = redirectUri;
    else throw new Error('Invalid redirect URI provided.');
    return this;
  }

  /**
   * The auth data generated for just one user.
   *
   * @type {{link: string, state: string}}
   */
  get auth() {
    if (this.scopes.length > 0 && this.redirectURI !== '') {
      const state = uid(16);
      return {
        link: `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${this._id}&scope=${this.scopes.join(
          '%20'
        )}&state=${state}&redirect_uri=${this.redirectURI}&prompt=none`,
        state
      };
    } else if (this.scopes.length < 1) throw new Error('scopes are not defined.');
    else if (this.redirectURI === '') throw new Error('redirect URI is not defined');
  }

  /**
   * Gets the access token for the user to perform further functions.
   *
   * @async
   * @param {string} code The authorization code returned by discord after the authentication.
   * @returns {Promise<string>} The user key that will be used to fetch the user's data.
   *
   * @example let userKey = myClient.getAccess(req.query.code);
   */
  async getAccess(code) {
    return new Promise(async (resolve, reject) => {
      if (typeof code !== 'string' && code === '') reject(new Error('Authorisation code not provided.'));
      try {
        const response = await phin({
          method: 'POST',
          url: `${this._baseUrl}oauth2/token`,
          parse: 'json',
          form: {
            client_id: this._id,
            client_secret: this._secret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectURI,
            scope: this.scopes.join(' ')
          }
        });
        if (response.statusCode === 200) {
          const token = response.body;
          token['expireTimestamp'] = Date.now() + token['expires_in'] * 1000 - 10000;
          const key = jwt.sign(token, this._secret);
          if (this.scopes.includes('identify') || this.scopes.includes('email')) await this.users.fetch(key);
          if (this.scopes.includes('guilds')) await this.guilds.fetch(key);
          if (this.scopes.includes('connections')) await this.connections.fetch(key);
          resolve(key);
        } else reject(new APIError(response));
      } catch (err) {
        console.error(err);
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse']));
      }
    });
  }

  /**
   * Converts the user's key into the access token response sent by discord. Not recommended to use.
   * @param {string} key The user's key which needs to be converted into the access token response.
   * @returns {object} tokenResponse The access token response returned by the discord for the user.
   *
   * @example let tokenResponse = myClient.raw(userKey);
   */
  raw(key) {
    let access;

    try {
      access = jwt.verify(key, this._secret);
    } catch (err) {
      new Error('Invalid key provided');
    }

    return access;
  }

  /**
   * Checks the validity of the access key.
   *
   * @param {string} key The user key whose validity is to be checked.
   * @returns {{expired: boolean, expiresIn: number, expireTimestamp: number}} The validity data of the user key.
   *
   * @example let validityData = myClient.checkValidity(myUserKey);
   */
  checkValidity(key) {
    let access;
    try {
      access = jwt.verify(key, this._secret);
    } catch (err) {
      new Error('Invalid key provided');
    }
    return {
      expired: access.expireTimestamp < Date.now(),
      expiresIn: access.expireTimestamp - Date.now(),
      expireTimestamp: access.expireTimestamp
    };
  }

  /**
   * Gets a new access token for the user whose access token has expired.
   *
   * @async
   * @param {string} key The user key of the user whose access token is to be refreshed.
   * @returns {Promise<string>} The new user key.
   *
   * @example let newKey = myClient.refreshToken(oldUserKey);
   */
  async refreshToken(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided'));
      }
      const refresh = access['refresh_token'];
      try {
        const response = await phin({
          url: `${this._baseUrl}oauth2/token`,
          method: 'POST',
          parse: 'json',
          form: {
            client_id: this._id,
            client_secret: this._secret,
            grant_type: 'refresh_token',
            refresh_token: refresh,
            redirect_uri: this.redirectURI,
            scope: this.scopes.join(' ')
          }
        });
        if (response.statusCode === 200) {
          const token = response.body;
          token['expireTimestamp'] = Date.now() + token['expires_in'] * 1000 - 10000;
          resolve(jwt.sign(token, this._secret), {
            expiresIn: token['expires_in']
          });
        } else reject(new APIError(response));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse']));
      }
    });
  }

  /**
   * Gets the user whose user key is provided from the discord API.
   *
   * @async
   * @param {string} key The user key of the user whose data is to be fetched.
   * @returns {Promise<User>} The returned user.
   *
   * @example let myFavUser = myClient.getUser(userKey);
   */
  async getUser(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided.'));
      }
      const token = access['access_token'],
        type = access['token_type'];
      try {
        const response = await phin({
          url: `${this._baseUrl}users/@me`,
          method: 'GET',
          headers: { Authorization: `${type} ${token}` },
          parse: 'json'
        });
        if (response.statusCode === 200) resolve(new User(response.body));
        else reject(new APIError(response));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse']));
      }
    });
  }

  /**
   * Gets the guilds of the user whose user key is provided from the discord API.
   *
   * @async
   * @param {string} key The user key of the user whose guilds are to be fetched.
   * @returns {Promise<Guilds>} The returned guilds.
   *
   * @example let myFavGuilds = myClient.getGuilds(userKey);
   */
  async getGuilds(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided'));
      }
      const token = access['access_token'],
        type = access['token_type'];
      try {
        const response = await phin({
          url: `${this._baseUrl}users/@me/guilds`,
          method: 'GET',
          headers: { Authorization: `${type} ${token}` },
          parse: 'json'
        });
        if (response.statusCode === 200) resolve(new Guilds(response.body));
        else reject(new APIError(response));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse']));
      }
    });
  }

  /**
   * Gets the connected third-party accounts of the user whose user key is provided from the discord API.
   *
   * @async
   * @param {string} key The user key of the user whose connections are to be fetched.
   * @returns {Promise<Connections>} The returned connections.
   *
   * @example let myFavConnections = myClient.getConnections(userKey);
   */
  async getConnections(key) {
    return new Promise(async (resolve, reject) => {
      let access;
      try {
        access = jwt.verify(key, this._secret);
      } catch (err) {
        reject(new Error('Invalid key provided.'));
      }
      const token = access['access_token'],
        type = access['token_type'];
      try {
        const response = await phin({
          url: `${this._baseUrl}users/@me/connections`,
          method: 'GET',
          headers: { Authorization: `${type} ${token}` },
          parse: 'json'
        });
        if (response.statusCode === 200) resolve(new Connections(response.body));
        else reject(new APIError(response));
      } catch (err) {
        reject(err.error ? new Error(err.error) : new APIError(err['phinResponse']));
      }
    });
  }
}

module.exports = Client;
