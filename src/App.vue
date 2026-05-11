<script setup>
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onMounted(async () => {
  if (userStore.token && !userStore.userInfo) {
    await userStore.fetchUserInfo()
  }
})
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  background-color: var(--color-bg-1);
}
</style>
