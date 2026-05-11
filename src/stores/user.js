import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getUserInfo } from '@/apis/users'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref('')

  const isLoggedIn = computed(() => !!token.value && !!userInfo.value)
  const userId = computed(() => userInfo.value?.id || null)
  const username = computed(() => userInfo.value?.username || '')
  const avatar = computed(() => userInfo.value?.avatarUrl || userInfo.value?.avatar || '')
  const isAdmin = computed(() => {
    const role = userInfo.value?.role
    return role === 'SUPER_ADMIN' || role === 'ADMIN'
  })

  const setToken = (newToken, remember = true) => {
    token.value = newToken
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('token', newToken)
    const otherStorage = remember ? sessionStorage : localStorage
    otherStorage.removeItem('token')
    otherStorage.removeItem('userInfo')
  }

  const setUserInfo = (info, remember = true) => {
    userInfo.value = info
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('userInfo', JSON.stringify(info))
  }

  const clearUser = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userInfo')
  }

  const updateUserInfo = (info) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...info }
      const storage = localStorage.getItem('token') ? localStorage : sessionStorage
      storage.setItem('userInfo', JSON.stringify(userInfo.value))
    }
  }

  const fetchUserInfo = async () => {
    if (!token.value) return
    try {
      const res = await getUserInfo()
      if (res.code === 200) {
        userInfo.value = res.data
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  const initFromStorage = () => {
    const localToken = localStorage.getItem('token')
    const sessionToken = sessionStorage.getItem('token')

    if (localToken) {
      token.value = localToken
      const info = localStorage.getItem('userInfo')
      userInfo.value = info ? JSON.parse(info) : null
    } else if (sessionToken) {
      token.value = sessionToken
      const info = sessionStorage.getItem('userInfo')
      userInfo.value = info ? JSON.parse(info) : null
    }
  }

  initFromStorage()

  return {
    userInfo,
    token,
    isLoggedIn,
    userId,
    username,
    avatar,
    isAdmin,
    setToken,
    setUserInfo,
    clearUser,
    updateUserInfo,
    fetchUserInfo,
  }
})
