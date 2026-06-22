import { Feature } from "../../feature.mjs";
import { frame, press } from "motion-dom";
function extractEventInfo(event) {
	return { point: {
		x: event.pageX,
		y: event.pageY
	} };
}
var PressGesture = class extends Feature {
	static #_ = this.key = "press";
	constructor(state) {
		super(state);
	}
	isActive() {
		const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
		return Boolean(whilePress || onPress || onPressCancel || onPressStart);
	}
	register() {
		const element = this.state.element;
		if (!element || !this.isActive()) return;
		this.removePress?.();
		this.removePress = press(element, (_el, startEvent) => {
			const props = this.state.options;
			this.state.setActive("whilePress", true);
			if (props.onPressStart) frame.postRender(() => props.onPressStart(startEvent, extractEventInfo(startEvent)));
			return (endEvent, { success }) => {
				this.state.setActive("whilePress", false);
				const callbackName = success ? "onPress" : "onPressCancel";
				const callback = this.state.options[callbackName];
				if (callback) frame.postRender(() => callback(endEvent, extractEventInfo(endEvent)));
			};
		}, { useGlobalTarget: this.state.options.globalPressTarget });
	}
	mount() {
		this.register();
	}
	update() {
		const prev = this.state.visualElement.prevProps;
		if (!Boolean(prev?.whilePress || prev?.whileTap || prev?.onPress || prev?.onPressCancel || prev?.onPressStart) && this.isActive()) this.register();
	}
	unmount() {
		this.removePress?.();
		this.removePress = void 0;
	}
};
export { PressGesture };
