function tracingPlugin(opts = {}) {
	return (server) => {
		const { tracingChannel } = globalThis.process?.getBuiltinModule?.("node:diagnostics_channel") || {};
		if (!tracingChannel) return;
		if (opts.fetch !== false) {
			const fetchChannel = tracingChannel("srvx.request");
			const originalFetch = server.options.fetch;
			server.options.fetch = (request) => {
				return fetchChannel.tracePromise(async () => await originalFetch(request), {
					request,
					server
				});
			};
		}
		if (opts.middleware !== false) {
			const middlewareChannel = tracingChannel("srvx.middleware");
			const wrappedMiddleware = server.options.middleware.map((handler, index) => {
				const middleware = Object.freeze({
					index,
					handler
				});
				return (request, next) => {
					return middlewareChannel.tracePromise(async () => await handler(request, next), {
						request,
						server,
						middleware
					});
				};
			});
			server.options.middleware.splice(0, server.options.middleware.length, ...wrappedMiddleware);
		}
	};
}
export { tracingPlugin };
