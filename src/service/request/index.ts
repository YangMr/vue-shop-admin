import axios from 'axios'
import { toast } from '@/composables/utils'
import { getToken } from '@/composables/auth'

/****
 *
 * 1. 调用登录接口
 * 2. 获取token
 * 3. 通过cookie奖token存储到本地
 * 4. 奖token通过请求头发送给后台
 * 5. 调用获取用户信息接口
 * 6. 用户信息获取成功之后, 跳转到主页
 *
 */

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 1. 获取token
    const token = getToken()
    // 2. token如果存在,则通过请求头奖token发送给后台
    if (token) config.headers.token = token

    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log('1')
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data
  },
  function (error) {
    toast(error.response.data.msg || '请求失败')

    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
