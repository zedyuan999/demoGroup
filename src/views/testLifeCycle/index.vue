<template>
  <div>
    <Son></Son>
  </div>
</template>

<script lang="ts">
import Son from "./components/son.vue";
export default {
  created() {
    console.log("parent created 1");
  },
  mounted() {
    console.log("parent mounted");
  },
  components: { Son }
}
</script>

<style lang="less" scoped>
</style>