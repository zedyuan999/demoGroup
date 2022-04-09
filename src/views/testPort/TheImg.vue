<template>
  <div class="img-wrapper">
    <img
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9397066122%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652105051&t=0f0a206e796f0e534ab62b74adcbdb8b"
      @click="add"
    />
    <div class="count">{{ count }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(0)

const add = () => {
  count.value++
}
defineExpose({
  a: 1
})
</script>

<style lang="less" scoped>
.img-wrapper {
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .count {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
    font-size: 16px;
    color: #fff;
  }
}
</style>