import { AnimationFeature } from "./animation/animation.mjs";
import { createVisualElement } from "../state/create-visual-element.mjs";
import { PressGesture } from "./gestures/press/index.mjs";
import { HoverGesture } from "./gestures/hover/index.mjs";
import { InViewGesture } from "./gestures/in-view/index.mjs";
import { FocusGesture } from "./gestures/focus/index.mjs";
const domAnimation = {
	renderer: createVisualElement,
	features: [
		AnimationFeature,
		PressGesture,
		HoverGesture,
		InViewGesture,
		FocusGesture
	]
};
export { domAnimation };
