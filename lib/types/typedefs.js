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
