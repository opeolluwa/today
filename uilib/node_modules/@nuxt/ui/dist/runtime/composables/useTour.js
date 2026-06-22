import { ref, computed, toValue, nextTick, watch } from "vue";
export function useTour(steps, options = {}) {
  const { loop = false, scrollIntoView = true } = options;
  const stepList = computed(() => toValue(steps) ?? []);
  const total = computed(() => stepList.value.length);
  const open = ref(false);
  const rawIndex = ref(options.initialStep ?? 0);
  function clamp(value) {
    return Math.min(Math.max(value, 0), Math.max(total.value - 1, 0));
  }
  const index = computed({
    get: () => clamp(rawIndex.value),
    set: (value) => rawIndex.value = clamp(value)
  });
  const current = computed(() => stepList.value[index.value]);
  const hasNext = computed(() => index.value < total.value - 1);
  const hasPrev = computed(() => index.value > 0);
  const centerAnchor = {
    getBoundingClientRect() {
      const x = typeof window === "undefined" ? 0 : window.innerWidth / 2;
      const y = typeof window === "undefined" ? 0 : window.innerHeight / 2;
      return { x, y, top: y, left: x, right: x, bottom: y, width: 0, height: 0, toJSON: () => ({}) };
    }
  };
  const reference = computed(() => {
    if (!open.value || typeof window === "undefined") {
      return void 0;
    }
    const target = toValue(current.value?.target);
    if (target == null) {
      return centerAnchor;
    }
    if (typeof target === "string") {
      const selector = target.startsWith("#") || target.startsWith(".") ? target : `#${target}`;
      try {
        return document.querySelector(selector) ?? void 0;
      } catch {
        return void 0;
      }
    }
    return target;
  });
  function scrollTargetIntoView() {
    if (!scrollIntoView) {
      return;
    }
    const el = reference.value;
    if (el instanceof Element) {
      el.scrollIntoView(typeof scrollIntoView === "object" ? scrollIntoView : { behavior: "smooth", block: "center" });
    }
  }
  function goTo(value) {
    index.value = value;
    if (total.value > 0) {
      open.value = true;
    }
  }
  function start(value = options.initialStep ?? 0) {
    goTo(value);
  }
  function next() {
    if (hasNext.value) {
      index.value++;
    } else if (loop) {
      index.value = 0;
    } else {
      finish();
    }
  }
  function prev() {
    if (hasPrev.value) {
      index.value--;
    }
  }
  function finish() {
    open.value = false;
  }
  watch(total, (value) => {
    if (!value) {
      open.value = false;
    }
  });
  watch([open, index], () => {
    if (open.value) {
      nextTick(scrollTargetIntoView);
    }
  });
  return {
    open,
    index,
    current,
    reference,
    total,
    hasNext,
    hasPrev,
    start,
    next,
    prev,
    goTo,
    finish
  };
}
