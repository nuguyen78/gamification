<template>
  <div v-if="loading" class="loading-screen">
    <i class="pi pi-spin pi-spinner" style="font-size: 15rem;color: gray;"></i>
  </div>
  <div v-else class="character-card">
    <div class="avatar-section">
      <img class="avatar-image" :src="`${base}images/${player?.avatar}`" alt="avatar image" />
    </div>
    <div class="stats-section">
      <h2 class="stat name">{{ player?.nick }}</h2>
      <h5 class="stat">Class: <span class="value">{{ player?.class }}</span></h5>
      <div class="stat-row">
        <p class="stat">Level: <span class="value">{{ player?.lvl }}</span></p>
        <p class="stat">Experience: <span class="value">{{ player?.experience }}</span></p>
      </div>

      <div class="stat stats">
        <h3>Stats</h3>
        <ul>
          <li v-for="(value, stat) in totalStats" :key="stat">
            <strong>{{ stat }}:</strong> {{ value }}
          </li>
        </ul>
        <h3>active achievements</h3>
        <ul>
          <li v-for="(achievement, i) in inUseAchievements" :key="i">
            <strong>{{ achievement.name }}</strong>: {{ achievement.description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePlayerStore } from '@/stores/mainStore';
import "primeicons/primeicons.css";

const base = import.meta.env.BASE_URL;
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  await playerStore.fetchPlayer();
  await playerStore.fetchEquipedItemsByCharacter()
  await playerStore.fetchInUseAchievements()
  loading.value = false
})

const playerStore = usePlayerStore();
const player = computed(() => playerStore.player);
const equippedItems = computed(() => playerStore.equipedItems)
const inUseAchievements = computed(() => playerStore.inUseAchievements)

const baseStats = computed(() => ({
  health: player.value?.health ?? 0,
  strength: player.value?.strength ?? 0,
  agility: player.value?.agility ?? 0,
  stamina: player.value?.stamina ?? 0,
  speed: player.value?.speed ?? 0,
  armor: player.value?.armor ?? 0,
  intelligence: player.value?.intelligence ?? 0,
}));

const achievements = [
  { name: 'Friend of Kofola', description: '5% discount for whole order' },
  { name: 'Beer owner', description: '1 small beer for free' },
  { name: 'did you said lays?', description: 'on first friday of month 1 free lays' },
];

const totalStats = computed(() => {
  const stats = { ...baseStats.value };

  equippedItems.value.forEach(item => {
    const key = (item.stats_type || '').toLowerCase() as keyof typeof stats;

    if (key in stats) {
      stats[key] += item.stats;
    }
  });

  return stats;
});
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
  max-height: 500px;
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

.stats ul:first-of-type {
  columns: 2;
  column-gap: 1.5rem;
  list-style-position: inside;
}

.stats h3 {
  margin-bottom: 0.5rem;
  color: #a0aec0;
}

.stats ul {
  list-style: inside disc;
  padding-left: 0;
}

.stats li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .character-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0rem;
    padding: 0.5rem;
  }

  .avatar-section,
  .stats-section {
    width: 100%;
    padding: 1rem;
  }

  .avatar-image {
    max-height: 300px;
  }

  .stats ul:first-of-type {
    columns: 1;
    /* Single column on phones */
  }

  .stat.name {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

.stat-row {
  display: flex;
  flex-direction: column;
}

/* On mobile: row layout */
@media (max-width: 768px) {
  .stat-row {
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }

  .stat-row .stat {
    margin-bottom: 0;
    white-space: nowrap;
  }
}

.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}
</style>
