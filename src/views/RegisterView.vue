<template>
    <div class="login-page">
        <RegisterForm :error="error" :success="message" @submit="onSubmit" />
        <p class="login-text">
            Already have an account?
            <router-link to="/login">Sign In</router-link>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/api/authService';
import RegisterForm from '@/components/auth/RegisterForm.vue';

export default defineComponent({
    name: 'RegisterView',
    components: { RegisterForm },
    setup() {
        const error = ref<string | null>(null);
        const message = ref<string | null>(null);
        const router = useRouter();

        const onSubmit = async (payload: {
            email: string;
            password: string;
            name: string;
            surname: string;
            nick: string;
        }) => {
            error.value = null;
            message.value = null;
            try {
                await register(payload);
                message.value = 'Registration successful! You can now sign in.';
                setTimeout(() => router.push({ name: 'login' }), 2000);
            } catch {
                error.value = 'Registration failed (email may already be in use).';
            }
        };

        return { error, message, onSubmit };
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

.login-text {
    margin-top: 1rem;
    color: #a0aec0;
}

.login-text a {
    color: #4db6ac;
    text-decoration: none;
}

.login-text a:hover {
    text-decoration: underline;
}
</style>
