import { defineStore } from 'pinia'
import supabase from '../lib/supabase'
import { useAuthStore } from './auth.store'

export interface Message {
  $id: string
  $createdAt: string
  message: string
  name: string
}

const defaultValue: { messages: Message[] } = {
  messages: [],
}

export const useChatStore = defineStore('chat', {
  state: () => defaultValue,
  getters: {
    isThereMessage: (state) => !!state.messages.length,
  },
  actions: {
    async addNewMessage(text: string) {
      try {
        const name = useAuthStore().name
        const { data } = await supabase
          .from('messages')
          .insert({ message: text, name })
          .select()
          .single()

        const message: Message = {
          $id: data.$id,
          $createdAt: data.$createdAt,
          message: data.message,
          name: data.name,
        }

        this.messages.push(message)
      } catch (e) {
        console.log(e)
      }
    },
    loadMessages(message: Message) {
      this.messages.push(message)
    },
    addAnotherMessage(message: Message) {
      const msg = this.messages.find((m) => m.$id === message.$id)
      if (!msg) this.messages.push(message)
    },
  },
})
