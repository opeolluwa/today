import { Editor as Editor$1, EditorOptions, Storage, MarkView, MarkViewRendererOptions, MarkViewProps, MarkViewRenderer, NodeViewProps, NodeViewRendererOptions, NodeViewRenderer } from '@tiptap/core';
export * from '@tiptap/core';
import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state';
import * as vue from 'vue';
import { ComponentInternalInstance, ComponentPublicInstance, AppContext, PropType, Ref, h, Component } from 'vue';
import { Node } from '@tiptap/pm/model';
import { Decoration, DecorationSource } from '@tiptap/pm/view';

type ContentComponent = ComponentInternalInstance & {
    ctx: ComponentPublicInstance;
};
declare class Editor extends Editor$1 {
    private reactiveState;
    private reactiveExtensionStorage;
    contentComponent: ContentComponent | null;
    appContext: AppContext | null;
    constructor(options?: Partial<EditorOptions>);
    get state(): EditorState;
    get storage(): Storage;
    /**
     * Register a ProseMirror plugin.
     */
    registerPlugin(plugin: Plugin, handlePlugins?: (newPlugin: Plugin, plugins: Plugin[]) => Plugin[]): EditorState;
    /**
     * Unregister a ProseMirror plugin.
     */
    unregisterPlugin(nameOrPluginKey: string | PluginKey): EditorState | undefined;
}

declare const EditorContent: vue.DefineComponent<vue.ExtractPropTypes<{
    editor: {
        default: null;
        type: PropType<Editor>;
    };
}>, {
    rootEl: Ref<Element | undefined, Element | undefined>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    editor: {
        default: null;
        type: PropType<Editor>;
    };
}>> & Readonly<{}>, {
    editor: Editor;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const NodeViewContent: vue.DefineComponent<vue.ExtractPropTypes<{
    as: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    as: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    as: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const NodeViewWrapper: vue.DefineComponent<vue.ExtractPropTypes<{
    as: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    as: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    as: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;

declare const useEditor: (options?: Partial<EditorOptions>) => vue.ShallowRef<Editor | undefined, Editor | undefined>;

interface VueRendererOptions {
    editor: Editor$1;
    props?: Record<string, any>;
}
type ExtendedVNode = ReturnType<typeof h> | null;
interface RenderedComponent {
    vNode: ExtendedVNode;
    destroy: () => void;
    el: Element | null;
}
/**
 * This class is used to render Vue components inside the editor.
 */
declare class VueRenderer {
    renderedComponent: RenderedComponent;
    editor: Editor;
    component: Component;
    el: Element | null;
    props: Record<string, any>;
    /**
     * Flag to track if the renderer has been destroyed, preventing queued or asynchronous renders from executing after teardown.
     */
    destroyed: boolean;
    constructor(component: Component, { props, editor }: VueRendererOptions);
    get element(): Element | null;
    get ref(): any;
    renderComponent(): RenderedComponent;
    updateProps(props?: Record<string, any>): void;
    destroy(): void;
}

interface VueMarkViewRendererOptions extends MarkViewRendererOptions {
    as?: string;
    className?: string;
    attrs?: {
        [key: string]: string;
    };
}
declare const markViewProps: {
    editor: {
        type: PropType<MarkViewProps["editor"]>;
        required: true;
    };
    mark: {
        type: PropType<MarkViewProps["mark"]>;
        required: true;
    };
    extension: {
        type: PropType<MarkViewProps["extension"]>;
        required: true;
    };
    inline: {
        type: PropType<MarkViewProps["inline"]>;
        required: true;
    };
    view: {
        type: PropType<MarkViewProps["view"]>;
        required: true;
    };
    updateAttributes: {
        type: PropType<MarkViewProps["updateAttributes"]>;
        required: true;
    };
    HTMLAttributes: {
        type: PropType<MarkViewProps["HTMLAttributes"]>;
        required: true;
    };
};
declare const MarkViewContent: vue.DefineComponent<vue.ExtractPropTypes<{
    as: {
        type: StringConstructor;
        default: string;
    };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    as: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    as: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare class VueMarkView extends MarkView<Component, VueMarkViewRendererOptions> {
    renderer: VueRenderer;
    constructor(component: Component, props: MarkViewProps, options?: Partial<VueMarkViewRendererOptions>);
    get dom(): HTMLElement;
    get contentDOM(): HTMLElement | null;
    updateAttributes(attrs: Record<string, any>): void;
    destroy(): void;
}
declare function VueMarkViewRenderer(component: Component, options?: Partial<VueMarkViewRendererOptions>): MarkViewRenderer;

declare const nodeViewProps: {
    editor: {
        type: PropType<NodeViewProps["editor"]>;
        required: true;
    };
    node: {
        type: PropType<NodeViewProps["node"]>;
        required: true;
    };
    decorations: {
        type: PropType<NodeViewProps["decorations"]>;
        required: true;
    };
    selected: {
        type: PropType<NodeViewProps["selected"]>;
        required: true;
    };
    extension: {
        type: PropType<NodeViewProps["extension"]>;
        required: true;
    };
    getPos: {
        type: PropType<NodeViewProps["getPos"]>;
        required: true;
    };
    updateAttributes: {
        type: PropType<NodeViewProps["updateAttributes"]>;
        required: true;
    };
    deleteNode: {
        type: PropType<NodeViewProps["deleteNode"]>;
        required: true;
    };
    view: {
        type: PropType<NodeViewProps["view"]>;
        required: true;
    };
    innerDecorations: {
        type: PropType<NodeViewProps["innerDecorations"]>;
        required: true;
    };
    HTMLAttributes: {
        type: PropType<NodeViewProps["HTMLAttributes"]>;
        required: true;
    };
};
interface VueNodeViewRendererOptions extends NodeViewRendererOptions {
    update: ((props: {
        oldNode: Node;
        oldDecorations: readonly Decoration[];
        oldInnerDecorations: DecorationSource;
        newNode: Node;
        newDecorations: readonly Decoration[];
        innerDecorations: DecorationSource;
        updateProps: () => void;
    }) => boolean) | null;
}
declare function VueNodeViewRenderer(component: Component<NodeViewProps>, options?: Partial<VueNodeViewRendererOptions>): NodeViewRenderer;

export { Editor, EditorContent, MarkViewContent, NodeViewContent, NodeViewWrapper, VueMarkView, VueMarkViewRenderer, type VueMarkViewRendererOptions, VueNodeViewRenderer, type VueNodeViewRendererOptions, VueRenderer, type VueRendererOptions, markViewProps, nodeViewProps, useEditor };
