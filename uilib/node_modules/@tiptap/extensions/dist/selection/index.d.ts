import { Extension } from '@tiptap/core';

type SelectionOptions = {
    /**
     * The class name that should be added to the selected text.
     * @default 'selection'
     * @example 'is-selected'
     */
    className: string;
};
/**
 * This extension allows you to add a class to the selected text.
 * @see https://www.tiptap.dev/api/extensions/selection
 */
declare const Selection: Extension<SelectionOptions, any>;

export { Selection, type SelectionOptions };
