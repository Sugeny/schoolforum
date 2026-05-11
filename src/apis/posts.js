/**
 * 帖子相关 API 接口
 */

import alova from './request'
import { addFavorite as favAdd, removeFavorite as favRemove } from './favorites'

/** 查询帖子列表 */
export function getPostList(params) {
  return alova.Get('/posts/list', { params })
}

/** 获取帖子详情 */
export function getPostDetail(postId, noIncrement = false) {
  return alova.Get(`/posts/get/${postId}`, { params: { noIncrement } })
}

/** 点赞帖子 */
export function likePost(postId) {
  return alova.Post(`/posts/${postId}/like`)
}

/** 取消点赞帖子 */
export function unlikePost(postId) {
  return alova.Delete(`/posts/${postId}/unlike`)
}

/** 收藏帖子 */
export function favoritePost(postId) {
  return favAdd(postId)
}

/** 取消收藏帖子 */
export function unfavoritePost(postId) {
  return favRemove(postId)
}

/** 关注帖子 */
export function followPost(postId) {
  return alova.Post(`/posts/${postId}/follow`)
}

/** 获取当前用户的帖子 */
export function getMyPosts(params) {
  return alova.Get('/posts/my', { params })
}

/** 创建帖子 */
export function createPost(data) {
  return alova.Post('/posts/add', null, { params: data })
}

/** 上传帖子图片 */
export function uploadPostImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  return alova.Post('/post-images/upload', formData)
}

/** 获取相关帖子推荐 */
export function getRelatedPosts(postId, limit = 5) {
  return alova.Get(`/posts/${postId}/related`, { params: { limit } })
}
