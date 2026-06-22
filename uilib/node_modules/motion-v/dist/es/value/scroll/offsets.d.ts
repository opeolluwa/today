import { Edge, Intersection, ProgressIntersection } from '../../types';
type ScrollOffsetType = Array<Edge | Intersection | ProgressIntersection>;
/**
 * Preset scroll offsets matching framer-motion's ScrollOffset presets.
 * Use with useScroll's offset option to define scroll-linked animation ranges.
 *
 * @example
 * useScroll({ target: el, offset: ScrollOffset.Enter })
 */
export declare const ScrollOffset: {
    /** Progress 0→1 as target enters the container */
    Enter: readonly [readonly [0, 1], readonly [1, 1]];
    /** Progress 0→1 as target exits the container */
    Exit: readonly [readonly [0, 0], readonly [1, 0]];
    /** Progress 0→1 across any overlap between target and container */
    Any: readonly [readonly [1, 0], readonly [0, 1]];
    /** Progress 0→1 while target is fully contained within the container */
    All: readonly [readonly [0, 0], readonly [1, 1]];
};
export type ScrollOffset = ScrollOffsetType;
/**
 * Maps a ScrollOffset array to a ViewTimeline named range.
 * Returns undefined for unrecognised patterns — signals fallback to JS scroll tracking.
 *
 * Ported from framer-motion's internal render/dom/scroll/utils/offset-to-range.mjs
 */
export declare function offsetToViewTimelineRange(offset: ScrollOffsetType | undefined): {
    rangeStart: string;
    rangeEnd: string;
} | undefined;
export {};
