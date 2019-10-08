require('./typedefs');

/**
 * @typedef {import('./typedefs.js').Integration} Integration
 */
/**
 * A third-party connection of the discord user who has authorized your app to have access to their data.
 *
 * @property {String} id The id of the third-party account.
 * @property {String} name The username of the third-party account.
 * @property {String} service The name of the service providing the third-party account.
 * @property {Boolean} isRevoked Whether the user has revoked this connection.
 * @property {Boolean} isVerified Whether the user has verified this connection.
 * @property {Boolean} friendSync Whether the user has enabled friend synchronization.
 * @property {Boolean} showActivity Whether to show the activity in the connected account in Rich Presence.
 * @property {Boolean} isPublic Whether is account is visible on the user's profile.
 * @property {Array<Integration>} integrations A array of integration objects.
 */
class Connection {
  constructor({id, name, type, revoked, integration, verified, friend_sync, show_activity, visibility}) {
    this.id = id;
    this.name = name;
    this.service = type;
    this.isRevoked = revoked;
    this.isVerified = verified;
    this.friendSync = friend_sync;
    this.showActivity = show_activity;
    this.isPublic = visibility === 1;
    this.integrations = integration;
  }
}

/**
 * A collection of Guild objects.
 */
class Connections extends Map{
  /**
   * @param {Array<Object>} connections
   */
  constructor(connections) {
    super();
    for (let c of connections) {this.set(c.id, new Connection(c));}
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

module.exports = Connections;