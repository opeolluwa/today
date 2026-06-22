import { f as HsvColor, q as Plugin } from '../colordx-dFaFF5rN.js';

declare module '@colordx/core' {
    interface Colordx {
        toHsv(precision?: number): HsvColor;
        toHsvString(precision?: number): string;
    }
}
declare const hsv: Plugin;

export { hsv as default };
