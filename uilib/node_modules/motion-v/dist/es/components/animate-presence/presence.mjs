import { createContext } from "../../utils/createContext.mjs";
const [injectAnimatePresence, provideAnimatePresence, animatePresenceInjectionKey] = createContext("AnimatePresenceContext");
export { animatePresenceInjectionKey, injectAnimatePresence, provideAnimatePresence };
