import { A as AnyColor, q as Plugin } from '../colordx-dFaFF5rN.cjs';

declare module '@colordx/core' {
    interface Colordx {
        luminance(): number;
        contrast(color?: AnyColor | Colordx): number;
        isReadable(background?: AnyColor, options?: {
            level?: 'AA' | 'AAA';
            size?: 'normal' | 'large';
        }): boolean;
        readableScore(background?: AnyColor): 'AAA' | 'AA' | 'AA large' | 'fail';
        minReadable(background?: AnyColor): Colordx;
        apcaContrast(background?: AnyColor): number;
        isReadableApca(background?: AnyColor, options?: {
            size?: 'normal' | 'large';
        }): boolean;
    }
}
declare const a11y: Plugin;

export { a11y as default };
