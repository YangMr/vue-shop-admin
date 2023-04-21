import { YlRequest } from '@/service'

// 获取图片分类列表数据
export const getImageCategoryList = (page: number) => {
  return YlRequest.request({
    url: `/image_class/${page}`,
    method: 'GET'
  })
}
