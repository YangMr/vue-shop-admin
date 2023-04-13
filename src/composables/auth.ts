import { useCookies } from '@vueuse/integrations/useCookies'
const TOKEN_KEY = 'admin-token'
const cookie = useCookies()
const USER_KEY = 'userInfo'

// 获取token
export const getToken = () => {
  return cookie.get(TOKEN_KEY)
}

// 设置token
export const setToken = (token: string) => {
  cookie.set(TOKEN_KEY, token)
}

// 删除token
export const removeToken = () => {
  cookie.remove(TOKEN_KEY)
}
