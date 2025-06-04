<template>
  <main class="home-container">
    <h1 class="welcome-text">Welcome to our L2P RPG Bar Game!</h1>
    <p class="info-text">
      Level up your character and earn real discounts at the bar. Play, compete, and drink with style!
    </p>
    <p>This game is still in demo version so please be patient and report any bugs to anyone eligible.</p>
    <div class="logo-row">
      <img src="@/assets/images/sova_horde.png" alt="Horde Logo" class="faction-logo" />
      <img src="@/assets/images/sova_aliance.png" alt="Alliance Logo" class="faction-logo" />
    </div>
  </main>
</template>

<script setup lang="ts">
// no extra logic needed here
</script>

<style scoped>
.home-container {
  text-align: center;
  padding: 2rem;
  color: #fff;
  background-color: #1e1e2f;
  min-height: 76vh;
  /* adjust for navbar height */
}

.welcome-text {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffd369;
}

.info-text {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.logo-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.faction-logo {
  max-width: 300px;
  height: auto;
}

@media (max-width: 768px) {
  .faction-logo {
    max-width: 140px;
  }
}
</style>
