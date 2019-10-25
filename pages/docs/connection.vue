<template>
  <div>
    <div class="section">
      <doc-layout title="connection">
        <h1 class="title is-size-2-desktop"><u>Connection</u></h1>
        <p class="is-small">A class representing a external service connection of a user who has been authorized via OAuth2.</p>
        <hr />
        <h1 class="title is-size-4-touch">Properties <span class="tag is-info">READ-ONLY</span></h1>
        <ul class="list">
          <li class="list-item" id="id">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">id</h1>
            <p>A <string /> containing the connection's unique ID.</p>
          </li>
          <li class="list-item" id="name">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">name</h1>
            <p>A <string /> containing the user's username in the external service.</p>
          </li>
          <li class="list-item" id="service">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">service</h1>
            <p>A <string /> containing the name of the external service.</p>
          </li>
          <li class="list-item" id="is-revoked">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">isRevoked</h1>
            <p>A <boolean /> representing whether the user has revoked this connection.</p>
          </li>
          <li class="list-item" id="is-verified">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">isVerified</h1>
            <p>A <boolean /> representing whether the user has verified the connection.</p>
          </li>
          <li class="list-item" id="friend-sync">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">friendSync</h1>
            <p>A <boolean /> representing whether the user has enabled friend sync with the connection.</p>
          </li>
          <li class="list-item" id="show-activity">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">showActivity</h1>
            <p>A <boolean /> representing whether the activity related to this connection is showed in Rich Presence.</p>
          </li>
          <li class="list-item" id="is-public">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">isPublic</h1>
            <p>A <boolean /> representing whether the connection is visible on the user's profile.</p>
          </li>
          <li class="list-item" id="integrations">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">integrations</h1>
            <p>An <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank">Array</a>&lt;<nuxt-link exact prefetch :to="'/docs/integration'">Integration</nuxt-link>&gt; containing a list of the connection's server integrations. </p>
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
    name: 'connection',
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
