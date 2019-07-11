class DiscordUser{
    /**
     * 
     * @param {String} id 
     * @param {String} username 
     * @param {String} discriminator 
     * @param {String} avatar 
     * @param {Boolean} bot 
     * @param {Number} nitro 
     * @param {String} email
     * @param {Boolean} verified
     */
    constructor(id, username, discriminator, avatar, bot, nitro, email, verified){
        this.id = id
        this.username = username
        this.discriminator = discriminator
        this.avatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.${avatar.startsWith('a_') ? 'gif' : 'png'}`
        if(bot)
            this.isBot = bot
        else
            this.isBot = false
        if(nitro == 1)
            this.nitro = 'Nitro Classic'
        else if(nitro == 2)
            this.nitro = 'Nitro'
        else
            this.nitro = 'N/A'
        if(email)
            this.email = email
        if(verified != undefined && verified)
            this.emailVerified = true
        else if(verified != undefined && !verified)
            this.emailVerified = false
    }

}

module.exports = DiscordUser
