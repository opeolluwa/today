import { t as unplugin_default } from "./src-S1kwY0Q8.mjs";
import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from "@nuxt/kit";
//#region src/nuxt.ts
const module = defineNuxtModule({ setup(options) {
	addWebpackPlugin(unplugin_default.webpack(options));
	addVitePlugin(unplugin_default.vite(options));
} });
//#endregion
export { module as default };
