<template>
  <div ref="treeTable" class="table table__border">
    <div class="table__inner-wrapper">
      <div class="table__header-wrapper" ref="tableHeader">
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
      <div
        class="table__body-wrapper"
        @scroll="scrollEvent"
        ref="tableBody"
        :style="tabalBodyStyle"
      >
        <div class="table__phantom" :style="{ height: `${listHeight}px` }"></div>
        <table
          class="table__body"
          border="0"
          cellpadding="0"
          cellspacing="0"
          :style="{ transform: getTransform }"
        >
          <colgroup>
            <col width="180" />
            <col width="180" />
          </colgroup>
          <tbody>
            <tr
              class="table__row"
              :class="`table__row${item.id}`"
              :ref="handleTableRow"
              :data-row-id="item.id"
              v-for="(item, index) in visibleData"
              :key="index"
            >
              <td class="table__cell">
                <div class="cell">{{ item.id }}</div>
              </td>
              <td class="table__cell">
                <div class="cell">{{ item.content }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, reactive, computed, nextTick, onUpdated } from 'vue'
import { flatten } from './utils'
import type { Tree } from './utils'
import type { Position } from './types'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  estimatedItemSize: { // 预估的每一行的高度
    type: Number,
    default: 40
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
const positions = ref<Position[]>([])
const trList = ref<HTMLTableRowElement[]>([])
const tableHeader = ref<HTMLDivElement>()
const tableBody = ref<HTMLDivElement>()
const treeTable = ref<HTMLTableElement>()
const tabalBodyStyle = ref<any>({})

const listHeight = computed(() => positions.value[positions.value.length - 1].bottom)
const visibleCount = computed(() => {
  return listHeight.value > data.screenHeight - data.itemSize ? Math.ceil(data.screenHeight / data.itemSize) : treeData.value.length
})

const getTransform = computed(() => `translate3d(0,${data.startOffset}px,0)`)
const visibleData = computed(() => treeData.value.slice(data.start, Math.min(data.end, treeData.value.length)))


watch(() => props.data, () => {
  treeData.value = flatten(props.data as Tree[])
  positions.value = treeData.value.map((item, index: number) => {
    return {
      index,
      height: props.estimatedItemSize,
      top: index * props.estimatedItemSize,
      bottom: (index + 1) * props.estimatedItemSize
    }
  })
}, {
  immediate: true,
  deep: true
})

const scrollEvent = (e: Event) => {
  trList.value = []
  //当前滚动位置
  let scrollTop = (e.target as HTMLDivElement).scrollTop;
  //此时的开始索引
  data.start = Math.floor(scrollTop / data.itemSize);
  //此时的结束索引
  data.end = data.start + visibleCount.value;
  //此时的偏移量
  data.startOffset = scrollTop - (scrollTop % data.itemSize);
}

const handleTableRow = (el: any) => {
  // console.log(el);
  if (el) {
    trList.value.push(el as HTMLTableRowElement)
  }
}

const initPositions = () => {
  positions.value = treeData.value.map((item, index) => {
    return {
      index,
      height: data.itemSize,
      top: index * data.itemSize,
      bottom: (index + 1) * data.itemSize
    }
  })
}
initPositions()

nextTick(() => {
  // tabalBodyStyle.value = { height:}
  // data.screenHeight = document.documentElement.clientHeight;
  data.screenHeight = (treeTable.value as HTMLTableElement).getBoundingClientRect().height
  data.start = 0;
  data.end = data.start + visibleCount.value;
  try {
    const h = data.screenHeight - (tableHeader.value as HTMLDivElement).getBoundingClientRect().height
    tabalBodyStyle.value = { height: `${h}px` }
  } catch (error) {
    console.log(error);
  }
})

onUpdated(() => {
  // console.log(trList.value);
  trList.value.forEach((node: HTMLTableRowElement) => {
    // console.log(node.getBoundingClientRect());
    let rect = node.getBoundingClientRect();
    let height = rect.height;
    let index = +(node.getAttribute('data-row-id') as string) - 1
    let oldHeight = positions.value[index].height;
    console.log(height, oldHeight);

    let dValue = oldHeight - height;
    //存在差值
    if (dValue) {
      positions.value[index].bottom = positions.value[index].bottom - dValue;
      positions.value[index].height = height;
      for (let k = index + 1; k < positions.value.length; k++) {
        positions.value[k].top = positions.value[k - 1].bottom;
        positions.value[k].bottom = positions.value[k].bottom - dValue;
      }
    }
  })
  console.log(listHeight.value);
  console.log(positions.value.map(item => item.height));
  // console.log(positions.value.reduce((t,c)=>t+c.h));
})



// const tableInner = ref()
// let io: IntersectionObserver | null = null
// nextTick(() => {
//   io = new IntersectionObserver((entries, io) => {
//     if (document.querySelectorAll('.table__row').length === entries.length) return false

//     // console.log(tableInner.value.scrollTop);
//     // console.log([...entries[0].target.classList].join(','), entries[0]);
//     entries.forEach(entry => {
//       if (!entry.intersectionRatio) {
//         const isTop = entry.boundingClientRect.bottom < 0
//         if (isTop) {
//           console.log([...entry.target.classList].join(','), !entry.isIntersecting, entry.boundingClientRect);
//           const { height, bottom } = entry.boundingClientRect
//           data.start++;
//           data.end++
//           console.log('isTop');
//           io.unobserve(entry.target)
//           data.startOffset -= height + bottom
//           // nextTick(() => {
//           //   io.observe(entry.target)

//           // })
//         } else {
//           if (data.start > 0) {
//             data.start--;
//             data.end--
//             console.log('bottom');

//           }
//           console.log('other');
//         }
//         // console.log(entry);
//         console.log(data.start);
//       }
//     })
//   }, {
//     root: document.querySelector('.table__inner-wrapper')
//   })
//   console.log(document.querySelector('.table__inner-wrapper'));
// })

// onUpdated(() => {
//   if (!io) return
//   const domList = document.querySelectorAll('.table__row')
//   domList.forEach(item => {
//     (io as IntersectionObserver).observe(item)
//   })
// })


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
    height: 100%;
    // overflow-y: auto;
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
    overflow: auto;
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