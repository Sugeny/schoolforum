import alova from './request'

export function getAnnouncements(params) {
  return alova.Get('/announcements/list', { params })
}

export function getAnnouncementDetail(id) {
  return alova.Get(`/announcements/${id}`)
}
