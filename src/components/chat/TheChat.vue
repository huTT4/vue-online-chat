<script setup lang="ts">
import { ref, onUpdated, nextTick, inject, onUnmounted } from 'vue'
import { useChatStore } from '../../stores/chat.store.ts'
import Message from './Message.vue'
import Loader from '../Ui/Loader.vue'
import Input from '../Ui/Input.vue'
import Button from '../Ui/Button.vue'
import supabase from '../../lib/supabase.ts'
import type { Message as MessageType } from '../../stores/chat.store.ts'
import dayjs from 'dayjs'

const store = useChatStore()
const chatContainer = ref<HTMLElement | null>(null)

const message = ref('')
const isLoading: boolean | undefined = inject('isLoading')
const thereError: boolean | undefined = inject('thereError')

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const submit = () => {
  if (message.value.trim().length) {
    store.addNewMessage(message.value)
    message.value = ''
  }
}

onUpdated(() => nextTick(scrollToBottom))

// Обновление чата в реальном времени при появлении нового сообщения
const subscribe = () => {
  const channel = supabase.channel('messages_channel')

  channel
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      (payload) => {
        const message: MessageType = {
          $id: payload.new.$id,
          $createdAt: payload.new.$createdAt,
          message: payload.new.message,
          name: payload.new.name,
        }
        store.addAnotherMessage(message)
      }
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}

const unsubscribe = subscribe()

onUnmounted(() => unsubscribe())
</script>

<template>
  <div class="chat">
    <Loader v-if="isLoading" />
    <template v-else>
      <div
        ref="chatContainer"
        class="chat__messages"
        v-if="store.isThereMessage"
      >
        <Message v-for="message in store.messages">
          <template #name>{{ message.name }}</template>
          <template #message>{{ message.message }}</template>
          <template #time>{{
            dayjs(message.$createdAt).format('HH:mm DD MMMM')
          }}</template>
        </Message>
      </div>
      <template v-else-if="thereError">
        <div class="text">
          <p style="margin-bottom: 0.5rem">Ошибка загрузки сообщений...</p>
          <p>Попробуйте позже</p>
        </div>
      </template>
      <p class="text" v-else>Сообщение пока нет...</p>
    </template>
    <form class="chat__control" @submit.prevent="submit">
      <Input v-model="message" />
      <Button />
    </form>
  </div>
</template>

<style scoped>
.text {
  color: var(--textColor);
  transition: var(--smooth);
}

.chat {
  background-color: var(--backgroundChat);
  box-shadow: 0 0 3rem 0.5rem var(--shadowChat);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  margin: 0 auto;
  border-radius: var(--radius);
  width: 700px;
  height: 600px;
  padding: 1.5rem;
  transition: var(--smooth);
}

.chat__messages {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding-right: 1rem;
  margin-right: -1rem;
}

.chat__messages::-webkit-scrollbar {
  background: var(--scrollbarBg);
  border-radius: 20px;
  width: 0.8rem;
  transition: 5s;
}

.chat__messages::-webkit-scrollbar-thumb {
  background: var(--scrollbarColor);
  border-radius: 20px;
  transition: 5s;
}

.chat__control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
</style>
