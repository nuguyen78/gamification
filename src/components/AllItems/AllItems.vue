<template>
    <div class="grid-container">
        <h1 class="header-text">All Items</h1>

        <!-- Desktop Version -->
        <DataTable v-if="!isMobile" v-model:filters="filters" :value="allItems" paginator :rows="50" dataKey="item_id"
            filterDisplay="row" :globalFilterFields="['slot', 'name', 'description', 'statsDisplay', 'discountDisplay']"
            :loading="loading" responsiveLayout="scroll">
            <template #header>
                <div class="flex justify-end">
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </div>
            </template>

            <template #empty>No equipped items found.</template>
            <template #loading>Loading equipped items data. Please wait.</template>

            <Column header="Icon" style="width:4rem;text-align:center;">
                <template #body="{ data }">
                    <img :src="slotIconMap[data.slot]" :alt="data.slot" class="item-icon" />
                </template>
            </Column>

            <Column field="slot" header="Slot" style="min-width: 12rem">
                <template #body="{ data }">{{ data.slot }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by slot" />
                </template>
            </Column>

            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">{{ data.name }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>

            <Column field="description" header="Description" style="min-width: 20rem">
                <template #body="{ data }">{{ data.description }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()"
                        placeholder="Search by description" />
                </template>
            </Column>

            <Column field="statsDisplay" header="Stats" style="min-width: 12rem">
                <template #body="{ data }">{{ data.stats }} {{ data.stats_type }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by stats" />
                </template>
            </Column>

            <Column field="discountDisplay" header="Discount" style="min-width: 12rem">
                <template #body="{ data }">{{ data.discount }}% {{ data.discount_type }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by discount" />
                </template>
            </Column>
        </DataTable>

        <!-- Mobile Version -->
        <div v-else>
            <!-- Mobile Global Search -->
            <div class="flex justify-end mb-2">
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </div>

            <DataTable :value="allItems" class="mobile-table" @row-click="showItemDetails" dataKey="item_id"
                responsiveLayout="scroll" :filters="filters"
                :globalFilterFields="['slot', 'name', 'description', 'statsDisplay', 'discountDisplay']">
                <Column header="Icon" style="width:4rem;text-align:center;">
                    <template #body="{ data }">
                        <img :src="slotIconMap[data.slot]" :alt="data.slot" class="item-icon" />
                    </template>
                </Column>
                <Column field="name" header="Name" />
            </DataTable>
        </div>


        <!-- Modal -->
        <Dialog v-model:visible="visible" modal header="Item Details" :style="{ width: '80vw' }"
            :dismissableMask="true">
            <div v-if="selectedItem">
                <p><strong>Slot:</strong> {{ selectedItem.slot }}</p>
                <p><strong>Name:</strong> {{ selectedItem.name }}</p>
                <p><strong>Description:</strong> {{ selectedItem.description }}</p>
                <p><strong>Stats:</strong> {{ selectedItem.stats }} {{ selectedItem.stats_type }}</p>
                <p><strong>Discount:</strong> {{ selectedItem.discount }}% {{ selectedItem.discount_type }}</p>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { usePlayerStore } from '@/stores/mainStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import { FilterMatchMode } from '@primevue/core/api'

const base = import.meta.env.BASE_URL;

const playerStore = usePlayerStore()
const loading = ref(false)
const visible = ref(false)
const selectedItem = ref<any>(null)
const isMobile = ref(false)

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
}
onBeforeMount(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onMounted(async () => {
    loading.value = true
    await playerStore.fetchAllItems()
    loading.value = false
})

const allItems = computed(() =>
    playerStore.allItems.map(item => ({
        ...item,
        statsDisplay: `${item.stats} ${item.stats_type}`.toLowerCase(),
        discountDisplay:
            item.discount && item.discount_type
                ? `${item.discount} ${item.discount_type}`.toLowerCase()
                : '',
    }))
)

const showItemDetails = (event: any) => {
    selectedItem.value = event.data
    visible.value = true
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    slot: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    statsDisplay: { value: null, matchMode: FilterMatchMode.CONTAINS },
    discountDisplay: { value: null, matchMode: FilterMatchMode.CONTAINS },
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

.header-text {
    color: white;
}

@media (max-width: 1280px) {
    .grid-container {
        padding: 0;
    }
}
</style>
