import { useCombineMotionValues } from "./use-combine-values.mjs";
import { collectMotionValues } from "motion-dom";
import { watchEffect } from "vue";
function useComputed(computed$1) {
	collectMotionValues.current = [];
	const { value, subscribe, unsubscribe, updateValue } = useCombineMotionValues(computed$1);
	subscribe(collectMotionValues.current);
	collectMotionValues.current = void 0;
	watchEffect(() => {
		unsubscribe();
		collectMotionValues.current = [];
		updateValue();
		subscribe(collectMotionValues.current);
		collectMotionValues.current = void 0;
	});
	return value;
}
export { useComputed };
