import { reactive, ref } from "vue";
interface IPortState {
  attrs: any,
  props: any
}
export const portState = reactive<IPortState>({
  attrs: {},
  props: {}
})
export const placeholderEl = ref<HTMLDivElement | undefined>()
export const rect = ref<DOMRect | undefined>()
