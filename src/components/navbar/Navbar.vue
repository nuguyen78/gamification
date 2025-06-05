<template>
  <nav class="navbar navbar-expand-lg position-fixed top-0 w-100" data-bs-theme="dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/"><img :src="`${base}images/l2p_logo.png`" class="logo-icon" />
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <!-- Protected routes: only when logged in -->
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink class="nav-link active" to="/DiscountCode">Discount Code</RouterLink>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink class="nav-link active" to="/character">Character</RouterLink>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink class="nav-link active" to="/items">Items</RouterLink>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink class="nav-link active" to="/achievements">Achievements</RouterLink>
          </li>

          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink class="nav-link active" to="/faq">FAQ</RouterLink>
          </li>

          <!-- Public routes: only when NOT logged in -->
          <li class="nav-item" v-if="!isLoggedIn">
            <RouterLink class="nav-link active" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <RouterLink class="nav-link active" to="/register">Register</RouterLink>
          </li>

          <!-- Logout: only when logged in -->
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-link nav-link" @click="onLogout">Logout</button>
          </li>

          <!-- (Optional) other always-visible items -->
          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/api/authService'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import $ from 'jquery'

const base = import.meta.env.BASE_URL
const router = useRouter()

// ✅ Use reactive store
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

function onLogout() {
  logout()
  authStore.logout() // ✅ update the store properly
  router.push({ name: 'login' })
}

// collapse navbar on nav click (jQuery workaround)
onMounted(() => {
  nextTick(() => {
    console.log("ready")
    $('.dropdown-item, .single, .nav-link').on('click', function () {
      $('#navbarSupportedContent').removeClass('show')
    })

    $(document).on('click', '.nav-link', function () {
      $('#navbarSupportedContent').removeClass('show')
    })
  })
})
</script>

<style scoped>
.navbar {
  position: relative !important;
  left: 0;
  background-color: #4b9e40;
  font-size: 1.2rem;
}

#navbarSupportedContent {
  justify-content: flex-end;
}

.logo-icon {
  width: 4rem;
}

:deep(.nav-link) {
  font-weight: bold;
}

.nav-item:hover .nav-link {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #fff;
  transition: background-color 0.3s ease;
}
</style>
