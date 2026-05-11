/**
 * 评论相关 API 接口
 */

import alova from './request'

/** 获取帖子评论列表 */
export function getPostComments(postId, params) {
  return alova.Get(`/comments/list/post/${postId}`, { params })
}

/** 创建评论/回复评论 */
export function createComment(postId, data, parentId = null) {
  const params = { postId, ...data }
  if (parentId) {
    params.parentId = parentId
  }
  return alova.Post('/comments/add', null, { params })
}

/** 删除评论 */
export function deleteComment(commentId) {
  return alova.Delete(`/comments/delete/${commentId}`)
}

/** 点赞评论 */
export function likeComment(commentId) {
  return alova.Post(`/comments/${commentId}/like`)
}

/** 取消点赞评论 */
export function unlikeComment(commentId) {
  return alova.Delete(`/comments/${commentId}/unlike`)
}
