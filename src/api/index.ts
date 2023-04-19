import { YlRequest } from '@/service'

// 获取首页面板1的数据
export const getStatistics1 = () => {
  return YlRequest.request({
    url: '/statistics1',
    method: 'GET'
  })
}

// 获取首页面板2的数据
export const getStatistics2 = () => {
  return YlRequest.request({
    url: '/statistics2',
    method: 'GET'
  })
}

// 获取首页面板3的数据
export const getStatistics3 = (type: string) => {
  return YlRequest.request({
    url: '/statistics3',
    method: 'GET',
    params: {
      type
    }
  })
}
