// src/DragHandle.ts
import {
  defaultComputePositionConfig,
  DragHandlePlugin,
  dragHandlePluginDefaultKey,
  normalizeNestedOptions
} from "@tiptap/extension-drag-handle";
import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch
} from "vue";
var DragHandle = defineComponent({
  name: "DragHandleVue",
  props: {
    pluginKey: {
      type: [String, Object],
      default: dragHandlePluginDefaultKey
    },
    editor: {
      type: Object,
      required: true
    },
    computePositionConfig: {
      type: Object,
      default: () => ({})
    },
    onNodeChange: {
      type: Function,
      default: null
    },
    onElementDragStart: {
      type: Function,
      default: null
    },
    onElementDragEnd: {
      type: Function,
      default: null
    },
    class: {
      type: String,
      default: "drag-handle"
    },
    nested: {
      type: [Boolean, Object],
      default: false
    }
  },
  setup(props, { slots }) {
    const root = ref(null);
    const pluginHandle = shallowRef(null);
    const initPlugin = () => {
      const {
        editor,
        pluginKey,
        onNodeChange,
        onElementDragEnd,
        onElementDragStart,
        computePositionConfig,
        nested
      } = props;
      if (!root.value) {
        return;
      }
      if (!props.editor || props.editor.isDestroyed) {
        return;
      }
      root.value.style.visibility = "hidden";
      const nestedOptions = normalizeNestedOptions(nested);
      const init = DragHandlePlugin({
        editor,
        element: root.value,
        pluginKey,
        computePositionConfig: { ...defaultComputePositionConfig, ...computePositionConfig },
        onNodeChange,
        onElementDragStart,
        onElementDragEnd,
        nestedOptions
      });
      pluginHandle.value = init;
      props.editor.registerPlugin(init.plugin);
    };
    const destroyPlugin = () => {
      var _a, _b;
      if (!pluginHandle.value) {
        return;
      }
      if (props.editor && !props.editor.isDestroyed) {
        props.editor.unregisterPlugin(props.pluginKey);
      }
      (_b = (_a = pluginHandle.value).unbind) == null ? void 0 : _b.call(_a);
      pluginHandle.value = null;
    };
    onMounted(async () => {
      await nextTick();
      initPlugin();
    });
    watch(
      () => props.nested,
      () => {
        destroyPlugin();
        initPlugin();
      },
      { deep: true }
    );
    onBeforeUnmount(() => {
      destroyPlugin();
    });
    return () => {
      var _a;
      return h(
        "div",
        {
          ref: root,
          class: props.class,
          style: { position: "absolute" },
          "data-dragging": "false"
        },
        (_a = slots.default) == null ? void 0 : _a.call(slots)
      );
    };
  }
});

// src/index.ts
var index_default = DragHandle;
export {
  DragHandle,
  index_default as default
};
//# sourceMappingURL=index.js.map