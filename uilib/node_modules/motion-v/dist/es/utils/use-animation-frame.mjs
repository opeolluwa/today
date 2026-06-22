import { cancelFrame, frame } from "motion-dom";
import { onBeforeUpdate, onUnmounted } from "vue";
function useAnimationFrame(callback) {
	let initialTimestamp = 0;
	const provideTimeSinceStart = ({ timestamp, delta }) => {
		if (!initialTimestamp) initialTimestamp = timestamp;
		callback(timestamp - initialTimestamp, delta);
	};
	const cancel = () => cancelFrame(provideTimeSinceStart);
	onBeforeUpdate(() => {
		cancel();
		frame.update(provideTimeSinceStart, true);
	});
	onUnmounted(() => cancel());
	frame.update(provideTimeSinceStart, true);
}
export { useAnimationFrame };
