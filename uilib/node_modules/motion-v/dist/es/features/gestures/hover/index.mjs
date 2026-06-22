import { Feature } from "../../feature.mjs";
import { extractEventInfo } from "../../../events/event-info.mjs";
import { frame, hover } from "motion-dom";
var HoverGesture = class extends Feature {
	static #_ = this.key = "hover";
	constructor(state) {
		super(state);
	}
	isActive() {
		const { whileHover, onHoverStart, onHoverEnd } = this.state.options;
		return Boolean(whileHover || onHoverStart || onHoverEnd);
	}
	register() {
		const element = this.state.element;
		if (!element || !this.isActive()) return;
		this.removeHover?.();
		this.removeHover = hover(element, (_el, startEvent) => {
			const props = this.state.options;
			this.state.setActive("whileHover", true);
			if (props.onHoverStart) frame.postRender(() => props.onHoverStart(startEvent, extractEventInfo(startEvent)));
			return (endEvent) => {
				this.state.setActive("whileHover", false);
				const callback = this.state.options.onHoverEnd;
				if (callback) frame.postRender(() => callback(endEvent, extractEventInfo(endEvent)));
			};
		});
	}
	mount() {
		this.register();
	}
	update() {
		const prev = this.state.visualElement.prevProps;
		if (!Boolean(prev?.whileHover || prev?.onHoverStart || prev?.onHoverEnd) && this.isActive()) this.register();
	}
	unmount() {
		this.removeHover?.();
		this.removeHover = void 0;
	}
};
export { HoverGesture };
