/**
 * A collection class that can be used to store and fetch data.
 *
 * @property {Client} client The client that contains this collection.
 */
class Collection extends Map {
  /**
   * Creates a new discord OAuth2 collection.
   * @param { Client } client
   * @param { Array<object> } values
   */
  constructor(client, values) {
    super();
    for (const v of values) if (typeof v.id !== 'undefined') this.set(v.id, v);
    this.client = client;
  }
}

/**
 * The user collection class. This is a collection of the {User} object. This is used for caching.
 */
class UserCollection extends Collection {
  /**
   * Creates a new user collection.
   * @param params
   */
  constructor(...params) {
    super(...params);
  }

  /**
   * Fetches user's details and updates the cache.
   * @param {string} key
   * @returns {Promise<UserCollection>}
   */
  async fetch(key) {
    return new Promise((resolve, reject) => {
      this.client.getUser(userKey).then(user => {
        this.set(userKey, user);
        resolve(this);
      }).catch(reject);
    });
  }
}

/**
 * The guilds collection class. This is not the collection of guilds but the collection of the {Guilds} object. This is used for caching.
 */
class GuildsCollection extends Collection {
  /**
   * Creates a new guilds collection.
   * @param params
   */
  constructor(...params) {
    super(...params);
  }

  /**
   * Fetches user's guilds and updates the cache.
   * @param {string} key
   * @returns {Promise<GuildsCollection>}
   */
  async fetch(key) {
    return new Promise((resolve, reject) => {
      this.client.getGuilds(userKey).then(guilds => {
        this.set(userKey, guilds);
        resolve(this);
      }).catch(reject);
    });
  }
}

/**
 * The connections collection class. This is not the collection of connections but the collection of the {Connection} object. This is used for caching.
 */
class ConnectionsCollection extends Collection {
  /**
   * Creates a new connections collection.
   * @param params
   */
  constructor(...params) {
    super(...params);
  }

  /**
   * Fetches user's connections and updates the cache.
   * @param {string} key
   * @returns {Promise<ConnectionsCollection>}
   */
  async fetch(key) {
    return new Promise((resolve, reject) => {
      this.client.getConnections(userKey).then(connections => {
        this.set(userKey, connections);
        resolve(this);
      }).catch(reject);
    });
  }
}


module.exports = { Collection, UserCollection, GuildsCollection, ConnectionsCollection };