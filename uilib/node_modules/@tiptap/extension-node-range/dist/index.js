// src/node-range.ts
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

// src/helpers/getNodeRangeDecorations.ts
import { Decoration, DecorationSet } from "@tiptap/pm/view";
function getNodeRangeDecorations(ranges) {
  if (!ranges.length) {
    return DecorationSet.empty;
  }
  const decorations = [];
  const doc = ranges[0].$from.node(0);
  ranges.forEach((range) => {
    const pos = range.$from.pos;
    const node = range.$from.nodeAfter;
    if (!node) {
      return;
    }
    decorations.push(
      Decoration.node(pos, pos + node.nodeSize, {
        class: "ProseMirror-selectednoderange"
      })
    );
  });
  return DecorationSet.create(doc, decorations);
}

// src/helpers/getSelectionRanges.ts
import { NodeRange } from "@tiptap/pm/model";
import { SelectionRange } from "@tiptap/pm/state";
function getNodeContentBounds(nodeStart, nodeSize, node) {
  const contentOffset = node.isText || node.isAtom ? 0 : 1;
  return {
    start: nodeStart + contentOffset,
    end: nodeStart + nodeSize - contentOffset
  };
}
function getSelectionRanges($from, $to, depth, options = {}) {
  const ranges = [];
  const doc = $from.node(0);
  const { extendOnBoundaryOverlap = true } = options;
  if (typeof depth === "number" && depth >= 0) {
  } else if ($from.sameParent($to)) {
    depth = Math.max(0, $from.sharedDepth($to.pos) - 1);
  } else {
    depth = $from.sharedDepth($to.pos);
  }
  const nodeRange = new NodeRange($from, $to, depth);
  const offset = nodeRange.depth === 0 ? 0 : doc.resolve(nodeRange.start).posAtIndex(0);
  nodeRange.parent.forEach((node, pos) => {
    const from = offset + pos;
    const to = from + node.nodeSize;
    const contentBounds = getNodeContentBounds(from, node.nodeSize, node);
    const overlapsNodeContent = extendOnBoundaryOverlap ? $to.pos >= contentBounds.start && $from.pos <= contentBounds.end : $to.pos > contentBounds.start && $from.pos < contentBounds.end;
    if (from < nodeRange.start || from >= nodeRange.end) {
      return;
    }
    if (!overlapsNodeContent) {
      return;
    }
    const selectionRange = new SelectionRange(doc.resolve(from), doc.resolve(to));
    ranges.push(selectionRange);
  });
  return ranges;
}

// src/helpers/NodeRangeSelection.ts
import { Selection } from "@tiptap/pm/state";

// src/helpers/NodeRangeBookmark.ts
var NodeRangeBookmark = class _NodeRangeBookmark {
  constructor(anchor, head, depth) {
    this.anchor = anchor;
    this.head = head;
    this.depth = depth != null ? depth : 0;
  }
  map(mapping) {
    return new _NodeRangeBookmark(mapping.map(this.anchor), mapping.map(this.head), this.depth);
  }
  resolve(doc) {
    const $anchor = doc.resolve(this.anchor);
    const $head = doc.resolve(this.head);
    return new NodeRangeSelection($anchor, $head, this.depth);
  }
};

// src/helpers/NodeRangeSelection.ts
var NodeRangeSelection = class _NodeRangeSelection extends Selection {
  constructor($anchor, $head, depth, bias = 1) {
    const { doc } = $anchor;
    const isCursor = $anchor === $head;
    const isCursorAtEnd = $anchor.pos === doc.content.size && $head.pos === doc.content.size;
    const $correctedHead = isCursor && !isCursorAtEnd ? doc.resolve($head.pos + (bias > 0 ? 1 : -1)) : $head;
    const $correctedAnchor = isCursor && isCursorAtEnd ? doc.resolve($anchor.pos - (bias > 0 ? 1 : -1)) : $anchor;
    const ranges = getSelectionRanges(
      $correctedAnchor.min($correctedHead),
      $correctedAnchor.max($correctedHead),
      depth
    );
    const $rangeFrom = $correctedHead.pos >= $anchor.pos ? ranges[0].$from : ranges[ranges.length - 1].$to;
    const $rangeTo = $correctedHead.pos >= $anchor.pos ? ranges[ranges.length - 1].$to : ranges[0].$from;
    super($rangeFrom, $rangeTo, ranges);
    this.depth = depth;
  }
  // we can safely ignore this TypeScript error: https://github.com/Microsoft/TypeScript/issues/338
  // @ts-ignore
  get $to() {
    return this.ranges[this.ranges.length - 1].$to;
  }
  eq(other) {
    return other instanceof _NodeRangeSelection && other.$from.pos === this.$from.pos && other.$to.pos === this.$to.pos;
  }
  map(doc, mapping) {
    const $anchor = doc.resolve(mapping.map(this.anchor));
    const $head = doc.resolve(mapping.map(this.head));
    return new _NodeRangeSelection($anchor, $head, this.depth);
  }
  toJSON() {
    return {
      type: "nodeRange",
      anchor: this.anchor,
      head: this.head,
      depth: this.depth
    };
  }
  get isForwards() {
    return this.head >= this.anchor;
  }
  get isBackwards() {
    return !this.isForwards;
  }
  extendBackwards() {
    const { doc } = this.$from;
    if (this.isForwards && this.ranges.length > 1) {
      const ranges = this.ranges.slice(0, -1);
      const $from2 = ranges[0].$from;
      const $to = ranges[ranges.length - 1].$to;
      return new _NodeRangeSelection($from2, $to, this.depth);
    }
    const firstRange = this.ranges[0];
    const $from = doc.resolve(Math.max(0, firstRange.$from.pos - 1));
    return new _NodeRangeSelection(this.$anchor, $from, this.depth);
  }
  extendForwards() {
    const { doc } = this.$from;
    if (this.isBackwards && this.ranges.length > 1) {
      const ranges = this.ranges.slice(1);
      const $from = ranges[0].$from;
      const $to2 = ranges[ranges.length - 1].$to;
      return new _NodeRangeSelection($to2, $from, this.depth);
    }
    const lastRange = this.ranges[this.ranges.length - 1];
    const $to = doc.resolve(Math.min(doc.content.size, lastRange.$to.pos + 1));
    return new _NodeRangeSelection(this.$anchor, $to, this.depth);
  }
  static fromJSON(doc, json) {
    return new _NodeRangeSelection(doc.resolve(json.anchor), doc.resolve(json.head), json.depth);
  }
  static create(doc, anchor, head, depth, bias = 1) {
    return new this(doc.resolve(anchor), doc.resolve(head), depth, bias);
  }
  getBookmark() {
    return new NodeRangeBookmark(this.anchor, this.head, this.depth);
  }
};
NodeRangeSelection.prototype.visible = false;
try {
  Selection.jsonID("nodeRange", NodeRangeSelection);
} catch {
}

// src/helpers/isNodeRangeSelection.ts
function isNodeRangeSelection(value) {
  return value instanceof NodeRangeSelection;
}

// src/node-range.ts
var NodeRange2 = Extension.create({
  name: "nodeRange",
  addOptions() {
    return {
      depth: void 0,
      key: "Mod"
    };
  },
  addKeyboardShortcuts() {
    return {
      // extend NodeRangeSelection upwards
      "Shift-ArrowUp": ({ editor }) => {
        const { depth } = this.options;
        const { view, state } = editor;
        const { doc, selection, tr } = state;
        const { anchor, head } = selection;
        if (!isNodeRangeSelection(selection)) {
          const nodeRangeSelection2 = NodeRangeSelection.create(doc, anchor, head, depth, -1);
          tr.setSelection(nodeRangeSelection2);
          view.dispatch(tr);
          return true;
        }
        const nodeRangeSelection = selection.extendBackwards();
        tr.setSelection(nodeRangeSelection);
        view.dispatch(tr);
        return true;
      },
      // extend NodeRangeSelection downwards
      "Shift-ArrowDown": ({ editor }) => {
        const { depth } = this.options;
        const { view, state } = editor;
        const { doc, selection, tr } = state;
        const { anchor, head } = selection;
        if (!isNodeRangeSelection(selection)) {
          const nodeRangeSelection2 = NodeRangeSelection.create(doc, anchor, head, depth);
          tr.setSelection(nodeRangeSelection2);
          view.dispatch(tr);
          return true;
        }
        const nodeRangeSelection = selection.extendForwards();
        tr.setSelection(nodeRangeSelection);
        view.dispatch(tr);
        return true;
      },
      // add `NodeRangeSelection` to all nodes
      "Mod-a": ({ editor }) => {
        const { depth } = this.options;
        const { view, state } = editor;
        const { doc, tr } = state;
        const nodeRangeSelection = NodeRangeSelection.create(doc, 0, doc.content.size, depth);
        tr.setSelection(nodeRangeSelection);
        view.dispatch(tr);
        return true;
      }
    };
  },
  onSelectionUpdate() {
    const { selection } = this.editor.state;
    if (isNodeRangeSelection(selection)) {
      this.editor.view.dom.classList.add("ProseMirror-noderangeselection");
    }
  },
  addProseMirrorPlugins() {
    let hideTextSelection = false;
    let activeMouseSelection = false;
    return [
      new Plugin({
        key: new PluginKey("nodeRange"),
        props: {
          attributes: () => {
            if (hideTextSelection) {
              return {
                class: "ProseMirror-noderangeselection"
              };
            }
            return { class: "" };
          },
          handleDOMEvents: {
            mousedown: (view, event) => {
              const { key } = this.options;
              const isMac = /Mac/.test(navigator.platform);
              const isShift = !!event.shiftKey;
              const isControl = !!event.ctrlKey;
              const isAlt = !!event.altKey;
              const isMeta = !!event.metaKey;
              const isMod = isMac ? isMeta : isControl;
              if (key === null || key === void 0 || key === "Shift" && isShift || key === "Control" && isControl || key === "Alt" && isAlt || key === "Meta" && isMeta || key === "Mod" && isMod) {
                activeMouseSelection = true;
              }
              if (!activeMouseSelection) {
                return false;
              }
              document.addEventListener(
                "mouseup",
                () => {
                  activeMouseSelection = false;
                  const { state } = view;
                  const { doc, selection, tr } = state;
                  const { $anchor, $head } = selection;
                  if ($anchor.sameParent($head)) {
                    return;
                  }
                  const nodeRangeSelection = NodeRangeSelection.create(
                    doc,
                    $anchor.pos,
                    $head.pos,
                    this.options.depth
                  );
                  tr.setSelection(nodeRangeSelection);
                  view.dispatch(tr);
                },
                { once: true }
              );
              return false;
            }
          },
          // when selecting some text we want to render some decorations
          // to preview a `NodeRangeSelection`
          decorations: (state) => {
            const { selection } = state;
            const isNodeRange = isNodeRangeSelection(selection);
            hideTextSelection = false;
            if (!activeMouseSelection) {
              if (!isNodeRange) {
                return null;
              }
              hideTextSelection = true;
              return getNodeRangeDecorations(selection.ranges);
            }
            const { $from, $to } = selection;
            if (!isNodeRange && $from.sameParent($to)) {
              return null;
            }
            const nodeRanges = getSelectionRanges($from, $to, this.options.depth);
            if (!nodeRanges.length) {
              return null;
            }
            hideTextSelection = true;
            return getNodeRangeDecorations(nodeRanges);
          }
        }
      })
    ];
  }
});

// src/index.ts
var index_default = NodeRange2;
export {
  NodeRange2 as NodeRange,
  NodeRangeSelection,
  index_default as default,
  getNodeRangeDecorations,
  getSelectionRanges,
  isNodeRangeSelection
};
//# sourceMappingURL=index.js.map