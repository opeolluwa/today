import { q as Plugin } from '../colordx-dFaFF5rN.cjs';

declare module '@colordx/core' {
    interface Colordx {
        toName(options?: {
            closest?: boolean;
        }): string | undefined;
    }
}
declare const names: Plugin;

export { names as default };
