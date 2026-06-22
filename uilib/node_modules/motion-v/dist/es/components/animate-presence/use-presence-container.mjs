import { provideAnimatePresence } from "./presence.mjs";
import { motionGlobalConfig } from "../../config.mjs";
import { mountedStates } from "../../state/motion-state.mjs";
import { usePopLayout } from "./use-pop-layout.mjs";
import { onMounted, onUnmounted } from "vue";
var apId = 0;
function usePresenceContainer(props) {
	const presenceId = String(apId++);
	const exitSessions = /* @__PURE__ */ new Map();
	const { addPopStyle, removePopStyle } = usePopLayout(props);
	function findMotionStates(container) {
		const states = [];
		const selfState = mountedStates.get(container);
		if (selfState && container.getAttribute(motionGlobalConfig.motionAttribute) === presenceId) states.push(selfState);
		const elements = Array.from(container.querySelectorAll(`[${motionGlobalConfig.motionAttribute}="${presenceId}"]`));
		for (const el of elements) {
			const s = mountedStates.get(el);
			if (s) states.push(s);
		}
		return states;
	}
	function onMotionExitComplete(container, state) {
		const session = exitSessions.get(container);
		if (!session) return;
		session.remaining.delete(state);
		if (session.remaining.size === 0) finalizeExit(session);
	}
	const presenceContext = {
		initial: props.initial,
		custom: props.custom,
		presenceId,
		onMotionExitComplete
	};
	provideAnimatePresence(presenceContext);
	onMounted(() => {
		presenceContext.initial = void 0;
	});
	function finalizeExit(session) {
		removePopStyle(session.el);
		session.states.forEach((state) => {
			state.getSnapshot(state.options, false);
		});
		session.done();
		exitSessions.delete(session.el);
		if (!session.el?.isConnected) session.states.forEach((state) => {
			state.unmount();
		});
		else session.states[0]?.didUpdate();
		props.onExitComplete?.();
	}
	function enter(el, done) {
		findMotionStates(el).forEach((state) => {
			state.setActive("exit", false);
			state.getSnapshot(state.options, true);
		});
		done();
	}
	function exit(el, done) {
		presenceContext.custom = props.custom;
		const container = el;
		const states = findMotionStates(container);
		if (states.length === 0) {
			done();
			props.onExitComplete?.();
			return;
		}
		const session = {
			remaining: new Set(states),
			states,
			done,
			el: container
		};
		exitSessions.set(container, session);
		addPopStyle(container);
		states.forEach((state) => {
			state.presenceContainer = container;
			state.setActive("exit", true);
			state.getSnapshot(state.options, false);
		});
		states[0]?.didUpdate();
	}
	onUnmounted(() => {
		exitSessions.forEach((session) => {
			session.states.forEach((state) => {
				state.unmount();
			});
		});
		exitSessions.clear();
	});
	return {
		enter,
		exit
	};
}
export { usePresenceContainer };
