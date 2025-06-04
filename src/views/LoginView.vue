<template>
    <div class="login-page">
        <LoginForm :error="error" @submit="onSubmit" />
        <p class="register-text">
            Don't have an account yet?
            <router-link to="/register">Register</router-link>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/authService';
import LoginForm from '@/components/auth/LoginForm.vue';

export default defineComponent({
    name: 'LoginView',
    components: { LoginForm },
    setup() {
        const error = ref<string | null>(null);
        const router = useRouter();

        const onSubmit = async ({ email, password }: { email: string; password: string }) => {
            error.value = null;
            try {
                await login({ email, password });
                window.dispatchEvent(new Event('storage-change'))
                router.push({ name: 'character' });
            } catch {
                error.value = 'Invalid login credentials';
            }
        };

        return { error, onSubmit };
    }
});
</script>

<style scoped>
.login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #121214;
    padding: 1rem;
}

.register-text {
    margin-top: 1rem;
    color: #a0aec0;
}

.register-text a {
    color: #4db6ac;
    text-decoration: none;
}

.register-text a:hover {
    text-decoration: underline;
}
</style>
