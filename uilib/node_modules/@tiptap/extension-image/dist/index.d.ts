import { Node, ResizableNodeViewDirection } from '@tiptap/core';

interface ImageOptions {
    /**
     * Controls if the image node should be inline or not.
     * @default false
     * @example true
     */
    inline: boolean;
    /**
     * Controls if base64 images are allowed. Enable this if you want to allow
     * base64 image urls in the `src` attribute.
     * @default false
     * @example true
     */
    allowBase64: boolean;
    /**
     * HTML attributes to add to the image element.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;
    /**
     * Controls if the image should be resizable and how the resize is configured.
     * @default false
     * @example { directions: { top: true, right: true, bottom: true, left: true, topLeft: true, topRight: true, bottomLeft: true, bottomRight: true }, minWidth: 100, minHeight: 100 }
     */
    resize: {
        enabled: boolean;
        directions?: ResizableNodeViewDirection[];
        minWidth?: number;
        minHeight?: number;
        alwaysPreserveAspectRatio?: boolean;
    } | false;
}
interface SetImageOptions {
    src: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        image: {
            /**
             * Add an image
             * @param options The image attributes
             * @example
             * editor
             *   .commands
             *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
             */
            setImage: (options: SetImageOptions) => ReturnType;
        };
    }
}
/**
 * Matches an image to a ![image](src "title") on input.
 */
declare const inputRegex: RegExp;
/**
 * This extension allows you to insert images.
 * @see https://www.tiptap.dev/api/nodes/image
 */
declare const Image: Node<ImageOptions, any>;

export { Image, type ImageOptions, type SetImageOptions, Image as default, inputRegex };
