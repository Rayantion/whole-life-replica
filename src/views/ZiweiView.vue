<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const birthDate = ref('')
const birthTime = ref('')
const gender = ref('male')
const result = ref('')
const loading = ref(false)

async function calculate() {
  loading.value = true
  result.value = ''
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    result.value = `紫微斗數命盤分析結果:\n\n出生日期: ${birthDate.value}\n出生時間: ${birthTime.value}\n性別: ${gender.value === 'male' ? '男' : '女'}\n\n命宮主星: 紫微、天機\n身宮主星: 太陽、武曲\n\n事業宮分析...`
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="astrology-page">
    <h1>{{ t('ziwei.title') }}</h1>
    <div class="form-card">
      <div class="form-group">
        <label>{{ t('ziwei.birthDate') }}</label>
        <input v-model="birthDate" type="date" />
      </div>
      <div class="form-group">
        <label>{{ t('ziwei.birthTime') }}</label>
        <input v-model="birthTime" type="time" />
      </div>
      <div class="form-group">
        <label>{{ t('ziwei.gender') }}</label>
        <select v-model="gender">
          <option value="male">{{ t('ziwei.male') }}</option>
          <option value="female">{{ t('ziwei.female') }}</option>
        </select>
      </div>
      <button class="calc-btn" @click="calculate" :disabled="loading">
        {{ loading ? t('ziwei.loading') : t('ziwei.calculate') }}
      </button>
    </div>
    <div v-if="result" class="result-card">
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<style scoped>
.astrology-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.astrology-page h1 {
  text-align: center;
  color: #ffd700;
  margin-bottom: 2rem;
}

.form-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 1rem;
}

.calc-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ffd700, #ff8c00);
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.result-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}

.result-card pre {
  white-space: pre-wrap;
  color: #e0e0e0;
  line-height: 1.8;
}
</style>
