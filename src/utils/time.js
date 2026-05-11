import { formatTimeAgoIntl } from '@vueuse/core'

export function formatTimeAgo(time) {
  if (!time) return ''
  return formatTimeAgoIntl(new Date(time), { locale: 'zh-CN' })
}
