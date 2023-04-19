import router, { addAsyncRoutes } from './router'
import { getToken } from './composables/auth'
import store from './store'
import { showFullLoading, hideFullLoading } from './composables/utils'

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  showFullLoading()

  // 获取token
  const token = getToken() || ''

  // 没有token 并且 跳转的不是登录页, 进入登录页面
  if (!token && to.path !== '/login') {
    return next('/login')
  }

  // 有token 并且进入的是登录页, 则跳转到首页
  if (token && to.path === '/login') {
    return next(from.fullPath ? from.fullPath : '/')
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  let hasNewRoutes = false
  if (token && !store.getters.getUser) {
    const user = await store.dispatch('handleUserInfo')
    if (!user) return

    hasNewRoutes = addAsyncRoutes(user.menus)
  }

  document.title = to.meta.title
    ? to.meta.title + ' - 九月商城后台'
    : '九月商城'

  // 解决动态添加路由后刷新页面跳转到404的问题
  hasNewRoutes ? next(to.fullPath) : next()
})

router.afterEach(() => {
  // 关闭进度条
  hideFullLoading()
})

/**
 * 1. 用户登录之后,会在路由守卫里面调用vuex中封装的获取用户信息方法
 * 2. 获取到用户信息里面的菜单数据
 * 3. 在router.js定义动态添加路由的方法
 * 4. 在路由守卫方法的里面调用动态添加路由的方法的, 将menus传递进去
 * 5. 在动态路由里面过滤取当前用户所拥有的自定义路由
 * 6. 通过router.addRoute实现动态路由的添加
 * 7. 解决浏览下刷新404的问题
 *  7.1 初始化一个变量用来保存动态路由是否添加成功的状态, false 未添加, true已添加
 *  7.2 在路由守卫里面获取到动态看路由是否添加的状态, 如果为true的情况,使用next需要指定要进入的路由, 如果为false,next方法不需要指定要进入的路由
 *
 *
 */
