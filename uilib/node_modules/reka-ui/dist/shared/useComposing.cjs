const require_rolldown_runtime = require('../rolldown-runtime.cjs');
const vue = require_rolldown_runtime.__toESM(require("vue"));

//#region src/shared/useComposing.ts
function useComposing(onEnd) {
	const isComposing = (0, vue.ref)(false);
	function handleCompositionStart() {
		isComposing.value = true;
	}
	function handleCompositionEnd(event) {
		(0, vue.nextTick)(() => {
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
Object.defineProperty(exports, 'useComposing', {
  enumerable: true,
  get: function () {
    return useComposing;
  }
});
//# sourceMappingURL=useComposing.cjs.map