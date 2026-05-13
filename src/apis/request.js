import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import log from '@/utils/logger'
import { getAPIBaseURL } from '@/config/server'

const alovaInstance = createAlova({
  baseURL: getAPIBaseURL(),
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  timeout: 10000,
  cacheLogger: false,
  cacheFor: null,
  beforeRequest(method) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      method.config.headers.Authorization = `Bearer ${token}`
    }
  },
  responded: {
    onSuccess: async (response, method) => {
      const json = await response.json()
      log.info(`[API ${method.type} ✓] ${method.url}`, json)
      return json
    },
    onError: (error, method) => {
      log.error(`[API ${method?.type} ✗] ${method?.url}`, error)
      if (error.response) {
        switch (error.response.status) {
          case 401:
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userInfo')
            window.location.href = import.meta.env.BASE_URL + 'auth?mode=login'
            break
        }
      }
      throw error
    },
  },
})

export default alovaInstance
