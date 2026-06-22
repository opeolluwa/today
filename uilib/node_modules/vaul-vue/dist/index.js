(function(){"use strict";var t;try{if(typeof document<"u"){var a=document.createElement("style");a.nonce=(t=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:t.content,a.appendChild(document.createTextNode('[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32,.72,0,1);animation-duration:.5s;animation-timing-function:cubic-bezier(.32,.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform, 100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform, 100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top],[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height, 0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left],[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height, 0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(.32,.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32,.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true]):after{content:"";position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]:after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]:after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]:after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]:after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not([data-state=closed]){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:hover,[data-vaul-handle]:active{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover: hover) and (pointer: fine){[data-vaul-drawer]{-webkit-user-select:none;user-select:none}}@media (pointer: fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{0%{transform:translate3d(0,var(--initial-transform, 100%),0)}to{transform:translateZ(0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform, 100%),0)}}@keyframes slideFromTop{0%{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}to{transform:translateZ(0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}}@keyframes slideFromLeft{0%{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}to{transform:translateZ(0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}}@keyframes slideFromRight{0%{transform:translate3d(var(--initial-transform, 100%),0,0)}to{transform:translateZ(0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform, 100%),0,0)}}')),document.head.appendChild(a)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
import { getCurrentInstance as Ye, ref as S, watch as J, nextTick as Pe, computed as I, onMounted as Re, onBeforeUnmount as Ge, onUnmounted as Xe, watchEffect as ve, defineComponent as Z, useSlots as Je, toRefs as Ke, createBlock as ue, openBlock as F, unref as N, withCtx as fe, renderSlot as se, mergeProps as Qe, withModifiers as Ze, normalizeStyle as Fe, createElementBlock as et, createElementVNode as tt } from "vue";
import { createContext as nt, DialogRoot as at, useForwardPropsEmits as lt, DialogOverlay as ot, DialogContent as it } from "reka-ui";
import { DialogClose as Ht, DialogDescription as Ut, DialogPortal as Lt, DialogTitle as Mt, DialogTrigger as kt } from "reka-ui";
const rt = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ut = (e) => typeof e < "u";
function st(e) {
  return JSON.parse(JSON.stringify(e));
}
function $e(e, n, s, i = {}) {
  var t, w, d;
  const {
    clone: v = !1,
    passive: D = !1,
    eventName: $,
    deep: T = !1,
    defaultValue: r,
    shouldEmit: l
  } = i, h = Ye(), m = s || (h == null ? void 0 : h.emit) || ((t = h == null ? void 0 : h.$emit) == null ? void 0 : t.bind(h)) || ((d = (w = h == null ? void 0 : h.proxy) == null ? void 0 : w.$emit) == null ? void 0 : d.bind(h == null ? void 0 : h.proxy));
  let u = $;
  n || (n = "modelValue"), u = u || `update:${n.toString()}`;
  const L = (a) => v ? typeof v == "function" ? v(a) : st(a) : a, H = () => ut(e[n]) ? L(e[n]) : r, p = (a) => {
    l ? l(a) && m(u, a) : m(u, a);
  };
  if (D) {
    const a = H(), c = S(a);
    let f = !1;
    return J(
      () => e[n],
      (y) => {
        f || (f = !0, c.value = L(y), Pe(() => f = !1));
      }
    ), J(
      c,
      (y) => {
        !f && (y !== e[n] || T) && p(y);
      },
      { deep: T }
    ), c;
  } else
    return I({
      get() {
        return H();
      },
      set(a) {
        p(a);
      }
    });
}
const [ee, ct] = nt("DrawerRoot"), Ee = /* @__PURE__ */ new WeakMap();
function C(e, n, s = !1) {
  if (!e || !(e instanceof HTMLElement) || !n)
    return;
  const i = {};
  Object.entries(n).forEach(([t, w]) => {
    if (t.startsWith("--")) {
      e.style.setProperty(t, w);
      return;
    }
    i[t] = e.style[t], e.style[t] = w;
  }), !s && Ee.set(e, i);
}
function dt(e, n) {
  if (!e || !(e instanceof HTMLElement))
    return;
  const s = Ee.get(e);
  s && Object.entries(s).forEach(([i, t]) => {
    e.style[i] = t;
  });
}
function ie(e, n) {
  const s = window.getComputedStyle(e), i = s.transform || s.webkitTransform || s.mozTransform;
  let t = i.match(/^matrix3d\((.+)\)$/);
  return t ? Number.parseFloat(t[1].split(", ")[_(n) ? 13 : 12]) : (t = i.match(/^matrix\((.+)\)$/), t ? Number.parseFloat(t[1].split(", ")[_(n) ? 5 : 4]) : null);
}
function vt(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function _(e) {
  switch (e) {
    case "top":
    case "bottom":
      return !0;
    case "left":
    case "right":
      return !1;
    default:
      return e;
  }
}
function de(e, n) {
  if (!e)
    return () => {
    };
  const s = e.style.cssText;
  return Object.assign(e.style, n), () => {
    e.style.cssText = s;
  };
}
function ft(...e) {
  return (...n) => {
    for (const s of e)
      typeof s == "function" && s(...n);
  };
}
const O = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1]
}, _e = 0.4, pt = 0.25, gt = 100, Be = 8, re = 16, Ce = 26, Oe = "vaul-dragging";
function mt({
  activeSnapPoint: e,
  snapPoints: n,
  drawerRef: s,
  overlayRef: i,
  fadeFromIndex: t,
  onSnapPointChange: w,
  direction: d
}) {
  const v = S(typeof window < "u" ? {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  } : void 0);
  function D() {
    v.value = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
  }
  Re(() => {
    typeof window < "u" && window.addEventListener("resize", D);
  }), Ge(() => {
    typeof window < "u" && window.removeEventListener("resize", D);
  });
  const $ = I(
    () => (n.value && e.value === n.value[n.value.length - 1]) ?? null
  ), T = I(
    () => n.value && n.value.length > 0 && ((t == null ? void 0 : t.value) || (t == null ? void 0 : t.value) === 0) && !Number.isNaN(t == null ? void 0 : t.value) && n.value[(t == null ? void 0 : t.value) ?? -1] === e.value || !n.value
  ), r = I(
    () => {
      var p;
      return ((p = n.value) == null ? void 0 : p.findIndex((a) => a === e.value)) ?? null;
    }
  ), l = I(
    () => {
      var p;
      return ((p = n.value) == null ? void 0 : p.map((a) => {
        const c = typeof a == "string";
        let f = 0;
        if (c && (f = Number.parseInt(a, 10)), _(d.value)) {
          const P = c ? f : v.value ? a * v.value.innerHeight : 0;
          return v.value ? d.value === "bottom" ? v.value.innerHeight - P : -v.value.innerHeight + P : P;
        }
        const y = c ? f : v.value ? a * v.value.innerWidth : 0;
        return v.value ? d.value === "right" ? v.value.innerWidth - y : -v.value.innerWidth + y : y;
      })) ?? [];
    }
  ), h = I(
    () => {
      var p;
      return r.value !== null ? (p = l.value) == null ? void 0 : p[r.value] : null;
    }
  ), m = (p) => {
    var c, f, y, P;
    const a = ((c = l.value) == null ? void 0 : c.findIndex((x) => x === p)) ?? null;
    Pe(() => {
      var x;
      w(a, l.value), C((x = s.value) == null ? void 0 : x.$el, {
        transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
        transform: _(d.value) ? `translate3d(0, ${p}px, 0)` : `translate3d(${p}px, 0, 0)`
      });
    }), l.value && a !== l.value.length - 1 && a !== (t == null ? void 0 : t.value) ? C((f = i.value) == null ? void 0 : f.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "0"
    }) : C((y = i.value) == null ? void 0 : y.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "1"
    }), e.value = a !== null ? ((P = n.value) == null ? void 0 : P[a]) ?? null : null;
  };
  J(
    [e, l, n],
    () => {
      var p;
      if (e.value) {
        const a = ((p = n.value) == null ? void 0 : p.findIndex((c) => c === e.value)) ?? -1;
        l.value && a !== -1 && typeof l.value[a] == "number" && m(l.value[a]);
      }
    },
    {
      immediate: !0
      // if you want to run the effect immediately as well
    }
  );
  function u({
    draggedDistance: p,
    closeDrawer: a,
    velocity: c,
    dismissible: f
  }) {
    var j, G, z;
    if (t.value === void 0)
      return;
    const y = d.value === "bottom" || d.value === "right" ? (h.value ?? 0) - p : (h.value ?? 0) + p, P = r.value === t.value - 1, x = r.value === 0, W = p > 0;
    if (P && C((j = i.value) == null ? void 0 : j.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`
    }), c > 2 && !W) {
      f ? a() : m(l.value[0]);
      return;
    }
    if (c > 2 && W && l && n.value) {
      m(l.value[n.value.length - 1]);
      return;
    }
    const te = (G = l.value) == null ? void 0 : G.reduce((M, g) => typeof M != "number" || typeof g != "number" ? M : Math.abs(g - y) < Math.abs(M - y) ? g : M), V = _(d.value) ? window.innerHeight : window.innerWidth;
    if (c > _e && Math.abs(p) < V * 0.4) {
      const M = W ? 1 : -1;
      if (M > 0 && $) {
        m(l.value[(((z = n.value) == null ? void 0 : z.length) ?? 0) - 1]);
        return;
      }
      if (x && M < 0 && f && a(), r.value === null)
        return;
      m(l.value[r.value + M]);
      return;
    }
    m(te);
  }
  function L({ draggedDistance: p }) {
    var c;
    if (h.value === null)
      return;
    const a = d.value === "bottom" || d.value === "right" ? h.value - p : h.value + p;
    (d.value === "bottom" || d.value === "right") && a < l.value[l.value.length - 1] || (d.value === "top" || d.value === "left") && a > l.value[l.value.length - 1] || C((c = s.value) == null ? void 0 : c.$el, {
      transform: _(d.value) ? `translate3d(0, ${a}px, 0)` : `translate3d(${a}px, 0, 0)`
    });
  }
  function H(p, a) {
    if (!n.value || typeof r.value != "number" || !l.value || t.value === void 0)
      return null;
    const c = r.value === t.value - 1;
    if (r.value >= t.value && a)
      return 0;
    if (c && !a)
      return 1;
    if (!T.value && !c)
      return null;
    const y = c ? r.value + 1 : r.value - 1, P = c ? l.value[y] - l.value[y - 1] : l.value[y + 1] - l.value[y], x = p / Math.abs(P);
    return c ? 1 - x : x;
  }
  return {
    isLastSnapPoint: $,
    shouldFade: T,
    getPercentageDragged: H,
    activeSnapPointIndex: r,
    onRelease: u,
    onDrag: L,
    snapPointsOffset: l
  };
}
function Te() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
let Q = null;
function wt(e) {
  const { isOpen: n, modal: s, nested: i, hasBeenOpened: t, preventScrollRestoration: w, noBodyStyles: d } = e, v = S(typeof window < "u" ? window.location.href : ""), D = S(0);
  function $() {
    if (Te() && Q === null && n.value && !d.value) {
      Q = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height
      };
      const { scrollX: r, innerHeight: l } = window;
      document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
        top: `${-D.value}px`,
        left: `${-r}px`,
        right: "0px",
        height: "auto"
      }), setTimeout(() => {
        requestAnimationFrame(() => {
          const h = l - window.innerHeight;
          h && D.value >= l && (document.body.style.top = `-${D.value + h}px`);
        });
      }, 300);
    }
  }
  function T() {
    if (Te() && Q !== null && !d.value) {
      const r = -Number.parseInt(document.body.style.top, 10), l = -Number.parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, Q), window.requestAnimationFrame(() => {
        if (w.value && v.value !== window.location.href) {
          v.value = window.location.href;
          return;
        }
        window.scrollTo(l, r);
      }), Q = null;
    }
  }
  return Re(() => {
    function r() {
      D.value = window.scrollY;
    }
    r(), window.addEventListener("scroll", r), Xe(() => {
      window.removeEventListener("scroll", r);
    });
  }), J([n, t, v], () => {
    i.value || !t.value || (n.value ? (window.matchMedia("(display-mode: standalone)").matches || $(), s.value || setTimeout(() => {
      T();
    }, 500)) : T());
  }), { restorePositionSetting: T };
}
function ht(e, n) {
  return e && e.value ? e : n;
}
function yt(e) {
  const {
    emitDrag: n,
    emitRelease: s,
    emitClose: i,
    emitOpenChange: t,
    open: w,
    dismissible: d,
    nested: v,
    modal: D,
    shouldScaleBackground: $,
    setBackgroundColorOnScale: T,
    scrollLockTimeout: r,
    closeThreshold: l,
    activeSnapPoint: h,
    fadeFromIndex: m,
    direction: u,
    noBodyStyles: L,
    handleOnly: H,
    preventScrollRestoration: p
  } = e, a = S(w.value ?? !1), c = S(!1), f = S(!1), y = S(!1), P = S(null), x = S(null), W = S(null), te = S(null), V = S(null), j = S(!1), G = S(null), z = S(0), M = S(!1);
  S(0);
  const g = S(null);
  S(0);
  const pe = I(() => {
    var o;
    return ((o = g.value) == null ? void 0 : o.$el.getBoundingClientRect().height) || 0;
  }), U = ht(
    e.snapPoints,
    S(void 0)
  ), Ne = I(() => {
    var o;
    return U && (((o = U.value) == null ? void 0 : o.length) ?? 0) > 0;
  }), Ae = S(null), {
    activeSnapPointIndex: ge,
    onRelease: xe,
    snapPointsOffset: He,
    onDrag: Ue,
    shouldFade: me,
    getPercentageDragged: Le
  } = mt({
    snapPoints: U,
    activeSnapPoint: h,
    drawerRef: g,
    fadeFromIndex: m,
    overlayRef: P,
    onSnapPointChange: Me,
    direction: u
  });
  function Me(o, R) {
    U.value && o === R.length - 1 && (x.value = /* @__PURE__ */ new Date());
  }
  wt({
    isOpen: a,
    modal: D,
    nested: v,
    hasBeenOpened: c,
    noBodyStyles: L,
    preventScrollRestoration: p
  });
  function ne() {
    return (window.innerWidth - Ce) / window.innerWidth;
  }
  function we(o, R) {
    var k;
    if (!o)
      return !1;
    let b = o;
    const B = (k = window.getSelection()) == null ? void 0 : k.toString(), E = g.value ? ie(g.value.$el, u.value) : null, A = /* @__PURE__ */ new Date();
    if (b.hasAttribute("data-vaul-no-drag") || b.closest("[data-vaul-no-drag]"))
      return !1;
    if (u.value === "right" || u.value === "left")
      return !0;
    if (x.value && A.getTime() - x.value.getTime() < 500)
      return !1;
    if (E !== null && (u.value === "bottom" ? E > 0 : E < 0))
      return !0;
    if (B && B.length > 0)
      return !1;
    if (V.value && A.getTime() - V.value.getTime() < r.value && E === 0 || R)
      return V.value = A, !1;
    for (; b; ) {
      if (b.scrollHeight > b.clientHeight) {
        if (b.scrollTop !== 0)
          return V.value = /* @__PURE__ */ new Date(), !1;
        if (b.getAttribute("role") === "dialog")
          return !0;
      }
      b = b.parentNode;
    }
    return !0;
  }
  function ke(o) {
    !d.value && !U.value || g.value && !g.value.$el.contains(o.target) || (f.value = !0, W.value = /* @__PURE__ */ new Date(), o.target.setPointerCapture(o.pointerId), z.value = _(u.value) ? o.clientY : o.clientX);
  }
  function Ie(o) {
    var R, b, B, E, A, k;
    if (g.value && f.value) {
      const X = u.value === "bottom" || u.value === "right" ? 1 : -1, ae = (z.value - (_(u.value) ? o.clientY : o.clientX)) * X, le = ae > 0, ye = U.value && !d.value && !le;
      if (ye && ge.value === 0)
        return;
      const ce = Math.abs(ae), Se = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      let q = ce / pe.value;
      const De = Le(ce, le);
      if (De !== null && (q = De), ye && q >= 1 || !j.value && !we(o.target, le))
        return;
      if ((R = g == null ? void 0 : g.value) == null || R.$el.classList.add(Oe), j.value = !0, C((b = g.value) == null ? void 0 : b.$el, {
        transition: "none"
      }), C((B = P.value) == null ? void 0 : B.$el, {
        transition: "none"
      }), U.value && Ue({ draggedDistance: ae }), le && !U.value) {
        const Y = vt(ae), oe = Math.min(Y * -1, 0) * X;
        C((E = g.value) == null ? void 0 : E.$el, {
          transform: _(u.value) ? `translate3d(0, ${oe}px, 0)` : `translate3d(${oe}px, 0, 0)`
        });
        return;
      }
      const qe = 1 - q;
      if ((me.value || m.value && ge.value === m.value - 1) && (n(q), C(
        (A = P.value) == null ? void 0 : A.$el,
        {
          opacity: `${qe}`,
          transition: "none"
        },
        !0
      )), Se && P.value && $.value) {
        const Y = Math.min(ne() + q * (1 - ne()), 1), oe = 8 - q * 8, be = Math.max(0, 14 - q * 14);
        C(
          Se,
          {
            borderRadius: `${oe}px`,
            transform: _(u.value) ? `scale(${Y}) translate3d(0, ${be}px, 0)` : `scale(${Y}) translate3d(${be}px, 0, 0)`,
            transition: "none"
          },
          !0
        );
      }
      if (!U.value) {
        const Y = ce * X;
        C((k = g.value) == null ? void 0 : k.$el, {
          transform: _(u.value) ? `translate3d(0, ${Y}px, 0)` : `translate3d(${Y}px, 0, 0)`
        });
      }
    }
  }
  function he() {
    var b;
    if (!g.value)
      return;
    const o = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]"), R = ie(g.value.$el, u.value);
    C(g.value.$el, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`
    }), C((b = P.value) == null ? void 0 : b.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "1"
    }), $.value && R && R > 0 && a.value && C(
      o,
      {
        borderRadius: `${Be}px`,
        overflow: "hidden",
        ..._(u.value) ? {
          transform: `scale(${ne()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
          transformOrigin: "top"
        } : {
          transform: `scale(${ne()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
          transformOrigin: "left"
        },
        transitionProperty: "transform, border-radius",
        transitionDuration: `${O.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
      },
      !0
    );
  }
  function K(o) {
    g.value && (i(), o || (a.value = !1), window.setTimeout(() => {
      U.value && (h.value = U.value[0]);
    }, O.DURATION * 1e3));
  }
  ve(() => {
    if (!a.value && $.value && rt) {
      const o = setTimeout(() => {
        dt(document.body);
      }, 200);
      return () => clearTimeout(o);
    }
  }), J(w, () => {
    a.value = w.value, w.value || K();
  });
  function We(o) {
    if (!f.value || !g.value)
      return;
    g.value.$el.classList.remove(Oe), j.value = !1, f.value = !1, te.value = /* @__PURE__ */ new Date();
    const R = ie(g.value.$el, u.value);
    if (!we(o.target, !1) || !R || Number.isNaN(R) || W.value === null)
      return;
    const b = te.value.getTime() - W.value.getTime(), B = z.value - (_(u.value) ? o.clientY : o.clientX), E = Math.abs(B) / b;
    if (E > 0.05 && (y.value = !0, window.setTimeout(() => {
      y.value = !1;
    }, 200)), U.value) {
      const k = u.value === "bottom" || u.value === "right" ? 1 : -1;
      xe({
        draggedDistance: B * k,
        closeDrawer: K,
        velocity: E,
        dismissible: d.value
      }), s(!0);
      return;
    }
    if (u.value === "bottom" || u.value === "right" ? B > 0 : B < 0) {
      he(), s(!0);
      return;
    }
    if (E > _e) {
      K(), s(!1);
      return;
    }
    const A = Math.min(
      g.value.$el.getBoundingClientRect().height ?? 0,
      window.innerHeight
    );
    if (R >= A * l.value) {
      K(), s(!1);
      return;
    }
    s(!0), he();
  }
  J(a, (o) => {
    o && (x.value = /* @__PURE__ */ new Date()), t(o);
  }, { immediate: !0 });
  function Ve(o) {
    var B, E;
    const R = o ? (window.innerWidth - re) / window.innerWidth : 1, b = o ? -16 : 0;
    G.value && window.clearTimeout(G.value), C((B = g.value) == null ? void 0 : B.$el, {
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      transform: `scale(${R}) translate3d(0, ${b}px, 0)`
    }), !o && ((E = g.value) != null && E.$el) && (G.value = window.setTimeout(() => {
      var k, X;
      const A = ie((k = g.value) == null ? void 0 : k.$el, u.value);
      C((X = g.value) == null ? void 0 : X.$el, {
        transition: "none",
        transform: _(u.value) ? `translate3d(0, ${A}px, 0)` : `translate3d(${A}px, 0, 0)`
      });
    }, 500));
  }
  function je(o) {
    var A;
    if (o < 0)
      return;
    const R = _(u.value) ? window.innerHeight : window.innerWidth, b = (R - re) / R, B = b + o * (1 - b), E = -16 + o * re;
    C((A = g.value) == null ? void 0 : A.$el, {
      transform: _(u.value) ? `scale(${B}) translate3d(0, ${E}px, 0)` : `scale(${B}) translate3d(${E}px, 0, 0)`,
      transition: "none"
    });
  }
  function ze(o) {
    var E;
    const R = _(u.value) ? window.innerHeight : window.innerWidth, b = o ? (R - re) / R : 1, B = o ? -16 : 0;
    o && C((E = g.value) == null ? void 0 : E.$el, {
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      transform: _(u.value) ? `scale(${b}) translate3d(0, ${B}px, 0)` : `scale(${b}) translate3d(${B}px, 0, 0)`
    });
  }
  return {
    open: w,
    isOpen: a,
    modal: D,
    keyboardIsOpen: M,
    hasBeenOpened: c,
    drawerRef: g,
    drawerHeightRef: pe,
    overlayRef: P,
    handleRef: Ae,
    isDragging: f,
    dragStartTime: W,
    isAllowedToDrag: j,
    snapPoints: U,
    activeSnapPoint: h,
    hasSnapPoints: Ne,
    pointerStart: z,
    dismissible: d,
    snapPointsOffset: He,
    direction: u,
    shouldFade: me,
    fadeFromIndex: m,
    shouldScaleBackground: $,
    setBackgroundColorOnScale: T,
    onPress: ke,
    onDrag: Ie,
    onRelease: We,
    closeDrawer: K,
    onNestedDrag: je,
    onNestedRelease: ze,
    onNestedOpenChange: Ve,
    emitClose: i,
    emitDrag: n,
    emitRelease: s,
    emitOpenChange: t,
    nested: v,
    handleOnly: H,
    noBodyStyles: L
  };
}
const St = /* @__PURE__ */ Z({
  __name: "DrawerRoot",
  props: {
    activeSnapPoint: { default: void 0 },
    closeThreshold: { default: pt },
    shouldScaleBackground: { type: Boolean, default: void 0 },
    setBackgroundColorOnScale: { type: Boolean, default: !0 },
    scrollLockTimeout: { default: gt },
    fixed: { type: Boolean, default: void 0 },
    dismissible: { type: Boolean, default: !0 },
    modal: { type: Boolean, default: !0 },
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: void 0 },
    nested: { type: Boolean, default: !1 },
    direction: { default: "bottom" },
    noBodyStyles: { type: Boolean },
    handleOnly: { type: Boolean, default: !1 },
    preventScrollRestoration: { type: Boolean },
    snapPoints: { default: void 0 },
    fadeFromIndex: { default: void 0 }
  },
  emits: ["drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(e, { expose: n, emit: s }) {
    const i = e, t = s;
    Je();
    const w = I(() => i.fadeFromIndex ?? (i.snapPoints && i.snapPoints.length - 1)), d = $e(i, "open", t, {
      defaultValue: i.defaultOpen,
      passive: i.open === void 0
    }), v = $e(i, "activeSnapPoint", t, {
      passive: i.activeSnapPoint === void 0
    }), D = {
      emitDrag: (m) => t("drag", m),
      emitRelease: (m) => t("release", m),
      emitClose: () => t("close"),
      emitOpenChange: (m) => {
        t("update:open", m), setTimeout(() => {
          t("animationEnd", m);
        }, O.DURATION * 1e3);
      }
    }, { closeDrawer: $, hasBeenOpened: T, modal: r, isOpen: l } = ct(
      yt({
        ...D,
        ...Ke(i),
        activeSnapPoint: v,
        fadeFromIndex: w,
        open: d
      })
    );
    function h(m) {
      if (d.value !== void 0) {
        D.emitOpenChange(m);
        return;
      }
      l.value = m, m ? T.value = !0 : $();
    }
    return n({
      open: l
    }), (m, u) => (F(), ue(N(at), {
      open: N(l),
      modal: N(r),
      "onUpdate:open": h
    }, {
      default: fe(() => [
        se(m.$slots, "default", { open: N(l) })
      ]),
      _: 3
    }, 8, ["open", "modal"]));
  }
}), _t = /* @__PURE__ */ Z({
  __name: "DrawerRootNested",
  props: {
    activeSnapPoint: {},
    closeThreshold: {},
    shouldScaleBackground: { type: Boolean },
    setBackgroundColorOnScale: { type: Boolean },
    scrollLockTimeout: {},
    fixed: { type: Boolean },
    dismissible: { type: Boolean },
    modal: { type: Boolean },
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    nested: { type: Boolean },
    direction: {},
    noBodyStyles: { type: Boolean },
    handleOnly: { type: Boolean },
    preventScrollRestoration: { type: Boolean },
    snapPoints: {},
    fadeFromIndex: {}
  },
  emits: ["drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(e, { emit: n }) {
    const s = e, i = n, { onNestedDrag: t, onNestedOpenChange: w, onNestedRelease: d } = ee();
    function v() {
      w(!1);
    }
    function D(r) {
      t(r);
    }
    function $(r) {
      r && w(r), i("update:open", r);
    }
    const T = lt(s, i);
    return (r, l) => (F(), ue(St, Qe(N(T), {
      nested: "",
      onClose: v,
      onDrag: D,
      onRelease: N(d),
      "onUpdate:open": $
    }), {
      default: fe(() => [
        se(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["onRelease"]));
  }
}), Bt = /* @__PURE__ */ Z({
  __name: "DrawerOverlay",
  setup(e) {
    const { overlayRef: n, hasSnapPoints: s, isOpen: i, shouldFade: t } = ee();
    return (w, d) => (F(), ue(N(ot), {
      ref_key: "overlayRef",
      ref: n,
      "data-vaul-overlay": "",
      "data-vaul-snap-points": N(i) && N(s) ? "true" : "false",
      "data-vaul-snap-points-overlay": N(i) && N(t) ? "true" : "false"
    }, null, 8, ["data-vaul-snap-points", "data-vaul-snap-points-overlay"]));
  }
}), Dt = () => () => {
};
function bt() {
  const { direction: e, isOpen: n, shouldScaleBackground: s, setBackgroundColorOnScale: i, noBodyStyles: t } = ee(), w = S(null), d = S(document.body.style.backgroundColor);
  function v() {
    return (window.innerWidth - Ce) / window.innerWidth;
  }
  ve((D) => {
    if (n.value && s.value) {
      w.value && clearTimeout(w.value);
      const $ = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!$)
        return;
      ft(
        i.value && !t.value ? de(document.body, { background: "black" }) : Dt,
        de($, {
          transformOrigin: _(e.value) ? "top" : "left",
          transitionProperty: "transform, border-radius",
          transitionDuration: `${O.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
        })
      );
      const T = de($, {
        borderRadius: `${Be}px`,
        overflow: "hidden",
        ..._(e.value) ? {
          transform: `scale(${v()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${v()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      D(() => {
        T(), w.value = window.setTimeout(() => {
          d.value ? document.body.style.background = d.value : document.body.style.removeProperty("background");
        }, O.DURATION * 1e3);
      });
    }
  }, { flush: "pre" });
}
const Ct = /* @__PURE__ */ Z({
  __name: "DrawerContent",
  setup(e) {
    const {
      open: n,
      isOpen: s,
      snapPointsOffset: i,
      hasSnapPoints: t,
      drawerRef: w,
      onPress: d,
      onDrag: v,
      onRelease: D,
      modal: $,
      emitOpenChange: T,
      dismissible: r,
      keyboardIsOpen: l,
      closeDrawer: h,
      direction: m,
      handleOnly: u
    } = ee();
    bt();
    const L = S(!1), H = I(() => i.value && i.value.length > 0 ? `${i.value[0]}px` : "0");
    function p(f) {
      if (!$.value || f.defaultPrevented) {
        f.preventDefault();
        return;
      }
      l.value && (l.value = !1), r.value ? T(!1) : f.preventDefault();
    }
    function a(f) {
      u.value || d(f);
    }
    function c(f) {
      u.value || v(f);
    }
    return ve(() => {
      t.value && window.requestAnimationFrame(() => {
        L.value = !0;
      });
    }), (f, y) => (F(), ue(N(it), {
      ref_key: "drawerRef",
      ref: w,
      "data-vaul-drawer": "",
      "data-vaul-drawer-direction": N(m),
      "data-vaul-delayed-snap-points": L.value ? "true" : "false",
      "data-vaul-snap-points": N(s) && N(t) ? "true" : "false",
      style: Fe({ "--snap-point-height": H.value }),
      onPointerdown: a,
      onPointermove: c,
      onPointerup: N(D),
      onPointerDownOutside: p,
      onOpenAutoFocus: y[0] || (y[0] = Ze(() => {
      }, ["prevent"])),
      onEscapeKeyDown: y[1] || (y[1] = (P) => {
        N(r) || P.preventDefault();
      })
    }, {
      default: fe(() => [
        se(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["data-vaul-drawer-direction", "data-vaul-delayed-snap-points", "data-vaul-snap-points", "style", "onPointerup"]));
  }
}), $t = ["data-vaul-drawer-visible"], Ot = {
  "data-vaul-handle-hitarea": "",
  "aria-hidden": "true"
}, Tt = 250, Pt = 120, Nt = /* @__PURE__ */ Z({
  __name: "DrawerHandle",
  props: {
    preventCycle: { type: Boolean, default: !1 }
  },
  setup(e) {
    const n = e, { onPress: s, onDrag: i, handleRef: t, handleOnly: w, isOpen: d, snapPoints: v, activeSnapPoint: D, isDragging: $, dismissible: T, closeDrawer: r } = ee(), l = S(null), h = S(!1);
    function m() {
      if (h.value) {
        H();
        return;
      }
      window.setTimeout(() => {
        u();
      }, Pt);
    }
    function u() {
      if ($.value || n.preventCycle || h.value) {
        H();
        return;
      }
      if (H(), !v.value || v.value.length === 0) {
        T.value || r();
        return;
      }
      const c = D.value === v.value[v.value.length - 1];
      if (c && T.value) {
        r();
        return;
      }
      const f = v.value.findIndex((P) => P === D.value);
      if (f === -1)
        return;
      const y = c ? 0 : f + 1;
      D.value = v.value[y];
    }
    function L() {
      l.value = window.setTimeout(() => {
        h.value = !0;
      }, Tt);
    }
    function H() {
      l.value && window.clearTimeout(l.value), h.value = !1;
    }
    function p(c) {
      w.value && s(c), L();
    }
    function a(c) {
      w.value && i(c);
    }
    return (c, f) => (F(), et("div", {
      ref_key: "handleRef",
      ref: t,
      "data-vaul-drawer-visible": N(d) ? "true" : "false",
      "data-vaul-handle": "",
      "aria-hidden": "true",
      onClick: m,
      onPointercancel: H,
      onPointerdown: p,
      onPointermove: a
    }, [
      tt("span", Ot, [
        se(c.$slots, "default")
      ])
    ], 40, $t));
  }
});
export {
  Ht as DrawerClose,
  Ct as DrawerContent,
  Ut as DrawerDescription,
  Nt as DrawerHandle,
  Bt as DrawerOverlay,
  Lt as DrawerPortal,
  St as DrawerRoot,
  _t as DrawerRootNested,
  Mt as DrawerTitle,
  kt as DrawerTrigger
};
