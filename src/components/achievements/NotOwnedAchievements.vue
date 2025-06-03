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

            <!-- Discount Column -->
            <!--  <Column field="discount" header="Discount" style="min-width: 20rem">
                <template #body="{ data }">
                    {{ data.discount }} %
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by discount" />
                </template>
            </Column> -->

            <!-- Discount type Column -->
            <!-- <Column field="discount_type" header="Discount type" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.discount_type }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()"
                        placeholder="Search by discount type" />
                </template>
            </Column> -->
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
    /* discount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    discount_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH } */
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
</style>