import router from './router'
import { getToken } from './composables/auth'
import store from './store'
import { showFullLoading, hideFullLoading } from './composables/utils'

router.beforeEach(async (to, from, next) => {
  console.log('to=>', to)

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
  console.log(store.getters.getUser)
  if (token && !store.getters.getUser) {
    const user = await store.dispatch('handleUserInfo')
    if (!user) return
  }

  document.title = to.meta.title
    ? to.meta.title + ' - 九月商城后台'
    : '九月商城'

  next()
})

router.afterEach(() => {
  // 关闭进度条
  hideFullLoading()
})
