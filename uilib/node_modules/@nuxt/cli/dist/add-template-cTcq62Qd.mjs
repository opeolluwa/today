import { o as logLevelArgs, t as cwdArgs } from "./_shared-B6XhZQ-m.mjs";
import { n as logger } from "./logger-C1qVsppt.mjs";
import { t as templateNames } from "./names-C5-M0i7H.mjs";
import { r as relativeToProcess, t as loadKit } from "./kit-BzPscsEd.mjs";
import process from "node:process";
import { defineCommand } from "citty";
import { colors } from "consola/utils";
import { cancel, intro, outro } from "@clack/prompts";
import { existsSync, promises } from "node:fs";
import { dirname, extname, resolve } from "pathe";
import { camelCase, pascalCase } from "scule";
//#region ../nuxi/src/utils/templates/api.ts
const httpMethods = [
	"connect",
	"delete",
	"get",
	"head",
	"options",
	"post",
	"put",
	"trace",
	"patch"
];
const api = ({ name, args, nuxtOptions }) => {
	return {
		path: resolve(nuxtOptions.srcDir, nuxtOptions.serverDir, `api/${name}${applySuffix(args, httpMethods, "method")}.ts`),
		contents: `
export default defineEventHandler(event => {
  return 'Hello ${name}'
})
`
	};
};
//#endregion
//#region ../nuxi/src/utils/templates/app.ts
const app = ({ args, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, "app.vue"),
	contents: args.pages ? `
<script setup lang="ts"><\/script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
` : `
<script setup lang="ts"><\/script>

<template>
  <div>
    <h1>Hello World!</h1>
  </div>
</template>

<style scoped></style>
`
});
//#endregion
//#region ../nuxi/src/utils/templates/app-config.ts
const appConfig = ({ nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, "app.config.ts"),
	contents: `
export default defineAppConfig({})
`
});
//#endregion
//#region ../nuxi/src/utils/templates/component.ts
const component = ({ name, args, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, `components/${name}${applySuffix(args, ["client", "server"], "mode")}.vue`),
	contents: `
<script setup lang="ts"><\/script>

<template>
  <div>
    Component: ${name}
  </div>
</template>

<style scoped></style>
`
});
//#endregion
//#region ../nuxi/src/utils/templates/composable.ts
const USE_PREFIX_RE = /^use-?/;
const composable = ({ name, nuxtOptions }) => {
	const nameWithUsePrefix = `use${pascalCase(name.replace(USE_PREFIX_RE, ""))}`;
	return {
		path: resolve(nuxtOptions.srcDir, `composables/${name}.ts`),
		contents: `
export const ${nameWithUsePrefix} = () => {
  return ref()
}
    `
	};
};
//#endregion
//#region ../nuxi/src/utils/templates/error.ts
const error = ({ nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, "error.vue"),
	contents: `
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
<\/script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

<style scoped></style>
`
});
//#endregion
//#region ../nuxi/src/utils/templates/layer.ts
const layer = ({ name, nuxtOptions }) => {
	return {
		path: resolve(nuxtOptions.rootDir, `layers/${name}/nuxt.config.ts`),
		contents: `
export default defineNuxtConfig({})
`
	};
};
//#endregion
//#region ../nuxi/src/utils/templates/layout.ts
const layout = ({ name, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.dir.layouts, `${name}.vue`),
	contents: `
<script setup lang="ts"><\/script>

<template>
  <div>
    Layout: ${name}
    <slot />
  </div>
</template>

<style scoped></style>
`
});
//#endregion
//#region ../nuxi/src/utils/templates/middleware.ts
const middleware = ({ name, args, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.dir.middleware, `${name}${applySuffix(args, ["global"])}.ts`),
	contents: `
export default defineNuxtRouteMiddleware((to, from) => {})
`
});
//#endregion
//#region ../nuxi/src/utils/templates/module.ts
const module = ({ name, nuxtOptions }) => ({
	path: resolve(nuxtOptions.rootDir, "modules", `${name}.ts`),
	contents: `
import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '${name}'
  },
  setup () {}
})
`
});
//#endregion
//#region ../nuxi/src/utils/templates/page.ts
const page = ({ name, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.dir.pages, `${name}.vue`),
	contents: `
<script setup lang="ts"><\/script>

<template>
  <div>
    Page: ${name}
  </div>
</template>

<style scoped></style>
`
});
//#endregion
//#region ../nuxi/src/utils/templates/plugin.ts
const plugin = ({ name, args, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.dir.plugins, `${name}${applySuffix(args, ["client", "server"], "mode")}.ts`),
	contents: `
export default defineNuxtPlugin(nuxtApp => {})
  `
});
//#endregion
//#region ../nuxi/src/utils/templates/server-middleware.ts
const serverMiddleware = ({ name, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.serverDir, "middleware", `${name}.ts`),
	contents: `
export default defineEventHandler(event => {})
`
});
//#endregion
//#region ../nuxi/src/utils/templates/server-plugin.ts
const serverPlugin = ({ name, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.serverDir, "plugins", `${name}.ts`),
	contents: `
export default defineNitroPlugin(nitroApp => {})
`
});
//#endregion
//#region ../nuxi/src/utils/templates/server-route.ts
const serverRoute = ({ name, args, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.serverDir, args.api ? "api" : "routes", `${name}.ts`),
	contents: `
export default defineEventHandler(event => {})
`
});
//#endregion
//#region ../nuxi/src/utils/templates/server-util.ts
const serverUtil = ({ name, nuxtOptions }) => ({
	path: resolve(nuxtOptions.srcDir, nuxtOptions.serverDir, "utils", `${name}.ts`),
	contents: `
export function ${camelCase(name)}() {}
`
});
//#endregion
//#region ../nuxi/src/utils/templates/index.ts
const templates = {
	"api": api,
	"app": app,
	"app-config": appConfig,
	"component": component,
	"composable": composable,
	"error": error,
	"layer": layer,
	"layout": layout,
	"middleware": middleware,
	"module": module,
	"page": page,
	"plugin": plugin,
	"server-middleware": serverMiddleware,
	"server-plugin": serverPlugin,
	"server-route": serverRoute,
	"server-util": serverUtil
};
function applySuffix(args, suffixes, unwrapFrom) {
	let suffix = "";
	for (const s of suffixes) if (args[s]) suffix += `.${s}`;
	if (unwrapFrom && args[unwrapFrom] && suffixes.includes(args[unwrapFrom])) suffix += `.${args[unwrapFrom]}`;
	return suffix;
}
//#endregion
//#region ../nuxi/src/commands/add-template.ts
var add_template_default = defineCommand({
	meta: {
		name: "add-template",
		description: "Create a new template file."
	},
	args: {
		...cwdArgs,
		...logLevelArgs,
		force: {
			type: "boolean",
			description: "Force override file if it already exists",
			default: false
		},
		template: {
			type: "positional",
			required: true,
			valueHint: templateNames.join("|"),
			description: `Specify which template to generate`
		},
		name: {
			type: "positional",
			required: true,
			description: "Specify name of the generated file"
		}
	},
	async run(ctx) {
		const cwd = resolve(ctx.args.cwd);
		intro(colors.cyan("Adding template..."));
		const templateName = ctx.args.template;
		if (!templateNames.includes(templateName)) {
			const templateNames = Object.keys(templates).map((name) => colors.cyan(name));
			const lastTemplateName = templateNames.pop();
			logger.error(`Template ${colors.cyan(templateName)} is not supported.`);
			logger.info(`Possible values are ${templateNames.join(", ")} or ${lastTemplateName}.`);
			process.exit(1);
		}
		const ext = extname(ctx.args.name);
		const name = ext === ".vue" || ext === ".ts" ? ctx.args.name.replace(ext, "") : ctx.args.name;
		if (!name) {
			cancel("name argument is missing!");
			process.exit(1);
		}
		const config = await (await loadKit(cwd)).loadNuxtConfig({ cwd });
		const template = templates[templateName];
		const res = template({
			name,
			args: ctx.args,
			nuxtOptions: config
		});
		if (!ctx.args.force && existsSync(res.path)) {
			logger.error(`File exists at ${colors.cyan(relativeToProcess(res.path))}.`);
			logger.info(`Use ${colors.cyan("--force")} to override or use a different name.`);
			process.exit(1);
		}
		const parentDir = dirname(res.path);
		if (!existsSync(parentDir)) {
			logger.step(`Creating directory ${colors.cyan(relativeToProcess(parentDir))}.`);
			if (templateName === "page") logger.info("This enables vue-router functionality!");
			await promises.mkdir(parentDir, { recursive: true });
		}
		await promises.writeFile(res.path, `${res.contents.trim()}\n`);
		logger.success(`Created ${colors.cyan(relativeToProcess(res.path))}.`);
		outro(`Generated a new ${colors.cyan(templateName)}!`);
	}
});
//#endregion
export { add_template_default as default };
