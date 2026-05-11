/**
 * 分类相关 API 接口
 */

import alova from './request'

/** 获取分类列表（树形结构，包含一级和二级分类） */
export function getCategoryList() {
  return alova.Get('/categories/list')
}

/** 获取分类详情 */
export function getCategoryById(id) {
  return alova.Get(`/categories/get/${id}`)
}
