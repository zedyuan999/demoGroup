<template>
  <div style="height: 2000px;">
    <h1>bar</h1>
    <router-link class="button" to="/foo">back</router-link>
    <PortPlaceholder class="avater w-60 h-60 rounded-lg overflow-hidden mx-auto mb-4"></PortPlaceholder>
    <!-- <Placeholder class="avater w-60 h-60 rounded-lg overflow-hidden mx-auto mb-4"></Placeholder> -->
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, adipisci animi! Sit saepe ipsam est officia reprehenderit ea. Saepe id impedit reprehenderit ratione dicta voluptatibus quasi magnam laborum corrupti voluptates.</p>
  </div>
</template>

<script lang="ts" setup>
import PortPlaceholder from '@/components/Port/PortPlaceholder.vue'
import { Placeholder } from './usrPort'
</script>

<style lang="less" scoped>
.button {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(116, 183, 241);
  font-size: 16px;
  color: #fff;
  text-decoration: none;
}
</style>