/**
 * The access token response.
 * @property {String} token The access token
 * @property {String} type The access token type
 * @property {String} expiry The time of expiry of the token in UTC.
 * @property {String} expireTimestamp The timestamp of the moment of expiry
 * @property {String} refresh The refresh token
 * @property {String} scope The scopes for which the user is authorized.
 */
class Access {
  /**
   * @param {String} token The Access token
   * @param {String} type The access token type
   * @param {String} expiry Amount of time in seconds to expiry
   * @param {String} refresh Refresh Token
   * @param {String} scope Scopes
   */
  constructor(token, type, expiry, refresh, scope) {
    this.token = token;
    this.type = type;
    this.expiry = new Date(Date.now() + expiry * 1000).toUTCString();
    this.expireTimestamp = Date.now() + expiry * 1000;
    this.refresh = refresh;
    this.scope = encodeURIComponent(scope);
  }

}

module.exports = Access;