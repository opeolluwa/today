// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/hints", "@nuxt/image", "@nuxt/ui"],
  components: [{ path: "~/components", pathPrefix: true }],
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
      ],
    },
  },
  css: [
    "highlight.js/styles/atom-one-dark.css",
    "@/assets/css/main.css",
  ],
});
