<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import { computed } from 'vue'
import { useThemeStore } from './stores/theme.store'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.store'
import AuthLayout from './layout/AuthLayout.vue'
import MainLayout from './layout/MainLayout.vue'

// Загрузка темы
const theme = useThemeStore()
const savedTheme = localStorage.getItem('darkMode') === 'true'
theme.load(savedTheme)

// Layout
const route = useRoute()
const layout = computed(() =>
  route.meta.layout === 'auth' ? AuthLayout : MainLayout
)

// Layout-Router
const router = useRouter()
const auth = useAuthStore()

auth.initialize()

router.beforeEach((to, _, next) => {
  const requiredAuth = to.meta.auth

  if (requiredAuth && auth.isAuthenticated) {
    next()
  } else if (requiredAuth && !auth.isAuthenticated) {
    next('/auth?action=login&message=requiredAuth')
  } else {
    next()
  }
})
</script>

<template>
  <div>
    <TheHeader />
    <component :is="layout" v-if="layout" />
  </div>
</template>
