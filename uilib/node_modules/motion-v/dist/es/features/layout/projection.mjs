import { Feature } from "../feature.mjs";
import { getClosestProjectingNode } from "./utils.mjs";
import { defaultScaleCorrector } from "./config.mjs";
import { isHTMLElement } from "../gestures/drag/utils/is.mjs";
import { isSSR } from "../../utils/is.mjs";
import { HTMLProjectionNode, addScaleCorrector } from "motion-dom";
var ProjectionFeature = class extends Feature {
	static #_ = this.key = "projection";
	constructor(state) {
		super(state);
		addScaleCorrector(defaultScaleCorrector);
		if (!isSSR) this.initProjection();
	}
	initProjection() {
		const options = this.state.options;
		this.state.visualElement.projection = new HTMLProjectionNode(this.state.visualElement.latestValues, options["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(this.state.visualElement.parent));
		this.projection = this.state.visualElement.projection;
		this.projection.isPresent = true;
		this.setOptions();
	}
	setOptions() {
		const options = this.state.options;
		const { layoutId, layout, drag = false, dragConstraints = false } = options;
		this.projection?.setOptions({
			layout,
			layoutId,
			alwaysMeasureLayout: Boolean(layoutId) || Boolean(drag) || dragConstraints && isHTMLElement(dragConstraints),
			visualElement: this.state.visualElement,
			animationType: typeof options.layout === "string" ? options.layout : "both",
			layoutRoot: options.layoutRoot,
			layoutScroll: options.layoutScroll,
			crossfade: options.crossfade,
			onExitComplete: () => {
				if (!this.projection?.isPresent && this.state.options.layoutId && !this.state.isExiting) queueMicrotask(() => {
					this.state.options.presenceContext?.onMotionExitComplete?.(this.state.presenceContainer, this.state);
				});
			}
		});
	}
	update() {
		this.setOptions();
	}
	mount() {
		this.projection?.mount(this.state.element);
	}
};
export { ProjectionFeature };
