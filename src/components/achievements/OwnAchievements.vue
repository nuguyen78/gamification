<template>
    <div class="grid-container">
        <div class="inline-container">
            <h1 class="header-text">Own achievements</h1>
            <p class="status-counter">
            <h2>In Use: {{ inUseCount }} / 3</h2>
            </p>
        </div>

        <!-- Desktop Table -->
        <DataTable v-if="!isMobile" :value="ownedAchievements" paginator :rows="10" dataKey="id" filterDisplay="row"
            :filters="filters" :globalFilterFields="['name', 'description', 'discount', 'discount_type']"
            :loading="loading">
            <template #header>
                <div class="flex justify-end">
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </div>
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

            <Column field="remaining" header="Remaining" style="min-width: 8rem">
                <template #body="{ data }"><span>{{ data.remaining }}</span></template>
            </Column>

            <Column field="status" header="Status" style="min-width: 10rem">
                <template #body="{ data }">
                    <div class="status-toggle">
                        <Button @click="toggleStatus(data)" :label="getStatusLabel(data.status)"
                            :severity="getStatusSeverity(data.status)" size="small"
                            :disabled="data.status === 'used' || (data.status === 'use' && inUseCount >= 3)" />
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statusOptions"
                        optionLabel="label" optionValue="value" placeholder="Filter by status" class="w-full" />
                </template>
            </Column>
        </DataTable>

        <!-- Mobile Table -->
        <DataTable v-else :value="ownedAchievements" class="mobile-table" @row-click="showAchievementDetails"
            responsiveLayout="scroll">
            <Column field="name" header="Name" />
            <Column field="status" header="Status">
                <template #body="{ data }">
                    <Button @click.stop="toggleStatus(data)" :label="getStatusLabel(data.status)"
                        :severity="getStatusSeverity(data.status)" size="small"
                        :disabled="data.status === 'used' || (data.status === 'use' && inUseCount >= 3)" />
                </template>
            </Column>
        </DataTable>

        <!-- Modal -->
        <Dialog v-model:visible="visible" modal header="Achievement Details" :style="{ width: '80vw' }"
            :dismissableMask="true">
            <div v-if="selectedAchievement">
                <p><strong>Name:</strong> {{ selectedAchievement.name }}</p>
                <p><strong>Description:</strong> {{ selectedAchievement.description }}</p>
                <p><strong>Remaining:</strong> {{ selectedAchievement.remaining }}</p>
                <p><strong>Status:</strong> {{ getStatusLabel(selectedAchievement.status) }}</p>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { usePlayerStore } from '@/stores/mainStore'
import { FilterMatchMode } from '@primevue/core/api'

const playerStore = usePlayerStore()

const ownedAchievements = computed(() => playerStore.ownedAchievements)
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
    await playerStore.fetchOwnedAchievements()
})

const showAchievementDetails = (event: any) => {
    selectedAchievement.value = event.data
    visible.value = true
}

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    discount: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    discount_type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const statusOptions = [
    { label: 'Use', value: 'use' },
    { label: 'In Use', value: 'in_use' },
    { label: 'Used', value: 'used' }
]

const toggleStatus = (achievement: any) => {
    if (achievement.status === 'use' && inUseCount.value >= 3) return
    achievement.status = achievement.status === 'use' ? 'in_use' : 'use'
    playerStore.updateAchievementStatus(achievement.id, achievement.status)
}

const getStatusLabel = (status: string) =>
    status === 'use' ? 'Use' : status === 'in_use' ? 'In Use' : 'Used'

const getStatusSeverity = (status: string) => {
    if (status === 'used') return 'secondary'
    if (status === 'in_use') return 'info'
    return 'success'
}

const inUseCount = computed(() =>
    ownedAchievements.value.filter(a => a.status === 'in_use').length
)
</script>

<style scoped>
.grid-container {
    padding: 2rem;
    color: white;
}

.inline-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.header-text {
    margin: 0;
}

.status-counter {
    background-color: #1f2937;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin: 0;
}

.status-toggle {
    display: flex;
    align-items: center;
}

.mobile-table {
    margin-top: 1rem;
}

@media (max-width: 1280px) {
    .grid-container {
        padding: 0 0.5rem;
    }

}

@media (max-width: 780px) {
    .status-counter {
        width: 120px;
    }
}
</style>
