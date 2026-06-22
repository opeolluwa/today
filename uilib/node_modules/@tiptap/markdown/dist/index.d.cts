import { AnyExtension, JSONContent, Extension, Content, MarkdownToken } from '@tiptap/core';
import { marked } from 'marked';
import { Fragment, Node } from '@tiptap/pm/model';

declare class MarkdownManager {
    private markedInstance;
    private activeParseLexer;
    private registry;
    private nodeTypeRegistry;
    /**
     * Order in which extensions were registered. Used to resolve mark nesting
     * deterministically when several marks open on the same text node.
     *
     * The flattened extensions passed to the manager are pre-sorted by Tiptap's
     * extension priority (descending), which is also the order ProseMirror uses
     * to assign mark ranks. Recording that index here lets the serializer place
     * higher-priority / lower-rank marks (e.g. link with priority 1000) on the
     * outside without inspecting any rendered markdown output.
     */
    private extensionRanks;
    private indentStyle;
    private indentSize;
    private baseExtensions;
    private extensions;
    /** Set of extension names whose `code` spec property is truthy (nodes and marks). */
    private codeTypes;
    /** Lazy cache of tag names declared by the registered schema's parseDOM rules. */
    private schemaParseDomTagsCache;
    /**
     * Create a MarkdownManager.
     * @param options.marked Optional marked instance to use (injected).
     * @param options.markedOptions Optional options to pass to marked.setOptions
     * @param options.indentation Indentation settings (style and size).
     * @param options.extensions An array of Tiptap extensions to register for markdown parsing and rendering.
     */
    constructor(options?: {
        marked?: typeof marked;
        markedOptions?: Parameters<typeof marked.setOptions>[0];
        indentation?: {
            style?: 'space' | 'tab';
            size?: number;
        };
        extensions: AnyExtension[];
    });
    /** Returns the underlying marked instance. */
    get instance(): typeof marked;
    /** Returns the correct indentCharacter (space or tab) */
    get indentCharacter(): string;
    /** Returns the correct indentString repeated X times */
    get indentString(): string;
    /** Helper to quickly check whether a marked instance is available. */
    hasMarked(): boolean;
    /**
     * Register a Tiptap extension (Node/Mark/Extension). This will read
     * `markdownName`, `parseMarkdown`, `renderMarkdown` and `priority` from the
     * extension config (using the same resolution used across the codebase).
     */
    registerExtension(extension: AnyExtension): void;
    private createLexer;
    private createTokenizerHelpers;
    private tokenizeInline;
    /**
     * Register a custom tokenizer with marked.js for parsing non-standard markdown syntax.
     */
    private registerTokenizer;
    /** Get registered handlers for a token type and try each until one succeeds. */
    private getHandlersForToken;
    /** Get the first handler for a token type (for backwards compatibility). */
    private getHandlerForToken;
    /** Get registered handlers for a node type (for rendering). */
    private getHandlersForNodeType;
    /**
     * Serialize a ProseMirror-like JSON document (or node array) to a Markdown string
     * using registered renderers and fallback renderers.
     */
    serialize(docOrContent: JSONContent): string;
    /**
     * Check if the markdown output represents an empty document.
     * Empty documents may contain only &nbsp; entities or non-breaking space characters
     * which are used by the Paragraph extension to preserve blank lines.
     */
    private isEmptyOutput;
    /**
     * Parse markdown string into Tiptap JSON document using registered extension handlers.
     */
    parse(markdown: string): JSONContent;
    /**
     * Convert an array of marked tokens into Tiptap JSON nodes using registered extension handlers.
     */
    private parseTokens;
    private createImplicitEmptyParagraphsFromSpace;
    private countParagraphSeparators;
    /**
     * Parse a single token into Tiptap JSON using the appropriate registered handler.
     */
    private parseToken;
    private lastParseResult;
    /**
     * Parse a list token, handling mixed bullet and task list items by splitting them into separate lists.
     * This ensures that consecutive task items and bullet items are grouped and parsed as separate list nodes.
     *
     * @param token The list token to parse
     * @returns Array of parsed list nodes, or null if parsing fails
     */
    private parseListToken;
    /**
     * Parse a token using registered handlers (extracted for reuse).
     */
    private parseTokenWithHandlers;
    /**
     * Creates helper functions for parsing markdown tokens.
     * @returns An object containing helper functions for parsing.
     */
    private createParseHelpers;
    /**
     * Escape special regex characters in a string.
     */
    private escapeRegex;
    /**
     * Parse inline tokens (bold, italic, links, etc.) into text nodes with marks.
     * This is the complex part that handles mark nesting and boundaries.
     */
    private parseInlineTokens;
    /**
     * Apply a mark to content nodes.
     */
    private applyMarkToContent; /**
     * Check if a parse result represents a mark to be applied.
     */
    private isMarkResult;
    /**
     * Normalize parse results to ensure they're valid JSONContent.
     */
    private normalizeParseResult;
    /**
     * Fallback parsing for common tokens when no specific handler is registered.
     */
    private parseFallbackToken;
    /**
     * Parse an HTML token from marked into JSONContent using the registered
     * extensions' `parseHTML` rules. Falls back to literal text when the HTML
     * has nothing for the schema to keep.
     *
     * @param token Marked HTML token (block or inline).
     * @example
     *   parseHTMLToken({ type: 'html', raw: '<em>hi</em>', block: false })
     *   // → text node with an italic mark
     */
    private parseHTMLToken;
    /**
     * Returns true when the HTML contains a tag that is neither a standard
     * HTML/SVG element nor declared in a registered extension's parseDOM rules.
     *
     * Recognized but empty elements such as `<em></em>` or `<span></span>`,
     * and hyphenated custom elements like `<my-mention>`, are not considered
     * unrecognized.
     *
     * @param html Raw HTML string from a marked token.
     * @example
     *   isUnrecognizedHtml('<enter foo bar>')  // → true
     *   isUnrecognizedHtml('<em></em>')        // → false (empty, but real tag)
     *   isUnrecognizedHtml('<em>hi</em>')      // → false
     *   isUnrecognizedHtml('<my-el></my-el>')  // → false (valid custom element)
     *   isUnrecognizedHtml('<br>')             // → false
     */
    private isUnrecognizedHtml;
    /**
     * Collect the lower-cased tag names declared by the registered extensions'
     * parseDOM rules, so custom node/mark elements that use non-hyphenated,
     * non-standard tag names are treated as recognized HTML. Result is cached for the
     * lifetime of the manager since extensions don't change after registration.
     *
     * @example
     *   // After registering an extension with parseDOM [{ tag: 'something' }]
     *   getSchemaParseDomTags().has('something') // → true
     */
    private getSchemaParseDomTags;
    /**
     * Build a JSONContent that preserves the original HTML markup as literal
     * text. Used when the HTML would otherwise be silently dropped during
     * schema-aware parsing.
     *
     * @param html Raw HTML string to preserve verbatim.
     * @param isBlock Whether to wrap the text in a paragraph node (block tokens)
     *   or return it as a bare text node (inline tokens).
     * @example
     *   htmlAsLiteralText('<enter foo>', true)
     *   // → { type: 'paragraph', content: [{ type: 'text', text: '<enter foo>' }] }
     */
    private htmlAsLiteralText;
    /**
     * Encode HTML entities in text unless the node is inside a code context
     * (code mark or code-block parent) where literal characters should be preserved.
     * Also backslash-escape markdown-significant characters in non-code text to
     * prevent them from being misinterpreted as formatting delimiters.
     */
    private encodeTextForMarkdown;
    /**
     * Backslash-escape characters that have special meaning in markdown inline
     * syntax. This prevents literal characters in text nodes from being
     * misinterpreted as formatting delimiters when the output is parsed again.
     *
     * The set covers the most common inline markdown syntax characters.
     * Characters inside code blocks/code marks are skipped by the caller
     * (`encodeTextForMarkdown`) via the existing `isInsideCode` guard.
     */
    private escapeMarkdownSyntax;
    renderNodeToMarkdown(node: JSONContent, parentNode?: JSONContent, index?: number, level?: number, meta?: Record<string, any>): string;
    /**
     * Render a node or an array of nodes. Parent type controls how children
     * are joined (which determines newline insertion between children).
     */
    renderNodes(nodeOrNodes: JSONContent | JSONContent[], parentNode?: JSONContent, separator?: string, index?: number, level?: number): string;
    /**
     * Render an array of nodes while properly tracking mark boundaries.
     * This handles cases where marks span across multiple text nodes.
     */
    private renderNodesWithMarkBoundaries;
    /**
     * Get the opening markdown syntax for a mark type.
     */
    private getMarkOpening;
    /**
     * Get the closing markdown syntax for a mark type.
     */
    private getMarkClosing;
    /**
     * Returns the inline HTML tags an extension exposes for overlap-boundary
     * reopen handling, if that mark explicitly opted into HTML reopen mode.
     */
    private getHtmlReopenTags;
    /**
     * Check if two mark sets are equal (same types and matching attributes).
     */
    private markSetsEqual;
    /**
     * Decide the order in which marks open on the current text node.
     *
     * The returned array is iterated head-first when prepending opening
     * delimiters, so the first entry becomes the innermost mark in the emitted
     * markdown and the last becomes the outermost. Two stable signals drive
     * the order — neither one inspects any rendered markdown:
     *
     *   1. Marks that end on this node must be inner relative to marks that
     *      continue into the next node, otherwise the delimiters interleave
     *      instead of nesting.
     *   2. Within each lifetime group, marks are sorted so that lower
     *      registration ranks (i.e. higher Tiptap extension priorities) end up
     *      outermost. ProseMirror assigns mark ranks in the same priority-aware
     *      order Tiptap uses when building the schema, so link (priority 1000)
     *      naturally wraps bold/italic without the serializer needing to peek
     *      at how any particular mark renders.
     */
    private getMarksToOpenForSerialization;
}

type ContentType = 'json' | 'html' | 'markdown';

declare module '@tiptap/core' {
    interface Editor {
        /**
         * Get the content of the editor as markdown.
         */
        getMarkdown: () => string;
        /**
         * The markdown manager instance.
         */
        markdown?: MarkdownManager;
    }
    interface EditorOptions {
        /**
         * The content type the content is provided as.
         *
         * @default 'json'
         */
        contentType?: ContentType;
    }
    interface Storage {
        markdown: MarkdownExtensionStorage;
    }
    interface InsertContentOptions {
        /**
         * The content type the content is provided as.
         *
         * @default 'json'
         */
        contentType?: ContentType;
    }
    interface InsertContentAtOptions {
        /**
         * The content type the content is provided as.
         *
         * @default 'json'
         */
        contentType?: ContentType;
    }
    interface SetContentOptions {
        /**
         * The content type the content is provided as.
         *
         * @default 'json'
         */
        contentType?: ContentType;
    }
}
type MarkdownExtensionOptions = {
    /**
     * Configure the indentation style and size for lists and code blocks.
     * - `style`: Choose between spaces or tabs. Default is 'space'.
     * - `size`: Number of spaces or tabs for indentation. Default is 2.
     */
    indentation?: {
        style?: 'space' | 'tab';
        size?: number;
    };
    /**
     * Use a custom version of `marked` for markdown parsing and serialization.
     * If not provided, the default `marked` instance will be used.
     */
    marked?: typeof marked;
    /**
     * Options to pass to `marked.setOptions()`.
     * See the [marked documentation](https://marked.js.org/using_advanced#options) for available options.
     */
    markedOptions?: Parameters<typeof marked.setOptions>[0];
};
type MarkdownExtensionStorage = {
    manager: MarkdownManager;
};
declare const Markdown: Extension<MarkdownExtensionOptions, MarkdownExtensionStorage>;

/**
 * Wraps each line of the content with the given prefix.
 * @param prefix The prefix to wrap each line with.
 * @param content The content to wrap.
 * @returns The content with each line wrapped with the prefix.
 */
declare function wrapInMarkdownBlock(prefix: string, content: string): string;
/**
 * Identifies marks that need to be closed, based on the marks in the next node.
 * Compares both mark type and attributes — two marks of the same type with
 * different attributes are treated as distinct and need to be closed/reopened.
 */
declare function findMarksToClose(currentMarks: Map<string, any>, nextNode: any): string[];
/**
 * Identifies marks that need to be opened (in current node but not active, or
 * active with different attributes). Two marks of the same type with different
 * attributes are treated as distinct — the old one must be closed and the new
 * one reopened.
 */
declare function findMarksToOpen(activeMarks: Map<string, any>, currentMarks: Map<string, any>): Array<{
    type: string;
    mark: any;
}>;
/**
 * Determines which marks need to be closed at the end of the current text node.
 * This handles cases where marks end at node boundaries or when transitioning
 * to nodes with different mark sets.
 * Compares both mark type and attributes — two marks of the same type with
 * different attributes are treated as distinct and trigger a close/reopen.
 */
declare function findMarksToCloseAtEnd(activeMarks: Map<string, any>, currentMarks: Map<string, any>, nextNode: any, markSetsEqual: (a: Map<string, {
    type: string;
}>, b: Map<string, {
    type: string;
}>) => boolean): string[];
/**
 * Closes active marks before rendering a non-text node.
 * Returns the closing markdown syntax and clears the active marks.
 */
declare function closeMarksBeforeNode(activeMarks: Map<string, any>, getMarkClosing: (markType: string, mark: any) => string): string;
/**
 * Reopens marks after rendering a non-text node.
 * Returns the opening markdown syntax and updates the active marks.
 */
declare function reopenMarksAfterNode(marksToReopen: Map<string, any>, activeMarks: Map<string, any>, getMarkOpening: (markType: string, mark: any) => string): string;
/**
 * Check if a markdown list item token is a task item and extract its state.
 *
 * @param item The list item token to check
 * @returns Object containing isTask flag, checked state, and indentation level
 *
 * @example
 * ```ts
 * isTaskItem({ raw: '- [ ] Task' }) // { isTask: true, checked: false, indentLevel: 0 }
 * isTaskItem({ raw: '  - [x] Done' }) // { isTask: true, checked: true, indentLevel: 2 }
 * isTaskItem({ raw: '- Regular' }) // { isTask: false, indentLevel: 0 }
 * ```
 */
declare function isTaskItem(item: MarkdownToken): {
    isTask: boolean;
    checked?: boolean;
    indentLevel: number;
};
/**
 * Assumes the content type based off the content.
 * @param content The content to assume the type for.
 * @param contentType The content type that should be prioritized.
 */
declare function assumeContentType(content: (Content | Fragment | Node) | string, contentType: ContentType): ContentType;

export { Markdown, type MarkdownExtensionOptions, type MarkdownExtensionStorage, MarkdownManager, assumeContentType, closeMarksBeforeNode, findMarksToClose, findMarksToCloseAtEnd, findMarksToOpen, isTaskItem, reopenMarksAfterNode, wrapInMarkdownBlock };
