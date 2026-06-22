import type { PropType } from 'vue';
import type { IconifyIconCustomizeCallback } from './shared.js';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    mode: {
        type: PropType<"svg" | "css">;
        required: false;
        default: null;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        required: false;
        default: null;
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
        type: StringConstructor;
        required: true;
    };
    mode: {
        type: PropType<"svg" | "css">;
        required: false;
        default: null;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        required: false;
        default: null;
    };
    customize: {
        type: PropType<IconifyIconCustomizeCallback | boolean | null>;
        default: null;
        required: false;
    };
}>> & Readonly<{}>, {
    customize: boolean | IconifyIconCustomizeCallback | null;
    size: string | number;
    mode: "svg" | "css";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
