<template>
  <div>
    <h1>foo</h1>
    <router-link class="button" to="/bar">to Bar</router-link>
    <div class="content">
      <PortPlaceholder class="w-28 h-28 rounded-full overflow-hidden"></PortPlaceholder>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, ad amet tenetur deserunt quos possimus? Asperiores optio molestiae qui voluptatibus consequuntur cupiditate quibusdam, accusantium facere corporis esse laboriosam beatae molestias!</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PortPlaceholder from '@/components/Port/PortPlaceholder.vue'

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
.content {
  display: flex;
  align-items: center;
  margin-top: 50px;
  .avater {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  p {
    flex: 1;
    margin-left: 12px;
  }
}
</style>