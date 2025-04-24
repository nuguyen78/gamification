<template>
  <div class="character-card">
    <div class="avatar-section">
      <img class="avatar-image" src="@/assets/images/warrior.webp" alt="Arthur the Warrior" />
    </div>
    <div class="stats-section">
      <h2 class="stat name">Arthur</h2>
      <p class="stat">Level: <span class="value">5</span></p>
      <p class="stat">Experience: <span class="value">28/50</span></p>
      <div class="stat bonuses">
        <h3>Bonuses</h3>
        <ul>
          <li v-for="(bonus, i) in bonuses" :key="i">
            <strong>{{ bonus.name }}</strong>: {{ bonus.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePlayerStore } from '@/stores/mainStore';

const playerStore = usePlayerStore();
onMounted(() => {
  playerStore.fetchPlayers();
});

const bonuses = [
  { name: 'Fighter of Dawn', description: 'If you fight an ork, you get +5 strength' },
  { name: 'Defender of Innocent', description: 'If you defend a human, you get +10 strength' },
  { name: 'Night Stalker', description: 'During night battles, you get +3 agility' },
];
</script>

<style scoped>
.character-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #1e1e2f;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  margin: 2rem 2rem 2rem 2rem;
}

.avatar-section,
.stats-section {
  background: #27293d;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
}

.avatar-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.stats-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #edf2f7;
}

.stat {
  margin-bottom: 1rem;
}

.stat.name {
  font-size: 2rem;
  font-weight: bold;
  color: #ffd369;
  margin-bottom: 1.5rem;
}

.stat .value {
  font-weight: bold;
  color: #ffd369;
}

.bonuses h3 {
  margin-bottom: 0.5rem;
  color: #a0aec0;
}

.bonuses ul {
  list-style: inside disc;
  padding-left: 0;
}

.bonuses li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .character-card {
    grid-template-columns: 1fr;
  }
}
</style>
