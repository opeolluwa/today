import { t as unplugin_default } from "./src-VZF9ZhCb.mjs";

//#region src/astro.ts
function astro_default(options) {
	return {
		name: "unplugin-auto-import",
		hooks: { "astro:config:setup": async (astro) => {
			astro.config.vite.plugins ||= [];
			astro.config.vite.plugins.push(unplugin_default.vite(options));
		} }
	};
}

//#endregion
export { astro_default as default };