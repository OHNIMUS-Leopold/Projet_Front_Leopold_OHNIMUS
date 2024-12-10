<script setup lang="ts">
const response = await fetch('http://localhost:4000/dashboard', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${useCookie('api_tracking').value}`,
        'Content-Type': 'application/json',
    },
});

const data = await response.json();
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
            </li>
        </ul>
    </div>
</template>