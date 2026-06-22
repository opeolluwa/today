import { injectConfigProviderContext } from "../ConfigProvider/ConfigProvider.js";
import * as vue from "vue";

//#region src/shared/useId.ts
let count = 0;
/**
* The `useId` function generates a unique identifier using a provided deterministic ID,
* a configured `<ConfigProvider>` ID source, Vue's native `useId`, or a fallback counter.
* @param {string | null | undefined} [deterministicId] - The `useId` function you provided takes an
* optional parameter `deterministicId`, which can be a string, null, or undefined. If
* `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
* the configured ID source.
*/
function useId(deterministicId, prefix = "reka") {
	if (deterministicId) return deterministicId;
	let id;
	const configProviderContext = injectConfigProviderContext({ useId: void 0 });
	if (configProviderContext.useId) id = configProviderContext.useId();
	else if ("useId" in vue) id = vue.useId?.();
	else id = `${++count}`;
	return prefix ? `${prefix}-${id}` : id;
}

//#endregion
export { useId };
//# sourceMappingURL=useId.js.map