import { FeatureBundle } from '../../features/dom-animation';
import { PropType } from 'vue';
type FeaturesProp = FeatureBundle | Promise<FeatureBundle> | (() => Promise<FeatureBundle>);
export declare const LazyMotion: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    features: {
        type: PropType<FeaturesProp>;
        required: true;
    };
    strict: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[], {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    features: {
        type: PropType<FeaturesProp>;
        required: true;
    };
    strict: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    strict: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export {};
