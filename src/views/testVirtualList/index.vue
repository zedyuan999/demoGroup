<template>
  <VirtualList :listData="data" :itemSize="200"></VirtualList>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import VirtualList from "./virtual.vue";
const data = ref<any[]>([]);
for (let i = 0; i < 1000; i++) {
  data.value.push({ id: i, value: i });
}
</script>
<style lang="less" scoped>
</style>