import { nextTick, ref } from "vue";

//#region src/shared/useComposing.ts
function useComposing(onEnd) {
	const isComposing = ref(false);
	function handleCompositionStart() {
		isComposing.value = true;
	}
	function handleCompositionEnd(event) {
		nextTick(() => {
			isComposing.value = false;
			onEnd?.(event);
		});
	}
	return {
		isComposing,
		handleCompositionStart,
		handleCompositionEnd
	};
}

//#endregion
export { useComposing };
//# sourceMappingURL=useComposing.js.map