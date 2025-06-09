import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/auth',
    component: AuthView,
    meta: {
      layout: 'auth',
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
