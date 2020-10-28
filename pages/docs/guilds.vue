<template>
  <div>
    <div class="section">
      <doc-layout title="guilds">
        <h1 class="title is-size-2-desktop"><u>Guilds</u></h1>
        <p class="subtitle">extends <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank">Map</a></p>
        <p class="is-small">A collection of <nuxt-link exact   prefetch :to="'/docs/guild'">Guild</nuxt-link> objects mapped to their corresponding IDs.</p>
        <hr />
        <h1 class="title is-size-4-touch">Methods</h1>
        <ul class="list">
          <li class="list-item">
            <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">toJSON()</h1>
            <p>Returns a JSON object containing a key-value pairs with the key being the guild ID and the value being the guild object.</p>
            <br />
            <strong>Example: -</strong>
            <codeblock>myGuilds.toJSON();</codeblock>
            <br />
            <strong>Returns :</strong> (<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank">Object</a>) A json object containing a key-value pair in the format - <code>{"guildId": guildData}</code>.
          </li>
        </ul>
        <hr />
        <p>
          This class is void of the following functions of the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank">Map</a> class: -
        </p>
        <ul>
          <li>set</li>
          <li>clear</li>
          <li>delete</li>
        </ul>
        <p>This has been done to avoid loss/modification of the list of guilds.</p>
        <hr />
      </doc-layout>
    </div>
  </div>
</template>

<script>
  import DocLayout from '../../components/docpage.vue';
  import String from '../../components/typelinks/string.vue'
  import Boolean from '../../components/typelinks/boolean.vue'
  import Number from '../../components/typelinks/number.vue'
  import Codeblock from '../../components/codeblock'
  export default {
    name: 'guilds',
    components: { Codeblock, Boolean, String, DocLayout, Number}
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
