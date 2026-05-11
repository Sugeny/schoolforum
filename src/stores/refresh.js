import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRefreshStore = defineStore('refresh', () => {
  const refreshFlags = ref(new Map())

  const markRefreshNeeded = (key) => {
    if (!key) return
    refreshFlags.value.set(key, {
      timestamp: Date.now(),
      needsRefresh: true,
    })
  }

  const shouldRefresh = (key) => {
    if (!key) return false
    const flag = refreshFlags.value.get(key)
    return flag?.needsRefresh === true
  }

  const consumeRefresh = (key) => {
    if (!key) return false
    const flag = refreshFlags.value.get(key)
    if (flag?.needsRefresh === true) {
      refreshFlags.value.delete(key)
      return true
    }
    return false
  }

  const clearRefreshFlag = (key) => {
    if (key) {
      refreshFlags.value.delete(key)
    }
  }

  const clearAllFlags = () => {
    refreshFlags.value.clear()
  }

  return {
    refreshFlags,
    markRefreshNeeded,
    shouldRefresh,
    consumeRefresh,
    clearRefreshFlag,
    clearAllFlags,
  }
})
