<template>
    <div class="login-card p-shadow-2">
        <h2 class="title">Login</h2>
        <form class="p-fluid" @submit.prevent="submitForm">
            <div class="p-field">
                <label for="email">Email:</label>
                <InputText id="email" v-model="email" class="full-width" />
            </div>
            <div class="p-field">
                <label for="password">Password:</label>
                <Password id="password" v-model="password" toggleMask class="full-width" />
            </div>
            <Button type="submit" label="Sign In" class="p-button-rounded p-button-success full-width" />
        </form>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default defineComponent({
    name: 'LoginForm',
    components: { InputText, Password, Button },
    props: {
        error: { type: String, default: null }
    },
    emits: ['submit'],
    setup(_, { emit }) {
        const email = ref('');
        const password = ref('');
        const submitForm = () => {
            emit('submit', { email: email.value, password: password.value });
        };
        return { email, password, submitForm };
    }
});
</script>

<style scoped>
.login-card {
    background: #1e1e2f;
    border-radius: 12px;
    padding: 2.5rem;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    color: #edf2f7;
}

.title {
    text-align: center;
    margin-bottom: 2rem;
    color: #ffd369;
}

.p-field {
    margin-bottom: 1.75rem;
}

.full-width {
    width: 100% !important;
}

.p-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
}

.error {
    margin-top: 1.25rem;
    color: #f66;
    text-align: center;
}
</style>
