import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 从 localStorage 读取初始值，默认为 false（亮色模式）
  const isDark = ref(localStorage.getItem('theme-dark') === 'true')

  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // 设置主题
  const setTheme = (dark) => {
    isDark.value = dark
  }

  // 监听主题变化，应用到 document 并持久化
  watch(
    isDark,
    (newVal) => {
      // 保存到 localStorage
      localStorage.setItem('theme-dark', String(newVal))

      // 应用到 document
      if (newVal) {
        document.documentElement.setAttribute('arco-theme', 'dark')
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('arco-theme')
        document.body.removeAttribute('arco-theme')
      }
    },
    { immediate: true },
  )

  return {
    isDark,
    toggleTheme,
    setTheme,
  }
})
