import { AsyncLocalStorage } from "node:async_hooks";
import type { Storage } from "unstorage";
/**
* Stack of URLs currently rendering in the active async context (oldest first).
* A repeated entry signals a render cycle.
*/
export declare const prerenderRenderingURLs: AsyncLocalStorage<readonly string[]> | null;
export declare const payloadCache: Storage | null;
export declare const islandCache: Storage | null;
export declare const islandPropCache: Storage | null;
export declare const sharedPrerenderPromises: Map<string, Promise<any>> | null;
interface SharedPrerenderCache {
	get<T = unknown>(key: string): Promise<T> | undefined;
	set<T>(key: string, value: Promise<T>): Promise<void>;
}
export declare const sharedPrerenderCache: SharedPrerenderCache | null;
export {};
