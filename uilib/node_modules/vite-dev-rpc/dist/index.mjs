import { createBirpc, createBirpcGroup } from "birpc";
//#region src/index.ts
const channelCache = /* @__PURE__ */ new WeakMap();
function createRPCServer(name, ws, functions, options = {}) {
	const event = `${name}:rpc`;
	const group = createBirpcGroup(functions, () => Array.from(ws?.clients || []).map((channel) => {
		if (channel.socket.readyState === channel.socket.CLOSED) return void 0;
		const cached = channelCache.get(channel);
		if (cached) return cached;
		const options = {
			on: (fn) => {
				function handler(data, source) {
					if (!source.socket) throw new Error("source.socket is undefined");
					if (channel.socket === source.socket) fn(data, source);
				}
				ws.on(event, handler);
				channel.socket.on("close", () => {
					ws.off(event, handler);
				});
			},
			post: (data) => {
				channel.send(event, data);
			}
		};
		channelCache.set(channel, options);
		return options;
	}).filter((c) => !!c), options);
	ws.on("connection", () => {
		group.updateChannels();
	});
	return group.broadcast;
}
function createRPCClient(name, hot, functions = {}, options = {}) {
	const event = `${name}:rpc`;
	const promise = Promise.resolve(hot).then((r) => {
		if (!r) console.warn("[vite-hot-client] Received undefined hot context, RPC calls are ignored");
		return r;
	});
	return createBirpc(functions, {
		...options,
		on: async (fn) => {
			(await promise)?.on(event, fn);
		},
		post: async (data) => {
			(await promise)?.send(event, data);
		}
	});
}
//#endregion
export { createRPCClient, createRPCServer };
