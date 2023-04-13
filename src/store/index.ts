import { createStore } from 'vuex'
import { login, getUserInfo, logout } from '@/api/user'
import { setToken, getToken, removeToken } from '@/composables/auth'

const store = createStore({
  state: {
    token: getToken() || '',
    user: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setUser(state, user) {
      state.user = user
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
      const res: any = await getUserInfo()
      commit('setUser', res)
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
