import { templates } from "./templates-BNoyKfB8.mjs";
import tab from "@bomb.sh/tab/citty";
//#region ../nuxi/src/data/nitro-presets.ts
const nitroPresets = [
	"alwaysdata",
	"aws-amplify",
	"aws-lambda",
	"azure-functions",
	"azure-swa",
	"bun",
	"cleavr",
	"cli",
	"cloudflare-dev",
	"cloudflare-durable",
	"cloudflare-module",
	"cloudflare-module-legacy",
	"cloudflare-pages",
	"cloudflare-pages-static",
	"cloudflare-worker",
	"deno-deploy",
	"deno-server",
	"deno-server-legacy",
	"digital-ocean",
	"edgio",
	"firebase",
	"firebase-app-hosting",
	"flight-control",
	"genezio",
	"github-pages",
	"gitlab-pages",
	"heroku",
	"iis-handler",
	"iis-node",
	"koyeb",
	"netlify",
	"netlify-builder",
	"netlify-edge",
	"netlify-legacy",
	"netlify-static",
	"node-cluster",
	"node-listener",
	"node-server",
	"platform-sh",
	"render-com",
	"service-worker",
	"static",
	"stormkit",
	"vercel",
	"vercel-edge",
	"vercel-static",
	"winterjs",
	"zeabur",
	"zeabur-static",
	"zerops",
	"zerops-static"
];
//#endregion
//#region ../nuxi/src/completions.ts
async function initCompletions(command) {
	const completion = await tab(command);
	const devCommand = completion.commands.get("dev");
	if (devCommand) {
		const portOption = devCommand.options.get("port");
		if (portOption) portOption.handler = (complete) => {
			complete("3000", "Default development port");
			complete("3001", "Alternative port");
			complete("8080", "Common alternative port");
		};
		const hostOption = devCommand.options.get("host");
		if (hostOption) hostOption.handler = (complete) => {
			complete("localhost", "Local development");
			complete("0.0.0.0", "Listen on all interfaces");
			complete("127.0.0.1", "Loopback address");
		};
	}
	const buildCommand = completion.commands.get("build");
	if (buildCommand) {
		const presetOption = buildCommand.options.get("preset");
		if (presetOption) presetOption.handler = (complete) => {
			for (const preset of nitroPresets) complete(preset, "");
		};
	}
	const initCommand = completion.commands.get("init");
	if (initCommand) {
		const templateOption = initCommand.options.get("template");
		if (templateOption) templateOption.handler = (complete) => {
			for (const template in templates) complete(template, templates[template]?.description || "");
		};
	}
	const addCommand = completion.commands.get("add");
	if (addCommand) {
		const cwdOption = addCommand.options.get("cwd");
		if (cwdOption) cwdOption.handler = (complete) => {
			complete(".", "Current directory");
		};
	}
	for (const cmdName of [
		"dev",
		"build",
		"generate",
		"preview",
		"prepare",
		"init"
	]) {
		const cmd = completion.commands.get(cmdName);
		if (cmd) {
			const logLevelOption = cmd.options.get("logLevel");
			if (logLevelOption) logLevelOption.handler = (complete) => {
				complete("silent", "No logs");
				complete("info", "Standard logging");
				complete("verbose", "Detailed logging");
			};
		}
	}
	return completion;
}
//#endregion
export { initCompletions };
