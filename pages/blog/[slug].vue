<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Query GROQ pour sanity
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route = useRoute();

// Le paramètre de la route nuxt est envoyé dans la requête sanity
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {slug: route.params.slug});

if (!post.value) {
    throw createError({ statusCode: 404, message: "Post not found" });
}

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

useSeoMeta({
    title: `${post.value.title} | Tracking App`,
    description: 'Retrouvez nos notes de mises à jour et nos dernières actualités concernant Tracking App !',
    ogTitle: 'Titre opengraph',
    ogDescription: 'Description opengraph',
    ogImage: post.value.image && urlFor(post.value.image) ? urlFor(post.value.image)?.url() : ''
})

</script>

<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <SanityImage v-if="post.image" :asset-id="post.image.asset._ref" style="width: 200px; height: 200px;" />
        <SanityContent :blocks="post.body" />
    </div>
</template>