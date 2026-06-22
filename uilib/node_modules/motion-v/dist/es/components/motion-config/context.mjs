import { createContext } from "../../utils/createContext.mjs";
import { computed } from "vue";
const defaultConfig = {
	reducedMotion: "never",
	transition: void 0,
	nonce: void 0
};
const [injectMotionConfig, provideMotionConfig, motionConfigInjectionKey] = createContext("MotionConfig");
function useMotionConfig() {
	return injectMotionConfig(computed(() => defaultConfig));
}
export { defaultConfig, motionConfigInjectionKey, provideMotionConfig, useMotionConfig };
