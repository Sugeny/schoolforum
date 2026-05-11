/**
 * 标签相关 API 接口
 */

import alova from './request'

/** 获取所有标签（管理员权限） */
export function getAllTags() {
  return alova.Get('/tags/list')
}

/** 获取启用的标签 */
export function getEnabledTags() {
  return alova.Get('/tags/list/enabled')
}

/** 按分类获取标签 */
export function getTagsByCategory(categoryId) {
  return alova.Get(`/tags/list/category/${categoryId}`)
}

/** 获取热门标签 */
export function getHotTags() {
  return alova.Get('/tags/list/hot')
}

/** 获取标签详情 */
export function getTagById(id) {
  return alova.Get(`/tags/get/${id}`)
}
