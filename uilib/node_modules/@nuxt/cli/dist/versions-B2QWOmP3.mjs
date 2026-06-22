import { n as tryResolveNuxt } from "./kit-BzPscsEd.mjs";
import { readFileSync } from "node:fs";
import { resolveModulePath } from "exsolve";
import { readPackageJSON } from "pkg-types";
import { coerce } from "semver";
//#region ../nuxi/src/utils/versions.ts
async function getNuxtVersion(cwd, cache = true) {
	const nuxtPkg = await readPackageJSON("nuxt", {
		url: cwd,
		try: true,
		cache
	}).catch(() => null);
	if (nuxtPkg) return nuxtPkg.version;
	const pkg = await readPackageJSON(cwd);
	const pkgDep = pkg?.dependencies?.nuxt || pkg?.devDependencies?.nuxt;
	return pkgDep && coerce(pkgDep)?.version || "3.0.0";
}
function getPkgVersion(cwd, pkg, options) {
	return getPkgJSON(cwd, pkg, options)?.version ?? "";
}
/**
* Resolve a package.json, optionally walking a dependency chain.
*
* `via` is an array of `[startingPoint, ...intermediates]` describing
* the dependency path to walk before resolving `pkg`. For example:
*
*   // vite is a dep of @nuxt/vite-builder, which is a dep of nuxt
*   getPkgJSON(cwd, 'vite', { via: ['nuxt', '@nuxt/vite-builder'] })
*
*   // webpack is a dep of @nuxt/webpack-builder, which the user installs
*   getPkgJSON(cwd, 'webpack', { via: ['@nuxt/webpack-builder'] })
*
* Each entry is resolved from the location of the previous one,
* starting from cwd. Falls back to direct resolution from cwd/nuxt.
*/
function getPkgJSON(cwd, pkg, options) {
	const roots = [];
	if (options?.via && options.via.length > 0) {
		let from = cwd;
		for (const step of options.via) {
			from = resolveModulePath(step, {
				from,
				try: true
			}) ?? void 0;
			if (!from) break;
		}
		if (from) roots.push(from);
	}
	roots.push(cwd);
	const nuxtPath = tryResolveNuxt(cwd);
	if (nuxtPath) roots.push(nuxtPath);
	for (const root of roots) {
		const p = resolveModulePath(`${pkg}/package.json`, {
			from: root,
			try: true
		});
		if (p) return JSON.parse(readFileSync(p, "utf-8"));
	}
	return null;
}
//#endregion
export { getPkgJSON as n, getPkgVersion as r, getNuxtVersion as t };
