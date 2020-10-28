<template>
    <div>
        <div class="section">
            <doc-layout title="api-error">
                <h1 class="title is-size-2-desktop"><u>APIError</u></h1>
                <p class="subtitle">extends <js-error /></p>
                <p class="is-small">The error which is raised with a Promise rejection when an API error is encountered.</p>
                <hr />
                <h1 class="title is-size-4-touch">Properties</h1>
                <ul class="list">
                    <li class="list-item" id="auth-code-link">
                        <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">statusCode<span class="tag is-info">READ-ONLY</span></h1>
                        <p>The HTTP status code returned when the error was encountered.</p>
                    </li>
                    <li class="list-item" id="scopes">
                        <h1 class="title is-size-6-touch is-size-4-desktop" style="margin-bottom: 0;">scopes</h1>
                        <p>An array of <nuxt-link exact prefetch :to="'/docs/scope'">Discord OAuth2 scopes</nuxt-link>. For example: -</p>
                        <codeblock>['identify', 'guilds']</codeblock>
                    </li>
                </ul>
                <hr />
                <h1 class="title is-size-4-touch">Commonly encountered issues</h1>
                <p>Some of the commonly encountered errors are listed below along with what they indicate.</p>
                <div class="table-container">
                    <table class="table">
                        <thead><tr>
                            <th>Status code</th>
                            <th>Meaning</th>
                        </tr></thead>
                        <tbody>
                        <tr><td>400</td><td>BAD REQUEST (Something is wrong with the request being made).</td></tr>
                        <tr><td>401</td><td>UNAUTHORIZED (The access token has expired).</td></tr>
                        <tr><td>403</td><td>FORBIDDEN (The access token didn't have access to the resource).</td></tr>
                        <tr><td>404</td><td>NOT FOUND (Request made to an invalid endpoint).</td></tr>
                        <tr><td>405</td><td>METHOD NOT ALLOWED.</td></tr>
                        <tr><td>429</td><td>TOO MANY REQUESTS (You are being rate limited).</td></tr>
                        <tr><td>502</td><td>GATEWAY UNAVAILABLE (The discord servers were busy, try again after some time).</td></tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    There can be other status codes too that are very rare. If it is of the form <code>5XX</code> then it is a server error and your code is perfectly fine.
                </p>
                <hr />
            </doc-layout>
        </div>
    </div>
</template>

<script>
  import DocLayout from '../../components/docpage.vue';
  import String from '../../components/typelinks/string'
  import Promise from '../../components/typelinks/promise'
  import Codeblock from '../../components/codeblock'
  import JsError from '../../components/typelinks/jserror'
  export default {
    name: 'client',
    components: { JsError, Codeblock, Promise, String, DocLayout}
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
