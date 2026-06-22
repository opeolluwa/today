// src/mention.ts
import { createInlineMarkdownSpec, mergeAttributes, Node } from "@tiptap/core";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Suggestion } from "@tiptap/suggestion";

// src/utils/get-default-suggestion-attributes.ts
import { PluginKey } from "@tiptap/pm/state";
function getSuggestionOptions({
  editor: tiptapEditor,
  overrideSuggestionOptions,
  extensionName,
  char = "@"
}) {
  const pluginKey = new PluginKey();
  return {
    editor: tiptapEditor,
    char,
    pluginKey,
    command: ({ editor, range, props }) => {
      var _a, _b, _c;
      const nodeAfter = editor.view.state.selection.$to.nodeAfter;
      const overrideSpace = (_a = nodeAfter == null ? void 0 : nodeAfter.text) == null ? void 0 : _a.startsWith(" ");
      if (overrideSpace) {
        range.to += 1;
      }
      editor.chain().focus().insertContentAt(range, [
        {
          type: extensionName,
          attrs: { ...props, mentionSuggestionChar: char }
        },
        {
          type: "text",
          text: " "
        }
      ]).run();
      (_c = (_b = editor.view.dom.ownerDocument.defaultView) == null ? void 0 : _b.getSelection()) == null ? void 0 : _c.collapseToEnd();
    },
    allow: ({ state, range }) => {
      const $from = state.doc.resolve(range.from);
      const type = state.schema.nodes[extensionName];
      const allow = !!$from.parent.type.contentMatch.matchType(type);
      return allow;
    },
    ...overrideSuggestionOptions
  };
}

// src/mention.ts
function getSuggestions(options) {
  return (options.options.suggestions.length ? options.options.suggestions : [options.options.suggestion]).map(
    (suggestion) => getSuggestionOptions({
      // @ts-ignore `editor` can be `undefined` when converting the document to HTML with the HTML utility
      editor: options.editor,
      overrideSuggestionOptions: suggestion,
      extensionName: options.name,
      char: suggestion.char
    })
  );
}
function getSuggestionFromChar(options, char) {
  const suggestions = getSuggestions(options);
  const suggestion = suggestions.find((s) => s.char === char);
  if (suggestion) {
    return suggestion;
  }
  if (suggestions.length) {
    return suggestions[0];
  }
  return null;
}
var Mention = Node.create({
  name: "mention",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      renderText({ node, suggestion }) {
        var _a, _b;
        return `${(_a = suggestion == null ? void 0 : suggestion.char) != null ? _a : "@"}${(_b = node.attrs.label) != null ? _b : node.attrs.id}`;
      },
      deleteTriggerWithBackspace: false,
      renderHTML({ options, node, suggestion }) {
        var _a, _b;
        return [
          "span",
          mergeAttributes(this.HTMLAttributes, options.HTMLAttributes),
          `${(_a = suggestion == null ? void 0 : suggestion.char) != null ? _a : "@"}${(_b = node.attrs.label) != null ? _b : node.attrs.id}`
        ];
      },
      suggestions: [],
      suggestion: {}
    };
  },
  group: "inline",
  inline: true,
  selectable: false,
  atom: true,
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return {
            "data-id": attributes.id
          };
        }
      },
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }
          return {
            "data-label": attributes.label
          };
        }
      },
      // When there are multiple types of mentions, this attribute helps distinguish them
      mentionSuggestionChar: {
        default: "@",
        parseHTML: (element) => element.getAttribute("data-mention-suggestion-char"),
        renderHTML: (attributes) => {
          return {
            "data-mention-suggestion-char": attributes.mentionSuggestionChar
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`
      }
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const suggestion = getSuggestionFromChar(this, node.attrs.mentionSuggestionChar);
    if (this.options.renderLabel !== void 0) {
      console.warn("renderLabel is deprecated use renderText and renderHTML instead");
      return [
        "span",
        mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes),
        this.options.renderLabel({
          options: this.options,
          node,
          suggestion
        })
      ];
    }
    const mergedOptions = { ...this.options };
    mergedOptions.HTMLAttributes = mergeAttributes(
      { "data-type": this.name },
      this.options.HTMLAttributes,
      HTMLAttributes
    );
    const html = this.options.renderHTML({
      options: mergedOptions,
      node,
      suggestion
    });
    if (typeof html === "string") {
      return [
        "span",
        mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes),
        html
      ];
    }
    return html;
  },
  ...createInlineMarkdownSpec({
    nodeName: "mention",
    name: "@",
    selfClosing: true,
    allowedAttributes: ["id", "label", { name: "mentionSuggestionChar", skipIfDefault: "@" }],
    parseAttributes: (attrString) => {
      const attrs = {};
      const regex = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
      let match = regex.exec(attrString);
      while (match !== null) {
        const [, key, doubleQuoted, singleQuoted] = match;
        const value = doubleQuoted != null ? doubleQuoted : singleQuoted;
        attrs[key === "char" ? "mentionSuggestionChar" : key] = value;
        match = regex.exec(attrString);
      }
      return attrs;
    },
    serializeAttributes: (attrs) => {
      return Object.entries(attrs).filter(([, value]) => value !== void 0 && value !== null).map(([key, value]) => {
        const serializedKey = key === "mentionSuggestionChar" ? "char" : key;
        return `${serializedKey}="${value}"`;
      }).join(" ");
    }
  }),
  renderText({ node }) {
    const args = {
      options: this.options,
      node,
      suggestion: getSuggestionFromChar(this, node.attrs.mentionSuggestionChar)
    };
    if (this.options.renderLabel !== void 0) {
      console.warn("renderLabel is deprecated use renderText and renderHTML instead");
      return this.options.renderLabel(args);
    }
    return this.options.renderText(args);
  },
  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isMention = false;
        const { selection } = state;
        const { empty, anchor } = selection;
        if (!empty) {
          return false;
        }
        let mentionNode = new ProseMirrorNode();
        let mentionPos = 0;
        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isMention = true;
            mentionNode = node;
            mentionPos = pos;
            return false;
          }
        });
        if (isMention) {
          tr.insertText(
            this.options.deleteTriggerWithBackspace ? "" : mentionNode.attrs.mentionSuggestionChar,
            mentionPos,
            mentionPos + mentionNode.nodeSize
          );
        }
        return isMention;
      })
    };
  },
  addProseMirrorPlugins() {
    return getSuggestions(this).map(Suggestion);
  }
});

// src/index.ts
var index_default = Mention;
export {
  Mention,
  index_default as default
};
//# sourceMappingURL=index.js.map