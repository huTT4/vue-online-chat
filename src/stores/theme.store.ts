import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),
  actions: {
    load(value: boolean) {
      this.isDark = value
      document.documentElement.classList.toggle('dark', this.isDark)
    },
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
      localStorage.setItem('darkMode', String(this.isDark))
    },
  },
})
