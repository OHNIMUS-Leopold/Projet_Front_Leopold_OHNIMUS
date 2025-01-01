<script setup lang="ts">
</script>

<template>
    <header class="header">
        <nav class="header__nav">
            <NuxtLink to="/" class="header__nav-link">home</NuxtLink>
            <NuxtLink to="/about" class="header__nav-link">about</NuxtLink>
            <NuxtLink to="/blog" class="header__nav-link">blog</NuxtLink>
            <NuxtLink to="/login" class="header__nav-link">
                <Button class="button -outline">
                    Login
                </Button>
            </NuxtLink>
            <NuxtLink to="/register" class="header__nav-link">
                <Button class="button -primary">
                    Register
                </Button>
            </NuxtLink>
            <!-- <NuxtLink to="/app/dashboard" class="header__nav-link">dashboard</NuxtLink> -->
        </nav>
    </header>
</template>

<style lang="scss">

</style>