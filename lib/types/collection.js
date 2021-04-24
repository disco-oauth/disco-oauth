/**
 * A collection class that can be used to store and fetch data.
 *
 * @extends Map
 * @property {Client} client The client that contains this collection.
 */
class Collection extends Map {
  /**
   * Creates a new discord OAuth2 collection.
   *
   * @param { Client } client The client who owns this collection.
   * @param { Array<object> } values The set of default values (each value object must have a 'id' field).
   *
   * @example let myCollection = new Collection(myClient, [{...}, {...}, ...]);
   */
  constructor(client, values) {
    super();
    if (values) for (const v of values) if (typeof v.id !== 'undefined') this.set(v.id, v);
    this.client = client;
  }
}

/**
 * The user collection class. This is a collection of the {User} object. This is used for caching.
 *
 * @extends Collection
 */
class UserCollection extends Collection {
  /**
   * Creates a new user collection.
   * @param {object} params Same parameters as a normal collection.
   */
  constructor(...params) {
    super(...params);
  }

  /**
   * Fetches user's details and updates the cache.
   *
   * @async
   * @param {string} key The user key of the user whose details are required.
   * @param {boolean} refresh If true, fetches data from the discord API, if set to false, fetches from the cache instead.
   * @returns {Promise<User>} The user whose user key was provided.
   *
   * @example let myFavUser = myUserCollection.fetch('my-fav-user\'s key'); // Gets from the collection if available.
   * @example let myFavUser = myUserCollection.fetch('my-fav-user\'s key', true); // Gets from discord API only.
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
 *
 * @extends Collection
 */
class GuildsCollection extends Collection {
  /**
   * Creates a new guilds collection.
   * @param {object} params Same as a normal collection's parameters.
   */
  constructor(...params) {
    super(...params);
  }

  /**
   * Fetches user's guilds and updates the cache.
   *
   * @async
   * @param {string} key The user key of the user whose guilds are to be fetched.
   * @param {boolean} refresh If true, fetches guilds from the discord API, if set to false, fetches from the cache instead.
   * @returns {Promise<Guilds>} The guilds of the user whose user key was provided.
   *
   * @example let myFavGuilds = myGuildCollection.fetch('my-fav-user\'s key'); // Gets from the collection if available.
   * @example let myFavGuilds = myGuildCollection.fetch('my-fav-user\'s key', true); // Gets from discord API only.
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
 *
 * @extends Collection
 */
class ConnectionsCollection extends Collection {
  /**
   * Creates a new connections collection.
   * @param {object} params The same as a normal collection's parameters.
   */
  constructor(...params) {
    super(...params);
  }

  /**
   * Fetches user's connections and updates the cache.
   *
   * @async
   * @param {string} key They user key of the user whose connections are to be fetched.
   * @param {boolean} refresh If true, fetches connections from the discord API, if set to false, fetches from the cache instead.
   * @returns {Promise<Connections>} The connections of the user whose user key was provided.
   *
   * @example let myFavConnections = myConnCollection.fetch('my-fav-user\'s key'); // Gets from the collection if available.
   * @example let myFavConnections = myConnCollection.fetch('my-fav-user\'s key', true); // Gets from discord API only.
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
