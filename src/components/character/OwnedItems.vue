<template>
    <div class="grid-container">
        <h1 class="header-text">Owned Items</h1>

        <!-- Desktop Table with full filters -->
        <DataTable v-if="!isMobile" v-model:filters="filters" :value="ownItems" paginator :rows="10" dataKey="item_id"
            filterDisplay="row" :globalFilterFields="['slot', 'name', 'description', 'stats', 'discount']"
            :loading="loading" responsiveLayout="scroll">
            <!-- Global Search -->
            <template #header>
                <div class="flex justify-end">
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </div>
            </template>

            <!-- Icon Column -->
            <Column header="Icon" style="width:3rem;text-align:center;" class="icon-column">
                <template #body="{ data }">
                    <img :src="slotIconMap[data.slot]" :alt="data.slot" class="item-icon" />
                </template>
            </Column>

            <!-- Slot Column -->
            <Column field="slot" header="Slot" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.slot }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by slot" />
                </template>
            </Column>

            <!-- Name Column -->
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>

            <!-- Description Column -->
            <Column field="description" header="Description" style="min-width: 20rem">
                <template #body="{ data }">
                    {{ data.description }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()"
                        placeholder="Search by description" />
                </template>
            </Column>

            <!-- Stats Column -->
            <Column field="stats" header="Stats" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.stats }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by stats" />
                </template>
            </Column>

            <!-- Discount Column -->
            <Column field="discount" header="Discount" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.discount }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by discount" />
                </template>
            </Column>

            <!-- Action Column -->
            <Column header="Actions" style="min-width: 8rem">
                <template #body="{ data }">
                    <Button label="Equip" :loading="loadingId === data.item_id" @click="onEquip(data.item_id)" />
                </template>
            </Column>
        </DataTable>

        <!-- Mobile Table with only global search -->
        <DataTable v-else :value="ownItems" class="mobile-table" @row-click="showItemDetails" responsiveLayout="scroll">
            <!-- Global Search -->
            <template #header>
                <div class="flex justify-end">
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </div>
            </template>

            <Column header="Icon" style="width:3rem;text-align:center;" class="icon-column">
                <template #body="{ data }">
                    <img :src="slotIconMap[data.slot]" :alt="data.slot" class="item-icon" />
                </template>
            </Column>

            <Column field="discount" header="Discount"></Column>
        </DataTable>

        <!-- Modal for Mobile Details -->
        <ReusableModal v-model:visible="visible" :header="'Item Details'" :item="selectedItem" :fields="{
            Slot: 'slot',
            Name: 'name',
            Description: 'description',
            Stats: 'stats',
            Discount: 'discount'
        }">
            <template #footer="{ item }">
                <Button label="Equip" :loading="loadingId === item.item_id" @click="onEquip(item.item_id)" />
            </template>
        </ReusableModal>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeMount, ref } from 'vue'
import { usePlayerStore } from '@/stores/mainStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { FilterMatchMode } from '@primevue/core/api'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ReusableModal from '@/components/ReusableModal.vue'

const base = import.meta.env.BASE_URL;

const playerStore = usePlayerStore()

const isMobile = ref(false)
const visible = ref(false)
const selectedItem = ref<any>(null)
const loadingId = ref<string | null>(null)
const loading = ref(false)

const ownItemsData = computed(() => playerStore.ownItems)
const ownItems = computed(() => {
    return ownItemsData.value.map(item => ({
        ...item,
        stats: `+${item.stats} ${item.stats_type}`,
        discount: `${item.discount}% ${item.discount_type}`
    }))
})

// Filters: full filters for desktop
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    slot: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stats: { value: null, matchMode: FilterMatchMode.CONTAINS },
    discount: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

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

// Determine if it's mobile
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
}
onBeforeMount(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

// Load data
onMounted(async () => {
    await playerStore.fetchOwnItemsByCharacter()
    await playerStore.fetchEquipedItemsByCharacter()
})

// Equip item
async function onEquip(itemId: string) {
    loadingId.value = itemId
    try {
        await playerStore.equipOwnedItem(itemId)
    } catch (e) {
        console.error(e)
    } finally {
        loadingId.value = null
        visible.value = false // Close modal after equip
    }
}

// Show modal on mobile
const showItemDetails = (event: any) => {
    selectedItem.value = event.data
    visible.value = true
}
</script>

<style scoped>
.grid-container {
    padding: 2rem;
    color: white;
}

.header-text {
    color: white;
}

.card {
    border: none;
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
