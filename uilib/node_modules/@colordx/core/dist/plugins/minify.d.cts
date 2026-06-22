import { q as Plugin } from '../colordx-dFaFF5rN.cjs';

interface MinifyOptions {
    hex?: boolean;
    rgb?: boolean;
    hsl?: boolean;
    alphaHex?: boolean;
    transparent?: boolean;
    name?: boolean;
}
declare module '@colordx/core' {
    interface Colordx {
        minify(options?: MinifyOptions): string;
    }
}
declare const minifyPlugin: Plugin;

export { minifyPlugin as default };
