import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouteStore = defineStore(
  'route',
  () => {
    const lastRoute = ref('')

    const excludePaths = ['/login', '/register', '/forgot-password', '/callback']

    const setLastRoute = (path) => {
      if (path && !excludePaths.some((p) => path.includes(p))) {
        lastRoute.value = path
      }
    }

    const getLastRoute = () => lastRoute.value

    return {
      lastRoute,
      setLastRoute,
      getLastRoute,
    }
  },
  {
    persist: {
      key: 'route-store',
      storage: localStorage,
      paths: ['lastRoute'],
    },
  },
)
