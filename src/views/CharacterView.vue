<script setup lang="ts">
import OwnedItems from '@/components/character/OwnedItems.vue';
import CharacterOverview from '../components/character/CharacterOverview.vue'
import EquipedItems from '../components/character/EquipedItems.vue'
</script>

<template>
  <main>
    <CharacterOverview />
    <hr />
    <EquipedItems />
    <OwnedItems />
  </main>
</template>
