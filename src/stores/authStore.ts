// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(!!localStorage.getItem('jwt_token'))

  function login(token: string) {
    localStorage.setItem('jwt_token', token)
    isLoggedIn.value = true
  }

  function logout() {
    localStorage.removeItem('jwt_token')
    isLoggedIn.value = false
  }

  return { isLoggedIn, login, logout }
})
