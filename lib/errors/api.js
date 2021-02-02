/**
 * An error class depicting a discord API error.
 *
 * @property {number} response The response from the discord API request.
 * @property {string} message The error message.
 */
class APIError extends Error {
  /**
   * Generates a new discord API error.
   *
   * @param {ServerResponse} response The response from the discord API request.
   */
  constructor(response) {
    super(
      `[${new Date().toLocaleString()}] :: Discord API Error encountered.\n${
        response.body.error ? response.body.error_description : response.body.message
      }\n`
    );
  }
}

module.exports = APIError;
