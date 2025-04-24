<script setup lang="ts">
import OwnedItems from '@/components/character/OwnedItems.vue'
import CharacterOverview from '@/components/character/CharacterOverview.vue'
import EquipedItems from '@/components/character/EquipedItems.vue'
</script>

<template>
  <main class="character-view">
    <CharacterOverview />

    <hr class="divider" />

    <div class="items-wrapper">
      <section class="item-card">
        <EquipedItems />
      </section>

      <section class="item-card">
        <OwnedItems />
      </section>
    </div>
  </main>
</template>

<style scoped>
.character-view {
  /* match your overview width */
  margin: 2rem auto;
  /* center on the page */
  padding: 0 1rem;
}

.divider {
  border: none;
  height: 1px;
  background-color: #444;
  margin: 2.5rem 0;
}

.items-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* space between the two tables */
}

.item-card {
  background: #2d2f3a;
  /* same dark card bg */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
