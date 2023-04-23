import { YlRequest } from '@/service'
import { ImageRole } from './type/imageRole'

// 获取图片分类列表数据
export const getImageCategoryList = (page: number) => {
  return YlRequest.request({
    url: `/image_class/${page}`,
    method: 'GET'
  })
}

// 新增图片分类接口
export const addImageCategory = (data: ImageRole) => {
  return YlRequest.request({
    url: `/image_class`,
    method: 'POST',
    data
  })
}

// 编辑图片分类接口
export const updateImageCategory = (id: number, data: ImageRole) => {
  return YlRequest.request({
    url: `/image_class/${id}`,
    method: 'POST',
    data
  })
}

// 删除图片分类接口
export const deleteImageCategory = (id: number) => {
  return YlRequest.request({
    url: `/image_class/${id}/delete`,
    method: 'POST'
  })
}
