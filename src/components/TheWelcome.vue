<template>
  <div>
    <ul v-if="playerStore.players.length">
      <li v-for="player in playerStore.players" :key="player.id">
        {{ player.name }} {{ player.surname }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlayerStore } from '@/stores/mainStore'

// Access the store
const playerStore = usePlayerStore()

// Fetch players data on mount
onMounted(() => {
  playerStore.fetchPlayers()
})
</script>

<style scoped>
* {
  color: white;
}
</style>
