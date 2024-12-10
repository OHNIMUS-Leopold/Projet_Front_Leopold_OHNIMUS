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
        await useTrackingApi('/habits', {
            method: 'POST',
            body: {
                title: newHabit.value.title,
                description: newHabit.value.description,
            }
        })

        newHabit.value.title = '';
        newHabit.value.description = '';
        await props.refreshDashboard();
    } catch (error) {
        console.log('Erreur:', error);
    }
}
</script>

<template>
    <div>
        <form @submit="addPersonalHabit">
            <div>
                <label for="title">Titre</label>
                <input id="title" v-model="newHabit.title" type="text" >
            </div>
            <div>
                <label for="description">Description</label>
                <input id="description" v-model="newHabit.description" type="text" >
            </div>
            <button type="submit">Ajouter une habitude personnelle</button>
        </form>
    </div>
</template>