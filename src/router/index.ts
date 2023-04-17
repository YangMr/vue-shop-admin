// 引入vue-router
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Index from '@/views/index.vue'
// import NotFound from '@/views/404.vue'
// 静态路由
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
      // path: '/goods/list',
      // component: () => import('@/views/goods/list.vue'),
      // meta: {
      //   title: '商品管理'
      // }
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

// 动态路由表(自定义的路由表)
const asyncRoutes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '控制台'
    }
  },
  {
    path: '/goods/list',
    component: () => import('@/views/goods/list.vue'),
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/category/list',
    component: () => import('@/views/category/list.vue'),
    meta: {
      title: '分类管理'
    }
  },
  {
    path: '/skus/list',
    component: () => import('@/views/skus/list.vue'),
    meta: {
      title: '规格管理'
    }
  },
  {
    path: '/coupon/list',
    component: () => import('@/views/coupon/list.vue'),
    meta: {
      title: '优惠卷管理'
    }
  },
  {
    path: '/user/list',
    component: () => import('@/views/user/list.vue'),
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/level/list',
    component: () => import('@/views/level/list.vue'),
    meta: {
      title: '会员等级'
    }
  },
  {
    path: '/order/list',
    component: () => import('@/views/order/list.vue'),
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/comment/list',
    component: () => import('@/views//comment/list.vue'),
    meta: {
      title: '评论管理'
    }
  }
]

// 创建路由
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 匹配出当前用户所拥有的路由
export const addAsyncRoutes = (menus: any) => {
  // 定义一个变量，用来保存是否添加新的路由
  let hasNewRoutes = false

  const findAddRoutes = (routes: any) => {
    routes.forEach((route: any) => {
      const newRoute: any = asyncRoutes.find(
        (item) => route.frontpath === item.path
      )

      if (route.child && route.child.length > 0) {
        findAddRoutes(route.child)
      }

      if (newRoute && !router.hasRoute(newRoute.path)) {
        router.addRoute('admin', newRoute)
        hasNewRoutes = true
      }
    })
  }
  findAddRoutes(menus)

  return hasNewRoutes
}

// 导出路由
export default router
