// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["../../uilib"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["../../uilib/assets/css/theme.css"],
  modules: ["@nuxt/hints", "@nuxt/image", "@nuxt/ui"],
});
