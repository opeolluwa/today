import { Feature } from "../../feature.mjs";
import { VisualElementDragControls } from "./VisualElementDragControls.mjs";
import { noop } from "motion-utils";
var DragGesture = class extends Feature {
	static #_ = this.key = "drag";
	constructor(state) {
		super(state);
		this.removeGroupControls = noop;
		this.removeListeners = noop;
		this.controls = new VisualElementDragControls(state);
	}
	mount() {
		const { dragControls } = this.state.options;
		if (dragControls) this.removeGroupControls = dragControls.subscribe(this.controls);
		this.removeListeners = this.controls.addListeners() || noop;
	}
	unmount() {
		this.removeGroupControls();
		this.removeListeners();
	}
};
export { DragGesture };
