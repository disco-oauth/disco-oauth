<template>
  <div>
    <div class="section">
      <doc-layout title="guild">
        <h1 class="title is-size-2-desktop"><u>Guild</u></h1>
        <p class="is-small">A class representing a Discord Guild of a user who has been authorized via OAuth2.</p>
        <hr />
        <h1 class="title is-size-4-touch">Properties <span class="tag is-info">READ-ONLY</span></h1>
        <ul class="list">
          <li class="list-item" id="id">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">id</h1>
            <p>A <string /> containing the guild's ID.</p>
          </li>
          <li class="list-item" id="name">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">name</h1>
            <p>A <string /> containing the guild's name.</p>
          </li>
          <li class="list-item" id="icon-hash">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">iconHash</h1>
            <p>A <string /> containing the guild's icon hash.</p>
          </li>
          <li class="list-item" id="features">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">features</h1>
            <p>A <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank">Array</a>&lt;<string />&gt; containing the guild's features.</p>
          </li>
          <li class="list-item" id="is-owner">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">isOwner</h1>
            <p>A <boolean /> representing whether the authorized user is the owner of this guild.</p>
          </li>
          <li class="list-item" id="permissions">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">permissions</h1>
            <p>A <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank">Array</a>&lt;<string />&gt; containing the user's guild-specific discord permissions.</p>
          </li>
          <li class="list-item" id="created-timestamp">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">createdTimestamp</h1>
            <p>A <number /> equivalent to the timestamp of the guild's creation time.</p>
          </li>
          <li class="list-item" id="created-at">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">createdAt</h1>
            <p>A <string /> representing the time of creation of the guild in UTC.</p>
          </li>
        </ul>
        <hr />
        <h1 class="title is-size-4-touch">Methods</h1>
        <ul class="list">
          <li class="list-item">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">iconUrl(size)</h1>
            <p>Generates a link to the guild's icon of desired size.</p>
            <br />
            <strong>Parameters: -</strong>
            <ul>
              <li><code>size</code>&#8195;The size of the desired icon (in pixels). Defaults to <strong>512px</strong>.</li>
            </ul>
            <br />
            <strong>Example: -</strong>
            <codeblock>myGuild.iconUrl();</codeblock>
            <br />
            <strong>Returns :</strong> (<string />) The link to the guild's icon.
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
    name: 'guild',
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
