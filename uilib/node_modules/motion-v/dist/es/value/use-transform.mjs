import { useCombineMotionValues } from "./use-combine-values.mjs";
import { useComputed } from "./use-computed.mjs";
import { motionValue, transform } from "motion-dom";
import { isRef, watch } from "vue";
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
	if (typeof input === "function") return useComputed(input);
	if (outputRange && !Array.isArray(outputRange) && typeof outputRange === "object") {
		const result$1 = {};
		for (const key in outputRange) if (Object.prototype.hasOwnProperty.call(outputRange, key)) {
			const keyOutputRange = outputRange[key];
			result$1[key] = useTransform(input, inputRangeOrTransformer, keyOutputRange, options);
		}
		return result$1;
	}
	let inputValues;
	let transformer;
	if (typeof inputRangeOrTransformer === "function") {
		transformer = inputRangeOrTransformer;
		inputValues = Array.isArray(input) ? input : [input];
	} else if (isRef(inputRangeOrTransformer)) {
		const bridgeMV = motionValue(0);
		let currentTransformer = transform(inputRangeOrTransformer.value, outputRange, options);
		watch(inputRangeOrTransformer, (newRange) => {
			currentTransformer = transform(newRange, outputRange, options);
			bridgeMV.set(bridgeMV.get() + 1);
		}, { flush: "sync" });
		transformer = (values) => {
			return Array.isArray(values) ? currentTransformer(values[0]) : currentTransformer(values);
		};
		inputValues = Array.isArray(input) ? [...input, bridgeMV] : [input, bridgeMV];
	} else {
		transformer = transform(inputRangeOrTransformer, outputRange, options);
		inputValues = Array.isArray(input) ? input : [input];
	}
	const result = Array.isArray(input) ? useListTransform(inputValues, transformer) : useListTransform(inputValues, (values) => {
		return transformer(values[0]);
	});
	if (!Array.isArray(input)) {
		const inputAccelerate = input.accelerate;
		if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRange) && options?.clamp !== false) {
			const resolvedInputRange = isRef(inputRangeOrTransformer) ? inputRangeOrTransformer.value : inputRangeOrTransformer;
			result.accelerate = {
				...inputAccelerate,
				times: resolvedInputRange,
				keyframes: outputRange,
				isTransformed: true,
				...options?.ease ? { ease: options.ease } : {}
			};
		}
	}
	return result;
}
function useListTransform(values, transformer) {
	const latest = [];
	const combineValues = () => {
		latest.length = 0;
		const numValues = values.length;
		for (let i = 0; i < numValues; i++) latest[i] = values[i].get();
		return transformer(latest);
	};
	const { value, subscribe } = useCombineMotionValues(combineValues);
	subscribe(values);
	return value;
}
export { useTransform };
