import { k as LchColor, q as Plugin } from '../colordx-dFaFF5rN.js';

declare module '@colordx/core' {
    interface Colordx {
        toLch(precision?: number): LchColor;
        toLchString(precision?: number): string;
    }
}
declare const lch: Plugin;

export { lch as default };
