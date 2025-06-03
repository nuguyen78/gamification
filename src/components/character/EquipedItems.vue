<template>
  <div class="grid-container">
    <h1 class="header-text">Equipped Items</h1>

    <DataTable :value="equippedItems" tableStyle="min-width:50rem">
      <!-- ICON COLUMN via scoped slot -->
      <Column header="Icon" style="width:3rem;text-align:center;padding-top: 0.5rem;padding-bottom: 0.5rem;">
        <template #body="slotProps">
          <img :src="slotIconMap[slotProps.data.slot] || '/src/assets/images/warrior.webp'" :alt="slotProps.data.slot"
            class="item-icon" />
        </template>
      </Column>

      <Column field="slot" header="Slot"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="stats" header="Stats"></Column>
      <Column field="discount" header="Discount"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { usePlayerStore } from '@/stores/mainStore'

const playerStore = usePlayerStore()
const equippedItemsData = computed(() => playerStore.equipedItems)

const equippedItems = computed(() => {
  return equippedItemsData.value.map(item => ({
    ...item,
    stats: `+${item.stats} ${item.stats_type}`,
    discount: `${item.discount}% ${item.discount_type}`
  }))
})

onMounted(async () => {
  await playerStore.fetchOwnItemsByCharacter()
  await playerStore.fetchEquipedItemsByCharacter()
})

// fill in these paths (or imports) with your actual icon URLs later
const slotIconMap: Record<string, string> = {
  helmet: 'src/assets/images/helmet2.png',
  shoulders: 'src/assets/images/shoulders.png',
  cloak: 'src/assets/images/cloak.png',
  chest: 'src/assets/images/chest.png',
  gloves: 'src/assets/images/gloves.png',
  legs: 'src/assets/images/legs.png',
  feet: 'src/assets/images/feet.png',
  ring: 'src/assets/images/ring.png',
  weapon: 'src/assets/images/sword_icon2.webp'
}
</script>

<style scoped>
.grid-container {
  padding: 0 2rem 2rem;
  color: white;
}

.item-icon {
  width: 4.5rem;
  height: 4.5rem;
  object-fit: contain;
  display: inline-block;
}
</style>
