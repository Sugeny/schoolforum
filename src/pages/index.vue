<template>
  <div>
    <a-layout class="layout">
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup>
import Footer from '@/layout/Footer.vue'
import Header from '@/layout/Header.vue'
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
}

.layout-content {
  flex: 1;
  min-height: calc(100vh - 64px - 88px);
}

:deep(.arco-layout-header) {
  position: sticky;
  top: 0;
  z-index: 100;
}

:deep(.arco-layout-footer) {
  flex-shrink: 0;
}

@media (max-width: 992px) {
  :deep(.arco-layout-footer) {
    display: block;
  }
}

@media (max-width: 768px) {
  :deep(.arco-layout-footer) {
    display: block;
  }
}

@media (max-width: 576px) {
  :deep(.arco-layout-footer) {
    display: none;
  }
}
</style>

<style lang="scss">
@use '../styles/animations.scss';
</style>
