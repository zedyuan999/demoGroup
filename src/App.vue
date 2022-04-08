<template>
  <router-view></router-view>
  <PortContainer v-slot="props">
    <TheImage v-bind="props" />
  </PortContainer>
</template>
<script lang="ts" setup>
import PortContainer from '@/components/Port/PortContainer.vue'
import TheImage from '@/views/testComponentAnimation/TheImage.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/foo')
</script>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
