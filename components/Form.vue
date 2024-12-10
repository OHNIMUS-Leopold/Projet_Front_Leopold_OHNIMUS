<script setup lang="ts">
const username = ref('');
const password = ref('');
const router = useRouter();
const props = defineProps<{
    action: 'register' | 'login';
}>();

const btnText = props.action === 'register' ? 'Inscription' : 'Connexion';

async function onSubmit(event: Event) {
    event.preventDefault();

    try {
        const route = props.action === 'register' ? 'auth/register' : 'auth/login';

        const response = await fetch(`http://localhost:4000/${route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }

        const data = await response.json();
        const cookieJwt = useCookie('api_tracking');
        cookieJwt.value = data.token;

        console.log('Utilisateur connecté avec succès:', data);

        router.push('/');
    } catch (error) {
        console.error('Erreur:', error);
    }
}
</script>

<template>
    <div>
        <form @submit="onSubmit">
            <div>
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username">
            </div>
            <div>
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password">
            </div>
            <div>
                <button type="submit">{{ btnText }}</button>
            </div>
        </form>
    </div>
</template>