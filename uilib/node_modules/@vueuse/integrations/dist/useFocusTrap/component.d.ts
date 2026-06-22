import { UseFocusTrapOptions, UseFocusTrapReturn } from "../useFocusTrap.js";
import * as _$vue from "vue";
import { Reactive, SlotsType } from "vue";
import { RenderableComponent } from "@vueuse/core";

//#region useFocusTrap/component.d.ts
interface UseFocusTrapProps extends RenderableComponent {
  options?: UseFocusTrapOptions;
}
/**
 * @deprecated
 */
interface ComponentUseFocusTrapOptions extends UseFocusTrapProps {}
interface UseFocusTrapSlots {
  default: (data: Reactive<UseFocusTrapReturn>) => any;
}
declare const UseFocusTrap: _$vue.DefineSetupFnComponent<UseFocusTrapProps, Record<string, never>, SlotsType<UseFocusTrapSlots>, UseFocusTrapProps & {
  [x: `on${Capitalize<string>}`]: ((...args: unknown[]) => any) | undefined;
}, _$vue.PublicProps>;
//#endregion
export { ComponentUseFocusTrapOptions, UseFocusTrap, UseFocusTrapProps };