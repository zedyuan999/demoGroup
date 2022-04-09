<template>
  <div>
    <h1>bar</h1>
    <router-link to="/foo1">to foo1</router-link>
    <!-- <TheImg class="w-24 h-24 rounded-full overflow-hidden" /> -->
    <Airport class="w-24 h-24 rounded-full overflow-hidden" />
  </div>
</template>
<script lang="ts" setup>
import TheImg from './TheImg.vue';
import Airport from './components/Airport.vue'
</script>
<style lang="less" scoped>
</style>