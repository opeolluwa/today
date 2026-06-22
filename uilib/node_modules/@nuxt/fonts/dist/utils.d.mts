import { ProviderFactory } from 'unifont';
import { F as FontProvider } from './shared/fonts.B-on05Ea.mjs';
import '@nuxt/schema';
import 'fontless';

/**
 * @deprecated Use `defineFontProvider` from `unifont` instead.
 */
declare function defineFontProvider(options: FontProvider): FontProvider<Record<string, unknown>>;

declare function toUnifontProvider(name: string, provider: FontProvider): ProviderFactory<string, any, any>;

export { FontProvider, defineFontProvider, toUnifontProvider };
