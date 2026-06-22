import * as _nuxt_schema from '@nuxt/schema';
import { M as ModuleHooks, a as ModuleOptions } from './shared/fonts.B-on05Ea.mjs';
export { F as FontProvider } from './shared/fonts.B-on05Ea.mjs';
export { FontFaceData, FontFaceMeta, FontStyles, InitializedProvider, LocalFontSource, FontFaceData as NormalizedFontFaceData, RemoteFontSource, ResolveFontOptions as ResolveFontFacesOptions, ResolveFontOptions, ResolveFontResult } from 'unifont';
export { FontFallback, FontFamilyManualOverride, FontFamilyOverrides, FontFamilyProviderOverride, FontFormat, FontProviderName, FontSource, ProviderFamilyOptions } from 'fontless';

declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

declare module '@nuxt/schema' {
    interface NuxtHooks extends ModuleHooks {
    }
}

export { ModuleOptions, _default as default };
