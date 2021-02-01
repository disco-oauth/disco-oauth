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
    if (values) for (const v of values) if (typeof v.id !== 'undefined') this.set(v.id, v);
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
   * @param {string} key The user key of the user whose details are required.
   * @param {boolean} refresh If true, fetches data from the discord API, if set to false, fetches from the cache instead.
   * @returns {Promise<User>}
   */
  async fetch(key, refresh = false) {
    return new Promise((resolve, reject) => {
      if (this.has(key) && !refresh) resolve(this.get(key));
      else
        this.client
          .getUser(key)
          .then(user => {
            this.set(key, user);
            resolve(user);
          })
          .catch(reject);
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
   * @param {string} key The user key of the user whose guilds are to be fetched.
   * @param {boolean} refresh If true, fetches guilds from the discord API, if set to false, fetches from the cache instead.
   * @returns {Promise<Guilds>}
   */
  async fetch(key, refresh = false) {
    return new Promise((resolve, reject) => {
      if (this.has(key) && !refresh) resolve(this.get(key));
      else
        this.client
          .getGuilds(key)
          .then(guilds => {
            this.set(key, guilds);
            resolve(guilds);
          })
          .catch(reject);
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
   * @param {string} key They user key of the user whose connections are to be fetched.
   * @param {boolean} refresh If true, fetches connections from the discord API, if set to false, fetches from the cache instead.
   * @returns {Promise<Connections>}
   */
  async fetch(key, refresh = false) {
    return new Promise((resolve, reject) => {
      if (this.has(key) && !refresh) resolve(this.get(key));
      else
        this.client
          .getConnections(key)
          .then(connections => {
            this.set(key, connections);
            resolve(connections);
          })
          .catch(reject);
    });
  }
}

module.exports = {
  Collection,
  UserCollection,
  GuildsCollection,
  ConnectionsCollection
};
