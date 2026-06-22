// src/selection/selection.ts
import { createStyleTag, Extension, isNodeSelection } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
var selectionStyle = `.ProseMirror:not(.ProseMirror-focused) *::selection {
  background: transparent;
}

.ProseMirror:not(.ProseMirror-focused) *::-moz-selection {
  background: transparent;
}`;
var Selection = Extension.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor, options } = this;
    if (editor.options.injectCSS && typeof document !== "undefined") {
      createStyleTag(selectionStyle, editor.options.injectNonce, "selection");
    }
    return [
      new Plugin({
        key: new PluginKey("selection"),
        props: {
          decorations(state) {
            if (state.selection.empty || editor.isFocused || !editor.isEditable || isNodeSelection(state.selection) || editor.view.dragging) {
              return null;
            }
            return DecorationSet.create(state.doc, [
              Decoration.inline(state.selection.from, state.selection.to, {
                class: options.className
              })
            ]);
          }
        }
      })
    ];
  }
});
export {
  Selection
};
//# sourceMappingURL=index.js.map