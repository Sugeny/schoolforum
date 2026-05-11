import { useRefreshStore } from '@/stores/refresh'

export function usePageRefresh(refreshKey) {
  const refreshStore = useRefreshStore()
  const route = useRoute()
  const key = computed(() => refreshKey || route.fullPath)

  const needsRefresh = computed(() => {
    return refreshStore.shouldRefresh(key.value)
  })

  const checkAndRefresh = async (refreshFn) => {
    if (refreshStore.consumeRefresh(key.value)) {
      if (typeof refreshFn === 'function') {
        await refreshFn()
      }
      return true
    }
    return false
  }

  const markForRefresh = (targetKey) => {
    refreshStore.markRefreshNeeded(targetKey || key.value)
  }

  return {
    needsRefresh,
    checkAndRefresh,
    markForRefresh,
  }
}
