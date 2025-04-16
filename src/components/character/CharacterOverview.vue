<template>
  <!--     <div>
      <ul v-if="playerStore.players.length">
        <li v-for="player in playerStore.players" :key="player.id">
          {{ player.name }} {{ player.surname }}
        </li>
      </ul>
    </div> -->
  <div class="grid-container">
    <div class="avatar-section">
      <div class="avatar-image-container">
        <img class="avatar-image" src="@/assets/images/warrior.webp" alt="Placeholder Image" width="" />
      </div>
    </div>
    <div class="stats-section">
      <div class="stat name">Arthur</div>
      <div class="stat">level: 5</div>
      <div class="stat">experience: 28/50</div>
      <div class="stat">
        Bonuses:
        <ul class="bonus-list">
          <li v-for="(bonus, index) in bonuses" :key="index" class="bonus-item">
            <strong>{{ bonus.name }}</strong>: {{ bonus.description }}
          </li>
        </ul>
      </div>
    </div>
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

// Example bonuses array
const bonuses = [
  {
    name: "Fighter of Dawn",
    description: "If you fight an ork, you get +5 strength",
  },
  {
    name: "Defender of Innocent",
    description: "If you defend a human, you get +10 strength",
  },
  {
    name: "Night Stalker",
    description: "During night battles, you get +3 agility",
  },
]
</script>

<style scoped>
* {
  color: white;
}

.grid-container {
  display: grid;
  /* Two equal columns */
  grid-template-columns: 70% 30%;
  width: 98%;
  margin-left: 1%;
  margin-top: 1%;
  align-items: stretch;
  height: 500px;

}

.stats-section {
  border: 1px solid lightblue;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
  height: 100%;
  padding-top: 5%;
}

.avatar-section {
  border: 1px solid lightblue;
  text-align: left;
  /* margin-top: 2% */
}

.avatar-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.avatar-image {
  max-height: 500px;
}

.stat {
  padding: 5px;
  font-size: 1.1rem;
}

.stat.name {
  font-weight: bold;
  font-size: 1.8rem;
}
</style>