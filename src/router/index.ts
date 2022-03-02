import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/home/index.vue') },
  { path: '/about', component: () => import('@/views/testLifeCycle/index.vue') },
  { path: '/promise', component: () => import('@/views/testPromise/index.vue') },
  { path: '/testTree', component: () => import('@/views/testTree/index.vue') },

]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router