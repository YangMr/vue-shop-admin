// import YLRequest from './request'

// // 1. 每个请求有自己的baseUrl
// // 2. 每个请求有自己的请求以及响应拦截器

// const ylRequest1 = YLRequest({
//   baseURL: 'http://www.baidu.conm',
//   timeout: 1000,
//   url: '123',
//   a: '!23',
//   interceptors: {
//     // 请求拦截成功
//     requestInterceptor: (config) => {
//       return config
//     },
//     // 请求拦截失败
//     requestInterceptorCatch: (error) => {
//       return error
//     },
//     // 响应拦截成功
//     responseInterceptor: (res) => {
//       return res
//     },
//     // 响应拦截失败
//     responseInterceptorCatch: (error) => {
//       return error
//     }
//   }
// })

// const ylRequest2 = YLRequest({
//   baseURL: 'http://www.jd.conm',
//   timeout: 1000,
//   interceptors: {
//     // 请求拦截成功
//     requestInterceptor: (config) => {
//       return config
//     },
//     // 请求拦截失败
//     requestInterceptorCatch: (error) => {
//       return error
//     },
//     // 响应拦截成功
//     responseInterceptor: (res) => {
//       return res
//     },
//     // 响应拦截失败
//     responseInterceptorCatch: (error) => {
//       return error
//     }
//   }
// })

// export { ylRequest1, ylRequest2 }
