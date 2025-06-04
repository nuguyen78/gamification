<template>
    <main class="faq-container">
        <h1 class="title">Welcome to the L2P RPG Bar Game – FAQ</h1>

        <p class="intro">
            This page explains how to use the demo version of the gamification system. Earn discounts, collect items,
            and have fun while leveling up!
        </p>

        <p class="hint">
            💡 <strong>Pro Tip:</strong> After logging in, visit the <strong>Achievements</strong> page and activate the
            <strong>5% discount on everything</strong> achievement. It's a great way to start saving right away!
        </p>


        <div class="faq-section">
            <h2>🧾 How to Earn Experience & Rewards</h2>
            <p>
                After logging in, head to the <strong>Discount Code</strong> page and show the generated code to the
                barman. Every scanned code earns you experience points, and might also reward you with items or
                achievements based on your progress.
            </p>
        </div>

        <div class="faq-section">
            <h2>🎒 Items & Equipment</h2>
            <p>
                Visit the <strong>Items</strong> page to view all available equipment. You can equip items in the
                <strong>Character</strong> tab to activate their effects. Most equipment gives you percentage discounts
                at the bar.
                <br />
                Equipped items are permanent unless manually unequipped.
            </p>
        </div>

        <div class="faq-section">
            <h2>🏆 Achievements</h2>
            <p>
                You can see your unlocked achievements in the <strong>Achievements</strong> section. Each achievement
                can have a limited number of uses.
                <br />
                You can activate up to <strong>3 achievements at a time</strong> to gain additional discounts.
            </p>
        </div>

        <div class="faq-section">
            <h2>🚧 Demo Disclaimer</h2>
            <p>
                This is a <strong>demo version</strong> of the game. Expect bugs, and feel free to report them to any
                staff member.
                <br />
                Future updates may include features like PvP, quests, progression trees, and more dynamic gameplay.
            </p>
        </div>
    </main>
</template>

<script setup lang="ts">
// No logic needed
</script>

<style scoped>
.faq-container {
    padding: 2rem;
    background-color: #1e1e2f;
    color: #fff;
    min-height: 76vh;
}

.title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #ffd369;
}

.intro {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.2rem;
}

.faq-section {
    margin-bottom: 2rem;
    background-color: rgba(255, 255, 255, 0.03);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
}

.faq-section h2 {
    color: #f9a825;
    margin-bottom: 0.75rem;
}

.faq-section p {
    line-height: 1.6;
    font-size: 1rem;
}
</style>
