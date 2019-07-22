class ParamError {
  /**
   * 
   * @param {String} param 
   * @param {String} type 
   */
  constructor(param, type) {
    this.missingParam = param;
    this.paramType = type;
    this.message(`${param} was not specified which is of the type ${type}.`);
  }

}

class ConnectionError {
  /**
   * Error thrown when the Request returns no content
   * @param {Number} code The response status code
   * @param {String} request The request that was taking place while the error happened.
   */
  constructor(code, request) {
    this.code = code;

    switch (code) {
      case 204:
        this.message = "No content returned";
        break;

      case 304:
        this.message = "No action taken";
        break;

      case 400:
        this.message = "Bad request made";
        break;

      case 401:
        this.message = "Authorization failed";
        break;

      case 403:
        this.message = "Forbidden request";
        break;

      case 404:
        this.message = "Not found";
        break;

      case 405:
        this.message = "Not allowed";
        break;

      case 429:
        this.message = "Rate limited";
        break;

      case 502:
        this.message = "Gateway unavailable";
        break;

      case 444:
        this.message = "Access expired";
        break;

      default:
        this.message = "An error occurred.";
        break;
    }

    this.request = request;
  }

}

module.exports = {
  "ConnectionError": ConnectionError,
  "ParamError": ParamError
};