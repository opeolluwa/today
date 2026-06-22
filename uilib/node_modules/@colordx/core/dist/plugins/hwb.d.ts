import { h as HwbColor, q as Plugin } from '../colordx-dFaFF5rN.js';

declare module '@colordx/core' {
    interface Colordx {
        toHwb(precision?: number): HwbColor;
        toHwbString(precision?: number): string;
    }
}
declare const hwb: Plugin;

export { hwb as default };
