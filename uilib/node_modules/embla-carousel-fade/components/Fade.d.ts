import { OptionsType } from './Options';
import { CreatePluginType } from 'embla-carousel';
declare module 'embla-carousel' {
    interface EmblaPluginsType {
        fade: FadeType;
    }
}
export type FadeType = CreatePluginType<{}, OptionsType>;
export type FadeOptionsType = FadeType['options'];
declare function Fade(userOptions?: FadeOptionsType): FadeType;
declare namespace Fade {
    let globalOptions: FadeOptionsType | undefined;
}
export default Fade;
