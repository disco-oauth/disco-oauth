require('./typedefs');

/**
 * A third-party connection of the discord user who has authorized your app to have access to their data.
 *
 * @property {string} id The id of the third-party account.
 * @property {string} name The username of the third-party account.
 * @property {string} service The name of the service providing the third-party account.
 * @property {boolean} isRevoked Whether the user has revoked this connection.
 * @property {boolean} isVerified Whether the user has verified this connection.
 * @property {boolean} friendSync Whether the user has enabled friend synchronization.
 * @property {boolean} showActivity Whether to show the activity in the connected account in Rich Presence.
 * @property {boolean} isPublic Whether is account is visible on the user's profile.
 * @property {Integration[]} integrations A array of integration objects.
 */
class Connection {
  /**
   * Creates a new connection.
   * @param {object} data The connection object data returned by the discord API.
   *
   * @example let myConnection = new Connection({...});
   */
  constructor({ id, name, type, revoked, integration, verified, friend_sync, show_activity, visibility }) {
    this._id = id;
    this._name = name;
    this._service = type;
    this._isRevoked = revoked;
    this._isVerified = verified;
    this._friendSync = friend_sync;
    this._showActivity = show_activity;
    this._isPublic = visibility === 1;
    this._integrations = integration;
  }

  /**
   * The ID of the connection object.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * The username of the user for the service the connection is made with.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * The name of the service the connection is made with.
   * @returns {string}
   */
  get service() {
    return this._service;
  }

  /**
   * Whether the user has revoked this connection or not.
   * @returns {boolean}
   */
  get isRevoked() {
    return this._isRevoked;
  }

  /**
   * Whether the user has verified the connection from the other service.
   * @returns {boolean}
   */
  get isVerified() {
    return this._isVerified;
  }

  /**
   * Whether the user has enabled friend sync with the service.
   * @returns {boolean}
   */
  get friendSync() {
    return this._friendSync;
  }

  /**
   * Whether the user activity on the connected account is displayed as user activity or not.
   * @returns {boolean}
   */
  get showActivity() {
    return this._showActivity;
  }

  /**
   * Whether the connection is publicly displayed on the user profile.
   * @returns {boolean}
   */
  get isPublic() {
    return this._isPublic;
  }

  /**
   * Guild integrations this connection is associated with.
   * @returns {Array<Integration>}
   */
  get integrations() {
    return this._integrations;
  }

  /**
   * Converts the connection into a JSON object.
   * @returns {{isRevoked: boolean, friendSync: boolean, isVerified: boolean, service: string, name: string, isPublic: boolean, id: string, integrations: Array<Integration>, showActivity: boolean}}
   */
  toJSON() {
    const { id, name, service, friendSync, integrations, isPublic, isRevoked, isVerified, showActivity } = this;
    return {
      id,
      name,
      service,
      friendSync,
      integrations,
      isPublic,
      isRevoked,
      isVerified,
      showActivity
    };
  }
}

/**
 * A collection of Connection objects.
 *
 * @extends Map
 */
class Connections extends Map {
  /**
   * Creates a new Connections list.
   *
   * @param {object[]} connections The array of connections data returned by the discord API.
   *
   * @example let myConnections = new Connections([{...}, {...}, ...]);
   */
  constructor(connections) {
    super();
    for (const c of connections) this.set(c.id, new Connection(c));

    this.set = null;
    this.clear = null;
    this.delete = null;
  }

  /**
   * Converts the connections map to a JSON object.
   * @returns {Object}
   */
  toJSON() {
    const otr = {};
    this.forEach((g, k) => {
      otr[k] = g;
    });
    return otr;
  }
}

module.exports = Connections;
