<template>
    <main class="full-page">
        <div class="content">
            <h1 class="user-id">{{ userId }}</h1>
            <p class="info-text">Show this to the barman to get your discount! :)</p>
        </div>
    </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
    sub: string // assuming your user ID is stored in "sub"
}

const userId = computed(() => {
    const token = localStorage.getItem('jwt_token')
    if (!token) return 'No token found'

    try {
        const decoded = jwtDecode<JwtPayload>(token)
        return decoded.sub
    } catch (e) {
        return 'Invalid token'
    }
})
</script>

<style scoped>
body {
    background: #1e1e2f !important;
}

.full-page {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1e1e2f;
    height: 76vh;
    color: #ffd369;
    font-weight: bold;
    flex-direction: column;
}

.content {
    text-align: center;
}

.user-id {
    font-size: 21vw;
    margin: 0;
}

.info-text {
    margin-top: 1rem;
    font-size: 1.7vw;
    color: #edf2f7;
}

@media (max-width: 1300px) {
    .user-id {
        font-size: 30vw;
    }

    .info-text {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .user-id {
        font-size: 35vw;
    }

    .info-text {
        font-size: 1.4rem;
        padding-left: 5%;
        padding-right: 5%;
    }
}
</style>
