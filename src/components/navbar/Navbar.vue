<template>
  <nav class="navbar navbar-expand-lg position-fixed top-0 w-100" data-bs-theme="dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Navbar</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/character">Character</RouterLink>
            <!--  <a class="nav-link active" aria-current="page" href="#">Home</a> -->
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/items">items</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active" to="/register">Register</RouterLink>
          </li>
          <!-- Když je přihlášen, zobrazíme Logout tlačítko -->
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-link nav-link" @click="onLogout">Logout</button>
          </li>
          <li class="nav-item dropdown">
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
          </li>
        </ul>
        <!-- <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '@/api/authService';

const router = useRouter();

// reaktivně kontrolujeme, jestli je token v localStorage
const isLoggedIn = computed(() => !!localStorage.getItem('jwt_token'));

function onLogout() {
  logout();
  router.push({ name: 'login' });
}
</script>

<style scoped>
.navbar {
  position: relative !important;
  left: 0;
  background-color: #4b9e40;
}

#navbarSupportedContent {
  justify-content: flex-end;
}
</style>
