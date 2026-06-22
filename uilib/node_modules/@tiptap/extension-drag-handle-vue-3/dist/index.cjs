"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DragHandle: () => DragHandle,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/DragHandle.ts
var import_extension_drag_handle = require("@tiptap/extension-drag-handle");
var import_vue = require("vue");
var DragHandle = (0, import_vue.defineComponent)({
  name: "DragHandleVue",
  props: {
    pluginKey: {
      type: [String, Object],
      default: import_extension_drag_handle.dragHandlePluginDefaultKey
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
    const root = (0, import_vue.ref)(null);
    const pluginHandle = (0, import_vue.shallowRef)(null);
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
      const nestedOptions = (0, import_extension_drag_handle.normalizeNestedOptions)(nested);
      const init = (0, import_extension_drag_handle.DragHandlePlugin)({
        editor,
        element: root.value,
        pluginKey,
        computePositionConfig: { ...import_extension_drag_handle.defaultComputePositionConfig, ...computePositionConfig },
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
    (0, import_vue.onMounted)(async () => {
      await (0, import_vue.nextTick)();
      initPlugin();
    });
    (0, import_vue.watch)(
      () => props.nested,
      () => {
        destroyPlugin();
        initPlugin();
      },
      { deep: true }
    );
    (0, import_vue.onBeforeUnmount)(() => {
      destroyPlugin();
    });
    return () => {
      var _a;
      return (0, import_vue.h)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DragHandle
});
//# sourceMappingURL=index.cjs.map