<template>
  <div>
    <h1>HOME</h1>
    <ul>
      <li v-for="(item, index) in routes">
        <router-link :to="item.path">{{ item.path }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { routes } from '@/router'
import { useCounterStoreForOption } from '@/store/index';
const counterStoreForSetup = useCounterStoreForOption();
console.log(counterStoreForSetup);
</script>

<style lang="less" scoped>
</style>