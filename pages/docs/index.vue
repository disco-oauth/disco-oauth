<template>
  <div>
    <div class="container">
      <div>
        <h1 class="title">Getting started</h1>
        <p>Get started with disco-oauth and implementation of discord's OAuth2 API in your own webapps!</p>
      </div>
      <divider />
      <a
        class="scroll-link"
        href="#installation"
      >
        Installation<br/><i class="fas fa-chevron-down"/>
      </a>
    </div>
    <div class="container" id="installation">
      <div class="left-aligned topic">
        <h1 class="title-small">Installation</h1>
        <p>To install the disco-oauth library, in your preferred command-line client (such as command prompt or powershell on Windows or terminal on Linux or Mac) enter the following command: -</p>
        <code>npm install --save disco-oauth</code>&#8195;&#8195;<strong>OR</strong>&#8195;&#8195;<code>yarn add disco-oauth</code>
      </div>
      <divider />
      <div class="left-aligned topic">
        <h1 class="title-small">Quick setup</h1>
        <p>Given below is a quick example of how to set-up the library inside your code.</p>
        <img src="~/assets/carbon.png" alt="code" />
      </div>
    </div>
  </div>
</template>

<script>
  import Divider from '../../components/divider'
  export default {
    components: { Divider },
    layout: 'docs'
  }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 400;
    font-size: 4em;
    letter-spacing: 1px;
    color: #fff;
  }

  .title-small {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 2.5em;
    letter-spacing: 1px;
    color: #fff;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    word-spacing: 5px;
    padding-bottom: 15px;
    color: #bfbfbf;
  }

  .links {
    padding-top: 15px;
  }

  p, ul {
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 1.25em;
    font-weight: 400;
    line-height: 1.5em;
    max-width: 720px;
  }
</style>
