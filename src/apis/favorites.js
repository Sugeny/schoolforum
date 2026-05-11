/**
 * 收藏相关 API 接口
 */

import alova from './request'

/** 收藏帖子 */
export function addFavorite(postId) {
  return alova.Post(`/favorites/add/${postId}`)
}

/** 取消收藏 */
export function removeFavorite(postId) {
  return alova.Delete(`/favorites/remove/${postId}`)
}

/** 检查是否已收藏 */
export function checkFavorite(postId) {
  return alova.Get(`/favorites/check/${postId}`)
}

/** 获取用户收藏列表 */
export function getFavoriteList(params) {
  return alova.Get('/favorites/list', { params })
}

/** 分页查询所有收藏（管理员权限） */
export function getFavoriteListPage(params) {
  return alova.Get('/favorites/list/page', { params })
}

/** 获取帖子收藏数量 */
export function getFavoriteCount(postId) {
  return alova.Get(`/favorites/count/${postId}`)
}
