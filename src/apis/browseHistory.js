/**
 * 浏览历史相关 API 接口
 */

import alova from './request'

/** 添加浏览历史 */
export function addBrowseHistory(postId) {
  return alova.Post(`/browse-history/add/${postId}`)
}

/** 删除浏览历史 */
export function removeBrowseHistory(postId) {
  return alova.Delete(`/browse-history/remove/${postId}`)
}

/** 清空浏览历史 */
export function clearBrowseHistory() {
  return alova.Delete('/browse-history/clear')
}

/** 查询浏览历史 */
export function getBrowseHistoryList(params) {
  return alova.Get('/browse-history/list', { params })
}

/** 分页查询所有浏览历史（管理员权限） */
export function getBrowseHistoryListPage(params) {
  return alova.Get('/browse-history/list/page', { params })
}
