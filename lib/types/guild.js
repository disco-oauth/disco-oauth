const permissionConstants = {
  1: 'CREATE_INSTANT_INVITE',
  2: 'KICK_MEMBERS',
  4: 'BAN_MEMBERS',
  8: 'ADMINISTRATOR',
  0x10: 'MANAGE_CHANNELS',
  0x20: 'MANAGE_GUILD',
  0x40: 'ADD_REACTION',
  0x80: 'VIEW_AUDIT_LOG',
  0x100: 'PRIORITY_SPEAKER',
  0x200: 'STREAM',
  0x400: 'VIEW_CHANNEL',
  0x800: 'SEND_MESSAGES',
  0x1000: 'SEND_TTS_MESSAGES',
  0x2000: 'MANAGE_MESSAGES',
  0x4000: 'EMBED_LINKS',
  0x8000: 'ATTACH_FILES',
  0x10000: 'READ_MESSAGES_HISTORY',
  0x20000: 'MENTION_EVERYONE',
  0x40000: 'USE_EXTERNAL_EMOJIS',
  0x80000: 'VIEW_GUILD_INSIGHTS',
  0x100000: 'CONNECT',
  0x200000: 'SPEAK',
  0x400000: 'MUTE_MEMBERS',
  0x800000: 'DEAFEN_MEMBERS',
  0x1000000: 'MOVE_MEMBERS',
  0x2000000: 'USE_VAD',
  0x8000000: 'MANAGE_NICKNAMES',
  0x10000000: 'MANAGE_ROLES',
  0x20000000: 'MANAGE_WEBHOOKS',
  0x40000000: 'MANAGE_EMOJIS_AND_STICKERS ',
  0x80000000: 'USE_SLASH_COMMANDS',
  0x100000000: 'REQUEST_TO_SPEAK',
  0x400000000: 'MANAGE_THREADS',
  0x800000000: 'USE_PUBLIC_THREADS',
  0x1000000000: 'USE_PRIVATE_THREADS',
  0x2000000000: 'USE_EXTERNAL_STICKERS'
};

/**
 * A guild of the discord user who has authorized your app to have access to their data.
 *
 * @property {string} id The guild's unique discord ID.
 * @property {string} name The guild's visible name.
 * @property {string} iconHash The guild's icon hash.
 * @property {string[]} features A list of the discord-enabled features of the guild.
 * @property {boolean} isOwner Whether the authorized user is the guild's owner.
 * @property {string[]} permissions A list of permissions that the authorized user has in this guild.
 * @property {number} createdTimestamp The timestamp of creation of the user's account.
 * @property {Date} createdAt The time of creation of the user's account.
 *
 */
class Guild {
  /**
   * Creates a new Guild.
   *
   * @param {object} data The guild data returned by the discord API.
   *
   * @example let myGuild = new Guild({...});
   */
  constructor({ id, name, icon, features = [], mfa_level, owner = false, permissions = 0 }) {
    this._id = id;
    this._name = name;
    this._iconHash = icon;
    this._features = features;
    this._mfa = mfa_level;
    this._isOwner = owner;
    this._permissions = this._parsePermissions(permissions);
  }

  /**
   * The ID of the guild.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * The name of the guild.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * The hashed info about the guild's icon.
   * @returns {Object.icon}
   */
  get iconHash() {
    return this._iconHash;
  }

  /**
   * The guild features this guild has enabled.
   * @returns {string[]}
   */
  get features() {
    return this._features;
  }

  /**
   * Get MFA level for the guild.
   * @returns {integer}
   */
  get mfa() {
    return this._mfa;
  }

  /**
   * Whether the authenticated user is the owner of the guild.
   * @returns {boolean}
   */
  get isOwner() {
    return this._isOwner;
  }

  /**
   * A list of all the permissions the user has in the guild.
   * @returns {string[]}
   */
  get permissions() {
    return this._permissions;
  }

  /**
   * The UNIX timestamp of the moment when the guild was created.
   * @returns {number}
   */
  get createdTimestamp() {
    return parseInt((BigInt('0b' + parseInt(this._id).toString(2)) >> 22n).toString()) + 1420070400000;
  }

  /**
   * The Date object of the time of the creation of the guild.
   * @returns {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * Parses the bitfield of permission into an array of literals.
   * @param {number} perms The permissions as a bitfield.
   * @returns {string[]} The array of permission literals.
   * @private
   */
  _parsePermissions(perms) {
    const p = [];
    for (const c of Object.keys(permissionConstants)) {
      const x = parseInt(c);
      if ((x & perms) === x) p.push(permissionConstants[x]);
    }
    return p;
  }

  /**
   * Returns a url to the guild icon.
   *
   * @param {number} size The size of the icon in pixels. (Defaults to 512)
   * @returns {string}
   *
   * @example let myFavIcon = myFavUser.iconUrl(); // Gets a normal 512x512px icon.
   * @example let myFavIcon = myFavUser.iconUrl(1024); // Gets a 1024x1024px icon.
   */
  iconUrl(size = 512) {
    return this.iconHash
      ? `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${this.iconHash.startsWith('a_') ? 'gif' : 'png'}?size=${size}`
      : 'https://i.imgur.com/LvroChs.png';
  }

  /**
   * Converts the guild into a JSON Object
   * @returns {{createdAt: Date, features: string[], mfa: integer, isOwner: boolean, permissions: string[], createdTimestamp: number, name: string, iconHash: Object.icon, id: string, iconUrl: string}}}
   */
  toJSON() {
    const { id, name, createdAt, createdTimestamp, features, mfa,iconHash, isOwner, permissions } = this;
    const iconUrl = this.iconUrl();
    return {
      id,
      name,
      createdAt,
      createdTimestamp,
      features,
      mfa,
      iconHash,
      iconUrl,
      isOwner,
      permissions
    };
  }
}

/**
 * A collection of Guild objects.
 *
 * @extends Map
 */
class Guilds extends Map {
  /**
   * @param {object[]} guilds The array of guilds data returned by the discord API.
   *
   * @example let myGuilds = new Guilds([{...}, {...}, ...]);
   */
  constructor(guilds) {
    super();
    for (const g of guilds) this.set(g.id, new Guild(g));

    this.set = null;
    this.clear = null;
    this.delete = null;
  }

  /**
   * Converts the guilds collection into a JSON object.
   * @returns {object}
   */
  toJSON() {
    const otr = {};
    this.forEach((g, k) => {
      otr[k] = g.toJSON();
    });
    return otr;
  }
}

module.exports = Guilds;
