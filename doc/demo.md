# Demo教程

## rbac权限概念

给用户可以分配角色
给角色分配权限


- 菜单权限(根据后端返回的菜单数据进行动态渲染):  

  不同的用户登录可以看到不同的菜单与菜单页面
  admin 超级管理员 >  返回所有的菜单数据
  yl 普通管理员 > 部分菜单数据(后台面板、商品管理、用户管理) 

流程: 
- 登录成功之后, 调用获取用户信息接口, 用户信息接口调用成功之后, 将token, 用户信息, 菜单数据 存储到vuex
- 菜单组件中获取vuex里面存储的菜单数据, 将菜单数据通过el-menu进行渲染
最终我们就实现了不同的用户登录, 看到不同的菜单页面

- 路由权限


路由如果不是动态渲染(动态控制)

如果后台返回1个菜单,我们就添加1个菜单的路由
如果后台返回了10个菜单, 那我们就添加10个菜单的路由



方案: 
- 前端自定义一份路由表, 根据后台所返回的权限数据进行匹配, 然后通过router.addRoute动态的添加到路由表当中
- 将后端所返回的权限数据转化成路由表所需要的数据,  然后通过router.addRoute动态的添加到路由表当中

// 前端自定义一份路由表
const asyncRoutes = [
  {
        path: '/',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '后台首页'
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
      }
]

// 模拟后台返回的权限数据
const menus = [
  {
    id : 1,
     path: '/',
    name : '后台首页',
  },
  {
    id : 1,
    path : '/goods/list'
    name : '商品管理',
  }
]



- 按钮权限

- 不同的用户登录, 根据后台的按钮权限数据, 实现按钮权限的控制(不同的用户登录之后, 页面根据权限去是否显示这个按钮)

- 接口权限

用户没有登录之后, 不等访问登录以后的接口




rbac 用户 角色 权限

