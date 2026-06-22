import { Feature } from "../../feature.mjs";
import { addDomEvent } from "../../../events/add-dom-event.mjs";
import { pipe } from "motion-utils";
var FocusGesture = class extends Feature {
	static #_ = this.key = "focus";
	constructor(state) {
		super(state);
		this.isFocused = false;
	}
	onFocus() {
		let isFocusVisible = false;
		try {
			isFocusVisible = this.state.element.matches(":focus-visible");
		} catch {
			isFocusVisible = true;
		}
		if (!isFocusVisible) return;
		this.state.setActive("whileFocus", true);
		this.isFocused = true;
	}
	onBlur() {
		if (!this.isFocused) return;
		this.state.setActive("whileFocus", false);
		this.isFocused = false;
	}
	mount() {
		const element = this.state.element;
		this.removeFocus = pipe(addDomEvent(element, "focus", () => this.onFocus()), addDomEvent(element, "blur", () => this.onBlur()));
	}
	unmount() {
		this.removeFocus?.();
		this.removeFocus = void 0;
	}
};
export { FocusGesture };
