import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import BaziView from '@/views/BaziView.vue'
import ZiweiView from '@/views/ZiweiView.vue'
import VedicView from '@/views/VedicView.vue'
import HumanDesignView from '@/views/HumanDesignView.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true }
    },
    {
      path: '/bazi',
      name: 'bazi',
      component: BaziView
    },
    {
      path: '/ziwei',
      name: 'ziwei',
      component: ZiweiView
    },
    {
      path: '/vedic',
      name: 'vedic',
      component: VedicView
    },
    {
      path: '/human-design',
      name: 'humanDesign',
      component: HumanDesignView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAdmin: true }
    }
  ]
})

// SECURITY: Navigation guards enforce role checks BEFORE rendering
// Original site had client-side checks AFTER rendering (vulnerable)
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()

  if (to.meta.guestOnly && auth.isLoggedIn) {
    next('/')
    return
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    // SECURITY FIX: Redirect non-admin users instead of showing restricted content
    console.warn('Blocked admin access for non-admin user')
    next('/')
    return
  }

  next()
})

export default router
