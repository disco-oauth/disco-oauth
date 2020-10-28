<template>
  <div>
    <div class="section">
      <doc-layout title="client">
        <h1 class="title is-size-2-desktop"><u>Client</u></h1>
        <p class="is-small">A class representing a Discord OAuth2 Client provided by the library.</p>
        <hr />
        <h1 class="title is-size-4-touch">Properties</h1>
        <ul class="list">
          <li class="list-item" id="auth-code-link">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">authCodeLink <span class="tag is-info">READ-ONLY</span></h1>
            <p>A string generated after setting a value for scopes and redirect URI where the user needs to be redirected for authentication.</p>
          </li>
          <li class="list-item" id="redirect">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">redirectURI</h1>
            <p>A string that contains one of the redirect URIs of your discord app. For example: -</p>
            <codeblock>'http%3A%2F%2Flocalhost%3A3000%2Flogin'</codeblock>
            <p>After authentication the user would be redirected to the URL: -</p>
            <codeblock>http://localhost:3000/login</codeblock>
          </li>
          <li class="list-item" id="scopes">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">scopes</h1>
            <p>An array of <nuxt-link exact prefetch :to="'/docs/scope'">Discord OAuth2 scopes</nuxt-link>. For example: -</p>
            <codeblock>['identify', 'guilds']</codeblock>
          </li>
        </ul>
        <hr />
        <h1 class="title is-size-4-touch">Methods</h1>
        <ul class="list">
          <li class="list-item" id="get-access">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">getAccess(code) <span class="tag is-success">ASYNC</span> </h1>
            <p>Gets the access token from discord API and returns a user-specific <code>key</code>.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li class="list-item"><code>code</code>&#8195;The <a target="_blank" href="https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant">authorization code</a> received at the redirect URI.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myClient.getAccess(req.query.code); // This actually works if you're using express</codeblock>
            <br />
            <strong>Returns :</strong> (<promise type="resolve"><string /></promise>) A user-specific key, a <a target="_blank" href="https://jwt.io">JWT</a> of the user's <a target="_blank" href="https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response">access token response</a>. <i>(It is recommended to store this as a session variable.)</i>
            <br />
            <strong>Raises :</strong> (<promise type="reject"><js-error /></promise>) OR <promise type="reject"><nuxt-link to="/docs/api-error" prefetch exact>APIError</nuxt-link></promise>.
          </li>
          <li class="list-item" id="get-user">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">getUser(key) <span class="tag is-success">ASYNC</span> </h1>
            <p>Gets a <nuxt-link exact prefetch :to="'/docs/user'">user</nuxt-link> from discord whose user-specific <strong>key</strong> is provided.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li class="list-item"><code>key</code>&#8195;The user-specific key of the user whose details are to be fetched.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myClient.getUser(req.cookies.userKey);</codeblock>
            <br />
            <strong>Returns :</strong> (<promise type="resolve"><nuxt-link exact prefetch :to="'/docs/user'">User</nuxt-link></promise>) Details of the authorized user.
            <br />
            <strong>Raises :</strong> (<promise type="reject"><js-error /></promise>) OR <promise type="reject"><nuxt-link to="/docs/api-error" prefetch exact>APIError</nuxt-link></promise>.
          </li>
          <li class="list-item" id="get-guilds">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">getGuilds(key) <span class="tag is-success">ASYNC</span> </h1>
            <p>Gets the <nuxt-link exact prefetch :to="'/docs/guilds'">guilds</nuxt-link> from discord of the user whose user-specific <strong>key</strong> is provided.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li class="list-item"><code>key</code>&#8195;The user-specific key of the user whose guilds are to be fetched.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myClient.getGuilds(req.cookies.userKey);</codeblock>
            <br />
            <strong>Returns :</strong> (<promise type="resolve"><nuxt-link exact prefetch :to="'/docs/guilds'">Guilds</nuxt-link></promise>) A collection of the user's guilds.
            <br />
            <strong>Raises :</strong> (<promise type="reject"><js-error /></promise>) OR <promise type="reject"><nuxt-link to="/docs/api-error" prefetch exact>APIError</nuxt-link></promise>.
          </li>
          <li class="list-item" id="get-connections">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">getConnections(key) <span class="tag is-success">ASYNC</span> </h1>
            <p>Gets the <nuxt-link exact prefetch :to="'/docs/connections'">connections</nuxt-link> from discord of the user whose user-specific <strong>key</strong> is provided.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li class="list-item"><code>key</code>&#8195;The user-specific key of the user whose connections are to be fetched.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myClient.getConnections(req.cookies.userKey);</codeblock>
            <br />
            <strong>Returns :</strong> (<promise type="resolve"><nuxt-link exact prefetch :to="'/docs/connections'">Connections</nuxt-link></promise>) A collection of the user's connections.
            <br />
            <strong>Raises :</strong> (<promise type="reject"><js-error /></promise>) OR <promise type="reject"><nuxt-link to="/docs/api-error" prefetch exact>APIError</nuxt-link></promise>.
          </li>
          <li class="list-item" id="refresh-access">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">refreshAccess(key) <span class="tag is-success">ASYNC</span> </h1>
            <p>Fetches a new <a target="_blank" href="https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response">access token</a> for the user whose user-specific <strong>key</strong> is provided. This can be used to get new <a href="https://discordapp.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response" target="_blank">access token</a> for users whose old one has expired.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li class="list-item"><code>key</code>&#8195;The user-specific key of the user whose access token is to be refreshed.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myClient.refreshToken(req.cookies.userKey);</codeblock>
            <br />
            <strong>Returns :</strong> (<promise type="resolve"><string /></promise>) A new user-specific key.
            <br />
            <strong>Raises :</strong> (<promise type="reject"><js-error /></promise>) OR <promise type="reject"><nuxt-link to="/docs/api-error" prefetch exact>APIError</nuxt-link></promise>.
          </li>
          <li class="list-item" id="set-redirect">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">setRedirect(uri)</h1>
            <p>Sets the <a href="#redirect">redirect URI</a> for requests that're going to be made.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li class="list-item"><code>uri</code>&#8195;The redirect URI.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myClient.setRedirect('http%3A%2F%2Flocalhost%3A3000%2Flogin');</codeblock>
            <br />
            <strong>Returns :</strong> (<a href="#">Client</a>) The client with the redirect URI set.
            <br />
            <strong>Raises :</strong> (<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">Error</a>)
          </li>
          <li class="list-item" id="set-scopes">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">setScopes(...scopes)</h1>
            <p>Sets the <a href="#scopes">OAuth2 scopes</a> for requests that're going to be made.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li class="list-item"><code>...scopes</code>&#8195;The <nuxt-link exact prefetch :to="'/docs/scope'">OAuth2 scopes</nuxt-link>.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myClient.setScopes('identify', 'guilds');</codeblock>
            <br />
            <strong>Returns :</strong> (<a href="#">Client</a>) The client with the scopes set.
            <br />
            <strong>Raises :</strong> (<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">Error</a>)
          </li>
        </ul>
      </doc-layout>
    </div>
  </div>
</template>

<script>
  import DocLayout from '../../components/docpage.vue';
  import Codeblock from '../../components/codeblock.vue';
  import String from '../../components/typelinks/string'
  import Promise from '../../components/typelinks/promise'
  import JsError from '../../components/typelinks/jserror'
  export default {
    name: 'client',
    components: { JsError, Promise, String, Codeblock, DocLayout}
  }
</script>

<style scoped>
  .list {list-style-type: none !important;}
  .list > li {
    margin-top: 16px !important;
    border-bottom: 1px solid black;
    padding-bottom: 16px;
  }
  ul {
    list-style-type: disc !important;
  }
  ul li {
    margin-left: 12px;
  }
</style>
