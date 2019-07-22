/**
 * A discord user
 * @property {String} id The user's unique ID on discord.
 * @property {String} username The user's username on discord.
 * @property {String} discriminator The user's discriminator on discord.
 * @property {String} avatar A link to the user's discord avatar.
 * @property {Boolean} isBot Whether the user is a bot or not.
 * @property {String} nitro The nitro level of the user.
 * @property {String} email The user's email (Only if the email scope was passed).
 * @property {Boolean} emailVerified Whether the user's email ID has been verified or not.
 */
class DiscordUser {
  /**
   * A discord user
   * @param {String} id
   * @param {String} username
   * @param {String} discriminator
   * @param {String} avatar
   * @param {Boolean} bot
   * @param {Number} nitro
   * @param {String} email
   * @param {Boolean} verified
   */
  constructor(id, username, discriminator, avatar, bot, nitro, email, verified) {
    this.id = id;
    this.username = username;
    this.discriminator = discriminator;
    this.avatar = `https://cdn.discordapp.com/${id}/${avatar}.${avatar.startsWith("a_") ? "gif" : "png"}`;
    if (bot) this.isBot = bot;else this.isBot = false;
    if (nitro == 1) this.nitro = "Nitro Classic";else if (nitro == 2) this.nitro = "Nitro";else this.nitro = "N/A";
    if (email) this.email = email;
    if (verified != undefined && verified) this.emailVerified = true;else if (verified != undefined && !verified) this.emailVerified = false;
  }

}

module.exports = DiscordUser;