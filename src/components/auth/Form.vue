<script setup lang="ts">
import Input from '../Ui/Input.vue'
import Button from '../Ui/Button.vue'
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.store'

const emit = defineEmits(['error'])

const route = useRoute()
const action = computed(() => route.query.action)
const isLogin = computed(() => action.value === 'login')

const auth = useAuthStore()
const router = useRouter()

const user = reactive({
  email: '',
  password: '',
  name: '',
})

const isValid = computed(() => {
  if (isLogin.value) return user.email && user.password
  else return user.email && user.password && user.name
})

const submit = async () => {
  if (isValid.value) {
    try {
      if (isLogin.value) {
        await auth.login(user)
        router.push('/')
      } else {
        await auth.register(user)
      }
      Object.assign(user, {
        email: '',
        password: '',
        name: '',
      })
    } catch (e) {
      if (e instanceof Error) {
        if (e instanceof Error) {
          emit('error', e.message)
        } else {
          emit('error', 'unknown')
        }
      }
    }
  }
}
</script>

<template>
  <div class="auth">
    <h3 class="auth__title">{{ isLogin ? 'Логин' : 'Регистрация' }}</h3>
    <form class="auth__form" @submit.prevent="submit">
      <Input v-model="user.email" type="email" placeholder="Почта" />
      <Input v-model="user.password" type="password" placeholder="Пароль" />
      <Input v-if="!isLogin" v-model="user.name" placeholder="Имя" />
      <Button>{{ isLogin ? 'Войти' : 'Зарегистрироваться' }}</Button>
    </form>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth__title {
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--textColor);
  transition: var(--smoooth);
  margin-bottom: 1.5rem;
}

.auth__form {
  background-color: var(--backgroundChat);
  box-shadow: 0 0 3rem 0.5rem var(--shadowChat);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0 auto;
  border-radius: var(--radius);
  width: 400px;
  padding: 1.5rem;
  transition: var(--smooth);
}
</style>
