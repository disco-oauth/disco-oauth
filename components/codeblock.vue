<template>
    <div class="container codeblock">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'codeblock'
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Fira+Code&display=swap');
  .codeblock {
    margin: 12px 16px;
    background-color: #000000;
    color: #33ff00;
    padding: 4px 8px 4px 12px;
    border-radius: 8px;
    overflow-x: auto;
    white-space: nowrap;
    font-family: 'Fira Code                                                                                         ', monospace !important;
  }
</style>
