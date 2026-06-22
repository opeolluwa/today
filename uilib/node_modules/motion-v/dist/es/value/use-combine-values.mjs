import { cancelFrame, frame, motionValue } from "motion-dom";
import { getCurrentInstance, onUnmounted } from "vue";
function useCombineMotionValues(combineValues) {
	const value = motionValue(combineValues());
	const updateValue = () => value.set(combineValues());
	const scheduleUpdate = () => frame.preRender(updateValue, false, true);
	let subscriptions;
	const subscribe = (values) => {
		subscriptions = values.map((v) => v.on("change", scheduleUpdate));
	};
	const unsubscribe = () => {
		subscriptions.forEach((unsubscribe$1) => unsubscribe$1());
		cancelFrame(updateValue);
	};
	if (getCurrentInstance()) onUnmounted(() => {
		unsubscribe();
	});
	return {
		subscribe,
		unsubscribe,
		value,
		updateValue
	};
}
export { useCombineMotionValues };
