import { CreateOptionsType } from 'embla-carousel';
export type ClassNameOptionType = string | string[];
export type ClassNamesListType = {
    snapped: string[];
    inView: string[];
    draggable: string[];
    dragging: string[];
    loop: string[];
};
export type OptionsType = CreateOptionsType<{
    [Key in keyof ClassNamesListType]: ClassNameOptionType;
}>;
export declare const defaultOptions: OptionsType;
