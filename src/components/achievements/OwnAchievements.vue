<template>
    <div class="inline-container">
        <h1 class="header-text">Own achievements</h1>
        <p class="status-counter">
        <h2>In Use: {{ inUseCount }} / 3</h2>
        </p>
    </div>

    <div class="card">
        <DataTable v-model:filters="filters" :value="ownedAchievements" paginator :rows="10" dataKey="id"
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

            <!-- Status Column -->
            <Column field="status" header="Status" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="status-toggle">
                        <Button @click="toggleStatus(data)" :label="getStatusLabel(data.status)"
                            :severity="getStatusSeverity(data.status)" size="small"
                            :disabled="data.status === 'used'" />
                    </div>
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
import Button from 'primevue/button';

const playerStore = usePlayerStore();

onMounted(async () => {
    await playerStore.fetchOwnedAchievements()
})

const ownedAchievements = computed(() => playerStore.ownedAchievements);

const loading = ref(false);

// Filters configuration
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    discount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    discount_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const toggleStatus = (achievement: any) => {
    console.log('Toggling status for achievement:', achievement.status);
    if (achievement.status === 'use') {
        achievement.status = 'in_use';
    } else if (achievement.status === 'in_use') {
        achievement.status = 'use';
    }
    // If you have an API to update this status, call it here
    playerStore.updateAchievementStatus(achievement.id, achievement.status);
};

// Button label helper
const getStatusLabel = (status: string) => {
    return status === 'use' ? 'Use' : status === 'in_use' ? 'In Use' : 'Used';
};

const getStatusSeverity = (status: string) => {
    // PrimeVue severity options: 'secondary', 'success', 'info', 'warning', 'danger'
    return status === 'use' ? 'success' : 'info';
};

const inUseCount = computed(() => {
    return ownedAchievements.value.filter(a => a.status === 'in_use').length;
});
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

.status-toggle {
    display: flex;
    align-items: center;
}

span {
    color: #999;
}

.inline-container {
    display: flex;
    justify-content: space-between;
    /* header on the left, counter on the right */
    align-items: center;
    /* vertically aligned */
    margin-bottom: 1rem;
    /* spacing below */
}

.header-text {
    color: white;
    margin: 0;
    /* remove default margin for better alignment */
}

.status-counter {
    background-color: #1f2937;
    /* Tailwind gray-800 */
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin: 0;
    /* remove default margin */
}
</style>