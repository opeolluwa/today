import * as prosemirror_state from 'prosemirror-state';
import * as prosemirror_view from 'prosemirror-view';
import * as _tiptap_core from '@tiptap/core';
import { Editor } from '@tiptap/core';
import * as _floating_ui_dom from '@floating-ui/dom';
import { VirtualElement, offset, flip, shift, arrow, size, autoPlacement, hide, inline } from '@floating-ui/dom';
import * as vue from 'vue';
import { PropType } from 'vue';
import { PluginKey, EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';

interface BubbleMenuPluginProps {
    /**
     * The plugin key.
     * @type {PluginKey | string}
     * @default 'bubbleMenu'
     */
    pluginKey: PluginKey | string;
    /**
     * The editor instance.
     */
    editor: Editor;
    /**
     * The DOM element that contains your menu.
     * @type {HTMLElement}
     * @default null
     */
    element: HTMLElement;
    /**
     * The delay in milliseconds before the menu should be updated.
     * This can be useful to prevent performance issues.
     * @type {number}
     * @default 250
     */
    updateDelay?: number;
    /**
     * The delay in milliseconds before the menu position should be updated on window resize.
     * This can be useful to prevent performance issues.
     * @type {number}
     * @default 60
     */
    resizeDelay?: number;
    /**
     * A function that determines whether the menu should be shown or not.
     * If this function returns `false`, the menu will be hidden, otherwise it will be shown.
     */
    shouldShow?: ((props: {
        editor: Editor;
        element: HTMLElement;
        view: EditorView;
        state: EditorState;
        oldState?: EditorState;
        from: number;
        to: number;
    }) => boolean) | null;
    /**
     * The DOM element to append your menu to. Default is the editor's parent element.
     *
     * Sometimes the menu needs to be appended to a different DOM context due to accessibility, clipping, or z-index issues.
     *
     * @type {HTMLElement}
     * @default null
     */
    appendTo?: HTMLElement | (() => HTMLElement);
    /**
     * A function that returns the virtual element for the menu.
     * This is useful when the menu needs to be positioned relative to a specific DOM element.
     * @type {() => VirtualElement | null}
     * @default Position based on the selection.
     */
    getReferencedVirtualElement?: () => VirtualElement | null;
    /**
     * The options for the bubble menu. Those are passed to Floating UI and include options for the placement, offset, flip, shift, arrow, size, autoPlacement,
     * hide, and inline middlewares.
     * @default {}
     * @see https://floating-ui.com/docs/computePosition#options
     */
    options?: {
        strategy?: 'absolute' | 'fixed';
        placement?: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
        offset?: Parameters<typeof offset>[0] | boolean;
        flip?: Parameters<typeof flip>[0] | boolean;
        shift?: Parameters<typeof shift>[0] | boolean;
        arrow?: Parameters<typeof arrow>[0] | false;
        size?: Parameters<typeof size>[0] | boolean;
        autoPlacement?: Parameters<typeof autoPlacement>[0] | boolean;
        hide?: Parameters<typeof hide>[0] | boolean;
        inline?: Parameters<typeof inline>[0] | boolean;
        onShow?: () => void;
        onHide?: () => void;
        onUpdate?: () => void;
        onDestroy?: () => void;
        /**
         * The scrollable element that should be listened to when updating the position of the bubble menu.
         * If not provided, the window will be used.
         * @type {HTMLElement | Window}
         */
        scrollTarget?: HTMLElement | Window;
    };
}

declare const BubbleMenu: vue.DefineComponent<vue.ExtractPropTypes<{
    pluginKey: {
        type: PropType<BubbleMenuPluginProps["pluginKey"]>;
        default: undefined;
    };
    editor: {
        type: PropType<BubbleMenuPluginProps["editor"]>;
        required: true;
    };
    updateDelay: {
        type: PropType<BubbleMenuPluginProps["updateDelay"]>;
        default: undefined;
    };
    resizeDelay: {
        type: PropType<BubbleMenuPluginProps["resizeDelay"]>;
        default: undefined;
    };
    options: {
        type: PropType<BubbleMenuPluginProps["options"]>;
        default: () => {};
    };
    appendTo: {
        type: PropType<BubbleMenuPluginProps["appendTo"]>;
        default: undefined;
    };
    shouldShow: {
        type: PropType<Exclude<Required<BubbleMenuPluginProps>["shouldShow"], null>>;
        default: null;
    };
    getReferencedVirtualElement: {
        type: PropType<Exclude<Required<BubbleMenuPluginProps>["getReferencedVirtualElement"], null>>;
        default: undefined;
    };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    pluginKey: {
        type: PropType<BubbleMenuPluginProps["pluginKey"]>;
        default: undefined;
    };
    editor: {
        type: PropType<BubbleMenuPluginProps["editor"]>;
        required: true;
    };
    updateDelay: {
        type: PropType<BubbleMenuPluginProps["updateDelay"]>;
        default: undefined;
    };
    resizeDelay: {
        type: PropType<BubbleMenuPluginProps["resizeDelay"]>;
        default: undefined;
    };
    options: {
        type: PropType<BubbleMenuPluginProps["options"]>;
        default: () => {};
    };
    appendTo: {
        type: PropType<BubbleMenuPluginProps["appendTo"]>;
        default: undefined;
    };
    shouldShow: {
        type: PropType<Exclude<Required<BubbleMenuPluginProps>["shouldShow"], null>>;
        default: null;
    };
    getReferencedVirtualElement: {
        type: PropType<Exclude<Required<BubbleMenuPluginProps>["getReferencedVirtualElement"], null>>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    options: {
        strategy?: "absolute" | "fixed";
        placement?: "top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end";
        offset?: Parameters<typeof _floating_ui_dom.offset>[0] | boolean;
        flip?: Parameters<typeof _floating_ui_dom.flip>[0] | boolean;
        shift?: Parameters<typeof _floating_ui_dom.shift>[0] | boolean;
        arrow?: Parameters<typeof _floating_ui_dom.arrow>[0] | false;
        size?: Parameters<typeof _floating_ui_dom.size>[0] | boolean;
        autoPlacement?: Parameters<typeof _floating_ui_dom.autoPlacement>[0] | boolean;
        hide?: Parameters<typeof _floating_ui_dom.hide>[0] | boolean;
        inline?: Parameters<typeof _floating_ui_dom.inline>[0] | boolean;
        onShow?: () => void;
        onHide?: () => void;
        onUpdate?: () => void;
        onDestroy?: () => void;
        scrollTarget?: HTMLElement | Window;
    } | undefined;
    pluginKey: string | PluginKey<any>;
    updateDelay: number | undefined;
    resizeDelay: number | undefined;
    appendTo: HTMLElement | (() => HTMLElement) | undefined;
    getReferencedVirtualElement: () => _floating_ui_dom.VirtualElement | null;
    shouldShow: (props: {
        editor: _tiptap_core.Editor;
        element: HTMLElement;
        view: prosemirror_view.EditorView;
        state: prosemirror_state.EditorState;
        oldState?: prosemirror_state.EditorState;
        from: number;
        to: number;
    }) => boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

interface FloatingMenuPluginProps {
    /**
     * The plugin key for the floating menu.
     * @default 'floatingMenu'
     */
    pluginKey: PluginKey | string;
    /**
     * The editor instance.
     * @default null
     */
    editor: Editor;
    /**
     * The DOM element that contains your menu.
     * @default null
     */
    element: HTMLElement;
    /**
     * The delay in milliseconds before the menu should be updated.
     * This can be useful to prevent performance issues.
     * @type {number}
     * @default 250
     */
    updateDelay?: number;
    /**
     * The delay in milliseconds before the menu position should be updated on window resize.
     * This can be useful to prevent performance issues.
     * @type {number}
     * @default 60
     */
    resizeDelay?: number;
    /**
     * The DOM element to append your menu to. Default is the editor's parent element.
     *
     * Sometimes the menu needs to be appended to a different DOM context due to accessibility, clipping, or z-index issues.
     *
     * @type {HTMLElement}
     * @default null
     */
    appendTo?: HTMLElement | (() => HTMLElement);
    /**
     * A function that determines whether the menu should be shown or not.
     * If this function returns `false`, the menu will be hidden, otherwise it will be shown.
     */
    shouldShow?: ((props: {
        editor: Editor;
        view: EditorView;
        state: EditorState;
        oldState?: EditorState;
        from: number;
        to: number;
    }) => boolean) | null;
    /**
     * The options for the floating menu. Those are passed to Floating UI and include options for the placement, offset, flip, shift, arrow, size, autoPlacement,
     * hide, and inline middlewares.
     * @default {}
     * @see https://floating-ui.com/docs/computePosition#options
     */
    options?: {
        strategy?: 'absolute' | 'fixed';
        placement?: 'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end';
        offset?: Parameters<typeof offset>[0] | boolean;
        flip?: Parameters<typeof flip>[0] | boolean;
        shift?: Parameters<typeof shift>[0] | boolean;
        arrow?: Parameters<typeof arrow>[0] | false;
        size?: Parameters<typeof size>[0] | boolean;
        autoPlacement?: Parameters<typeof autoPlacement>[0] | boolean;
        hide?: Parameters<typeof hide>[0] | boolean;
        inline?: Parameters<typeof inline>[0] | boolean;
        onShow?: () => void;
        onHide?: () => void;
        onUpdate?: () => void;
        onDestroy?: () => void;
        /**
         * The scrollable element that should be listened to when updating the position of the floating menu.
         * If not provided, the window will be used.
         * @type {HTMLElement | Window}
         */
        scrollTarget?: HTMLElement | Window;
    };
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        floatingMenu: {
            /**
             * Update the position of the floating menu.
             * @example editor.commands.updateFloatingMenuPosition()
             */
            updateFloatingMenuPosition: () => ReturnType;
        };
    }
}

declare const FloatingMenu: vue.DefineComponent<vue.ExtractPropTypes<{
    pluginKey: {
        type: null;
        default: undefined;
    };
    editor: {
        type: PropType<FloatingMenuPluginProps["editor"]>;
        required: true;
    };
    updateDelay: {
        type: PropType<FloatingMenuPluginProps["updateDelay"]>;
        default: undefined;
    };
    resizeDelay: {
        type: PropType<FloatingMenuPluginProps["resizeDelay"]>;
        default: undefined;
    };
    options: {
        type: PropType<FloatingMenuPluginProps["options"]>;
        default: () => {};
    };
    appendTo: {
        type: PropType<FloatingMenuPluginProps["appendTo"]>;
        default: undefined;
    };
    shouldShow: {
        type: PropType<Exclude<Required<FloatingMenuPluginProps>["shouldShow"], null>>;
        default: null;
    };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    pluginKey: {
        type: null;
        default: undefined;
    };
    editor: {
        type: PropType<FloatingMenuPluginProps["editor"]>;
        required: true;
    };
    updateDelay: {
        type: PropType<FloatingMenuPluginProps["updateDelay"]>;
        default: undefined;
    };
    resizeDelay: {
        type: PropType<FloatingMenuPluginProps["resizeDelay"]>;
        default: undefined;
    };
    options: {
        type: PropType<FloatingMenuPluginProps["options"]>;
        default: () => {};
    };
    appendTo: {
        type: PropType<FloatingMenuPluginProps["appendTo"]>;
        default: undefined;
    };
    shouldShow: {
        type: PropType<Exclude<Required<FloatingMenuPluginProps>["shouldShow"], null>>;
        default: null;
    };
}>> & Readonly<{}>, {
    options: {
        strategy?: "absolute" | "fixed";
        placement?: "top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end";
        offset?: Parameters<typeof _floating_ui_dom.offset>[0] | boolean;
        flip?: Parameters<typeof _floating_ui_dom.flip>[0] | boolean;
        shift?: Parameters<typeof _floating_ui_dom.shift>[0] | boolean;
        arrow?: Parameters<typeof _floating_ui_dom.arrow>[0] | false;
        size?: Parameters<typeof _floating_ui_dom.size>[0] | boolean;
        autoPlacement?: Parameters<typeof _floating_ui_dom.autoPlacement>[0] | boolean;
        hide?: Parameters<typeof _floating_ui_dom.hide>[0] | boolean;
        inline?: Parameters<typeof _floating_ui_dom.inline>[0] | boolean;
        onShow?: () => void;
        onHide?: () => void;
        onUpdate?: () => void;
        onDestroy?: () => void;
        scrollTarget?: HTMLElement | Window;
    } | undefined;
    pluginKey: any;
    updateDelay: number | undefined;
    resizeDelay: number | undefined;
    appendTo: HTMLElement | (() => HTMLElement) | undefined;
    shouldShow: (props: {
        editor: _tiptap_core.Editor;
        view: prosemirror_view.EditorView;
        state: prosemirror_state.EditorState;
        oldState?: prosemirror_state.EditorState;
        from: number;
        to: number;
    }) => boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

export { BubbleMenu, FloatingMenu };
