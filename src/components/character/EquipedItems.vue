<template>
  <div class="grid-container">
    <h1 class="header-text">Equipped Items</h1>

    <!-- Desktop Table -->
    <DataTable v-if="!isMobile" :value="equippedItems" tableStyle="min-width:50rem" class="desktop-table"
      responsiveLayout="scroll">
      <Column header="Icon" style="width:3rem;text-align:center;" class="icon-column">
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

    <!-- Mobile Table -->
    <DataTable v-else :value="equippedItems" class="mobile-table" @row-click="showItemDetails"
      responsiveLayout="scroll">
      <Column header="Icon" style="width:3rem;text-align:center;" class="icon-column">
        <template #body="slotProps">
          <img :src="slotIconMap[slotProps.data.slot] || '/src/assets/images/warrior.webp'" :alt="slotProps.data.slot"
            class="item-icon" />
        </template>
      </Column>
      <Column field="discount" header="Discount"></Column>
    </DataTable>

    <!-- Modal for Mobile -->
    <Dialog v-model:visible="visible" modal header="Item Details" :style="{ width: '80vw' }" :dismissableMask="true">
      <div v-if="selectedItem">
        <p><strong>Slot:</strong> {{ selectedItem.slot }}</p>
        <p><strong>Name:</strong> {{ selectedItem.name }}</p>
        <p><strong>Description:</strong> {{ selectedItem.description }}</p>
        <p><strong>Stats:</strong> {{ selectedItem.stats }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import { usePlayerStore } from '@/stores/mainStore'

// Reactive state for modal and selected item
const visible = ref(false)
const selectedItem = ref<any>(null)
const isMobile = ref(false)

const playerStore = usePlayerStore()
const equippedItemsData = computed(() => playerStore.equipedItems)
const equippedItems = computed(() => {
  return equippedItemsData.value.map(item => ({
    ...item,
    stats: `+${item.stats} ${item.stats_type}`,
    discount: `${item.discount}% ${item.discount_type}`
  }))
})

// Show modal on mobile
const showItemDetails = (event: any) => {
  selectedItem.value = event.data
  visible.value = true
}

// Determine if it’s mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onBeforeMount(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onMounted(async () => {
  await playerStore.fetchOwnItemsByCharacter()
  await playerStore.fetchEquipedItemsByCharacter()
})

// slotIconMap (fill in with your icons)
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

@media (max-width: 1280px) {
  .grid-container {
    padding: 0;
  }
}
</style>
