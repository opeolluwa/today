import { AsyncLocalStorage } from "node:async_hooks";
import { useStorage } from "nitropack/runtime";
// @ts-expect-error virtual file
import { NUXT_RUNTIME_PAYLOAD_EXTRACTION, NUXT_SHARED_DATA } from "#internal/nuxt/nitro-config.mjs";

export const prerenderRenderingURLs = import.meta.prerender ? new AsyncLocalStorage() : null;
export const payloadCache = import.meta.prerender ? useStorage("internal:nuxt:prerender:payload") : NUXT_RUNTIME_PAYLOAD_EXTRACTION ? useStorage("cache:nuxt:payload") : null;
export const islandCache = import.meta.prerender ? useStorage("internal:nuxt:prerender:island") : null;
export const islandPropCache = import.meta.prerender ? useStorage("internal:nuxt:prerender:island-props") : null;
export const sharedPrerenderPromises = import.meta.prerender && NUXT_SHARED_DATA ? new Map() : null;
const sharedPrerenderKeys = new Set();


const sharedPrerenderChains = import.meta.prerender && NUXT_SHARED_DATA ? new Map() : null;
export const sharedPrerenderCache = import.meta.prerender && NUXT_SHARED_DATA ? {
	get(key) {
		if (!sharedPrerenderKeys.has(key)) {
			return;
		}
		
		const currentChain = prerenderRenderingURLs?.getStore();
		const setChain = sharedPrerenderChains?.get(key);
		if (currentChain?.length && setChain?.length && setChain.some((url) => currentChain.includes(url))) {
			return;
		}
		return sharedPrerenderPromises.get(key) ?? useStorage("internal:nuxt:prerender:shared").getItem(key);
	},
	async set(key, value) {
		sharedPrerenderKeys.add(key);
		sharedPrerenderPromises.set(key, value);
		const chain = prerenderRenderingURLs?.getStore();
		if (chain?.length) {
			sharedPrerenderChains.set(key, chain);
		}
		try {
			const resolved = await value;
			await useStorage("internal:nuxt:prerender:shared").setItem(key, resolved);
		} catch {} finally {
			sharedPrerenderPromises.delete(key);
			sharedPrerenderChains?.delete(key);
		}
	}
} : null;
