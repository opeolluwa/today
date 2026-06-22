// src/drag-handle.ts
import { Extension } from "@tiptap/core";

// src/drag-handle-plugin.ts
import { computePosition } from "@floating-ui/dom";
import { isFirefox } from "@tiptap/core";
import { isChangeOrigin } from "@tiptap/extension-collaboration";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import {
  absolutePositionToRelativePosition,
  relativePositionToAbsolutePosition,
  ySyncPluginKey
} from "@tiptap/y-tiptap";

// src/helpers/dragHandler.ts
import { getSelectionRanges, NodeRangeSelection } from "@tiptap/extension-node-range";
import { NodeSelection } from "@tiptap/pm/state";

// src/helpers/cloneElement.ts
function getCSSText(element, properties) {
  const style = getComputedStyle(element);
  if (properties) {
    return properties.map((property) => property.trim()).filter((property) => property.length > 0).map((property) => `${property}:${style.getPropertyValue(property)};`).join("");
  }
  let value = "";
  for (let i = 0; i < style.length; i += 1) {
    value += `${style[i]}:${style.getPropertyValue(style[i])};`;
  }
  return value;
}
function cloneElement(node, properties) {
  const clonedNode = node.cloneNode(true);
  const sourceElements = [node, ...Array.from(node.getElementsByTagName("*"))];
  const targetElements = [
    clonedNode,
    ...Array.from(clonedNode.getElementsByTagName("*"))
  ];
  sourceElements.forEach((sourceElement, index) => {
    targetElements[index].style.cssText = getCSSText(sourceElement, properties);
  });
  return clonedNode;
}

// src/helpers/defaultRules.ts
var listItemFirstChild = {
  id: "listItemFirstChild",
  evaluate: ({ parent, isFirst }) => {
    if (!isFirst) {
      return 0;
    }
    const listItemTypes = ["listItem", "taskItem"];
    if (parent && listItemTypes.includes(parent.type.name)) {
      return 1e3;
    }
    return 0;
  }
};
var listWrapperDeprioritize = {
  id: "listWrapperDeprioritize",
  evaluate: ({ node }) => {
    const listItemTypes = ["listItem", "taskItem"];
    const firstChild = node.firstChild;
    if (firstChild && listItemTypes.includes(firstChild.type.name)) {
      return 1e3;
    }
    return 0;
  }
};
var tableStructure = {
  id: "tableStructure",
  evaluate: ({ node, parent }) => {
    const tableStructureTypes = ["tableRow", "tableCell", "tableHeader"];
    if (tableStructureTypes.includes(node.type.name)) {
      return 1e3;
    }
    if (parent && parent.type.name === "tableHeader") {
      return 1e3;
    }
    return 0;
  }
};
var inlineContent = {
  id: "inlineContent",
  evaluate: ({ node }) => {
    if (node.isInline || node.isText) {
      return 1e3;
    }
    return 0;
  }
};
var defaultRules = [
  listItemFirstChild,
  listWrapperDeprioritize,
  tableStructure,
  inlineContent
];

// src/helpers/edgeDetection.ts
var DEFAULT_EDGE_CONFIG = {
  edges: ["left", "top"],
  threshold: 12,
  strength: 500
};
function normalizeEdgeDetection(input) {
  if (input === void 0 || input === "left") {
    return { ...DEFAULT_EDGE_CONFIG };
  }
  if (input === "right") {
    return { edges: ["right", "top"], threshold: 12, strength: 500 };
  }
  if (input === "both") {
    return { edges: ["left", "right", "top"], threshold: 12, strength: 500 };
  }
  if (input === "none") {
    return { edges: [], threshold: 0, strength: 0 };
  }
  return { ...DEFAULT_EDGE_CONFIG, ...input };
}
function isNearEdge(coords, element, config) {
  if (config.edges.length === 0) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  const { threshold, edges } = config;
  return edges.some((edge) => {
    if (edge === "left") {
      return coords.x - rect.left < threshold;
    }
    if (edge === "right") {
      return rect.right - coords.x < threshold;
    }
    if (edge === "top") {
      return coords.y - rect.top < threshold;
    }
    if (edge === "bottom") {
      return rect.bottom - coords.y < threshold;
    }
    return false;
  });
}
function calculateEdgeDeduction(coords, element, config, depth) {
  if (!element || config.edges.length === 0) {
    return 0;
  }
  if (isNearEdge(coords, element, config)) {
    return config.strength * depth;
  }
  return 0;
}

// src/helpers/scoring.ts
var BASE_SCORE = 1e3;
function calculateScore(context, rules, edgeConfig, coords) {
  let score = BASE_SCORE;
  let excluded = false;
  rules.every((rule) => {
    const deduction = rule.evaluate(context);
    score -= deduction;
    if (score <= 0) {
      excluded = true;
      return false;
    }
    return true;
  });
  if (excluded) {
    return -1;
  }
  const dom = context.view.nodeDOM(context.pos);
  score -= calculateEdgeDeduction(coords, dom, edgeConfig, context.depth);
  if (score <= 0) {
    return -1;
  }
  return score;
}

// src/helpers/findBestDragTarget.ts
function hasAncestorOfType($pos, depth, allowedTypes) {
  const ancestorDepths = Array.from({ length: depth }, (_, i) => depth - 1 - i);
  return ancestorDepths.some((d) => allowedTypes.includes($pos.node(d).type.name));
}
function findBestDragTarget(view, coords, options) {
  if (!Number.isFinite(coords.x) || !Number.isFinite(coords.y)) {
    return null;
  }
  const posInfo = view.posAtCoords({ left: coords.x, top: coords.y });
  if (!posInfo) {
    return null;
  }
  const { doc } = view.state;
  const $pos = doc.resolve(posInfo.pos);
  const rules = [];
  if (options.defaultRules) {
    rules.push(...defaultRules);
  }
  rules.push(...options.rules);
  const depthLevels = Array.from({ length: $pos.depth }, (_, i) => $pos.depth - i);
  const candidates = depthLevels.map((depth) => {
    const node = $pos.node(depth);
    const nodePos = $pos.before(depth);
    if (options.allowedContainers && depth > 0) {
      const inAllowedContainer = hasAncestorOfType($pos, depth, options.allowedContainers);
      if (!inAllowedContainer) {
        return null;
      }
    }
    const parent = depth > 0 ? $pos.node(depth - 1) : null;
    const index = depth > 0 ? $pos.index(depth - 1) : 0;
    const siblingCount = parent ? parent.childCount : 1;
    const context = {
      node,
      pos: nodePos,
      depth,
      parent,
      index,
      isFirst: index === 0,
      isLast: index === siblingCount - 1,
      $pos,
      view
    };
    const score = calculateScore(context, rules, options.edgeDetection, coords);
    if (score < 0) {
      return null;
    }
    const dom = view.nodeDOM(nodePos);
    return { node, pos: nodePos, depth, score, dom };
  }).filter((candidate) => candidate !== null);
  const nodeAfter = $pos.nodeAfter;
  if (nodeAfter && nodeAfter.isAtom && !nodeAfter.isInline) {
    const nodePos = posInfo.pos;
    const depth = $pos.depth + 1;
    const parent = $pos.parent;
    const index = $pos.index();
    const siblingCount = parent.childCount;
    let inAllowedContainer = true;
    if (options.allowedContainers) {
      inAllowedContainer = hasAncestorOfType($pos, depth, options.allowedContainers);
    }
    if (inAllowedContainer) {
      const context = {
        node: nodeAfter,
        pos: nodePos,
        depth,
        parent,
        index,
        isFirst: index === 0,
        isLast: index === siblingCount - 1,
        $pos,
        view
      };
      const score = calculateScore(context, rules, options.edgeDetection, coords);
      if (score >= 0) {
        const dom = view.nodeDOM(nodePos);
        if (dom) {
          candidates.push({ node: nodeAfter, pos: nodePos, depth, score, dom });
        }
      }
    }
  }
  if (candidates.length === 0) {
    return null;
  }
  candidates.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.depth - a.depth;
  });
  const winner = candidates[0];
  if (!winner.dom) {
    return null;
  }
  return {
    node: winner.node,
    pos: winner.pos,
    dom: winner.dom
  };
}

// src/helpers/findNextElementFromCursor.ts
function findClosestTopLevelBlock(element, view) {
  let current = element;
  while ((current == null ? void 0 : current.parentElement) && current.parentElement !== view.dom) {
    current = current.parentElement;
  }
  return (current == null ? void 0 : current.parentElement) === view.dom ? current : void 0;
}
function isValidRect(rect) {
  return Number.isFinite(rect.top) && Number.isFinite(rect.bottom) && Number.isFinite(rect.left) && Number.isFinite(rect.right) && rect.width > 0 && rect.height > 0;
}
function clampToContent(view, x, y, inset = 5) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }
  const container = view.dom;
  const firstBlock = container.firstElementChild;
  const lastBlock = container.lastElementChild;
  if (!firstBlock || !lastBlock) {
    return null;
  }
  const topRect = firstBlock.getBoundingClientRect();
  const botRect = lastBlock.getBoundingClientRect();
  if (!isValidRect(topRect) || !isValidRect(botRect)) {
    return null;
  }
  const clampedY = Math.min(Math.max(topRect.top + inset, y), botRect.bottom - inset);
  const epsilon = 0.5;
  const sameLeft = Math.abs(topRect.left - botRect.left) < epsilon;
  const sameRight = Math.abs(topRect.right - botRect.right) < epsilon;
  let rowRect = topRect;
  if (sameLeft && sameRight) {
    rowRect = topRect;
  } else {
  }
  const clampedX = Math.min(Math.max(rowRect.left + inset, x), rowRect.right - inset);
  if (!Number.isFinite(clampedX) || !Number.isFinite(clampedY)) {
    return null;
  }
  return { x: clampedX, y: clampedY };
}
var findElementNextToCoords = (options) => {
  const { x, y, editor, nestedOptions } = options;
  const { view, state } = editor;
  const clamped = clampToContent(view, x, y, 5);
  if (!clamped) {
    return { resultElement: null, resultNode: null, pos: null };
  }
  const { x: clampedX, y: clampedY } = clamped;
  if (nestedOptions == null ? void 0 : nestedOptions.enabled) {
    const target = findBestDragTarget(view, { x: clampedX, y: clampedY }, nestedOptions);
    if (!target) {
      return { resultElement: null, resultNode: null, pos: null };
    }
    return {
      resultElement: target.dom,
      resultNode: target.node,
      pos: target.pos
    };
  }
  const elements = view.root.elementsFromPoint(clampedX, clampedY);
  let block;
  Array.prototype.some.call(elements, (el) => {
    if (!view.dom.contains(el)) {
      return false;
    }
    const candidate = findClosestTopLevelBlock(el, view);
    if (candidate) {
      block = candidate;
      return true;
    }
    return false;
  });
  if (!block) {
    const coords = view.posAtCoords({ left: clampedX, top: clampedY });
    if (coords) {
      const $pos = state.doc.resolve(coords.pos);
      const depth = Math.min($pos.depth, 1);
      const blockPos = depth > 0 ? $pos.before(depth) : $pos.pos;
      const blockNode = state.doc.nodeAt(blockPos);
      if (blockNode) {
        const dom = view.nodeDOM(blockPos);
        return {
          resultElement: dom instanceof HTMLElement ? dom : null,
          resultNode: blockNode,
          pos: blockPos
        };
      }
    }
    return { resultElement: null, resultNode: null, pos: null };
  }
  let pos;
  try {
    pos = view.posAtDOM(block, 0);
  } catch {
    return { resultElement: null, resultNode: null, pos: null };
  }
  const node = state.doc.nodeAt(pos);
  if (!node) {
    const resolvedPos = state.doc.resolve(pos);
    const parent = resolvedPos.parent;
    return {
      resultElement: block,
      resultNode: parent,
      pos: resolvedPos.start()
    };
  }
  return {
    resultElement: block,
    resultNode: node,
    pos
  };
};

// src/helpers/getDraggedBlockDir.ts
function getDraggedBlockElement(view, pos) {
  const nodeDom = view.nodeDOM(pos);
  if (nodeDom instanceof Element && nodeDom !== view.dom) {
    return nodeDom;
  }
  const { node, offset } = view.domAtPos(pos);
  const child = node.childNodes[offset];
  if (child instanceof Element) {
    return child;
  }
  if (node instanceof Element) {
    return node;
  }
  if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
    return node.parentElement;
  }
  return null;
}
function getDraggedBlockDir(view, pos) {
  const draggedDom = getDraggedBlockElement(view, pos);
  const contentDir = draggedDom ? getComputedStyle(draggedDom).direction : getComputedStyle(view.dom).direction;
  return contentDir || "ltr";
}

// src/helpers/removeNode.ts
function removeNode(node) {
  var _a;
  (_a = node.parentNode) == null ? void 0 : _a.removeChild(node);
}

// src/helpers/dragHandler.ts
function getDragImageOffset(direction, wrapperWidth) {
  return direction === "rtl" ? wrapperWidth : 0;
}
function shouldResetMargin(dragImageProperties) {
  if (!dragImageProperties) {
    return true;
  }
  return !dragImageProperties.some((property) => {
    const p = property.trim().toLowerCase();
    return p === "margin" || p.startsWith("margin-");
  });
}
function getDragHandleRanges(event, editor, nestedOptions, dragContext) {
  const { doc } = editor.view.state;
  if ((nestedOptions == null ? void 0 : nestedOptions.enabled) && (dragContext == null ? void 0 : dragContext.node) && dragContext.pos >= 0) {
    const nodeStart = dragContext.pos;
    const nodeEnd = dragContext.pos + dragContext.node.nodeSize;
    return [
      {
        $from: doc.resolve(nodeStart),
        $to: doc.resolve(nodeEnd)
      }
    ];
  }
  const result = findElementNextToCoords({
    editor,
    x: event.clientX,
    y: event.clientY,
    direction: "right",
    nestedOptions
  });
  if (!result.resultNode || result.pos === null) {
    return [];
  }
  const offset = result.resultNode.isText || result.resultNode.isAtom ? 0 : -1;
  const $from = doc.resolve(result.pos);
  const $to = doc.resolve(result.pos + result.resultNode.nodeSize + offset);
  return getSelectionRanges($from, $to, 0, { extendOnBoundaryOverlap: false });
}
function dragHandler(event, editor, nestedOptions, dragContext, dragImageProperties) {
  const { view } = editor;
  if (!event.dataTransfer) {
    return;
  }
  const { empty, $from, $to } = view.state.selection;
  const dragHandleRanges = getDragHandleRanges(event, editor, nestedOptions, dragContext);
  const selectionRanges = getSelectionRanges($from, $to, 0, { extendOnBoundaryOverlap: false });
  const isDragHandleWithinSelection = selectionRanges.some((range) => {
    return dragHandleRanges.find((dragHandleRange) => {
      return dragHandleRange.$from === range.$from && dragHandleRange.$to === range.$to;
    });
  });
  const ranges = empty || !isDragHandleWithinSelection ? dragHandleRanges : selectionRanges;
  if (!ranges.length) {
    return;
  }
  const { tr } = view.state;
  const wrapper = document.createElement("div");
  const from = ranges[0].$from.pos;
  const to = ranges[ranges.length - 1].$to.pos;
  const direction = getDraggedBlockDir(view, from);
  wrapper.setAttribute("dir", direction);
  const isNestedDrag = (nestedOptions == null ? void 0 : nestedOptions.enabled) && (dragContext == null ? void 0 : dragContext.node);
  const isSingleBlock = ranges.length === 1;
  let slice;
  let selection;
  if (isNestedDrag && isSingleBlock) {
    slice = view.state.doc.slice(from, to);
    selection = NodeSelection.create(view.state.doc, from);
  } else {
    selection = NodeRangeSelection.create(view.state.doc, from, to);
    slice = selection.content();
  }
  const resetMargin = shouldResetMargin(dragImageProperties);
  ranges.forEach((range) => {
    const element = getDraggedBlockElement(view, range.$from.pos);
    if (!element) {
      return;
    }
    const clonedElement = cloneElement(element, dragImageProperties);
    if (resetMargin) {
      clonedElement.style.margin = "0";
    }
    wrapper.append(clonedElement);
  });
  wrapper.style.position = "absolute";
  wrapper.style.top = "-10000px";
  document.body.append(wrapper);
  event.dataTransfer.clearData();
  const wrapperRect = wrapper.getBoundingClientRect();
  const dragImageX = getDragImageOffset(direction, wrapperRect.width);
  event.dataTransfer.setDragImage(wrapper, dragImageX, 0);
  let cleanedUp = false;
  const cleanupDragPreview = () => {
    if (cleanedUp) {
      return;
    }
    cleanedUp = true;
    removeNode(wrapper);
    document.removeEventListener("drop", cleanupDragPreview);
    document.removeEventListener("dragend", cleanupDragPreview);
  };
  const nodeSelection = selection instanceof NodeSelection ? selection : void 0;
  view.dragging = { slice, move: true, node: nodeSelection };
  tr.setSelection(selection);
  view.dispatch(tr);
  document.addEventListener("drop", cleanupDragPreview);
  document.addEventListener("dragend", cleanupDragPreview);
}

// src/helpers/nodeRangeDrop.ts
import { isNodeRangeSelection, NodeRangeSelection as NodeRangeSelection2 } from "@tiptap/extension-node-range";
function sumNodeSizes(parent, from, to) {
  let size = 0;
  for (let i = from; i < to; i += 1) {
    size += parent.child(i).nodeSize;
  }
  return size;
}
function getActiveDragRange(selection) {
  var _a;
  if (!isNodeRangeSelection(selection)) {
    return null;
  }
  return {
    anchorPos: selection.from,
    nodeCount: selection.ranges.length,
    depth: (_a = selection.depth) != null ? _a : 0
  };
}
function getDroppedBlockRange(doc, anchorPos, nodeCount, depth) {
  const $pos = doc.resolve(anchorPos);
  const parent = $pos.node(depth);
  let index = $pos.index(depth);
  if (index >= parent.childCount) {
    index = Math.max(0, parent.childCount - nodeCount);
  }
  const count = Math.min(nodeCount, parent.childCount - index);
  if (count <= 0) {
    return null;
  }
  const blockStart = $pos.start(depth) + sumNodeSizes(parent, 0, index);
  const blockEnd = blockStart + sumNodeSizes(parent, index, index + count);
  return { anchor: blockStart, head: blockEnd, count };
}
function createDroppedNodeRangeSelection(doc, anchorPos, nodeCount, depth) {
  try {
    const range = getDroppedBlockRange(doc, anchorPos, nodeCount, depth);
    if (!range) {
      return null;
    }
    const selection = NodeRangeSelection2.create(doc, range.anchor, range.head, depth);
    return selection.ranges.length === nodeCount ? selection : null;
  } catch {
    return null;
  }
}

// src/helpers/getOuterNode.ts
var getOuterNodePos = (doc, pos) => {
  const resolvedPos = doc.resolve(pos);
  const { depth } = resolvedPos;
  if (depth === 0) {
    return pos;
  }
  const a = resolvedPos.pos - resolvedPos.parentOffset;
  return a - 1;
};
var getOuterNode = (doc, pos) => {
  const node = doc.nodeAt(pos);
  const resolvedPos = doc.resolve(pos);
  let { depth } = resolvedPos;
  let parent = node;
  while (depth > 0) {
    const currentNode = resolvedPos.node(depth);
    depth -= 1;
    if (depth === 0) {
      parent = currentNode;
    }
  }
  return parent;
};

// src/drag-handle-plugin.ts
var getRelativePos = (state, absolutePos) => {
  const ystate = ySyncPluginKey.getState(state);
  if (!ystate) {
    return null;
  }
  return absolutePositionToRelativePosition(absolutePos, ystate.type, ystate.binding.mapping);
};
var getAbsolutePos = (state, relativePos) => {
  const ystate = ySyncPluginKey.getState(state);
  if (!ystate) {
    return -1;
  }
  return relativePositionToAbsolutePosition(
    ystate.doc,
    ystate.type,
    relativePos,
    ystate.binding.mapping
  ) || 0;
};
var getOuterDomNode = (view, domNode) => {
  let tmpDomNode = domNode;
  while (tmpDomNode == null ? void 0 : tmpDomNode.parentNode) {
    if (tmpDomNode.parentNode === view.dom) {
      break;
    }
    tmpDomNode = tmpDomNode.parentNode;
  }
  return tmpDomNode;
};
var dragHandlePluginDefaultKey = new PluginKey("dragHandle");
var DragHandlePlugin = ({
  pluginKey = dragHandlePluginDefaultKey,
  element,
  editor,
  computePositionConfig,
  getReferencedVirtualElement,
  onNodeChange,
  onElementDragStart,
  onElementDragEnd,
  nestedOptions,
  dragImageProperties
}) => {
  const wrapper = document.createElement("div");
  let locked = false;
  let currentNode = null;
  let currentNodePos = -1;
  let currentNodeRelPos;
  let rafId = null;
  let restoreRafId = null;
  let pendingMouseCoords = null;
  let activeDragRange = null;
  let pendingRestore = null;
  function hideHandle() {
    if (!element) {
      return;
    }
    element.style.visibility = "hidden";
    element.style.pointerEvents = "none";
  }
  function showHandle() {
    if (!element) {
      return;
    }
    if (!editor.isEditable) {
      hideHandle();
      return;
    }
    element.style.visibility = "";
    element.style.pointerEvents = "auto";
  }
  function repositionDragHandle(dom) {
    const virtualElement = (getReferencedVirtualElement == null ? void 0 : getReferencedVirtualElement()) || {
      getBoundingClientRect: () => dom.getBoundingClientRect()
    };
    computePosition(virtualElement, element, computePositionConfig).then((val) => {
      Object.assign(element.style, {
        position: val.strategy,
        left: `${val.x}px`,
        top: `${val.y}px`
      });
    });
  }
  function onDragStart(e) {
    onElementDragStart == null ? void 0 : onElementDragStart(e);
    dragHandler(
      e,
      editor,
      nestedOptions,
      { node: currentNode, pos: currentNodePos },
      dragImageProperties
    );
    activeDragRange = getActiveDragRange(editor.state.selection);
    if (element) {
      element.dataset.dragging = "true";
    }
    setTimeout(() => {
      if (element) {
        element.style.pointerEvents = "none";
      }
    }, 0);
  }
  function onDragEnd(e) {
    onElementDragEnd == null ? void 0 : onElementDragEnd(e);
    activeDragRange = null;
    hideHandle();
    if (element) {
      element.style.pointerEvents = "auto";
      element.dataset.dragging = "false";
    }
  }
  function restoreNodeRangeSelection({ nodeCount, depth, anchorPos }) {
    const nodeRangeSelection = createDroppedNodeRangeSelection(
      editor.state.doc,
      anchorPos,
      nodeCount,
      depth
    );
    if (nodeRangeSelection) {
      editor.view.dispatch(editor.state.tr.setSelection(nodeRangeSelection));
    }
  }
  function onDrop(e) {
    if (!e.target || !editor.view.dom.contains(e.target)) {
      return;
    }
    if (isFirefox()) {
      const editorElement = editor.view.dom;
      requestAnimationFrame(() => {
        if (editorElement.isContentEditable) {
          editorElement.contentEditable = "false";
          editorElement.contentEditable = "true";
        }
      });
    }
    if (!activeDragRange || editor.view.state.selection.empty) {
      return;
    }
    pendingRestore = {
      ...activeDragRange,
      anchorPos: editor.state.selection.from
    };
    restoreRafId = requestAnimationFrame(() => {
      restoreRafId = null;
      if (pendingRestore) {
        restoreNodeRangeSelection(pendingRestore);
        pendingRestore = null;
      }
    });
  }
  function cleanup() {
    element.removeEventListener("dragstart", onDragStart);
    element.removeEventListener("dragend", onDragEnd);
    document.removeEventListener("drop", onDrop);
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
      pendingMouseCoords = null;
    }
    if (restoreRafId) {
      cancelAnimationFrame(restoreRafId);
      restoreRafId = null;
    }
  }
  wrapper.appendChild(element);
  return {
    unbind() {
      cleanup();
    },
    plugin: new Plugin({
      key: typeof pluginKey === "string" ? new PluginKey(pluginKey) : pluginKey,
      state: {
        init() {
          return { locked: false };
        },
        apply(tr, value, _oldState, state) {
          if (pendingRestore && tr.docChanged) {
            const mappedResult = tr.mapping.mapResult(pendingRestore.anchorPos, 1);
            if (mappedResult.deleted) {
              pendingRestore = null;
            } else {
              pendingRestore.anchorPos = mappedResult.pos;
            }
          }
          const isLocked = tr.getMeta("lockDragHandle");
          const hideDragHandle = tr.getMeta("hideDragHandle");
          if (isLocked !== void 0) {
            locked = isLocked;
          }
          if (hideDragHandle) {
            hideHandle();
            locked = false;
            currentNode = null;
            currentNodePos = -1;
            onNodeChange == null ? void 0 : onNodeChange({ editor, node: null, pos: -1 });
            return value;
          }
          if (tr.docChanged && currentNodePos !== -1 && element) {
            if (isChangeOrigin(tr)) {
              const newPos = getAbsolutePos(state, currentNodeRelPos);
              if (newPos !== currentNodePos) {
                currentNodePos = newPos;
              }
            } else {
              const newPos = tr.mapping.map(currentNodePos);
              if (newPos !== currentNodePos) {
                currentNodePos = newPos;
                currentNodeRelPos = getRelativePos(state, currentNodePos);
              }
            }
          }
          return value;
        }
      },
      view: (view) => {
        var _a;
        element.draggable = true;
        element.style.pointerEvents = "auto";
        element.dataset.dragging = "false";
        (_a = editor.view.dom.parentElement) == null ? void 0 : _a.appendChild(wrapper);
        wrapper.style.pointerEvents = "none";
        wrapper.style.position = "absolute";
        wrapper.style.top = "0";
        wrapper.style.left = "0";
        element.addEventListener("dragstart", onDragStart);
        element.addEventListener("dragend", onDragEnd);
        document.addEventListener("drop", onDrop);
        return {
          update(_, oldState) {
            if (!element) {
              return;
            }
            if (!editor.isEditable) {
              hideHandle();
              return;
            }
            if (locked) {
              element.draggable = false;
            } else {
              element.draggable = true;
            }
            if (view.state.doc.eq(oldState.doc) || currentNodePos === -1) {
              return;
            }
            let domNode = view.nodeDOM(currentNodePos);
            domNode = getOuterDomNode(view, domNode);
            if (domNode === view.dom) {
              return;
            }
            if ((domNode == null ? void 0 : domNode.nodeType) !== 1) {
              return;
            }
            const domNodePos = view.posAtDOM(domNode, 0);
            const outerNode = getOuterNode(editor.state.doc, domNodePos);
            const outerNodePos = getOuterNodePos(editor.state.doc, domNodePos);
            currentNode = outerNode;
            currentNodePos = outerNodePos;
            currentNodeRelPos = getRelativePos(view.state, currentNodePos);
            onNodeChange == null ? void 0 : onNodeChange({ editor, node: currentNode, pos: currentNodePos });
            repositionDragHandle(domNode);
          },
          // TODO: Kills even on hot reload
          destroy() {
            cleanup();
            if (element) {
              removeNode(wrapper);
            }
          }
        };
      },
      props: {
        handleDOMEvents: {
          keydown(view) {
            if (!element || locked) {
              return false;
            }
            if (view.hasFocus()) {
              hideHandle();
              currentNode = null;
              currentNodePos = -1;
              onNodeChange == null ? void 0 : onNodeChange({ editor, node: null, pos: -1 });
              return false;
            }
            return false;
          },
          mouseleave(_view, e) {
            if (locked) {
              return false;
            }
            if (e.target && !wrapper.contains(e.relatedTarget)) {
              hideHandle();
              currentNode = null;
              currentNodePos = -1;
              onNodeChange == null ? void 0 : onNodeChange({ editor, node: null, pos: -1 });
            }
            return false;
          },
          mousemove(view, e) {
            if (!element || locked) {
              return false;
            }
            pendingMouseCoords = { x: e.clientX, y: e.clientY };
            if (rafId) {
              return false;
            }
            rafId = requestAnimationFrame(() => {
              rafId = null;
              if (!pendingMouseCoords) {
                return;
              }
              const { x, y } = pendingMouseCoords;
              pendingMouseCoords = null;
              const nodeData = findElementNextToCoords({
                x,
                y,
                direction: "right",
                editor,
                nestedOptions
              });
              if (!nodeData.resultElement) {
                return;
              }
              let domNode = nodeData.resultElement;
              let targetNode = nodeData.resultNode;
              let targetPos = nodeData.pos;
              if (!(nestedOptions == null ? void 0 : nestedOptions.enabled)) {
                domNode = getOuterDomNode(view, domNode);
                if (domNode === view.dom) {
                  return;
                }
                if ((domNode == null ? void 0 : domNode.nodeType) !== 1) {
                  return;
                }
                const domNodePos = view.posAtDOM(domNode, 0);
                targetNode = getOuterNode(editor.state.doc, domNodePos);
                targetPos = getOuterNodePos(editor.state.doc, domNodePos);
              }
              if (targetNode !== currentNode) {
                currentNode = targetNode;
                currentNodePos = targetPos != null ? targetPos : -1;
                currentNodeRelPos = getRelativePos(view.state, currentNodePos);
                onNodeChange == null ? void 0 : onNodeChange({ editor, node: currentNode, pos: currentNodePos });
                repositionDragHandle(domNode);
                showHandle();
              }
            });
            return false;
          }
        }
      }
    })
  };
};

// src/helpers/normalizeOptions.ts
function normalizeNestedOptions(input) {
  var _a, _b;
  if (input === false || input === void 0) {
    return {
      enabled: false,
      rules: [],
      defaultRules: true,
      allowedContainers: void 0,
      edgeDetection: normalizeEdgeDetection("none")
    };
  }
  if (input === true) {
    return {
      enabled: true,
      rules: [],
      defaultRules: true,
      allowedContainers: void 0,
      edgeDetection: normalizeEdgeDetection("left")
    };
  }
  return {
    enabled: true,
    rules: (_a = input.rules) != null ? _a : [],
    defaultRules: (_b = input.defaultRules) != null ? _b : true,
    allowedContainers: input.allowedContainers,
    edgeDetection: normalizeEdgeDetection(input.edgeDetection)
  };
}

// src/drag-handle.ts
var defaultComputePositionConfig = {
  placement: "left-start",
  strategy: "absolute"
};
var DragHandle = Extension.create({
  name: "dragHandle",
  addOptions() {
    return {
      render() {
        const element = document.createElement("div");
        element.classList.add("drag-handle");
        return element;
      },
      computePositionConfig: {},
      locked: false,
      onNodeChange: () => {
        return null;
      },
      onElementDragStart: void 0,
      onElementDragEnd: void 0,
      nested: false,
      dragImageProperties: void 0
    };
  },
  addCommands() {
    return {
      lockDragHandle: () => ({ editor }) => {
        this.options.locked = true;
        return editor.commands.setMeta("lockDragHandle", this.options.locked);
      },
      unlockDragHandle: () => ({ editor }) => {
        this.options.locked = false;
        return editor.commands.setMeta("lockDragHandle", this.options.locked);
      },
      toggleDragHandle: () => ({ editor }) => {
        this.options.locked = !this.options.locked;
        return editor.commands.setMeta("lockDragHandle", this.options.locked);
      }
    };
  },
  addProseMirrorPlugins() {
    const element = this.options.render();
    const nestedOptions = normalizeNestedOptions(this.options.nested);
    return [
      DragHandlePlugin({
        computePositionConfig: {
          ...defaultComputePositionConfig,
          ...this.options.computePositionConfig
        },
        getReferencedVirtualElement: this.options.getReferencedVirtualElement,
        element,
        editor: this.editor,
        onNodeChange: this.options.onNodeChange,
        onElementDragStart: this.options.onElementDragStart,
        onElementDragEnd: this.options.onElementDragEnd,
        nestedOptions,
        dragImageProperties: this.options.dragImageProperties
      }).plugin
    ];
  }
});

// src/index.ts
var index_default = DragHandle;
export {
  DragHandle,
  DragHandlePlugin,
  index_default as default,
  defaultComputePositionConfig,
  defaultRules,
  dragHandlePluginDefaultKey,
  normalizeNestedOptions
};
//# sourceMappingURL=index.js.map