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
  CharacterCount: () => CharacterCount,
  DEFAULT_DATA_ATTRIBUTE: () => DEFAULT_DATA_ATTRIBUTE,
  Dropcursor: () => Dropcursor,
  Focus: () => Focus,
  Gapcursor: () => Gapcursor,
  PLUGIN_KEY: () => PLUGIN_KEY,
  Placeholder: () => Placeholder,
  Selection: () => Selection,
  TrailingNode: () => TrailingNode,
  UndoRedo: () => UndoRedo,
  preparePlaceholderAttribute: () => preparePlaceholderAttribute,
  skipTrailingNodeMeta: () => skipTrailingNodeMeta
});
module.exports = __toCommonJS(index_exports);

// src/character-count/character-count.ts
var import_core = require("@tiptap/core");
var import_state = require("@tiptap/pm/state");
var CharacterCount = import_core.Extension.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      autoTrim: true,
      mode: "textSize",
      textCounter: (text) => text.length,
      wordCounter: (text) => text.split(" ").filter((word) => word !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (options) => {
      const node = (options == null ? void 0 : options.node) || this.editor.state.doc;
      const mode = (options == null ? void 0 : options.mode) || this.options.mode;
      if (mode === "textSize") {
        const text = node.textBetween(0, node.content.size, void 0, " ");
        return this.options.textCounter(text);
      }
      return node.nodeSize;
    };
    this.storage.words = (options) => {
      const node = (options == null ? void 0 : options.node) || this.editor.state.doc;
      const text = node.textBetween(0, node.content.size, " ", " ");
      return this.options.wordCounter(text);
    };
  },
  addProseMirrorPlugins() {
    let initialEvaluationDone = false;
    return [
      new import_state.Plugin({
        key: new import_state.PluginKey("characterCount"),
        appendTransaction: (transactions, oldState, newState) => {
          if (initialEvaluationDone) {
            return;
          }
          const limit = this.options.limit;
          const autoTrim = this.options.autoTrim;
          if (limit === null || limit === void 0 || limit === 0 || autoTrim === false) {
            initialEvaluationDone = true;
            return;
          }
          const initialContentSize = this.storage.characters({ node: newState.doc });
          if (initialContentSize > limit) {
            const over = initialContentSize - limit;
            const from = 0;
            const to = over;
            console.warn(
              `[CharacterCount] Initial content exceeded limit of ${limit} characters. Content was automatically trimmed.`
            );
            const tr = newState.tr.deleteRange(from, to);
            initialEvaluationDone = true;
            return tr;
          }
          initialEvaluationDone = true;
        },
        filterTransaction: (transaction, state) => {
          const limit = this.options.limit;
          if (!transaction.docChanged || limit === 0 || limit === null || limit === void 0) {
            return true;
          }
          const oldSize = this.storage.characters({ node: state.doc });
          const newSize = this.storage.characters({ node: transaction.doc });
          if (newSize <= limit) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize <= oldSize) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize > oldSize) {
            return false;
          }
          const isPaste = transaction.getMeta("paste");
          if (!isPaste) {
            return false;
          }
          const pos = transaction.selection.$head.pos;
          const over = newSize - limit;
          const from = pos - over;
          const to = pos;
          transaction.deleteRange(from, to);
          const updatedSize = this.storage.characters({ node: transaction.doc });
          if (updatedSize > limit) {
            return false;
          }
          return true;
        }
      })
    ];
  }
});

// src/drop-cursor/drop-cursor.ts
var import_core2 = require("@tiptap/core");
var import_dropcursor = require("@tiptap/pm/dropcursor");
var Dropcursor = import_core2.Extension.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [(0, import_dropcursor.dropCursor)(this.options)];
  }
});

// src/focus/focus.ts
var import_core3 = require("@tiptap/core");
var import_state2 = require("@tiptap/pm/state");
var import_view = require("@tiptap/pm/view");
var Focus = import_core3.Extension.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new import_state2.Plugin({
        key: new import_state2.PluginKey("focus"),
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor;
            const { anchor } = selection;
            const decorations = [];
            if (!isEditable || !isFocused) {
              return import_view.DecorationSet.create(doc, []);
            }
            let maxLevels = 0;
            if (this.options.mode === "deepest") {
              doc.descendants((node, pos) => {
                if (node.isText) {
                  return;
                }
                const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
                if (!isCurrent) {
                  return false;
                }
                maxLevels += 1;
              });
            }
            let currentLevel = 0;
            doc.descendants((node, pos) => {
              if (node.isText) {
                return false;
              }
              const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
              if (!isCurrent) {
                return false;
              }
              currentLevel += 1;
              const outOfScope = this.options.mode === "deepest" && maxLevels - currentLevel > 0 || this.options.mode === "shallowest" && currentLevel > 1;
              if (outOfScope) {
                return this.options.mode === "deepest";
              }
              decorations.push(
                import_view.Decoration.node(pos, pos + node.nodeSize, {
                  class: this.options.className
                })
              );
            });
            return import_view.DecorationSet.create(doc, decorations);
          }
        }
      })
    ];
  }
});

// src/gap-cursor/gap-cursor.ts
var import_core4 = require("@tiptap/core");
var import_gapcursor = require("@tiptap/pm/gapcursor");
var Gapcursor = import_core4.Extension.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [(0, import_gapcursor.gapCursor)()];
  },
  extendNodeSchema(extension) {
    var _a;
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      allowGapCursor: (_a = (0, import_core4.callOrReturn)((0, import_core4.getExtensionField)(extension, "allowGapCursor", context))) != null ? _a : null
    };
  }
});

// src/placeholder/constants.ts
var import_state3 = require("@tiptap/pm/state");
var DEFAULT_DATA_ATTRIBUTE = "placeholder";
var PLUGIN_KEY = new import_state3.PluginKey("tiptap__placeholder");
var VIEWPORT_OVERSCAN_PX = 200;

// src/placeholder/placeholder.ts
var import_core6 = require("@tiptap/core");

// src/placeholder/plugins/PlaceholderPlugin.ts
var import_state4 = require("@tiptap/pm/state");

// src/placeholder/utils/buildPlaceholderDecorations.ts
var import_core5 = require("@tiptap/core");
var import_view3 = require("@tiptap/pm/view");

// src/placeholder/utils/createPlaceholderDecoration.ts
var import_view2 = require("@tiptap/pm/view");
function createPlaceholderDecoration(options) {
  const {
    editor,
    placeholder,
    dataAttribute,
    pos,
    node,
    isEmptyDoc,
    hasAnchor,
    classes: { emptyNode, emptyEditor }
  } = options;
  const classes = [emptyNode];
  if (isEmptyDoc) {
    classes.push(emptyEditor);
  }
  return import_view2.Decoration.node(pos, pos + node.nodeSize, {
    class: classes.join(" "),
    [dataAttribute]: typeof placeholder === "function" ? placeholder({
      editor,
      node,
      pos,
      hasAnchor
    }) : placeholder
  });
}

// src/placeholder/utils/buildPlaceholderDecorations.ts
function resolveEmptyNodeClass(emptyNodeClass, props) {
  return typeof emptyNodeClass === "function" ? emptyNodeClass(props) : emptyNodeClass;
}
function buildPlaceholderDecorations({
  editor,
  options,
  dataAttribute,
  doc,
  selection
}) {
  var _a, _b;
  const active = editor.isEditable || !options.showOnlyWhenEditable;
  if (!active) {
    return null;
  }
  const { anchor } = selection;
  const decorations = [];
  const isEmptyDoc = editor.isEmpty;
  const useResolvedPath = options.showOnlyCurrent && !options.includeChildren;
  if (useResolvedPath) {
    const resolved = doc.resolve(anchor);
    const node = resolved.depth > 0 ? resolved.node(1) : resolved.nodeAfter;
    const nodeStart = resolved.depth > 0 ? resolved.before(1) : anchor;
    if (node && node.type.isTextblock && (0, import_core5.isNodeEmpty)(node)) {
      const hasAnchor = anchor >= nodeStart && anchor <= nodeStart + node.nodeSize;
      decorations.push(
        createPlaceholderDecoration({
          editor,
          isEmptyDoc,
          dataAttribute,
          hasAnchor,
          placeholder: options.placeholder,
          classes: {
            emptyEditor: options.emptyEditorClass,
            emptyNode: resolveEmptyNodeClass(options.emptyNodeClass, {
              editor,
              node,
              pos: nodeStart,
              hasAnchor
            })
          },
          node,
          pos: nodeStart
        })
      );
    }
  } else {
    const pluginState = PLUGIN_KEY.getState(editor.state);
    const from = (_a = pluginState == null ? void 0 : pluginState.topPos) != null ? _a : 0;
    const to = (_b = pluginState == null ? void 0 : pluginState.bottomPos) != null ? _b : doc.content.size;
    doc.nodesBetween(from, to, (node, pos) => {
      const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
      const isEmpty = !node.isLeaf && (0, import_core5.isNodeEmpty)(node);
      if (!node.type.isTextblock) {
        return options.includeChildren;
      }
      if ((hasAnchor || !options.showOnlyCurrent) && isEmpty) {
        decorations.push(
          createPlaceholderDecoration({
            editor,
            isEmptyDoc,
            dataAttribute,
            hasAnchor,
            placeholder: options.placeholder,
            classes: {
              emptyEditor: options.emptyEditorClass,
              emptyNode: resolveEmptyNodeClass(options.emptyNodeClass, {
                editor,
                node,
                pos,
                hasAnchor
              })
            },
            node,
            pos
          })
        );
      }
      return options.includeChildren;
    });
  }
  return import_view3.DecorationSet.create(doc, decorations);
}

// src/placeholder/utils/preparePlaceholderAttribute.ts
function preparePlaceholderAttribute(attr) {
  return attr.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}

// src/placeholder/utils/findScrollParent.ts
function isScrollable(el) {
  const style = getComputedStyle(el);
  const overflow = `${style.overflow} ${style.overflowY} ${style.overflowX}`;
  return /auto|scroll|overlay/.test(overflow);
}
function findScrollParent(element) {
  let el = element;
  while (el) {
    if (isScrollable(el)) {
      return el;
    }
    const parent = el.parentElement;
    if (!parent) {
      const root = el.getRootNode();
      if (root instanceof ShadowRoot) {
        el = root.host;
        continue;
      }
      return window;
    }
    el = parent;
  }
  return window;
}

// src/placeholder/utils/getViewportBoundaryPositions.ts
function getContainerRect(container) {
  if (container === window) {
    return { top: 0, bottom: window.innerHeight };
  }
  return container.getBoundingClientRect();
}
function getViewportBoundaryPositions({
  view,
  scrollContainer
}) {
  const editorRect = view.dom.getBoundingClientRect();
  if (editorRect.width <= 0 || editorRect.height <= 0) {
    return null;
  }
  const containerRect = scrollContainer ? getContainerRect(scrollContainer) : { top: 0, bottom: window.innerHeight };
  const visibleTop = Math.max(editorRect.top, containerRect.top) - VIEWPORT_OVERSCAN_PX;
  const visibleBottom = Math.min(editorRect.bottom, containerRect.bottom) + VIEWPORT_OVERSCAN_PX;
  if (visibleTop >= visibleBottom) {
    return null;
  }
  const minX = editorRect.left + 1;
  const maxX = editorRect.right - 1;
  if (minX > maxX) {
    return null;
  }
  const isRTL = getComputedStyle(view.dom).direction === "rtl";
  const targetX = isRTL ? editorRect.right - 2 : editorRect.left + 2;
  const x = Math.min(Math.max(targetX, minX), maxX);
  const probeTop = Math.max(visibleTop + 2, editorRect.top + 1);
  const probeBottom = Math.min(visibleBottom - 2, editorRect.bottom - 1);
  if (probeTop > probeBottom) {
    return null;
  }
  const topPos = view.posAtCoords({ left: x, top: probeTop });
  const bottomPos = view.posAtCoords({ left: x, top: probeBottom });
  if (!topPos || !bottomPos) {
    return null;
  }
  return { top: topPos.pos, bottom: bottomPos.pos };
}

// src/placeholder/utils/viewportTracking.ts
var viewportPluginState = {
  /**
   * Initialises the viewport state with no known positions.
   * @returns The initial viewport state.
   */
  init() {
    return { topPos: null, bottomPos: null };
  },
  /**
   * Updates the viewport state from incoming transactions.
   * @param tr - The transaction being applied.
   * @param prev - The previous viewport state.
   * @returns The next viewport state.
   */
  apply(tr, prev) {
    const meta = tr.getMeta(PLUGIN_KEY);
    if (meta == null ? void 0 : meta.positions) {
      return { topPos: meta.positions.top, bottomPos: meta.positions.bottom };
    }
    if (!tr.docChanged) {
      return prev;
    }
    return {
      topPos: prev.topPos !== null ? tr.mapping.map(prev.topPos) : null,
      bottomPos: prev.bottomPos !== null ? tr.mapping.map(prev.bottomPos) : null
    };
  }
};
function createViewportPluginView(view) {
  const scrollContainer = findScrollParent(view.dom);
  const computeAndDispatch = () => {
    const positions = getViewportBoundaryPositions({
      view,
      scrollContainer
    });
    if (positions === null) {
      return;
    }
    const prev = PLUGIN_KEY.getState(view.state);
    if ((prev == null ? void 0 : prev.topPos) === positions.top && (prev == null ? void 0 : prev.bottomPos) === positions.bottom) {
      return;
    }
    const tr = view.state.tr.setMeta(PLUGIN_KEY, { positions });
    view.dispatch(tr);
  };
  let frame = null;
  let lastCompute = 0;
  const MIN_SCROLL_INTERVAL = 150;
  const scheduleFrame = () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      const now = performance.now();
      if (now - lastCompute >= MIN_SCROLL_INTERVAL) {
        lastCompute = now;
        computeAndDispatch();
      } else {
        scheduleFrame();
      }
    });
  };
  scrollContainer.addEventListener("scroll", scheduleFrame, { passive: true });
  const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleFrame) : null;
  resizeObserver == null ? void 0 : resizeObserver.observe(view.dom);
  const intersectionObserver = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(scheduleFrame) : null;
  intersectionObserver == null ? void 0 : intersectionObserver.observe(view.dom);
  view.dom.addEventListener("focus", scheduleFrame);
  computeAndDispatch();
  return {
    update(_view, prevState) {
      if (view.state.doc.content.size !== prevState.doc.content.size) {
        scheduleFrame();
      }
    },
    destroy: () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
      scrollContainer.removeEventListener("scroll", scheduleFrame);
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      intersectionObserver == null ? void 0 : intersectionObserver.disconnect();
      view.dom.removeEventListener("focus", scheduleFrame);
    }
  };
}

// src/placeholder/plugins/PlaceholderPlugin.ts
function createPlaceholderPlugin({ editor, options }) {
  const dataAttribute = options.dataAttribute ? `data-${preparePlaceholderAttribute(options.dataAttribute)}` : `data-${DEFAULT_DATA_ATTRIBUTE}`;
  return new import_state4.Plugin({
    key: PLUGIN_KEY,
    state: viewportPluginState,
    view: createViewportPluginView,
    props: {
      decorations: ({ doc, selection }) => buildPlaceholderDecorations({ editor, options, dataAttribute, doc, selection })
    }
  });
}

// src/placeholder/placeholder.ts
var Placeholder = import_core6.Extension.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      dataAttribute: DEFAULT_DATA_ATTRIBUTE,
      placeholder: "Write something \u2026",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false
    };
  },
  addProseMirrorPlugins() {
    return [createPlaceholderPlugin({ editor: this.editor, options: this.options })];
  }
});

// src/selection/selection.ts
var import_core7 = require("@tiptap/core");
var import_state5 = require("@tiptap/pm/state");
var import_view4 = require("@tiptap/pm/view");
var selectionStyle = `.ProseMirror:not(.ProseMirror-focused) *::selection {
  background: transparent;
}

.ProseMirror:not(.ProseMirror-focused) *::-moz-selection {
  background: transparent;
}`;
var Selection = import_core7.Extension.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor, options } = this;
    if (editor.options.injectCSS && typeof document !== "undefined") {
      (0, import_core7.createStyleTag)(selectionStyle, editor.options.injectNonce, "selection");
    }
    return [
      new import_state5.Plugin({
        key: new import_state5.PluginKey("selection"),
        props: {
          decorations(state) {
            if (state.selection.empty || editor.isFocused || !editor.isEditable || (0, import_core7.isNodeSelection)(state.selection) || editor.view.dragging) {
              return null;
            }
            return import_view4.DecorationSet.create(state.doc, [
              import_view4.Decoration.inline(state.selection.from, state.selection.to, {
                class: options.className
              })
            ]);
          }
        }
      })
    ];
  }
});

// src/trailing-node/trailing-node.ts
var import_core8 = require("@tiptap/core");
var import_state6 = require("@tiptap/pm/state");
var skipTrailingNodeMeta = "skipTrailingNode";
function nodeEqualsType({
  types,
  node
}) {
  return node && Array.isArray(types) && types.includes(node.type) || (node == null ? void 0 : node.type) === types;
}
var TrailingNode = import_core8.Extension.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var _a;
    const plugin = new import_state6.PluginKey(this.name);
    const defaultNode = this.options.node || ((_a = this.editor.schema.topNodeType.contentMatch.defaultType) == null ? void 0 : _a.name) || "paragraph";
    const disabledNodes = Object.entries(this.editor.schema.nodes).map(([, value]) => value).filter((node) => (this.options.notAfter || []).concat(defaultNode).includes(node.name));
    return [
      new import_state6.Plugin({
        key: plugin,
        appendTransaction: (transactions, __, state) => {
          const { doc, tr, schema } = state;
          const shouldInsertNodeAtEnd = plugin.getState(state);
          const endPosition = doc.content.size;
          const type = schema.nodes[defaultNode];
          if (transactions.some((transaction) => transaction.getMeta(skipTrailingNodeMeta))) {
            return;
          }
          if (!shouldInsertNodeAtEnd) {
            return;
          }
          return tr.insert(endPosition, type.create());
        },
        state: {
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
          apply: (tr, value) => {
            if (!tr.docChanged) {
              return value;
            }
            if (tr.getMeta("__uniqueIDTransaction")) {
              return value;
            }
            const lastNode = tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          }
        }
      })
    ];
  }
});

// src/undo-redo/undo-redo.ts
var import_core9 = require("@tiptap/core");
var import_history = require("@tiptap/pm/history");
var UndoRedo = import_core9.Extension.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state, dispatch }) => {
        return (0, import_history.undo)(state, dispatch);
      },
      redo: () => ({ state, dispatch }) => {
        return (0, import_history.redo)(state, dispatch);
      }
    };
  },
  addProseMirrorPlugins() {
    return [(0, import_history.history)(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-\u044F": () => this.editor.commands.undo(),
      "Shift-Mod-\u044F": () => this.editor.commands.redo()
    };
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CharacterCount,
  DEFAULT_DATA_ATTRIBUTE,
  Dropcursor,
  Focus,
  Gapcursor,
  PLUGIN_KEY,
  Placeholder,
  Selection,
  TrailingNode,
  UndoRedo,
  preparePlaceholderAttribute,
  skipTrailingNodeMeta
});
//# sourceMappingURL=index.cjs.map