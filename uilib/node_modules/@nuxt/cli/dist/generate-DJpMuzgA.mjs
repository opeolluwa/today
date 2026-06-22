import { a as legacyRootDirArgs, i as extendsArgs, n as dotEnvArgs, o as logLevelArgs, r as envNameArgs, s as profileArgs, t as cwdArgs } from "./_shared-B6XhZQ-m.mjs";
import build_default from "./build-DWst0L5A.mjs";
import { defineCommand } from "citty";
//#region ../nuxi/src/commands/generate.ts
var generate_default = defineCommand({
	meta: {
		name: "generate",
		description: "Build Nuxt and prerender all routes"
	},
	args: {
		...cwdArgs,
		...logLevelArgs,
		preset: {
			type: "string",
			description: "Nitro server preset"
		},
		...dotEnvArgs,
		...envNameArgs,
		...extendsArgs,
		...profileArgs,
		...legacyRootDirArgs
	},
	async run(ctx) {
		ctx.args.prerender = true;
		await build_default.run(ctx);
	}
});
//#endregion
export { generate_default as default };
