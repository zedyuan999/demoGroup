


import { defineComponent, reactive, ref, onMounted, h, watch, computed, Teleport, onBeforeUnmount } from 'vue'
import type { Component, StyleValue } from 'vue'
interface IPortComponents {
  Placeholder: Component
  Container: Component
}
interface IState {
  attrs: any,
  props: any
}
const isEl = <T extends HTMLElement>(el: unknown): el is T => {
  return typeof el === 'object' && el instanceof HTMLElement
}

export default <T extends Component>(component: T): IPortComponents => {
  const state = reactive<IState>({
    attrs: {},
    props: {}
  })
  const placeholderEl = ref<HTMLDivElement | undefined>()
  const rect = ref<DOMRect | undefined>()
  const isLanded = ref<boolean>(true)
  const liftoff = () => { isLanded.value = false }
  const land = () => { isLanded.value = true }
  const Placeholder = defineComponent({
    setup(props, { attrs, slots }) {
      const placeholder = ref<HTMLDivElement | undefined>()
      state.attrs = attrs
      state.props = props
      onMounted(() => {
        placeholderEl.value = placeholder.value
      })
      onBeforeUnmount(() => {
        liftoff()
      })
      return () => h('div', { ref: placeholder }, [
        slots.default ? h(slots.default) : null
      ])
    }
  })
  const Container = defineComponent({
    setup() {
      const port = ref<HTMLDivElement>()
      watch(() => port.value, (el) => {
        if (isEl(el)) {
          el.ontransitionend = () => {
            land()
          }
        }
      })
      watch(() => placeholderEl.value, (val, oldVal) => {
        if (val) {
          observeDom(val)
        }
        update()
      })

      const update = () => {
        rect.value = placeholderEl.value?.getBoundingClientRect()
      }

      const observeDom = (el: HTMLElement) => {
        const observer = new MutationObserver(update);
        observer.observe(el, {
          attributes: true, childList: true, subtree: true
        })
      }

      const style = computed<StyleValue>(() => ({
        position: 'fixed',
        transition: 'all 0.6s ease-in-out',
        width: `${rect.value?.width}px`,
        height: `${rect.value?.height}px`,
        left: `${rect.value?.left}px`,
        top: `${rect.value?.top}px`,
      }))
      return () => {
        const children = [h(component, state.attrs)]
        return isLanded.value && placeholderEl.value ?
          h(Teleport, { to: placeholderEl.value }, children) :
          h('div', { ref: port, style: style.value }, children)
      }
    }
  })

  return {
    Placeholder,
    Container
  }
}