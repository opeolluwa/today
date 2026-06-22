import { defineCommand } from "citty";
//#region ../nuxi/src/commands/module/index.ts
var module_default = defineCommand({
	meta: {
		name: "module",
		description: "Manage Nuxt modules"
	},
	args: {},
	subCommands: {
		add: () => import("./add-BLv9ua39.mjs").then((r) => r.default || r),
		search: () => import("./search-B9mqni6k.mjs").then((r) => r.default || r)
	}
});
//#endregion
export { module_default as default };
