<template>
  <div ref="airport" class="airport"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, useAttrs } from 'vue'
import { rect, state } from './state'
const airport = ref<HTMLElement | undefined>()
const attrs = useAttrs()
onMounted(() => {
  rect.value = airport.value?.getBoundingClientRect() as DOMRect
  state.attrs = attrs
})

</script>
<style lang="less">
.airport {
  background-color: gray;
}
</style>