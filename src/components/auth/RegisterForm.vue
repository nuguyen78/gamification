<template>
    <div class="login-card p-shadow-2">
        <h2 class="title">Registration</h2>
        <form class="p-fluid" @submit.prevent="submitForm">
            <div class="p-field">
                <label for="email">Email</label>
                <InputText id="email" v-model="email" class="full-width" required />
            </div>
            <div class="p-field">
                <label for="password">Password</label>
                <Password id="password" v-model="password" toggleMask class="full-width" required minlength="6" />
            </div>
            <div class="p-field">
                <label for="name">First Name</label>
                <InputText id="name" v-model="name" class="full-width bcg-color" required />
            </div>
            <div class="p-field">
                <label for="surname">Last Name</label>
                <InputText id="surname" v-model="surname" class="full-width bcg-color" required />
            </div>
            <div class="p-field">
                <label for="nick">Nickname</label>
                <InputText id="nick" v-model="nick" class="full-width bcg-color" required />
            </div>
            <Button type="submit" label="Sign Up" class="p-button-rounded p-button-success full-width" />
        </form>

        <p v-if="success" class="success">{{ success }}</p>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default defineComponent({
    name: 'RegisterForm',
    components: { InputText, Password, Button },
    props: {
        error: { type: String, default: null },
        success: { type: String, default: null }
    },
    emits: ['submit'],
    setup(_, { emit }) {
        const email = ref('');
        const password = ref('');
        const name = ref('');
        const surname = ref('');
        const nick = ref('');

        const submitForm = () => {
            emit('submit', {
                email: email.value,
                password: password.value,
                name: name.value,
                surname: surname.value,
                nick: nick.value
            });
        };

        return { name, surname, email, password, nick, submitForm };
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

.success {
    margin-top: 1.25rem;
    color: #4db6ac;
    text-align: center;
}

.error {
    margin-top: 0.75rem;
    color: #f66;
    text-align: center;
}

.bcg-color {
    background-color: rgba(70, 90, 126, 0.4) !important;
}
</style>
