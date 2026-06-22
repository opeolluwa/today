import process from "node:process";
import { consola } from "consola";
import { viteNodeFetch, viteNodeOptions } from "#vite-node";
import { ViteNodeRunner } from "vite-node/client";
const runner = createRunner();
function createRunner() {
	return new ViteNodeRunner({
		root: viteNodeOptions.root,
		base: viteNodeOptions.base,
		resolveId(id, importer) {
			return viteNodeFetch.resolveId(id, importer);
		},
		fetchModule(id) {
			id = id.replace(/\/\//g, "/");
			return viteNodeFetch.fetchModule(id).catch((err) => {
				const errorData = err?.data;
				if (!errorData) throw err;
				let built;
				try {
					built = buildViteError(errorData, id);
				} catch (buildErr) {
					consola.warn("Internal nuxt error while formatting vite-node error. Please report this!", buildErr);
					const message = `[vite-node] [TransformError] ${errorData?.message || "-"}`;
					consola.error(message, errorData);
					built = Object.assign(new Error(message), {
						statusText: "Vite Error",
						statusMessage: "Vite Error",
						stack: `${message}\nat ${id}\n` + (errorData?.stack || "")
					});
				}
				throw built;
			});
		}
	});
}
function buildViteError(errorData, id) {
	const loc = (errorData.id || id || "").replace(process.cwd(), ".");
	const rawMessage = errorData.message || "";
	const [headRaw, ...frameTail] = rawMessage.split(/\r?\n\s*\n/);
	const reason = ((headRaw || "").split(/\r?\n/)[0] ?? "").replace(/^\[@?[\w.\-/:]+\]\s*/, "").trim();
	const messageFrame = frameTail.length ? frameTail.join("\n\n").trim() : "";
	const message = reason ? `${loc} — ${reason}` : rawMessage || loc;
	const error = Object.assign(new Error(message), {
		name: "ViteError",
		statusText: "Vite Error",
		statusMessage: "Vite Error",
		code: errorData.code,
		hint: errorData.frame || messageFrame || void 0
	});
	if (errorData.stack) error.stack = errorData.stack;
	return error;
}
export { runner as default };
