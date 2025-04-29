import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterView from '../views/CharacterView.vue'
import ItemsView from '../views/ItemsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/character',
      name: 'character',
      component: CharacterView,
      meta: { requiresAuth: true },
    },
    {
      path: '/items',
      name: 'Items',
      component: ItemsView,
      meta: { requiresAuth: true },
    },
  ],
})

// jednoduchý guard, pokud routa vyžaduje autentizaci
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt_token')
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' })
  }
  if ((to.name === 'login' || to.name === 'register') && token) {
    // už přihlášený? přesměruj na Home
    return next({ name: 'home' })
  }
  next()
})
export default router
