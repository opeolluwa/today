// src/collaboration.ts
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { redo, undo, ySyncPlugin, yUndoPlugin, yUndoPluginKey } from "@tiptap/y-tiptap";

// src/helpers/CollaborationMappablePosition.ts
import {
  getUpdatedPosition as coreGetUpdatedPosition,
  MappablePosition
} from "@tiptap/core";

// src/helpers/isChangeOrigin.ts
import { ySyncPluginKey } from "@tiptap/y-tiptap";
function isChangeOrigin(transaction) {
  return !!transaction.getMeta(ySyncPluginKey);
}

// src/helpers/yRelativePosition.ts
import {
  absolutePositionToRelativePosition,
  relativePositionToAbsolutePosition,
  ySyncPluginKey as ySyncPluginKey2
} from "@tiptap/y-tiptap";
function getYAbsolutePosition(state, relativePos) {
  const ystate = ySyncPluginKey2.getState(state);
  return relativePositionToAbsolutePosition(
    ystate.doc,
    ystate.type,
    relativePos,
    ystate.binding.mapping
  ) || 0;
}
function getYRelativePosition(state, absolutePos) {
  const ystate = ySyncPluginKey2.getState(state);
  return absolutePositionToRelativePosition(absolutePos, ystate.type, ystate.binding.mapping);
}

// src/helpers/CollaborationMappablePosition.ts
var CollaborationMappablePosition = class _CollaborationMappablePosition extends MappablePosition {
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
  const result = coreGetUpdatedPosition(position, transaction);
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
var Collaboration = Extension.create({
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
        const undoManager = yUndoPluginKey.getState(state).undoManager;
        if (undoManager.undoStack.length === 0) {
          return false;
        }
        if (!dispatch) {
          return true;
        }
        return undo(state);
      },
      redo: () => ({ tr, state, dispatch }) => {
        tr.setMeta("preventDispatch", true);
        const undoManager = yUndoPluginKey.getState(state).undoManager;
        if (undoManager.redoStack.length === 0) {
          return false;
        }
        if (!dispatch) {
          return true;
        }
        return redo(state);
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
    const yUndoPluginInstance = yUndoPlugin(this.options.yUndoOptions);
    const originalUndoPluginView = yUndoPluginInstance.spec.view;
    yUndoPluginInstance.spec.view = (view) => {
      const { undoManager } = yUndoPluginKey.getState(view.state);
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
    const ySyncPluginInstance = ySyncPlugin(fragment, ySyncPluginOptions);
    return [
      ySyncPluginInstance,
      yUndoPluginInstance,
      // Only add the filterInvalidContent plugin if content checking is enabled
      this.editor.options.enableContentCheck && new Plugin({
        key: new PluginKey("filterInvalidContent"),
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
export {
  Collaboration,
  CollaborationMappablePosition,
  createMappablePosition,
  index_default as default,
  getUpdatedPosition,
  isChangeOrigin
};
//# sourceMappingURL=index.js.map