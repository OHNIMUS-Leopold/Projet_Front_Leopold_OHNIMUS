<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
    <div>
        <h1>Liste des posts</h1>
        <ul>
            <li v-for="(post, index) in posts" :key="index">
                <NuxtLink :to="`/blog/${post.slug.current}`">{{ post.title }}</NuxtLink>
                <img v-if="post.image" :src="urlFor(post.image)!.url()" alt="" style="height: 200px; width: 200px;">
            </li>
        </ul>
    </div>
</template>