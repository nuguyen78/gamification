<template>
    <div class="login-page">
        <h1>Přihlášení</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="email">Email:</label>
                <input v-model="email" id="email" type="email" required />
            </div>
            <div>
                <label for="password">Heslo:</label>
                <input v-model="password" id="password" type="password" required />
            </div>
            <button type="submit">Přihlásit se</button>
        </form>
        <p>
            Ještě nemáš účet?
            <router-link to="/register">Registrace</router-link>
        </p>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { login } from '@/api/authService';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref<string | null>(null);
        const router = useRouter();

        const onSubmit = () => {
            error.value = null;
            login({ email: email.value, password: password.value })
                .then(() => {
                    router.push({ name: 'home' });
                })
                .catch(() => {
                    error.value = 'Neplatné přihlašovací údaje';
                });
        };

        return { email, password, onSubmit, error };
    }
});
</script>

<style scoped>
.error {
    color: red;
}
</style>