<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Query GROQ pour sanity
const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route = useRoute();

// Le paramètre de la route nuxt est envoyé dans la requête sanity
const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {slug: route.params.slug});



</script>

<template>
    <div>
        {{ post }}
    </div>
</template>