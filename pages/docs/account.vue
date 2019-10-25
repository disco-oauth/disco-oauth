<template>
  <div class="section">
    <doc-layout title="ig-account">
      <h1 class="title is-size-2-desktop"><u>Account</u></h1>
      <p class="is-small">A integration account for the server-integrations enabled by the user.</p>
      <hr />
      <p>Visit <a href="https://discordapp.com/developers/docs/resources/guild#integration-account-object" target="_blank">official discord documentation</a> for more info.</p>
    </doc-layout>
  </div>
</template>

<script>
  import DocLayout from '../../components/docpage'
  export default {
    name: 'account',
    components: { DocLayout }
  }
</script>

<style scoped>

</style>
