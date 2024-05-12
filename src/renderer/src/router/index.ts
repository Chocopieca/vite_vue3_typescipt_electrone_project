import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shell',
      component: () => import("@renderer/App.vue")
    },
  ]
})

export default router
