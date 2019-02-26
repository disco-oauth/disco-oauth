# disco-OAuth

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
      **Example :-**

      ```js
      let user = await oauthClient.getAuthorizedUser();
      ```

      

      **Returns :** A `User` object.
      **Raises :** `ConnectionError` when unable to retrieve the user's details.
      **Note :** *This needs you to have the* `identify` *scope.*

    * **getAuthorizedUserGuilds()**

      This method can be used to retrieve the authorized user's guilds.

      **Example :-**

      ```js
      let guilds = await oauthClient.getAuthorizedUserGuilds();
      ```

      

      **Returns :** An array of `PartialGuild` objects.
      **Raises :** `ConnectionError` when unable to retrieve guilds.

      ***Note :*** *This needs you to have the* `guilds` *scope.*

    * **getAuthorizedUserConnections()**

      This method can be used to retrieve the authorized user's connected accounts.

      **Example :-**

      ```js
      let connections = await oauthClient.getAuthorizedUserConnections();
      ```

      

      **Returns :** An array of `Connection` objects.
      **Raises :** `ConnectionError` when unable to retrieve connections.

      ***Note :*** *This needs you to have the* `connections` *scope.*

  ---

* ## Access

  ```xml
  Access
  	|-- Token => Your access token
  	|
  	|-- Type => The token type. ( Bearer by default )
  	|
  	|-- Expiry => The date-time when your access token will expire. (String format)
  	|
  	|-- Refresh => Your refresh token. (Used during `refreshAccess()` )
  	|
  	|-- Scope => The scopes in a string format. (formatted as URI)
  	----------------------------------------------------------------------
  ```

  ---

* ## User

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

* ## PartialGuild

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

  [More on user Permissions here](https://discordapp.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags) (Note: the permissions are returned as string not their integer flags.)

  ---

* ## Connection

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



# Permissions List

| Permissions           | Description |
| --------------------- | ----------- |
| CREATE_INSTANT_INVITE | Allows creation of instant invites |
| KICK_MEMBERS          | Allows kicking members |
| BAN_MEMBERS           | Allows banning members |
| ADMINISTRATOR         | Allows all permissions and bypasses channel permission overwrites |
| MANAGE_CHANNELS       | Allows management and editing of channels |
| MANAGE_GUILD          | Allows management and editing of the guild |
| ADD_REACTIONS         | Allows for the addition of reactions to messages |
| VIEW_AUDIT_LOG        | Allows for viewing of audit logs |
| VIEW_CHANNEL          | Allows guild members to view a channel, which includes reading messages in text channels |
| SEND_MESSAGES         | Allows for sending messages in a channel |
| SEND_TTS_MESSAGES     | Allows for sending of `/tts` messages |
| MANAGE_MESSAGES       | Allows for deletion of other users messages |
| EMBED_LINKS           | Links sent by users with this permission will be auto-embedded |
| ATTACH_FILES          | Allows for uploading images and files |
| READ_MESSAGE_HISTORY  | Allows for reading of message history |
| MENTION_EVERYONE      | Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel |
| USE_EXTERNAL_EMOJIS   | Allows the usage of custom emojis from other servers |
| CONNECT               | Allows for joining of a voice channel |
| SPEAK                 | Allows for speaking in a voice channel |
| MUTE_MEMBERS          | Allows for muting members in a voice channel |
| DEAFEN_MEMBERS        | Allows for deafening of members in a voice channel |
| MOVE_MEMBERS          | Allows for moving of members between voice channels |
| USE_VAD               | Allows for using voice-activity-detection in a voice channel |
| PRIORITY_SPEAKER      | Allows for using priority speaker in a voice channel |
| CHANGE_NICKNAME                      | Allows for modification of own nickname |
| MANAGE_NICKNAMES | Allows for modification of other users nicknames |
| MANAGE_ROLES | Allows management and editing of roles |
| MANAGE_WEBHOOKS | Allows management and editing of webhooks |
| MANAGE_EMOJIS | Allows management and editing of emojis |

***Note :*** *These permissions are guild-wide and are not specific to individual channels.*

---

