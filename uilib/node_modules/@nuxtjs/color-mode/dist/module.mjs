import { promises } from 'node:fs';
import { resolve } from 'pathe';
import { defineNuxtModule, createResolver, addTemplate, addPlugin, addComponent, addImports } from '@nuxt/kit';
import { readPackageJSON } from 'pkg-types';
import { resolveModulePath } from 'exsolve';
import { gte } from 'semver';

const name = "@nuxtjs/color-mode";
const version = "4.0.1";
const description = "Dark and light mode for Nuxt with auto detection";
const repository = {
	type: "git",
	url: "git+https://github.com/nuxt-modules/color-mode.git"
};
const license = "MIT";
const packageManager = "pnpm@11.5.1";
const contributors = [
	{
		name: "Nuxt Team"
	}
];
const type = "module";
const exports$1 = {
	".": {
		types: "./dist/types.d.mts",
		"import": "./dist/module.mjs"
	}
};
const main = "./dist/module.mjs";
const typesVersions = {
	"*": {
		".": [
			"./dist/types.d.mts"
		]
	}
};
const files = [
	"dist"
];
const scripts = {
	prepack: "nuxt-module-build build && esbuild --minify src/script.js --outfile=dist/script.min.js",
	build: "pnpm run prepack",
	dev: "nuxt dev playground",
	"dev:build": "nuxt build playground",
	"dev:prepare": "nuxt-module-build build --stub && nuxt-module-build prepare && nuxt prepare playground",
	docs: "nuxt dev docs",
	"docs:build": "nuxt generate docs",
	lint: "eslint .",
	prepublishOnly: "pnpm run prepack",
	release: "pnpm lint && pnpm test && bumpp",
	test: "vitest run --coverage && vue-tsc --noEmit"
};
const dependencies = {
	"@nuxt/kit": "^4.4.6",
	exsolve: "^1.0.8",
	pathe: "^2.0.3",
	"pkg-types": "^2.3.1",
	semver: "^7.8.1"
};
const devDependencies = {
	"@commitlint/cli": "^21.0.2",
	"@commitlint/config-conventional": "^21.0.2",
	"@nuxt/eslint-config": "^1.15.2",
	"@nuxt/module-builder": "^1.0.2",
	"@nuxt/schema": "^4.4.6",
	"@nuxt/test-utils": "^4.0.3",
	"@types/lodash.template": "^4.5.3",
	"@types/semver": "^7.7.1",
	"@typescript-eslint/parser": "^8.60.0",
	"@vitest/coverage-v8": "^4.1.7",
	bumpp: "^11.1.0",
	changelogithub: "^14.0.0",
	esbuild: "^0.28.0",
	eslint: "^10.4.1",
	husky: "9.1.7",
	nuxt: "^4.4.6",
	"pkg-pr-new": "^0.0.75",
	typescript: "^6.0.3",
	unbuild: "^3.6.1",
	vitest: "^4.1.7",
	"vue-tsc": "^3.3.3"
};
const resolutions = {
	h3: "1.15.11"
};
const _package = {
	name: name,
	version: version,
	description: description,
	repository: repository,
	license: license,
	packageManager: packageManager,
	contributors: contributors,
	type: type,
	exports: exports$1,
	main: main,
	typesVersions: typesVersions,
	files: files,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	resolutions: resolutions
};

const DEFAULTS = {
  preference: "system",
  fallback: "light",
  globalName: "__NUXT_COLOR_MODE__",
  componentName: "ColorScheme",
  classPrefix: "",
  classSuffix: "",
  dataValue: "",
  storageKey: "nuxt-color-mode",
  storage: "localStorage",
  cookieAttrs: void 0,
  disableTransition: false
};
const module$1 = defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "colorMode"
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const scriptPath = resolver.resolve("./script.min.js");
    const scriptT = await promises.readFile(scriptPath, "utf-8");
    options.script = scriptT.replace(/<%= options\.([^ ]+) %>/g, (_, option) => options[option]).trim();
    if (options.storage === "cookie") {
      options.cookieAttrs ??= { "max-age": "31536000", "path": "/", ...options.cookieAttrs ? options.cookieAttrs : {} };
    }
    const storageTypes = {
      cookie: '"cookie"',
      localStorage: '"localStorage"',
      sessionStorage: '"sessionStorage"'
    };
    addTemplate({
      filename: "color-mode-options.mjs",
      getContents: () => Object.entries(options).map(([key, value]) => (key === "storage" ? `/** @type {${Object.values(storageTypes).join(" | ")}} */
` : "") + (key === "cookieAttrs" ? `/** @type {Record<string, unknown> | undefined} */
` : "") + `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join("\n")
    });
    const runtimeDir = resolver.resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);
    for (const template of ["plugin.client", "plugin.server"]) {
      addPlugin(resolve(runtimeDir, template));
    }
    addComponent({ name: options.componentName, filePath: resolve(runtimeDir, "component.vue") });
    addImports({ name: "useColorMode", as: "useColorMode", from: resolve(runtimeDir, "composables") });
    nuxt.hook("nitro:config", (config) => {
      config.externals = config.externals || {};
      config.externals.inline = config.externals.inline || [];
      config.externals.inline.push(runtimeDir);
      config.virtual = config.virtual || {};
      config.virtual["#color-mode-options"] = `export const script = ${JSON.stringify(options.script, null, 2)}`;
      config.plugins = config.plugins || [];
      config.plugins.push(resolve(runtimeDir, "nitro-plugin"));
    });
    nuxt.hook("tailwindcss:config", async (tailwindConfig) => {
      const tailwind = resolveModulePath("tailwindcss", { from: nuxt.options.modulesDir, try: true }) || "tailwindcss";
      const isAfter341 = await readPackageJSON(tailwind).then((twPkg) => gte(twPkg.version || "3.0.0", "3.4.1"));
      tailwindConfig.darkMode = tailwindConfig.darkMode ?? [isAfter341 ? "selector" : "class", `[class~="${options.classPrefix}dark${options.classSuffix}"]`];
    });
  }
});

export { module$1 as default };
