<template>
  <router-view></router-view>
  <Plane v-slot:default="attrs">
    <TheImg v-bind="attrs"></TheImg>
  </Plane>
</template>
<script lang="ts" setup>
import PortContainer from '@/components/Port/PortContainer.vue'
import { useRouter, useRoute } from 'vue-router'
import Plane from '@/views/testPort/components/Plane.vue'
import TheImg from '@/views/testPort/TheImg.vue'
const router = useRouter()
</script>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
