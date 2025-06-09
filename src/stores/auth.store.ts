import { defineStore } from 'pinia'
import supabase from '../lib/supabase'

export interface User {
  email: string
  password: string
  name?: string
}

type myUser = string

interface defaultValue {
  name: myUser
  isAuth: boolean
}

const defaultValue: defaultValue = {
  name: '',
  isAuth: Boolean(localStorage.getItem('sb-huavdkastjaujqfyrqbu-auth-token')),
}

export const useAuthStore = defineStore('auth', {
  state: () => defaultValue,
  getters: {
    isAuthenticated: (state) => state.isAuth,
  },
  actions: {
    async initialize() {
      try {
        const { data } = await supabase.auth.getUser()
        this.name = data.user?.user_metadata.name ?? ''
        this.isAuth = Boolean(data.user)
      } catch (error) {
        console.error('Failed to initialize auth store:', error)
      }
    },
    async logout() {
      await supabase.auth.signOut()
      this.name = ''
      this.isAuth = false
    },
    async login(user: User) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      })

      if (data.session) {
        this.name = data.user.user_metadata.name
        this.isAuth = true
      }

      if (error) throw error
    },
    async register(user: User) {
      const { error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            name: user.name,
          },
        },
      })

      if (error) throw error
    },
  },
})
