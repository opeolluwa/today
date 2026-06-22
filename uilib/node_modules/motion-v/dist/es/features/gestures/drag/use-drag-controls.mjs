var DragControls = class {
	constructor() {
		this.componentControls = /* @__PURE__ */ new Set();
	}
	subscribe(controls) {
		this.componentControls.add(controls);
		return () => this.componentControls.delete(controls);
	}
	start(event, options) {
		this.componentControls.forEach((controls) => {
			controls.start(event, options);
		});
	}
};
var createDragControls = () => new DragControls();
const useDragControls = createDragControls;
export { useDragControls };
