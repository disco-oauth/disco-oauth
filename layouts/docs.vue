<template>
  <div class="home">
    <div class="sidebar">
      <div v-for="section in sections" :key="section.name">
        <div class="section-title" v-text="section.name" />
        <ul class="side-section">
          <li v-for="(title, link) in section.list" :key="link">
            <nuxt-link :to="'/docs/' + link" prefetch exact>{{ title }}</nuxt-link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
    <div class="main-body">
      <nuxt />
    </div>
  </div>
</template>

<style>
  .topic {
    width: 75%;
  }
  .left-aligned {
    text-align: left;
  }
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .home {
    display: flex;
  }
  .sidebar {
    width: 20%;
    border-right: 1px #ccc solid;
    z-index: 10;
    text-align: left;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 16px;
  }
  .main-body {
    width: 80%;
    overflow: scroll;
  }
  .section-title {
    color: #cccccc;
  }
  hr {
    width: 80%;
    height: 1px;
    border: none;
    background-color: #cccccc;
    color: #cccccc;
    text-align: center;
    margin: 32px auto;
  }

  .side-section {
    list-style-type: none;
  }
  .side-section * {
    text-decoration: none;
    color: #eeffff;
    border-radius: 6px;
    transition: background-color linear 100ms, color linear 10ms;
  }
  .side-section *:hover {
    color: #00ffff;
    background-color: #000000;
  }
  .side-section a {
    color: inherit;
    display: block;
    padding: 4px 12px;
  }
  code {
    padding: 4px;
    border-radius: 4px;
    background-color: #cccccc;
    color: #cc0000;
    font-weight: bold;
    font-family: monospace;
  }
</style>

<script>
  export default {
    data: () => ({
      sections: [
        {
          name: 'TOPICS',
          list: {
            '': 'Get Started',
            'change-log': 'Changelog',
            'migtation': 'Migration Guide'
          }
        },
        {
          name: 'CLASSES',
          list: {
            'api-error': 'API Error',
            'client': 'Client',
            'connection': 'Connection',
            'connections': 'Connections',
            'guild': 'Guild',
            'guilds': 'Guilds',
            'user': 'User'
          }
        },
        {
          name: 'TYPEDEFS',
          list: {
            'account': 'Account',
            'integration': 'Integration',
            'scope': 'Scope'
          }
        }
      ]
    })
  }
</script>
