<template>
    <div class="grid-container">
        <h1 class="header-text">Not owned achievements</h1>

        <!-- Desktop Table -->
        <DataTable v-if="!isMobile" :value="notOwnedAchievements" paginator :rows="10" dataKey="id" filterDisplay="row"
            :filters="filters" :globalFilterFields="['name', 'description', 'discount', 'discount_type']"
            :loading="loading">
            <template #header>
                <div class="flex justify-end">
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </div>
            </template>

            <template #empty>
                No achievements found.
            </template>
            <template #loading>
                Loading achievements data. Please wait.
            </template>

            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">{{ data.name }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>

            <Column field="description" header="Description" style="min-width: 12rem">
                <template #body="{ data }">{{ data.description }}</template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" @input="filterCallback()"
                        placeholder="Search by description" />
                </template>
            </Column>

            <Column field="amount" header="Usage Limit" style="min-width: 8rem">
                <template #body="{ data }"><span>{{ data.amount }}</span></template>
            </Column>

            <Column header="Condition" style="min-width: 14rem">
                <template #body="{ data }">
                    <span>{{ formatCondition(data.condition_type, data.condition_amount) }}</span>
                </template>
            </Column>
        </DataTable>

        <!-- Mobile Table -->
        <DataTable v-else :value="notOwnedAchievements" class="mobile-table" @row-click="showAchievementDetails"
            responsiveLayout="scroll">
            <Column field="name" header="Name" />
            <Column header="Condition">
                <template #body="{ data }">
                    <span>{{ formatCondition(data.condition_type, data.condition_amount) }}</span>
                </template>
            </Column>
        </DataTable>

        <!-- Modal -->
        <ReusableModal v-model:visible="visible" :header="'Achievement Details'" :item="selectedAchievement" :fields="{
            Name: 'name',
            Description: 'description',
            'Usage Limit': 'amount',
            Condition: (item: any) => formatCondition(item.condition_type, item.condition_amount)
        }" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePlayerStore } from '@/stores/mainStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { FilterMatchMode } from '@primevue/core/api'
import ReusableModal from '@/components/ReusableModal.vue'

const playerStore = usePlayerStore()

const notOwnedAchievements = computed(() => playerStore.notOwnedAchievements)
const loading = ref(false)
const isMobile = ref(false)
const visible = ref(false)
const selectedAchievement = ref<any>(null)

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
}

onMounted(async () => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    await playerStore.fetchNotOwnedAchievements(1)
})

const showAchievementDetails = (event: any) => {
    selectedAchievement.value = event.data
    visible.value = true
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    condition_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    condition_amount: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const formatCondition = (type: string, amount: number) => {
    if (!type) return ''
    let label = type.replace(/_/g, ' ')
    if (label === 'all') label = 'of any'
    if (label === 'special') return 'Special'
    return amount === 1 ? `1 ${label}` : `${amount} ${label}`
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

.mobile-table {
    margin-top: 1rem;
}

@media (max-width: 1280px) {
    .grid-container {
        padding: 0 0.5rem;
    }
}
</style>
