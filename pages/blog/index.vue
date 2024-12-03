<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
</script>

<template>
    <div>
        <h1>Blog</h1>
        <ul>
        <li v-for="post in posts" :key="post._id">
            <NuxtLink :to="`/blog/${post.slug.current}`">{{ post.title }}</NuxtLink>
        </li>
        </ul>
    </div>

    
</template>