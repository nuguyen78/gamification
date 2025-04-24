<template>
  <div class="grid-container">
    <h1 class="header-text">Equiped Items</h1>
    <DataTable :value="equipedItems" tableStyle="min-width: 50rem">
      <Column field="slot" header="Slot"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="bonus" header="Bonus"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePlayerStore } from '@/stores/mainStore'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const playerStore = usePlayerStore();

onMounted(async () => {
  await playerStore.fetchOwnItemsByCharacter(1)
  await playerStore.fetchEquipedItemsByCharacter(1)
})

const equipedItems = computed(() => playerStore.equipedItems)
const ownItems = computed(() => playerStore.ownItems)
</script>

<style scoped>
.grid-container {
  padding: 0rem 2rem 2rem 2rem;
  margin-top: 0rem;
  color: white;
}
</style>