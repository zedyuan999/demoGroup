<template>
  <div style="height:150px"></div>
  <div class="table-wrap">
    <ZTable :data="tree" style="height:100%;height: 300px;"></ZTable>
  </div>
</template>
<script lang="ts" setup>
// TODO
import ZTable from '@/components/table/index.vue'
const tree: any[] = [
  {
    id: 1, children: [
      {
        id: 5, children: [
          { id: 10, children: [] },
          { id: 11, children: [{ id: 12, children: [] },] },
        ]
      },
      { id: 6, children: [] },
      { id: 7, children: [] },
      { id: 8, children: [] },
      { id: 9, children: [] },
    ]
  },
  { id: 2, children: [] },
  { id: 3, children: [] },
  {
    id: 4, children: [
      { id: 13, children: [] },
    ]
  },
  { id: 14, children: [] },
  { id: 15, children: [] },
  { id: 16, children: [] },
  { id: 17, children: [] },
  { id: 18, children: [] },
  { id: 19, children: [] },
  { id: 20, children: [] },
  { id: 21, children: [] },
  { id: 22, children: [] },
  { id: 23, children: [] },
  { id: 24, children: [] },
  { id: 25, children: [] },
  { id: 26, children: [] },
  { id: 27, children: [] },
  { id: 28, children: [] },
  { id: 29, children: [] },
  { id: 30, children: [] },
  { id: 31, children: [] },
  { id: 32, children: [] },
  { id: 33, children: [] },
  { id: 34, children: [] },
  { id: 35, children: [] },
  { id: 36, children: [] },
  { id: 37, children: [] },
  { id: 38, children: [] },
  { id: 39, children: [] },
  { id: 40, children: [] },
  { id: 41, children: [] },
  { id: 42, children: [] },
  { id: 43, children: [] },
  { id: 44, children: [] },
  { id: 45, children: [] },
  { id: 46, children: [] },
  { id: 47, children: [] },
  { id: 48, children: [] },
  { id: 49, children: [] },
  { id: 50, children: [] },
  { id: 51, children: [] },
  { id: 52, children: [] },
  { id: 53, children: [] },
  { id: 54, children: [] },
  { id: 55, children: [] },
  { id: 56, children: [] },
  { id: 57, children: [] },
  { id: 58, children: [] },
  { id: 59, children: [] },
]
const list: any[] = [
  { content: "123333333333333333333333333333333333333333333333333", id: 1, children: [] },
  { content: "wqeeeeee", id: 2, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 3, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 4, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 5, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 6, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 7, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 8, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 9, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 10, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 11, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 12, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 13, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 14, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 15, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 16, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 17, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 18, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 19, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 20, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 21, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 22, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 23, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 24, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 25, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 26, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 27, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 28, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 29, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 30, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 31, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 32, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 33, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 34, children: [] },
  { content: "qweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", id: 35, children: [] },
  { content: "123333331231231312312", id: 36, children: [] },
  { content: "123333331231231312312", id: 37, children: [] },
  { content: "123333331231231312312", id: 38, children: [] },
  { content: "123333331231231312312", id: 39, children: [] },
  { content: "123333331231231312312", id: 40, children: [] },
  { content: "123333331231231312312", id: 41, children: [] },
  { content: "123333331231231312312", id: 42, children: [] },
  { content: "123333331231231312312", id: 43, children: [] },
  { content: "123333331231231312312123333331231231312312", id: 44, children: [] },
  { content: "123333331231231312312123333331231231312312123333331231231312312123333331231231312312", id: 45, children: [] },
  { content: "123333331231231312312", id: 46, children: [] },
  { content: "123333331231231312312123333331231231312312123333331231231312312123333331231231312312", id: 47, children: [] },
  { content: "", id: 48, children: [] },
  { content: "", id: 49, children: [] },
  { content: "", id: 50, children: [] },
  { content: "", id: 51, children: [] },
  { content: "", id: 52, children: [] },
  { content: "", id: 53, children: [] },
  { content: "", id: 54, children: [] },
  { content: "", id: 55, children: [] },
  { content: "123333331231231312312123333331231231312312123333331231231312312123333331231231312312", id: 56, children: [] },
  { content: "", id: 57, children: [] },
  { content: "", id: 58, children: [] },
  { content: "", id: 59, children: [] },
  { content: "123333331231231312312123333331231231312312123333331231231312312123333331231231312312123333331231231312312123333331231231312312123333331231231312312123333331231231312312", id: 60, children: [] },
]
</script>
<style lang="less" scoped>
.table-wrap {
  height: 100%;
  // padding-top: 500px;
}
</style>