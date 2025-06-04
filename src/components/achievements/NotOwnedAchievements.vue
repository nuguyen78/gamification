<template>
    <h1 class="header-text">Not owned achievements</h1>
    <div class="card">
        <DataTable v-model:filters="filters" :value="notOwnedAchievements" paginator :rows="10" dataKey="id"
            filterDisplay="row" :globalFilterFields="['name', 'description', 'discount', 'discount_type']"
            :loading="loading">
            <!-- Search Bar -->
            <template #header>
                <div class="flex justify-end">
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </div>
            </template>

            <!-- Empty State -->
            <template #empty>
                No achievements found.
            </template>

            <!-- Loading State -->
            <template #loading>
                Loading achievements data. Please wait.
            </template>

            <!-- Name Column -->
            <Column field="name" header="name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>

            <!-- Description Column -->
            <Column field="description" header="Description" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.description }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()"
                        placeholder="Search by description" />
                </template>
            </Column>
            <!-- Max Uses Column -->
            <Column field="amount" header="Usage Limit" style="min-width: 8rem">
                <template #body="{ data }">
                    <span>{{ data.amount }}</span>
                </template>
            </Column>
            <!-- Condition Column -->
            <Column header="Condition" style="min-width: 14rem">
                <template #body="{ data }">
                    <span>{{ formatCondition(data.condition_type, data.condition_amount) }}</span>
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
    await playerStore.fetchNotOwnedAchievements(1)
})

const notOwnedAchievements = computed(() => playerStore.notOwnedAchievements);

const loading = ref(false);

// Filters configuration
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    condition_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    condition_amount: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
});

const formatCondition = (type: string, amount: number) => {
    if (!type) return '';

    let label = type.replace(/_/g, ' ');

    if (label === 'all') label = 'of any';
    if (label === 'special') return 'Special';

    if (amount === 1) return `1 ${label}`;
    return `${amount} ${label}`;
};
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