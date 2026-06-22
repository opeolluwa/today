import { useCombineMotionValues } from "./use-combine-values.mjs";
import { isMotionValue } from "motion-dom";
function useMotionTemplate(fragments, ...values) {
	const numFragments = fragments.length;
	function buildValue() {
		let output = "";
		for (let i = 0; i < numFragments; i++) {
			output += fragments[i];
			const value$1 = values[i];
			if (value$1) output += isMotionValue(value$1) ? value$1.get() : value$1;
		}
		return output;
	}
	const { value, subscribe } = useCombineMotionValues(buildValue);
	subscribe(values.filter(isMotionValue));
	return value;
}
export { useMotionTemplate };
