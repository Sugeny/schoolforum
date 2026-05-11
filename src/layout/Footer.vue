<template>
  <div class="footer">
    <div class="footer-main">
      <!-- 左侧 Logo 和社交图标 -->
      <div class="footer-brand">
        <div class="logo">
          <SiteLogo :size="20" />
          <span class="logo-text">海语</span>
        </div>
        <div class="social-links">
          <a-link href="#"><icon-github /></a-link>
          <a-link href="#"><icon-wechat /></a-link>
          <a-link href="#"><icon-qq /></a-link>
        </div>
      </div>

      <!-- 中间链接 -->
      <div class="footer-links">
        <a-link href="#">关于我们</a-link>
        <a-link href="#">联系方式</a-link>
        <a-link href="#">使用帮助</a-link>
        <a-link href="#">学习交流</a-link>
        <a-link href="#">校园生活</a-link>
        <a-link href="#">二手交易</a-link>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="footer-bottom">
      <span>© 2026 海语 All Rights Reserved.</span>
      <div class="bottom-links">
        <a-link href="#">服务条款</a-link>
        <a-link href="#">隐私政策</a-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import SiteLogo from '@/components/SiteLogo.vue'
import { IconGithub, IconWechat, IconQq } from '@arco-design/web-vue/es/icon'
</script>

<style lang="scss" scoped>
.footer {
  padding: 16px 48px;
  background-color: var(--color-bg-2);
  border-top: 1px solid var(--color-border-2);
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 品牌区域 */
.footer-brand {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 6px;

  .logo-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-1);
  }
}

.social-links {
  display: flex;
  gap: 16px;

  :deep(.arco-link) {
    font-size: 20px;
    color: var(--color-text-3);

    &:hover {
      color: rgb(var(--primary-6));
    }
  }
}

/* 链接区域 */
.footer-links {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;

  :deep(.arco-link) {
    color: var(--color-text-3);
    font-size: 12px;

    &:hover {
      color: rgb(var(--primary-6));
    }
  }
}

/* 底部版权 */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 11px;
  color: var(--color-text-3);
}

.bottom-links {
  display: flex;
  gap: 16px;

  :deep(.arco-link) {
    color: var(--color-text-3);
    font-size: 12px;

    &:hover {
      color: rgb(var(--primary-6));
    }
  }
}

@media (max-width: 992px) {
  .footer {
    padding: 16px 24px;
  }

  .footer-links {
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 16px 20px;
  }

  .footer-main {
    flex-direction: column;
    gap: 16px;
  }

  .footer-brand {
    flex-direction: column;
    gap: 8px;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 12px 16px;
    display: none;
  }

  .logo-text {
    font-size: 12px;
  }

  .social-links {
    gap: 12px;

    :deep(.arco-link) {
      font-size: 18px;
    }
  }

  .footer-links {
    gap: 8px;

    :deep(.arco-link) {
      font-size: 11px;
    }
  }

  .footer-bottom {
    font-size: 10px;
  }

  .bottom-links {
    gap: 12px;

    :deep(.arco-link) {
      font-size: 11px;
    }
  }
}
</style>
