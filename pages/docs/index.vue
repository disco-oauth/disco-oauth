<template>
  <div>
    <div class="section">
      <doc-layout title="get-started">
        <h1 class="title is-size-2-desktop"><u>Get Started</u></h1>

        <div class="section">
          <h1 class="title is-size-5-touch">1. Pre-requisite knowledge</h1>
          <p>We expect you to be familiar with the following technologies: -</p>
          <ul>
            <li><a href="https://nodejs.org" target="_blank">Node.js</a></li>
            <li><a href="https://npmjs.com" target="_blank">NpmJs</a></li>
            <li><a href="https://oauth.net/2/" target="_blank">OAuth2</a></li>
            <li><a href="https://restfulapi.net" target="_blank">Restful APIs</a></li>
          </ul>
          <hr />
          <h1 class="title is-size-5-touch">2. Installation</h1>
          <p><strong>Disco-OAuth</strong> can be installed using <code>npm</code> or <code>yarn</code> whichever you prefer!</p>
          <br />
          <p>NPM users can use the following command in their preferred command line tool: -</p>
          <codeblock>
            <p>$ &#8195;npm install --save disco-oauth</p>
          </codeblock>
          <p>While the yarn users can use the following command in their preferred command line tool: -</p>
          <codeblock>
            <p>$ &#8195;yarn add disco-oauth</p>
          </codeblock>
          <p class="notification is-warning">You can use <strong>TheDrone7/disco-oauth</strong> instead of <strong>disco-oauth</strong> to get the latest under development versions of the library.</p>
          <hr />
          <h1 class="title is-size-5-touch">3. Usage</h1>
          <p>Now that you have installed it, you can use <strong>disco-oauth</strong> however you want to!</p>
          <p>To get started, you can import in your <code>.js</code> file as shown below: -</p>
          <codeblock>
            <p>
              const OAuthClient = require('disco-oauth');<br />
              const Client = new OAuthClient('my-discord-app-id', 'my-discord-app-secret');
            </p>
          </codeblock>
          <p>Normally, you'd want to keep the <strong>app secret</strong> hidden. You can achieve this by storing it as an environment variable and then accessing it using <code>process.env.mySecret</code></p>
          <p>The above 2 lines will instantiate an OAuthClient for your app to be used.<br /><nuxt-link exact prefetch :to="'/docs/client'">Click here</nuxt-link> to view documentations for the <strong>Client</strong> class.</p>
        </div>
      </doc-layout>
    </div>
  </div>
</template>

<script>
  import docLayout from '../../components/docpage.vue';
  import codeblock from  '../../components/codeblock.vue';
  export default {
    name: 'docs',
    components: {docLayout, codeblock}
  }
</script>

<style scoped>
  ul {
    list-style-type: disc !important;
    margin-left: 24px;
  }
</style>
