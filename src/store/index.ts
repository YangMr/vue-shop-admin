import { createStore } from 'vuex'
import { login, getUserInfo, logout } from '@/api/user'
import { setToken, getToken, removeToken } from '@/composables/auth'

const store = createStore({
  state: {
    token: getToken() || '',
    user: '',
    asideWidth: '250px',
    menus: [],
    ruleName: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUser(state, user) {
      state.user = user
    },
    // 动态设置菜单的展开与收起的宽度
    setAsideWidth(state) {
      // 如果宽度是250, 设置64 如果64, 则设置250
      state.asideWidth = state.asideWidth === '250px' ? '64px' : '250px'
    },
    setMenus(state, menus) {
      state.menus = menus
    },
    setRuleName(state, ruleName) {
      state.ruleName = ruleName
    }
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  actions: {
    async handleLogin({ commit }, form) {
      const res: any = await login(form)
      commit('setToken', res.token)
      return res
    },
    async handleUserInfo({ commit }) {
      // 获取用户信息接口
      const res: any = await getUserInfo()
      commit('setUser', res)
      commit('setMenus', res.menus)
      commit('setRuleName', res.ruleNames)
      return res
    },
    async handleLogout({ commit }) {
      const res: any = await logout()
      commit('setToken', '')
      commit('setUser', '')
      removeToken()
    }
  }
})

export default store
