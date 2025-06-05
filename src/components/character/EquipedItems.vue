<template>
  <div class="grid-container">
    <h1 class="header-text">Equipped Items</h1>

    <!-- Desktop Table -->
    <DataTable v-if="!isMobile" :value="equippedItems" tableStyle="min-width:50rem" class="desktop-table"
      responsiveLayout="scroll">
      <Column header="Icon" style="width:3rem;text-align:center;" class="icon-column">
        <template #body="slotProps">
          <img :src="slotIconMap[slotProps.data.slot]" :alt="slotProps.data.slot" class="item-icon" />
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
          <img :src="slotIconMap[slotProps.data.slot]" :alt="slotProps.data.slot" class="item-icon" />
        </template>
      </Column>
      <Column field="discount" header="Discount"></Column>
    </DataTable>

    <!-- Modal for Mobile -->
    <ReusableModal v-model:visible="visible" :header="'Item Details'" :item="selectedItem" :fields="{
      Slot: 'slot',
      Name: 'name',
      Description: 'description',
      Stats: 'stats'
    }" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import { usePlayerStore } from '@/stores/mainStore'
import ReusableModal from '@/components/ReusableModal.vue'

const base = import.meta.env.BASE_URL;
// Reactive state for modal and selected item
const visible = ref(false)
const selectedItem = ref<any>(null)
const isMobile = ref(false)

const playerStore = usePlayerStore()
const equippedItemsData = computed(() => playerStore.equipedItems)

const slotOrder = [
  'helmet',
  'shoulders',
  'cloak',
  'chest',
  'gloves',
  'legs',
  'feet',
  'ring',
  'weapon'
]

const equippedItems = computed(() => {
  const mapped = equippedItemsData.value.map(item => ({
    ...item,
    stats: `+${item.stats} ${item.stats_type}`,
    discount: item.discount === 0 ? '-' : `${item.discount}% of ${item.discount_type}`
  }))

  return mapped.sort((a, b) => {
    return slotOrder.indexOf(a.slot) - slotOrder.indexOf(b.slot)
  })
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
  helmet: `${base}images/helmet2.png`,
  shoulders: `${base}images/shoulders.png`,
  cloak: `${base}images/cloak.png`,
  chest: `${base}images/chest.png`,
  gloves: `${base}images/gloves.png`,
  legs: `${base}images/legs.png`,
  feet: `${base}images/feet.png`,
  ring: `${base}images/ring.png`,
  weapon: `${base}images/sword_icon2.webp`
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
