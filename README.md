# disco-oAuth

This is a library to make oauth requests to discord. It is easy to use and implement in your app, given below are the docs.

------

# Installation

Just use the following command in your favourite terminal /  command prompt.

```powershell
npm install --save disco-oauth
```

This will install it to your app, and also add it to your `package.json` file.

Next, use the following command to include it in your project: -

```js
const OAuthClient = require('disco-oauth');
```

And you're ready to go!

---

# Class Structure

* ## OAuthClient

  This is the class that is imported on using the `require()` function.

  * ### Constructor

    ```javascript
    const oauthClient = new OAuthClient(client_id, client_secret);
    ```

    **client_id** and **client_secret** can be found on your [developer's application page.](https://discordapp.com/developers/applications/)

  ---

  * ### Properties

    * **id :** *The client ID of your application.*
    * **secret :** *The client secret of your application.*
    * **creds :** *The* `Basic` *token of your application.*

    ---

    The following are only available once you have used the `getAccess()` method and an access token has been successfully generated.

    * **authScope :** *The scopes for which the access token was requested.*
    * **redirect :** *The redirect URI for which the access token was requested.*
    * **access :** *An* `Access` *object.*
    * **expiry :** *The* `timestamp` *when your access token will expire.*

    ---

  * ### Methods

    * **getAccess(code, scopes, redirectUri)**

      This method has to be used before using any other, it takes in 3 parameters: -

      1. **Code :** *The [authorization code](https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant) received.*
      2. **Scopes :** *An array of [scopes](https://discordapp.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes).*
      3. **redirectUri :** *The redirect URI registered on your developer's application page.*

      **Example :-**

      ```js
      oauthClient.getAccess(code,
                           ['identify', 'email', 'connections', 'guilds'],
                           'http://localhost:3000/login');
      ```

      **Returns :**  `null`

      **Raises :** `ConnectionError` when unable to retrieve access token.
      		`ParamError` when one of the parameters are not specified.

    * **refreshAccess()**

      This method is used to refresh your access token in case it expires.

      **Example :-**

      ```js
      oauthClient.refreshAccess();
      ```

      **Returns :** `null`

      **Raises :** `ConnectionError` when unable to refresh the access token.

    * **getAuthorizedUser()**

      This method can be used to retrieve the authorized user's details.

      **Returns :** A `User` object.
      **Raises :** `ConnectionError` when unable to retrieve the user's details.
      **Note :** *This needs you to have the* `identify` *scope.*

    * **getAuthorizedUserGuilds()**

      This method can be used to retrieve the authorized user's guilds.

      **Returns :** A `PartialGuild` object.