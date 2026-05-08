<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n()
const auth = useAuthStore()
const router = useRouter()

function toggleLang() {
  locale.value = locale.value === 'zh-TW' ? 'en' : 'zh-TW'
}

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <nav class="nav">
    <div class="nav-brand">
      <RouterLink to="/" class="brand-link">
        <span class="brand-icon">&#9733;</span>
        <span class="brand-text">{{ t('home.title') }}</span>
      </RouterLink>
    </div>

    <div class="nav-links">
      <RouterLink to="/bazi" class="nav-link">{{ t('nav.bazi') }}</RouterLink>
      <RouterLink to="/ziwei" class="nav-link">{{ t('nav.ziwei') }}</RouterLink>
      <RouterLink to="/vedic" class="nav-link">{{ t('nav.vedic') }}</RouterLink>
      <RouterLink to="/human-design" class="nav-link">{{ t('nav.humanDesign') }}</RouterLink>

      <template v-if="auth.isAdmin">
        <RouterLink to="/admin" class="nav-link admin">{{ t('nav.admin') }}</RouterLink>
      </template>

      <template v-if="!auth.isLoggedIn">
        <RouterLink to="/login" class="nav-link">{{ t('nav.login') }}</RouterLink>
      </template>
      <template v-else>
        <span class="user-name">{{ auth.user?.name }}</span>
        <button class="nav-btn" @click="logout">{{ t('nav.logout') }}</button>
      </template>

      <button class="lang-btn" @click="toggleLang">
        {{ locale === 'zh-TW' ? 'EN' : '中文' }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 700;
}

.brand-link {
  color: #e0e0e0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  color: #ffd700;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #b0b0b0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #ffd700;
}

.nav-link.admin {
  color: #ff6b6b;
}

.user-name {
  color: #ffd700;
  font-size: 0.9rem;
}

.nav-btn,
.lang-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.nav-btn:hover,
.lang-btn:hover {
  border-color: #ffd700;
  color: #ffd700;
}

.lang-btn {
  min-width: 48px;
}

@media (max-width: 768px) {
  .nav {
    padding: 0 1rem;
  }

  .nav-links {
    gap: 0.75rem;
  }

  .nav-link {
    font-size: 0.8rem;
  }
}
</style>
