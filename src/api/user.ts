import instance from '@/service/request'

interface typeLogin {
  username: string
  password: string
}

// 登录接口
export const login = (data: typeLogin) => {
  return instance({
    url: '/login',
    method: 'POST',
    data
  })
}

// 获取用户信息接口
export const getUserInfo = () => {
  return instance({
    url: '/getinfo',
    method: 'POST'
  })
}
