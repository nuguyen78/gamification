// src/api/authService.ts
import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: 'https://l2pevents.cz/gamification',
  headers: {
    'Content-Type': 'application/json',
  },
})

// **INTERCEPTOR** – zachytí všechny odpovědi s chybou
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token')
      delete api.defaults.headers.common['Authorization']
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  },
)

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  surname: string
  nick: string
}

export function login(data: LoginData): Promise<string> {
  return api.post<{ token: string }>('/login.php', data).then(res => {
    const token = res.data.token
    localStorage.setItem('jwt_token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return token
  })
}

export function register(data: RegisterData): Promise<void> {
  return api.post<{ success: boolean }>('/register.php', data).then(() => {})
}

// při startu aplikace pokusíme se nastavit token z localStorage
const existingToken = localStorage.getItem('jwt_token')
if (existingToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`
}

// Odhlášení
export function logout(): void {
  localStorage.removeItem('jwt_token')
  delete api.defaults.headers.common['Authorization']
}

export default api
