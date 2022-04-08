<template>
  <div class="img-wrapper">
    <img src="https://source.unsplash.com/collection/94734566/300*200" @click="add" />
    <div class="count">{{ count }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
interface Props {
  imgStyle?: Partial<DOMRect>
};
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
  // width: 100%;
  // height: 100%;
  // transition: all 0.5s;
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