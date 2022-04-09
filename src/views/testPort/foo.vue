<template>
  <div>
    <h1>foo</h1>
    <router-link to="/bar1">to bar1</router-link>
    <!-- <TheImg class="w-60 h-60 rounded-2xl overflow-hidden" /> -->
    <Airport class="w-60 h-60 rounded-2xl overflow-hidden" data-a="1" />
  </div>
</template>
<script lang="ts" setup>
import TheImg from './TheImg.vue';
import Airport from './components/Airport.vue'

</script>
<style lang="less" scoped>
</style>