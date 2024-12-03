<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({ 
    error: {
        type: Object as () => NuxtError,
        default: null
    }});

const handleError = () => clearError({redirect: '/'} );

</script>

<template>
    <div>
        <p>Code d'erreur : {{ error.statusCode }}</p>
        <p>Message : {{ error.statusMessage }}</p>
        <button @click="handleError">Retourner à l'accueil</button>
    </div>
</template>