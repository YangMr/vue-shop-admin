// import instance from '@/service/request'

// interface typeLogin {
//   username: string
//   password: string
// }

// // 登录接口
// export const login = (data: typeLogin) => {
//   return instance({
//     url: '/login',
//     method: 'POST',
//     data
//   })
// }

// // 获取用户信息接口
// export const getUserInfo = () => {
//   return instance({
//     url: '/getinfo',
//     method: 'POST'
//   })
// }

import { YlRequest } from '@/service'

interface Login {
  username: string
  password: string
}

// 登录接口
const login = (data: Login) => {
  return YlRequest.request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取用户信息
const getUserInfo = () => {
  return YlRequest.request({
    url: '/getinfo',
    method: 'post'
  })
}

// 退出登录接口
const logout = () => {
  return YlRequest.request({
    url: '/logout',
    method: 'post'
  })
}

export { login, getUserInfo, logout }
