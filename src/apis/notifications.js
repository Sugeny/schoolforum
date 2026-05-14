/**
 * 通知相关 API 接口
 */

import alova from './request'

/** 获取通知列表（不分页） */
export function getNotifications() {
  return alova.Get('/notifications/list')
}

/** 分页获取通知列表 */
export function getNotificationsPage(params) {
  return alova.Get('/notifications/list/page', { params })
}

/** 获取未读通知数量 */
export function getUnreadCount() {
  return alova.Get('/notifications/unread-count')
}

/** 标记单个通知已读 */
export function markAsRead(id) {
  return alova.Put(`/notifications/read/${id}`)
}

/** 标记全部通知已读 */
export function markAllAsRead() {
  return alova.Put('/notifications/read-all')
}

/** 删除通知 */
export function deleteNotification(id) {
  return alova.Delete(`/notifications/delete/${id}`)
}

export function subscribeNotifications(onMessage, onError) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
  const url = `${baseUrl}/notifications/subscribe`

  const controller = new AbortController()
  const { signal } = controller

  const headers = {
    Accept: 'text/event-stream',
    'Cache-Control': 'no-cache',
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  fetch(url, {
    method: 'GET',
    headers,
    signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let currentEvent = ''
      let currentData = ''

      const dispatchMessage = () => {
        if (currentData && onMessage) {
          try {
            onMessage(JSON.parse(currentData))
          } catch (e) {
            onMessage(currentData)
          }
        }
        currentEvent = ''
        currentData = ''
      }

      const processLine = (line) => {
        if (line.startsWith('event:')) {
          currentEvent = line.slice(6).trim()
        } else if (line.startsWith('data:')) {
          currentData = line.slice(5).trim()
        } else if (line === '') {
          dispatchMessage()
        }
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        lines.forEach(processLine)
      }

      if (buffer) {
        processLine(buffer)
      }
      dispatchMessage()
    })
    .catch((error) => {
      if (error.name !== 'AbortError') {
        if (onError) {
          onError(error)
        }
      }
    })

  return {
    close: () => controller.abort(),
  }
}
