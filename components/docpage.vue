<template>
  <div class="columns">
    <aside class="menu column is-one-quarter-desktop is-full-touch">
      <p class="menu-label">Topics</p>
      <ul class="menu-list">
        <li><nuxt-link exact :to="'/docs'" :class="{'is-active': title === 'get-started'}">Get Started</nuxt-link></li>
      </ul>
      <p class="menu-label">Classes</p>
      <ul class="menu-list">
        <li><nuxt-link exact :to="'/docs/client'" :class="{'is-active': title === 'client'}">Client</nuxt-link></li>
        <li><nuxt-link exact :to="'/docs/connection'" :class="{'is-active': title === 'connection'}">Connection</nuxt-link></li>
        <li><nuxt-link exact :to="'/docs/connections'" :class="{'is-active': title === 'connections'}">Connections</nuxt-link></li>
        <li><nuxt-link exact :to="'/docs/guild'" :class="{'is-active': title === 'guild'}">Guild</nuxt-link></li>
        <li><nuxt-link exact :to="'/docs/guilds'" :class="{'is-active': title === 'guilds'}">Guilds</nuxt-link></li>
        <li><nuxt-link exact :to="'/docs/user'" :class="{'is-active': title === 'user' }">User</nuxt-link></li>
      </ul>
      <p class="menu-label">Typedefs</p>
      <ul class="menu-list">
        <li><nuxt-link exact :to="'/docs/account'" :class="{'is-active': title === 'ig-account'}">Account</nuxt-link></li>
        <li><nuxt-link exact :to="'/docs/integration'" :class="{'is-active': title === 'integration'}">Integration</nuxt-link></li>
        <li><nuxt-link exact :to="'/docs/scope'" :class="{'is-active': title === 'scope'}">Scope</nuxt-link></li>
      </ul>
    </aside>
    <div class="column is-three-quarters-desktop is-full-touch">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    name: 'doc-layout'
  }
</script>

<style scoped>
  @media only screen and (min-width: 1024px) {
    aside {
      border-right: thin #cdcdcd solid;
    }
  }
  @media only screen and (max-width: 1024px) {
    aside {
      border-bottom: thin #cdcdcd solid;
    }
  }
  ul {
    list-style-type: none !important;
  }
</style>
