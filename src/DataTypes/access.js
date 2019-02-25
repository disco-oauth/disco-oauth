class Access{
    /**
     * The access response class
     * @param {String} token The Access token
     * @param {String} type The access token type
     * @param {String} expiry Amount of time in seconds to expiry
     * @param {String} refresh Refresh Token
     * @param {String} scope Scopes
     */
    constructor(token, type, expiry, refresh, scope){
        this.token = token
        this.type = type
        this.expiry = new Date(Date.now() + expiry*1000).toUTCString()
        this.refresh = refresh
        this.expires_in = expiry
        this.scope = encodeURIComponent(scope)
    }
}

module.exports = Access;