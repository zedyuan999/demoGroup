<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/testVirtualTreeTable')
</script>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
