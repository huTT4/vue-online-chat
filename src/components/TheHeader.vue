<script setup lang="ts">
import Toggle from './Ui/Toggle.vue'
import Logout from './Ui/Logout.vue'
import { useAuthStore } from '../stores/auth.store'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  await router.push('/auth?action=login')
}
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <router-link to="/" class="header__title">VEEChat</router-link>
      <div class="header__right">
        <Toggle />
        <nav class="header__nav">
          <template v-if="!auth.isAuthenticated">
            <router-link to="/auth?action=login">Логин</router-link>
            <span>/</span>
            <router-link to="/auth?action=register">Регистрация</router-link>
          </template>
          <template v-else>
            <span style="margin-right: 1rem">Имя: {{ auth.name }}</span>
            <Logout @click.prevent="logout" />
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--backroundHeader);
  border-radius: var(--radius);
  box-shadow: 0 0 1rem 0.1rem var(--shadowHeader);
  padding: 1rem;
  border-bottom: 1px solid var(--borderHeader);
  margin: 0.8rem 0.8rem 3rem;
  transition: 0.4s;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__title {
  font-size: 24px;
  font-weight: bold;
  color: var(--textColor);
}

.header__right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.header__nav a {
  color: var(--textColor);
  position: relative;
}

.header__nav a::before {
  content: '';
  position: absolute;
  bottom: -0.3rem;
  width: 0%;
  height: 2px;
  background-color: var(--textColor);
  transition: 0.8s;
}

.header__nav a:hover::before {
  width: 100%;
  transition: var(--smooth);
}

.header__nav span {
  color: var(--textColor);
}
</style>
