// src/placeholder/constants.ts
import { PluginKey } from "@tiptap/pm/state";
var DEFAULT_DATA_ATTRIBUTE = "placeholder";
var PLUGIN_KEY = new PluginKey("tiptap__placeholder");
var VIEWPORT_OVERSCAN_PX = 200;

// src/placeholder/placeholder.ts
import { Extension } from "@tiptap/core";

// src/placeholder/plugins/PlaceholderPlugin.ts
import { Plugin } from "@tiptap/pm/state";

// src/placeholder/utils/buildPlaceholderDecorations.ts
import { isNodeEmpty } from "@tiptap/core";
import { DecorationSet } from "@tiptap/pm/view";

// src/placeholder/utils/createPlaceholderDecoration.ts
import { Decoration } from "@tiptap/pm/view";
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
  return Decoration.node(pos, pos + node.nodeSize, {
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
    if (node && node.type.isTextblock && isNodeEmpty(node)) {
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
      const isEmpty = !node.isLeaf && isNodeEmpty(node);
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
  return DecorationSet.create(doc, decorations);
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
  return new Plugin({
    key: PLUGIN_KEY,
    state: viewportPluginState,
    view: createViewportPluginView,
    props: {
      decorations: ({ doc, selection }) => buildPlaceholderDecorations({ editor, options, dataAttribute, doc, selection })
    }
  });
}

// src/placeholder/placeholder.ts
var Placeholder = Extension.create({
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
export {
  DEFAULT_DATA_ATTRIBUTE,
  PLUGIN_KEY,
  Placeholder,
  preparePlaceholderAttribute
};
//# sourceMappingURL=index.js.map