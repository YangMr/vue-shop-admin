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
import { LoginRole, UpdatePasswordRole } from './type/userRole'

// 登录接口
const login = (data: LoginRole) => {
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

// 修改密码接口
const updatepassword = (data: UpdatePasswordRole) => {
  return YlRequest.request({
    url: '/updatepassword',
    method: 'post',
    data
  })
}

export { login, getUserInfo, logout, updatepassword }
