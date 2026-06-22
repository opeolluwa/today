import type { PropType } from 'vue';
import type { IconifyIconCustomizeCallback } from './shared.js';
export declare const NuxtIconSvg: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    name: {
        type: PropType<string>;
        required: true;
    };
    customize: {
        type: PropType<IconifyIconCustomizeCallback | boolean | null>;
        default: null;
        required: false;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: PropType<string>;
        required: true;
    };
    customize: {
        type: PropType<IconifyIconCustomizeCallback | boolean | null>;
        default: null;
        required: false;
    };
}>> & Readonly<{}>, {
    customize: boolean | IconifyIconCustomizeCallback | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
