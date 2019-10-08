/**
 * A discord user who has authorized your app to have access to their data.
 *
 * @property {String} username
 * @property {String} locale
 * @property {Boolean} isMFAEnabled
 * @property {Number} discriminator
 * @property {String} id
 * @property {String} emailId
 * @property {Boolean} emailVerified
 * @property {Array<String>} userFlags
 * @property {String} avatarHash
 * @property {String} premiumType
 */
class User {
  constructor({username, locale, mfa_enabled, flags=0, avatar=null, discriminator, id, email=undefined, verified=undefined, premium_type=0, bot=false}) {
    this.username = username;
    this.locale = locale;
    this.isMFAEnabled = mfa_enabled;
    this.discriminator = parseInt(discriminator);
    this.id = id;
    this.emailId = email;
    this.emailVerified = verified;
    this.avatarHash = avatar;
    this.userFlags = [];
    this.premiumType = premium_type === 0 ? 'None' : premium_type === 1 ? 'Nitro Classic' : 'Nitro';
    this.bot = bot;
    this.createdTimestamp = (parseInt(id) >> 22) + 1420070400000;
    this.createdAt = new Date(this.createdTimestamp).toUTCString();

    if ((flags & 1) === 1) this.userFlags.push('Discord Employee');
    if ((flags & 2) === 2) this.userFlags.push('Discord Partner');
    if ((flags & 4) === 4) this.userFlags.push('HypeSquad Events');
    if ((flags & 8) === 8) this.userFlags.push('Bug Hunter');
    if ((flags & 64) === 64) this.userFlags.push('HypeSquad House of Bravery');
    else if ((flags & 128) === 128) this.userFlags.push('HypeSquad House of Brilliance');
    else if ((flags & 256) === 256) this.userFlags.push('HypeSquad House of Balance');
    if ((flags & 512) === 512) this.userFlags.push('Early Supporter');
    if ((flags & 1024) === 1024) this.userFlags.push('Team User');
  }

  avatarUrl(size=512) {
    return `https://cdn.discordapp.com/${this.avatarHash ? '' : 'embed/'}avatars/${this.avatarHash ? `${this.id}/${this.avatarHash}` : this.discriminator % 5}.${this.avatarHash? (this.avatarHash.startsWith('a_') ? 'gif' : 'png') : 'png'}?size=${size}`;
  }
}

module.exports = User;