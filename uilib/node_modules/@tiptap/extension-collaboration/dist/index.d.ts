import { Extension, MappablePosition, GetUpdatedPositionResult } from '@tiptap/core';
import { ySyncPlugin, yUndoPlugin } from '@tiptap/y-tiptap';
import { Doc, XmlFragment } from 'yjs';
import { EditorState, Transaction } from '@tiptap/pm/state';

type YSyncOpts = Parameters<typeof ySyncPlugin>[1];
type YUndoOpts = Parameters<typeof yUndoPlugin>[0];
interface CollaborationStorage {
    /**
     * Whether collaboration is currently disabled.
     * Disabling collaboration will prevent any changes from being synced with other users.
     */
    isDisabled: boolean;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        collaboration: {
            /**
             * Undo recent changes
             * @example editor.commands.undo()
             */
            undo: () => ReturnType;
            /**
             * Reapply reverted changes
             * @example editor.commands.redo()
             */
            redo: () => ReturnType;
        };
    }
    interface Storage {
        collaboration: CollaborationStorage;
    }
}
interface CollaborationOptions {
    /**
     * An initialized Y.js document.
     * @example new Y.Doc()
     */
    document?: Doc | null;
    /**
     * Name of a Y.js fragment, can be changed to sync multiple fields with one Y.js document.
     * @default 'default'
     * @example 'my-custom-field'
     */
    field?: string;
    /**
     * A raw Y.js fragment, can be used instead of `document` and `field`.
     * @example new Y.Doc().getXmlFragment('body')
     */
    fragment?: XmlFragment | null;
    /**
     * The collaboration provider.
     * @default null
     */
    provider?: any | null;
    /**
     * Fired when the content from Yjs is initially rendered to Tiptap.
     */
    onFirstRender?: () => void;
    /**
     * Options for the Yjs sync plugin.
     */
    ySyncOptions?: YSyncOpts;
    /**
     * Options for the Yjs undo plugin.
     */
    yUndoOptions?: YUndoOpts;
}
/**
 * This extension allows you to collaborate with others in real-time.
 * @see https://tiptap.dev/api/extensions/collaboration
 */
declare const Collaboration: Extension<CollaborationOptions, CollaborationStorage>;

/**
 * A type that represents a Y.js relative position. Used to map a position from
 * a transaction, handling both Yjs changes and regular transactions.
 *
 * If the editor is not collaborative, the value can be `null`.
 */
type YRelativePosition = any;

/**
 * A MappablePosition subclass that includes Y.js relative position information
 * to track positions in collaborative transactions.
 */
declare class CollaborationMappablePosition extends MappablePosition {
    /**
     * The Y.js relative position used for mapping positions in collaborative editing.
     */
    yRelativePosition: YRelativePosition;
    constructor(position: number, yRelativePosition: YRelativePosition);
    /**
     * Creates a CollaborationMappablePosition from a JSON object.
     */
    static fromJSON(json: any): CollaborationMappablePosition;
    /**
     * Converts the CollaborationMappablePosition to a JSON object.
     */
    toJSON(): any;
}
/**
 * Creates a MappablePosition from a position number.
 * This is the collaboration implementation that returns a CollaborationMappablePosition.
 */
declare function createMappablePosition(position: number, state: EditorState): CollaborationMappablePosition;
/**
 * Returns the new position after applying a transaction. Handles both Y.js
 * transactions and regular transactions.
 */
declare function getUpdatedPosition(position: MappablePosition, transaction: Transaction, state: EditorState): GetUpdatedPositionResult;

/**
 * Checks if a transaction was originated from a Yjs change.
 * @param {Transaction} transaction - The transaction to check.
 * @returns {boolean} - True if the transaction was originated from a Yjs change, false otherwise.
 * @example
 * const transaction = new Transaction(doc)
 * const isOrigin = isChangeOrigin(transaction) // returns false
 */
declare function isChangeOrigin(transaction: Transaction): boolean;

export { Collaboration, CollaborationMappablePosition, type CollaborationOptions, type CollaborationStorage, createMappablePosition, Collaboration as default, getUpdatedPosition, isChangeOrigin };
