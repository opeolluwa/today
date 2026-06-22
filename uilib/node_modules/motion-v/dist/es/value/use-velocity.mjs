import { useMotionValueEvent } from "./use-motion-value-event.mjs";
import { frame, motionValue } from "motion-dom";
function useVelocity(value) {
	const velocity = motionValue(value.getVelocity());
	const updateVelocity = () => {
		const latest = value.getVelocity();
		velocity.set(latest);
		if (latest) frame.update(updateVelocity);
	};
	useMotionValueEvent(value, "change", () => {
		frame.update(updateVelocity, false, true);
	});
	return velocity;
}
export { useVelocity };
