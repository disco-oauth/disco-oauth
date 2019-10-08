const permissionConstants = {
  1: 'CREATE_INSTANT_INVITE',
  2: 'KICK_MEMBERS',
  4: 'BAN_MEMBERS',
  8: 'ADMINISTRATOR',
  0x10: 'MANAGE_CHANNELS',
  0x20: 'MANAGE_GUILD',
  0x40: 'ADD_REACTION',
  0x80: 'VIEW_AUDIT_LOG',
  0x400: 'VIEW_CHANNEL',
  0x800: 'SEND_MESSAGES',
  0x1000: 'SEND_TTS_MESSAGES',
  0x2000: 'MANAGE_MESSAGES',
  0x4000: 'EMBED_LINKS',
  0x8000: 'ATTACH_FILES',
  0x10000: 'READ_MESSAGES_HISTORY',
  0x20000: 'MENTION_EVERYONE',
  0x40000: 'USE_EXTERNAL_EMOJIS',
  0x100000: 'CONNECT',
  0x200000: 'SPEAK',
  0x400000: 'MUTE_MEMBERS',
  0x800000: 'MANAGE_NICKNAMES',
  0x1000000: 'MANAGE_ROLES',
  0x2000000: 'MANAGE_WEBHOOKS',
  0x4000000: 'MANAGE_EMOJIS'
};
/**
 * A guild of the discord user who has authorized your app to have access to their data.
 *
 * @property {String} id
 * @property {String} name
 * @property {String} iconHash
 * @property {Array<String>} features
 * @property {Boolean} isOwner
 * @property {Array<String>} permissions
 */
class Guild {
  constructor({id, name, icon, features = [], owner=false, permissions=0}) {
    this.id = id;
    this.name = name;
    this.iconHash = icon;
    this.features = features;
    this.isOwner = owner;
    this.permissions = this._parsePermissions(permissions);
  }

  _parsePermissions(perms) {
    let p = [];
    for (let c of Object.keys(permissionConstants)) {
      let x = parseInt(c);
      if ((x & perms) === x) {
        p.push(permissionConstants[x]);
      }
    }
    return p;
  }

  /**
   * Returns a url to the guild icon.
   * @param {number} size The size of the icon in pixels. (Defaults to 512)
   * @returns {string}
   */
  iconUrl(size=512) {
    return `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${this.iconHash.startsWith('a_') ? 'gif' : 'png'}?size=${size}`;
  }
}

/**
 * A collection of Guild objects.
 */
class Guilds extends Map{
  /**
   * @param {Array<Object>} guilds
   */
  constructor(guilds) {
    super();
    for (let g of guilds) {
      this.set(g.id, new Guild(g));
    }
    this.set = null;
    this.clear = null;
    this.delete = null;
  }

  toJSON() {
    let otr = {};
    this.forEach((g, k) => { otr[k] = g; });
    return otr;
  }
}

module.exports = Guilds;