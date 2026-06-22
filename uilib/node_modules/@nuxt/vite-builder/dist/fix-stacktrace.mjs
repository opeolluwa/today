var fix_stacktrace_default = (nitroApp) => {
	let runner;
	nitroApp.hooks?.hook("error", async (error) => {
		if (!error?.stack) return;
		try {
			runner ||= await import("#internal/nuxt/vite-node-runner").then((m) => m.default);
			runner.ssrFixStacktrace(error);
		} catch {}
	});
};
export { fix_stacktrace_default as default };
