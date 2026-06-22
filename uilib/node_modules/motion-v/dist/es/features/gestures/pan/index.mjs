import { getContextWindow } from "../../../utils/get-context-window.mjs";
import { Feature } from "../../feature.mjs";
import { addPointerEvent } from "../../../events/add-pointer-event.mjs";
import { PanSession } from "./PanSession.mjs";
import { frame } from "motion-dom";
import { noop } from "motion-utils";
function asyncHandler(handler) {
	return (event, info) => {
		if (handler) frame.postRender(() => handler(event, info));
	};
}
var PanGesture = class extends Feature {
	constructor(..._args) {
		super(..._args);
		this.removePointerDownListener = noop;
	}
	static #_ = this.key = "pan";
	onPointerDown(pointerDownEvent) {
		this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
			transformPagePoint: this.state.visualElement.getTransformPagePoint(),
			contextWindow: getContextWindow(this.state.visualElement)
		});
	}
	createPanHandlers() {
		return {
			onSessionStart: asyncHandler((_, info) => {
				const { onPanSessionStart } = this.state.options;
				onPanSessionStart && onPanSessionStart(_, info);
			}),
			onStart: asyncHandler((_, info) => {
				const { onPanStart } = this.state.options;
				onPanStart && onPanStart(_, info);
			}),
			onMove: (event, info) => {
				const { onPan } = this.state.options;
				onPan && onPan(event, info);
			},
			onEnd: (event, info) => {
				const { onPanEnd } = this.state.options;
				delete this.session;
				if (onPanEnd) frame.postRender(() => onPanEnd(event, info));
			}
		};
	}
	mount() {
		this.removePointerDownListener = addPointerEvent(this.state.element, "pointerdown", this.onPointerDown.bind(this));
	}
	update() {}
	unmount() {
		this.removePointerDownListener();
		this.session && this.session.end();
	}
};
export { PanGesture };
