<template>
  <div ref="treeTable" class="table table__border">
    <div class="table__inner-wrapper" @scroll="scrollEvent">
      <div class="table__header-wrapper">
        <table class="table__header" border="0" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="180" />
            <col width="180" />
          </colgroup>
          <thead class="table__thead">
            <tr>
              <th class="table__cell">
                <div class="cell">1</div>
              </th>
              <th class="table__cell">
                <div class="cell">2</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="table__body-wrapper">
        <div class="table__phantom" :style="{ height: `${listHeight}px` }"></div>
        <table
          class="table__header"
          border="0"
          cellpadding="0"
          cellspacing="0"
          :style="{ translate: getTransform }"
        >
          <colgroup>
            <col width="180" />
            <col width="180" />
          </colgroup>
          <tbody>
            <tr class="table__row" v-for="(item, index) in visibleData" :key="index">
              <td class="table__cell">
                <div class="cell">{{ item.id }}</div>
              </td>
              <td class="table__cell">
                <div class="cell">2</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, reactive, computed, nextTick } from 'vue'
import { flatten } from './utils'
import type { Tree } from './utils'
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const data = reactive({
  //可视区域高度
  screenHeight: 0,
  //偏移量
  startOffset: 0,
  //起始索引
  start: 0,
  //结束索引
  end: 0,
  itemSize: 40
})
const treeData = ref<any[]>([])
const treeTable = ref()
const listHeight = computed(() => treeData.value.length * data.itemSize)
const visibleCount = computed(() => {
  return listHeight.value > data.screenHeight - data.itemSize ? Math.ceil(data.screenHeight / data.itemSize) : treeData.value.length
})
const getTransform = computed(() => `translate3d(0,${data.startOffset}px,0)`)
const visibleData = computed(() => treeData.value.slice(data.start, Math.min(data.end, treeData.value.length)))
watch(() => props.data, () => {
  treeData.value = flatten(props.data as Tree[])
}, {
  immediate: true
})

const scrollEvent = () => {
  //当前滚动位置
  let scrollTop = treeTable.value.scrollTop;
  //此时的开始索引
  console.log('data.start', data.start);

  data.start = Math.floor(scrollTop / data.itemSize);
  //此时的结束索引
  data.end = data.start + visibleCount.value;
  //此时的偏移量
  data.startOffset = scrollTop - (scrollTop % data.itemSize);
}
nextTick(() => {
  console.log((treeTable.value as HTMLDivElement).clientHeight);

  // data.screenHeight = (treeTable.value as HTMLDivElement).clientHeight;
  data.screenHeight = document.documentElement.clientHeight;
  data.start = 0;
  data.end = data.start + visibleCount.value;
})

</script>
<style lang="less" scoped>
.table {
  --table-border-color: #ebeef5;
  --color-white: #fff;
  --table-border: 1px solid var(--table-border-color);
  --table-text-color: #606266;
  --table-header-text-color: #999;
  --table-row-hover-bg-color: #f5f7fa;
  --table-current-row-bg-color: #ecf5ff;
  --table-header-bg-color: #f5f5f5;
  --table-fixed-box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  --table-bg-color: var(--color-white);
  --table-tr-bg-color: var(--color-white);
  --table-expanded-cell-bg-color: var(--color-white);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  max-width: 100%;
  background-color: var(--table-bg-color);
  font-size: 14px;
  color: var(--table-text-color);
  &::before,
  &::after {
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: var(--table-border-color);
    top: -1px;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
  &__inner-wrapper {
    &::before,
    &::after {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--table-border-color);
    }
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }
  }
  &__body-wrapper {
    position: relative;
  }
  &.table__border {
    &::before,
    &::after {
      content: "";
    }
    .table__inner-wrapper {
      &::before,
      &::after {
        content: "";
      }
    }
    .table__cell {
      border: var(--table-border);
      border-top: 0;
    }
  }
  &__thead {
    color: var(--table-header-text-color);
    font-weight: 500;
  }
  &__cell {
    padding: 8px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    z-index: 1;
  }
  th.table__cell {
    background-color: var(--table-header-bg-color);
  }
  tr {
    background-color: #fff;
  }
  .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding: 0 12px;
  }
  &__phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
}
</style>