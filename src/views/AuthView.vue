<script setup lang="ts">
import { useRoute } from 'vue-router'
import Form from '../components/auth/Form.vue'
import WarningMessage from '../components/Ui/WarningMessage.vue'
import { computed, onMounted, ref, watch } from 'vue'

interface ErrorMessages {
  [key: string]: string
}

const ERRORS: ErrorMessages = {
  requiredAuth: 'Нужно авторизоваться',
  unknown: 'Неизвестная ошибка',
  'Invalid login credentials': 'Неверные учетные данные',
  'User already registered': 'Такой пользователь уже существует',
  'Password should be at least 6 characters.':
    'Пароль должен содержать не менее 6 символов',
}

const route = useRoute()
const messageIsVisible = ref(false)
const errorMessage = ref('')
let timeoutId: ReturnType<typeof setTimeout> | null = null

const errorText = computed(() => ERRORS[errorMessage.value] || ERRORS.unknown)

onMounted(() => {
  if (route.query.message) {
    errorMessage.value = String(route.query.message)
    enable()
  }
})

const clearMessageTimeout = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

watch(route, () => {
  clearMessageTimeout()
  disable()
  if (route.query.message) {
    errorMessage.value = String(route.query.message)
    enable()
  }
})

watch(errorMessage, () => {
  if (errorMessage.value.length) {
    clearMessageTimeout()
    enable()
  }
})

const enable = () => {
  messageIsVisible.value = true
  timeoutId = setTimeout(() => {
    disable()
    errorMessage.value = ''
  }, 5000)
}

const disable = () => (messageIsVisible.value = false)

const errorFunc = (message: string) => {
  clearMessageTimeout()
  enable()
  errorMessage.value = message
}
</script>

<template>
  <warning-message v-if="messageIsVisible">{{ errorText }}</warning-message>
  <Form @error="errorFunc" />
</template>
