import { UseSortableOptions, UseSortableReturn } from "../useSortable.js";
import * as _$vue from "vue";
import { Reactive, SlotsType } from "vue";
import { RenderableComponent } from "@vueuse/core";

//#region useSortable/component.d.ts
interface UseSortableProps extends RenderableComponent {
  modelValue: any[];
  options?: UseSortableOptions;
}
interface UseSortableSlots {
  default: (data: Reactive<UseSortableReturn>) => any;
}
declare const UseSortable: _$vue.DefineSetupFnComponent<UseSortableProps, Record<string, never>, SlotsType<UseSortableSlots>, UseSortableProps & {
  [x: `on${Capitalize<string>}`]: ((...args: unknown[]) => any) | undefined;
}, _$vue.PublicProps>;
//#endregion
export { UseSortable, UseSortableProps };