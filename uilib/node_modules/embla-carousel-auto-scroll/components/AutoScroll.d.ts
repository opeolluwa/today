import { OptionsType } from './Options';
import { CreatePluginType } from 'embla-carousel';
declare module 'embla-carousel' {
    interface EmblaPluginsType {
        autoScroll: AutoScrollType;
    }
    interface EmblaEventListType {
        autoScrollPlay: 'autoScroll:play';
        autoScrollStop: 'autoScroll:stop';
    }
}
export type AutoScrollType = CreatePluginType<{
    play: (delay?: number) => void;
    stop: () => void;
    reset: () => void;
    isPlaying: () => boolean;
}, OptionsType>;
export type AutoScrollOptionsType = AutoScrollType['options'];
declare function AutoScroll(userOptions?: AutoScrollOptionsType): AutoScrollType;
declare namespace AutoScroll {
    let globalOptions: AutoScrollOptionsType | undefined;
}
export default AutoScroll;
