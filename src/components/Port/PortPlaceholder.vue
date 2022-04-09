<template>
  <div ref="placeholder">
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
</style>