import { animateVisualElement, setTarget } from "motion-dom";
import { invariant } from "hey-listen";
function stopAnimation(visualElement) {
	visualElement.values.forEach((value) => value.stop());
}
function animationControls() {
	let hasMounted = false;
	const subscribers = /* @__PURE__ */ new Set();
	const controls = {
		subscribe(state) {
			subscribers.add(state);
			return () => void subscribers.delete(state);
		},
		start(definition, transitionOverride) {
			invariant(hasMounted, "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");
			const animations = [];
			subscribers.forEach((visualElement) => {
				animations.push(animateVisualElement(visualElement, definition, { transitionOverride }));
			});
			return Promise.all(animations);
		},
		set(definition) {
			invariant(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
			return subscribers.forEach((visualElement) => {
				setValues(visualElement, definition);
			});
		},
		stop() {
			subscribers.forEach((visualElement) => {
				stopAnimation(visualElement);
			});
		},
		mount() {
			hasMounted = true;
			return () => {
				hasMounted = false;
				controls.stop();
			};
		}
	};
	return controls;
}
function setValues(visualElement, definition) {
	if (Array.isArray(definition)) return setVariants(visualElement, definition);
	else if (typeof definition === "string") return setVariants(visualElement, [definition]);
	else setTarget(visualElement, definition);
}
function setVariants(visualElement, variantLabels) {
	[...variantLabels].reverse().forEach((key) => {
		const variant = visualElement.getVariant(key);
		variant && setTarget(visualElement, variant);
		if (visualElement.variantChildren) visualElement.variantChildren.forEach((child) => {
			setVariants(child, variantLabels);
		});
	});
}
export { animationControls };
