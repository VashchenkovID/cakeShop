<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter();
const redirect = () => {
  console.log('test')
  router.push({path: '/auth'})
}
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "common/mixins";
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #151A27;
  height: 100vh;
  overflow: hidden;
}
</style>
