// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],

  css: ['@/scss/main.scss'],

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