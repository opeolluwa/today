import { VariantType } from '../../../types';
import { VariantLabels } from 'motion-dom';
export type FocusProps = {
    /**
     * Variant to apply when the element is focused.
     */
    whileFocus?: VariantLabels | VariantType;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
};
