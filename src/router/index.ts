// 引入vue-router
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Index from '@/views/index.vue'
// import NotFound from '@/views/404.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue')
  }
]

// 创建路由
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导出路由
export default router
