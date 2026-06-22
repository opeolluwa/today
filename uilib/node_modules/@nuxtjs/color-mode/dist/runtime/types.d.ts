export interface ColorModeInstance {
    preference: string;
    readonly value: string;
    unknown: boolean;
    forced: boolean;
}
export type ColorModeStorage = 'localStorage' | 'sessionStorage' | 'cookie';
declare module '#app' {
    interface NuxtApp extends PluginInjection {
    }
}
declare module 'vue-router' {
    interface RouteMeta {
        colorMode?: string;
    }
}
interface PluginInjection {
    $colorMode: ColorModeInstance;
}
declare module 'vue' {
    interface ComponentCustomProperties extends PluginInjection {
    }
}
export {};
