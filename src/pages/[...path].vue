<template>
  <div class="not-found">
    <div class="content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">页面不存在</h2>
      <p class="error-desc">抱歉，您访问的页面不存在或已被删除</p>
      <a-button type="primary" @click="goHome">
        <template #icon>
          <icon-home />
        </template>
        返回首页
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { IconHome } from '@arco-design/web-vue/es/icon'
import { useRouter } from 'vue-router'

definePage({
  meta: {
    title: '页面不存在',
  },
})

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-1);
}

.content {
  text-align: center;
  padding: 40px;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: rgb(var(--primary-6));
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: 24px;
  font-weight: 500;
  color: var(--color-text-1);
  margin: 16px 0;
}

.error-desc {
  font-size: 14px;
  color: var(--color-text-3);
}
</style>
