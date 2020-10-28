<template>
  <span><a target="_blank" v-if="type === 'reject'" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">PromiseRejection</a><a v-else href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">Promise</a>&lt;<slot></slot>&gt;</span>
</template>

<script>
  export default {
    props: ['type'],
    name: 'promise'
  }
</script>

<style scoped>

</style>
