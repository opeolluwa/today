import { Feature } from "../feature.mjs";
import { createAnimationState } from "../../state/animation-state.mjs";
import { isHidden } from "../../utils/is-hidden.mjs";
import { isAnimationControls } from "motion-dom";
var AnimationFeature = class extends Feature {
	static #_ = this.key = "animation";
	constructor(state) {
		super(state);
		const ve = state.visualElement;
		ve.animationState ||= createAnimationState(ve);
	}
	updateAnimationControlsSubscription() {
		const { animate } = this.state.options;
		if (isAnimationControls(animate)) this.unmountControls = animate.subscribe(this.state.visualElement);
	}
	mount() {
		if (!!isHidden(this.state.element)) this.state.setActive("exit", true);
		else this.state.visualElement.animationState?.animateChanges();
		this.updateAnimationControlsSubscription();
	}
	update() {
		this.state.visualElement.animationState?.animateChanges();
		const { animate } = this.state.visualElement.getProps();
		const { animate: prevAnimate } = this.state.visualElement.prevProps || {};
		if (animate !== prevAnimate) this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.state.visualElement.animationState.reset();
		this.unmountControls?.();
	}
};
export { AnimationFeature };
