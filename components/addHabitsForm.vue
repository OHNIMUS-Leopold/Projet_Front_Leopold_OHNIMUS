<script setup lang="ts">
const newHabit = ref({
    title: '',
    description: ''
});

const props = defineProps<{
    refreshDashboard: () => Promise<void>;
}>();

async function addPersonalHabit(event: Event) {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:4000/habits', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${useCookie('api_tracking').value}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newHabit.value.title,
                description: newHabit.value.description,
            }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'habitude');
        }

        await response.json();
        newHabit.value.title = '';
        newHabit.value.description = '';
        await props.refreshDashboard();
    } catch (error) {
        console.error('Erreur:', error);
    }
}
</script>

<template>
    <div>
        <form @submit="addPersonalHabit">
            <div>
                <label for="title">Titre</label>
                <input id="title" v-model="newHabit.title" type="text" />
            </div>
            <div>
                <label for="description">Description</label>
                <input id="description" v-model="newHabit.description" type="text" />
            </div>
            <button type="submit">Ajouter une habitude personnelle</button>
        </form>
    </div>
</template>