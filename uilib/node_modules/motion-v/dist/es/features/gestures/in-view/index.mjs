import { Feature } from "../../feature.mjs";
import { inView } from "framer-motion/dom";
import { frame as frame$1 } from "motion-dom";
var InViewGesture = class extends Feature {
	static #_ = this.key = "inView";
	constructor(state) {
		super(state);
	}
	isActive() {
		const { whileInView, onViewportEnter, onViewportLeave } = this.state.options;
		return Boolean(whileInView || onViewportEnter || onViewportLeave);
	}
	startObserver() {
		const element = this.state.element;
		if (!element || !this.isActive()) return;
		this.removeObserver?.();
		const { once, ...viewOptions } = this.state.options.inViewOptions || {};
		this.removeObserver = inView(element, (_, entry) => {
			const props = this.state.options;
			this.state.setActive("whileInView", true);
			if (props.onViewportEnter) frame$1.postRender(() => props.onViewportEnter(entry));
			if (!once) return () => {
				this.state.setActive("whileInView", false);
				const leaveCallback = this.state.options.onViewportLeave;
				if (leaveCallback) frame$1.postRender(() => leaveCallback(entry));
			};
		}, viewOptions);
	}
	mount() {
		this.startObserver();
	}
	update() {
		const { props, prevProps } = this.state.visualElement;
		if ([
			"amount",
			"margin",
			"root"
		].some((name) => {
			return props.inViewOptions?.[name] !== prevProps?.inViewOptions?.[name];
		})) this.startObserver();
	}
	unmount() {
		this.removeObserver?.();
		this.removeObserver = void 0;
	}
};
export { InViewGesture };
