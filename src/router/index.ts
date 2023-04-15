// 引入vue-router
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Index from '@/views/index.vue'
// import NotFound from '@/views/404.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/admin.vue'),
    name: 'admin',
    children: [
      // {
      //   path: '/',
      //   component: () => import('@/views/index.vue'),
      //   meta: {
      //     title: '后台首页'
      //   }
      // },
      // {
      //   path: '/goods/list',
      //   component: () => import('@/views/goods/list.vue'),
      //   meta: {
      //     title: '商品管理'
      //   }
      // },
      // {
      //   path: '/category/list',
      //   component: () => import('@/views/category/list.vue'),
      //   meta: {
      //     title: '分类管理'
      //   }
      // },
      // {
      //   path: '/skus/list',
      //   component: () => import('@/views/skus/list.vue'),
      //   meta: {
      //     title: '规格管理'
      //   }
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404'
    }
  }
]

// 创建路由
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导出路由
export default router
