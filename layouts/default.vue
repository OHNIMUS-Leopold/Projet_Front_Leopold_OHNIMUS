<template>
    <div class="l-default">
        <div>
            <NuxtLink to="/">home</NuxtLink>
            <NuxtLink to="/about">about</NuxtLink>
            <NuxtLink to="/blog">blog</NuxtLink>
            <NuxtLink to="/login">login</NuxtLink>
            <NuxtLink to="/register">register</NuxtLink>
            <NuxtLink to="/app/dashboard">dashboard</NuxtLink>
        </div>
        <slot />
    </div>
</template>