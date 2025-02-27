// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/sanity'],

  css: ['@/scss/main.scss'],

  components: [
    { path: '@/components', pathPrefix: false },
  ],

  // imports: {
  //   dirs: ['utils/**']
  // },

  sanity: {
    projectId: "4nwfupzt",
    dataset: "production",
  },

  runtimeConfig: {
    public: {
      apiTrackingBaseUrl: process.env.NUXT_PUBLIC_API_TRACKING_BASE_URL || '',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
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