const {perms_const} = require('../Constants/constants')

class DiscordGuild{
    
    /**
     * A discord partial guild
     * @param {String} id The Guild ID
     * @param {String} name The Guild Name
     * @param {String} icon The Icon Hash for the guild
     * @param {Boolean} owner If the user is the owner of the guild
     * @param {Number} perms User's permissions in the guild
     */
    constructor(id, name, icon, owner, perms){
        let permissions = [];
        this.id = id
        this.name = name
        this.icon = `https://cdn.discordapp.com/icons/${id}/${icon}.png`
        if(owner)
            this.owner = owner
        if(perms){
            Object.keys(perms_const).forEach(perm=>{
                if(perms & parseInt(perm))
                    permissions.push(perms_const[parseInt(perm)])
            })
            this.userPerms = permissions
        }
    }

}

module.exports = DiscordGuild