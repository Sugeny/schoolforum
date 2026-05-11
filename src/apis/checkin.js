import alova from './request'

export function signDaily() {
  return alova.Post('/sign/daily')
}

export function getSignStatus() {
  return alova.Get('/sign/status')
}

export function repairSign(signDate) {
  return alova.Post('/sign/repair', null, { params: { signDate } })
}

export function exchangeSignCard() {
  return alova.Post('/sign/exchange-card')
}

export function getSignRecords(params) {
  return alova.Get('/sign/records', { params })
}

export function getSignCalendar(year, month) {
  return alova.Get('/sign/calendar', { params: { year, month } })
}
