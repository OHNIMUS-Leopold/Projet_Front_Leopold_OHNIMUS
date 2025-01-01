<script setup lang="ts">
</script>

<template>
    <header>
        <nav>
            <NuxtLink to="/">home</NuxtLink>
            <NuxtLink to="/about">about</NuxtLink>
            <NuxtLink to="/blog">blog</NuxtLink>
            <NuxtLink to="/login">
                <Button class=" -outline">
                    Login
                </Button>
            </NuxtLink>
            <NuxtLink to="/register">
                <Button class="-primary">
                    Register
                </Button>
            </NuxtLink>
            <!-- <NuxtLink to="/app/dashboard">dashboard</NuxtLink> -->
        </nav>
    </header>
</template>

<style lang="scss">

</style>