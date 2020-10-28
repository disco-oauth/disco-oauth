<!--suppress ALL -->
<template @scroll="scrolled">
  <div @scroll="scrolled">
    <nav class="navbar" :class="{'is-fixed-top': hasScrolled}" role="navigation" aria-label="main navigation" id="navbar">
      <div class="navbar-brand">
        <nuxt-link exact to="/" prefetch class="navbar-item">Disco-OAuth</nuxt-link>
        <a role="button" class="navbar-burger" @click="showMenu = !showMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
        <div class="navbar-menu" :class="{'is-active': showMenu}">
          <div class="navbar-start">
            <nuxt-link exact class="navbar-item" v-for="link in links" :key="link.name" prefetch :to="link.href">{{ link.name }}</nuxt-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button" target="_blank" :class="`is-${link.color}`" v-for="link in buttons" :key="link.name" :href="link.href">{{ link.name }}</a>
              </div>
            </div>
          </div>
        </div>
    </nav>
    <nuxt />
  </div>
</template>

<script>
  export default {
    mounted() {
      document.addEventListener('scroll', this.scrolled);
    },
    methods: {
      scrolled() {
        if (process.client){
          this.scrollLength = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
          this.hasScrolled = (document.getElementById('navbar').scrollHeight <= (this.scrollLength + 50)) && window.location.href.split('/').pop() !== '';
        }
      }
    },
    data() {
      return {
        showMenu: false,
        scrollLength: 0,
        hasScrolled: false,
        links: [
          {name: 'Documentation', href: '/docs'}
        ],
        buttons: [
          {name: 'GitHub', href: 'https://github.com/TheDrone7/disco-oauth', color: 'success'},
          {name: 'NPM', href: 'https://npmjs.com/package/disco-oauth', color: 'warning'}
        ]
      }
    }
  }
</script>

<style>
  .navbar-start {
    margin-left: 12px;
  }
</style>
