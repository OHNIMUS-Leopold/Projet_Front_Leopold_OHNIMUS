<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, "categories": categories[]->{title, slug}}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
    <div class="p-blog">
        <h1>Liste des posts</h1>

        <div>
            <!-- Liste de boutons pour chaque catégorie -->
             <!-- Lorsqu'on clique sur un bouton, on met à jour une valeur de filtre -->
        </div>

        <div class="p-blog__list">
            <div v-for="(post, index) in posts" :key="index" class="p-blog__item">
                
                <NuxtLink :to="`/blog/${post.slug.current}`">
                    {{ post.title }}
                </NuxtLink>
                
                <div class="p-blog__item-image-wrapper">
                    <img v-if="post.image" :src="urlFor(post.image)!.url()" alt="" style="height: 200px; width: 200px;">
                </div>
                
                <div v-if="post.categories" class="p-blog__item-categories">
                    <h4>Catégories :</h4>
                    <ul class="p-blog__item-categories-list">
                        <li v-for="category in post.categories" :key="category._id">
                            {{ category.title }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">


.p-blog {
    &__list {
        display: grid;
        grid-template-columns: repeat(4, 1fr); 
        gap: 16px; 
    }

    &__item {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        a {
            color: #007acc;
            font-weight: bold;
            text-decoration: none;

        &:hover {
                text-decoration: underline;
            }
        }

        &-image-wrapper {
            margin-top: 8px;
        }

        &-categories {
            border: none;

            &-list {
                list-style: none;
            }
        }
    }
}


</style>