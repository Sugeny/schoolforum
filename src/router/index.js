import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useRouteStore } from '@/stores/route'

routes.push(
  { path: '/login', redirect: { path: '/auth', query: { mode: 'login' } } },
  { path: '/register', redirect: { path: '/auth', query: { mode: 'register' } } },
  { path: '/forgot-password', redirect: { path: '/auth', query: { mode: 'forgot' } } },
)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 校园论坛` : '校园论坛'

  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ path: '/auth', query: { mode: 'login', redirect: to.fullPath } })
  } else {
    next()
  }
})

router.afterEach((to) => {
  const routeStore = useRouteStore()
  routeStore.setLastRoute(to.fullPath)
})

export default router
