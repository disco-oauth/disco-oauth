const btoa = require('btoa');
const request = require('request');
const {ConnectionError, ParamError} = require('./Constants/errors');
const DiscordUser = require('./DataTypes/user');
const DiscordGuild = require('./DataTypes/guild')
const Access = require('./DataTypes/access')
const Connection = require('./DataTypes/connection')
const {
    api_base
} = require('./Constants/constants')

const base = api_base;

/**
 * 
 * @param {String} access 
 * @param {String} guildId 
 * @returns {DiscordGuild}
 */

class DiscordClient {

    /**
     * Initialize the client with your client ID and secret.
     * @param {String} id The client ID of your application.
     * @param {String} secret The client secret of your application.
     */
    constructor(id, secret) {
        this.id = id
        this.secret = secret
        this.creds = btoa(`${id}:${secret}`)
    }

    /**
     * Make the request to get the access token.
     * @param {String} code The authorization code to send.
     * @param {Array<String>} scopes The OAuth2 Scopes that are to be requested.
     * @param {String} redirect The redirect uri.
     */
    async getAccess(code, scopes, redirect) {
        return new Promise((resolve, reject) => {
            if (code && scopes && redirect) {
                let scope = scopes.join("%20")
                let urlToRequest = `${base}oauth2/token?grant_type=authorization_code&code=${code}&scope=${scope}&redirect_uri=${redirect}`
                request({
                    url: urlToRequest,
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${this.creds}`
                    },
                    json: true
                }, (err, res, body) => {
                    if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                        this.authScope = scope
                        this.redirect = redirect
                        this.access = new Access(body.access_token, body.token_type, body.expires_in, body.refresh_token, body.scope);
                        this.expiry = (body.expires_in * 1000) + Date.now()

                        resolve(this)
                    } else {
                        reject(new ConnectionError(res.statusCode, 'Get Access Token'))
                    }
                })
            } else {
                if(!code)
                    reject(new ParamError("Code", "String"))
                else if(!scopes)
                    reject(new ParamError("Scopes", "String[]"))
                else if(!redirect)
                    reject(new ParamError("Redirect URI", "String"))
            }
        })
    }

    /**
     * Use the refresh token to get a new access token.
     */
    async refreshAccess() {
        return new Promise((resolve, reject) => {
            if (this.access) {
                let urlToRequest = `${base}oauth2/token?grant_type=refresh_token&refresh_token=${this.access.refresh_token}&scope=${this.authScope}&redirect_uri=${this.redirect}`
                request(urlToRequest, {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${this.creds}`
                    },
                    json: true
                }, (err, res, body) => {
                    if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                        this.authScope = scope
                        this.redirect = redirect
                        this.access = new Access(body.access_token, body.token_type, body.expires_in, body.refresh_token, body.scope);
                        this.expiry = (this.access.expires_in * 1000) + Date.now()
                        resolve(this)
                    } else {
                        reject(new ConnectionError(res.statusCode, 'Refresh Access Token'))
                    }
                })
            } else {
                reject(new ConnectionError(401, "Refresh Access Token"))
            }
        })
    }

    /**
     * Get the currently authorized user's connections.
     * @returns {Array<>}
     */
    async getAuthorizedUserConnections(){
        return new Promise((resolve, reject) => {
            if (this.access) {
                if (Date.now() < this.expiry) {
                    request({
                        url: `${base}/users/@me/connections`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${this.access.token}`
                        },
                        json: true
                    }, (err, res, body) => {
                        if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                            let connections  = [];
                            let i = 1;
                            body.forEach(conn=>{
                                connections.push(new Connection(conn.verified, conn.name, conn.show_activity, conn.friend_sync, conn.type, conn.id, conn.visibility))
                                if(i== body.length)
                                    resolve(connections);
                                else 
                                    i++;
                                
                            })
                            resolve(body)
                        } else {
                            reject(new ConnectionError(res.statusCode, 'Get User Details'))
                        }
                    })
                } else {
                    reject(new ConnectionError(444, "Get User details"))
                }
            } else {
                reject(new ConnectionError(401, 'Get User Details'))
            }
        })
    }

    /**
     * Get the currently authorized user.
     * @returns {DiscordUser}
     */
    async getAuthorizedUser() {
        return new Promise((resolve, reject) => {
            if (this.access) {
                if (Date.now() < this.expiry) {
                    request({
                        url: `${base}/users/@me`,
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${this.access.token}`
                        },
                        json: true
                    }, (err, res, body) => {
                        if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                            resolve(new DiscordUser(body.id, body.username, body.discriminator, body.avatar, body.bot, body.premium_type, (this.authScope.indexOf("email") > -1) ? body.email : null, (this.authScope.indexOf("email") > -1) ? body.verified : null))
                        } else {
                            reject(new ConnectionError(res.statusCode, 'Get User Details'))
                        }
                    })
                } else {
                    reject(new ConnectionError(444, "Get User details"))
                }
            } else {
                reject(new ConnectionError(401, 'Get User Details'))
            }
        })
    }

    /**
     * Get the currently authorized user's guilds.
     * @returns {Array<DiscordGuild>}
     */
    async getAuthorizedUserGuilds() {
        return new Promise((resolve, reject) => {
            if (this.access) {
                if (Date.now() < this.expiry) {
                    let urlToRequest = `${base}users/@me/guilds`
                    request(urlToRequest, {
                        method: 'GET',
                        headers: {
                            Authorization: `${this.access.type} ${this.access.token}`
                        },
                        json: true
                    }, (err, res, body) => {
                        if (!err && (res.statusCode == 200 || res.statusCode == 201)) {
                            let guilds = [];
                            let i = 1;
                            body.forEach(guild => {
                                guilds.push(new DiscordGuild(guild.id, guild.name, guild.icon, guild.owner, guild.permissions))
                                if (i == body.length) {
                                    resolve(guilds)
                                } else
                                    i++
                            })
                        } else {
                            reject(new ConnectionError(res.statusCode, 'Get User Guilds'))
                        }
                    })
                } else {
                    reject(new ConnectionError(444, 'Get User Guilds'))
                }
            } else {
                reject(new ConnectionError(401, 'Get User Guilds'))
            }
        })
    }

}

module.exports = DiscordClient