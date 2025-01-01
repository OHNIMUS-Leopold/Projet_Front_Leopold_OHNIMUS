<script setup lang="ts">
// import type { SanityDocument } from "@sanity/client";

const {urlFor} = useSanityImage()

defineProps<HeroProps>();
interface HeroProps {
    hero: {
        title: string;
        text: string;
        trial: string;
        image: string;
        stats: { value: string; text: string }[];
    };
}
</script>


<template>
    <section v-if="hero" class="hero">
        <img v-if="hero.image" class="hero__image" :src="urlFor(hero.image)!.url()" alt="">
        <div class="hero__content">
            <h1 class="hero__title">{{ hero.title }}</h1>
            <p class="hero__text">{{ hero.text }}</p>
            <Button class="hero__button">{{ hero.trial }}</Button>
            <ul class="hero__stats">
                <li v-for="stat in hero.stats" :key="stat.value" class="hero__stat">
                    <strong class="hero__stat-value">{{ stat.value }}</strong> - <span class="hero__stat-text">{{ stat.text }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>


<style lang="scss">

.hero {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
    overflow: hidden;
    color: $gray800; 

    &__image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1; 
    }

    &__content {
        position: relative;
    }
}


</style>