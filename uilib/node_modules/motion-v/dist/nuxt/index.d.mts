import * as _nuxt_schema from '@nuxt/schema';
import { Options } from 'motion-v';

declare const components: string[];
declare const utilities: string[];
type Components = keyof typeof components;
type Utilities = keyof typeof utilities;
interface ModuleOptions {
    components: boolean;
    utilities: boolean;
    prefix: string;
    /** Globally register the v-motion directive */
    directives: boolean;
    /** Register custom preset directives (e.g. { 'fade-in': { initial: { opacity: 0 }, animate: { opacity: 1 } } }) */
    presets: Record<string, Options>;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

export { type Components, type ModuleOptions, type Utilities, _default as default };
