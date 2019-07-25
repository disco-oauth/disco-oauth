const btoa = require("btoa");

const jwt = require("jsonwebtoken");

const request = require("request");

const {
  ConnectionError,
  ParamError
} = require("./Constants/errors");

const DiscordUser = require("./DataTypes/user");

const DiscordGuild = require("./DataTypes/guild");

const Connection = require("./DataTypes/connection");

const {
  api_base
} = require("./Constants/constants");

const base = api_base;
/**
 * The Discord OAuth Client
 */

class DiscordClient {
  /**
   * Initialize the client with your client ID and secret.
   * @param {String} id The client ID of your application.
   * @param {String} secret The client secret of your application.
   */
  constructor(id, secret) {
    this.id = id;
    this.secret = secret;
    this.creds = btoa(`${id}:${secret}`);
  }
  /**
   * Set the scopes for your requests
   * @param {Array<String>} scopes The scopes for your request to discord OAuth
   */


  setScopes(scopes) {
    if (scopes[0]) this.authScope = scopes.join("%20");else throw new ParamError("scopes", "String");
  }
  /**
   * Set the redirect uri for your requests.
   * @param {String} uri The redirect uri that has been registered in dsicord.
   */


  setRedirect(uri) {
    if (uri) this.redirect = decodeURIComponent(uri);else throw new ParamError("uri", "String");
  }
  /**
   * Generate a link to request the Authorization Code
   */


  getAuthCodeLink() {
    if (this.authScope && this.redirect) return `https://discordapp.com/oauth2/authorize?response_type=code&client_id=${this.id}&scope=${this.authScope}&redirect_uri=${this.redirect}`;else throw new Error("OAuth scopes or Redirect URI not set.");
  }
  /**
   * Make the request to get the access token. The access token will be base64 encrypted and then returned which will be used as the key for future requests.
   * @param {String} code The authorization code to send.
   * @returns {String}
   */


  async getAccess(code) {
    return new Promise((resolve, reject) => {
      if (code) {
        if (this.authScope && this.redirect) {
          let urlToRequest = `${base}oauth2/token?grant_type=authorization_code&code=${code}&scope=${this.authScope}&redirect_uri=${this.redirect}`;
          request({
            url: urlToRequest,
            method: "POST",
            headers: {
              Authorization: `Basic ${this.creds}`
            },
            json: true
          }, (err, res, body) => {
            if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
              let t = body;
              t.expireTimestamp = Date.now() + t["expires_in"];
              resolve(jwt.sign(body, this.creds));
            } else {
              reject(new ConnectionError(res.statusCode, "Get Access Token"));
            }
          });
        } else {
          reject(new Error(`OAuth Scopes or Redirect URI not set.`));
        }
      } else {
        reject(new ParamError("Code", "String"));
      }
    });
  }

  async refreshAccess(key) {
    return new Promise((resolve, reject) => {
      if (key) {
        try {
          let token = jwt.verify(key, this.creds);
          let urlToRequest = `${base}oauth2/token?grant_type=refresh_token&refresh_token=${token.refresh_token}&scope=${this.authScope}&redirect_uri=${this.redirect}`;
          request(urlToRequest, {
            method: "POST",
            headers: {
              Authorization: `Basic ${this.creds}`
            },
            json: true
          }, (err, res, body) => {
            if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
              resolve(jwt.sign(body, this.creds));
            } else {
              reject(new ConnectionError(res.statusCode, "Refresh Access Token"));
            }
          });
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new ParamError("key", "String"));
      }
    });
  }
  /**
   * Get the user's connections whose key is provided.
   * @param {String} key The key of the user's access.
   * @returns {Array<Connection>}
   */


  async getAuthorizedUserConnections(key) {
    return new Promise((resolve, reject) => {
      if (key) {
        try {
          let token = jwt.verify(key, this.creds);

          if (Date.now() < token.expireTimestamp) {
            request({
              url: `${base}/users/@me/connections`,
              method: "GET",
              headers: {
                Authorization: `Bearer ${token["access_token"]}`
              },
              json: true
            }, (err, res, body) => {
              if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                let connections = [];
                let i = 1;
                body.forEach(conn => {
                  connections.push(new Connection(conn.verified, conn.name, conn.show_activity, conn.friend_sync, conn.type, conn.id, conn.visibility));
                  if (i == body.length) resolve(connections);else i++;
                });
                resolve(body);
              } else {
                reject(new ConnectionError(res.statusCode, "Get User Details"));
              }
            });
          } else {
            reject(new ConnectionError(444, "Get User details"));
          }
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new ParamError("key", "String"));
      }
    });
  }
  /**
   * Get the user's access token response using the key.
   * @param {String} key The user's access key.
   */


  async getAccessToken(key) {
    return new Promise((resolve, reject) => {
      if (key) {
        try {
          let token = jwt.verify(key, this.creds);
          resolve(token);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new ParamError("key", "String"));
      }
    });
  }
  /**
   * Get the user's details whose key is provided.
   * @param {String} key The user's access key.
   * @returns {DiscordUser}
   */


  async getAuthorizedUser(key) {
    return new Promise((resolve, reject) => {
      if (key) {
        try {
          let token = jwt.verify(key, this.creds);

          if (Date.now() < token.expireTimestamp) {
            request({
              url: `${base}/users/@me`,
              method: "GET",
              headers: {
                Authorization: `Bearer ${token["access_token"]}`
              },
              json: true
            }, (err, res, body) => {
              if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                resolve(new DiscordUser(body.id, body.username, body.discriminator, body.avatar, body.bot, body.premium_type, this.authScope.indexOf("email") > -1 ? body.email : null, this.authScope.indexOf("email") > -1 ? body.verified : null));
              } else {
                reject(new ConnectionError(res.statusCode, "Get User Details"));
              }
            });
          } else {
            reject(new ConnectionError(444, "Get User details"));
          }
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new ParamError("key", "String"));
      }
    });
  }
  /**
   * Get the user's guilds whose key is provided.
   * @param {String} key The user's access key.
   * @returns {Array<DiscordGuild>}
   */


  async getAuthorizedUserGuilds(key) {
    return new Promise((resolve, reject) => {
      if (key) {
        try {
          let token = jwt.verify(key, this.creds);

          if (Date.now() < token.expireTimestamp) {
            let urlToRequest = `${base}users/@me/guilds`;
            request(urlToRequest, {
              method: "GET",
              headers: {
                Authorization: `${token["token_type"]} ${token["access_token"]}`
              },
              json: true
            }, (err, res, body) => {
              if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                let guilds = [];
                let i = 1;
                body.forEach(guild => {
                  guilds.push(new DiscordGuild(guild.id, guild.name, guild.icon, guild.owner, guild.permissions));

                  if (i == body.length) {
                    resolve(guilds);
                  } else i++;
                });
              } else {
                reject(new ConnectionError(res.statusCode, "Get User Guilds"));
              }
            });
          } else {
            reject(new ConnectionError(444, "Get User Guilds"));
          }
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new ParamError("key", "String"));
      }
    });
  }

}

module.exports = DiscordClient;