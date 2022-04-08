<template>
  <div class="port-container" ref="port" :style="style">
    <slot v-bind="attrs"></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, h } from 'vue';
import type { StyleValue } from 'vue';
import { rect, portState, placeholderEl } from './state'
import { isEl } from './utils'
const port = ref<HTMLDivElement>()
// const attrs = useAttrs()
let placeholderRect = ref<DOMRect>()
const attrs = computed(() => (portState.attrs))
watch(() => rect.value, (val) => {
  if (val) {
    placeholderRect.value = val
  }
})
watch(() => port.value, (el) => {
  if (isEl(el)) {
    el.addEventListener('transitionend', () => {

    })
  }
})
const callback = () => {
  rect.value = placeholderEl.value?.getBoundingClientRect()
}
const observer = new MutationObserver(callback);
observer.observe(document.body, {
  attributes: true, childList: true, subtree: true
})
const style = computed<StyleValue>(() => ({
  position: 'fixed',
  transition: 'all 0.5s',
  width: `${placeholderRect.value?.width}px`,
  height: `${placeholderRect.value?.height}px`,
  left: `${placeholderRect.value?.left}px`,
  top: `${placeholderRect.value?.top}px`,
}))
</script>

<style lang="less" scoped>
// .port-container {
// }
</style>