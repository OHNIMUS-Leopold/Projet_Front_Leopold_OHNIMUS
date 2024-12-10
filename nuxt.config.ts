// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/sanity'],

  css: ['@/scss/main.scss'],

  components: [
    { path: '@/components', pathPrefix: false },
  ],

  sanity: {
    projectId: "4nwfupzt",
    dataset: "production",
  },

  runtimeConfig: {
    public: {
      apiTrackingBaseUrl: '',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/scss/foundations/variables" as *;
            @use "@/scss/foundations/functions" as *;
            @use "@/scss/foundations/mixins" as *;
          `,
        },
      },
    },
  }
})