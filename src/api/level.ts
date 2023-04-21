import { YlRequest } from '@/service'

// 获取会员等级数据
export const getLeverList = (page: number) => {
  return YlRequest.request({
    url: `user_level/${page}`,
    method: 'GET'
  })
}
