<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', $event)" modal :header="header"
        :style="{ width: '80vw' }" :dismissableMask="true">
        <div v-if="item">
            <template v-for="(value, key) in fields" :key="key">
                <p>
                    <strong>{{ key }}:</strong> {{ typeof value === 'function' ? value(item) : item[value] }}
                </p>
            </template>

            <slot name="footer" :item="item" />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'

defineProps<{
    visible: boolean
    header: string
    item: Record<string, any> | null
    fields: Record<string, string | ((item: any) => string)>
}>()
defineEmits(['update:visible'])
</script>