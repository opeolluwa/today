function resolveMotionProps(props, context) {
	const { layoutGroup, presenceContext, config } = context;
	const layoutId = layoutGroup.id && props.layoutId ? `${layoutGroup.id}-${props.layoutId}` : props.layoutId || void 0;
	return {
		...props,
		layoutId,
		transition: props.transition ?? config.transition,
		layoutGroup,
		motionConfig: config,
		inViewOptions: props.inViewOptions ?? config.inViewOptions,
		presenceContext,
		initial: presenceContext.initial === false ? presenceContext.initial : props.initial === true ? void 0 : props.initial
	};
}
export { resolveMotionProps };
