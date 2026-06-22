import { Feature } from "../feature.mjs";
import { isHidden } from "../../utils/is-hidden.mjs";
import { defaultScaleCorrector } from "./config.mjs";
import { addScaleCorrector, frame, globalProjectionState } from "motion-dom";
import { isDef } from "@vueuse/core";
var hasLayoutUpdate = false;
var LayoutFeature = class extends Feature {
	static #_ = this.key = "layout";
	constructor(state) {
		super(state);
		this.hasMountSettled = false;
		addScaleCorrector(defaultScaleCorrector);
		state.getSnapshot = this.getSnapshot.bind(this);
		state.didUpdate = this.didUpdate.bind(this);
	}
	updatePrevLead(projection) {
		const stack = projection.getStack();
		if (stack?.prevLead && !stack.prevLead.snapshot) {
			stack.prevLead.willUpdate();
			hasLayoutUpdate = true;
		}
	}
	didUpdate() {
		if (!hasLayoutUpdate) return;
		if (this.state.options.layout || this.state.options.layoutId || this.state.options.drag) {
			hasLayoutUpdate = false;
			this.state.visualElement.projection?.root?.didUpdate();
		}
	}
	mount() {
		const options = this.state.options;
		const layoutGroup = this.state.options.layoutGroup;
		if (options.layout || options.layoutId) {
			const projection = this.state.visualElement.projection;
			if (options.layoutId) {
				const isPresent = !isHidden(this.state.element);
				projection.isPresent = isPresent;
				isPresent ? projection.promote() : projection.relegate();
				this.updatePrevLead(projection);
			}
			layoutGroup?.group?.add(projection);
			globalProjectionState.hasEverUpdated = true;
		}
		this.didUpdate();
		frame.postRender(() => {
			this.hasMountSettled = true;
		});
	}
	unmount() {
		const layoutGroup = this.state.options.layoutGroup;
		const projection = this.state.visualElement.projection;
		if (projection) {
			if (layoutGroup?.group && (this.state.options.layout || this.state.options.layoutId)) layoutGroup.group.remove(projection);
			if (this.state.options.layoutId) hasLayoutUpdate = true;
			this.didUpdate();
		}
	}
	getSnapshot(newOptions, isPresent) {
		const projection = this.state.visualElement.projection;
		const { drag, layoutDependency, layout, layoutId } = newOptions;
		if (!projection || !layout && !layoutId && !drag) return;
		if (!this.hasMountSettled) return;
		hasLayoutUpdate = true;
		const prevProps = this.state.options;
		if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || isDef(isPresent) && projection.isPresent !== isPresent) projection.willUpdate();
		if (isDef(isPresent) && isPresent !== projection.isPresent) {
			projection.isPresent = isPresent;
			if (isPresent) {
				projection.promote();
				this.updatePrevLead(projection);
			} else projection.relegate();
		}
	}
};
export { LayoutFeature };
