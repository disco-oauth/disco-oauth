# disco-OAuth

This is a library to make oauth requests to discord. It is easy to use and implement in your app, given below are the docs.

---

# Installation

Just use the following command in your favourite terminal / command prompt.

```powershell
npm install --save disco-oauth
```

This will install it to your app, and also add it to your `package.json` file.

Next, use the following command to include it in your project: -

```js
const OAuthClient = require("disco-oauth");
```

And you're ready to go!

---

# Class Structure

## OAuthClient

This is the class that is imported on using the `require()` function.

- **Constructor**

  ```javascript
  const oauthClient = new OAuthClient(client_id, client_secret);
  ```

  **client_id** and **client_secret** can be found on your [developer's application page.](https://discordapp.com/developers/applications/)

---

- **Properties**

  - **id :** _The client ID of your application._
  - **secret :** _The client secret of your application._
  - **creds :** _The_ `Basic` _token of your application._

  ***

- **Methods**

  - **setScopes(scopes)**

    This is one of the two methods that have to be used before using `getAccess(code)`.

    It takes in 1 parameter i.e. **`scopes`** which is a array of [scopes](https://discordapp.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes).

    **Example :-**

    ```js
    oauthClient.setScopes(["identify", "guilds"]);
    ```

    **Returns :** `undefined`

    **Raises :** [`ParamError`](#paramerror) when scopes are not defined.

    ***

  - **setRedirect(url)**

    This is the other method that has to be used before using `getAccess(code)`

    It also takes in one parameter i.e. `url` which is one of the redirect URIs registered on your discord application's page.

    **Example :-**

    ```js
    oauthClient.setRedirect("http:localhost:3000/login");
    ```

    **Returns :** `undefined`

    **Raises :** [`ParamError`](#paramerror) when the `url` is not defined

    ***

  - **getAuthCodeLink()**

    This is a helper function that can be used to generate a link to the OAuth2 user authentication page. _(The scopes and the redirect URI have to be set before using this method.)_

    **Example :-**

    ```js
    oauthClient.getAuthCodeLink();
    ```

    **Returns :** A `String` containing the link.

    **Raises :** [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) when the scopes or redirect URI are undefined.

    ***

  - **getAccess(code)**

    This method has to be used before using any other, it takes in 3 parameters: -

    1. **Code :** _The [authorization code](https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant) received._

    **Example :-**

    ```js
    let key = await oauthClient.getAccess(code);
    ```

    **Returns :** `String` representation of the user's access key. _(This is the user's OAuth Access token base64 encoded. It is recommended to save this key as a session variable)_

    **Raises :** [`ConnectionError`](#connectionerror) when unable to retrieve access token.
    [`ParamError`](#paramerror) when the `code` is not specified.
    [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) when the either the scopes or the redirect URI are not defined.

    ***

  - **refreshAccess(key)**

    This method is used to refresh your access token in case it expires. It takes 1 parameter i.e. the user's access `key`.

    **Example :-**

    ```js
    await oauthClient.refreshAccess(key);
    ```

    **Returns :** `null`

    **Raises :** [`ConnectionError`](#connectionerror) when unable to refresh the access token.
    [`ParamError`](#paramerror) when the key is not defined.

    ***

  - **getAccessToken(key)**

    This method can be used to get the [`Access`](https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response) of a user. It takes in one parameter i.e. the user's access `key`.

    **Example :-**

    ```js
    let access = oauthClient.getAccessToken(key);
    ```

    **Returns :** An [`Access`](https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response) object for the user.

    **Raises :** [`ParamError`](#paramerror) if the key is not defined.
    [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) if the key is invalid.

  - **getAuthorizedUser(key)**

    This method can be used to retrieve the authorized user's details. It takes 1 parameter i.e. the user's access `key`.
    **Example :-**

    ```js
    let user = await oauthClient.getAuthorizedUser(key);
    ```

    **Returns :** A [`User`](#user) object.
    **Raises :** [`ConnectionError`](#connectionerror) when unable to retrieve the user's details.

    ​ [`ParamError`](#paramerror) when the key is not defined.

    **Note :** _This needs you to have the_ `identify` _scope. Also if you have the_ `email` _scope, then the returned user will also have two extra fields -_ `email` _and_ `emailVerified`.

    ***

  - **getAuthorizedUserGuilds(key)**

    This method can be used to retrieve the authorized user's guilds. It also takes 1 parameter i.e. the user's access `key`.

    **Example :-**

    ```js
    let guilds = await oauthClient.getAuthorizedUserGuilds(key);
    ```

    **Returns :** An array of [`PartialGuild`](#partialguild) objects.
    **Raises :** [`ConnectionError`](#connectionerror) when unable to retrieve guilds.

    ​ [`ParamError`](#paramerror) when the key is undefined.

    **_Note :_** _This needs you to have the_ `guilds` _scope._

    ***

  - **getAuthorizedUserConnections(key)**

    This method can be used to retrieve the authorized user's connected accounts. It takes in 1 parameter i.e. the user's access `key`.

    **Example :-**

    ```js
    let connections = await oauthClient.getAuthorizedUserConnections(key);
    ```

    **Returns :** An array of [`Connection`](#connection) objects.
    **Raises :** [`ConnectionError`](#connectionerror) when unable to retrieve connections.
    [`ParamError`](#paramerror) when the key is undefined.

    **_Note :_** _This needs you to have the_ `connections` _scope._

---

## User

```xml
User
	|-- ID => The user ID.
	|
	|-- Username => The visible username.
	|
	|-- Discriminator => The discriminator of the user.
	|
	|-- Avatar => A link to the user's avatar.
	|
	|-- isBot => Whether the user is a bot user or human. (Boolean value)
	|
	|-- Nitro => The nitro type.
	|
	|-- Email => The user's email ID. (This needs you to have the 'email' scope)
	|
	|-- emailVerified => Whether the user has verified email or not. (Boolean value)
		(Also needs 'email' scope)
	-------------------------------------------------------------------
```

---

## PartialGuild

```xml
Guild
	|-- ID => The guild's ID.
	|
	|-- Name => The guild's name.
	|
	|-- Icon => The guild's icon URL.
	|
	|-- Owner => Whether the authorized user is the owner of the guild.
	|
	|-- userPerms => An Array of the Authorized User's Permmissions.
	-------------------------------------------------------------------------
```

[More on user Permissions here](#Permissions-List)

---

## Connection

```xml
Connection
	|-- isVerified => whether the connected account has been verified.
	|
	|-- Service => The service to which the account is connected.
	|
	|-- showActivity => whether the activity is shown as status or not.
	|
	|-- friendSync => Whether the friends are synced or not.
	|
	|-- Username => The username of the user at the service.
	|
	|-- isVisible => Whether the connection is visible on the user profile
	------------------------------------------------------------------------
```

---

## ConnectionError

```xml
ConnectionError
	|-- Code => The error code.
	|
	|-- Message => A small message defining the error code.
	|
	|-- Request => The request that was being made when the error was encountered.
	------------------------------------------------------------------------------
```

---

## ParamError

```xml
ParamError
	|-- missingParam => The name of the missing parameter.
	|
	|-- message => A message defining the error.
	|
	|-- type => The type of the missing parameter.
```

---

# Permissions List

| Permissions           | Description                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| CREATE_INSTANT_INVITE | Allows creation of instant invites                                                                                                 |
| KICK_MEMBERS          | Allows kicking members                                                                                                             |
| BAN_MEMBERS           | Allows banning members                                                                                                             |
| ADMINISTRATOR         | Allows all permissions and bypasses channel permission overwrites                                                                  |
| MANAGE_CHANNELS       | Allows management and editing of channels                                                                                          |
| MANAGE_GUILD          | Allows management and editing of the guild                                                                                         |
| ADD_REACTIONS         | Allows for the addition of reactions to messages                                                                                   |
| VIEW_AUDIT_LOG        | Allows for viewing of audit logs                                                                                                   |
| VIEW_CHANNEL          | Allows guild members to view a channel, which includes reading messages in text channels                                           |
| SEND_MESSAGES         | Allows for sending messages in a channel                                                                                           |
| SEND_TTS_MESSAGES     | Allows for sending of `/tts` messages                                                                                              |
| MANAGE_MESSAGES       | Allows for deletion of other users messages                                                                                        |
| EMBED_LINKS           | Links sent by users with this permission will be auto-embedded                                                                     |
| ATTACH_FILES          | Allows for uploading images and files                                                                                              |
| READ_MESSAGE_HISTORY  | Allows for reading of message history                                                                                              |
| MENTION_EVERYONE      | Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel |
| USE_EXTERNAL_EMOJIS   | Allows the usage of custom emojis from other servers                                                                               |
| CONNECT               | Allows for joining of a voice channel                                                                                              |
| SPEAK                 | Allows for speaking in a voice channel                                                                                             |
| MUTE_MEMBERS          | Allows for muting members in a voice channel                                                                                       |
| DEAFEN_MEMBERS        | Allows for deafening of members in a voice channel                                                                                 |
| MOVE_MEMBERS          | Allows for moving of members between voice channels                                                                                |
| USE_VAD               | Allows for using voice-activity-detection in a voice channel                                                                       |
| PRIORITY_SPEAKER      | Allows for using priority speaker in a voice channel                                                                               |
| CHANGE_NICKNAME       | Allows for modification of own nickname                                                                                            |
| MANAGE_NICKNAMES      | Allows for modification of other users nicknames                                                                                   |
| MANAGE_ROLES          | Allows management and editing of roles                                                                                             |
| MANAGE_WEBHOOKS       | Allows management and editing of webhooks                                                                                          |
| MANAGE_EMOJIS         | Allows management and editing of emojis                                                                                            |

**_Note :_** _These permissions are guild-wide and are not specific to individual channels._

---

You can also get a working example how to use the library by [clicking here.](https://repl.it/@TheDrone7/disco-oauth-example)

> Thanks for using the library
>
> Star the github repository if you appreciate the work
>
> Be sure to report me of any errors or help you might have observed.

---
