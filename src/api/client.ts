// SECURITY: Centralized API client with security defaults
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://guardian-backend-production-7bef.up.railway.app'

interface ApiOptions {
  method?: string
  body?: unknown
  headers?: Record<string, string>
  auth?: boolean
}

export async function apiClient(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, headers = {}, auth = true } = options

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  // SECURITY: Only attach auth token when explicitly requested
  // Token is stored in Pinia (memory) not localStorage
  if (auth) {
    const { useAuthStore } = await import('@/stores/auth')
    const authStore = useAuthStore()
    if (authStore.token) {
      ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${authStore.token}`
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(url, config)

  // SECURITY: Generic error messages, no information disclosure
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error('API error:', { status: response.status, endpoint })
    throw new Error(errorData.message || 'An error occurred. Please try again.')
  }

  return response.json()
}

// Astrology API helpers
export const astrologyApi = {
  calculateBazi: (data: { birthDate: string; birthTime: string; gender: string }) =>
    apiClient('/api/bazi/calculate', { method: 'POST', body: data }),

  calculateZiwei: (data: { birthDate: string; birthTime: string; gender: string }) =>
    apiClient('/api/ziwei/calculate', { method: 'POST', body: data }),

  calculateVedic: (data: { birthDate: string; birthTime: string; birthPlace: string }) =>
    apiClient('/api/vedic/calculate', { method: 'POST', body: data }),

  calculateHumanDesign: (data: { birthDate: string; birthTime: string; birthPlace: string }) =>
    apiClient('/api/human-design/calculate', { method: 'POST', body: data }),

  getUserReadings: () => apiClient('/api/birth/me'),

  // Admin endpoints
  getAdminUsers: () => apiClient('/api/admin/users'),
  getAdminStats: () => apiClient('/api/admin/stats')
}
