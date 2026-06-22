import { OptionsType } from './Options';
import { CreatePluginType } from 'embla-carousel';
declare module 'embla-carousel' {
    interface EmblaPluginsType {
        classNames: ClassNamesType;
    }
}
export type ClassNamesType = CreatePluginType<{}, OptionsType>;
export type ClassNamesOptionsType = ClassNamesType['options'];
declare function ClassNames(userOptions?: ClassNamesOptionsType): ClassNamesType;
declare namespace ClassNames {
    let globalOptions: ClassNamesOptionsType | undefined;
}
export default ClassNames;
