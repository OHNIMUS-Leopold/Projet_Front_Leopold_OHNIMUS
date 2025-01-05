<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const {urlFor} = useSanityImage()

const HOMEPAGE_QUERY = groq`*[_type == "homepage"][0]{
  title,
  hero {
    title,
    text,
    trial,
    image,
    stats[] {
      value,
      text
    },
  },
  FeaturesSection {
    title,
    text,
    features[] {
      title,
      description,
      icon
    },
  },
}`;

const { data: homepage } = await useSanityQuery<SanityDocument>(HOMEPAGE_QUERY);
</script>

<template>
    <div>
        <div v-if="homepage">
            <!-- <p>{{ homepage.title }}</p> -->

            <Hero :hero="homepage.hero" />




            <section v-if="homepage.FeaturesSection">
                <h2>{{ homepage.FeaturesSection.title }}</h2>
                <p>{{ homepage.FeaturesSection.text }}</p>
                <div>
                    <div v-for="feature in homepage.FeaturesSection.features" :key="feature.title">
                        <img v-if="feature.icon" :src="urlFor(feature.icon)!.url()" alt="icon">
                        <h3>{{ feature.title }}</h3>
                        <p>{{ feature.description }}</p>
                    </div>
                </div>
            </section>
        </div>
        

    </div>
</template>