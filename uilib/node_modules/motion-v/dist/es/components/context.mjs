import { createContext } from "../utils/createContext.mjs";
const [injectMotion, provideMotion, motionInjectionKey] = createContext("Motion");
const [injectLayoutGroup, provideLayoutGroup, layoutGroupInjectionKey] = createContext("LayoutGroup");
export { injectLayoutGroup, injectMotion, layoutGroupInjectionKey, motionInjectionKey, provideLayoutGroup, provideMotion };
