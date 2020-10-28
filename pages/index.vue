<template>
  <div>
    <div class="container">
      <div>
        <h1 class="title">
          disco-oauth
        </h1>
        <h2 class="subtitle">
          Implement discord&#39;s oauth API in your webapp, the easy way.
        </h2>
        <div class="links">
          <nuxt-link
            class="button--green"
            exact
            prefetch
            to="/docs"
          >
            <i class="fas fa-book" />&#8195;Documentation
          </nuxt-link>
          <a
            class="button--blurple"
            href="https://discord.gg/4mmeuEV"
            target="_blank"
          >
            <i class="fab fa-discord"/>&#8195;Support
          </a>
        </div>
        <div class="links">
          <a
            class="button--amber"
            href="https://www.npmjs.com/package/disco-oauth"
            target="_blank"
          >
            <i class="fab fa-npm" />&#8195;NPM
          </a>
          <a
            class="button--white"
            href="https://github.com/TheDrone7/disco-oauth"
            target="_blank"
          >
            <i class="fab fa-github"/>&#8195;GitHub
          </a>
        </div>
      </div>
      <div class="end">
        <a
          class="scroll-link"
          href="#about"
        >
          Learn More<br/><i class="fas fa-chevron-down"/>
        </a>
      </div>
    </div>
    <div class="container" id="about">
      <div>
        <h1 class="title-small">About</h1>
        <p>
          Disco-OAuth is a small Node.js library that eases the implementation of Discord OAuth2 API in your backend servers.
          It is an object-oriented library giving you the ease of use and good quality at the same time!
          This is also frequently updated to provide all the cool new stuff that discord launches for users and developers alike.
        </p>
      </div>
      <divider />
      <div>
        <h1 class="title-small">Why disco-oauth?</h1>
        <p>
          Below are some features that explain why you should use disco-oauth
        </p>
        <ul>
          <li>Fast</li>
          <li>Object Oriented</li>
          <li>Quick setup</li>
          <li>Small size</li>
          <li>Easy to use</li>
          <li>Efficient</li>
        </ul>
      </div>
      <div class="end">
        <a
          class="scroll-link"
          href="#"
        >
          <i class="fas fa-chevron-up"/><br/>Go back
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Divider from '../components/divider'
  export default {
    components: { Divider }
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
    font-size: 100px;
    letter-spacing: 1px;
    color: #fff;
  }

  .title-small {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 42px;
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
    font-size: 1.25em;
    font-weight: 400;
    line-height: 1.5em;
    max-width: 720px;
    text-align: left;
  }
</style>
