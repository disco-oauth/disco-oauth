<template>
  <div class="hero has-text-centered">
    <div class="hero-head section">
      <h1 class="title is-1">
        <u>Disco-OAuth</u>
      </h1>
      <h2 class="title is-4">
        <code>npm install --save disco-oauth</code><br />
      </h2>
    </div>
    <div class="hero-body">
      <div class="tags is-centered">
        <a href="https://www.npmjs.com/package/disco-oauth" target="_blank"><img src="https://img.shields.io/npm/v/disco-oauth?style=for-the-badge" alt="Version" /></a>
        <a href="https://www.npmjs.com/package/disco-oauth" target="_blank"><img src="https://img.shields.io/npm/dt/disco-oauth?style=for-the-badge" alt="NPM downloads" /></a>
        <a href="https://www.npmjs.com/package/disco-oauth" target="_blank"><img src="https://img.shields.io/librariesio/release/npm/disco-oauth?style=for-the-badge" alt="Dependencies" /></a>
        <a href="https://github.com/TheDrone7/disco-oauth/issues" target="_blank"><img src="https://img.shields.io/github/issues/TheDrone7/disco-oauth?style=for-the-badge" alt="Github issues" /></a>
      </div>
      <br />
      <div class="columns">
        <div class="column">
          <div class="box">
            <h1 class="title is-4">About</h1>
            <p class="content has-text-left">
              Disco-OAuth is a small <a href="https://nodejs.org/">Node.js</a> library that eases the implementation of
              <a href="https://discordapp.com/developers/docs/topics/oauth2">Discord OAuth2 API</a> in your backend servers.
              <br /><br />
              It is an object-oriented library giving you the ease of use and good quality at the same time!
              <br /><br />
              This is also frequently updated to provide all the cool new stuff that discord launches for users and developers alike.
            </p>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <h1 class="title is-4">Why disco-oauth?</h1>
            <ul class="content has-text-left">
              <li>Object-Oriented</li>
              <li>Quick setup</li>
              <li>Easy to use</li>
              <li>Efficient</li>
              <li>Fast</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-buttons">
      <nuxt-link to="/docs" exact prefetch class="button is-success">Get Started</nuxt-link>
      <a target="_blank" href="https://discord.gg/4mmeuEV" class="button blurple">Join Discord</a>
      <hr />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
  ul {list-style-type: disc; margin-left: 12px;}
  .blurple {
    color: #ffffff;
    background-color: #406da2;
    border: 1px solid #406da2;
  }
  .blurple:hover {
    border: 1px solid #405ca1;
    background-color: #405ca1;
  }
  .box {
    box-shadow: 0 0 12px #343434;
    border-radius: 16px;
  }
  code {
    background-color: black;
    color: #33ff00;
  }
  .tags > * {
    margin: 8px;
  }
</style>
