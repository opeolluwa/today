import { CreateOptionsType, CreatePluginType } from 'embla-carousel';
export declare type WheelGesturesPluginOptions = CreateOptionsType<{
    wheelDraggingClass: string;
    forceWheelAxis?: 'x' | 'y';
    target?: Element;
}>;
declare type WheelGesturesPluginType = CreatePluginType<{}, WheelGesturesPluginOptions>;
export declare function WheelGesturesPlugin(userOptions?: WheelGesturesPluginType['options']): WheelGesturesPluginType;
export declare namespace WheelGesturesPlugin {
    var globalOptions: Partial<CreateOptionsType<CreateOptionsType<{
        wheelDraggingClass: string;
        forceWheelAxis?: "x" | "y" | undefined;
        target?: Element | undefined;
    }>>> | undefined;
}
declare module 'embla-carousel' {
    interface EmblaPluginsType {
        wheelGestures?: WheelGesturesPluginType;
    }
}
export {};
