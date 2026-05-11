import alova from './request'

export function searchAll(params) {
  return alova.Get('/search', { params })
}

export function searchSuggest(params) {
  return alova.Get('/search/suggest', { params })
}
