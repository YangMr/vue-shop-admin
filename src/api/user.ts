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
