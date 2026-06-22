import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { DialogClose as DrawerClose } from 'reka-ui';
import { DialogCloseProps as DrawerCloseProps } from 'reka-ui';
import { DialogDescription as DrawerDescription } from 'reka-ui';
import { DialogDescriptionProps as DrawerDescriptionProps } from 'reka-ui';
import { DialogPortal as DrawerPortal } from 'reka-ui';
import { DialogPortalProps as DrawerPortalProps } from 'reka-ui';
import { DialogTitle as DrawerTitle } from 'reka-ui';
import { DialogTitleProps as DrawerTitleProps } from 'reka-ui';
import { DialogTrigger as DrawerTrigger } from 'reka-ui';
import { DialogTriggerProps as DrawerTriggerProps } from 'reka-ui';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';

declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;

declare type __VLS_NonUndefinedable_2<T> = T extends undefined ? never : T;

declare type __VLS_NonUndefinedable_3<T> = T extends undefined ? never : T;

declare type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_Prettify_2<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

declare type __VLS_TypePropsToRuntimeProps_2<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable_2<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

declare type __VLS_TypePropsToRuntimeProps_3<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable_3<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};

declare type __VLS_WithDefaults_2<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify_2<P[K] & {
        default: D[K];
    }> : P[K];
};

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_2<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_3<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_4<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export { DrawerClose }

export { DrawerCloseProps }

export declare const DrawerContent: __VLS_WithTemplateSlots_3<DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>, {
    default?(_: {}): any;
}>;

export { DrawerDescription }

export { DrawerDescriptionProps }

export declare type DrawerDirection = 'top' | 'bottom' | 'left' | 'right';

export declare const DrawerHandle: __VLS_WithTemplateSlots_4<DefineComponent<ExtractPropTypes<__VLS_WithDefaults_2<__VLS_TypePropsToRuntimeProps_3<DrawerHandleProps>, {
preventCycle: boolean;
}>>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_WithDefaults_2<__VLS_TypePropsToRuntimeProps_3<DrawerHandleProps>, {
preventCycle: boolean;
}>>> & Readonly<{}>, {
preventCycle: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>, {
    default?(_: {}): any;
}>;

declare interface DrawerHandleProps {
    preventCycle?: boolean;
}

export declare const DrawerOverlay: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export { DrawerPortal }

export { DrawerPortalProps }

export declare const DrawerRoot: __VLS_WithTemplateSlots<DefineComponent<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<DrawerRootProps>, {
open: undefined;
defaultOpen: undefined;
fixed: undefined;
dismissible: boolean;
activeSnapPoint: undefined;
snapPoints: undefined;
shouldScaleBackground: undefined;
setBackgroundColorOnScale: boolean;
closeThreshold: number;
fadeFromIndex: undefined;
nested: boolean;
modal: boolean;
scrollLockTimeout: number;
direction: string;
handleOnly: boolean;
}>>, {
open: Ref<boolean, boolean>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
drag: (percentageDragged: number) => void;
release: (open: boolean) => void;
close: () => void;
"update:open": (open: boolean) => void;
"update:activeSnapPoint": (val: string | number) => void;
animationEnd: (open: boolean) => void;
}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<DrawerRootProps>, {
open: undefined;
defaultOpen: undefined;
fixed: undefined;
dismissible: boolean;
activeSnapPoint: undefined;
snapPoints: undefined;
shouldScaleBackground: undefined;
setBackgroundColorOnScale: boolean;
closeThreshold: number;
fadeFromIndex: undefined;
nested: boolean;
modal: boolean;
scrollLockTimeout: number;
direction: string;
handleOnly: boolean;
}>>> & Readonly<{
onClose?: (() => any) | undefined;
onDrag?: ((percentageDragged: number) => any) | undefined;
onRelease?: ((open: boolean) => any) | undefined;
"onUpdate:open"?: ((open: boolean) => any) | undefined;
"onUpdate:activeSnapPoint"?: ((val: string | number) => any) | undefined;
onAnimationEnd?: ((open: boolean) => any) | undefined;
}>, {
direction: DrawerDirection;
shouldScaleBackground: boolean;
setBackgroundColorOnScale: boolean;
open: boolean;
modal: boolean;
dismissible: boolean;
handleOnly: boolean;
fixed: boolean;
activeSnapPoint: string | number | null;
snapPoints: (string | number)[];
fadeFromIndex: never;
nested: boolean;
scrollLockTimeout: number;
closeThreshold: number;
defaultOpen: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>, Readonly<{
    default: (props: {
        open: boolean;
    }) => any;
}> & {
    default: (props: {
        open: boolean;
    }) => any;
}>;

export declare interface DrawerRootEmits {
    (e: 'drag', percentageDragged: number): void;
    (e: 'release', open: boolean): void;
    (e: 'close'): void;
    (e: 'update:open', open: boolean): void;
    (e: 'update:activeSnapPoint', val: string | number): void;
    /**
     * Gets triggered after the open or close animation ends, it receives an `open` argument with the `open` state of the drawer by the time the function was triggered.
     * Useful to revert any state changes for example.
     */
    (e: 'animationEnd', open: boolean): void;
}

export declare const DrawerRootNested: __VLS_WithTemplateSlots_2<DefineComponent<ExtractPropTypes<__VLS_TypePropsToRuntimeProps_2<DrawerRootProps>>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
drag: (percentageDragged: number) => void;
release: (open: boolean) => void;
close: () => void;
"update:open": (open: boolean) => void;
"update:activeSnapPoint": (val: string | number) => void;
animationEnd: (open: boolean) => void;
}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps_2<DrawerRootProps>>> & Readonly<{
onClose?: (() => any) | undefined;
onDrag?: ((percentageDragged: number) => any) | undefined;
onRelease?: ((open: boolean) => any) | undefined;
"onUpdate:open"?: ((open: boolean) => any) | undefined;
"onUpdate:activeSnapPoint"?: ((val: string | number) => any) | undefined;
onAnimationEnd?: ((open: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>, {
    default?(_: {}): any;
}>;

export declare type DrawerRootProps = {
    activeSnapPoint?: number | string | null;
    /**
     * Number between 0 and 1 that determines when the drawer should be closed.
     * Example: threshold of 0.5 would close the drawer if the user swiped for 50% of the height of the drawer or more.
     * @default 0.25
     */
    closeThreshold?: number;
    shouldScaleBackground?: boolean;
    /**
     * When `false` we don't change body's background color when the drawer is open.
     * @default true
     */
    setBackgroundColorOnScale?: boolean;
    /**
     * Duration for which the drawer is not draggable after scrolling content inside of the drawer.
     * @default 500ms
     */
    scrollLockTimeout?: number;
    /**
     * When `true`, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open
     */
    fixed?: boolean;
    /**
     * When `false` dragging, clicking outside, pressing esc, etc. will not close the drawer.
     * Use this in combination with the `open` prop, otherwise you won't be able to open/close the drawer.
     * @default true
     */
    dismissible?: boolean;
    /**
     * When `false` it allows to interact with elements outside of the drawer without closing it.
     * @default true
     */
    modal?: boolean;
    open?: boolean;
    /**
     * Opened by default, skips initial enter animation. Still reacts to `open` state changes
     * @default false
     */
    defaultOpen?: boolean;
    nested?: boolean;
    /**
     * Direction of the drawer. Can be `top` or `bottom`, `left`, `right`.
     * @default 'bottom'
     */
    direction?: DrawerDirection;
    /**
     * When `true` the `body` doesn't get any styles assigned from Vaul
     */
    noBodyStyles?: boolean;
    /**
     * When `true` only allows the drawer to be dragged by the `<Drawer.Handle />` component.
     * @default false
     */
    handleOnly?: boolean;
    preventScrollRestoration?: boolean;
} & WithoutFadeFromProps;

export { DrawerTitle }

export { DrawerTitleProps }

export { DrawerTrigger }

export { DrawerTriggerProps }

export declare interface SnapPoint {
    fraction: number;
    height: number;
}

declare interface WithoutFadeFromProps {
    /**
     * Array of numbers from 0 to 100 that corresponds to % of the screen a given snap point should take up.
     * Should go from least visible. Example `[0.2, 0.5, 0.8]`.
     * You can also use px values, which doesn't take screen height into account.
     */
    snapPoints?: (number | string)[];
    /**
     * Index of a `snapPoint` from which the overlay fade should be applied. Defaults to the last snap point.
     */
    fadeFromIndex?: never;
}

export { }
