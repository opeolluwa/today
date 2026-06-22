import { UseAsyncValidatorOptions, UseAsyncValidatorReturn } from "../useAsyncValidator.js";
import { Rules } from "async-validator";
import * as _$vue from "vue";
import { Reactive, SlotsType } from "vue";

//#region useAsyncValidator/component.d.ts
interface UseAsyncValidatorProps {
  form: Record<string, any>;
  rules: Rules;
  options?: UseAsyncValidatorOptions;
}
interface UseAsyncValidatorSlots {
  default: (data: Reactive<UseAsyncValidatorReturn>) => any;
}
declare const UseAsyncValidator: _$vue.DefineSetupFnComponent<UseAsyncValidatorProps, Record<string, never>, SlotsType<UseAsyncValidatorSlots>, UseAsyncValidatorProps & {
  [x: `on${Capitalize<string>}`]: ((...args: unknown[]) => any) | undefined;
}, _$vue.PublicProps>;
//#endregion
export { UseAsyncValidator, UseAsyncValidatorProps };