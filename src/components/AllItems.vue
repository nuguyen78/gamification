<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="ownItems" paginator :rows="10" dataKey="item_id"
            filterDisplay="row" :globalFilterFields="['slot', 'name', 'description', 'bonus']" :loading="loading">
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

            <!-- Bonus Column -->
            <Column field="bonus" header="Bonus" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.bonus }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by bonus" />
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

const playerStore = usePlayerStore();

onMounted(async () => {
    await playerStore.fetchOwnItemsByCharacter(1)
    await playerStore.fetchEquipedItemsByCharacter(1)
})

const equipedItems = computed(() => playerStore.equipedItems)
const ownItems = computed(() => playerStore.ownItems)

const loading = ref(false);

// Filters configuration
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    slot: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bonus: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

/* const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warn';

        case 'renewal':
            return null;
    }
} */
</script>

<style scoped>
.grid-container {
    padding: 2rem;
    margin-top: 0rem;
    color: white;
}
</style>