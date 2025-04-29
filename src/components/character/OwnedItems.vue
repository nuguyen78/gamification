<template>
    <h1 class="header-text">Owned Items</h1>
    <div class="card">
        <DataTable v-model:filters="filters" :value="ownItems" paginator :rows="10" dataKey="item_id"
            filterDisplay="row" :globalFilterFields="['slot', 'name', 'description', 'stats', 'discount']"
            :loading="loading">
            <!-- Search Bar -->
            <template #header>
                <div class="flex justify-end">
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </div>
            </template>

            <!-- Empty State -->
            <template #empty>
                No equipped items found.
            </template>

            <!-- Loading State -->
            <template #loading>
                Loading equipped items data. Please wait.
            </template>

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
                    <InputText v-model="filterModel.value" @input="filterCallback()"
                        placeholder="Search by discounts" />
                </template>
            </Column>

            <!-- Action Column -->
            <Column header="Actions" style="min-width: 8rem">
                <template #body="{ data }">
                    <Button label="Equip" :loading="loadingId === data.item_id" @click="onEquip(data.item_id)" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePlayerStore } from '@/stores/mainStore'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'

const playerStore = usePlayerStore();

const loadingId = ref<string | null>(null) //TODO
const CHARACTER_ID = 1  // TODO or pull this from your auth/user store

onMounted(async () => {
    await playerStore.fetchOwnItemsByCharacter(1)
    await playerStore.fetchEquipedItemsByCharacter(1)
})

const equipedItems = computed(() => playerStore.equipedItems)
const ownItemsData = computed(() => playerStore.ownItems)

const ownItems = computed(() => {
    return ownItemsData.value.map(item => ({
        ...item,
        stats: `+${item.stats} ${item.stats_type}`,
        discount: `${item.discount}% ${item.discount_type}`
    }))
})
const loading = ref(false);

// Filters configuration
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    slot: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    stats: { value: null, matchMode: FilterMatchMode.CONTAINS },
    discount: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

async function onEquip(itemId: string) {
    loadingId.value = itemId
    try {
        await playerStore.equipOwnedItem(CHARACTER_ID, itemId)
        // optionally show a toast/notification here
    }
    catch (e) {
        console.error(e)
        // show error feedback
    }
    finally {
        loadingId.value = null
    }
}
</script>

<style scoped>
.grid-container {
    padding: 2rem;
    margin-top: 0rem;
    color: white;
}

.header-text {
    color: white
}

.card {
    border: none;
}
</style>