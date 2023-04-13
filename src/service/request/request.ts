import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { YLRequestInterceptors, YLRequestConfig } from './type'
// import { ElLoading } from 'element-plus'
import { toast } from '@/composables/utils'

// import type { LoadingInstance } from 'el-loading'

import { getToken } from '@/composables/auth'

const LOADING_DEFAULT = true

class YLHttpRequest {
  instance: AxiosInstance
  interceptors?: YLRequestInterceptors
  showLoading?: boolean
  loading?: any
  constructor(config: YLRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 公共的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          // loadingInstance.open()
        }

        const token = getToken()
        if (token) config.headers.token = token

        return config
      },
      (error) => {
        // loadingInstance.close()
        return Promise.reject(error)
      }
    )
    // 公共的响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('res=>', res.data.data)
        // loadingInstance.close()
        return res.data.data
      },
      (error) => {
        toast(error.response.data.msg || '请求失败')
        // loadingInstance.close()
        return Promise.reject(error)
      }
    )
  }

  request<T>(config: YLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          this.showLoading = LOADING_DEFAULT

          resolve(res)
        })
        .catch((error) => {
          this.showLoading = LOADING_DEFAULT
          reject(error)
        })
    })
  }
}

export default YLHttpRequest
