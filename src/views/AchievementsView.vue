<script setup lang="ts">
import OwnAchievements from '../components/achievements/OwnAchievements.vue';
import NotOwnedAchievements from '../components/achievements/NotOwnedAchievements.vue'
import Footer from '../components/footer/Footer.vue'
</script>

<template>
    <main class="achievement-view">
        <div class="items-wrapper">
            <section class="item-card">
                <OwnAchievements />
            </section>


            <section class="item-card">
                <NotOwnedAchievements />
            </section>
        </div>
    </main>
</template>


<style scoped>
.achievement-view {
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

@media (max-width: 1280px) {
    .item-card {
        padding: 0.5rem;
    }
}
</style>
