<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = t('login.required')
    return
  }

  error.value = ''
  loading.value = true

  try {
    // SECURITY: In production, this calls the real API
    // For demo, we simulate a successful login
    const mockToken = 'mock_jwt_token_' + Date.now()
    const mockUser = {
      id: '1',
      email: email.value,
      name: email.value.split('@')[0] || 'User',
      role: email.value.includes('admin') ? ('admin' as const) : ('user' as const)
    }

    auth.setAuth(mockUser, mockToken)
    router.push('/')
  } catch (e) {
    error.value = t('login.error')
    console.error('Login failed:', e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <div class="login-card">
      <h2>{{ t('login.title') }}</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>{{ t('login.email') }}</label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="your@email.com"
          />
        </div>

        <div class="form-group">
          <label>{{ t('login.password') }}</label>
          <input
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? t('common.loading') : t('login.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffd700;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #b0b0b0;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #ffd700;
}

.form-group input::placeholder {
  color: #666;
}

.error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
