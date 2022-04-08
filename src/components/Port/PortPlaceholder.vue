<template>
  <div class="port-placeholder" ref="placeholder">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, useAttrs } from 'vue'
import { placeholderEl, portState } from '@/components/Port/state'
const placeholder = ref<HTMLDivElement | undefined>()
const attrs = useAttrs()
const props = defineProps()
portState.attrs = attrs
portState.props = props
onMounted(() => {
  placeholderEl.value = placeholder.value
})
</script>

<style lang="less" scoped>
.port-placeholder {
  // background-color: rgba(200, 200, 200, 0.5);
}
</style>