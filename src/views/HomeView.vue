<script setup lang="ts">
import TheChat from '../components/chat/TheChat.vue'
import supabase from '../lib/supabase'
import { useChatStore } from '../stores/chat.store'
import type { Message as MessageType } from '../stores/chat.store'
import { onMounted, provide, ref } from 'vue'

// Загрузка сообщений
const chat = useChatStore()
const isLoading = ref(false)
const thereError = ref(false)

provide('isLoading', isLoading)
provide('thereError', thereError)

onMounted(async () => {
  try {
    isLoading.value = true
    const { data } = await supabase
      .from('messages')
      .select()
      .order('$createdAt')
    if (data) {
      for (const msg of data) {
        const message: MessageType = {
          $id: msg.$id,
          $createdAt: msg.$createdAt,
          message: msg.message,
          name: msg.name,
        }
        chat.loadMessages(message)
      }
    }
  } catch (e) {
    console.log(e)
    thereError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <TheChat />
</template>
