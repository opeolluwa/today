import type { IconifyIcon } from '@iconify/types';
import { init as initClientBundle } from '#build/nuxt-icon-client-bundle';
export { initClientBundle };
export type IconifyIconCustomizeCallback = (content: string, name?: string, prefix?: string, provider?: string) => string;
export declare function loadIcon(name: string, timeout: number): Promise<Required<IconifyIcon> | null | undefined>;
export declare function useResolvedName(getName: () => string): import("vue").ComputedRef<string>;
export declare function resolveCustomizeFn(customize: IconifyIconCustomizeCallback | boolean | null | undefined, globalCustomize: IconifyIconCustomizeCallback | undefined): IconifyIconCustomizeCallback | undefined;
