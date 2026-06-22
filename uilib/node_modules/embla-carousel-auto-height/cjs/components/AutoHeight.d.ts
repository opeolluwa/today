import { OptionsType } from './Options';
import { CreatePluginType } from 'embla-carousel';
declare module 'embla-carousel' {
    interface EmblaPluginsType {
        autoHeight: AutoHeightType;
    }
}
export type AutoHeightType = CreatePluginType<{}, OptionsType>;
export type AutoHeightOptionsType = AutoHeightType['options'];
declare function AutoHeight(userOptions?: AutoHeightOptionsType): AutoHeightType;
declare namespace AutoHeight {
    let globalOptions: AutoHeightOptionsType | undefined;
}
export default AutoHeight;
