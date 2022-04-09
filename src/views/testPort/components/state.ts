import { reactive, ref } from 'vue'
export const state = reactive({
  props: {},
  attrs: {}
})
export const rect = ref<DOMRect | {}>({})