import { lazyFeatures } from "../features/lazy-features.mjs";
import { isSVGElement, resolveInitialValues } from "./utils.mjs";
import { motionGlobalConfig } from "../config.mjs";
import { frame, isVariantLabel } from "motion-dom";
import { invariant } from "hey-listen";
const mountedStates = /* @__PURE__ */ new WeakMap();
var MotionState = class {
	constructor(options, parent) {
		this.element = null;
		this.isExiting = false;
		this.presenceContainer = null;
		this.children = /* @__PURE__ */ new Set();
		this.features = /* @__PURE__ */ new Map();
		this._context = null;
		this.options = options;
		this.parent = parent;
		parent?.children?.add(this);
		this.latestValues = resolveInitialValues(options, this.context);
		this.type = isSVGElement(this.options.as) ? "svg" : "html";
	}
	get context() {
		if (!this._context) this._context = new Proxy({}, { get: (target, prop) => {
			const value = this.options[prop];
			if (isVariantLabel(value) || prop === "initial" && value === false) return value;
			return this.parent?.context[prop];
		} });
		return this._context;
	}
	updateFeatures() {
		if (!this.visualElement) return;
		for (const FeatureCtor of lazyFeatures) {
			if (!this.features.has(FeatureCtor.key)) this.features.set(FeatureCtor.key, new FeatureCtor(this));
			const feature = this.features.get(FeatureCtor.key);
			if (this.isMounted()) if (!feature.isMount) {
				feature.mount();
				feature.isMount = true;
			} else feature.update();
		}
	}
	updateOptions(options) {
		this.options = options;
		this.visualElement?.update({
			...this.options,
			whileTap: this.options.whilePress
		}, this.options.presenceContext ?? null);
	}
	mount(element) {
		invariant(Boolean(element), "Animation state must be mounted with valid Element");
		mountedStates.set(element, this);
		this.element = element;
		const presenceId = this.options.presenceContext?.presenceId;
		if (presenceId !== void 0) element.setAttribute(motionGlobalConfig.motionAttribute, presenceId);
		this.visualElement?.mount(element);
		this.updateFeatures();
	}
	beforeUnmount() {
		this.getSnapshot(this.options, false);
	}
	unmount() {
		this.parent?.children?.delete(this);
		mountedStates.delete(this.element);
		this.features.forEach((f) => f.unmount?.());
		this.visualElement?.unmount();
	}
	beforeUpdate() {
		this.getSnapshot(this.options, void 0);
	}
	update() {
		this.updateFeatures();
		this.didUpdate();
	}
	tryExitComplete() {
		if (this.isExiting) return;
		if (this.options?.layoutId && this.visualElement.projection?.currentAnimation?.state === "running") return;
		this.options.presenceContext?.onMotionExitComplete?.(this.presenceContainer, this);
	}
	setActive(name, isActive) {
		if (name === "exit" && isActive) this.isExiting = true;
		this.visualElement?.animationState?.setActive(name, isActive).then(() => {
			if (name === "exit" && isActive) {
				this.isExiting = false;
				this.options?.layoutId ? frame.postRender(() => this.tryExitComplete()) : this.tryExitComplete();
			}
		});
	}
	isMounted() {
		return Boolean(this.element);
	}
	initVisualElement(renderer) {
		if (this.visualElement) return;
		this.visualElement = renderer(this.options.as, {
			presenceContext: this.options.presenceContext ?? null,
			parent: this.parent?.visualElement,
			props: {
				...this.options,
				whileTap: this.options.whilePress
			},
			visualState: {
				renderState: {
					transform: {},
					transformOrigin: {},
					style: {},
					vars: {},
					attrs: {}
				},
				latestValues: { ...this.latestValues }
			},
			reducedMotionConfig: this.options.motionConfig?.reducedMotion
		});
		this.visualElement.parent?.addChild(this.visualElement);
		if (this.isMounted()) this.visualElement.mount(this.element);
	}
	getSnapshot(options, isPresent) {}
	didUpdate() {}
};
export { MotionState, mountedStates };
