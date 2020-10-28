<template>
  <div>
    <div class="section">
      <doc-layout title="user">
        <h1 class="title is-size-2-desktop"><u>User</u></h1>
        <p class="is-small">A class representing a Discord User who has been authorized via OAuth2.</p>
        <hr />
        <h1 class="title is-size-4-touch">Properties <span class="tag is-info">READ-ONLY</span></h1>
        <ul class="list">
          <li class="list-item" id="username">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">username</h1>
            <p>A <string /> containing the user's username.</p>
          </li>
          <li class="list-item" id="locale">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">locale</h1>
            <p>A <string /> containing the user's locale.</p>
          </li>
          <li class="list-item" id="is-mfa-enabled">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">isMFAEnabled</h1>
            <p>A <boolean /> representing whether the user has enabled 2-factor authentication.</p>
          </li>
          <li class="list-item" id="discriminator">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">discriminator</h1>
            <p>A <number /> equivalent to the user's discriminator.</p>
          </li>
          <li class="list-item" id="id">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">id</h1>
            <p>A <string /> containing the user's unique discord ID.</p>
          </li>
          <li class="list-item" id="email-id">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">emailId</h1>
            <p>A <string /> containing the user's E-Mail ID.</p><br />
            <b>Requires the <code>email</code> OAuth2 Scope.</b>
          </li>
          <li class="list-item" id="email-verified">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">emailVerified</h1>
            <p>A <boolean /> representing whether the user has verified their E-Mail ID.</p><br />
            <b>Requires the <code>email</code> OAuth2 Scope.</b>
          </li>
          <li class="list-item" id="avatar-hash">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">avatarHash</h1>
            <p>A <string /> containing the user's avatar hash.</p>
          </li>
          <li class="list-item" id="user-flags">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">userFlags</h1>
            <p>A <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank">Array</a>&lt;<string />&gt; containing the user's profile's flags.</p>
          </li>
          <li class="list-item" id="premium-type">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">premiumType</h1>
            <p>A <string /> containing the user's premium subscription type (<code>'None'</code> or <code>'Nitro'</code> or <code>'Nitro Classic'</code>).</p>
          </li>
          <li class="list-item" id="bot">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">bot</h1>
            <p>A <boolean /> representing whether the authorized user is a bot user.</p>
          </li>
          <li class="list-item" id="created-timestamp">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">createdTimestamp</h1>
            <p>A <number /> equivalent to the timestamp of the user's account creation time.</p>
          </li>
          <li class="list-item" id="created-at">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">createdAt</h1>
            <p>A <string /> representing the time of creation of the user's account in UTC.</p>
          </li>
        </ul>
        <hr />
        <h1 class="title is-size-4-touch">Methods</h1>
        <ul class="list">
          <li class="list-item">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">avatarUrl(size)</h1>
            <p>Generates a link to the user's avatar of desired size.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li><code>size</code>&#8195;The size of the desired avatar link (in pixels). Defaults to <strong>512px</strong>.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myUser.avatarUrl(1024);</codeblock>
            <br />
            <strong>Returns :</strong> (<string />) The link to the avatar.
          </li>
        </ul>
        <hr />
      </doc-layout>
    </div>
  </div>
</template>

<script>
  import DocLayout from '../../components/docpage.vue';
  import Codeblock from '../../components/codeblock.vue';
  import String from '../../components/typelinks/string.vue'
  import Promise from '../../components/typelinks/promise.vue'
  import Boolean from '../../components/typelinks/boolean.vue'
  import Number from '../../components/typelinks/number.vue'
  export default {
    name: 'user',
    components: { Boolean, Promise, String, Codeblock, DocLayout, Number}
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
