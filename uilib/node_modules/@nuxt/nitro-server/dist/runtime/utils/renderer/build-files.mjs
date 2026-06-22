import { createRenderer } from "vue-bundle-renderer/runtime";
import { renderToString as _renderToString } from "vue/server-renderer";
import { propsToString } from "@unhead/vue/server";
import { useRuntimeConfig } from "nitropack/runtime";
// @ts-expect-error virtual file
import { NUXT_NO_SSR } from "#internal/nuxt/nitro-config.mjs";
// @ts-expect-error virtual file
import { appRootAttrs, appRootTag, appSpaLoaderAttrs, appSpaLoaderTag, spaLoadingTemplateOutside } from "#internal/nuxt.config.mjs";
// @ts-expect-error virtual file
import { buildAssetsURL, publicAssetsURL } from "#internal/nuxt/paths";
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => import("#build/dist/server/server.mjs").then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => import("#build/dist/server/client.manifest.mjs").then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
// @ts-expect-error file will be produced after app build
const getPrecomputedDependencies = () => import("#build/dist/server/client.precomputed.mjs").then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

export const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = import.meta.dev ? undefined : await getPrecomputedDependencies();
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: import.meta.dev ? await getClientManifest() : undefined,
		renderToString,
		buildAssetsURL
	});
	async function renderToString(input, context) {
		const html = await _renderToString(input, context);
		
		
		if (import.meta.dev && process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = import.meta.dev ? undefined : await getPrecomputedDependencies();
	// @ts-expect-error virtual file
	const spaTemplate = await import("#spa-template").then((r) => r.template).catch(() => "").then((r) => {
		if (spaLoadingTemplateOutside) {
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		} else {
			return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: import.meta.dev ? await getClientManifest() : undefined,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
export function getRenderer(ssrContext) {
	return NUXT_NO_SSR || ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
export const getSSRStyles = lazyCachedFunction(() => import("#build/dist/server/styles.mjs").then((r) => r.default || r));
