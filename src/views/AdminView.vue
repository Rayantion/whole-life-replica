<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const users = ref([
  { id: '1', email: 'user@example.com', name: 'User One', role: 'user' },
  { id: '2', email: 'admin@example.com', name: 'Admin User', role: 'admin' }
])

const stats = ref({
  totalUsers: 42,
  totalReadings: 128,
  todayReadings: 5
})
</script>

<template>
  <div class="admin-page">
    <h1>{{ t('admin.title') }}</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>{{ t('admin.users') }}</h3>
        <p class="stat-value">{{ stats.totalUsers }}</p>
      </div>
      <div class="stat-card">
        <h3>{{ t('admin.readings') }}</h3>
        <p class="stat-value">{{ stats.totalReadings }}</p>
      </div>
      <div class="stat-card">
        <h3>{{ t('admin.stats') }}</h3>
        <p class="stat-value">{{ stats.todayReadings }}</p>
      </div>
    </div>

    <div class="users-table">
      <h2>{{ t('admin.users') }}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>
              <span :class="['role-badge', user.role]">{{ user.role }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-page h1 {
  color: #ffd700;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
}

.stat-card h3 {
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
}

.users-table {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
}

.users-table h2 {
  color: #ffd700;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  color: #b0b0b0;
  font-weight: 600;
}

.role-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.role-badge.admin {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.role-badge.user {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
}
</style>
