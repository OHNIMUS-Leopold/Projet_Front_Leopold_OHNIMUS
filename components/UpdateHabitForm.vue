<script setup lang="ts">
const props = defineProps<{
    habit: { id: string; title: string; description: string };
    refreshDashboard: () => Promise<void>;
}>();

const updatedTitle = ref(props.habit.title);
const updatedDescription = ref(props.habit.description);

async function updateHabit(event: Event) {
    event.preventDefault();

    try {
        const response = await fetch(`http://localhost:4000/habits/${props.habit.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${useCookie('api_tracking').value}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: updatedTitle.value,
                description: updatedDescription.value,
            }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de l'habitude");
        }

        await props.refreshDashboard();
    } catch (error) {
        console.error("Erreur:", error);
    }
}
</script>

<template>
    <form @submit="updateHabit">
        <div>
            <label for="update-title">Titre</label>
            <input id="update-title" v-model="updatedTitle" type="text" required >
        </div>
        <div>
            <label for="update-description">Description</label>
            <input id="update-description" v-model="updatedDescription" type="text" required >
        </div>
        <button type="submit">Mettre à jour</button>
    </form>
</template>
