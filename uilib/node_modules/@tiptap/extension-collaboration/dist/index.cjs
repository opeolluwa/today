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
  Collaboration: () => Collaboration,
  CollaborationMappablePosition: () => CollaborationMappablePosition,
  createMappablePosition: () => createMappablePosition,
  default: () => index_default,
  getUpdatedPosition: () => getUpdatedPosition,
  isChangeOrigin: () => isChangeOrigin
});
module.exports = __toCommonJS(index_exports);

// src/collaboration.ts
var import_core2 = require("@tiptap/core");
var import_state = require("@tiptap/pm/state");
var import_y_tiptap3 = require("@tiptap/y-tiptap");

// src/helpers/CollaborationMappablePosition.ts
var import_core = require("@tiptap/core");

// src/helpers/isChangeOrigin.ts
var import_y_tiptap = require("@tiptap/y-tiptap");
function isChangeOrigin(transaction) {
  return !!transaction.getMeta(import_y_tiptap.ySyncPluginKey);
}

// src/helpers/yRelativePosition.ts
var import_y_tiptap2 = require("@tiptap/y-tiptap");
function getYAbsolutePosition(state, relativePos) {
  const ystate = import_y_tiptap2.ySyncPluginKey.getState(state);
  return (0, import_y_tiptap2.relativePositionToAbsolutePosition)(
    ystate.doc,
    ystate.type,
    relativePos,
    ystate.binding.mapping
  ) || 0;
}
function getYRelativePosition(state, absolutePos) {
  const ystate = import_y_tiptap2.ySyncPluginKey.getState(state);
  return (0, import_y_tiptap2.absolutePositionToRelativePosition)(absolutePos, ystate.type, ystate.binding.mapping);
}

// src/helpers/CollaborationMappablePosition.ts
var CollaborationMappablePosition = class _CollaborationMappablePosition extends import_core.MappablePosition {
  constructor(position, yRelativePosition) {
    super(position);
    this.yRelativePosition = yRelativePosition;
  }
  /**
   * Creates a CollaborationMappablePosition from a JSON object.
   */
  static fromJSON(json) {
    return new _CollaborationMappablePosition(json.position, json.yRelativePosition);
  }
  /**
   * Converts the CollaborationMappablePosition to a JSON object.
   */
  toJSON() {
    return {
      position: this.position,
      yRelativePosition: this.yRelativePosition
    };
  }
};
function createMappablePosition(position, state) {
  const yRelativePosition = getYRelativePosition(state, position);
  return new CollaborationMappablePosition(position, yRelativePosition);
}
function getUpdatedPosition(position, transaction, state) {
  const yRelativePosition = position instanceof CollaborationMappablePosition ? position.yRelativePosition : null;
  if (isChangeOrigin(transaction) && yRelativePosition) {
    const absolutePosition2 = getYAbsolutePosition(state, yRelativePosition);
    return {
      position: new CollaborationMappablePosition(absolutePosition2, yRelativePosition),
      mapResult: null
    };
  }
  const result = (0, import_core.getUpdatedPosition)(position, transaction);
  const absolutePosition = result.position.position;
  return {
    position: new CollaborationMappablePosition(
      absolutePosition,
      yRelativePosition != null ? yRelativePosition : getYRelativePosition(state, absolutePosition)
    ),
    mapResult: result.mapResult
  };
}

// src/collaboration.ts
var Collaboration = import_core2.Extension.create({
  name: "collaboration",
  priority: 1e3,
  addOptions() {
    return {
      document: null,
      field: "default",
      fragment: null,
      provider: null
    };
  },
  addStorage() {
    return {
      isDisabled: false
    };
  },
  onCreate() {
    if (this.editor.extensionManager.extensions.find((extension) => extension.name === "undoRedo")) {
      console.warn(
        '[tiptap warn]: "@tiptap/extension-collaboration" comes with its own history support and is not compatible with "@tiptap/extension-undo-redo".'
      );
    }
  },
  onBeforeCreate() {
    this.editor.utils.getUpdatedPosition = (position, transaction) => getUpdatedPosition(position, transaction, this.editor.state);
    this.editor.utils.createMappablePosition = (position) => createMappablePosition(position, this.editor.state);
  },
  addCommands() {
    return {
      undo: () => ({ tr, state, dispatch }) => {
        tr.setMeta("preventDispatch", true);
        const undoManager = import_y_tiptap3.yUndoPluginKey.getState(state).undoManager;
        if (undoManager.undoStack.length === 0) {
          return false;
        }
        if (!dispatch) {
          return true;
        }
        return (0, import_y_tiptap3.undo)(state);
      },
      redo: () => ({ tr, state, dispatch }) => {
        tr.setMeta("preventDispatch", true);
        const undoManager = import_y_tiptap3.yUndoPluginKey.getState(state).undoManager;
        if (undoManager.redoStack.length === 0) {
          return false;
        }
        if (!dispatch) {
          return true;
        }
        return (0, import_y_tiptap3.redo)(state);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Shift-Mod-z": () => this.editor.commands.redo()
    };
  },
  addProseMirrorPlugins() {
    const fragment = this.options.fragment ? this.options.fragment : this.options.document.getXmlFragment(this.options.field);
    const yUndoPluginInstance = (0, import_y_tiptap3.yUndoPlugin)(this.options.yUndoOptions);
    const originalUndoPluginView = yUndoPluginInstance.spec.view;
    yUndoPluginInstance.spec.view = (view) => {
      const { undoManager } = import_y_tiptap3.yUndoPluginKey.getState(view.state);
      if (undoManager.restore) {
        undoManager.restore();
        undoManager.restore = () => {
        };
      }
      const viewRet = originalUndoPluginView ? originalUndoPluginView(view) : void 0;
      return {
        destroy: () => {
          const hasUndoManSelf = undoManager.trackedOrigins.has(undoManager);
          const observers = undoManager._observers;
          undoManager.restore = () => {
            if (hasUndoManSelf) {
              undoManager.trackedOrigins.add(undoManager);
            }
            undoManager.doc.on("afterTransaction", undoManager.afterTransactionHandler);
            undoManager._observers = observers;
          };
          if (viewRet == null ? void 0 : viewRet.destroy) {
            viewRet.destroy();
          }
        }
      };
    };
    const ySyncPluginOptions = {
      ...this.options.ySyncOptions,
      onFirstRender: this.options.onFirstRender
    };
    const ySyncPluginInstance = (0, import_y_tiptap3.ySyncPlugin)(fragment, ySyncPluginOptions);
    return [
      ySyncPluginInstance,
      yUndoPluginInstance,
      // Only add the filterInvalidContent plugin if content checking is enabled
      this.editor.options.enableContentCheck && new import_state.Plugin({
        key: new import_state.PluginKey("filterInvalidContent"),
        filterTransaction: (transaction) => {
          if (!isChangeOrigin(transaction)) {
            return true;
          }
          if (this.storage.isDisabled) {
            return false;
          }
          if (!transaction.docChanged) {
            return true;
          }
          try {
            transaction.doc.check();
            return true;
          } catch (error) {
            this.storage.isDisabled = true;
            this.editor.emit("contentError", {
              error,
              editor: this.editor,
              disableCollaboration: () => {
                var _a;
                (_a = fragment.doc) == null ? void 0 : _a.destroy();
              }
            });
            return true;
          }
        }
      })
    ].filter(Boolean);
  }
});

// src/index.ts
var index_default = Collaboration;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Collaboration,
  CollaborationMappablePosition,
  createMappablePosition,
  getUpdatedPosition,
  isChangeOrigin
});
//# sourceMappingURL=index.cjs.map