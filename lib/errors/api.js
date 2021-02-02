const errors = new Map([
  [400, 'Invalid request made'],
  [401, 'Invalid access token'],
  [403, 'Not enough permissions'],
  [404, 'Resource not found'],
  [405, 'Method not allowed'],
  [429, 'You are being rate limited'],
  [502, 'Server busy, retry after a while']
]);

/**
 * An error class depicting a discord API error.
 *
 * @extends Error
 *
 * @property {number} statusCode The status code returned in the response from the discord API request.
 * @property {string} message The error message.
 */
class APIError extends Error {
  /**
   * Generates a new discord API error.
   *
   * @param {number} code The status code returned in the response from the discord API request.
   * @param params Parameters for the Error class.
   */
  constructor(code, ...params) {
    super(...params);
    this.statusCode = code;
    this.message = errors.get(code) || 'An error occurred';
  }
}

module.exports = APIError;
