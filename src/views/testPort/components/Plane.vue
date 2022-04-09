<template>
  <div :style="style" class="plane">
    <slot v-bind="state.attrs"></slot>
  </div>
</template>
<script lang="ts" setup>
import { watch, computed, ref, StyleValue } from 'vue'
import { rect, state } from '@/views/testPort/components/state'
const rect1 = ref<DOMRect>()
const style = computed<StyleValue>(() => ({
  position: 'fixed',
  transition: 'all 0.8s',
  zIndex: 9999,
  width: `${rect1.value ? rect1.value.width : 0}px`,
  height: `${rect1.value ? rect1.value.height : 0}px`,
  top: `${rect1.value ? rect1.value.top : 0}px`,
  left: `${rect1.value ? rect1.value.left : 0}px`
}))
watch(() => rect.value, () => {
  rect1.value = rect.value as DOMRect
  console.log(style.value);
})

</script>
<style lang="less" scoped>
.plane {
  overflow: hidden;
}
</style>