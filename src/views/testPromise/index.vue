<template>
  <div></div>
</template>

<script lang="ts" setup>
import { MyPromise } from '@/utils/myPromise'

// MyPromise.resolve('100')
//   .finally(() => { console.log('finally'); })
//   .then(res => { console.log(res); })
// Promise.resolve('100')
//   .finally(() => { console.log('finally'); })
//   .then(res => { console.log(res); })

MyPromise.reject('200')
  .finally(() => { console.log('finally'); })
  .catch(err => { console.log(err); })

// Promise.reject('200')
//   .finally(() => { console.log('finally'); })
//   .catch(err => { console.log(err); })
</script>

<style lang="less" scoped>
</style>