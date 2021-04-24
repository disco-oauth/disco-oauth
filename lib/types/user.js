/**
 * A discord user who has authorized your app to have access to their data.
 *
 * @property {string} username The user's discord username.
 * @property {string} locale The user's locale.
 * @property {boolean} isMFAEnabled Whether the user has enabled 2-factor authentication.
 * @property {string} discriminator The user's discriminator.
 * @property {string} id The user's unique discord ID.
 * @property {string} emailId The user's E-Mail ID.
 * @property {boolean} emailVerified Whether the user's E-Mail ID has been verified.
 * @property {string[]} userFlags The user's profile's flags.
 * @property {string} avatarHash The user's avatar hash.
 * @property {string} premiumType The premium subscription type.
 * @property {boolean} bot Whether the user is a discord bot.
 * @property {number} createdTimestamp The timestamp of the creation of the user's account.
 * @property {Date} createdAt The time of creation of the user's account.
 */
class User {
  /**
   * Creates a new discord user.
   *
   * @param {object} data The user data returned by discord API.
   *
   * @example let myNewUser = new User({...});
   */
  constructor({
    username,
    locale,
    mfa_enabled,
    flags = 0,
    avatar = null,
    discriminator,
    id,
    email = undefined,
    verified = undefined,
    premium_type = 0,
    bot = false
  }) {
    this._username = username;
    this._locale = locale;
    this._isMFAEnabled = mfa_enabled;
    this._discriminator = discriminator;
    this._id = id;
    this._emailId = email;
    this._emailVerified = verified;
    this._avatarHash = avatar;
    this._userFlags = [];
    this._premiumType = premium_type === 0 ? 'None' : premium_type === 1 ? 'Nitro Classic' : 'Nitro';
    this._bot = bot;

    if ((flags & 1) === 1) this.userFlags.push('Discord Employee');
    if ((flags & 2) === 2) this.userFlags.push('Discord Partner');
    if ((flags & 4) === 4) this.userFlags.push('HypeSquad Events');
    if ((flags & 8) === 8) this.userFlags.push('Bug Hunter Level 1');
    if ((flags & 64) === 64) this.userFlags.push('HypeSquad House of Bravery');
    else if ((flags & 128) === 128) this.userFlags.push('HypeSquad House of Brilliance');
    else if ((flags & 256) === 256) this.userFlags.push('HypeSquad House of Balance');
    if ((flags & 512) === 512) this.userFlags.push('Early Supporter');
    if ((flags & 1024) === 1024) this.userFlags.push('Team User');
    if ((flags & 4096) === 4096) this.userFlags.push('System');
    if ((flags & 16384) === 16384) this.userFlags.push('Bug Hunter Level 2');
    if ((flags & 131072) === 131072) this.userFlags.push('Verified Bot Developer');
  }

  /**
   * The username of the user.
   * @returns {string}
   */
  get username() {
    return this._username;
  }

  /**
   * The user's unique discord ID.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * The user's preferred locale.
   * @returns {string}
   */
  get locale() {
    return this._locale;
  }

  /**
   * Whether the user has enabled MFA or not.
   * @returns {boolean}
   */
  get isMFAEnabled() {
    return this._isMFAEnabled;
  }

  /**
   * The 4-digit discriminator of the user.
   * @returns {string}
   */
  get discriminator() {
    return this._discriminator;
  }

  /**
   * The user's E-Mail ID.
   * @returns {string}
   */
  get emailId() {
    return this._emailId;
  }

  /**
   * Whether the user has verified their E-Mail ID.
   * @returns {boolean}
   */
  get emailVerified() {
    return this._emailVerified;
  }

  /**
   * The hashed data of the user's avatar image.
   * @returns {string|null}
   */
  get avatarHash() {
    return this._avatarHash;
  }

  /**
   * The user's flags displayed on their profile.
   * @returns {string[]}
   */
  get userFlags() {
    return this._userFlags;
  }

  /**
   * The type of nitro subscription the user has.
   * @returns {string}
   */
  get premiumType() {
    return this._premiumType;
  }

  /**
   * Whether the authorized user is a bot or not.
   * @returns {boolean}
   */
  get bot() {
    return this._bot;
  }

  /**
   * The UNIX timestamp of the time when the user's account was created.
   * @returns {number}
   */
  get createdTimestamp() {
    return parseInt((BigInt('0b' + parseInt(this._id).toString(2)) >> 22n).toString()) + 1420070400000;
  }

  /**
   * A Date object representing the time when the user's account was created.
   * @returns {Date}
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * The user's discord tag, the username and discriminator joined by a '#'.
   * @returns {string}
   */
  get tag() {
    return `${this._username}#${this._discriminator}`;
  }

  /**
   * Returns the user's avatar's URl of desired size.
   *
   * @param {number} size The size of the desired image (in pixels).
   * @returns {string} The generated url to the user's avatar image.
   *
   * @example let myFavAvatar = myFavUser.avatarUrl(); // Gets a normal 512x512px avatar.
   * @example let myFavAvatar = myFavUser.avatarUrl(1024); // Gets a 1024x1024px avatar.
   */
  avatarUrl(size = 512) {
    return `https://cdn.discordapp.com/${this.avatarHash ? '' : 'embed/'}avatars/${
      this.avatarHash ? `${this.id}/${this.avatarHash}` : this.discriminator % 5
    }.${this.avatarHash ? (this.avatarHash.startsWith('a_') ? 'gif' : 'png') : 'png'}?size=${size}`;
  }

  /**
   * Converts the user into a JSON object.
   * @returns {{userFlags: string[], avatarUrl: string, bot: boolean, createdTimestamp: number, emailId: string, locale: string, premiumType: string, discriminator: string, emailVerified: boolean, createdAt: Date, avatarHash: (string|null), isMFAEnabled: boolean, id: string, tag: string, username: string}}
   */
  toJSON() {
    const {
      id,
      username,
      discriminator,
      tag,
      emailId,
      emailVerified,
      createdAt,
      createdTimestamp,
      locale,
      isMFAEnabled,
      bot,
      avatarHash,
      premiumType,
      userFlags
    } = this;
    const avatarUrl = this.avatarUrl();
    return {
      id,
      username,
      discriminator,
      tag,
      emailId,
      emailVerified,
      createdAt,
      createdTimestamp,
      locale,
      isMFAEnabled,
      bot,
      avatarHash,
      avatarUrl,
      premiumType,
      userFlags
    };
  }
}

module.exports = User;
