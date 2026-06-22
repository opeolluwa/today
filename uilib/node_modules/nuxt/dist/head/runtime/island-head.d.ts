import type { VueHeadClient } from '@unhead/vue/types';
/**
 * No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
 * augmentations on the same head are unaffected.
 */
export declare function freezeHead(head: VueHeadClient): () => void;
