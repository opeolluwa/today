import { Nuxt } from '@nuxt/schema';
import { ProviderFactory, ResolveFontOptions, ResolveFontResult } from 'unifont';
import { NormalizeFontDataContext, FontlessOptions } from 'fontless';

interface ModuleOptions extends FontlessOptions {
    /**
     *  Enables support for Nuxt DevTools.
     *
     * @default true
     */
    devtools?: boolean;
}
type Awaitable<T> = T | Promise<T>;
/**
 * @deprecated Use `Provider` types from `unifont`
 */
interface FontProvider<FontProviderOptions = Record<string, unknown>> {
    /**
     * The setup function will be called before the first `resolveFontFaces` call and is a good
     * place to register any Nuxt hooks or setup any state.
     */
    setup?: (options: FontProviderOptions, nuxt: Nuxt) => Awaitable<void>;
    /**
     * Resolve data for `@font-face` declarations.
     *
     * If nothing is returned then this provider doesn't handle the font family and we
     * will continue calling `resolveFontFaces` in other providers.
     */
    resolveFontFaces?: (fontFamily: string, options: ResolveFontOptions) => Awaitable<void | ResolveFontResult>;
}
interface ModuleHooks {
    'fonts:providers': (providers: Record<string, ProviderFactory<string> | FontProvider>) => void | Promise<void>;
    'fonts:public-asset-context': (context: NormalizeFontDataContext) => void | Promise<void>;
}

export type { FontProvider as F, ModuleHooks as M, ModuleOptions as a };
