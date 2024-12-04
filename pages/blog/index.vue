<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const filter = ref('')
const page = ref(1)
const perPage = 2

function onPageClick (index : number) {
    page.value = index
}

const paginationStart = computed(() => {
    return (page.value - 1) * perPage
})

const paginationEnd = computed(() => {
    return page.value * perPage
})

const CATEGORIES_QUERY = groq`*[
  _type == "category"
]{_id, title, slug}`;

const { data: categories } = await useSanityQuery<SanityDocument[]>(CATEGORIES_QUERY);

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
  && ($filter == '' || $filter in (categories[]->slug.current))
]|order(publishedAt desc)[$start...$end]{_id, title, slug, publishedAt, image, "categories": categories[]->{title, slug}}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY, { filter: filter, start: paginationStart, end: paginationEnd });

function onCategoryClick (category: SanityDocument) {
    filter.value = category.slug.current
}

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
    <div class="p-blog">
        <h1>Liste des posts</h1>

        <div class="p-blog__categories">
            filter : {{ filter }}
            <div v-for="(category, index) in categories" :key="index" :class="['p-blog__category', {'-is-active': filter === category.slug.current}]" @click="onCategoryClick(category)">
                {{ category.title }}
            </div>
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
        On affiche la page : {{ page }}

        <div class="p-blog__pagination">
            <div v-for="n in 5" :key="n" class="p-blog__page" @click="onPageClick(n)">Page {{n}}</div>
        </div>
    </div>
</template>


<style lang="scss">


.p-blog {
    &__category {
        color: black;
    
        &.-is-active {
            color: red;
        }
    }

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