import { Component, DefineComponent, IntrinsicElementAttributes } from 'vue';
import { MotionProps } from './types';
import { FeatureBundle } from '../../features/dom-animation';
import { createVisualElement } from '../../state/create-visual-element';
import { ComponentProps, MotionHTMLAttributes } from '../../types';
type MotionCompProps = {
    create: <T extends DefineComponent>(T: any, options?: MotionCreateOptions) => DefineComponent<Omit<MotionProps<any, unknown>, 'as' | 'asChild'> & ComponentProps<T>>;
};
export interface MotionCreateOptions {
    forwardMotionProps?: boolean;
    renderer?: typeof createVisualElement;
}
/**
 * Creates a motion component from a base component or HTML tag
 * Caches string-based components for reuse
 */
export declare function createMotionComponent(component: string | DefineComponent, options?: MotionCreateOptions): Component;
type MotionNameSpace = {
    [K in keyof IntrinsicElementAttributes]: DefineComponent<Omit<MotionProps<K, unknown>, 'as' | 'asChild' | 'motionConfig' | 'layoutGroup'> & MotionHTMLAttributes<K>, 'create'>;
} & MotionCompProps;
export declare function createMotionComponentWithFeatures(featureBundle?: FeatureBundle): MotionNameSpace;
export {};
