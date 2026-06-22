import * as _nuxt_schema from '@nuxt/schema';
import { IconifyJSON } from '@iconify/types';
import { IconifyIconCustomizeCallback } from '../dist/runtime/components/shared.js';

interface NuxtIconRuntimeOptions {
    /**
     * Icon Size
     *
     * Set the default icon size.
     *
     */
    size: string | undefined;
    /**
     * CSS Class
     *
     * Set the default CSS class.
     *
     * @default ""
     */
    class: string;
    /**
     * Default Attributes
     *
     * Attributes applied to every icon component.
     *
     * @default { "aria-hidden": true }
     *
     */
    attrs: Record<string, string | number | boolean>;
    /**
     * Default Rendering Mode
     *
     * Set the default rendering mode for the icon component
     *
     * @default "css"
     *
     * @enum css,svg
     */
    mode: string;
    /**
     * Icon aliases
     *
     * Define Icon aliases to update them easily without code changes.
     *
     */
    aliases: {
        [alias: string]: string;
    };
    /**
     * CSS Selector Prefix
     *
     * Set the default CSS selector prefix.
     *
     * @default "i-"
     */
    cssSelectorPrefix: string;
    /**
     * CSS Layer Name
     *
     * Set the default CSS `@layer` name.
     *
     */
    cssLayer: string | undefined;
    /**
     * Use CSS `:where()` Pseudo Selector
     *
     * Use CSS `:where()` pseudo selector to reduce specificity.
     *
     * @default true
     */
    cssWherePseudo: boolean;
    /**
     * Icon Collections
     *
     * List of known icon collections name. Used to resolve collection name ambiguity.
     * e.g. `simple-icons-github` -> `simple-icons:github` instead of `simple:icons-github`
     *
     * When not provided, will use the full Iconify collection list.
     *
     */
    collections: string[] | null;
    /**
     * Custom Icon Collections
     *
     */
    customCollections: string[] | null;
    /**
     * Icon Provider
     *
     * Provider to use for fetching icons
     *
     * - `server` - Fetch icons with a server handler
     * - `iconify` - Fetch icons with Iconify API, purely client-side
     * - `none` - Do not fetch icons (use client bundle only)
     *
     * `server` by default; `iconify` when `ssr: false`
     *
     *
     * @enum server,iconify,none
     */
    provider: 'server' | 'iconify' | 'none' | undefined;
    /**
     * Iconify API Endpoint URL
     *
     * Define a custom Iconify API endpoint URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api.
     *
     * @default "https://api.iconify.design"
     */
    iconifyApiEndpoint: string;
    /**
     * Fallback to Iconify API
     *
     * Fallback to Iconify API if server provider fails to found the collection.
     *
     * @default true
     *
     * @enum true,false,server-only,client-only
     */
    fallbackToApi: boolean | 'server-only' | 'client-only';
    /**
     * Local API Endpoint Path
     *
     * Define a custom path for the local API endpoint.
     *
     * @default "/api/_nuxt_icon"
     */
    localApiEndpoint: string;
    /**
     * Fetch Timeout
     *
     * Set the timeout for fetching icons.
     *
     * @default 1500
     */
    fetchTimeout: number;
    /**
     * Customize callback
     *
     * Customize icon content (replace stroke-width, colors, etc...).
     *
     */
    customize: IconifyIconCustomizeCallback;
}

interface ModuleOptions extends Partial<Omit<NuxtIconRuntimeOptions, 'customize' | 'customCollections'>> {
    /**
     * Name of the component to be registered
     * @default 'Icon'
     */
    componentName?: string;
    /**
     * Bundle icons for server to serve icons
     *
     * - `auto`: `local` when deploy to hosted platform, `remote` for edge workers
     * - `local`: Auto-discover all `@iconify-json/*` collections installed locally
     * - `remote`: Fetch collections from remote CDN. Same as `{ remote: true }`
     * - `{ collections: string[] }`: Specify collections to bundle
     *
     * @default 'auto'
     */
    serverBundle?: 'auto' | 'remote' | 'local' | false | ServerBundleOptions;
    /**
     * Bundle icons into client-side.
     */
    clientBundle?: ClientBundleOptions;
    /**
     * Custom icon collections
     */
    customCollections?: (CustomCollection | IconifyJSON)[];
    /**
     * List of pre-compiled CSS classnames to be used for server-side CSS icon rendering
     */
    serverKnownCssClasses?: string[];
}
interface CustomCollection extends Pick<IconifyJSON, 'prefix' | 'width' | 'height'> {
    dir: string;
    /**
     * Normalize icon names to kebab-case
     *
     * Since v1.10.0, Iconify supports arbitrary icon names.
     * You can disable this option to keep the original icon names.
     *
     * This options is true by default to ensure compatibility with older versions.
     * In the next major version, this option will be disabled by default.
     *
     * @see https://github.com/nuxt/icon/issues/265#issuecomment-2524979176
     * @default true
     */
    normalizeIconName?: boolean;
    /**
     * Enables recursive scanning of the specified directory.
     * The folder structure determines icon names.
     *
     * Disabled by default to ensure compatibility with older versions.
     *
     * @example `path/to/icon.svg` → `path-to-icon`
     * @see https://github.com/nuxt/icon/issues/374
     * @default false
     */
    recursive?: boolean;
}
interface RemoteCollection {
    prefix: string;
    fetchEndpoint: string;
}
type RemoteCollectionSource = 'github-raw' | 'jsdelivr' | 'unpkg' | ((name: string) => string);
interface ServerBundleOptions {
    /**
     * Iconify collection names to be bundled
     */
    collections?: (string | CustomCollection | IconifyJSON | RemoteCollection)[];
    /**
     * Whether to bundle remote collections
     *
     * When set to `true`, `jsdelivr` will be used as the default remote source
     *
     * @default false
     */
    remote?: boolean | RemoteCollectionSource;
    /**
     * Whether to disable server bundle
     */
    disabled?: boolean;
    /**
     * External icon JSON files as in the final `node_modules`, instead of bundling them
     * This would likely improve the performance of bundling.
     * Enabling this option would requires your production Node.js server to be able to import JSON modules.
     *
     * @default false
     */
    externalizeIconsJson?: boolean;
}
interface ClientBundleOptions {
    /**
     * List of icons to be bundled, each icon should be in the formatted as `prefix:icon`
     */
    icons?: string[];
    /**
     * Scan source files for icon usage to bundle them in client bundle.
     *
     * Currently experimental. Once stabled, this option will be enabled by default.
     *
     * @default false
     */
    scan?: boolean | ClientBundleScanOptions;
    /**
     * Bundle all custom collections into client-side
     *
     * Default to true when `provider` is not set to `server`
     */
    includeCustomCollections?: boolean;
    /**
     * Size limit of the client bundle in KB, uncompressed.
     * When exceeded, this will prevent the build process from continuing
     * Set to `0` to disable the size limit check
     *
     * @default 256
     */
    sizeLimitKb?: number;
}
interface ClientBundleScanOptions {
    /**
     * Glob patterns or paths to include files for scanning, relative to the project root.
     * Plain JavaScript and TypeScript files are not included by default to improve performance.
     *
     * When specified, the default will be overridden
     *
     * @default ['**\/*.{vue,jsx,tsx,md,mdc,mdx}']
     */
    globInclude?: string[];
    /**
     * Glob patterns or paths to exclude files for scanning
     * When specified, the default will be overridden
     *
     * @default ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*']
     */
    globExclude?: string[];
    /**
     * Collection names to be ignored when scanning
     */
    ignoreCollections?: string[];
    /**
     * Additional collections that are not or not yet inclduded in the `@iconify` collection
     */
    additionalCollections?: string[];
}
declare module '@nuxt/schema' {
    interface NuxtHooks {
        'icon:serverKnownCssClasses'(selectors: string[]): void;
        'icon:clientBundleIcons'(icons: Set<string>): void;
    }
}

declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

export { _default as default };
export type { ModuleOptions, NuxtIconRuntimeOptions as RuntimeOptions };
