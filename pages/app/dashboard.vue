<script setup lang="ts">

const { data: data, refresh: refreshDashboard } = useAsyncData('dashboard', async () => {
    const response = await fetch('http://localhost:4000/dashboard', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${useCookie('api_tracking').value}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
    }

    return response.json();
});



async function deletePersonalHabit(habitId: string) {
    try {
        const response = await fetch(`http://localhost:4000/habits/${habitId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${useCookie('api_tracking').value}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'habitude');
        }

        await refreshDashboard();
    } catch (error) {
        console.log('Erreur:', error);
    }
}

const habitToUpdate = ref<{ 
    id: string; 
    title: string; 
    description: string
} | null>(null);

function closeUpdateForm() {
    habitToUpdate.value = null;
}
</script>

<template>
    <div>
        <h1>Tableau de bord</h1>
        <p>Bienvenue, {{ data.username }}!</p>

        <h2>Habitudes globales</h2>
        <ul>
            <li v-for="(habit, index) in data.globalHabits" :key="index">
                {{ habit.title }} : {{ habit.description }}
            </li>
        </ul>

        <h2>Habitudes personnelles</h2>
        <ul>
            <li v-for="(habit, index) in data.personalHabits" :key="index">
                {{ habit.title }} : {{ habit.description }}
                <button @click="deletePersonalHabit(habit.id)">DELETE</button>
                <button @click="habitToUpdate = habit">UPDATE</button>
            </li>
        </ul>

        <div v-if="habitToUpdate">
            <h3>Modifier l'habitude</h3>
            <UpdateHabitForm :habit="habitToUpdate" :refresh-dashboard="refreshDashboard" @submit.prevent="closeUpdateForm" />
            <button @click="closeUpdateForm">Annuler</button>
        </div>

        <AddHabitsForm :refresh-dashboard="refreshDashboard" />

    </div>
</template>