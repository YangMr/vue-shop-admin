import { YlRequest } from '@/service'

interface Login {
  usernam: string
  password: string
}

// login
const login = (data: Login) => {
  return YlRequest.request({
    url: '/login',
    method: 'post',
    data
  })
}

const getUserInfo = () => {
  return YlRequest.request({
    url: '/getinfo',
    method: 'post'
  })
}

export { login, getUserInfo }
