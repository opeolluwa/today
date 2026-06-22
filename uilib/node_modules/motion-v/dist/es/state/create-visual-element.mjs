import { isSVGElement } from "./utils.mjs";
import { HTMLVisualElement, SVGVisualElement } from "motion-dom";
function createVisualElement(Component, options) {
	return isSVGElement(Component) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
}
export { createVisualElement };
