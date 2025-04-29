// src/api/authService.ts
import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: 'https://l2pevents.cz/gamification', // uprav na svou doménu
  headers: {
    'Content-Type': 'application/json',
  },
})

// **INTERCEPTOR** – zachytí všechny odpovědi s chybou
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // vymažeme token
      localStorage.removeItem('jwt_token')
      delete api.defaults.headers.common['Authorization']
      // a přesměrujeme na přihlášení
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
  // případně další pole, např. username
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
  console.log(data)
  return api.post<{ success: boolean }>('/register.php', data).then(() => {})
}

// volitelně helper pro načtení profilu
export function fetchProfile<T>(): Promise<T> {
  return api.get<T>('/protected.php').then(res => res.data)
}

// při startu aplikace pokusíme se nastavit token z localStorage
const existingToken = localStorage.getItem('jwt_token')
if (existingToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`
}

// Odhlášení
export function logout(): void {
  // Vymaž token v localStorage
  localStorage.removeItem('jwt_token')
  // Odstraň default Authorization header
  delete api.defaults.headers.common['Authorization']
}

export default api
