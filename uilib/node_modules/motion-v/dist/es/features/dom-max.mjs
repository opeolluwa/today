import { AnimationFeature } from "./animation/animation.mjs";
import { createVisualElement } from "../state/create-visual-element.mjs";
import { PressGesture } from "./gestures/press/index.mjs";
import { HoverGesture } from "./gestures/hover/index.mjs";
import { InViewGesture } from "./gestures/in-view/index.mjs";
import { FocusGesture } from "./gestures/focus/index.mjs";
import { ProjectionFeature } from "./layout/projection.mjs";
import { PanGesture } from "./gestures/pan/index.mjs";
import { DragGesture } from "./gestures/drag/index.mjs";
import { LayoutFeature } from "./layout/layout.mjs";
const domMax = {
	renderer: createVisualElement,
	features: [
		AnimationFeature,
		PressGesture,
		HoverGesture,
		InViewGesture,
		FocusGesture,
		ProjectionFeature,
		PanGesture,
		DragGesture,
		LayoutFeature
	]
};
export { domMax };
