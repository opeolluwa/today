import { Feature } from './feature';
import { createVisualElement } from '../state/create-visual-element';
export interface FeatureBundle {
    renderer: typeof createVisualElement;
    features: Array<typeof Feature>;
}
export declare const domAnimation: FeatureBundle;
