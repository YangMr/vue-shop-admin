import { ElNotification } from 'element-plus'
import nprogress from 'nprogress'

export const toast = (message: string) => {
  ElNotification({
    message,
    type: 'success',
    duration: 3000
  })
}

// 开启进度条
export const showFullLoading = () => {
  nprogress.start()
}

// 关闭进度条
export const hideFullLoading = () => {
  nprogress.done()
}
