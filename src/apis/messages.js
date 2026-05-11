/**
 * 私信相关 API 接口
 */

import alova from './request'

/** 获取会话列表 */
export function getConversations() {
  return alova.Get('/messages/conversations')
}

/** 获取与某用户的消息记录 */
export function getMessageHistory(userId, page = 1, size = 20) {
  return alova.Get(`/messages/history/${userId}`, { params: { page, size } })
}

/** 获取未读消息总数 */
export function getUnreadMessageCount() {
  return alova.Get('/messages/unread-count')
}

/** 标记会话消息已读 */
export function markMessagesAsRead(conversationId) {
  return alova.Put(`/messages/read/${conversationId}`)
}

/** 发送私信 */
export function sendMessage(receiverId, content) {
  return alova.Post('/messages/send', { receiverId, content })
}

/** 删除会话 */
export function deleteConversation(conversationId) {
  return alova.Delete(`/messages/conversations/${conversationId}`)
}
