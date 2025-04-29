<template>
    <div class="register-page">
        <h1>Registrace</h1>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="email">Email:</label>
                <input v-model="email" id="email" type="email" required />
            </div>
            <div>
                <label for="password">Heslo:</label>
                <input v-model="password" id="password" type="password" required minlength="6" />
            </div>
            <button type="submit">Registrovat se</button>
        </form>
        <p>
            Už máš účet?
            <router-link to="/login">Přihlášení</router-link>
        </p>
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { register } from '@/api/authService';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const email = ref('');
        const password = ref('');
        const error = ref<string | null>(null);
        const message = ref<string | null>(null);
        const router = useRouter();

        const onSubmit = () => {
            error.value = null;
            message.value = null;
            register({ email: email.value, password: password.value })
                .then(() => {
                    message.value = 'Registrace proběhla úspěšně. Nyní se můžeš přihlásit.';
                    // přesměruj třeba za 2 vteřiny
                    setTimeout(() => router.push({ name: 'login' }), 2000);
                })
                .catch(() => {
                    error.value = 'Chyba při registraci (email už může být obsazen).';
                });
        };

        return { email, password, onSubmit, error, message };
    }
});
</script>

<style scoped>
.error {
    color: red;
}

.success {
    color: green;
}
</style>