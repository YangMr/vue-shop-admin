import { ElNotification } from 'element-plus'
import nprogress from 'nprogress'
type messageType = 'success' | 'warning' | 'info' | 'error' | ''
export const toast = (
  message: string | undefined,
  type: messageType = 'success'
) => {
  ElNotification({
    message,
    type,
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
