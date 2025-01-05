<script setup lang="ts">
</script>


<template>
    <header class="header">
        <nav class="header__nav -static">
            <NuxtLink to="/" class="header__nav-link -title">TrackingApp</NuxtLink>
            <NuxtLink to="/" class="header__nav-link">Home</NuxtLink>
            <NuxtLink to="/about" class="header__nav-link">Pricing</NuxtLink>
            <NuxtLink to="/blog" class="header__nav-link">Blog</NuxtLink>
        </nav>
        <nav class="header__nav -user">
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
.header {
    display: flex;
    padding: 16px;
    background-color: $white;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;

    &__nav {
        display: flex;
        align-items: center;
        margin: auto;
        gap: 1rem;
    }

    &__static-links,
    &__user-links {
        display: flex;
        gap: 1rem;
    }

    &__nav-link {
        text-decoration: none;
        color: $gray800;
        font-size: 16px;

        &.-title {
            color: $primaryColor;
            font-size: 24px;
            font-weight: bold;
            padding-right: 48px;
        }
    }
}


</style>