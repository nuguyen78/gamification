<script setup lang="ts">
import AllItems from '../components/AllItems.vue'
import Footer from '../components/footer/Footer.vue'
</script>

<template>
    <main class="items-view">
        <div class="items-wrapper">
            <section class="item-card">
                <AllItems />
            </section>
        </div>
    </main>
</template>

<style scoped>
.items-view {
    margin: 2rem auto;
    padding: 0 1rem;
}

.items-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.item-card {
    background: #2d2f3a;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
