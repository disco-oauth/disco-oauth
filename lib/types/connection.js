require('./typedefs');

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
  constructor({ id, name, type, revoked, integration, verified, friend_sync, show_activity, visibility }) {
    this.#id = id;
    this.#name = name;
    this.#service = type;
    this.#isRevoked = revoked;
    this.#isVerified = verified;
    this.#friendSync = friend_sync;
    this.#showActivity = show_activity;
    this.#isPublic = visibility === 1;
    this.#integrations = integration;
  }
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get service() {
    return this.#service;
  }
  get isRevoked() {
    return this.#isRevoked;
  }
  get isVerified() {
    return this.#isVerified;
  }
  get friendSync() {
    return this.#friendSync;
  }
  get showActivity() {
    return this.#showActivity;
  }
  get isPublic() {
    return this.#isPublic;
  }
  get integrations() {
    return this.#integrations;
  }

  /**
   * Converts the connection object into a readable JSON object.
   * @returns {{isRevoked, friendSync, isVerified, service, name, isPublic: boolean, id, integrations, showActivity}}
   */
  toJSON() {
    let  { id, name, service, friendSync, integrations, isPublic, isRevoked, isVerified, showActivity } = this;
    return  { id, name, service, friendSync, integrations, isPublic, isRevoked, isVerified, showActivity };
  }
}

/**
 * A collection of Connection objects.
 */
class Connections extends Map {
  /**
   * @param {Array<Object>} connections
   */
  constructor(connections) {
    super();
    for (let c of connections) this.set(c.id, new Connection(c));

    this.set = null;
    this.clear = null;
    this.delete = null;
  }

  toJSON() {
    let otr = {};
    this.forEach((g, k) => {
      otr[k] = g;
    });
    return otr;
  }
}

module.exports = Connections;
