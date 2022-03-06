<template>
  <div class="table-wrap">
    <ZTable :data="tree"></ZTable>
  </div>
</template>
<script lang="ts" setup>
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

</script>
<style lang="less" scoped>
.table-wrap {
  height: 100%;
}
</style>