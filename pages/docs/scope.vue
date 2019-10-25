<template>
  <div class="section">
    <doc-layout title="scope">
      <h1 class="title is-size-2-desktop"><u>Scope</u> <span class="tag is-danger"><string /></span> </h1>
      <p class="is-small">A <a href="https://discordapp.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes" target="_blank">Discord's OAuth2 scope</a>. Allowed values: -</p>
      <ul>
        <li>bot</li>
        <li>connections</li>
        <li>email</li>
        <li>identify</li>
        <li>guilds</li>
        <li>guilds.join</li>
        <li>gdm.join</li>
        <li>messages.read</li>
        <li>rpc</li>
        <li>rpc.api</li>
        <li>rpc.notifications.read</li>
        <li>webhook.incoming</li>
      </ul>
      <hr />
    </doc-layout>
  </div>
</template>

<script>
  import DocLayout from '../../components/docpage'
  import String from '../../components/typelinks/string'
  export default {
    name: 'scope',
    components: { String, DocLayout }
  }
</script>

<style scoped>
  .tag > * {
    color: white !important;
  }
  ul {
    list-style-type: disc !important;
  }
  ul > li {
    margin-left: 12px !important;
  }
</style>
