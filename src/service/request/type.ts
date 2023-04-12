import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch: (error: any) => any
}

export interface YLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YLRequestInterceptors<T>
  showLoading?: boolean
}
