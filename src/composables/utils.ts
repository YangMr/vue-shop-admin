import { ElNotification } from 'element-plus'

export const toast = (message: string) => {
  ElNotification({
    message,
    type: 'success',
    duration: 3000
  })
}

// 1. axios 封装

// 2. 同步请求会造成阻塞的问题, 阻塞后面的代码
// 2. 无法获取到同步发生错误

// async await 同步操作

// try{} catch(err){} finally{取消loading}
// loading false true
// true  false
//
// 登录成功之后,再获取用户信息, 用户信息获取成功在跳转到主页
//
// vue3 使用cookie存储数据
// cookie.set() cookie.get()
// cookie 封装
//
