/**
 * An integration account object.
 * @typedef {Object} Account
 *
 * @property {string} id The ID of the account.
 * @property {string} name The username of the account.
 */

/**
 * A server integration object.
 * @typedef {Object} Integration
 *
 * @property {string} id The integration ID.
 * @property {string} name The integration name.
 * @property {string} type The service which has been integrated.
 * @property {boolean} enabled Whether the integration is enabled.
 * @property {boolean} syncing Whether the integration is synced.
 * @property {boolean} role_id The ID that the integration uses for "subscribers"
 * @property {number} expire_behavior The behavior of expiring users.
 * @property {number} expire_grace_period The grace period before expiring subscribers.
 * @property {Object} A discord user object.
 * @property {Account} An account object.
 * @property {string} An ISO8601 TimeStamp of when this integration was last synced.
 */

/**
 * Path settings for middleware functions.
 * @typedef {Object} PathSettings
 *
 * @property {string} auth The path where the user needs to be redirected to for authentication.
 * @property {string} login The path where the user will be once authenticated and access code is fetched.
 * @property {Array<string>|string} all The paths where all of the user's data will be available.
 * @property {Array<string>|string} user The paths where just the user object will be available.
 * @property {Array<string>|string} guilds The paths where just the user's guilds will be available.
 * @property {Array<string>|string} connections The paths where just the user's connections will be available.
 */

/**
 * Helper middleware settings
 * @typedef {Object} MiddlewareSettings
 *
 * @property {string} id The discord application's client ID.
 * @property {string} secret The discord application's client secret,
 * @property {Array<string>} scopes The OAuth2 scopes that will authorize.
 * @property {string} base The base url for all the paths in Path settings.
 * @property {PathSettings} paths The path settings for various purposes.
 * @property {string} redirect The url where the user will be redirected to after authentication.
 */

/**
 * Discord OAuth2 details object.
 * @typedef {Object} OAuthDetails
 *
 * @property {Client} client The disco-oauth client.
 */
