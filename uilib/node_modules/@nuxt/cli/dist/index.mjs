import { t as cwdArgs } from "./_shared-B6XhZQ-m.mjs";
import { n as logger } from "./logger-C1qVsppt.mjs";
import { t as templateNames } from "./names-C5-M0i7H.mjs";
import { resolve } from "node:path";
import process from "node:process";
import { defineCommand, runCommand as runCommand$1, runMain as runMain$1 } from "citty";
import { colors } from "consola/utils";
import { provider } from "std-env";
import { consola } from "consola";
import { fileURLToPath } from "node:url";
//#region ../nuxi/src/commands/index.ts
const _rDefault = (r) => r.default || r;
const commands = {
	"add": () => import("./add-BLv9ua39.mjs").then(_rDefault),
	"add-template": () => import("./add-template-cTcq62Qd.mjs").then(_rDefault),
	"analyze": () => import("./analyze-DjHkBwNp.mjs").then(_rDefault),
	"build": () => import("./build-DWst0L5A.mjs").then(_rDefault),
	"cleanup": () => import("./cleanup-2TBoIdxA.mjs").then(_rDefault),
	"_dev": () => import("./dev-child-BXsQimKX.mjs").then(_rDefault),
	"dev": () => import("./dev-BejZ6jii.mjs").then(_rDefault),
	"devtools": () => import("./devtools-DisdwL4R.mjs").then(_rDefault),
	"generate": () => import("./generate-DJpMuzgA.mjs").then(_rDefault),
	"info": () => import("./info-CeMjJHAz.mjs").then(_rDefault),
	"init": () => import("./init-BchM3ul2.mjs").then(_rDefault),
	"module": () => import("./module-BUcOgmu0.mjs").then(_rDefault),
	"prepare": () => import("./prepare-DZj9Ie1E.mjs").then((n) => n.n).then(_rDefault),
	"preview": () => import("./preview-CChFHZ1m.mjs").then(_rDefault),
	"start": () => import("./preview-CChFHZ1m.mjs").then(_rDefault),
	"test": () => import("./test-CgyrXjYL.mjs").then(_rDefault),
	"typecheck": () => import("./typecheck-DQJUWomH.mjs").then(_rDefault),
	"upgrade": () => import("./upgrade-BLXTgRm9.mjs").then(_rDefault)
};
//#endregion
//#region ../nuxi/src/utils/console.ts
function wrapReporter(reporter) {
	return { log(logObj, ctx) {
		if (!logObj.args || !logObj.args.length) return;
		const msg = logObj.args[0];
		if (typeof msg === "string" && !process.env.DEBUG) {
			if (msg.startsWith("[Vue Router warn]: No match found for location with path")) return;
			if (msg.includes("ExperimentalWarning: The Fetch API is an experimental feature")) return;
			if (msg.startsWith("Sourcemap") && msg.includes("node_modules")) return;
		}
		return reporter.log(logObj, ctx);
	} };
}
function setupGlobalConsole(opts = {}) {
	consola.options.reporters = consola.options.reporters.map(wrapReporter);
	if (opts.dev) consola.wrapAll();
	else consola.wrapConsole();
	process.on("unhandledRejection", (err) => consola.error("[unhandledRejection]", err));
	process.on("uncaughtException", (err) => consola.error("[uncaughtException]", err));
}
//#endregion
//#region ../nuxi/src/utils/engines.ts
async function checkEngines() {
	const satisfies = await import("semver/functions/satisfies.js").then((r) => r.default || r);
	const currentNode = process.versions.node;
	const nodeRange = ">= 18.0.0";
	if (!satisfies(currentNode, nodeRange)) logger.warn(`Current version of Node.js (${colors.cyan(currentNode)}) is unsupported and might cause issues.\n       Please upgrade to a compatible version ${colors.cyan(nodeRange)}.`);
}
//#endregion
//#region package.json
var name = "@nuxt/cli";
var version = "3.35.2";
var description = "Nuxt CLI";
//#endregion
//#region src/run.ts
globalThis.__nuxt_cli__ = globalThis.__nuxt_cli__ || {
	startTime: Date.now(),
	entry: fileURLToPath(new URL("../../bin/nuxi.mjs", import.meta.url)),
	devEntry: fileURLToPath(new URL("../dev/index.mjs", import.meta.url))
};
async function runMain() {
	if (process.argv[2] === "complete") {
		const { initCompletions } = await import("./completions-Cv4Rwd1E.mjs");
		await initCompletions(main);
	}
	return runMain$1(main);
}
async function runCommand(name, argv = process.argv.slice(2), data = {}) {
	argv.push("--no-clear");
	if (!(name in commands)) throw new Error(`Invalid command ${name}`);
	return await runCommand$1(await commands[name](), {
		rawArgs: argv,
		data: { overrides: data.overrides || {} }
	});
}
const main = defineCommand({
	meta: {
		name: name.endsWith("nightly") ? name : "nuxi",
		version,
		description
	},
	args: {
		...cwdArgs,
		command: {
			type: "positional",
			required: false
		}
	},
	subCommands: commands,
	async setup(ctx) {
		const command = ctx.args._[0];
		setupGlobalConsole({ dev: command === "dev" });
		let backgroundTasks;
		if (command !== "_dev" && provider !== "stackblitz") backgroundTasks = Promise.all([checkEngines()]).catch((err) => logger.error(String(err)));
		if (command === "init") await backgroundTasks;
		if (command === "add" && ctx.rawArgs[1] && templateNames.includes(ctx.rawArgs[1])) {
			logger.warn(`${colors.yellow("Deprecated:")} Using ${colors.cyan("nuxt add <template> <name>")} is deprecated.`);
			logger.info(`Please use ${colors.cyan("nuxt add-template <template> <name>")} instead.`);
			await runCommand("add-template", [...ctx.rawArgs.slice(1)]).catch((err) => {
				console.error(err.message);
				process.exit(1);
			});
			process.exit(0);
		}
		if (ctx.args.command && !(ctx.args.command in commands)) {
			const cwd = resolve(ctx.args.cwd);
			try {
				const { x } = await import("tinyexec");
				await x(`nuxt-${ctx.args.command}`, ctx.rawArgs.slice(1), {
					nodeOptions: {
						stdio: "inherit",
						cwd
					},
					throwOnError: true
				});
			} catch (err) {
				if (err instanceof Error && "code" in err && err.code === "ENOENT") return;
			}
			process.exit();
		}
	}
});
//#endregion
export { main, runCommand, runMain };
