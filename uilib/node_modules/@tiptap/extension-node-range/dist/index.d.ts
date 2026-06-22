import { Extension } from '@tiptap/core';
import { SelectionRange, Selection } from '@tiptap/pm/state';
import { DecorationSet } from '@tiptap/pm/view';
import { ResolvedPos, Node } from '@tiptap/pm/model';
import { Mappable, Mapping } from '@tiptap/pm/transform';

interface NodeRangeOptions {
    depth: number | undefined;
    key: 'Shift' | 'Control' | 'Alt' | 'Meta' | 'Mod' | null | undefined;
}
declare const NodeRange: Extension<NodeRangeOptions, any>;

declare function getNodeRangeDecorations(ranges: SelectionRange[]): DecorationSet;

interface GetSelectionRangesOptions {
    /**
     * Whether nodes should be included when the selection only overlaps their
     * start or end content boundary.
     * @default true
     */
    extendOnBoundaryOverlap?: boolean;
}
/**
 * Calculates node-aligned selection ranges between two resolved positions.
 *
 * The helper derives a suitable depth when none is provided and returns a
 * `SelectionRange` for each matching child node in the computed `NodeRange`.
 * Each returned range exposes `$from` as the resolved start position of the
 * node selection and `$to` as the resolved end position.
 *
 * @param $from The resolved anchor position where the selection starts.
 * @param $to The resolved head position where the selection ends.
 * @param depth An optional depth to force when creating the ProseMirror `NodeRange`.
 * When omitted, the depth is inferred from the shared depth of `$from` and `$to`.
 * @param options Optional behavior flags for how boundary nodes are handled.
 * @param options.extendOnBoundaryOverlap Whether touching only a node's start
 * or end content boundary should still include that node in the returned ranges.
 * @returns An array of `SelectionRange` objects for the nodes covered at the
 * computed depth.
 * @example
 * ```ts
 * const { $from, $to } = editor.state.selection
 * const ranges = getSelectionRanges($from, $to, undefined, {
 *   extendOnBoundaryOverlap: false,
 * })
 *
 * ranges.forEach(range => {
 *   console.log(range.$from.pos, range.$to.pos)
 * })
 * ```
 */
declare function getSelectionRanges($from: ResolvedPos, $to: ResolvedPos, depth?: number, options?: GetSelectionRangesOptions): SelectionRange[];

declare class NodeRangeBookmark {
    anchor: number;
    head: number;
    depth: number;
    constructor(anchor: number, head: number, depth: number | undefined);
    map(mapping: Mappable): NodeRangeBookmark;
    resolve(doc: Node): NodeRangeSelection;
}

declare class NodeRangeSelection extends Selection {
    depth: number | undefined;
    constructor($anchor: ResolvedPos, $head: ResolvedPos, depth?: number, bias?: number);
    get $to(): ResolvedPos;
    eq(other: Selection): boolean;
    map(doc: Node, mapping: Mapping): NodeRangeSelection;
    toJSON(): {
        type: string;
        anchor: number;
        head: number;
        depth: number | undefined;
    };
    get isForwards(): boolean;
    get isBackwards(): boolean;
    extendBackwards(): NodeRangeSelection;
    extendForwards(): NodeRangeSelection;
    static fromJSON(doc: Node, json: {
        anchor: number;
        head: number;
        depth?: number;
    }): NodeRangeSelection;
    static create(doc: Node, anchor: number, head: number, depth?: number, bias?: number): NodeRangeSelection;
    getBookmark(): NodeRangeBookmark;
}

declare function isNodeRangeSelection(value: unknown): value is NodeRangeSelection;

export { type GetSelectionRangesOptions, NodeRange, type NodeRangeOptions, NodeRangeSelection, NodeRange as default, getNodeRangeDecorations, getSelectionRanges, isNodeRangeSelection };
