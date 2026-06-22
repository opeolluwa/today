import { n as logger } from "./logger-C1qVsppt.mjs";
import { n as getPkgJSON, r as getPkgVersion } from "./versions-B2QWOmP3.mjs";
import { colors } from "consola/utils";
//#region ../nuxi/src/utils/banner.ts
function getBuilder(cwd, builder) {
	switch (builder) {
		case "rspack":
		case "@nuxt/rspack-builder": return {
			name: "Rspack",
			version: getPkgVersion(cwd, "@rspack/core", { via: ["@nuxt/rspack-builder"] })
		};
		case "webpack":
		case "@nuxt/webpack-builder": return {
			name: "Webpack",
			version: getPkgVersion(cwd, "webpack", { via: ["@nuxt/webpack-builder"] })
		};
		default: {
			const pkgJSON = getPkgJSON(cwd, "vite", { via: ["nuxt", "@nuxt/vite-builder"] });
			return {
				name: pkgJSON.name.includes("rolldown") ? "Rolldown-Vite" : "Vite",
				version: pkgJSON.version || "unknown"
			};
		}
	}
}
function showBanner(nuxt) {
	const { bold, gray, green } = colors;
	const cwd = nuxt.options.rootDir;
	const nuxtVersion = nuxt._version || getPkgVersion(cwd, "nuxt") || getPkgVersion(cwd, "nuxt-nightly") || getPkgVersion(cwd, "nuxt3") || getPkgVersion(cwd, "nuxt-edge");
	const nitroVia = { via: ["nuxt", "@nuxt/nitro-server"] };
	const nitroVersion = getPkgVersion(cwd, "nitropack", nitroVia) || getPkgVersion(cwd, "nitro", nitroVia) || getPkgVersion(cwd, "nitropack-nightly") || getPkgVersion(cwd, "nitropack-edge");
	const builder = getBuilder(cwd, nuxt.options.builder);
	const vueVersion = getPkgVersion(cwd, "vue", { via: ["nuxt"] }) || null;
	logger.info(green(`Nuxt ${bold(nuxtVersion)}`) + gray(" (with ") + (nitroVersion ? gray(`Nitro ${bold(nitroVersion)}`) : "") + gray(`, ${builder.name} ${bold(builder.version)}`) + (vueVersion ? gray(` and Vue ${bold(vueVersion)}`) : "") + gray(")"));
}
//#endregion
export { showBanner as n, getBuilder as t };
