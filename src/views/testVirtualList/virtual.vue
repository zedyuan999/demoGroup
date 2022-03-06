<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >{{ item.value }}</div>
    </div>
  </div>
</template>
<script lang="ts"  setup>
import { computed, reactive, ref, nextTick, onMounted } from 'vue'
type Props = {
  listData: any[],
  itemSize: number
}
const props = withDefaults(defineProps<Props>(), {
  listData: () => [],
  itemSize: 200
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
})
const list = ref()
const listHeight = computed(() => props.listData.length + props.itemSize)
const visibleCount = computed(() => Math.ceil(data.screenHeight / props.itemSize) + 2)
const getTransform = computed(() => `translate3d(0,${data.startOffset}px,0)`)
const visibleData = computed(() => props.listData.slice(data.start, Math.min(data.end, props.listData.length)))
const scrollEvent = () => {
  //当前滚动位置
  let scrollTop = list.value.scrollTop;
  //此时的开始索引
  console.log('data.start', data.start);

  data.start = Math.floor(scrollTop / props.itemSize);
  //此时的结束索引
  data.end = data.start + visibleCount.value;
  //此时的偏移量
  data.startOffset = scrollTop - (scrollTop % props.itemSize);
}
onMounted(() => {
  nextTick(() => {
    data.screenHeight = (list.value as HTMLDivElement).clientHeight;
    data.start = 0;
    data.end = data.start + visibleCount.value;
  })
})


</script>
<style lang="less" scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>