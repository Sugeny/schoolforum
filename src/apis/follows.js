/**
 * 关注相关 API 接口
 */

import alova from './request'

/** 关注用户 */
export function followUser(userId) {
  return alova.Post(`/follows/follow/${userId}`)
}

/** 取消关注用户 */
export function unfollowUser(userId) {
  return alova.Delete(`/follows/unfollow/${userId}`)
}

/** 检查是否已关注 */
export function checkFollowStatus(userId) {
  return alova.Get(`/follows/check/${userId}`)
}

/** 获取关注列表 */
export function getFollowingList(userId, params = { pageNumber: 1, pageSize: 1 }) {
  return alova.Get(`/follows/following/${userId}/list`, { params })
}

/** 获取粉丝列表 */
export function getFollowersList(userId, params = { pageNumber: 1, pageSize: 1 }) {
  return alova.Get(`/follows/followers/${userId}/list`, { params })
}
