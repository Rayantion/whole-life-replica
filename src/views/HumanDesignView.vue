<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const birthDate = ref('')
const birthTime = ref('')
const birthPlace = ref('')
const result = ref('')
const loading = ref(false)

async function calculate() {
  loading.value = true
  result.value = ''
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    result.value = `人類圖分析結果:\n\n出生日期: ${birthDate.value}\n出生時間: ${birthTime.value}\n出生地點: ${birthPlace.value}\n\n能量類型: 生產者 (Generator)\n策略: 等待回應\n權威: 薦骨權威\n\n九大能量中心分析...`
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="astrology-page">
    <h1>{{ t('humanDesign.title') }}</h1>
    <div class="form-card">
      <div class="form-group">
        <label>{{ t('humanDesign.birthDate') }}</label>
        <input v-model="birthDate" type="date" />
      </div>
      <div class="form-group">
        <label>{{ t('humanDesign.birthTime') }}</label>
        <input v-model="birthTime" type="time" />
      </div>
      <div class="form-group">
        <label>{{ t('humanDesign.birthPlace') }}</label>
        <input v-model="birthPlace" type="text" placeholder="e.g. Taipei, Taiwan" />
      </div>
      <button class="calc-btn" @click="calculate" :disabled="loading">
        {{ loading ? t('humanDesign.loading') : t('humanDesign.calculate') }}
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

.form-group input {
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
