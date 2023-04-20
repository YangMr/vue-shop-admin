import { YlRequest } from '@/service'
import { NoticeRole } from './type/noticeRole'

// 获取公告列表数据
export const getNoticeList = (page: number) => {
  return YlRequest.request({
    url: `/notice/${page}`,
    method: 'GET'
  })
}

// 新增公告
export const addNotice = (data: NoticeRole) => {
  return YlRequest.request({
    url: '/notice',
    method: 'POST',
    data
  })
}

// 修改公告
export const updateNotice = (id: number, data: NoticeRole) => {
  return YlRequest.request({
    url: `/notice/${id}`,
    method: 'POST',
    data
  })
}

// 删除公告
export const deleteNotice = (id: number) => {
  return YlRequest.request({
    url: `/notice/${id}/delete`,
    method: 'POST'
  })
}
