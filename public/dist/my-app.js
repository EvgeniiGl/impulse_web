import d2, { useState as l4, StrictMode as a4 } from "react";
import Hb from "react-dom";
var N1 = { exports: {} }, up = {};
var Ab;
function n4() {
  if (Ab) return up;
  Ab = 1;
  var L = /* @__PURE__ */ Symbol.for("react.transitional.element"), Ye = /* @__PURE__ */ Symbol.for("react.fragment");
  function de(x, ue, ve) {
    var Al = null;
    if (ve !== void 0 && (Al = "" + ve), ue.key !== void 0 && (Al = "" + ue.key), "key" in ue) {
      ve = {};
      for (var K in ue)
        K !== "key" && (ve[K] = ue[K]);
    } else ve = ue;
    return ue = ve.ref, {
      $$typeof: L,
      type: x,
      key: Al,
      ref: ue !== void 0 ? ue : null,
      props: ve
    };
  }
  return up.Fragment = Ye, up.jsx = de, up.jsxs = de, up;
}
var cp = {};
var zb;
function u4() {
  return zb || (zb = 1, process.env.NODE_ENV !== "production" && (function() {
    function L(j) {
      if (j == null) return null;
      if (typeof j == "function")
        return j.$$typeof === Ge ? null : j.displayName || j.name || null;
      if (typeof j == "string") return j;
      switch (j) {
        case he:
          return "Fragment";
        case wa:
          return "Profiler";
        case Ft:
          return "StrictMode";
        case Nl:
          return "Suspense";
        case Ke:
          return "SuspenseList";
        case et:
          return "Activity";
      }
      if (typeof j == "object")
        switch (typeof j.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), j.$$typeof) {
          case Bl:
            return "Portal";
          case zl:
            return j.displayName || "Context";
          case je:
            return (j._context.displayName || "Context") + ".Consumer";
          case ga:
            var k = j.render;
            return j = j.displayName, j || (j = k.displayName || k.name || "", j = j !== "" ? "ForwardRef(" + j + ")" : "ForwardRef"), j;
          case Bt:
            return k = j.displayName || null, k !== null ? k : L(j.type) || "Memo";
          case cl:
            k = j._payload, j = j._init;
            try {
              return L(j(k));
            } catch {
            }
        }
      return null;
    }
    function Ye(j) {
      return "" + j;
    }
    function de(j) {
      try {
        Ye(j);
        var k = !1;
      } catch {
        k = !0;
      }
      if (k) {
        k = console;
        var tt = k.error, lt = typeof Symbol == "function" && Symbol.toStringTag && j[Symbol.toStringTag] || j.constructor.name || "Object";
        return tt.call(
          k,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          lt
        ), Ye(j);
      }
    }
    function x(j) {
      if (j === he) return "<>";
      if (typeof j == "object" && j !== null && j.$$typeof === cl)
        return "<...>";
      try {
        var k = L(j);
        return k ? "<" + k + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function ue() {
      var j = _t.A;
      return j === null ? null : j.getOwner();
    }
    function ve() {
      return Error("react-stack-top-frame");
    }
    function Al(j) {
      if (Ot.call(j, "key")) {
        var k = Object.getOwnPropertyDescriptor(j, "key").get;
        if (k && k.isReactWarning) return !1;
      }
      return j.key !== void 0;
    }
    function K(j, k) {
      function tt() {
        O || (O = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          k
        ));
      }
      tt.isReactWarning = !0, Object.defineProperty(j, "key", {
        get: tt,
        configurable: !0
      });
    }
    function Ie() {
      var j = L(this.type);
      return Q[j] || (Q[j] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), j = this.props.ref, j !== void 0 ? j : null;
    }
    function Hl(j, k, tt, lt, Ce, Ja) {
      var me = tt.ref;
      return j = {
        $$typeof: Oe,
        type: j,
        key: k,
        props: tt,
        _owner: lt
      }, (me !== void 0 ? me : null) !== null ? Object.defineProperty(j, "ref", {
        enumerable: !1,
        get: Ie
      }) : Object.defineProperty(j, "ref", { enumerable: !1, value: null }), j._store = {}, Object.defineProperty(j._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(j, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(j, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Ce
      }), Object.defineProperty(j, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Ja
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    }
    function Zn(j, k, tt, lt, Ce, Ja) {
      var me = k.children;
      if (me !== void 0)
        if (lt)
          if (xl(me)) {
            for (lt = 0; lt < me.length; lt++)
              ot(me[lt]);
            Object.freeze && Object.freeze(me);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else ot(me);
      if (Ot.call(k, "key")) {
        me = L(j);
        var Ka = Object.keys(k).filter(function(Jf) {
          return Jf !== "key";
        });
        lt = 0 < Ka.length ? "{key: someKey, " + Ka.join(": ..., ") + ": ...}" : "{key: someKey}", rt[me + lt] || (Ka = 0 < Ka.length ? "{" + Ka.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          lt,
          me,
          Ka,
          me
        ), rt[me + lt] = !0);
      }
      if (me = null, tt !== void 0 && (de(tt), me = "" + tt), Al(k) && (de(k.key), me = "" + k.key), "key" in k) {
        tt = {};
        for (var Sa in k)
          Sa !== "key" && (tt[Sa] = k[Sa]);
      } else tt = k;
      return me && K(
        tt,
        typeof j == "function" ? j.displayName || j.name || "Unknown" : j
      ), Hl(
        j,
        me,
        tt,
        ue(),
        Ce,
        Ja
      );
    }
    function ot(j) {
      xt(j) ? j._store && (j._store.validated = 1) : typeof j == "object" && j !== null && j.$$typeof === cl && (j._payload.status === "fulfilled" ? xt(j._payload.value) && j._payload.value._store && (j._payload.value._store.validated = 1) : j._store && (j._store.validated = 1));
    }
    function xt(j) {
      return typeof j == "object" && j !== null && j.$$typeof === Oe;
    }
    var De = d2, Oe = /* @__PURE__ */ Symbol.for("react.transitional.element"), Bl = /* @__PURE__ */ Symbol.for("react.portal"), he = /* @__PURE__ */ Symbol.for("react.fragment"), Ft = /* @__PURE__ */ Symbol.for("react.strict_mode"), wa = /* @__PURE__ */ Symbol.for("react.profiler"), je = /* @__PURE__ */ Symbol.for("react.consumer"), zl = /* @__PURE__ */ Symbol.for("react.context"), ga = /* @__PURE__ */ Symbol.for("react.forward_ref"), Nl = /* @__PURE__ */ Symbol.for("react.suspense"), Ke = /* @__PURE__ */ Symbol.for("react.suspense_list"), Bt = /* @__PURE__ */ Symbol.for("react.memo"), cl = /* @__PURE__ */ Symbol.for("react.lazy"), et = /* @__PURE__ */ Symbol.for("react.activity"), Ge = /* @__PURE__ */ Symbol.for("react.client.reference"), _t = De.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ot = Object.prototype.hasOwnProperty, xl = Array.isArray, il = console.createTask ? console.createTask : function() {
      return null;
    };
    De = {
      react_stack_bottom_frame: function(j) {
        return j();
      }
    };
    var O, Q = {}, Z = De.react_stack_bottom_frame.bind(
      De,
      ve
    )(), ct = il(x(ve)), rt = {};
    cp.Fragment = he, cp.jsx = function(j, k, tt) {
      var lt = 1e4 > _t.recentlyCreatedOwnerStacks++;
      return Zn(
        j,
        k,
        tt,
        !1,
        lt ? Error("react-stack-top-frame") : Z,
        lt ? il(x(j)) : ct
      );
    }, cp.jsxs = function(j, k, tt) {
      var lt = 1e4 > _t.recentlyCreatedOwnerStacks++;
      return Zn(
        j,
        k,
        tt,
        !0,
        lt ? Error("react-stack-top-frame") : Z,
        lt ? il(x(j)) : ct
      );
    };
  })()), cp;
}
var Db;
function c4() {
  return Db || (Db = 1, process.env.NODE_ENV === "production" ? N1.exports = n4() : N1.exports = u4()), N1.exports;
}
var La = c4(), x1 = { exports: {} }, ip = {}, q1 = { exports: {} }, s2 = {};
var Ob;
function i4() {
  return Ob || (Ob = 1, (function(L) {
    function Ye(O, Q) {
      var Z = O.length;
      O.push(Q);
      t: for (; 0 < Z; ) {
        var ct = Z - 1 >>> 1, rt = O[ct];
        if (0 < ue(rt, Q))
          O[ct] = Q, O[Z] = rt, Z = ct;
        else break t;
      }
    }
    function de(O) {
      return O.length === 0 ? null : O[0];
    }
    function x(O) {
      if (O.length === 0) return null;
      var Q = O[0], Z = O.pop();
      if (Z !== Q) {
        O[0] = Z;
        t: for (var ct = 0, rt = O.length, j = rt >>> 1; ct < j; ) {
          var k = 2 * (ct + 1) - 1, tt = O[k], lt = k + 1, Ce = O[lt];
          if (0 > ue(tt, Z))
            lt < rt && 0 > ue(Ce, tt) ? (O[ct] = Ce, O[lt] = Z, ct = lt) : (O[ct] = tt, O[k] = Z, ct = k);
          else if (lt < rt && 0 > ue(Ce, Z))
            O[ct] = Ce, O[lt] = Z, ct = lt;
          else break t;
        }
      }
      return Q;
    }
    function ue(O, Q) {
      var Z = O.sortIndex - Q.sortIndex;
      return Z !== 0 ? Z : O.id - Q.id;
    }
    if (L.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var ve = performance;
      L.unstable_now = function() {
        return ve.now();
      };
    } else {
      var Al = Date, K = Al.now();
      L.unstable_now = function() {
        return Al.now() - K;
      };
    }
    var Ie = [], Hl = [], Zn = 1, ot = null, xt = 3, De = !1, Oe = !1, Bl = !1, he = !1, Ft = typeof setTimeout == "function" ? setTimeout : null, wa = typeof clearTimeout == "function" ? clearTimeout : null, je = typeof setImmediate < "u" ? setImmediate : null;
    function zl(O) {
      for (var Q = de(Hl); Q !== null; ) {
        if (Q.callback === null) x(Hl);
        else if (Q.startTime <= O)
          x(Hl), Q.sortIndex = Q.expirationTime, Ye(Ie, Q);
        else break;
        Q = de(Hl);
      }
    }
    function ga(O) {
      if (Bl = !1, zl(O), !Oe)
        if (de(Ie) !== null)
          Oe = !0, Nl || (Nl = !0, _t());
        else {
          var Q = de(Hl);
          Q !== null && il(ga, Q.startTime - O);
        }
    }
    var Nl = !1, Ke = -1, Bt = 5, cl = -1;
    function et() {
      return he ? !0 : !(L.unstable_now() - cl < Bt);
    }
    function Ge() {
      if (he = !1, Nl) {
        var O = L.unstable_now();
        cl = O;
        var Q = !0;
        try {
          t: {
            Oe = !1, Bl && (Bl = !1, wa(Ke), Ke = -1), De = !0;
            var Z = xt;
            try {
              e: {
                for (zl(O), ot = de(Ie); ot !== null && !(ot.expirationTime > O && et()); ) {
                  var ct = ot.callback;
                  if (typeof ct == "function") {
                    ot.callback = null, xt = ot.priorityLevel;
                    var rt = ct(
                      ot.expirationTime <= O
                    );
                    if (O = L.unstable_now(), typeof rt == "function") {
                      ot.callback = rt, zl(O), Q = !0;
                      break e;
                    }
                    ot === de(Ie) && x(Ie), zl(O);
                  } else x(Ie);
                  ot = de(Ie);
                }
                if (ot !== null) Q = !0;
                else {
                  var j = de(Hl);
                  j !== null && il(
                    ga,
                    j.startTime - O
                  ), Q = !1;
                }
              }
              break t;
            } finally {
              ot = null, xt = Z, De = !1;
            }
            Q = void 0;
          }
        } finally {
          Q ? _t() : Nl = !1;
        }
      }
    }
    var _t;
    if (typeof je == "function")
      _t = function() {
        je(Ge);
      };
    else if (typeof MessageChannel < "u") {
      var Ot = new MessageChannel(), xl = Ot.port2;
      Ot.port1.onmessage = Ge, _t = function() {
        xl.postMessage(null);
      };
    } else
      _t = function() {
        Ft(Ge, 0);
      };
    function il(O, Q) {
      Ke = Ft(function() {
        O(L.unstable_now());
      }, Q);
    }
    L.unstable_IdlePriority = 5, L.unstable_ImmediatePriority = 1, L.unstable_LowPriority = 4, L.unstable_NormalPriority = 3, L.unstable_Profiling = null, L.unstable_UserBlockingPriority = 2, L.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, L.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Bt = 0 < O ? Math.floor(1e3 / O) : 5;
    }, L.unstable_getCurrentPriorityLevel = function() {
      return xt;
    }, L.unstable_next = function(O) {
      switch (xt) {
        case 1:
        case 2:
        case 3:
          var Q = 3;
          break;
        default:
          Q = xt;
      }
      var Z = xt;
      xt = Q;
      try {
        return O();
      } finally {
        xt = Z;
      }
    }, L.unstable_requestPaint = function() {
      he = !0;
    }, L.unstable_runWithPriority = function(O, Q) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var Z = xt;
      xt = O;
      try {
        return Q();
      } finally {
        xt = Z;
      }
    }, L.unstable_scheduleCallback = function(O, Q, Z) {
      var ct = L.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ct + Z : ct) : Z = ct, O) {
        case 1:
          var rt = -1;
          break;
        case 2:
          rt = 250;
          break;
        case 5:
          rt = 1073741823;
          break;
        case 4:
          rt = 1e4;
          break;
        default:
          rt = 5e3;
      }
      return rt = Z + rt, O = {
        id: Zn++,
        callback: Q,
        priorityLevel: O,
        startTime: Z,
        expirationTime: rt,
        sortIndex: -1
      }, Z > ct ? (O.sortIndex = Z, Ye(Hl, O), de(Ie) === null && O === de(Hl) && (Bl ? (wa(Ke), Ke = -1) : Bl = !0, il(ga, Z - ct))) : (O.sortIndex = rt, Ye(Ie, O), Oe || De || (Oe = !0, Nl || (Nl = !0, _t()))), O;
    }, L.unstable_shouldYield = et, L.unstable_wrapCallback = function(O) {
      var Q = xt;
      return function() {
        var Z = xt;
        xt = Q;
        try {
          return O.apply(this, arguments);
        } finally {
          xt = Z;
        }
      };
    };
  })(s2)), s2;
}
var r2 = {};
var Mb;
function o4() {
  return Mb || (Mb = 1, (function(L) {
    process.env.NODE_ENV !== "production" && (function() {
      function Ye() {
        if (ga = !1, cl) {
          var O = L.unstable_now();
          _t = O;
          var Q = !0;
          try {
            t: {
              je = !1, zl && (zl = !1, Ke(et), et = -1), wa = !0;
              var Z = Ft;
              try {
                e: {
                  for (Al(O), he = x(De); he !== null && !(he.expirationTime > O && Ie()); ) {
                    var ct = he.callback;
                    if (typeof ct == "function") {
                      he.callback = null, Ft = he.priorityLevel;
                      var rt = ct(
                        he.expirationTime <= O
                      );
                      if (O = L.unstable_now(), typeof rt == "function") {
                        he.callback = rt, Al(O), Q = !0;
                        break e;
                      }
                      he === x(De) && ue(De), Al(O);
                    } else ue(De);
                    he = x(De);
                  }
                  if (he !== null) Q = !0;
                  else {
                    var j = x(Oe);
                    j !== null && Hl(
                      K,
                      j.startTime - O
                    ), Q = !1;
                  }
                }
                break t;
              } finally {
                he = null, Ft = Z, wa = !1;
              }
              Q = void 0;
            }
          } finally {
            Q ? Ot() : cl = !1;
          }
        }
      }
      function de(O, Q) {
        var Z = O.length;
        O.push(Q);
        t: for (; 0 < Z; ) {
          var ct = Z - 1 >>> 1, rt = O[ct];
          if (0 < ve(rt, Q))
            O[ct] = Q, O[Z] = rt, Z = ct;
          else break t;
        }
      }
      function x(O) {
        return O.length === 0 ? null : O[0];
      }
      function ue(O) {
        if (O.length === 0) return null;
        var Q = O[0], Z = O.pop();
        if (Z !== Q) {
          O[0] = Z;
          t: for (var ct = 0, rt = O.length, j = rt >>> 1; ct < j; ) {
            var k = 2 * (ct + 1) - 1, tt = O[k], lt = k + 1, Ce = O[lt];
            if (0 > ve(tt, Z))
              lt < rt && 0 > ve(Ce, tt) ? (O[ct] = Ce, O[lt] = Z, ct = lt) : (O[ct] = tt, O[k] = Z, ct = k);
            else if (lt < rt && 0 > ve(Ce, Z))
              O[ct] = Ce, O[lt] = Z, ct = lt;
            else break t;
          }
        }
        return Q;
      }
      function ve(O, Q) {
        var Z = O.sortIndex - Q.sortIndex;
        return Z !== 0 ? Z : O.id - Q.id;
      }
      function Al(O) {
        for (var Q = x(Oe); Q !== null; ) {
          if (Q.callback === null) ue(Oe);
          else if (Q.startTime <= O)
            ue(Oe), Q.sortIndex = Q.expirationTime, de(De, Q);
          else break;
          Q = x(Oe);
        }
      }
      function K(O) {
        if (zl = !1, Al(O), !je)
          if (x(De) !== null)
            je = !0, cl || (cl = !0, Ot());
          else {
            var Q = x(Oe);
            Q !== null && Hl(
              K,
              Q.startTime - O
            );
          }
      }
      function Ie() {
        return ga ? !0 : !(L.unstable_now() - _t < Ge);
      }
      function Hl(O, Q) {
        et = Nl(function() {
          O(L.unstable_now());
        }, Q);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), L.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var Zn = performance;
        L.unstable_now = function() {
          return Zn.now();
        };
      } else {
        var ot = Date, xt = ot.now();
        L.unstable_now = function() {
          return ot.now() - xt;
        };
      }
      var De = [], Oe = [], Bl = 1, he = null, Ft = 3, wa = !1, je = !1, zl = !1, ga = !1, Nl = typeof setTimeout == "function" ? setTimeout : null, Ke = typeof clearTimeout == "function" ? clearTimeout : null, Bt = typeof setImmediate < "u" ? setImmediate : null, cl = !1, et = -1, Ge = 5, _t = -1;
      if (typeof Bt == "function")
        var Ot = function() {
          Bt(Ye);
        };
      else if (typeof MessageChannel < "u") {
        var xl = new MessageChannel(), il = xl.port2;
        xl.port1.onmessage = Ye, Ot = function() {
          il.postMessage(null);
        };
      } else
        Ot = function() {
          Nl(Ye, 0);
        };
      L.unstable_IdlePriority = 5, L.unstable_ImmediatePriority = 1, L.unstable_LowPriority = 4, L.unstable_NormalPriority = 3, L.unstable_Profiling = null, L.unstable_UserBlockingPriority = 2, L.unstable_cancelCallback = function(O) {
        O.callback = null;
      }, L.unstable_forceFrameRate = function(O) {
        0 > O || 125 < O ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : Ge = 0 < O ? Math.floor(1e3 / O) : 5;
      }, L.unstable_getCurrentPriorityLevel = function() {
        return Ft;
      }, L.unstable_next = function(O) {
        switch (Ft) {
          case 1:
          case 2:
          case 3:
            var Q = 3;
            break;
          default:
            Q = Ft;
        }
        var Z = Ft;
        Ft = Q;
        try {
          return O();
        } finally {
          Ft = Z;
        }
      }, L.unstable_requestPaint = function() {
        ga = !0;
      }, L.unstable_runWithPriority = function(O, Q) {
        switch (O) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            O = 3;
        }
        var Z = Ft;
        Ft = O;
        try {
          return Q();
        } finally {
          Ft = Z;
        }
      }, L.unstable_scheduleCallback = function(O, Q, Z) {
        var ct = L.unstable_now();
        switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ct + Z : ct) : Z = ct, O) {
          case 1:
            var rt = -1;
            break;
          case 2:
            rt = 250;
            break;
          case 5:
            rt = 1073741823;
            break;
          case 4:
            rt = 1e4;
            break;
          default:
            rt = 5e3;
        }
        return rt = Z + rt, O = {
          id: Bl++,
          callback: Q,
          priorityLevel: O,
          startTime: Z,
          expirationTime: rt,
          sortIndex: -1
        }, Z > ct ? (O.sortIndex = Z, de(Oe, O), x(De) === null && O === x(Oe) && (zl ? (Ke(et), et = -1) : zl = !0, Hl(K, Z - ct))) : (O.sortIndex = rt, de(De, O), je || wa || (je = !0, cl || (cl = !0, Ot()))), O;
      }, L.unstable_shouldYield = Ie, L.unstable_wrapCallback = function(O) {
        var Q = Ft;
        return function() {
          var Z = Ft;
          Ft = Q;
          try {
            return O.apply(this, arguments);
          } finally {
            Ft = Z;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  })(r2)), r2;
}
var Rb;
function Bb() {
  return Rb || (Rb = 1, process.env.NODE_ENV === "production" ? q1.exports = i4() : q1.exports = o4()), q1.exports;
}
var Ub;
function f4() {
  if (Ub) return ip;
  Ub = 1;
  var L = Bb(), Ye = d2, de = Hb;
  function x(l) {
    var n = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        n += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function ue(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function ve(l) {
    var n = l, u = l;
    if (l.alternate) for (; n.return; ) n = n.return;
    else {
      l = n;
      do
        n = l, (n.flags & 4098) !== 0 && (u = n.return), l = n.return;
      while (l);
    }
    return n.tag === 3 ? u : null;
  }
  function Al(l) {
    if (l.tag === 13) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function K(l) {
    if (l.tag === 31) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function Ie(l) {
    if (ve(l) !== l)
      throw Error(x(188));
  }
  function Hl(l) {
    var n = l.alternate;
    if (!n) {
      if (n = ve(l), n === null) throw Error(x(188));
      return n !== l ? null : l;
    }
    for (var u = l, i = n; ; ) {
      var s = u.return;
      if (s === null) break;
      var r = s.alternate;
      if (r === null) {
        if (i = s.return, i !== null) {
          u = i;
          continue;
        }
        break;
      }
      if (s.child === r.child) {
        for (r = s.child; r; ) {
          if (r === u) return Ie(s), l;
          if (r === i) return Ie(s), n;
          r = r.sibling;
        }
        throw Error(x(188));
      }
      if (u.return !== i.return) u = s, i = r;
      else {
        for (var m = !1, v = s.child; v; ) {
          if (v === u) {
            m = !0, u = s, i = r;
            break;
          }
          if (v === i) {
            m = !0, i = s, u = r;
            break;
          }
          v = v.sibling;
        }
        if (!m) {
          for (v = r.child; v; ) {
            if (v === u) {
              m = !0, u = r, i = s;
              break;
            }
            if (v === i) {
              m = !0, i = r, u = s;
              break;
            }
            v = v.sibling;
          }
          if (!m) throw Error(x(189));
        }
      }
      if (u.alternate !== i) throw Error(x(190));
    }
    if (u.tag !== 3) throw Error(x(188));
    return u.stateNode.current === u ? l : n;
  }
  function Zn(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l;
    for (l = l.child; l !== null; ) {
      if (n = Zn(l), n !== null) return n;
      l = l.sibling;
    }
    return null;
  }
  var ot = Object.assign, xt = /* @__PURE__ */ Symbol.for("react.element"), De = /* @__PURE__ */ Symbol.for("react.transitional.element"), Oe = /* @__PURE__ */ Symbol.for("react.portal"), Bl = /* @__PURE__ */ Symbol.for("react.fragment"), he = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ft = /* @__PURE__ */ Symbol.for("react.profiler"), wa = /* @__PURE__ */ Symbol.for("react.consumer"), je = /* @__PURE__ */ Symbol.for("react.context"), zl = /* @__PURE__ */ Symbol.for("react.forward_ref"), ga = /* @__PURE__ */ Symbol.for("react.suspense"), Nl = /* @__PURE__ */ Symbol.for("react.suspense_list"), Ke = /* @__PURE__ */ Symbol.for("react.memo"), Bt = /* @__PURE__ */ Symbol.for("react.lazy"), cl = /* @__PURE__ */ Symbol.for("react.activity"), et = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ge = Symbol.iterator;
  function _t(l) {
    return l === null || typeof l != "object" ? null : (l = Ge && l[Ge] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ot = /* @__PURE__ */ Symbol.for("react.client.reference");
  function xl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ot ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Bl:
        return "Fragment";
      case Ft:
        return "Profiler";
      case he:
        return "StrictMode";
      case ga:
        return "Suspense";
      case Nl:
        return "SuspenseList";
      case cl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Oe:
          return "Portal";
        case je:
          return l.displayName || "Context";
        case wa:
          return (l._context.displayName || "Context") + ".Consumer";
        case zl:
          var n = l.render;
          return l = l.displayName, l || (l = n.displayName || n.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Ke:
          return n = l.displayName || null, n !== null ? n : xl(l.type) || "Memo";
        case Bt:
          n = l._payload, l = l._init;
          try {
            return xl(l(n));
          } catch {
          }
      }
    return null;
  }
  var il = Array.isArray, O = Ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ct = [], rt = -1;
  function j(l) {
    return { current: l };
  }
  function k(l) {
    0 > rt || (l.current = ct[rt], ct[rt] = null, rt--);
  }
  function tt(l, n) {
    rt++, ct[rt] = l.current, l.current = n;
  }
  var lt = j(null), Ce = j(null), Ja = j(null), me = j(null);
  function Ka(l, n) {
    switch (tt(Ja, n), tt(Ce, l), tt(lt, null), n.nodeType) {
      case 9:
      case 11:
        l = (l = n.documentElement) && (l = l.namespaceURI) ? Dv(l) : 0;
        break;
      default:
        if (l = n.tagName, n = n.namespaceURI)
          n = Dv(n), l = ty(n, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    k(lt), tt(lt, l);
  }
  function Sa() {
    k(lt), k(Ce), k(Ja);
  }
  function Jf(l) {
    l.memoizedState !== null && tt(me, l);
    var n = lt.current, u = ty(n, l.type);
    n !== u && (tt(Ce, l), tt(lt, u));
  }
  function W(l) {
    Ce.current === l && (k(lt), k(Ce)), me.current === l && (k(me), or._currentValue = Z);
  }
  var Kf, $f;
  function Ln(l) {
    if (Kf === void 0)
      try {
        throw Error();
      } catch (u) {
        var n = u.stack.trim().match(/\n( *(at )?)/);
        Kf = n && n[1] || "", $f = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Kf + l + $f;
  }
  var ti = !1;
  function It(l, n) {
    if (!l || ti) return "";
    ti = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var X = function() {
                throw Error();
              };
              if (Object.defineProperty(X.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(X, []);
                } catch (N) {
                  var _ = N;
                }
                Reflect.construct(l, [], X);
              } else {
                try {
                  X.call();
                } catch (N) {
                  _ = N;
                }
                l.call(X.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                _ = N;
              }
              (X = l()) && typeof X.catch == "function" && X.catch(function() {
              });
            }
          } catch (N) {
            if (N && _ && typeof N.stack == "string")
              return [N.stack, _.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = i.DetermineComponentFrameRoot(), m = r[0], v = r[1];
      if (m && v) {
        var T = m.split(`
`), U = v.split(`
`);
        for (s = i = 0; i < T.length && !T[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; s < U.length && !U[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (i === T.length || s === U.length)
          for (i = T.length - 1, s = U.length - 1; 1 <= i && 0 <= s && T[i] !== U[s]; )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (T[i] !== U[s]) {
            if (i !== 1 || s !== 1)
              do
                if (i--, s--, 0 > s || T[i] !== U[s]) {
                  var q = `
` + T[i].replace(" at new ", " at ");
                  return l.displayName && q.includes("<anonymous>") && (q = q.replace("<anonymous>", l.displayName)), q;
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      ti = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Ln(u) : "";
  }
  function u0(l, n) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ln(l.type);
      case 16:
        return Ln("Lazy");
      case 13:
        return l.child !== n && n !== null ? Ln("Suspense Fallback") : Ln("Suspense");
      case 19:
        return Ln("SuspenseList");
      case 0:
      case 15:
        return It(l.type, !1);
      case 11:
        return It(l.type.render, !1);
      case 1:
        return It(l.type, !0);
      case 31:
        return Ln("Activity");
      default:
        return "";
    }
  }
  function xr(l) {
    try {
      var n = "", u = null;
      do
        n += u0(l, u), u = l, l = l.return;
      while (l);
      return n;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var c0 = Object.prototype.hasOwnProperty, ce = L.unstable_scheduleCallback, i0 = L.unstable_cancelCallback, ei = L.unstable_shouldYield, qr = L.unstable_requestPaint, Dl = L.unstable_now, Y1 = L.unstable_getCurrentPriorityLevel, Yr = L.unstable_ImmediatePriority, jr = L.unstable_UserBlockingPriority, dc = L.unstable_NormalPriority, j1 = L.unstable_LowPriority, o0 = L.unstable_IdlePriority, fp = L.log, sp = L.unstable_setDisableYieldValue, li = null, oa = null;
  function xu(l) {
    if (typeof fp == "function" && sp(l), oa && typeof oa.setStrictMode == "function")
      try {
        oa.setStrictMode(li, l);
      } catch {
      }
  }
  var Ll = Math.clz32 ? Math.clz32 : f0, rp = Math.log, dp = Math.LN2;
  function f0(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (rp(l) / dp | 0) | 0;
  }
  var qu = 256, dn = 262144, hc = 4194304;
  function $a(l) {
    var n = l & 42;
    if (n !== 0) return n;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Xe(l, n, u) {
    var i = l.pendingLanes;
    if (i === 0) return 0;
    var s = 0, r = l.suspendedLanes, m = l.pingedLanes;
    l = l.warmLanes;
    var v = i & 134217727;
    return v !== 0 ? (i = v & ~r, i !== 0 ? s = $a(i) : (m &= v, m !== 0 ? s = $a(m) : u || (u = v & ~l, u !== 0 && (s = $a(u))))) : (v = i & ~r, v !== 0 ? s = $a(v) : m !== 0 ? s = $a(m) : u || (u = i & ~l, u !== 0 && (s = $a(u)))), s === 0 ? 0 : n !== 0 && n !== s && (n & r) === 0 && (r = s & -s, u = n & -n, r >= u || r === 32 && (u & 4194048) !== 0) ? n : s;
  }
  function hn(l, n) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & n) === 0;
  }
  function ho(l, n) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ai() {
    var l = hc;
    return hc <<= 1, (hc & 62914560) === 0 && (hc = 4194304), l;
  }
  function Wf(l) {
    for (var n = [], u = 0; 31 > u; u++) n.push(l);
    return n;
  }
  function mo(l, n) {
    l.pendingLanes |= n, n !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Gr(l, n, u, i, s, r) {
    var m = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var v = l.entanglements, T = l.expirationTimes, U = l.hiddenUpdates;
    for (u = m & ~u; 0 < u; ) {
      var q = 31 - Ll(u), X = 1 << q;
      v[q] = 0, T[q] = -1;
      var _ = U[q];
      if (_ !== null)
        for (U[q] = null, q = 0; q < _.length; q++) {
          var N = _[q];
          N !== null && (N.lane &= -536870913);
        }
      u &= ~X;
    }
    i !== 0 && kf(l, i, 0), r !== 0 && s === 0 && l.tag !== 0 && (l.suspendedLanes |= r & ~(m & ~n));
  }
  function kf(l, n, u) {
    l.pendingLanes |= n, l.suspendedLanes &= ~n;
    var i = 31 - Ll(n);
    l.entangledLanes |= n, l.entanglements[i] = l.entanglements[i] | 1073741824 | u & 261930;
  }
  function wn(l, n) {
    var u = l.entangledLanes |= n;
    for (l = l.entanglements; u; ) {
      var i = 31 - Ll(u), s = 1 << i;
      s & n | l[i] & n && (l[i] |= n), u &= ~s;
    }
  }
  function ba(l, n) {
    var u = n & -n;
    return u = (u & 42) !== 0 ? 1 : Xr(u), (u & (l.suspendedLanes | n)) !== 0 ? 0 : u;
  }
  function Xr(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function s0(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Qr() {
    var l = Q.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : fr(l.type));
  }
  function r0(l, n) {
    var u = Q.p;
    try {
      return Q.p = l, n();
    } finally {
      Q.p = u;
    }
  }
  var mn = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + mn, wl = "__reactProps$" + mn, mc = "__reactContainer$" + mn, Vr = "__reactEvents$" + mn, d0 = "__reactListeners$" + mn, hp = "__reactHandles$" + mn, h0 = "__reactResources$" + mn, Jn = "__reactMarker$" + mn;
  function Zr(l) {
    delete l[Pt], delete l[wl], delete l[Vr], delete l[d0], delete l[hp];
  }
  function ni(l) {
    var n = l[Pt];
    if (n) return n;
    for (var u = l.parentNode; u; ) {
      if (n = u[mc] || u[Pt]) {
        if (u = n.alternate, n.child !== null || u !== null && u.child !== null)
          for (l = xn(l); l !== null; ) {
            if (u = l[Pt]) return u;
            l = xn(l);
          }
        return n;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function ui(l) {
    if (l = l[Pt] || l[mc]) {
      var n = l.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return l;
    }
    return null;
  }
  function yo(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l.stateNode;
    throw Error(x(33));
  }
  function ci(l) {
    var n = l[h0];
    return n || (n = l[h0] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Jt(l) {
    l[Jn] = !0;
  }
  var ii = /* @__PURE__ */ new Set(), yc = {};
  function pc(l, n) {
    Kn(l, n), Kn(l + "Capture", n);
  }
  function Kn(l, n) {
    for (yc[l] = n, l = 0; l < n.length; l++)
      ii.add(n[l]);
  }
  var Lr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), wr = {}, po = {};
  function vo(l) {
    return c0.call(po, l) ? !0 : c0.call(wr, l) ? !1 : Lr.test(l) ? po[l] = !0 : (wr[l] = !0, !1);
  }
  function go(l, n, u) {
    if (vo(n))
      if (u === null) l.removeAttribute(n);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(n);
            return;
          case "boolean":
            var i = n.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              l.removeAttribute(n);
              return;
            }
        }
        l.setAttribute(n, "" + u);
      }
  }
  function Jr(l, n, u) {
    if (u === null) l.removeAttribute(n);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(n);
          return;
      }
      l.setAttribute(n, "" + u);
    }
  }
  function Yu(l, n, u, i) {
    if (i === null) l.removeAttribute(u);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(n, u, "" + i);
    }
  }
  function Ta(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Kr(l) {
    var n = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function m0(l, n, u) {
    var i = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      n
    );
    if (!l.hasOwnProperty(n) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var s = i.get, r = i.set;
      return Object.defineProperty(l, n, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(m) {
          u = "" + m, r.call(this, m);
        }
      }), Object.defineProperty(l, n, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return u;
        },
        setValue: function(m) {
          u = "" + m;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[n];
        }
      };
    }
  }
  function $r(l) {
    if (!l._valueTracker) {
      var n = Kr(l) ? "checked" : "value";
      l._valueTracker = m0(
        l,
        n,
        "" + l[n]
      );
    }
  }
  function y0(l) {
    if (!l) return !1;
    var n = l._valueTracker;
    if (!n) return !0;
    var u = n.getValue(), i = "";
    return l && (i = Kr(l) ? l.checked ? "true" : "false" : l.value), l = i, l !== u ? (n.setValue(l), !0) : !1;
  }
  function Ff(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var G1 = /[\n"\\]/g;
  function Ea(l) {
    return l.replace(
      G1,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function If(l, n, u, i, s, r, m, v) {
    l.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? l.type = m : l.removeAttribute("type"), n != null ? m === "number" ? (n === 0 && l.value === "" || l.value != n) && (l.value = "" + Ta(n)) : l.value !== "" + Ta(n) && (l.value = "" + Ta(n)) : m !== "submit" && m !== "reset" || l.removeAttribute("value"), n != null ? oi(l, m, Ta(n)) : u != null ? oi(l, m, Ta(u)) : i != null && l.removeAttribute("value"), s == null && r != null && (l.defaultChecked = !!r), s != null && (l.checked = s && typeof s != "function" && typeof s != "symbol"), v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? l.name = "" + Ta(v) : l.removeAttribute("name");
  }
  function Pf(l, n, u, i, s, r, m, v) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (l.type = r), n != null || u != null) {
      if (!(r !== "submit" && r !== "reset" || n != null)) {
        $r(l);
        return;
      }
      u = u != null ? "" + Ta(u) : "", n = n != null ? "" + Ta(n) : u, v || n === l.value || (l.value = n), l.defaultValue = n;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, l.checked = v ? l.checked : !!i, l.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (l.name = m), $r(l);
  }
  function oi(l, n, u) {
    n === "number" && Ff(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function So(l, n, u, i) {
    if (l = l.options, n) {
      n = {};
      for (var s = 0; s < u.length; s++)
        n["$" + u[s]] = !0;
      for (u = 0; u < l.length; u++)
        s = n.hasOwnProperty("$" + l[u].value), l[u].selected !== s && (l[u].selected = s), s && i && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + Ta(u), n = null, s = 0; s < l.length; s++) {
        if (l[s].value === u) {
          l[s].selected = !0, i && (l[s].defaultSelected = !0);
          return;
        }
        n !== null || l[s].disabled || (n = l[s]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function p0(l, n, u) {
    if (n != null && (n = "" + Ta(n), n !== l.value && (l.value = n), u == null)) {
      l.defaultValue !== n && (l.defaultValue = n);
      return;
    }
    l.defaultValue = u != null ? "" + Ta(u) : "";
  }
  function v0(l, n, u, i) {
    if (n == null) {
      if (i != null) {
        if (u != null) throw Error(x(92));
        if (il(i)) {
          if (1 < i.length) throw Error(x(93));
          i = i[0];
        }
        u = i;
      }
      u == null && (u = ""), n = u;
    }
    u = Ta(n), l.defaultValue = u, i = l.textContent, i === u && i !== "" && i !== null && (l.value = i), $r(l);
  }
  function $n(l, n) {
    if (n) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = n;
        return;
      }
    }
    l.textContent = n;
  }
  var mp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function yp(l, n, u) {
    var i = n.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? i ? l.setProperty(n, "") : n === "float" ? l.cssFloat = "" : l[n] = "" : i ? l.setProperty(n, u) : typeof u != "number" || u === 0 || mp.has(n) ? n === "float" ? l.cssFloat = u : l[n] = ("" + u).trim() : l[n] = u + "px";
  }
  function pp(l, n, u) {
    if (n != null && typeof n != "object")
      throw Error(x(62));
    if (l = l.style, u != null) {
      for (var i in u)
        !u.hasOwnProperty(i) || n != null && n.hasOwnProperty(i) || (i.indexOf("--") === 0 ? l.setProperty(i, "") : i === "float" ? l.cssFloat = "" : l[i] = "");
      for (var s in n)
        i = n[s], n.hasOwnProperty(s) && u[s] !== i && yp(l, s, i);
    } else
      for (var r in n)
        n.hasOwnProperty(r) && yp(l, r, n[r]);
  }
  function g0(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var X1 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), ts = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Wa(l) {
    return ts.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function yn() {
  }
  var Wr = null;
  function kr(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Wn = null, fi = null;
  function es(l) {
    var n = ui(l);
    if (n && (l = n.stateNode)) {
      var u = l[wl] || null;
      t: switch (l = n.stateNode, n.type) {
        case "input":
          if (If(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), n = u.name, u.type === "radio" && n != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + Ea(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < u.length; n++) {
              var i = u[n];
              if (i !== l && i.form === l.form) {
                var s = i[wl] || null;
                if (!s) throw Error(x(90));
                If(
                  i,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (n = 0; n < u.length; n++)
              i = u[n], i.form === l.form && y0(i);
          }
          break t;
        case "textarea":
          p0(l, u.value, u.defaultValue);
          break t;
        case "select":
          n = u.value, n != null && So(l, !!u.multiple, n, !1);
      }
    }
  }
  var bo = !1;
  function S0(l, n, u) {
    if (bo) return l(n, u);
    bo = !0;
    try {
      var i = l(n);
      return i;
    } finally {
      if (bo = !1, (Wn !== null || fi !== null) && (lf(), Wn && (n = Wn, l = fi, fi = Wn = null, es(n), l)))
        for (n = 0; n < l.length; n++) es(l[n]);
    }
  }
  function ol(l, n) {
    var u = l.stateNode;
    if (u === null) return null;
    var i = u[wl] || null;
    if (i === null) return null;
    u = i[n];
    t: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (i = !i.disabled) || (l = l.type, i = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !i;
        break t;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        x(231, n, typeof u)
      );
    return u;
  }
  var ju = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ls = !1;
  if (ju)
    try {
      var To = {};
      Object.defineProperty(To, "passive", {
        get: function() {
          ls = !0;
        }
      }), window.addEventListener("test", To, To), window.removeEventListener("test", To, To);
    } catch {
      ls = !1;
    }
  var Gu = null, b0 = null, Fr = null;
  function T0() {
    if (Fr) return Fr;
    var l, n = b0, u = n.length, i, s = "value" in Gu ? Gu.value : Gu.textContent, r = s.length;
    for (l = 0; l < u && n[l] === s[l]; l++) ;
    var m = u - l;
    for (i = 1; i <= m && n[u - i] === s[r - i]; i++) ;
    return Fr = s.slice(l, 1 < i ? 1 - i : void 0);
  }
  function Ir(l) {
    var n = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && n === 13 && (l = 13)) : l = n, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function as() {
    return !0;
  }
  function vp() {
    return !1;
  }
  function Ol(l) {
    function n(u, i, s, r, m) {
      this._reactName = u, this._targetInst = s, this.type = i, this.nativeEvent = r, this.target = m, this.currentTarget = null;
      for (var v in l)
        l.hasOwnProperty(v) && (u = l[v], this[v] = u ? u(r) : r[v]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? as : vp, this.isPropagationStopped = vp, this;
    }
    return ot(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = as);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = as);
      },
      persist: function() {
      },
      isPersistent: as
    }), n;
  }
  var vc = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ns = Ol(vc), Eo = ot({}, vc, { view: 0, detail: 0 }), Q1 = Ol(Eo), E0, A0, us, Pr = ot({}, Eo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ka,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== us && (us && l.type === "mousemove" ? (E0 = l.screenX - us.screenX, A0 = l.screenY - us.screenY) : A0 = E0 = 0, us = l), E0);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : A0;
    }
  }), Ao = Ol(Pr), gp = ot({}, Pr, { dataTransfer: 0 }), Sp = Ol(gp), bp = ot({}, Eo, { relatedTarget: 0 }), td = Ol(bp), z0 = ot({}, vc, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Tp = Ol(z0), si = ot({}, vc, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), ri = Ol(si), pn = ot({}, vc, { data: 0 }), Ep = Ol(pn), D0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, kn = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Ap = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vn(l) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(l) : (l = Ap[l]) ? !!n[l] : !1;
  }
  function ka() {
    return vn;
  }
  var ed = ot({}, Eo, {
    key: function(l) {
      if (l.key) {
        var n = D0[l.key] || l.key;
        if (n !== "Unidentified") return n;
      }
      return l.type === "keypress" ? (l = Ir(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? kn[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ka,
    charCode: function(l) {
      return l.type === "keypress" ? Ir(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Ir(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), ld = Ol(ed), O0 = ot({}, Pr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), gn = Ol(O0), V1 = ot({}, Eo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ka
  }), zp = Ol(V1), Dp = ot({}, vc, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Z1 = Ol(Dp), M0 = ot({}, Pr, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), L1 = Ol(M0), Op = ot({}, vc, {
    newState: 0,
    oldState: 0
  }), R0 = Ol(Op), ad = [9, 13, 27, 32], zo = ju && "CompositionEvent" in window, di = null;
  ju && "documentMode" in document && (di = document.documentMode);
  var ql = ju && "TextEvent" in window && !di, U0 = ju && (!zo || di && 8 < di && 11 >= di), cs = " ", gc = !1;
  function nd(l, n) {
    switch (l) {
      case "keyup":
        return ad.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function _0(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var hi = !1;
  function Mp(l, n) {
    switch (l) {
      case "compositionend":
        return _0(n);
      case "keypress":
        return n.which !== 32 ? null : (gc = !0, cs);
      case "textInput":
        return l = n.data, l === cs && gc ? null : l;
      default:
        return null;
    }
  }
  function w1(l, n) {
    if (hi)
      return l === "compositionend" || !zo && nd(l, n) ? (l = T0(), Fr = b0 = Gu = null, hi = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return U0 && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var C0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Fn(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n === "input" ? !!C0[l.type] : n === "textarea";
  }
  function H0(l, n, u, i) {
    Wn ? fi ? fi.push(i) : fi = [i] : Wn = i, n = lr(n, "onChange"), 0 < n.length && (u = new ns(
      "onChange",
      "change",
      null,
      u,
      i
    ), l.push({ event: u, listeners: n }));
  }
  var mi = null, Sc = null;
  function yi(l) {
    Ev(l, 0);
  }
  function Do(l) {
    var n = yo(l);
    if (y0(n)) return l;
  }
  function B0(l, n) {
    if (l === "change") return n;
  }
  var ud = !1;
  if (ju) {
    var Jl;
    if (ju) {
      var Sn = "oninput" in document;
      if (!Sn) {
        var N0 = document.createElement("div");
        N0.setAttribute("oninput", "return;"), Sn = typeof N0.oninput == "function";
      }
      Jl = Sn;
    } else Jl = !1;
    ud = Jl && (!document.documentMode || 9 < document.documentMode);
  }
  function cd() {
    mi && (mi.detachEvent("onpropertychange", id), Sc = mi = null);
  }
  function id(l) {
    if (l.propertyName === "value" && Do(Sc)) {
      var n = [];
      H0(
        n,
        Sc,
        l,
        kr(l)
      ), S0(yi, n);
    }
  }
  function Rp(l, n, u) {
    l === "focusin" ? (cd(), mi = n, Sc = u, mi.attachEvent("onpropertychange", id)) : l === "focusout" && cd();
  }
  function Up(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Do(Sc);
  }
  function bc(l, n) {
    if (l === "click") return Do(n);
  }
  function pi(l, n) {
    if (l === "input" || l === "change")
      return Do(n);
  }
  function _p(l, n) {
    return l === n && (l !== 0 || 1 / l === 1 / n) || l !== l && n !== n;
  }
  var Yl = typeof Object.is == "function" ? Object.is : _p;
  function Fa(l, n) {
    if (Yl(l, n)) return !0;
    if (typeof l != "object" || l === null || typeof n != "object" || n === null)
      return !1;
    var u = Object.keys(l), i = Object.keys(n);
    if (u.length !== i.length) return !1;
    for (i = 0; i < u.length; i++) {
      var s = u[i];
      if (!c0.call(n, s) || !Yl(l[s], n[s]))
        return !1;
    }
    return !0;
  }
  function x0(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function q0(l, n) {
    var u = x0(l);
    l = 0;
    for (var i; u; ) {
      if (u.nodeType === 3) {
        if (i = l + u.textContent.length, l <= n && i >= n)
          return { node: u, offset: n - l };
        l = i;
      }
      t: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break t;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = x0(u);
    }
  }
  function vi(l, n) {
    return l && n ? l === n ? !0 : l && l.nodeType === 3 ? !1 : n && n.nodeType === 3 ? vi(l, n.parentNode) : "contains" in l ? l.contains(n) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Tc(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var n = Ff(l.document); n instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof n.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = n.contentWindow;
      else break;
      n = Ff(l.document);
    }
    return n;
  }
  function is(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n && (n === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || n === "textarea" || l.contentEditable === "true");
  }
  var os = ju && "documentMode" in document && 11 >= document.documentMode, Ec = null, Oo = null, Ia = null, bn = !1;
  function od(l, n, u) {
    var i = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    bn || Ec == null || Ec !== Ff(i) || (i = Ec, "selectionStart" in i && is(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Ia && Fa(Ia, i) || (Ia = i, i = lr(Oo, "onSelect"), 0 < i.length && (n = new ns(
      "onSelect",
      "select",
      null,
      n,
      u
    ), l.push({ event: n, listeners: i }), n.target = Ec)));
  }
  function Xu(l, n) {
    var u = {};
    return u[l.toLowerCase()] = n.toLowerCase(), u["Webkit" + l] = "webkit" + n, u["Moz" + l] = "moz" + n, u;
  }
  var Tn = {
    animationend: Xu("Animation", "AnimationEnd"),
    animationiteration: Xu("Animation", "AnimationIteration"),
    animationstart: Xu("Animation", "AnimationStart"),
    transitionrun: Xu("Transition", "TransitionRun"),
    transitionstart: Xu("Transition", "TransitionStart"),
    transitioncancel: Xu("Transition", "TransitionCancel"),
    transitionend: Xu("Transition", "TransitionEnd")
  }, Mo = {}, Ac = {};
  ju && (Ac = document.createElement("div").style, "AnimationEvent" in window || (delete Tn.animationend.animation, delete Tn.animationiteration.animation, delete Tn.animationstart.animation), "TransitionEvent" in window || delete Tn.transitionend.transition);
  function Zt(l) {
    if (Mo[l]) return Mo[l];
    if (!Tn[l]) return l;
    var n = Tn[l], u;
    for (u in n)
      if (n.hasOwnProperty(u) && u in Ac)
        return Mo[l] = n[u];
    return l;
  }
  var fs = Zt("animationend"), Y0 = Zt("animationiteration"), fd = Zt("animationstart"), gi = Zt("transitionrun"), ss = Zt("transitionstart"), In = Zt("transitioncancel"), Cp = Zt("transitionend"), Pn = /* @__PURE__ */ new Map(), Ro = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ro.push("scrollEnd");
  function Kl(l, n) {
    Pn.set(l, n), pc(n, [l]);
  }
  var Si = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, ge = [], fl = 0, Pa = 0;
  function Aa() {
    for (var l = fl, n = Pa = fl = 0; n < l; ) {
      var u = ge[n];
      ge[n++] = null;
      var i = ge[n];
      ge[n++] = null;
      var s = ge[n];
      ge[n++] = null;
      var r = ge[n];
      if (ge[n++] = null, i !== null && s !== null) {
        var m = i.pending;
        m === null ? s.next = s : (s.next = m.next, m.next = s), i.pending = s;
      }
      r !== 0 && sd(u, s, r);
    }
  }
  function za(l, n, u, i) {
    ge[fl++] = l, ge[fl++] = n, ge[fl++] = u, ge[fl++] = i, Pa |= i, l.lanes |= i, l = l.alternate, l !== null && (l.lanes |= i);
  }
  function tn(l, n, u, i) {
    return za(l, n, u, i), rs(l);
  }
  function Qu(l, n) {
    return za(l, null, null, n), rs(l);
  }
  function sd(l, n, u) {
    l.lanes |= u;
    var i = l.alternate;
    i !== null && (i.lanes |= u);
    for (var s = !1, r = l.return; r !== null; )
      r.childLanes |= u, i = r.alternate, i !== null && (i.childLanes |= u), r.tag === 22 && (l = r.stateNode, l === null || l._visibility & 1 || (s = !0)), l = r, r = r.return;
    return l.tag === 3 ? (r = l.stateNode, s && n !== null && (s = 31 - Ll(u), l = r.hiddenUpdates, i = l[s], i === null ? l[s] = [n] : i.push(n), n.lane = u | 536870912), r) : null;
  }
  function rs(l) {
    if (50 < ef)
      throw ef = 0, Ks = null, Error(x(185));
    for (var n = l.return; n !== null; )
      l = n, n = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var $l = {};
  function Hp(l, n, u, i) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function He(l, n, u, i) {
    return new Hp(l, n, u, i);
  }
  function bi(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Vu(l, n) {
    var u = l.alternate;
    return u === null ? (u = He(
      l.tag,
      n,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = n, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, n = l.dependencies, u.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function j0(l, n) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = n, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, n = u.dependencies, l.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), l;
  }
  function rd(l, n, u, i, s, r) {
    var m = 0;
    if (i = l, typeof l == "function") bi(l) && (m = 1);
    else if (typeof l == "string")
      m = iy(
        l,
        u,
        lt.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      t: switch (l) {
        case cl:
          return l = He(31, u, n, s), l.elementType = cl, l.lanes = r, l;
        case Bl:
          return Zu(u.children, s, r, n);
        case he:
          m = 8, s |= 24;
          break;
        case Ft:
          return l = He(12, u, n, s | 2), l.elementType = Ft, l.lanes = r, l;
        case ga:
          return l = He(13, u, n, s), l.elementType = ga, l.lanes = r, l;
        case Nl:
          return l = He(19, u, n, s), l.elementType = Nl, l.lanes = r, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case je:
                m = 10;
                break t;
              case wa:
                m = 9;
                break t;
              case zl:
                m = 11;
                break t;
              case Ke:
                m = 14;
                break t;
              case Bt:
                m = 16, i = null;
                break t;
            }
          m = 29, u = Error(
            x(130, l === null ? "null" : typeof l, "")
          ), i = null;
      }
    return n = He(m, u, n, s), n.elementType = l, n.type = i, n.lanes = r, n;
  }
  function Zu(l, n, u, i) {
    return l = He(7, l, i, n), l.lanes = u, l;
  }
  function Uo(l, n, u) {
    return l = He(6, l, null, n), l.lanes = u, l;
  }
  function G0(l) {
    var n = He(18, null, null, 0);
    return n.stateNode = l, n;
  }
  function dd(l, n, u) {
    return n = He(
      4,
      l.children !== null ? l.children : [],
      l.key,
      n
    ), n.lanes = u, n.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, n;
  }
  var X0 = /* @__PURE__ */ new WeakMap();
  function Da(l, n) {
    if (typeof l == "object" && l !== null) {
      var u = X0.get(l);
      return u !== void 0 ? u : (n = {
        value: l,
        source: n,
        stack: xr(n)
      }, X0.set(l, n), n);
    }
    return {
      value: l,
      source: n,
      stack: xr(n)
    };
  }
  var Oa = [], Ti = 0, ds = null, Qe = 0, fa = [], Wl = 0, En = null, sa = 1, An = "";
  function en(l, n) {
    Oa[Ti++] = Qe, Oa[Ti++] = ds, ds = l, Qe = n;
  }
  function Q0(l, n, u) {
    fa[Wl++] = sa, fa[Wl++] = An, fa[Wl++] = En, En = l;
    var i = sa;
    l = An;
    var s = 32 - Ll(i) - 1;
    i &= ~(1 << s), u += 1;
    var r = 32 - Ll(n) + s;
    if (30 < r) {
      var m = s - s % 5;
      r = (i & (1 << m) - 1).toString(32), i >>= m, s -= m, sa = 1 << 32 - Ll(n) + s | u << s | i, An = r + l;
    } else
      sa = 1 << r | u << s | i, An = l;
  }
  function _o(l) {
    l.return !== null && (en(l, 1), Q0(l, 1, 0));
  }
  function hd(l) {
    for (; l === ds; )
      ds = Oa[--Ti], Oa[Ti] = null, Qe = Oa[--Ti], Oa[Ti] = null;
    for (; l === En; )
      En = fa[--Wl], fa[Wl] = null, An = fa[--Wl], fa[Wl] = null, sa = fa[--Wl], fa[Wl] = null;
  }
  function hs(l, n) {
    fa[Wl++] = sa, fa[Wl++] = An, fa[Wl++] = En, sa = n.id, An = n.overflow, En = l;
  }
  var sl = null, ie = null, Ct = !1, tu = null, Pe = !1, eu = Error(x(519));
  function ln(l) {
    var n = Error(
      x(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ho(Da(n, l)), eu;
  }
  function ms(l) {
    var n = l.stateNode, u = l.type, i = l.memoizedProps;
    switch (n[Pt] = l, n[wl] = i, u) {
      case "dialog":
        Ut("cancel", n), Ut("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ut("load", n);
        break;
      case "video":
      case "audio":
        for (u = 0; u < of.length; u++)
          Ut(of[u], n);
        break;
      case "source":
        Ut("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ut("error", n), Ut("load", n);
        break;
      case "details":
        Ut("toggle", n);
        break;
      case "input":
        Ut("invalid", n), Pf(
          n,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        Ut("invalid", n);
        break;
      case "textarea":
        Ut("invalid", n), v0(n, i.value, i.defaultValue, i.children);
    }
    u = i.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || n.textContent === "" + u || i.suppressHydrationWarning === !0 || km(n.textContent, u) ? (i.popover != null && (Ut("beforetoggle", n), Ut("toggle", n)), i.onScroll != null && Ut("scroll", n), i.onScrollEnd != null && Ut("scrollend", n), i.onClick != null && (n.onclick = yn), n = !0) : n = !1, n || ln(l, !0);
  }
  function Co(l) {
    for (sl = l.return; sl; )
      switch (sl.tag) {
        case 5:
        case 31:
        case 13:
          Pe = !1;
          return;
        case 27:
        case 3:
          Pe = !0;
          return;
        default:
          sl = sl.return;
      }
  }
  function lu(l) {
    if (l !== sl) return !1;
    if (!Ct) return Co(l), Ct = !0, !1;
    var n = l.tag, u;
    if ((u = n !== 3 && n !== 27) && ((u = n === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || sf(l.type, l.memoizedProps)), u = !u), u && ie && ln(l), Co(l), n === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(x(317));
      ie = ph(l);
    } else if (n === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(x(317));
      ie = ph(l);
    } else
      n === 27 ? (n = ie, Nn(l.type) ? (l = ur, ur = null, ie = l) : ie = n) : ie = sl ? ua(l.stateNode.nextSibling) : null;
    return !0;
  }
  function zc() {
    ie = sl = null, Ct = !1;
  }
  function V0() {
    var l = tu;
    return l !== null && (Ue === null ? Ue = l : Ue.push.apply(
      Ue,
      l
    ), tu = null), l;
  }
  function Ho(l) {
    tu === null ? tu = [l] : tu.push(l);
  }
  var md = j(null), Lu = null, zn = null;
  function kl(l, n, u) {
    tt(md, n._currentValue), n._currentValue = u;
  }
  function Dn(l) {
    l._currentValue = md.current, k(md);
  }
  function yd(l, n, u) {
    for (; l !== null; ) {
      var i = l.alternate;
      if ((l.childLanes & n) !== n ? (l.childLanes |= n, i !== null && (i.childLanes |= n)) : i !== null && (i.childLanes & n) !== n && (i.childLanes |= n), l === u) break;
      l = l.return;
    }
  }
  function au(l, n, u, i) {
    var s = l.child;
    for (s !== null && (s.return = l); s !== null; ) {
      var r = s.dependencies;
      if (r !== null) {
        var m = s.child;
        r = r.firstContext;
        t: for (; r !== null; ) {
          var v = r;
          r = s;
          for (var T = 0; T < n.length; T++)
            if (v.context === n[T]) {
              r.lanes |= u, v = r.alternate, v !== null && (v.lanes |= u), yd(
                r.return,
                u,
                l
              ), i || (m = null);
              break t;
            }
          r = v.next;
        }
      } else if (s.tag === 18) {
        if (m = s.return, m === null) throw Error(x(341));
        m.lanes |= u, r = m.alternate, r !== null && (r.lanes |= u), yd(m, u, l), m = null;
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === l) {
            m = null;
            break;
          }
          if (s = m.sibling, s !== null) {
            s.return = m.return, m = s;
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function rl(l, n, u, i) {
    l = null;
    for (var s = n, r = !1; s !== null; ) {
      if (!r) {
        if ((s.flags & 524288) !== 0) r = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(x(387));
        if (m = m.memoizedProps, m !== null) {
          var v = s.type;
          Yl(s.pendingProps.value, m.value) || (l !== null ? l.push(v) : l = [v]);
        }
      } else if (s === me.current) {
        if (m = s.alternate, m === null) throw Error(x(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState && (l !== null ? l.push(or) : l = [or]);
      }
      s = s.return;
    }
    l !== null && au(
      n,
      l,
      u,
      i
    ), n.flags |= 262144;
  }
  function Ei(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!Yl(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function mt(l) {
    Lu = l, zn = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function V(l) {
    return ys(Lu, l);
  }
  function wu(l, n) {
    return Lu === null && mt(l), ys(l, n);
  }
  function ys(l, n) {
    var u = n._currentValue;
    if (n = { context: n, memoizedValue: u, next: null }, zn === null) {
      if (l === null) throw Error(x(308));
      zn = n, l.dependencies = { lanes: 0, firstContext: n }, l.flags |= 524288;
    } else zn = zn.next = n;
    return u;
  }
  var Be = typeof AbortController < "u" ? AbortController : function() {
    var l = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(u, i) {
        l.push(i);
      }
    };
    this.abort = function() {
      n.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, Z0 = L.unstable_scheduleCallback, L0 = L.unstable_NormalPriority, Ve = {
    $$typeof: je,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ps() {
    return {
      controller: new Be(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function vs(l) {
    l.refCount--, l.refCount === 0 && Z0(L0, function() {
      l.controller.abort();
    });
  }
  var Ai = null, gs = 0, Dc = 0, $e = null;
  function Kt(l, n) {
    if (Ai === null) {
      var u = Ai = [];
      gs = 0, Dc = oh(), $e = {
        status: "pending",
        value: void 0,
        then: function(i) {
          u.push(i);
        }
      };
    }
    return gs++, n.then(Ss, Ss), n;
  }
  function Ss() {
    if (--gs === 0 && Ai !== null) {
      $e !== null && ($e.status = "fulfilled");
      var l = Ai;
      Ai = null, Dc = 0, $e = null;
      for (var n = 0; n < l.length; n++) (0, l[n])();
    }
  }
  function bs(l, n) {
    var u = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        u.push(s);
      }
    };
    return l.then(
      function() {
        i.status = "fulfilled", i.value = n;
        for (var s = 0; s < u.length; s++) (0, u[s])(n);
      },
      function(s) {
        for (i.status = "rejected", i.reason = s, s = 0; s < u.length; s++)
          (0, u[s])(void 0);
      }
    ), i;
  }
  var Ju = O.S;
  O.S = function(l, n) {
    Ym = Dl(), typeof n == "object" && n !== null && typeof n.then == "function" && Kt(l, n), Ju !== null && Ju(l, n);
  };
  var Ma = j(null);
  function Ra() {
    var l = Ma.current;
    return l !== null ? l : ee.pooledCache;
  }
  function Bo(l, n) {
    n === null ? tt(Ma, Ma.current) : tt(Ma, n.pool);
  }
  function zi() {
    var l = Ra();
    return l === null ? null : { parent: Ve._currentValue, pool: l };
  }
  var Oc = Error(x(460)), Di = Error(x(474)), No = Error(x(542)), Oi = { then: function() {
  } };
  function w0(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function J0(l, n, u) {
    switch (u = l[u], u === void 0 ? l.push(n) : u !== n && (n.then(yn, yn), n = u), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw l = n.reason, pd(l), l;
      default:
        if (typeof n.status == "string") n.then(yn, yn);
        else {
          if (l = ee, l !== null && 100 < l.shellSuspendCounter)
            throw Error(x(482));
          l = n, l.status = "pending", l.then(
            function(i) {
              if (n.status === "pending") {
                var s = n;
                s.status = "fulfilled", s.value = i;
              }
            },
            function(i) {
              if (n.status === "pending") {
                var s = n;
                s.status = "rejected", s.reason = i;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw l = n.reason, pd(l), l;
        }
        throw Rc = n, Oc;
    }
  }
  function Mc(l) {
    try {
      var n = l._init;
      return n(l._payload);
    } catch (u) {
      throw u !== null && typeof u == "object" && typeof u.then == "function" ? (Rc = u, Oc) : u;
    }
  }
  var Rc = null;
  function K0() {
    if (Rc === null) throw Error(x(459));
    var l = Rc;
    return Rc = null, l;
  }
  function pd(l) {
    if (l === Oc || l === No)
      throw Error(x(483));
  }
  var Uc = null, Mi = 0;
  function Ts(l) {
    var n = Mi;
    return Mi += 1, Uc === null && (Uc = []), J0(Uc, l, n);
  }
  function xo(l, n) {
    n = n.props.ref, l.ref = n !== void 0 ? n : null;
  }
  function Es(l, n) {
    throw n.$$typeof === xt ? Error(x(525)) : (l = Object.prototype.toString.call(n), Error(
      x(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l
      )
    ));
  }
  function Bp(l) {
    function n(M, z) {
      if (l) {
        var R = M.deletions;
        R === null ? (M.deletions = [z], M.flags |= 16) : R.push(z);
      }
    }
    function u(M, z) {
      if (!l) return null;
      for (; z !== null; )
        n(M, z), z = z.sibling;
      return null;
    }
    function i(M) {
      for (var z = /* @__PURE__ */ new Map(); M !== null; )
        M.key !== null ? z.set(M.key, M) : z.set(M.index, M), M = M.sibling;
      return z;
    }
    function s(M, z) {
      return M = Vu(M, z), M.index = 0, M.sibling = null, M;
    }
    function r(M, z, R) {
      return M.index = R, l ? (R = M.alternate, R !== null ? (R = R.index, R < z ? (M.flags |= 67108866, z) : R) : (M.flags |= 67108866, z)) : (M.flags |= 1048576, z);
    }
    function m(M) {
      return l && M.alternate === null && (M.flags |= 67108866), M;
    }
    function v(M, z, R, G) {
      return z === null || z.tag !== 6 ? (z = Uo(R, M.mode, G), z.return = M, z) : (z = s(z, R), z.return = M, z);
    }
    function T(M, z, R, G) {
      var at = R.type;
      return at === Bl ? q(
        M,
        z,
        R.props.children,
        G,
        R.key
      ) : z !== null && (z.elementType === at || typeof at == "object" && at !== null && at.$$typeof === Bt && Mc(at) === z.type) ? (z = s(z, R.props), xo(z, R), z.return = M, z) : (z = rd(
        R.type,
        R.key,
        R.props,
        null,
        M.mode,
        G
      ), xo(z, R), z.return = M, z);
    }
    function U(M, z, R, G) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== R.containerInfo || z.stateNode.implementation !== R.implementation ? (z = dd(R, M.mode, G), z.return = M, z) : (z = s(z, R.children || []), z.return = M, z);
    }
    function q(M, z, R, G, at) {
      return z === null || z.tag !== 7 ? (z = Zu(
        R,
        M.mode,
        G,
        at
      ), z.return = M, z) : (z = s(z, R), z.return = M, z);
    }
    function X(M, z, R) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = Uo(
          "" + z,
          M.mode,
          R
        ), z.return = M, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case De:
            return R = rd(
              z.type,
              z.key,
              z.props,
              null,
              M.mode,
              R
            ), xo(R, z), R.return = M, R;
          case Oe:
            return z = dd(
              z,
              M.mode,
              R
            ), z.return = M, z;
          case Bt:
            return z = Mc(z), X(M, z, R);
        }
        if (il(z) || _t(z))
          return z = Zu(
            z,
            M.mode,
            R,
            null
          ), z.return = M, z;
        if (typeof z.then == "function")
          return X(M, Ts(z), R);
        if (z.$$typeof === je)
          return X(
            M,
            wu(M, z),
            R
          );
        Es(M, z);
      }
      return null;
    }
    function _(M, z, R, G) {
      var at = z !== null ? z.key : null;
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return at !== null ? null : v(M, z, "" + R, G);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case De:
            return R.key === at ? T(M, z, R, G) : null;
          case Oe:
            return R.key === at ? U(M, z, R, G) : null;
          case Bt:
            return R = Mc(R), _(M, z, R, G);
        }
        if (il(R) || _t(R))
          return at !== null ? null : q(M, z, R, G, null);
        if (typeof R.then == "function")
          return _(
            M,
            z,
            Ts(R),
            G
          );
        if (R.$$typeof === je)
          return _(
            M,
            z,
            wu(M, R),
            G
          );
        Es(M, R);
      }
      return null;
    }
    function N(M, z, R, G, at) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return M = M.get(R) || null, v(z, M, "" + G, at);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case De:
            return M = M.get(
              G.key === null ? R : G.key
            ) || null, T(z, M, G, at);
          case Oe:
            return M = M.get(
              G.key === null ? R : G.key
            ) || null, U(z, M, G, at);
          case Bt:
            return G = Mc(G), N(
              M,
              z,
              R,
              G,
              at
            );
        }
        if (il(G) || _t(G))
          return M = M.get(R) || null, q(z, M, G, at, null);
        if (typeof G.then == "function")
          return N(
            M,
            z,
            R,
            Ts(G),
            at
          );
        if (G.$$typeof === je)
          return N(
            M,
            z,
            R,
            wu(z, G),
            at
          );
        Es(z, G);
      }
      return null;
    }
    function F(M, z, R, G) {
      for (var at = null, Gt = null, I = z, vt = z = 0, bt = null; I !== null && vt < R.length; vt++) {
        I.index > vt ? (bt = I, I = null) : bt = I.sibling;
        var Vt = _(
          M,
          I,
          R[vt],
          G
        );
        if (Vt === null) {
          I === null && (I = bt);
          break;
        }
        l && I && Vt.alternate === null && n(M, I), z = r(Vt, z, vt), Gt === null ? at = Vt : Gt.sibling = Vt, Gt = Vt, I = bt;
      }
      if (vt === R.length)
        return u(M, I), Ct && en(M, vt), at;
      if (I === null) {
        for (; vt < R.length; vt++)
          I = X(M, R[vt], G), I !== null && (z = r(
            I,
            z,
            vt
          ), Gt === null ? at = I : Gt.sibling = I, Gt = I);
        return Ct && en(M, vt), at;
      }
      for (I = i(I); vt < R.length; vt++)
        bt = N(
          I,
          M,
          vt,
          R[vt],
          G
        ), bt !== null && (l && bt.alternate !== null && I.delete(
          bt.key === null ? vt : bt.key
        ), z = r(
          bt,
          z,
          vt
        ), Gt === null ? at = bt : Gt.sibling = bt, Gt = bt);
      return l && I.forEach(function(Yn) {
        return n(M, Yn);
      }), Ct && en(M, vt), at;
    }
    function it(M, z, R, G) {
      if (R == null) throw Error(x(151));
      for (var at = null, Gt = null, I = z, vt = z = 0, bt = null, Vt = R.next(); I !== null && !Vt.done; vt++, Vt = R.next()) {
        I.index > vt ? (bt = I, I = null) : bt = I.sibling;
        var Yn = _(M, I, Vt.value, G);
        if (Yn === null) {
          I === null && (I = bt);
          break;
        }
        l && I && Yn.alternate === null && n(M, I), z = r(Yn, z, vt), Gt === null ? at = Yn : Gt.sibling = Yn, Gt = Yn, I = bt;
      }
      if (Vt.done)
        return u(M, I), Ct && en(M, vt), at;
      if (I === null) {
        for (; !Vt.done; vt++, Vt = R.next())
          Vt = X(M, Vt.value, G), Vt !== null && (z = r(Vt, z, vt), Gt === null ? at = Vt : Gt.sibling = Vt, Gt = Vt);
        return Ct && en(M, vt), at;
      }
      for (I = i(I); !Vt.done; vt++, Vt = R.next())
        Vt = N(I, M, vt, Vt.value, G), Vt !== null && (l && Vt.alternate !== null && I.delete(Vt.key === null ? vt : Vt.key), z = r(Vt, z, vt), Gt === null ? at = Vt : Gt.sibling = Vt, Gt = Vt);
      return l && I.forEach(function(Yv) {
        return n(M, Yv);
      }), Ct && en(M, vt), at;
    }
    function ae(M, z, R, G) {
      if (typeof R == "object" && R !== null && R.type === Bl && R.key === null && (R = R.props.children), typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case De:
            t: {
              for (var at = R.key; z !== null; ) {
                if (z.key === at) {
                  if (at = R.type, at === Bl) {
                    if (z.tag === 7) {
                      u(
                        M,
                        z.sibling
                      ), G = s(
                        z,
                        R.props.children
                      ), G.return = M, M = G;
                      break t;
                    }
                  } else if (z.elementType === at || typeof at == "object" && at !== null && at.$$typeof === Bt && Mc(at) === z.type) {
                    u(
                      M,
                      z.sibling
                    ), G = s(z, R.props), xo(G, R), G.return = M, M = G;
                    break t;
                  }
                  u(M, z);
                  break;
                } else n(M, z);
                z = z.sibling;
              }
              R.type === Bl ? (G = Zu(
                R.props.children,
                M.mode,
                G,
                R.key
              ), G.return = M, M = G) : (G = rd(
                R.type,
                R.key,
                R.props,
                null,
                M.mode,
                G
              ), xo(G, R), G.return = M, M = G);
            }
            return m(M);
          case Oe:
            t: {
              for (at = R.key; z !== null; ) {
                if (z.key === at)
                  if (z.tag === 4 && z.stateNode.containerInfo === R.containerInfo && z.stateNode.implementation === R.implementation) {
                    u(
                      M,
                      z.sibling
                    ), G = s(z, R.children || []), G.return = M, M = G;
                    break t;
                  } else {
                    u(M, z);
                    break;
                  }
                else n(M, z);
                z = z.sibling;
              }
              G = dd(R, M.mode, G), G.return = M, M = G;
            }
            return m(M);
          case Bt:
            return R = Mc(R), ae(
              M,
              z,
              R,
              G
            );
        }
        if (il(R))
          return F(
            M,
            z,
            R,
            G
          );
        if (_t(R)) {
          if (at = _t(R), typeof at != "function") throw Error(x(150));
          return R = at.call(R), it(
            M,
            z,
            R,
            G
          );
        }
        if (typeof R.then == "function")
          return ae(
            M,
            z,
            Ts(R),
            G
          );
        if (R.$$typeof === je)
          return ae(
            M,
            z,
            wu(M, R),
            G
          );
        Es(M, R);
      }
      return typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint" ? (R = "" + R, z !== null && z.tag === 6 ? (u(M, z.sibling), G = s(z, R), G.return = M, M = G) : (u(M, z), G = Uo(R, M.mode, G), G.return = M, M = G), m(M)) : u(M, z);
    }
    return function(M, z, R, G) {
      try {
        Mi = 0;
        var at = ae(
          M,
          z,
          R,
          G
        );
        return Uc = null, at;
      } catch (I) {
        if (I === Oc || I === No) throw I;
        var Gt = He(29, I, null, M.mode);
        return Gt.lanes = G, Gt.return = M, Gt;
      }
    };
  }
  var _c = Bp(!0), $0 = Bp(!1), Ku = !1;
  function As(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function vd(l, n) {
    l = l.updateQueue, n.updateQueue === l && (n.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function $u(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Ua(l, n, u) {
    var i = l.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Qt & 2) !== 0) {
      var s = i.pending;
      return s === null ? n.next = n : (n.next = s.next, s.next = n), i.pending = n, n = rs(l), sd(l, null, u), n;
    }
    return za(l, i, n, u), rs(l);
  }
  function Cc(l, n, u) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (u & 4194048) !== 0)) {
      var i = n.lanes;
      i &= l.pendingLanes, u |= i, n.lanes = u, wn(l, u);
    }
  }
  function gd(l, n) {
    var u = l.updateQueue, i = l.alternate;
    if (i !== null && (i = i.updateQueue, u === i)) {
      var s = null, r = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var m = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          r === null ? s = r = m : r = r.next = m, u = u.next;
        } while (u !== null);
        r === null ? s = r = n : r = r.next = n;
      } else s = r = n;
      u = {
        baseState: i.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: r,
        shared: i.shared,
        callbacks: i.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = n : l.next = n, u.lastBaseUpdate = n;
  }
  var W0 = !1;
  function Hc() {
    if (W0) {
      var l = $e;
      if (l !== null) throw l;
    }
  }
  function nu(l, n, u, i) {
    W0 = !1;
    var s = l.updateQueue;
    Ku = !1;
    var r = s.firstBaseUpdate, m = s.lastBaseUpdate, v = s.shared.pending;
    if (v !== null) {
      s.shared.pending = null;
      var T = v, U = T.next;
      T.next = null, m === null ? r = U : m.next = U, m = T;
      var q = l.alternate;
      q !== null && (q = q.updateQueue, v = q.lastBaseUpdate, v !== m && (v === null ? q.firstBaseUpdate = U : v.next = U, q.lastBaseUpdate = T));
    }
    if (r !== null) {
      var X = s.baseState;
      m = 0, q = U = T = null, v = r;
      do {
        var _ = v.lane & -536870913, N = _ !== v.lane;
        if (N ? (Mt & _) === _ : (i & _) === _) {
          _ !== 0 && _ === Dc && (W0 = !0), q !== null && (q = q.next = {
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: null,
            next: null
          });
          t: {
            var F = l, it = v;
            _ = n;
            var ae = u;
            switch (it.tag) {
              case 1:
                if (F = it.payload, typeof F == "function") {
                  X = F.call(ae, X, _);
                  break t;
                }
                X = F;
                break t;
              case 3:
                F.flags = F.flags & -65537 | 128;
              case 0:
                if (F = it.payload, _ = typeof F == "function" ? F.call(ae, X, _) : F, _ == null) break t;
                X = ot({}, X, _);
                break t;
              case 2:
                Ku = !0;
            }
          }
          _ = v.callback, _ !== null && (l.flags |= 64, N && (l.flags |= 8192), N = s.callbacks, N === null ? s.callbacks = [_] : N.push(_));
        } else
          N = {
            lane: _,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, q === null ? (U = q = N, T = X) : q = q.next = N, m |= _;
        if (v = v.next, v === null) {
          if (v = s.shared.pending, v === null)
            break;
          N = v, v = N.next, N.next = null, s.lastBaseUpdate = N, s.shared.pending = null;
        }
      } while (!0);
      q === null && (T = X), s.baseState = T, s.firstBaseUpdate = U, s.lastBaseUpdate = q, r === null && (s.shared.lanes = 0), Hn |= m, l.lanes = m, l.memoizedState = X;
    }
  }
  function Sd(l, n) {
    if (typeof l != "function")
      throw Error(x(191, l));
    l.call(n);
  }
  function Bc(l, n) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Sd(u[l], n);
  }
  var tl = j(null), Ri = j(0);
  function Np(l, n) {
    l = Cn, tt(Ri, l), tt(tl, n), Cn = l | n.baseLanes;
  }
  function zs() {
    tt(Ri, Cn), tt(tl, tl.current);
  }
  function qo() {
    Cn = Ri.current, k(tl), k(Ri);
  }
  var Fl = j(null), _a = null;
  function uu(l) {
    var n = l.alternate;
    tt(Se, Se.current & 1), tt(Fl, l), _a === null && (n === null || tl.current !== null || n.memoizedState !== null) && (_a = l);
  }
  function Yo(l) {
    tt(Se, Se.current), tt(Fl, l), _a === null && (_a = l);
  }
  function bd(l) {
    l.tag === 22 ? (tt(Se, Se.current), tt(Fl, l), _a === null && (_a = l)) : On();
  }
  function On() {
    tt(Se, Se.current), tt(Fl, Fl.current);
  }
  function Il(l) {
    k(Fl), _a === l && (_a = null), k(Se);
  }
  var Se = j(0);
  function jo(l) {
    for (var n = l; n !== null; ) {
      if (n.tag === 13) {
        var u = n.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || cn(u) || wc(u)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === l) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === l) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var cu = 0, gt = null, $t = null, Ze = null, Ui = !1, _i = !1, Wu = !1, Ds = 0, Go = 0, Nc = null, xp = 0;
  function Me() {
    throw Error(x(321));
  }
  function ku(l, n) {
    if (n === null) return !1;
    for (var u = 0; u < n.length && u < l.length; u++)
      if (!Yl(l[u], n[u])) return !1;
    return !0;
  }
  function Os(l, n, u, i, s, r) {
    return cu = r, gt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, O.H = l === null || l.memoizedState === null ? Zp : Yd, Wu = !1, r = u(i, s), Wu = !1, _i && (r = qp(
      n,
      u,
      i,
      s
    )), Td(l), r;
  }
  function Td(l) {
    O.H = xs;
    var n = $t !== null && $t.next !== null;
    if (cu = 0, Ze = $t = gt = null, Ui = !1, Go = 0, Nc = null, n) throw Error(x(300));
    l === null || Le || (l = l.dependencies, l !== null && Ei(l) && (Le = !0));
  }
  function qp(l, n, u, i) {
    gt = l;
    var s = 0;
    do {
      if (_i && (Nc = null), Go = 0, _i = !1, 25 <= s) throw Error(x(301));
      if (s += 1, Ze = $t = null, l.updateQueue != null) {
        var r = l.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      O.H = Lp, r = n(u, i);
    } while (_i);
    return r;
  }
  function J1() {
    var l = O.H, n = l.useState()[0];
    return n = typeof n.then == "function" ? Hi(n) : n, l = l.useState()[0], ($t !== null ? $t.memoizedState : null) !== l && (gt.flags |= 1024), n;
  }
  function Ed() {
    var l = Ds !== 0;
    return Ds = 0, l;
  }
  function Ci(l, n, u) {
    n.updateQueue = l.updateQueue, n.flags &= -2053, l.lanes &= ~u;
  }
  function Ms(l) {
    if (Ui) {
      for (l = l.memoizedState; l !== null; ) {
        var n = l.queue;
        n !== null && (n.pending = null), l = l.next;
      }
      Ui = !1;
    }
    cu = 0, Ze = $t = gt = null, _i = !1, Go = Ds = 0, Nc = null;
  }
  function dl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ze === null ? gt.memoizedState = Ze = l : Ze = Ze.next = l, Ze;
  }
  function Ne() {
    if ($t === null) {
      var l = gt.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = $t.next;
    var n = Ze === null ? gt.memoizedState : Ze.next;
    if (n !== null)
      Ze = n, $t = l;
    else {
      if (l === null)
        throw gt.alternate === null ? Error(x(467)) : Error(x(310));
      $t = l, l = {
        memoizedState: $t.memoizedState,
        baseState: $t.baseState,
        baseQueue: $t.baseQueue,
        queue: $t.queue,
        next: null
      }, Ze === null ? gt.memoizedState = Ze = l : Ze = Ze.next = l;
    }
    return Ze;
  }
  function Rs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Hi(l) {
    var n = Go;
    return Go += 1, Nc === null && (Nc = []), l = J0(Nc, l, n), n = gt, (Ze === null ? n.memoizedState : Ze.next) === null && (n = n.alternate, O.H = n === null || n.memoizedState === null ? Zp : Yd), l;
  }
  function Xo(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Hi(l);
      if (l.$$typeof === je) return V(l);
    }
    throw Error(x(438, String(l)));
  }
  function Ad(l) {
    var n = null, u = gt.updateQueue;
    if (u !== null && (n = u.memoCache), n == null) {
      var i = gt.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (n = {
        data: i.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), u === null && (u = Rs(), gt.updateQueue = u), u.memoCache = n, u = n.data[n.index], u === void 0)
      for (u = n.data[n.index] = Array(l), i = 0; i < l; i++)
        u[i] = et;
    return n.index++, u;
  }
  function iu(l, n) {
    return typeof n == "function" ? n(l) : n;
  }
  function ou(l) {
    var n = Ne();
    return zd(n, $t, l);
  }
  function zd(l, n, u) {
    var i = l.queue;
    if (i === null) throw Error(x(311));
    i.lastRenderedReducer = u;
    var s = l.baseQueue, r = i.pending;
    if (r !== null) {
      if (s !== null) {
        var m = s.next;
        s.next = r.next, r.next = m;
      }
      n.baseQueue = s = r, i.pending = null;
    }
    if (r = l.baseState, s === null) l.memoizedState = r;
    else {
      n = s.next;
      var v = m = null, T = null, U = n, q = !1;
      do {
        var X = U.lane & -536870913;
        if (X !== U.lane ? (Mt & X) === X : (cu & X) === X) {
          var _ = U.revertLane;
          if (_ === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), X === Dc && (q = !0);
          else if ((cu & _) === _) {
            U = U.next, _ === Dc && (q = !0);
            continue;
          } else
            X = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, T === null ? (v = T = X, m = r) : T = T.next = X, gt.lanes |= _, Hn |= _;
          X = U.action, Wu && u(r, X), r = U.hasEagerState ? U.eagerState : u(r, X);
        } else
          _ = {
            lane: X,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, T === null ? (v = T = _, m = r) : T = T.next = _, gt.lanes |= X, Hn |= X;
        U = U.next;
      } while (U !== null && U !== n);
      if (T === null ? m = r : T.next = v, !Yl(r, l.memoizedState) && (Le = !0, q && (u = $e, u !== null)))
        throw u;
      l.memoizedState = r, l.baseState = m, l.baseQueue = T, i.lastRenderedState = r;
    }
    return s === null && (i.lanes = 0), [l.memoizedState, i.dispatch];
  }
  function Dd(l) {
    var n = Ne(), u = n.queue;
    if (u === null) throw Error(x(311));
    u.lastRenderedReducer = l;
    var i = u.dispatch, s = u.pending, r = n.memoizedState;
    if (s !== null) {
      u.pending = null;
      var m = s = s.next;
      do
        r = l(r, m.action), m = m.next;
      while (m !== s);
      Yl(r, n.memoizedState) || (Le = !0), n.memoizedState = r, n.baseQueue === null && (n.baseState = r), u.lastRenderedState = r;
    }
    return [r, i];
  }
  function k0(l, n, u) {
    var i = gt, s = Ne(), r = Ct;
    if (r) {
      if (u === void 0) throw Error(x(407));
      u = u();
    } else u = n();
    var m = !Yl(
      ($t || s).memoizedState,
      u
    );
    if (m && (s.memoizedState = u, Le = !0), s = s.queue, _d(Od.bind(null, i, s, l), [
      l
    ]), s.getSnapshot !== n || m || Ze !== null && Ze.memoizedState.tag & 1) {
      if (i.flags |= 2048, Ni(
        9,
        { destroy: void 0 },
        F0.bind(
          null,
          i,
          s,
          u,
          n
        ),
        null
      ), ee === null) throw Error(x(349));
      r || (cu & 127) !== 0 || Us(i, n, u);
    }
    return u;
  }
  function Us(l, n, u) {
    l.flags |= 16384, l = { getSnapshot: n, value: u }, n = gt.updateQueue, n === null ? (n = Rs(), gt.updateQueue = n, n.stores = [l]) : (u = n.stores, u === null ? n.stores = [l] : u.push(l));
  }
  function F0(l, n, u, i) {
    n.value = u, n.getSnapshot = i, Md(n) && Rd(l);
  }
  function Od(l, n, u) {
    return u(function() {
      Md(n) && Rd(l);
    });
  }
  function Md(l) {
    var n = l.getSnapshot;
    l = l.value;
    try {
      var u = n();
      return !Yl(l, u);
    } catch {
      return !0;
    }
  }
  function Rd(l) {
    var n = Qu(l, 2);
    n !== null && na(n, l, 2);
  }
  function I0(l) {
    var n = dl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), Wu) {
        xu(!0);
        try {
          u();
        } finally {
          xu(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = l, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: iu,
      lastRenderedState: l
    }, n;
  }
  function hl(l, n, u, i) {
    return l.baseState = u, zd(
      l,
      $t,
      typeof i == "function" ? i : iu
    );
  }
  function Yp(l, n, u, i, s) {
    if (Ns(l)) throw Error(x(485));
    if (l = n.action, l !== null) {
      var r = {
        payload: s,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          r.listeners.push(m);
        }
      };
      O.T !== null ? u(!0) : r.isTransition = !1, i(r), u = n.pending, u === null ? (r.next = n.pending = r, P0(n, r)) : (r.next = u.next, n.pending = u.next = r);
    }
  }
  function P0(l, n) {
    var u = n.action, i = n.payload, s = l.state;
    if (n.isTransition) {
      var r = O.T, m = {};
      O.T = m;
      try {
        var v = u(s, i), T = O.S;
        T !== null && T(m, v), tm(l, n, v);
      } catch (U) {
        Bi(l, n, U);
      } finally {
        r !== null && m.types !== null && (r.types = m.types), O.T = r;
      }
    } else
      try {
        r = u(s, i), tm(l, n, r);
      } catch (U) {
        Bi(l, n, U);
      }
  }
  function tm(l, n, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(i) {
        em(l, n, i);
      },
      function(i) {
        return Bi(l, n, i);
      }
    ) : em(l, n, u);
  }
  function em(l, n, u) {
    n.status = "fulfilled", n.value = u, lm(n), l.state = u, n = l.pending, n !== null && (u = n.next, u === n ? l.pending = null : (u = u.next, n.next = u, P0(l, u)));
  }
  function Bi(l, n, u) {
    var i = l.pending;
    if (l.pending = null, i !== null) {
      i = i.next;
      do
        n.status = "rejected", n.reason = u, lm(n), n = n.next;
      while (n !== i);
    }
    l.action = null;
  }
  function lm(l) {
    l = l.listeners;
    for (var n = 0; n < l.length; n++) (0, l[n])();
  }
  function _s(l, n) {
    return n;
  }
  function am(l, n) {
    if (Ct) {
      var u = ee.formState;
      if (u !== null) {
        t: {
          var i = gt;
          if (Ct) {
            if (ie) {
              e: {
                for (var s = ie, r = Pe; s.nodeType !== 8; ) {
                  if (!r) {
                    s = null;
                    break e;
                  }
                  if (s = ua(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break e;
                  }
                }
                r = s.data, s = r === "F!" || r === "F" ? s : null;
              }
              if (s) {
                ie = ua(
                  s.nextSibling
                ), i = s.data === "F!";
                break t;
              }
            }
            ln(i);
          }
          i = !1;
        }
        i && (n = u[0]);
      }
    }
    return u = dl(), u.memoizedState = u.baseState = n, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _s,
      lastRenderedState: n
    }, u.queue = i, u = xd.bind(
      null,
      gt,
      i
    ), i.dispatch = u, i = I0(!1), r = xc.bind(
      null,
      gt,
      !1,
      i.queue
    ), i = dl(), s = {
      state: n,
      dispatch: null,
      action: l,
      pending: null
    }, i.queue = s, u = Yp.bind(
      null,
      gt,
      s,
      r,
      u
    ), s.dispatch = u, i.memoizedState = l, [n, u, !1];
  }
  function jp(l) {
    var n = Ne();
    return Cs(n, $t, l);
  }
  function Cs(l, n, u) {
    if (n = zd(
      l,
      n,
      _s
    )[0], l = ou(iu)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var i = Hi(n);
      } catch (m) {
        throw m === Oc ? No : m;
      }
    else i = n;
    n = Ne();
    var s = n.queue, r = s.dispatch;
    return u !== n.memoizedState && (gt.flags |= 2048, Ni(
      9,
      { destroy: void 0 },
      nm.bind(null, s, u),
      null
    )), [i, r, l];
  }
  function nm(l, n) {
    l.action = n;
  }
  function um(l) {
    var n = Ne(), u = $t;
    if (u !== null)
      return Cs(n, u, l);
    Ne(), n = n.memoizedState, u = Ne();
    var i = u.queue.dispatch;
    return u.memoizedState = l, [n, i, !1];
  }
  function Ni(l, n, u, i) {
    return l = { tag: l, create: u, deps: i, inst: n, next: null }, n = gt.updateQueue, n === null && (n = Rs(), gt.updateQueue = n), u = n.lastEffect, u === null ? n.lastEffect = l.next = l : (i = u.next, u.next = l, l.next = i, n.lastEffect = l), l;
  }
  function cm() {
    return Ne().memoizedState;
  }
  function Qo(l, n, u, i) {
    var s = dl();
    gt.flags |= l, s.memoizedState = Ni(
      1 | n,
      { destroy: void 0 },
      u,
      i === void 0 ? null : i
    );
  }
  function Vo(l, n, u, i) {
    var s = Ne();
    i = i === void 0 ? null : i;
    var r = s.memoizedState.inst;
    $t !== null && i !== null && ku(i, $t.memoizedState.deps) ? s.memoizedState = Ni(n, r, u, i) : (gt.flags |= l, s.memoizedState = Ni(
      1 | n,
      r,
      u,
      i
    ));
  }
  function Ud(l, n) {
    Qo(8390656, 8, l, n);
  }
  function _d(l, n) {
    Vo(2048, 8, l, n);
  }
  function im(l) {
    gt.flags |= 4;
    var n = gt.updateQueue;
    if (n === null)
      n = Rs(), gt.updateQueue = n, n.events = [l];
    else {
      var u = n.events;
      u === null ? n.events = [l] : u.push(l);
    }
  }
  function Hs(l) {
    var n = Ne().memoizedState;
    return im({ ref: n, nextImpl: l }), function() {
      if ((Qt & 2) !== 0) throw Error(x(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Cd(l, n) {
    return Vo(4, 2, l, n);
  }
  function om(l, n) {
    return Vo(4, 4, l, n);
  }
  function Hd(l, n) {
    if (typeof n == "function") {
      l = l();
      var u = n(l);
      return function() {
        typeof u == "function" ? u() : n(null);
      };
    }
    if (n != null)
      return l = l(), n.current = l, function() {
        n.current = null;
      };
  }
  function fm(l, n, u) {
    u = u != null ? u.concat([l]) : null, Vo(4, 4, Hd.bind(null, n, l), u);
  }
  function Mn() {
  }
  function Bd(l, n) {
    var u = Ne();
    n = n === void 0 ? null : n;
    var i = u.memoizedState;
    return n !== null && ku(n, i[1]) ? i[0] : (u.memoizedState = [l, n], l);
  }
  function Gp(l, n) {
    var u = Ne();
    n = n === void 0 ? null : n;
    var i = u.memoizedState;
    if (n !== null && ku(n, i[1]))
      return i[0];
    if (i = l(), Wu) {
      xu(!0);
      try {
        l();
      } finally {
        xu(!1);
      }
    }
    return u.memoizedState = [i, n], i;
  }
  function Bs(l, n, u) {
    return u === void 0 || (cu & 1073741824) !== 0 && (Mt & 261930) === 0 ? l.memoizedState = n : (l.memoizedState = u, l = tv(), gt.lanes |= l, Hn |= l, u);
  }
  function fu(l, n, u, i) {
    return Yl(u, n) ? u : tl.current !== null ? (l = Bs(l, u, i), Yl(l, n) || (Le = !0), l) : (cu & 42) === 0 || (cu & 1073741824) !== 0 && (Mt & 261930) === 0 ? (Le = !0, l.memoizedState = u) : (l = tv(), gt.lanes |= l, Hn |= l, n);
  }
  function Nd(l, n, u, i, s) {
    var r = Q.p;
    Q.p = r !== 0 && 8 > r ? r : 8;
    var m = O.T, v = {};
    O.T = v, xc(l, !1, n, u);
    try {
      var T = s(), U = O.S;
      if (U !== null && U(v, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var q = bs(
          T,
          i
        );
        Fu(
          l,
          n,
          q,
          ma(l)
        );
      } else
        Fu(
          l,
          n,
          i,
          ma(l)
        );
    } catch (X) {
      Fu(
        l,
        n,
        { then: function() {
        }, status: "rejected", reason: X },
        ma()
      );
    } finally {
      Q.p = r, m !== null && v.types !== null && (m.types = v.types), O.T = m;
    }
  }
  function Xp() {
  }
  function Zo(l, n, u, i) {
    if (l.tag !== 5) throw Error(x(476));
    var s = Lo(l).queue;
    Nd(
      l,
      s,
      n,
      Z,
      u === null ? Xp : function() {
        return te(l), u(i);
      }
    );
  }
  function Lo(l) {
    var n = l.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: iu,
        lastRenderedState: Z
      },
      next: null
    };
    var u = {};
    return n.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: iu,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = n, l = l.alternate, l !== null && (l.memoizedState = n), n;
  }
  function te(l) {
    var n = Lo(l);
    n.next === null && (n = l.alternate.memoizedState), Fu(
      l,
      n.next.queue,
      {},
      ma()
    );
  }
  function sm() {
    return V(or);
  }
  function Qp() {
    return Ne().memoizedState;
  }
  function rm() {
    return Ne().memoizedState;
  }
  function su(l) {
    for (var n = l.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var u = ma();
          l = $u(u);
          var i = Ua(n, l, u);
          i !== null && (na(i, n, u), Cc(i, n, u)), n = { cache: ps() }, l.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Vp(l, n, u) {
    var i = ma();
    u = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ns(l) ? qd(n, u) : (u = tn(l, n, u, i), u !== null && (na(u, l, i), dm(u, n, i)));
  }
  function xd(l, n, u) {
    var i = ma();
    Fu(l, n, u, i);
  }
  function Fu(l, n, u, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ns(l)) qd(n, s);
    else {
      var r = l.alternate;
      if (l.lanes === 0 && (r === null || r.lanes === 0) && (r = n.lastRenderedReducer, r !== null))
        try {
          var m = n.lastRenderedState, v = r(m, u);
          if (s.hasEagerState = !0, s.eagerState = v, Yl(v, m))
            return za(l, n, s, 0), ee === null && Aa(), !1;
        } catch {
        }
      if (u = tn(l, n, s, i), u !== null)
        return na(u, l, i), dm(u, n, i), !0;
    }
    return !1;
  }
  function xc(l, n, u, i) {
    if (i = {
      lane: 2,
      revertLane: oh(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ns(l)) {
      if (n) throw Error(x(479));
    } else
      n = tn(
        l,
        u,
        i,
        2
      ), n !== null && na(n, l, 2);
  }
  function Ns(l) {
    var n = l.alternate;
    return l === gt || n !== null && n === gt;
  }
  function qd(l, n) {
    _i = Ui = !0;
    var u = l.pending;
    u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n;
  }
  function dm(l, n, u) {
    if ((u & 4194048) !== 0) {
      var i = n.lanes;
      i &= l.pendingLanes, u |= i, n.lanes = u, wn(l, u);
    }
  }
  var xs = {
    readContext: V,
    use: Xo,
    useCallback: Me,
    useContext: Me,
    useEffect: Me,
    useImperativeHandle: Me,
    useLayoutEffect: Me,
    useInsertionEffect: Me,
    useMemo: Me,
    useReducer: Me,
    useRef: Me,
    useState: Me,
    useDebugValue: Me,
    useDeferredValue: Me,
    useTransition: Me,
    useSyncExternalStore: Me,
    useId: Me,
    useHostTransitionStatus: Me,
    useFormState: Me,
    useActionState: Me,
    useOptimistic: Me,
    useMemoCache: Me,
    useCacheRefresh: Me
  };
  xs.useEffectEvent = Me;
  var Zp = {
    readContext: V,
    use: Xo,
    useCallback: function(l, n) {
      return dl().memoizedState = [
        l,
        n === void 0 ? null : n
      ], l;
    },
    useContext: V,
    useEffect: Ud,
    useImperativeHandle: function(l, n, u) {
      u = u != null ? u.concat([l]) : null, Qo(
        4194308,
        4,
        Hd.bind(null, n, l),
        u
      );
    },
    useLayoutEffect: function(l, n) {
      return Qo(4194308, 4, l, n);
    },
    useInsertionEffect: function(l, n) {
      Qo(4, 2, l, n);
    },
    useMemo: function(l, n) {
      var u = dl();
      n = n === void 0 ? null : n;
      var i = l();
      if (Wu) {
        xu(!0);
        try {
          l();
        } finally {
          xu(!1);
        }
      }
      return u.memoizedState = [i, n], i;
    },
    useReducer: function(l, n, u) {
      var i = dl();
      if (u !== void 0) {
        var s = u(n);
        if (Wu) {
          xu(!0);
          try {
            u(n);
          } finally {
            xu(!1);
          }
        }
      } else s = n;
      return i.memoizedState = i.baseState = s, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: s
      }, i.queue = l, l = l.dispatch = Vp.bind(
        null,
        gt,
        l
      ), [i.memoizedState, l];
    },
    useRef: function(l) {
      var n = dl();
      return l = { current: l }, n.memoizedState = l;
    },
    useState: function(l) {
      l = I0(l);
      var n = l.queue, u = xd.bind(null, gt, n);
      return n.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: Mn,
    useDeferredValue: function(l, n) {
      var u = dl();
      return Bs(u, l, n);
    },
    useTransition: function() {
      var l = I0(!1);
      return l = Nd.bind(
        null,
        gt,
        l.queue,
        !0,
        !1
      ), dl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, n, u) {
      var i = gt, s = dl();
      if (Ct) {
        if (u === void 0)
          throw Error(x(407));
        u = u();
      } else {
        if (u = n(), ee === null)
          throw Error(x(349));
        (Mt & 127) !== 0 || Us(i, n, u);
      }
      s.memoizedState = u;
      var r = { value: u, getSnapshot: n };
      return s.queue = r, Ud(Od.bind(null, i, r, l), [
        l
      ]), i.flags |= 2048, Ni(
        9,
        { destroy: void 0 },
        F0.bind(
          null,
          i,
          r,
          u,
          n
        ),
        null
      ), u;
    },
    useId: function() {
      var l = dl(), n = ee.identifierPrefix;
      if (Ct) {
        var u = An, i = sa;
        u = (i & ~(1 << 32 - Ll(i) - 1)).toString(32) + u, n = "_" + n + "R_" + u, u = Ds++, 0 < u && (n += "H" + u.toString(32)), n += "_";
      } else
        u = xp++, n = "_" + n + "r_" + u.toString(32) + "_";
      return l.memoizedState = n;
    },
    useHostTransitionStatus: sm,
    useFormState: am,
    useActionState: am,
    useOptimistic: function(l) {
      var n = dl();
      n.memoizedState = n.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = u, n = xc.bind(
        null,
        gt,
        !0,
        u
      ), u.dispatch = n, [l, n];
    },
    useMemoCache: Ad,
    useCacheRefresh: function() {
      return dl().memoizedState = su.bind(
        null,
        gt
      );
    },
    useEffectEvent: function(l) {
      var n = dl(), u = { impl: l };
      return n.memoizedState = u, function() {
        if ((Qt & 2) !== 0)
          throw Error(x(440));
        return u.impl.apply(void 0, arguments);
      };
    }
  }, Yd = {
    readContext: V,
    use: Xo,
    useCallback: Bd,
    useContext: V,
    useEffect: _d,
    useImperativeHandle: fm,
    useInsertionEffect: Cd,
    useLayoutEffect: om,
    useMemo: Gp,
    useReducer: ou,
    useRef: cm,
    useState: function() {
      return ou(iu);
    },
    useDebugValue: Mn,
    useDeferredValue: function(l, n) {
      var u = Ne();
      return fu(
        u,
        $t.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = ou(iu)[0], n = Ne().memoizedState;
      return [
        typeof l == "boolean" ? l : Hi(l),
        n
      ];
    },
    useSyncExternalStore: k0,
    useId: Qp,
    useHostTransitionStatus: sm,
    useFormState: jp,
    useActionState: jp,
    useOptimistic: function(l, n) {
      var u = Ne();
      return hl(u, $t, l, n);
    },
    useMemoCache: Ad,
    useCacheRefresh: rm
  };
  Yd.useEffectEvent = Hs;
  var Lp = {
    readContext: V,
    use: Xo,
    useCallback: Bd,
    useContext: V,
    useEffect: _d,
    useImperativeHandle: fm,
    useInsertionEffect: Cd,
    useLayoutEffect: om,
    useMemo: Gp,
    useReducer: Dd,
    useRef: cm,
    useState: function() {
      return Dd(iu);
    },
    useDebugValue: Mn,
    useDeferredValue: function(l, n) {
      var u = Ne();
      return $t === null ? Bs(u, l, n) : fu(
        u,
        $t.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Dd(iu)[0], n = Ne().memoizedState;
      return [
        typeof l == "boolean" ? l : Hi(l),
        n
      ];
    },
    useSyncExternalStore: k0,
    useId: Qp,
    useHostTransitionStatus: sm,
    useFormState: um,
    useActionState: um,
    useOptimistic: function(l, n) {
      var u = Ne();
      return $t !== null ? hl(u, $t, l, n) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: Ad,
    useCacheRefresh: rm
  };
  Lp.useEffectEvent = Hs;
  function xi(l, n, u, i) {
    n = l.memoizedState, u = u(i, n), u = u == null ? n : ot({}, n, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var an = {
    enqueueSetState: function(l, n, u) {
      l = l._reactInternals;
      var i = ma(), s = $u(i);
      s.payload = n, u != null && (s.callback = u), n = Ua(l, s, i), n !== null && (na(n, l, i), Cc(n, l, i));
    },
    enqueueReplaceState: function(l, n, u) {
      l = l._reactInternals;
      var i = ma(), s = $u(i);
      s.tag = 1, s.payload = n, u != null && (s.callback = u), n = Ua(l, s, i), n !== null && (na(n, l, i), Cc(n, l, i));
    },
    enqueueForceUpdate: function(l, n) {
      l = l._reactInternals;
      var u = ma(), i = $u(u);
      i.tag = 2, n != null && (i.callback = n), n = Ua(l, i, u), n !== null && (na(n, l, u), Cc(n, l, u));
    }
  };
  function hm(l, n, u, i, s, r, m) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(i, r, m) : n.prototype && n.prototype.isPureReactComponent ? !Fa(u, i) || !Fa(s, r) : !0;
  }
  function wp(l, n, u, i) {
    l = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(u, i), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(u, i), n.state !== l && an.enqueueReplaceState(n, n.state, null);
  }
  function qc(l, n) {
    var u = n;
    if ("ref" in n) {
      u = {};
      for (var i in n)
        i !== "ref" && (u[i] = n[i]);
    }
    if (l = l.defaultProps) {
      u === n && (u = ot({}, u));
      for (var s in l)
        u[s] === void 0 && (u[s] = l[s]);
    }
    return u;
  }
  function jd(l) {
    Si(l);
  }
  function mm(l) {
    console.error(l);
  }
  function Gd(l) {
    Si(l);
  }
  function wo(l, n) {
    try {
      var u = l.onUncaughtError;
      u(n.value, { componentStack: n.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function qs(l, n, u) {
    try {
      var i = l.onCaughtError;
      i(u.value, {
        componentStack: u.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function ym(l, n, u) {
    return u = $u(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      wo(l, n);
    }, u;
  }
  function pm(l) {
    return l = $u(l), l.tag = 3, l;
  }
  function vm(l, n, u, i) {
    var s = u.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var r = i.value;
      l.payload = function() {
        return s(r);
      }, l.callback = function() {
        qs(n, u, i);
      };
    }
    var m = u.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (l.callback = function() {
      qs(n, u, i), typeof s != "function" && (be === null ? be = /* @__PURE__ */ new Set([this]) : be.add(this));
      var v = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: v !== null ? v : ""
      });
    });
  }
  function K1(l, n, u, i, s) {
    if (u.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (n = u.alternate, n !== null && rl(
        n,
        u,
        s,
        !0
      ), u = Fl.current, u !== null) {
        switch (u.tag) {
          case 31:
          case 13:
            return _a === null ? nh() : u.alternate === null && fe === 0 && (fe = 3), u.flags &= -257, u.flags |= 65536, u.lanes = s, i === Oi ? u.flags |= 16384 : (n = u.updateQueue, n === null ? u.updateQueue = /* @__PURE__ */ new Set([i]) : n.add(i), ks(l, i, s)), !1;
          case 22:
            return u.flags |= 65536, i === Oi ? u.flags |= 16384 : (n = u.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, u.updateQueue = n) : (u = n.retryQueue, u === null ? n.retryQueue = /* @__PURE__ */ new Set([i]) : u.add(i)), ks(l, i, s)), !1;
        }
        throw Error(x(435, u.tag));
      }
      return ks(l, i, s), nh(), !1;
    }
    if (Ct)
      return n = Fl.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = s, i !== eu && (l = Error(x(422), { cause: i }), Ho(Da(l, u)))) : (i !== eu && (n = Error(x(423), {
        cause: i
      }), Ho(
        Da(n, u)
      )), l = l.current.alternate, l.flags |= 65536, s &= -s, l.lanes |= s, i = Da(i, u), s = ym(
        l.stateNode,
        i,
        s
      ), gd(l, s), fe !== 4 && (fe = 2)), !1;
    var r = Error(x(520), { cause: i });
    if (r = Da(r, u), Js === null ? Js = [r] : Js.push(r), fe !== 4 && (fe = 2), n === null) return !0;
    i = Da(i, u), u = n;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = s & -s, u.lanes |= l, l = ym(u.stateNode, i, l), gd(u, l), !1;
        case 1:
          if (n = u.type, r = u.stateNode, (u.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (be === null || !be.has(r))))
            return u.flags |= 65536, s &= -s, u.lanes |= s, s = pm(s), vm(
              s,
              l,
              u,
              i
            ), gd(u, s), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var Xd = Error(x(461)), Le = !1;
  function ye(l, n, u, i) {
    n.child = l === null ? $0(n, null, u, i) : _c(
      n,
      l.child,
      u,
      i
    );
  }
  function gm(l, n, u, i, s) {
    u = u.render;
    var r = n.ref;
    if ("ref" in i) {
      var m = {};
      for (var v in i)
        v !== "ref" && (m[v] = i[v]);
    } else m = i;
    return mt(n), i = Os(
      l,
      n,
      u,
      m,
      r,
      s
    ), v = Ed(), l !== null && !Le ? (Ci(l, n, s), Ba(l, n, s)) : (Ct && v && _o(n), n.flags |= 1, ye(l, n, i, s), n.child);
  }
  function Sm(l, n, u, i, s) {
    if (l === null) {
      var r = u.type;
      return typeof r == "function" && !bi(r) && r.defaultProps === void 0 && u.compare === null ? (n.tag = 15, n.type = r, bm(
        l,
        n,
        r,
        i,
        s
      )) : (l = rd(
        u.type,
        null,
        i,
        n,
        n.mode,
        s
      ), l.ref = n.ref, l.return = n, n.child = l);
    }
    if (r = l.child, !Zd(l, s)) {
      var m = r.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Fa, u(m, i) && l.ref === n.ref)
        return Ba(l, n, s);
    }
    return n.flags |= 1, l = Vu(r, i), l.ref = n.ref, l.return = n, n.child = l;
  }
  function bm(l, n, u, i, s) {
    if (l !== null) {
      var r = l.memoizedProps;
      if (Fa(r, i) && l.ref === n.ref)
        if (Le = !1, n.pendingProps = i = r, Zd(l, s))
          (l.flags & 131072) !== 0 && (Le = !0);
        else
          return n.lanes = l.lanes, Ba(l, n, s);
    }
    return Qd(
      l,
      n,
      u,
      i,
      s
    );
  }
  function Jp(l, n, u, i) {
    var s = i.children, r = l !== null ? l.memoizedState : null;
    if (l === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | u : u, l !== null) {
          for (i = n.child = l.child, s = 0; i !== null; )
            s = s | i.lanes | i.childLanes, i = i.sibling;
          i = s & ~r;
        } else i = 0, n.child = null;
        return Pl(
          l,
          n,
          r,
          u,
          i
        );
      }
      if ((u & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Bo(
          n,
          r !== null ? r.cachePool : null
        ), r !== null ? Np(n, r) : zs(), bd(n);
      else
        return i = n.lanes = 536870912, Pl(
          l,
          n,
          r !== null ? r.baseLanes | u : u,
          u,
          i
        );
    } else
      r !== null ? (Bo(n, r.cachePool), Np(n, r), On(), n.memoizedState = null) : (l !== null && Bo(n, null), zs(), On());
    return ye(l, n, s, u), n.child;
  }
  function Yc(l, n) {
    return l !== null && l.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Pl(l, n, u, i, s) {
    var r = Ra();
    return r = r === null ? null : { parent: Ve._currentValue, pool: r }, n.memoizedState = {
      baseLanes: u,
      cachePool: r
    }, l !== null && Bo(n, null), zs(), bd(n), l !== null && rl(l, n, i, !0), n.childLanes = s, null;
  }
  function Ys(l, n) {
    return n = Xs(
      { mode: n.mode, children: n.children },
      l.mode
    ), n.ref = l.ref, l.child = n, n.return = l, n;
  }
  function ta(l, n, u) {
    return _c(n, l.child, null, u), l = Ys(n, n.pendingProps), l.flags |= 2, Il(n), n.memoizedState = null, l;
  }
  function Kp(l, n, u) {
    var i = n.pendingProps, s = (n.flags & 128) !== 0;
    if (n.flags &= -129, l === null) {
      if (Ct) {
        if (i.mode === "hidden")
          return l = Ys(n, i), n.lanes = 536870912, Yc(null, l);
        if (Yo(n), (l = ie) ? (l = Rv(
          l,
          Pe
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (n.memoizedState = {
          dehydrated: l,
          treeContext: En !== null ? { id: sa, overflow: An } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = G0(l), u.return = n, n.child = u, sl = n, ie = null)) : l = null, l === null) throw ln(n);
        return n.lanes = 536870912, null;
      }
      return Ys(n, i);
    }
    var r = l.memoizedState;
    if (r !== null) {
      var m = r.dehydrated;
      if (Yo(n), s)
        if (n.flags & 256)
          n.flags &= -257, n = ta(
            l,
            n,
            u
          );
        else if (n.memoizedState !== null)
          n.child = l.child, n.flags |= 128, n = null;
        else throw Error(x(558));
      else if (Le || rl(l, n, u, !1), s = (u & l.childLanes) !== 0, Le || s) {
        if (i = ee, i !== null && (m = ba(i, u), m !== 0 && m !== r.retryLane))
          throw r.retryLane = m, Qu(l, m), na(i, l, m), Xd;
        nh(), n = ta(
          l,
          n,
          u
        );
      } else
        l = r.treeContext, ie = ua(m.nextSibling), sl = n, Ct = !0, tu = null, Pe = !1, l !== null && hs(n, l), n = Ys(n, i), n.flags |= 4096;
      return n;
    }
    return l = Vu(l.child, {
      mode: i.mode,
      children: i.children
    }), l.ref = n.ref, n.child = l, l.return = n, l;
  }
  function Ca(l, n) {
    var u = n.ref;
    if (u === null)
      l !== null && l.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(x(284));
      (l === null || l.ref !== u) && (n.flags |= 4194816);
    }
  }
  function Qd(l, n, u, i, s) {
    return mt(n), u = Os(
      l,
      n,
      u,
      i,
      void 0,
      s
    ), i = Ed(), l !== null && !Le ? (Ci(l, n, s), Ba(l, n, s)) : (Ct && i && _o(n), n.flags |= 1, ye(l, n, u, s), n.child);
  }
  function jc(l, n, u, i, s, r) {
    return mt(n), n.updateQueue = null, u = qp(
      n,
      i,
      u,
      s
    ), Td(l), i = Ed(), l !== null && !Le ? (Ci(l, n, r), Ba(l, n, r)) : (Ct && i && _o(n), n.flags |= 1, ye(l, n, u, r), n.child);
  }
  function Tm(l, n, u, i, s) {
    if (mt(n), n.stateNode === null) {
      var r = $l, m = u.contextType;
      typeof m == "object" && m !== null && (r = V(m)), r = new u(i, r), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = an, n.stateNode = r, r._reactInternals = n, r = n.stateNode, r.props = i, r.state = n.memoizedState, r.refs = {}, As(n), m = u.contextType, r.context = typeof m == "object" && m !== null ? V(m) : $l, r.state = n.memoizedState, m = u.getDerivedStateFromProps, typeof m == "function" && (xi(
        n,
        u,
        m,
        i
      ), r.state = n.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (m = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), m !== r.state && an.enqueueReplaceState(r, r.state, null), nu(n, i, r, s), Hc(), r.state = n.memoizedState), typeof r.componentDidMount == "function" && (n.flags |= 4194308), i = !0;
    } else if (l === null) {
      r = n.stateNode;
      var v = n.memoizedProps, T = qc(u, v);
      r.props = T;
      var U = r.context, q = u.contextType;
      m = $l, typeof q == "object" && q !== null && (m = V(q));
      var X = u.getDerivedStateFromProps;
      q = typeof X == "function" || typeof r.getSnapshotBeforeUpdate == "function", v = n.pendingProps !== v, q || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (v || U !== m) && wp(
        n,
        r,
        i,
        m
      ), Ku = !1;
      var _ = n.memoizedState;
      r.state = _, nu(n, i, r, s), Hc(), U = n.memoizedState, v || _ !== U || Ku ? (typeof X == "function" && (xi(
        n,
        u,
        X,
        i
      ), U = n.memoizedState), (T = Ku || hm(
        n,
        u,
        T,
        i,
        _,
        U,
        m
      )) ? (q || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = i, n.memoizedState = U), r.props = i, r.state = U, r.context = m, i = T) : (typeof r.componentDidMount == "function" && (n.flags |= 4194308), i = !1);
    } else {
      r = n.stateNode, vd(l, n), m = n.memoizedProps, q = qc(u, m), r.props = q, X = n.pendingProps, _ = r.context, U = u.contextType, T = $l, typeof U == "object" && U !== null && (T = V(U)), v = u.getDerivedStateFromProps, (U = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (m !== X || _ !== T) && wp(
        n,
        r,
        i,
        T
      ), Ku = !1, _ = n.memoizedState, r.state = _, nu(n, i, r, s), Hc();
      var N = n.memoizedState;
      m !== X || _ !== N || Ku || l !== null && l.dependencies !== null && Ei(l.dependencies) ? (typeof v == "function" && (xi(
        n,
        u,
        v,
        i
      ), N = n.memoizedState), (q = Ku || hm(
        n,
        u,
        q,
        i,
        _,
        N,
        T
      ) || l !== null && l.dependencies !== null && Ei(l.dependencies)) ? (U || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(i, N, T), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        i,
        N,
        T
      )), typeof r.componentDidUpdate == "function" && (n.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && _ === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && _ === l.memoizedState || (n.flags |= 1024), n.memoizedProps = i, n.memoizedState = N), r.props = i, r.state = N, r.context = T, i = q) : (typeof r.componentDidUpdate != "function" || m === l.memoizedProps && _ === l.memoizedState || (n.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || m === l.memoizedProps && _ === l.memoizedState || (n.flags |= 1024), i = !1);
    }
    return r = i, Ca(l, n), i = (n.flags & 128) !== 0, r || i ? (r = n.stateNode, u = i && typeof u.getDerivedStateFromError != "function" ? null : r.render(), n.flags |= 1, l !== null && i ? (n.child = _c(
      n,
      l.child,
      null,
      s
    ), n.child = _c(
      n,
      null,
      u,
      s
    )) : ye(l, n, u, s), n.memoizedState = r.state, l = n.child) : l = Ba(
      l,
      n,
      s
    ), l;
  }
  function Rn(l, n, u, i) {
    return zc(), n.flags |= 256, ye(l, n, u, i), n.child;
  }
  var js = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Gs(l) {
    return { baseLanes: l, cachePool: zi() };
  }
  function Ha(l, n, u) {
    return l = l !== null ? l.childLanes & ~u : 0, n && (l |= aa), l;
  }
  function Em(l, n, u) {
    var i = n.pendingProps, s = !1, r = (n.flags & 128) !== 0, m;
    if ((m = r) || (m = l !== null && l.memoizedState === null ? !1 : (Se.current & 2) !== 0), m && (s = !0, n.flags &= -129), m = (n.flags & 32) !== 0, n.flags &= -33, l === null) {
      if (Ct) {
        if (s ? uu(n) : On(), (l = ie) ? (l = Rv(
          l,
          Pe
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (n.memoizedState = {
          dehydrated: l,
          treeContext: En !== null ? { id: sa, overflow: An } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, u = G0(l), u.return = n, n.child = u, sl = n, ie = null)) : l = null, l === null) throw ln(n);
        return wc(l) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var v = i.children;
      return i = i.fallback, s ? (On(), s = n.mode, v = Xs(
        { mode: "hidden", children: v },
        s
      ), i = Zu(
        i,
        s,
        u,
        null
      ), v.return = n, i.return = n, v.sibling = i, n.child = v, i = n.child, i.memoizedState = Gs(u), i.childLanes = Ha(
        l,
        m,
        u
      ), n.memoizedState = js, Yc(null, i)) : (uu(n), Gc(n, v));
    }
    var T = l.memoizedState;
    if (T !== null && (v = T.dehydrated, v !== null)) {
      if (r)
        n.flags & 256 ? (uu(n), n.flags &= -257, n = qi(
          l,
          n,
          u
        )) : n.memoizedState !== null ? (On(), n.child = l.child, n.flags |= 128, n = null) : (On(), v = i.fallback, s = n.mode, i = Xs(
          { mode: "visible", children: i.children },
          s
        ), v = Zu(
          v,
          s,
          u,
          null
        ), v.flags |= 2, i.return = n, v.return = n, i.sibling = v, n.child = i, _c(
          n,
          l.child,
          null,
          u
        ), i = n.child, i.memoizedState = Gs(u), i.childLanes = Ha(
          l,
          m,
          u
        ), n.memoizedState = js, n = Yc(null, i));
      else if (uu(n), wc(v)) {
        if (m = v.nextSibling && v.nextSibling.dataset, m) var U = m.dgst;
        m = U, i = Error(x(419)), i.stack = "", i.digest = m, Ho({ value: i, source: null, stack: null }), n = qi(
          l,
          n,
          u
        );
      } else if (Le || rl(l, n, u, !1), m = (u & l.childLanes) !== 0, Le || m) {
        if (m = ee, m !== null && (i = ba(m, u), i !== 0 && i !== T.retryLane))
          throw T.retryLane = i, Qu(l, i), na(m, l, i), Xd;
        cn(v) || nh(), n = qi(
          l,
          n,
          u
        );
      } else
        cn(v) ? (n.flags |= 192, n.child = l.child, n = null) : (l = T.treeContext, ie = ua(
          v.nextSibling
        ), sl = n, Ct = !0, tu = null, Pe = !1, l !== null && hs(n, l), n = Gc(
          n,
          i.children
        ), n.flags |= 4096);
      return n;
    }
    return s ? (On(), v = i.fallback, s = n.mode, T = l.child, U = T.sibling, i = Vu(T, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = T.subtreeFlags & 65011712, U !== null ? v = Vu(
      U,
      v
    ) : (v = Zu(
      v,
      s,
      u,
      null
    ), v.flags |= 2), v.return = n, i.return = n, i.sibling = v, n.child = i, Yc(null, i), i = n.child, v = l.child.memoizedState, v === null ? v = Gs(u) : (s = v.cachePool, s !== null ? (T = Ve._currentValue, s = s.parent !== T ? { parent: T, pool: T } : s) : s = zi(), v = {
      baseLanes: v.baseLanes | u,
      cachePool: s
    }), i.memoizedState = v, i.childLanes = Ha(
      l,
      m,
      u
    ), n.memoizedState = js, Yc(l.child, i)) : (uu(n), u = l.child, l = u.sibling, u = Vu(u, {
      mode: "visible",
      children: i.children
    }), u.return = n, u.sibling = null, l !== null && (m = n.deletions, m === null ? (n.deletions = [l], n.flags |= 16) : m.push(l)), n.child = u, n.memoizedState = null, u);
  }
  function Gc(l, n) {
    return n = Xs(
      { mode: "visible", children: n },
      l.mode
    ), n.return = l, l.child = n;
  }
  function Xs(l, n) {
    return l = He(22, l, null, n), l.lanes = 0, l;
  }
  function qi(l, n, u) {
    return _c(n, l.child, null, u), l = Gc(
      n,
      n.pendingProps.children
    ), l.flags |= 2, n.memoizedState = null, l;
  }
  function Yi(l, n, u) {
    l.lanes |= n;
    var i = l.alternate;
    i !== null && (i.lanes |= n), yd(l.return, n, u);
  }
  function Vd(l, n, u, i, s, r) {
    var m = l.memoizedState;
    m === null ? l.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: u,
      tailMode: s,
      treeForkCount: r
    } : (m.isBackwards = n, m.rendering = null, m.renderingStartTime = 0, m.last = i, m.tail = u, m.tailMode = s, m.treeForkCount = r);
  }
  function Am(l, n, u) {
    var i = n.pendingProps, s = i.revealOrder, r = i.tail;
    i = i.children;
    var m = Se.current, v = (m & 2) !== 0;
    if (v ? (m = m & 1 | 2, n.flags |= 128) : m &= 1, tt(Se, m), ye(l, n, i, u), i = Ct ? Qe : 0, !v && l !== null && (l.flags & 128) !== 0)
      t: for (l = n.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Yi(l, u, n);
        else if (l.tag === 19)
          Yi(l, u, n);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === n) break t;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === n)
            break t;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (s) {
      case "forwards":
        for (u = n.child, s = null; u !== null; )
          l = u.alternate, l !== null && jo(l) === null && (s = u), u = u.sibling;
        u = s, u === null ? (s = n.child, n.child = null) : (s = u.sibling, u.sibling = null), Vd(
          n,
          !1,
          s,
          u,
          r,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (u = null, s = n.child, n.child = null; s !== null; ) {
          if (l = s.alternate, l !== null && jo(l) === null) {
            n.child = s;
            break;
          }
          l = s.sibling, s.sibling = u, u = s, s = l;
        }
        Vd(
          n,
          !0,
          u,
          null,
          r,
          i
        );
        break;
      case "together":
        Vd(
          n,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function Ba(l, n, u) {
    if (l !== null && (n.dependencies = l.dependencies), Hn |= n.lanes, (u & n.childLanes) === 0)
      if (l !== null) {
        if (rl(
          l,
          n,
          u,
          !1
        ), (u & n.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && n.child !== l.child)
      throw Error(x(153));
    if (n.child !== null) {
      for (l = n.child, u = Vu(l, l.pendingProps), n.child = u, u.return = n; l.sibling !== null; )
        l = l.sibling, u = u.sibling = Vu(l, l.pendingProps), u.return = n;
      u.sibling = null;
    }
    return n.child;
  }
  function Zd(l, n) {
    return (l.lanes & n) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Ei(l)));
  }
  function Ld(l, n, u) {
    switch (n.tag) {
      case 3:
        Ka(n, n.stateNode.containerInfo), kl(n, Ve, l.memoizedState.cache), zc();
        break;
      case 27:
      case 5:
        Jf(n);
        break;
      case 4:
        Ka(n, n.stateNode.containerInfo);
        break;
      case 10:
        kl(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Yo(n), null;
        break;
      case 13:
        var i = n.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (uu(n), n.flags |= 128, null) : (u & n.child.childLanes) !== 0 ? Em(l, n, u) : (uu(n), l = Ba(
            l,
            n,
            u
          ), l !== null ? l.sibling : null);
        uu(n);
        break;
      case 19:
        var s = (l.flags & 128) !== 0;
        if (i = (u & n.childLanes) !== 0, i || (rl(
          l,
          n,
          u,
          !1
        ), i = (u & n.childLanes) !== 0), s) {
          if (i)
            return Am(
              l,
              n,
              u
            );
          n.flags |= 128;
        }
        if (s = n.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), tt(Se, Se.current), i) break;
        return null;
      case 22:
        return n.lanes = 0, Jp(
          l,
          n,
          u,
          n.pendingProps
        );
      case 24:
        kl(n, Ve, l.memoizedState.cache);
    }
    return Ba(l, n, u);
  }
  function zm(l, n, u) {
    if (l !== null)
      if (l.memoizedProps !== n.pendingProps)
        Le = !0;
      else {
        if (!Zd(l, u) && (n.flags & 128) === 0)
          return Le = !1, Ld(
            l,
            n,
            u
          );
        Le = (l.flags & 131072) !== 0;
      }
    else
      Le = !1, Ct && (n.flags & 1048576) !== 0 && Q0(n, Qe, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var i = n.pendingProps;
          if (l = Mc(n.elementType), n.type = l, typeof l == "function")
            bi(l) ? (i = qc(l, i), n.tag = 1, n = Tm(
              null,
              n,
              l,
              i,
              u
            )) : (n.tag = 0, n = Qd(
              null,
              n,
              l,
              i,
              u
            ));
          else {
            if (l != null) {
              var s = l.$$typeof;
              if (s === zl) {
                n.tag = 11, n = gm(
                  null,
                  n,
                  l,
                  i,
                  u
                );
                break t;
              } else if (s === Ke) {
                n.tag = 14, n = Sm(
                  null,
                  n,
                  l,
                  i,
                  u
                );
                break t;
              }
            }
            throw n = xl(l) || l, Error(x(306, n, ""));
          }
        }
        return n;
      case 0:
        return Qd(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 1:
        return i = n.type, s = qc(
          i,
          n.pendingProps
        ), Tm(
          l,
          n,
          i,
          s,
          u
        );
      case 3:
        t: {
          if (Ka(
            n,
            n.stateNode.containerInfo
          ), l === null) throw Error(x(387));
          i = n.pendingProps;
          var r = n.memoizedState;
          s = r.element, vd(l, n), nu(n, i, null, u);
          var m = n.memoizedState;
          if (i = m.cache, kl(n, Ve, i), i !== r.cache && au(
            n,
            [Ve],
            u,
            !0
          ), Hc(), i = m.element, r.isDehydrated)
            if (r = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, n.updateQueue.baseState = r, n.memoizedState = r, n.flags & 256) {
              n = Rn(
                l,
                n,
                i,
                u
              );
              break t;
            } else if (i !== s) {
              s = Da(
                Error(x(424)),
                n
              ), Ho(s), n = Rn(
                l,
                n,
                i,
                u
              );
              break t;
            } else
              for (l = n.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, ie = ua(l.firstChild), sl = n, Ct = !0, tu = null, Pe = !0, u = $0(
                n,
                null,
                i,
                u
              ), n.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (zc(), i === s) {
              n = Ba(
                l,
                n,
                u
              );
              break t;
            }
            ye(l, n, i, u);
          }
          n = n.child;
        }
        return n;
      case 26:
        return Ca(l, n), l === null ? (u = mf(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = u : Ct || (u = n.type, l = n.pendingProps, i = Lc(
          Ja.current
        ).createElement(u), i[Pt] = n, i[wl] = l, Ml(i, u, l), Jt(i), n.stateNode = i) : n.memoizedState = mf(
          n.type,
          l.memoizedProps,
          n.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Jf(n), l === null && Ct && (i = n.stateNode = df(
          n.type,
          n.pendingProps,
          Ja.current
        ), sl = n, Pe = !0, s = ie, Nn(n.type) ? (ur = s, ie = ua(i.firstChild)) : ie = s), ye(
          l,
          n,
          n.pendingProps.children,
          u
        ), Ca(l, n), l === null && (n.flags |= 4194304), n.child;
      case 5:
        return l === null && Ct && ((s = i = ie) && (i = k1(
          i,
          n.type,
          n.pendingProps,
          Pe
        ), i !== null ? (n.stateNode = i, sl = n, ie = ua(i.firstChild), Pe = !1, s = !0) : s = !1), s || ln(n)), Jf(n), s = n.type, r = n.pendingProps, m = l !== null ? l.memoizedProps : null, i = r.children, sf(s, r) ? i = null : m !== null && sf(s, m) && (n.flags |= 32), n.memoizedState !== null && (s = Os(
          l,
          n,
          J1,
          null,
          null,
          u
        ), or._currentValue = s), Ca(l, n), ye(l, n, i, u), n.child;
      case 6:
        return l === null && Ct && ((l = u = ie) && (u = Et(
          u,
          n.pendingProps,
          Pe
        ), u !== null ? (n.stateNode = u, sl = n, ie = null, l = !0) : l = !1), l || ln(n)), null;
      case 13:
        return Em(l, n, u);
      case 4:
        return Ka(
          n,
          n.stateNode.containerInfo
        ), i = n.pendingProps, l === null ? n.child = _c(
          n,
          null,
          i,
          u
        ) : ye(l, n, i, u), n.child;
      case 11:
        return gm(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 7:
        return ye(
          l,
          n,
          n.pendingProps,
          u
        ), n.child;
      case 8:
        return ye(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 12:
        return ye(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 10:
        return i = n.pendingProps, kl(n, n.type, i.value), ye(l, n, i.children, u), n.child;
      case 9:
        return s = n.type._context, i = n.pendingProps.children, mt(n), s = V(s), i = i(s), n.flags |= 1, ye(l, n, i, u), n.child;
      case 14:
        return Sm(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 15:
        return bm(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 19:
        return Am(l, n, u);
      case 31:
        return Kp(l, n, u);
      case 22:
        return Jp(
          l,
          n,
          u,
          n.pendingProps
        );
      case 24:
        return mt(n), i = V(Ve), l === null ? (s = Ra(), s === null && (s = ee, r = ps(), s.pooledCache = r, r.refCount++, r !== null && (s.pooledCacheLanes |= u), s = r), n.memoizedState = { parent: i, cache: s }, As(n), kl(n, Ve, s)) : ((l.lanes & u) !== 0 && (vd(l, n), nu(n, null, null, u), Hc()), s = l.memoizedState, r = n.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, n.memoizedState = s, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = s), kl(n, Ve, i)) : (i = r.cache, kl(n, Ve, i), i !== s.cache && au(
          n,
          [Ve],
          u,
          !0
        ))), ye(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(x(156, n.tag));
  }
  function ru(l) {
    l.flags |= 4;
  }
  function Dm(l, n, u, i, s) {
    if ((n = (l.mode & 32) !== 0) && (n = !1), n) {
      if (l.flags |= 16777216, (s & 335544128) === s)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (av()) l.flags |= 8192;
        else
          throw Rc = Oi, Di;
    } else l.flags &= -16777217;
  }
  function Om(l, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !pa(n))
      if (av()) l.flags |= 8192;
      else
        throw Rc = Oi, Di;
  }
  function jl(l, n) {
    n !== null && (l.flags |= 4), l.flags & 16384 && (n = l.tag !== 22 ? ai() : 536870912, l.lanes |= n, Re |= n);
  }
  function Jo(l, n) {
    if (!Ct)
      switch (l.tailMode) {
        case "hidden":
          n = l.tail;
          for (var u = null; n !== null; )
            n.alternate !== null && (u = n), n = n.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var i = null; u !== null; )
            u.alternate !== null && (i = u), u = u.sibling;
          i === null ? n || l.tail === null ? l.tail = null : l.tail.sibling = null : i.sibling = null;
      }
  }
  function ht(l) {
    var n = l.alternate !== null && l.alternate.child === l.child, u = 0, i = 0;
    if (n)
      for (var s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, i |= s.subtreeFlags & 65011712, i |= s.flags & 65011712, s.return = l, s = s.sibling;
    else
      for (s = l.child; s !== null; )
        u |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = l, s = s.sibling;
    return l.subtreeFlags |= i, l.childLanes = u, n;
  }
  function $p(l, n, u) {
    var i = n.pendingProps;
    switch (hd(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ht(n), null;
      case 1:
        return ht(n), null;
      case 3:
        return u = n.stateNode, i = null, l !== null && (i = l.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Dn(Ve), Sa(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (lu(n) ? ru(n) : l === null || l.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, V0())), ht(n), null;
      case 26:
        var s = n.type, r = n.memoizedState;
        return l === null ? (ru(n), r !== null ? (ht(n), Om(n, r)) : (ht(n), Dm(
          n,
          s,
          null,
          i,
          u
        ))) : r ? r !== l.memoizedState ? (ru(n), ht(n), Om(n, r)) : (ht(n), n.flags &= -16777217) : (l = l.memoizedProps, l !== i && ru(n), ht(n), Dm(
          n,
          s,
          l,
          i,
          u
        )), null;
      case 27:
        if (W(n), u = Ja.current, s = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== i && ru(n);
        else {
          if (!i) {
            if (n.stateNode === null)
              throw Error(x(166));
            return ht(n), null;
          }
          l = lt.current, lu(n) ? ms(n) : (l = df(s, i, u), n.stateNode = l, ru(n));
        }
        return ht(n), null;
      case 5:
        if (W(n), s = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== i && ru(n);
        else {
          if (!i) {
            if (n.stateNode === null)
              throw Error(x(166));
            return ht(n), null;
          }
          if (r = lt.current, lu(n))
            ms(n);
          else {
            var m = Lc(
              Ja.current
            );
            switch (r) {
              case 1:
                r = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                r = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    r = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    r = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    r = m.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(
                      r.firstChild
                    );
                    break;
                  case "select":
                    r = typeof i.is == "string" ? m.createElement("select", {
                      is: i.is
                    }) : m.createElement("select"), i.multiple ? r.multiple = !0 : i.size && (r.size = i.size);
                    break;
                  default:
                    r = typeof i.is == "string" ? m.createElement(s, { is: i.is }) : m.createElement(s);
                }
            }
            r[Pt] = n, r[wl] = i;
            t: for (m = n.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                r.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === n) break t;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === n)
                  break t;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            n.stateNode = r;
            t: switch (Ml(r, s, i), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
            i && ru(n);
          }
        }
        return ht(n), Dm(
          n,
          n.type,
          l === null ? null : l.memoizedProps,
          n.pendingProps,
          u
        ), null;
      case 6:
        if (l && n.stateNode != null)
          l.memoizedProps !== i && ru(n);
        else {
          if (typeof i != "string" && n.stateNode === null)
            throw Error(x(166));
          if (l = Ja.current, lu(n)) {
            if (l = n.stateNode, u = n.memoizedProps, i = null, s = sl, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            l[Pt] = n, l = !!(l.nodeValue === u || i !== null && i.suppressHydrationWarning === !0 || km(l.nodeValue, u)), l || ln(n, !0);
          } else
            l = Lc(l).createTextNode(
              i
            ), l[Pt] = n, n.stateNode = l;
        }
        return ht(n), null;
      case 31:
        if (u = n.memoizedState, l === null || l.memoizedState !== null) {
          if (i = lu(n), u !== null) {
            if (l === null) {
              if (!i) throw Error(x(318));
              if (l = n.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(x(557));
              l[Pt] = n;
            } else
              zc(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            ht(n), l = !1;
          } else
            u = V0(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), l = !0;
          if (!l)
            return n.flags & 256 ? (Il(n), n) : (Il(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(x(558));
        }
        return ht(n), null;
      case 13:
        if (i = n.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (s = lu(n), i !== null && i.dehydrated !== null) {
            if (l === null) {
              if (!s) throw Error(x(318));
              if (s = n.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(x(317));
              s[Pt] = n;
            } else
              zc(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            ht(n), s = !1;
          } else
            s = V0(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return n.flags & 256 ? (Il(n), n) : (Il(n), null);
        }
        return Il(n), (n.flags & 128) !== 0 ? (n.lanes = u, n) : (u = i !== null, l = l !== null && l.memoizedState !== null, u && (i = n.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), r = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (r = i.memoizedState.cachePool.pool), r !== s && (i.flags |= 2048)), u !== l && u && (n.child.flags |= 8192), jl(n, n.updateQueue), ht(n), null);
      case 4:
        return Sa(), l === null && ff(n.stateNode.containerInfo), ht(n), null;
      case 10:
        return Dn(n.type), ht(n), null;
      case 19:
        if (k(Se), i = n.memoizedState, i === null) return ht(n), null;
        if (s = (n.flags & 128) !== 0, r = i.rendering, r === null)
          if (s) Jo(i, !1);
          else {
            if (fe !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = n.child; l !== null; ) {
                if (r = jo(l), r !== null) {
                  for (n.flags |= 128, Jo(i, !1), l = r.updateQueue, n.updateQueue = l, jl(n, l), n.subtreeFlags = 0, l = u, u = n.child; u !== null; )
                    j0(u, l), u = u.sibling;
                  return tt(
                    Se,
                    Se.current & 1 | 2
                  ), Ct && en(n, i.treeForkCount), n.child;
                }
                l = l.sibling;
              }
            i.tail !== null && Dl() > Lt && (n.flags |= 128, s = !0, Jo(i, !1), n.lanes = 4194304);
          }
        else {
          if (!s)
            if (l = jo(r), l !== null) {
              if (n.flags |= 128, s = !0, l = l.updateQueue, n.updateQueue = l, jl(n, l), Jo(i, !0), i.tail === null && i.tailMode === "hidden" && !r.alternate && !Ct)
                return ht(n), null;
            } else
              2 * Dl() - i.renderingStartTime > Lt && u !== 536870912 && (n.flags |= 128, s = !0, Jo(i, !1), n.lanes = 4194304);
          i.isBackwards ? (r.sibling = n.child, n.child = r) : (l = i.last, l !== null ? l.sibling = r : n.child = r, i.last = r);
        }
        return i.tail !== null ? (l = i.tail, i.rendering = l, i.tail = l.sibling, i.renderingStartTime = Dl(), l.sibling = null, u = Se.current, tt(
          Se,
          s ? u & 1 | 2 : u & 1
        ), Ct && en(n, i.treeForkCount), l) : (ht(n), null);
      case 22:
      case 23:
        return Il(n), qo(), i = n.memoizedState !== null, l !== null ? l.memoizedState !== null !== i && (n.flags |= 8192) : i && (n.flags |= 8192), i ? (u & 536870912) !== 0 && (n.flags & 128) === 0 && (ht(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : ht(n), u = n.updateQueue, u !== null && jl(n, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), i = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (i = n.memoizedState.cachePool.pool), i !== u && (n.flags |= 2048), l !== null && k(Ma), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), Dn(Ve), ht(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(x(156, n.tag));
  }
  function Wp(l, n) {
    switch (hd(n), n.tag) {
      case 1:
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 3:
        return Dn(Ve), Sa(), l = n.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (n.flags = l & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return W(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Il(n), n.alternate === null)
            throw Error(x(340));
          zc();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 13:
        if (Il(n), l = n.memoizedState, l !== null && l.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(x(340));
          zc();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 19:
        return k(Se), null;
      case 4:
        return Sa(), null;
      case 10:
        return Dn(n.type), null;
      case 22:
      case 23:
        return Il(n), qo(), l !== null && k(Ma), l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 24:
        return Dn(Ve), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function kp(l, n) {
    switch (hd(n), n.tag) {
      case 3:
        Dn(Ve), Sa();
        break;
      case 26:
      case 27:
      case 5:
        W(n);
        break;
      case 4:
        Sa();
        break;
      case 31:
        n.memoizedState !== null && Il(n);
        break;
      case 13:
        Il(n);
        break;
      case 19:
        k(Se);
        break;
      case 10:
        Dn(n.type);
        break;
      case 22:
      case 23:
        Il(n), qo(), l !== null && k(Ma);
        break;
      case 24:
        Dn(Ve);
    }
  }
  function nn(l, n) {
    try {
      var u = n.updateQueue, i = u !== null ? u.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        u = s;
        do {
          if ((u.tag & l) === l) {
            i = void 0;
            var r = u.create, m = u.inst;
            i = r(), m.destroy = i;
          }
          u = u.next;
        } while (u !== s);
      }
    } catch (v) {
      kt(n, n.return, v);
    }
  }
  function Na(l, n, u) {
    try {
      var i = n.updateQueue, s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        i = r;
        do {
          if ((i.tag & l) === l) {
            var m = i.inst, v = m.destroy;
            if (v !== void 0) {
              m.destroy = void 0, s = n;
              var T = u, U = v;
              try {
                U();
              } catch (q) {
                kt(
                  s,
                  T,
                  q
                );
              }
            }
          }
          i = i.next;
        } while (i !== r);
      }
    } catch (q) {
      kt(n, n.return, q);
    }
  }
  function wd(l) {
    var n = l.updateQueue;
    if (n !== null) {
      var u = l.stateNode;
      try {
        Bc(n, u);
      } catch (i) {
        kt(l, l.return, i);
      }
    }
  }
  function Xc(l, n, u) {
    u.props = qc(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (i) {
      kt(l, n, i);
    }
  }
  function du(l, n) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var i = l.stateNode;
            break;
          case 30:
            i = l.stateNode;
            break;
          default:
            i = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(i) : u.current = i;
      }
    } catch (s) {
      kt(l, n, s);
    }
  }
  function Un(l, n) {
    var u = l.ref, i = l.refCleanup;
    if (u !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          kt(l, n, s);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (s) {
          kt(l, n, s);
        }
      else u.current = null;
  }
  function Mm(l) {
    var n = l.type, u = l.memoizedProps, i = l.stateNode;
    try {
      t: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && i.focus();
          break t;
        case "img":
          u.src ? i.src = u.src : u.srcSet && (i.srcset = u.srcSet);
      }
    } catch (s) {
      kt(l, l.return, s);
    }
  }
  function Jd(l, n, u) {
    try {
      var i = l.stateNode;
      Im(i, l.type, u, n), i[wl] = n;
    } catch (s) {
      kt(l, l.return, s);
    }
  }
  function Rm(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Nn(l.type) || l.tag === 4;
  }
  function Ko(l) {
    t: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Rm(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Nn(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue t;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function $o(l, n, u) {
    var i = l.tag;
    if (i === 5 || i === 6)
      l = l.stateNode, n ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, n) : (n = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, n.appendChild(l), u = u._reactRootContainer, u != null || n.onclick !== null || (n.onclick = yn));
    else if (i !== 4 && (i === 27 && Nn(l.type) && (u = l.stateNode, n = null), l = l.child, l !== null))
      for ($o(l, n, u), l = l.sibling; l !== null; )
        $o(l, n, u), l = l.sibling;
  }
  function Wo(l, n, u) {
    var i = l.tag;
    if (i === 5 || i === 6)
      l = l.stateNode, n ? u.insertBefore(l, n) : u.appendChild(l);
    else if (i !== 4 && (i === 27 && Nn(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (Wo(l, n, u), l = l.sibling; l !== null; )
        Wo(l, n, u), l = l.sibling;
  }
  function Um(l) {
    var n = l.stateNode, u = l.memoizedProps;
    try {
      for (var i = l.type, s = n.attributes; s.length; )
        n.removeAttributeNode(s[0]);
      Ml(n, i, u), n[Pt] = l, n[wl] = u;
    } catch (r) {
      kt(l, l.return, r);
    }
  }
  var Iu = !1, We = !1, Kd = !1, _m = typeof WeakSet == "function" ? WeakSet : Set, ml = null;
  function ko(l, n) {
    if (l = l.containerInfo, hh = ll, l = Tc(l), is(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        t: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var i = u.getSelection && u.getSelection();
          if (i && i.rangeCount !== 0) {
            u = i.anchorNode;
            var s = i.anchorOffset, r = i.focusNode;
            i = i.focusOffset;
            try {
              u.nodeType, r.nodeType;
            } catch {
              u = null;
              break t;
            }
            var m = 0, v = -1, T = -1, U = 0, q = 0, X = l, _ = null;
            e: for (; ; ) {
              for (var N; X !== u || s !== 0 && X.nodeType !== 3 || (v = m + s), X !== r || i !== 0 && X.nodeType !== 3 || (T = m + i), X.nodeType === 3 && (m += X.nodeValue.length), (N = X.firstChild) !== null; )
                _ = X, X = N;
              for (; ; ) {
                if (X === l) break e;
                if (_ === u && ++U === s && (v = m), _ === r && ++q === i && (T = m), (N = X.nextSibling) !== null) break;
                X = _, _ = X.parentNode;
              }
              X = N;
            }
            u = v === -1 || T === -1 ? null : { start: v, end: T };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (mh = { focusedElem: l, selectionRange: u }, ll = !1, ml = n; ml !== null; )
      if (n = ml, l = n.child, (n.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = n, ml = l;
      else
        for (; ml !== null; ) {
          switch (n = ml, r = n.alternate, l = n.flags, n.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = n.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (u = 0; u < l.length; u++)
                  s = l[u], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && r !== null) {
                l = void 0, u = n, s = r.memoizedProps, r = r.memoizedState, i = u.stateNode;
                try {
                  var F = qc(
                    u.type,
                    s
                  );
                  l = i.getSnapshotBeforeUpdate(
                    F,
                    r
                  ), i.__reactInternalSnapshotBeforeUpdate = l;
                } catch (it) {
                  kt(
                    u,
                    u.return,
                    it
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = n.stateNode.containerInfo, u = l.nodeType, u === 9)
                  nr(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      nr(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(x(163));
          }
          if (l = n.sibling, l !== null) {
            l.return = n.return, ml = l;
            break;
          }
          ml = n.return;
        }
  }
  function Qs(l, n, u) {
    var i = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Pu(l, u), i & 4 && nn(5, u);
        break;
      case 1:
        if (Pu(l, u), i & 4)
          if (l = u.stateNode, n === null)
            try {
              l.componentDidMount();
            } catch (m) {
              kt(u, u.return, m);
            }
          else {
            var s = qc(
              u.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              l.componentDidUpdate(
                s,
                n,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              kt(
                u,
                u.return,
                m
              );
            }
          }
        i & 64 && wd(u), i & 512 && du(u, u.return);
        break;
      case 3:
        if (Pu(l, u), i & 64 && (l = u.updateQueue, l !== null)) {
          if (n = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                n = u.child.stateNode;
                break;
              case 1:
                n = u.child.stateNode;
            }
          try {
            Bc(l, n);
          } catch (m) {
            kt(u, u.return, m);
          }
        }
        break;
      case 27:
        n === null && i & 4 && Um(u);
      case 26:
      case 5:
        Pu(l, u), n === null && i & 4 && Mm(u), i & 512 && du(u, u.return);
        break;
      case 12:
        Pu(l, u);
        break;
      case 31:
        Pu(l, u), i & 4 && Fp(l, u);
        break;
      case 13:
        Pu(l, u), i & 4 && Bm(l, u), i & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = xa.bind(
          null,
          u
        ), rf(l, u))));
        break;
      case 22:
        if (i = u.memoizedState !== null || Iu, !i) {
          n = n !== null && n.memoizedState !== null || We, s = Iu;
          var r = We;
          Iu = i, (We = n) && !r ? _n(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : Pu(l, u), Iu = s, We = r;
        }
        break;
      case 30:
        break;
      default:
        Pu(l, u);
    }
  }
  function Cm(l) {
    var n = l.alternate;
    n !== null && (l.alternate = null, Cm(n)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (n = l.stateNode, n !== null && Zr(n)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var oe = null, ea = !1;
  function hu(l, n, u) {
    for (u = u.child; u !== null; )
      Hm(l, n, u), u = u.sibling;
  }
  function Hm(l, n, u) {
    if (oa && typeof oa.onCommitFiberUnmount == "function")
      try {
        oa.onCommitFiberUnmount(li, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        We || Un(u, n), hu(
          l,
          n,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        We || Un(u, n);
        var i = oe, s = ea;
        Nn(u.type) && (oe = u.stateNode, ea = !1), hu(
          l,
          n,
          u
        ), wi(u.stateNode), oe = i, ea = s;
        break;
      case 5:
        We || Un(u, n);
      case 6:
        if (i = oe, s = ea, oe = null, hu(
          l,
          n,
          u
        ), oe = i, ea = s, oe !== null)
          if (ea)
            try {
              (oe.nodeType === 9 ? oe.body : oe.nodeName === "HTML" ? oe.ownerDocument.body : oe).removeChild(u.stateNode);
            } catch (r) {
              kt(
                u,
                n,
                r
              );
            }
          else
            try {
              oe.removeChild(u.stateNode);
            } catch (r) {
              kt(
                u,
                n,
                r
              );
            }
        break;
      case 18:
        oe !== null && (ea ? (l = oe, ly(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), Ef(l)) : ly(oe, u.stateNode));
        break;
      case 4:
        i = oe, s = ea, oe = u.stateNode.containerInfo, ea = !0, hu(
          l,
          n,
          u
        ), oe = i, ea = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Na(2, u, n), We || Na(4, u, n), hu(
          l,
          n,
          u
        );
        break;
      case 1:
        We || (Un(u, n), i = u.stateNode, typeof i.componentWillUnmount == "function" && Xc(
          u,
          n,
          i
        )), hu(
          l,
          n,
          u
        );
        break;
      case 21:
        hu(
          l,
          n,
          u
        );
        break;
      case 22:
        We = (i = We) || u.memoizedState !== null, hu(
          l,
          n,
          u
        ), We = i;
        break;
      default:
        hu(
          l,
          n,
          u
        );
    }
  }
  function Fp(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Ef(l);
      } catch (u) {
        kt(n, n.return, u);
      }
    }
  }
  function Bm(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Ef(l);
      } catch (u) {
        kt(n, n.return, u);
      }
  }
  function Vs(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var n = l.stateNode;
        return n === null && (n = l.stateNode = new _m()), n;
      case 22:
        return l = l.stateNode, n = l._retryCache, n === null && (n = l._retryCache = new _m()), n;
      default:
        throw Error(x(435, l.tag));
    }
  }
  function Zs(l, n) {
    var u = Vs(l);
    n.forEach(function(i) {
      if (!u.has(i)) {
        u.add(i);
        var s = gv.bind(null, l, i);
        i.then(s, s);
      }
    });
  }
  function la(l, n) {
    var u = n.deletions;
    if (u !== null)
      for (var i = 0; i < u.length; i++) {
        var s = u[i], r = l, m = n, v = m;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (Nn(v.type)) {
                oe = v.stateNode, ea = !1;
                break t;
              }
              break;
            case 5:
              oe = v.stateNode, ea = !1;
              break t;
            case 3:
            case 4:
              oe = v.stateNode.containerInfo, ea = !0;
              break t;
          }
          v = v.return;
        }
        if (oe === null) throw Error(x(160));
        Hm(r, m, s), oe = null, ea = !1, r = s.alternate, r !== null && (r.return = null), s.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        $d(n, l), n = n.sibling;
  }
  var St = null;
  function $d(l, n) {
    var u = l.alternate, i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        la(n, l), ra(l), i & 4 && (Na(3, l, l.return), nn(3, l), Na(5, l, l.return));
        break;
      case 1:
        la(n, l), ra(l), i & 512 && (We || u === null || Un(u, u.return)), i & 64 && Iu && (l = l.updateQueue, l !== null && (i = l.callbacks, i !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? i : u.concat(i))));
        break;
      case 26:
        var s = St;
        if (la(n, l), ra(l), i & 512 && (We || u === null || Un(u, u.return)), i & 4) {
          var r = u !== null ? u.memoizedState : null;
          if (i = l.memoizedState, u === null)
            if (i === null)
              if (l.stateNode === null) {
                t: {
                  i = l.type, u = l.memoizedProps, s = s.ownerDocument || s;
                  e: switch (i) {
                    case "title":
                      r = s.getElementsByTagName("title")[0], (!r || r[Jn] || r[Pt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = s.createElement(i), s.head.insertBefore(
                        r,
                        s.querySelector("head > title")
                      )), Ml(r, i, u), r[Pt] = l, Jt(r), i = r;
                      break t;
                    case "link":
                      var m = cy(
                        "link",
                        "href",
                        s
                      ).get(i + (u.href || ""));
                      if (m) {
                        for (var v = 0; v < m.length; v++)
                          if (r = m[v], r.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && r.getAttribute("rel") === (u.rel == null ? null : u.rel) && r.getAttribute("title") === (u.title == null ? null : u.title) && r.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            m.splice(v, 1);
                            break e;
                          }
                      }
                      r = s.createElement(i), Ml(r, i, u), s.head.appendChild(r);
                      break;
                    case "meta":
                      if (m = cy(
                        "meta",
                        "content",
                        s
                      ).get(i + (u.content || ""))) {
                        for (v = 0; v < m.length; v++)
                          if (r = m[v], r.getAttribute("content") === (u.content == null ? null : "" + u.content) && r.getAttribute("name") === (u.name == null ? null : u.name) && r.getAttribute("property") === (u.property == null ? null : u.property) && r.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && r.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            m.splice(v, 1);
                            break e;
                          }
                      }
                      r = s.createElement(i), Ml(r, i, u), s.head.appendChild(r);
                      break;
                    default:
                      throw Error(x(468, i));
                  }
                  r[Pt] = l, Jt(r), i = r;
                }
                l.stateNode = i;
              } else
                Sh(
                  s,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = uy(
                s,
                i,
                l.memoizedProps
              );
          else
            r !== i ? (r === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : r.count--, i === null ? Sh(
              s,
              l.type,
              l.stateNode
            ) : uy(
              s,
              i,
              l.memoizedProps
            )) : i === null && l.stateNode !== null && Jd(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        la(n, l), ra(l), i & 512 && (We || u === null || Un(u, u.return)), u !== null && i & 4 && Jd(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (la(n, l), ra(l), i & 512 && (We || u === null || Un(u, u.return)), l.flags & 32) {
          s = l.stateNode;
          try {
            $n(s, "");
          } catch (F) {
            kt(l, l.return, F);
          }
        }
        i & 4 && l.stateNode != null && (s = l.memoizedProps, Jd(
          l,
          s,
          u !== null ? u.memoizedProps : s
        )), i & 1024 && (Kd = !0);
        break;
      case 6:
        if (la(n, l), ra(l), i & 4) {
          if (l.stateNode === null)
            throw Error(x(162));
          i = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = i;
          } catch (F) {
            kt(l, l.return, F);
          }
        }
        break;
      case 3:
        if (vf = null, s = St, St = Gl(n.containerInfo), la(n, l), St = s, ra(l), i & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            Ef(n.containerInfo);
          } catch (F) {
            kt(l, l.return, F);
          }
        Kd && (Kd = !1, Nm(l));
        break;
      case 4:
        i = St, St = Gl(
          l.stateNode.containerInfo
        ), la(n, l), ra(l), St = i;
        break;
      case 12:
        la(n, l), ra(l);
        break;
      case 31:
        la(n, l), ra(l), i & 4 && (i = l.updateQueue, i !== null && (l.updateQueue = null, Zs(l, i)));
        break;
      case 13:
        la(n, l), ra(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (Bn = Dl()), i & 4 && (i = l.updateQueue, i !== null && (l.updateQueue = null, Zs(l, i)));
        break;
      case 22:
        s = l.memoizedState !== null;
        var T = u !== null && u.memoizedState !== null, U = Iu, q = We;
        if (Iu = U || s, We = q || T, la(n, l), We = q, Iu = U, ra(l), i & 8192)
          t: for (n = l.stateNode, n._visibility = s ? n._visibility & -2 : n._visibility | 1, s && (u === null || T || Iu || We || ji(l)), u = null, n = l; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (u === null) {
                T = u = n;
                try {
                  if (r = T.stateNode, s)
                    m = r.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    v = T.stateNode;
                    var X = T.memoizedProps.style, _ = X != null && X.hasOwnProperty("display") ? X.display : null;
                    v.style.display = _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (F) {
                  kt(T, T.return, F);
                }
              }
            } else if (n.tag === 6) {
              if (u === null) {
                T = n;
                try {
                  T.stateNode.nodeValue = s ? "" : T.memoizedProps;
                } catch (F) {
                  kt(T, T.return, F);
                }
              }
            } else if (n.tag === 18) {
              if (u === null) {
                T = n;
                try {
                  var N = T.stateNode;
                  s ? we(N, !0) : we(T.stateNode, !1);
                } catch (F) {
                  kt(T, T.return, F);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === l) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === l) break t;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === l) break t;
              u === n && (u = null), n = n.return;
            }
            u === n && (u = null), n.sibling.return = n.return, n = n.sibling;
          }
        i & 4 && (i = l.updateQueue, i !== null && (u = i.retryQueue, u !== null && (i.retryQueue = null, Zs(l, u))));
        break;
      case 19:
        la(n, l), ra(l), i & 4 && (i = l.updateQueue, i !== null && (l.updateQueue = null, Zs(l, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        la(n, l), ra(l);
    }
  }
  function ra(l) {
    var n = l.flags;
    if (n & 2) {
      try {
        for (var u, i = l.return; i !== null; ) {
          if (Rm(i)) {
            u = i;
            break;
          }
          i = i.return;
        }
        if (u == null) throw Error(x(160));
        switch (u.tag) {
          case 27:
            var s = u.stateNode, r = Ko(l);
            Wo(l, r, s);
            break;
          case 5:
            var m = u.stateNode;
            u.flags & 32 && ($n(m, ""), u.flags &= -33);
            var v = Ko(l);
            Wo(l, v, m);
            break;
          case 3:
          case 4:
            var T = u.stateNode.containerInfo, U = Ko(l);
            $o(
              l,
              U,
              T
            );
            break;
          default:
            throw Error(x(161));
        }
      } catch (q) {
        kt(l, l.return, q);
      }
      l.flags &= -3;
    }
    n & 4096 && (l.flags &= -4097);
  }
  function Nm(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var n = l;
        Nm(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), l = l.sibling;
      }
  }
  function Pu(l, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Qs(l, n.alternate, n), n = n.sibling;
  }
  function ji(l) {
    for (l = l.child; l !== null; ) {
      var n = l;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Na(4, n, n.return), ji(n);
          break;
        case 1:
          Un(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && Xc(
            n,
            n.return,
            u
          ), ji(n);
          break;
        case 27:
          wi(n.stateNode);
        case 26:
        case 5:
          Un(n, n.return), ji(n);
          break;
        case 22:
          n.memoizedState === null && ji(n);
          break;
        case 30:
          ji(n);
          break;
        default:
          ji(n);
      }
      l = l.sibling;
    }
  }
  function _n(l, n, u) {
    for (u = u && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var i = n.alternate, s = l, r = n, m = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          _n(
            s,
            r,
            u
          ), nn(4, r);
          break;
        case 1:
          if (_n(
            s,
            r,
            u
          ), i = r, s = i.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (U) {
              kt(i, i.return, U);
            }
          if (i = r, s = i.updateQueue, s !== null) {
            var v = i.stateNode;
            try {
              var T = s.shared.hiddenCallbacks;
              if (T !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < T.length; s++)
                  Sd(T[s], v);
            } catch (U) {
              kt(i, i.return, U);
            }
          }
          u && m & 64 && wd(r), du(r, r.return);
          break;
        case 27:
          Um(r);
        case 26:
        case 5:
          _n(
            s,
            r,
            u
          ), u && i === null && m & 4 && Mm(r), du(r, r.return);
          break;
        case 12:
          _n(
            s,
            r,
            u
          );
          break;
        case 31:
          _n(
            s,
            r,
            u
          ), u && m & 4 && Fp(s, r);
          break;
        case 13:
          _n(
            s,
            r,
            u
          ), u && m & 4 && Bm(s, r);
          break;
        case 22:
          r.memoizedState === null && _n(
            s,
            r,
            u
          ), du(r, r.return);
          break;
        case 30:
          break;
        default:
          _n(
            s,
            r,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Wd(l, n) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && vs(u));
  }
  function kd(l, n) {
    l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && vs(l));
  }
  function un(l, n, u, i) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        Fo(
          l,
          n,
          u,
          i
        ), n = n.sibling;
  }
  function Fo(l, n, u, i) {
    var s = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        un(
          l,
          n,
          u,
          i
        ), s & 2048 && nn(9, n);
        break;
      case 1:
        un(
          l,
          n,
          u,
          i
        );
        break;
      case 3:
        un(
          l,
          n,
          u,
          i
        ), s & 2048 && (l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && vs(l)));
        break;
      case 12:
        if (s & 2048) {
          un(
            l,
            n,
            u,
            i
          ), l = n.stateNode;
          try {
            var r = n.memoizedProps, m = r.id, v = r.onPostCommit;
            typeof v == "function" && v(
              m,
              n.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (T) {
            kt(n, n.return, T);
          }
        } else
          un(
            l,
            n,
            u,
            i
          );
        break;
      case 31:
        un(
          l,
          n,
          u,
          i
        );
        break;
      case 13:
        un(
          l,
          n,
          u,
          i
        );
        break;
      case 23:
        break;
      case 22:
        r = n.stateNode, m = n.alternate, n.memoizedState !== null ? r._visibility & 2 ? un(
          l,
          n,
          u,
          i
        ) : Ls(l, n) : r._visibility & 2 ? un(
          l,
          n,
          u,
          i
        ) : (r._visibility |= 2, Io(
          l,
          n,
          u,
          i,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Wd(m, n);
        break;
      case 24:
        un(
          l,
          n,
          u,
          i
        ), s & 2048 && kd(n.alternate, n);
        break;
      default:
        un(
          l,
          n,
          u,
          i
        );
    }
  }
  function Io(l, n, u, i, s) {
    for (s = s && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var r = l, m = n, v = u, T = i, U = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Io(
            r,
            m,
            v,
            T,
            s
          ), nn(8, m);
          break;
        case 23:
          break;
        case 22:
          var q = m.stateNode;
          m.memoizedState !== null ? q._visibility & 2 ? Io(
            r,
            m,
            v,
            T,
            s
          ) : Ls(
            r,
            m
          ) : (q._visibility |= 2, Io(
            r,
            m,
            v,
            T,
            s
          )), s && U & 2048 && Wd(
            m.alternate,
            m
          );
          break;
        case 24:
          Io(
            r,
            m,
            v,
            T,
            s
          ), s && U & 2048 && kd(m.alternate, m);
          break;
        default:
          Io(
            r,
            m,
            v,
            T,
            s
          );
      }
      n = n.sibling;
    }
  }
  function Ls(l, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var u = l, i = n, s = i.flags;
        switch (i.tag) {
          case 22:
            Ls(u, i), s & 2048 && Wd(
              i.alternate,
              i
            );
            break;
          case 24:
            Ls(u, i), s & 2048 && kd(i.alternate, i);
            break;
          default:
            Ls(u, i);
        }
        n = n.sibling;
      }
  }
  var da = 8192;
  function mu(l, n, u) {
    if (l.subtreeFlags & da)
      for (l = l.child; l !== null; )
        Ip(
          l,
          n,
          u
        ), l = l.sibling;
  }
  function Ip(l, n, u) {
    switch (l.tag) {
      case 26:
        mu(
          l,
          n,
          u
        ), l.flags & da && l.memoizedState !== null && Su(
          u,
          St,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        mu(
          l,
          n,
          u
        );
        break;
      case 3:
      case 4:
        var i = St;
        St = Gl(l.stateNode.containerInfo), mu(
          l,
          n,
          u
        ), St = i;
        break;
      case 22:
        l.memoizedState === null && (i = l.alternate, i !== null && i.memoizedState !== null ? (i = da, da = 16777216, mu(
          l,
          n,
          u
        ), da = i) : mu(
          l,
          n,
          u
        ));
        break;
      default:
        mu(
          l,
          n,
          u
        );
    }
  }
  function Fd(l) {
    var n = l.alternate;
    if (n !== null && (l = n.child, l !== null)) {
      n.child = null;
      do
        n = l.sibling, l.sibling = null, l = n;
      while (l !== null);
    }
  }
  function Po(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var i = n[u];
          ml = i, Id(
            i,
            l
          );
        }
      Fd(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        xm(l), l = l.sibling;
  }
  function xm(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Po(l), l.flags & 2048 && Na(9, l, l.return);
        break;
      case 3:
        Po(l);
        break;
      case 12:
        Po(l);
        break;
      case 22:
        var n = l.stateNode;
        l.memoizedState !== null && n._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (n._visibility &= -3, ws(l)) : Po(l);
        break;
      default:
        Po(l);
    }
  }
  function ws(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var i = n[u];
          ml = i, Id(
            i,
            l
          );
        }
      Fd(l);
    }
    for (l = l.child; l !== null; ) {
      switch (n = l, n.tag) {
        case 0:
        case 11:
        case 15:
          Na(8, n, n.return), ws(n);
          break;
        case 22:
          u = n.stateNode, u._visibility & 2 && (u._visibility &= -3, ws(n));
          break;
        default:
          ws(n);
      }
      l = l.sibling;
    }
  }
  function Id(l, n) {
    for (; ml !== null; ) {
      var u = ml;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Na(8, u, n);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var i = u.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          vs(u.memoizedState.cache);
      }
      if (i = u.child, i !== null) i.return = u, ml = i;
      else
        t: for (u = l; ml !== null; ) {
          i = ml;
          var s = i.sibling, r = i.return;
          if (Cm(i), i === u) {
            ml = null;
            break t;
          }
          if (s !== null) {
            s.return = r, ml = s;
            break t;
          }
          ml = r;
        }
    }
  }
  var Pp = {
    getCacheForType: function(l) {
      var n = V(Ve), u = n.data.get(l);
      return u === void 0 && (u = l(), n.data.set(l, u)), u;
    },
    cacheSignal: function() {
      return V(Ve).controller.signal;
    }
  }, qm = typeof WeakMap == "function" ? WeakMap : Map, Qt = 0, ee = null, Ht = null, Mt = 0, Wt = 0, st = null, yu = !1, Qc = !1, Pd = !1, Cn = 0, fe = 0, Hn = 0, Gi = 0, th = 0, aa = 0, Re = 0, Js = null, Ue = null, eh = !1, Bn = 0, Ym = 0, Lt = 1 / 0, tf = null, be = null, el = 0, tc = null, Vc = null, pu = 0, ha = 0, lh = null, ah = null, ef = 0, Ks = null;
  function ma() {
    return (Qt & 2) !== 0 && Mt !== 0 ? Mt & -Mt : O.T !== null ? oh() : Qr();
  }
  function tv() {
    if (aa === 0)
      if ((Mt & 536870912) === 0 || Ct) {
        var l = dn;
        dn <<= 1, (dn & 3932160) === 0 && (dn = 262144), aa = l;
      } else aa = 536870912;
    return l = Fl.current, l !== null && (l.flags |= 32), aa;
  }
  function na(l, n, u) {
    (l === ee && (Wt === 2 || Wt === 9) || l.cancelPendingCommit !== null) && (vu(l, 0), ec(
      l,
      Mt,
      aa,
      !1
    )), mo(l, u), ((Qt & 2) === 0 || l !== ee) && (l === ee && ((Qt & 2) === 0 && (Gi |= u), fe === 4 && ec(
      l,
      Mt,
      aa,
      !1
    )), gu(l));
  }
  function ev(l, n, u) {
    if ((Qt & 6) !== 0) throw Error(x(327));
    var i = !u && (n & 127) === 0 && (n & l.expiredLanes) === 0 || hn(l, n), s = i ? cv(l, n) : uh(l, n, !0), r = i;
    do {
      if (s === 0) {
        Qc && !i && ec(l, n, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, r && !lv(u)) {
          s = uh(l, n, !1), r = !1;
          continue;
        }
        if (s === 2) {
          if (r = n, l.errorRecoveryDisabledLanes & r)
            var m = 0;
          else
            m = l.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            n = m;
            t: {
              var v = l;
              s = Js;
              var T = v.current.memoizedState.isDehydrated;
              if (T && (vu(v, m).flags |= 256), m = uh(
                v,
                m,
                !1
              ), m !== 2) {
                if (Pd && !T) {
                  v.errorRecoveryDisabledLanes |= r, Gi |= r, s = 4;
                  break t;
                }
                r = Ue, Ue = s, r !== null && (Ue === null ? Ue = r : Ue.push.apply(
                  Ue,
                  r
                ));
              }
              s = m;
            }
            if (r = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          vu(l, 0), ec(l, n, 0, !0);
          break;
        }
        t: {
          switch (i = l, r = s, r) {
            case 0:
            case 1:
              throw Error(x(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              ec(
                i,
                n,
                aa,
                !yu
              );
              break t;
            case 2:
              Ue = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(x(329));
          }
          if ((n & 62914560) === n && (s = Bn + 300 - Dl(), 10 < s)) {
            if (ec(
              i,
              n,
              aa,
              !yu
            ), Xe(i, 0, !0) !== 0) break t;
            pu = n, i.timeoutHandle = ar(
              $s.bind(
                null,
                i,
                u,
                Ue,
                tf,
                eh,
                n,
                aa,
                Gi,
                Re,
                yu,
                r,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break t;
          }
          $s(
            i,
            u,
            Ue,
            tf,
            eh,
            n,
            aa,
            Gi,
            Re,
            yu,
            r,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    gu(l);
  }
  function $s(l, n, u, i, s, r, m, v, T, U, q, X, _, N) {
    if (l.timeoutHandle = -1, X = n.subtreeFlags, X & 8192 || (X & 16785408) === 16785408) {
      X = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: yn
      }, Ip(
        n,
        r,
        X
      );
      var F = (r & 62914560) === r ? Bn - Dl() : (r & 4194048) === r ? Ym - Dl() : 0;
      if (F = oy(
        X,
        F
      ), F !== null) {
        pu = r, l.cancelPendingCommit = F(
          sv.bind(
            null,
            l,
            n,
            r,
            u,
            i,
            s,
            m,
            v,
            T,
            q,
            X,
            null,
            _,
            N
          )
        ), ec(l, r, m, !U);
        return;
      }
    }
    sv(
      l,
      n,
      r,
      u,
      i,
      s,
      m,
      v,
      T
    );
  }
  function lv(l) {
    for (var n = l; ; ) {
      var u = n.tag;
      if ((u === 0 || u === 11 || u === 15) && n.flags & 16384 && (u = n.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var i = 0; i < u.length; i++) {
          var s = u[i], r = s.getSnapshot;
          s = s.value;
          try {
            if (!Yl(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = n.child, n.subtreeFlags & 16384 && u !== null)
        u.return = n, n = u;
      else {
        if (n === l) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function ec(l, n, u, i) {
    n &= ~th, n &= ~Gi, l.suspendedLanes |= n, l.pingedLanes &= ~n, i && (l.warmLanes |= n), i = l.expirationTimes;
    for (var s = n; 0 < s; ) {
      var r = 31 - Ll(s), m = 1 << r;
      i[r] = -1, s &= ~m;
    }
    u !== 0 && kf(l, u, n);
  }
  function lf() {
    return (Qt & 6) === 0 ? (ac(0), !1) : !0;
  }
  function jm() {
    if (Ht !== null) {
      if (Wt === 0)
        var l = Ht.return;
      else
        l = Ht, zn = Lu = null, Ms(l), Uc = null, Mi = 0, l = Ht;
      for (; l !== null; )
        kp(l.alternate, l), l = l.return;
      Ht = null;
    }
  }
  function vu(l, n) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, Ov(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), pu = 0, jm(), ee = l, Ht = u = Vu(l.current, null), Mt = n, Wt = 0, st = null, yu = !1, Qc = hn(l, n), Pd = !1, Re = aa = th = Gi = Hn = fe = 0, Ue = Js = null, eh = !1, (n & 8) !== 0 && (n |= n & 32);
    var i = l.entangledLanes;
    if (i !== 0)
      for (l = l.entanglements, i &= n; 0 < i; ) {
        var s = 31 - Ll(i), r = 1 << s;
        n |= l[s], i &= ~r;
      }
    return Cn = n, Aa(), u;
  }
  function af(l, n) {
    gt = null, O.H = xs, n === Oc || n === No ? (n = K0(), Wt = 3) : n === Di ? (n = K0(), Wt = 4) : Wt = n === Xd ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, st = n, Ht === null && (fe = 1, wo(
      l,
      Da(n, l.current)
    ));
  }
  function av() {
    var l = Fl.current;
    return l === null ? !0 : (Mt & 4194048) === Mt ? _a === null : (Mt & 62914560) === Mt || (Mt & 536870912) !== 0 ? l === _a : !1;
  }
  function nv() {
    var l = O.H;
    return O.H = xs, l === null ? xs : l;
  }
  function uv() {
    var l = O.A;
    return O.A = Pp, l;
  }
  function nh() {
    fe = 4, yu || (Mt & 4194048) !== Mt && Fl.current !== null || (Qc = !0), (Hn & 134217727) === 0 && (Gi & 134217727) === 0 || ee === null || ec(
      ee,
      Mt,
      aa,
      !1
    );
  }
  function uh(l, n, u) {
    var i = Qt;
    Qt |= 2;
    var s = nv(), r = uv();
    (ee !== l || Mt !== n) && (tf = null, vu(l, n)), n = !1;
    var m = fe;
    t: do
      try {
        if (Wt !== 0 && Ht !== null) {
          var v = Ht, T = st;
          switch (Wt) {
            case 8:
              jm(), m = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Fl.current === null && (n = !0);
              var U = Wt;
              if (Wt = 0, st = null, Xi(l, v, T, U), u && Qc) {
                m = 0;
                break t;
              }
              break;
            default:
              U = Wt, Wt = 0, st = null, Xi(l, v, T, U);
          }
        }
        $1(), m = fe;
        break;
      } catch (q) {
        af(l, q);
      }
    while (!0);
    return n && l.shellSuspendCounter++, zn = Lu = null, Qt = i, O.H = s, O.A = r, Ht === null && (ee = null, Mt = 0, Aa()), m;
  }
  function $1() {
    for (; Ht !== null; ) iv(Ht);
  }
  function cv(l, n) {
    var u = Qt;
    Qt |= 2;
    var i = nv(), s = uv();
    ee !== l || Mt !== n ? (tf = null, Lt = Dl() + 500, vu(l, n)) : Qc = hn(
      l,
      n
    );
    t: do
      try {
        if (Wt !== 0 && Ht !== null) {
          n = Ht;
          var r = st;
          e: switch (Wt) {
            case 1:
              Wt = 0, st = null, Xi(l, n, r, 1);
              break;
            case 2:
            case 9:
              if (w0(r)) {
                Wt = 0, st = null, ov(n);
                break;
              }
              n = function() {
                Wt !== 2 && Wt !== 9 || ee !== l || (Wt = 7), gu(l);
              }, r.then(n, n);
              break t;
            case 3:
              Wt = 7;
              break t;
            case 4:
              Wt = 5;
              break t;
            case 7:
              w0(r) ? (Wt = 0, st = null, ov(n)) : (Wt = 0, st = null, Xi(l, n, r, 7));
              break;
            case 5:
              var m = null;
              switch (Ht.tag) {
                case 26:
                  m = Ht.memoizedState;
                case 5:
                case 27:
                  var v = Ht;
                  if (m ? pa(m) : v.stateNode.complete) {
                    Wt = 0, st = null;
                    var T = v.sibling;
                    if (T !== null) Ht = T;
                    else {
                      var U = v.return;
                      U !== null ? (Ht = U, Ws(U)) : Ht = null;
                    }
                    break e;
                  }
              }
              Wt = 0, st = null, Xi(l, n, r, 5);
              break;
            case 6:
              Wt = 0, st = null, Xi(l, n, r, 6);
              break;
            case 8:
              jm(), fe = 6;
              break t;
            default:
              throw Error(x(462));
          }
        }
        Zc();
        break;
      } catch (q) {
        af(l, q);
      }
    while (!0);
    return zn = Lu = null, O.H = i, O.A = s, Qt = u, Ht !== null ? 0 : (ee = null, Mt = 0, Aa(), fe);
  }
  function Zc() {
    for (; Ht !== null && !ei(); )
      iv(Ht);
  }
  function iv(l) {
    var n = zm(l.alternate, l, Cn);
    l.memoizedProps = l.pendingProps, n === null ? Ws(l) : Ht = n;
  }
  function ov(l) {
    var n = l, u = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = jc(
          u,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Mt
        );
        break;
      case 11:
        n = jc(
          u,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Mt
        );
        break;
      case 5:
        Ms(n);
      default:
        kp(u, n), n = Ht = j0(n, Cn), n = zm(u, n, Cn);
    }
    l.memoizedProps = l.pendingProps, n === null ? Ws(l) : Ht = n;
  }
  function Xi(l, n, u, i) {
    zn = Lu = null, Ms(n), Uc = null, Mi = 0;
    var s = n.return;
    try {
      if (K1(
        l,
        s,
        n,
        u,
        Mt
      )) {
        fe = 1, wo(
          l,
          Da(u, l.current)
        ), Ht = null;
        return;
      }
    } catch (r) {
      if (s !== null) throw Ht = s, r;
      fe = 1, wo(
        l,
        Da(u, l.current)
      ), Ht = null;
      return;
    }
    n.flags & 32768 ? (Ct || i === 1 ? l = !0 : Qc || (Mt & 536870912) !== 0 ? l = !1 : (yu = l = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Fl.current, i !== null && i.tag === 13 && (i.flags |= 16384))), fv(n, l)) : Ws(n);
  }
  function Ws(l) {
    var n = l;
    do {
      if ((n.flags & 32768) !== 0) {
        fv(
          n,
          yu
        );
        return;
      }
      l = n.return;
      var u = $p(
        n.alternate,
        n,
        Cn
      );
      if (u !== null) {
        Ht = u;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ht = n;
        return;
      }
      Ht = n = l;
    } while (n !== null);
    fe === 0 && (fe = 5);
  }
  function fv(l, n) {
    do {
      var u = Wp(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, Ht = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !n && (l = l.sibling, l !== null)) {
        Ht = l;
        return;
      }
      Ht = l = u;
    } while (l !== null);
    fe = 6, Ht = null;
  }
  function sv(l, n, u, i, s, r, m, v, T) {
    l.cancelPendingCommit = null;
    do
      nf();
    while (el !== 0);
    if ((Qt & 6) !== 0) throw Error(x(327));
    if (n !== null) {
      if (n === l.current) throw Error(x(177));
      if (r = n.lanes | n.childLanes, r |= Pa, Gr(
        l,
        u,
        r,
        m,
        v,
        T
      ), l === ee && (Ht = ee = null, Mt = 0), Vc = n, tc = l, pu = u, ha = r, lh = s, ah = i, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Sv(dc, function() {
        return yv(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), i = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null, s = Q.p, Q.p = 2, m = Qt, Qt |= 4;
        try {
          ko(l, n, u);
        } finally {
          Qt = m, Q.p = s, O.T = i;
        }
      }
      el = 1, rv(), dv(), hv();
    }
  }
  function rv() {
    if (el === 1) {
      el = 0;
      var l = tc, n = Vc, u = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || u) {
        u = O.T, O.T = null;
        var i = Q.p;
        Q.p = 2;
        var s = Qt;
        Qt |= 4;
        try {
          $d(n, l);
          var r = mh, m = Tc(l.containerInfo), v = r.focusedElem, T = r.selectionRange;
          if (m !== v && v && v.ownerDocument && vi(
            v.ownerDocument.documentElement,
            v
          )) {
            if (T !== null && is(v)) {
              var U = T.start, q = T.end;
              if (q === void 0 && (q = U), "selectionStart" in v)
                v.selectionStart = U, v.selectionEnd = Math.min(
                  q,
                  v.value.length
                );
              else {
                var X = v.ownerDocument || document, _ = X && X.defaultView || window;
                if (_.getSelection) {
                  var N = _.getSelection(), F = v.textContent.length, it = Math.min(T.start, F), ae = T.end === void 0 ? it : Math.min(T.end, F);
                  !N.extend && it > ae && (m = ae, ae = it, it = m);
                  var M = q0(
                    v,
                    it
                  ), z = q0(
                    v,
                    ae
                  );
                  if (M && z && (N.rangeCount !== 1 || N.anchorNode !== M.node || N.anchorOffset !== M.offset || N.focusNode !== z.node || N.focusOffset !== z.offset)) {
                    var R = X.createRange();
                    R.setStart(M.node, M.offset), N.removeAllRanges(), it > ae ? (N.addRange(R), N.extend(z.node, z.offset)) : (R.setEnd(z.node, z.offset), N.addRange(R));
                  }
                }
              }
            }
            for (X = [], N = v; N = N.parentNode; )
              N.nodeType === 1 && X.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof v.focus == "function" && v.focus(), v = 0; v < X.length; v++) {
              var G = X[v];
              G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
            }
          }
          ll = !!hh, mh = hh = null;
        } finally {
          Qt = s, Q.p = i, O.T = u;
        }
      }
      l.current = n, el = 2;
    }
  }
  function dv() {
    if (el === 2) {
      el = 0;
      var l = tc, n = Vc, u = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || u) {
        u = O.T, O.T = null;
        var i = Q.p;
        Q.p = 2;
        var s = Qt;
        Qt |= 4;
        try {
          Qs(l, n.alternate, n);
        } finally {
          Qt = s, Q.p = i, O.T = u;
        }
      }
      el = 3;
    }
  }
  function hv() {
    if (el === 4 || el === 3) {
      el = 0, qr();
      var l = tc, n = Vc, u = pu, i = ah;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? el = 5 : (el = 0, Vc = tc = null, mv(l, l.pendingLanes));
      var s = l.pendingLanes;
      if (s === 0 && (be = null), s0(u), n = n.stateNode, oa && typeof oa.onCommitFiberRoot == "function")
        try {
          oa.onCommitFiberRoot(
            li,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        n = O.T, s = Q.p, Q.p = 2, O.T = null;
        try {
          for (var r = l.onRecoverableError, m = 0; m < i.length; m++) {
            var v = i[m];
            r(v.value, {
              componentStack: v.stack
            });
          }
        } finally {
          O.T = n, Q.p = s;
        }
      }
      (pu & 3) !== 0 && nf(), gu(l), s = l.pendingLanes, (u & 261930) !== 0 && (s & 42) !== 0 ? l === Ks ? ef++ : (ef = 0, Ks = l) : ef = 0, ac(0);
    }
  }
  function mv(l, n) {
    (l.pooledCacheLanes &= n) === 0 && (n = l.pooledCache, n != null && (l.pooledCache = null, vs(n)));
  }
  function nf() {
    return rv(), dv(), hv(), yv();
  }
  function yv() {
    if (el !== 5) return !1;
    var l = tc, n = ha;
    ha = 0;
    var u = s0(pu), i = O.T, s = Q.p;
    try {
      Q.p = 32 > u ? 32 : u, O.T = null, u = lh, lh = null;
      var r = tc, m = pu;
      if (el = 0, Vc = tc = null, pu = 0, (Qt & 6) !== 0) throw Error(x(331));
      var v = Qt;
      if (Qt |= 4, xm(r.current), Fo(
        r,
        r.current,
        m,
        u
      ), Qt = v, ac(0, !1), oa && typeof oa.onPostCommitFiberRoot == "function")
        try {
          oa.onPostCommitFiberRoot(li, r);
        } catch {
        }
      return !0;
    } finally {
      Q.p = s, O.T = i, mv(l, n);
    }
  }
  function pv(l, n, u) {
    n = Da(u, n), n = ym(l.stateNode, n, 2), l = Ua(l, n, 2), l !== null && (mo(l, 2), gu(l));
  }
  function kt(l, n, u) {
    if (l.tag === 3)
      pv(l, l, u);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          pv(
            n,
            l,
            u
          );
          break;
        } else if (n.tag === 1) {
          var i = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (be === null || !be.has(i))) {
            l = Da(u, l), u = pm(2), i = Ua(n, u, 2), i !== null && (vm(
              u,
              i,
              n,
              l
            ), mo(i, 2), gu(i));
            break;
          }
        }
        n = n.return;
      }
  }
  function ks(l, n, u) {
    var i = l.pingCache;
    if (i === null) {
      i = l.pingCache = new qm();
      var s = /* @__PURE__ */ new Set();
      i.set(n, s);
    } else
      s = i.get(n), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(n, s));
    s.has(u) || (Pd = !0, s.add(u), l = Gm.bind(null, l, n, u), n.then(l, l));
  }
  function Gm(l, n, u) {
    var i = l.pingCache;
    i !== null && i.delete(n), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, ee === l && (Mt & u) === u && (fe === 4 || fe === 3 && (Mt & 62914560) === Mt && 300 > Dl() - Bn ? (Qt & 2) === 0 && vu(l, 0) : th |= u, Re === Mt && (Re = 0)), gu(l);
  }
  function vv(l, n) {
    n === 0 && (n = ai()), l = Qu(l, n), l !== null && (mo(l, n), gu(l));
  }
  function xa(l) {
    var n = l.memoizedState, u = 0;
    n !== null && (u = n.retryLane), vv(l, u);
  }
  function gv(l, n) {
    var u = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var i = l.stateNode, s = l.memoizedState;
        s !== null && (u = s.retryLane);
        break;
      case 19:
        i = l.stateNode;
        break;
      case 22:
        i = l.stateNode._retryCache;
        break;
      default:
        throw Error(x(314));
    }
    i !== null && i.delete(n), vv(l, u);
  }
  function Sv(l, n) {
    return ce(l, n);
  }
  var uf = null, Qi = null, Xm = !1, ch = !1, Qm = !1, lc = 0;
  function gu(l) {
    l !== Qi && l.next === null && (Qi === null ? uf = Qi = l : Qi = Qi.next = l), ch = !0, Xm || (Xm = !0, Is());
  }
  function ac(l, n) {
    if (!Qm && ch) {
      Qm = !0;
      do
        for (var u = !1, i = uf; i !== null; ) {
          if (l !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var r = 0;
            else {
              var m = i.suspendedLanes, v = i.pingedLanes;
              r = (1 << 31 - Ll(42 | l) + 1) - 1, r &= s & ~(m & ~v), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (u = !0, Vi(i, r));
          } else
            r = Mt, r = Xe(
              i,
              i === ee ? r : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (r & 3) === 0 || hn(i, r) || (u = !0, Vi(i, r));
          i = i.next;
        }
      while (u);
      Qm = !1;
    }
  }
  function ih() {
    Vm();
  }
  function Vm() {
    ch = Xm = !1;
    var l = 0;
    lc !== 0 && W1() && (l = lc);
    for (var n = Dl(), u = null, i = uf; i !== null; ) {
      var s = i.next, r = Zm(i, n);
      r === 0 ? (i.next = null, u === null ? uf = s : u.next = s, s === null && (Qi = u)) : (u = i, (l !== 0 || (r & 3) !== 0) && (ch = !0)), i = s;
    }
    el !== 0 && el !== 5 || ac(l), lc !== 0 && (lc = 0);
  }
  function Zm(l, n) {
    for (var u = l.suspendedLanes, i = l.pingedLanes, s = l.expirationTimes, r = l.pendingLanes & -62914561; 0 < r; ) {
      var m = 31 - Ll(r), v = 1 << m, T = s[m];
      T === -1 ? ((v & u) === 0 || (v & i) !== 0) && (s[m] = ho(v, n)) : T <= n && (l.expiredLanes |= v), r &= ~v;
    }
    if (n = ee, u = Mt, u = Xe(
      l,
      l === n ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), i = l.callbackNode, u === 0 || l === n && (Wt === 2 || Wt === 9) || l.cancelPendingCommit !== null)
      return i !== null && i !== null && i0(i), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || hn(l, u)) {
      if (n = u & -u, n === l.callbackPriority) return n;
      switch (i !== null && i0(i), s0(u)) {
        case 2:
        case 8:
          u = jr;
          break;
        case 32:
          u = dc;
          break;
        case 268435456:
          u = o0;
          break;
        default:
          u = dc;
      }
      return i = Fs.bind(null, l), u = ce(u, i), l.callbackPriority = n, l.callbackNode = u, n;
    }
    return i !== null && i !== null && i0(i), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Fs(l, n) {
    if (el !== 0 && el !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (nf() && l.callbackNode !== u)
      return null;
    var i = Mt;
    return i = Xe(
      l,
      l === ee ? i : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), i === 0 ? null : (ev(l, i, n), Zm(l, Dl()), l.callbackNode != null && l.callbackNode === u ? Fs.bind(null, l) : null);
  }
  function Vi(l, n) {
    if (nf()) return null;
    ev(l, n, !0);
  }
  function Is() {
    Mv(function() {
      (Qt & 6) !== 0 ? ce(
        Yr,
        ih
      ) : Vm();
    });
  }
  function oh() {
    if (lc === 0) {
      var l = Dc;
      l === 0 && (l = qu, qu <<= 1, (qu & 261888) === 0 && (qu = 256)), lc = l;
    }
    return lc;
  }
  function bv(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Wa("" + l);
  }
  function Zi(l, n) {
    var u = n.ownerDocument.createElement("input");
    return u.name = n.name, u.value = n.value, l.id && u.setAttribute("form", l.id), n.parentNode.insertBefore(u, n), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function Ps(l, n, u, i, s) {
    if (n === "submit" && u && u.stateNode === s) {
      var r = bv(
        (s[wl] || null).action
      ), m = i.submitter;
      m && (n = (n = m[wl] || null) ? bv(n.formAction) : m.getAttribute("formAction"), n !== null && (r = n, m = null));
      var v = new ns(
        "action",
        "action",
        null,
        i,
        s
      );
      l.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (lc !== 0) {
                  var T = m ? Zi(s, m) : new FormData(s);
                  Zo(
                    u,
                    {
                      pending: !0,
                      data: T,
                      method: s.method,
                      action: r
                    },
                    null,
                    T
                  );
                }
              } else
                typeof r == "function" && (v.preventDefault(), T = m ? Zi(s, m) : new FormData(s), Zo(
                  u,
                  {
                    pending: !0,
                    data: T,
                    method: s.method,
                    action: r
                  },
                  r,
                  T
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var fh = 0; fh < Ro.length; fh++) {
    var cf = Ro[fh], Lm = cf.toLowerCase(), wm = cf[0].toUpperCase() + cf.slice(1);
    Kl(
      Lm,
      "on" + wm
    );
  }
  Kl(fs, "onAnimationEnd"), Kl(Y0, "onAnimationIteration"), Kl(fd, "onAnimationStart"), Kl("dblclick", "onDoubleClick"), Kl("focusin", "onFocus"), Kl("focusout", "onBlur"), Kl(gi, "onTransitionRun"), Kl(ss, "onTransitionStart"), Kl(In, "onTransitionCancel"), Kl(Cp, "onTransitionEnd"), Kn("onMouseEnter", ["mouseout", "mouseover"]), Kn("onMouseLeave", ["mouseout", "mouseover"]), Kn("onPointerEnter", ["pointerout", "pointerover"]), Kn("onPointerLeave", ["pointerout", "pointerover"]), pc(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), pc(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), pc("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), pc(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), pc(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), pc(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var of = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Tv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(of)
  );
  function Ev(l, n) {
    n = (n & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var i = l[u], s = i.event;
      i = i.listeners;
      t: {
        var r = void 0;
        if (n)
          for (var m = i.length - 1; 0 <= m; m--) {
            var v = i[m], T = v.instance, U = v.currentTarget;
            if (v = v.listener, T !== r && s.isPropagationStopped())
              break t;
            r = v, s.currentTarget = U;
            try {
              r(s);
            } catch (q) {
              Si(q);
            }
            s.currentTarget = null, r = T;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (v = i[m], T = v.instance, U = v.currentTarget, v = v.listener, T !== r && s.isPropagationStopped())
              break t;
            r = v, s.currentTarget = U;
            try {
              r(s);
            } catch (q) {
              Si(q);
            }
            s.currentTarget = null, r = T;
          }
      }
    }
  }
  function Ut(l, n) {
    var u = n[Vr];
    u === void 0 && (u = n[Vr] = /* @__PURE__ */ new Set());
    var i = l + "__bubble";
    u.has(i) || (tr(n, l, 2, !1), u.add(i));
  }
  function Jm(l, n, u) {
    var i = 0;
    n && (i |= 4), tr(
      u,
      l,
      i,
      n
    );
  }
  var sh = "_reactListening" + Math.random().toString(36).slice(2);
  function ff(l) {
    if (!l[sh]) {
      l[sh] = !0, ii.forEach(function(u) {
        u !== "selectionchange" && (Tv.has(u) || Jm(u, !1, l), Jm(u, !0, l));
      });
      var n = l.nodeType === 9 ? l : l.ownerDocument;
      n === null || n[sh] || (n[sh] = !0, Jm("selectionchange", !1, n));
    }
  }
  function tr(l, n, u, i) {
    switch (fr(n)) {
      case 2:
        var s = bu;
        break;
      case 8:
        s = Tu;
        break;
      default:
        s = Rl;
    }
    u = s.bind(
      null,
      n,
      u,
      l
    ), s = void 0, !ls || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (s = !0), i ? s !== void 0 ? l.addEventListener(n, u, {
      capture: !0,
      passive: s
    }) : l.addEventListener(n, u, !0) : s !== void 0 ? l.addEventListener(n, u, {
      passive: s
    }) : l.addEventListener(n, u, !1);
  }
  function Km(l, n, u, i, s) {
    var r = i;
    if ((n & 1) === 0 && (n & 2) === 0 && i !== null)
      t: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var v = i.stateNode.containerInfo;
          if (v === s) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var T = m.tag;
              if ((T === 3 || T === 4) && m.stateNode.containerInfo === s)
                return;
              m = m.return;
            }
          for (; v !== null; ) {
            if (m = ni(v), m === null) return;
            if (T = m.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              i = r = m;
              continue t;
            }
            v = v.parentNode;
          }
        }
        i = i.return;
      }
    S0(function() {
      var U = r, q = kr(u), X = [];
      t: {
        var _ = Pn.get(l);
        if (_ !== void 0) {
          var N = ns, F = l;
          switch (l) {
            case "keypress":
              if (Ir(u) === 0) break t;
            case "keydown":
            case "keyup":
              N = ld;
              break;
            case "focusin":
              F = "focus", N = td;
              break;
            case "focusout":
              F = "blur", N = td;
              break;
            case "beforeblur":
            case "afterblur":
              N = td;
              break;
            case "click":
              if (u.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Ao;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = Sp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = zp;
              break;
            case fs:
            case Y0:
            case fd:
              N = Tp;
              break;
            case Cp:
              N = Z1;
              break;
            case "scroll":
            case "scrollend":
              N = Q1;
              break;
            case "wheel":
              N = L1;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = ri;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = gn;
              break;
            case "toggle":
            case "beforetoggle":
              N = R0;
          }
          var it = (n & 4) !== 0, ae = !it && (l === "scroll" || l === "scrollend"), M = it ? _ !== null ? _ + "Capture" : null : _;
          it = [];
          for (var z = U, R; z !== null; ) {
            var G = z;
            if (R = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || R === null || M === null || (G = ol(z, M), G != null && it.push(
              er(z, G, R)
            )), ae) break;
            z = z.return;
          }
          0 < it.length && (_ = new N(
            _,
            F,
            null,
            u,
            q
          ), X.push({ event: _, listeners: it }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (_ = l === "mouseover" || l === "pointerover", N = l === "mouseout" || l === "pointerout", _ && u !== Wr && (F = u.relatedTarget || u.fromElement) && (ni(F) || F[mc]))
            break t;
          if ((N || _) && (_ = q.window === q ? q : (_ = q.ownerDocument) ? _.defaultView || _.parentWindow : window, N ? (F = u.relatedTarget || u.toElement, N = U, F = F ? ni(F) : null, F !== null && (ae = ve(F), it = F.tag, F !== ae || it !== 5 && it !== 27 && it !== 6) && (F = null)) : (N = null, F = U), N !== F)) {
            if (it = Ao, G = "onMouseLeave", M = "onMouseEnter", z = "mouse", (l === "pointerout" || l === "pointerover") && (it = gn, G = "onPointerLeave", M = "onPointerEnter", z = "pointer"), ae = N == null ? _ : yo(N), R = F == null ? _ : yo(F), _ = new it(
              G,
              z + "leave",
              N,
              u,
              q
            ), _.target = ae, _.relatedTarget = R, G = null, ni(q) === U && (it = new it(
              M,
              z + "enter",
              F,
              u,
              q
            ), it.target = R, it.relatedTarget = ae, G = it), ae = G, N && F)
              e: {
                for (it = Av, M = N, z = F, R = 0, G = M; G; G = it(G))
                  R++;
                G = 0;
                for (var at = z; at; at = it(at))
                  G++;
                for (; 0 < R - G; )
                  M = it(M), R--;
                for (; 0 < G - R; )
                  z = it(z), G--;
                for (; R--; ) {
                  if (M === z || z !== null && M === z.alternate) {
                    it = M;
                    break e;
                  }
                  M = it(M), z = it(z);
                }
                it = null;
              }
            else it = null;
            N !== null && rh(
              X,
              _,
              N,
              it,
              !1
            ), F !== null && ae !== null && rh(
              X,
              ae,
              F,
              it,
              !0
            );
          }
        }
        t: {
          if (_ = U ? yo(U) : window, N = _.nodeName && _.nodeName.toLowerCase(), N === "select" || N === "input" && _.type === "file")
            var Gt = B0;
          else if (Fn(_))
            if (ud)
              Gt = pi;
            else {
              Gt = Up;
              var I = Rp;
            }
          else
            N = _.nodeName, !N || N.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? U && g0(U.elementType) && (Gt = B0) : Gt = bc;
          if (Gt && (Gt = Gt(l, U))) {
            H0(
              X,
              Gt,
              u,
              q
            );
            break t;
          }
          I && I(l, _, U), l === "focusout" && U && _.type === "number" && U.memoizedProps.value != null && oi(_, "number", _.value);
        }
        switch (I = U ? yo(U) : window, l) {
          case "focusin":
            (Fn(I) || I.contentEditable === "true") && (Ec = I, Oo = U, Ia = null);
            break;
          case "focusout":
            Ia = Oo = Ec = null;
            break;
          case "mousedown":
            bn = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            bn = !1, od(X, u, q);
            break;
          case "selectionchange":
            if (os) break;
          case "keydown":
          case "keyup":
            od(X, u, q);
        }
        var vt;
        if (zo)
          t: {
            switch (l) {
              case "compositionstart":
                var bt = "onCompositionStart";
                break t;
              case "compositionend":
                bt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                bt = "onCompositionUpdate";
                break t;
            }
            bt = void 0;
          }
        else
          hi ? nd(l, u) && (bt = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (bt = "onCompositionStart");
        bt && (U0 && u.locale !== "ko" && (hi || bt !== "onCompositionStart" ? bt === "onCompositionEnd" && hi && (vt = T0()) : (Gu = q, b0 = "value" in Gu ? Gu.value : Gu.textContent, hi = !0)), I = lr(U, bt), 0 < I.length && (bt = new Ep(
          bt,
          l,
          null,
          u,
          q
        ), X.push({ event: bt, listeners: I }), vt ? bt.data = vt : (vt = _0(u), vt !== null && (bt.data = vt)))), (vt = ql ? Mp(l, u) : w1(l, u)) && (bt = lr(U, "onBeforeInput"), 0 < bt.length && (I = new Ep(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          q
        ), X.push({
          event: I,
          listeners: bt
        }), I.data = vt)), Ps(
          X,
          l,
          U,
          u,
          q
        );
      }
      Ev(X, n);
    });
  }
  function er(l, n, u) {
    return {
      instance: l,
      listener: n,
      currentTarget: u
    };
  }
  function lr(l, n) {
    for (var u = n + "Capture", i = []; l !== null; ) {
      var s = l, r = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || r === null || (s = ol(l, u), s != null && i.unshift(
        er(l, s, r)
      ), s = ol(l, n), s != null && i.push(
        er(l, s, r)
      )), l.tag === 3) return i;
      l = l.return;
    }
    return [];
  }
  function Av(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function rh(l, n, u, i, s) {
    for (var r = n._reactName, m = []; u !== null && u !== i; ) {
      var v = u, T = v.alternate, U = v.stateNode;
      if (v = v.tag, T !== null && T === i) break;
      v !== 5 && v !== 26 && v !== 27 || U === null || (T = U, s ? (U = ol(u, r), U != null && m.unshift(
        er(u, U, T)
      )) : s || (U = ol(u, r), U != null && m.push(
        er(u, U, T)
      ))), u = u.return;
    }
    m.length !== 0 && l.push({ event: n, listeners: m });
  }
  var zv = /\r\n?/g, $m = /\u0000|\uFFFD/g;
  function Wm(l) {
    return (typeof l == "string" ? l : "" + l).replace(zv, `
`).replace($m, "");
  }
  function km(l, n) {
    return n = Wm(n), Wm(l) === n;
  }
  function le(l, n, u, i, s, r) {
    switch (u) {
      case "children":
        typeof i == "string" ? n === "body" || n === "textarea" && i === "" || $n(l, i) : (typeof i == "number" || typeof i == "bigint") && n !== "body" && $n(l, "" + i);
        break;
      case "className":
        Jr(l, "class", i);
        break;
      case "tabIndex":
        Jr(l, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Jr(l, u, i);
        break;
      case "style":
        pp(l, i, r);
        break;
      case "data":
        if (n !== "object") {
          Jr(l, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (n !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          l.removeAttribute(u);
          break;
        }
        i = Wa("" + i), l.setAttribute(u, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (u === "formAction" ? (n !== "input" && le(l, n, "name", s.name, s, null), le(
            l,
            n,
            "formEncType",
            s.formEncType,
            s,
            null
          ), le(
            l,
            n,
            "formMethod",
            s.formMethod,
            s,
            null
          ), le(
            l,
            n,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (le(l, n, "encType", s.encType, s, null), le(l, n, "method", s.method, s, null), le(l, n, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          l.removeAttribute(u);
          break;
        }
        i = Wa("" + i), l.setAttribute(u, i);
        break;
      case "onClick":
        i != null && (l.onclick = yn);
        break;
      case "onScroll":
        i != null && Ut("scroll", l);
        break;
      case "onScrollEnd":
        i != null && Ut("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(x(61));
          if (u = i.__html, u != null) {
            if (s.children != null) throw Error(x(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        l.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = Wa("" + i), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? l.setAttribute(u, "" + i) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        i === !0 ? l.setAttribute(u, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? l.setAttribute(u, i) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? l.setAttribute(u, i) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? l.removeAttribute(u) : l.setAttribute(u, i);
        break;
      case "popover":
        Ut("beforetoggle", l), Ut("toggle", l), go(l, "popover", i);
        break;
      case "xlinkActuate":
        Yu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Yu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Yu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Yu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Yu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Yu(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Yu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Yu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Yu(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        go(l, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = X1.get(u) || u, go(l, u, i));
    }
  }
  function Fm(l, n, u, i, s, r) {
    switch (u) {
      case "style":
        pp(l, i, r);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(x(61));
          if (u = i.__html, u != null) {
            if (s.children != null) throw Error(x(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof i == "string" ? $n(l, i) : (typeof i == "number" || typeof i == "bigint") && $n(l, "" + i);
        break;
      case "onScroll":
        i != null && Ut("scroll", l);
        break;
      case "onScrollEnd":
        i != null && Ut("scrollend", l);
        break;
      case "onClick":
        i != null && (l.onclick = yn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!yc.hasOwnProperty(u))
          t: {
            if (u[0] === "o" && u[1] === "n" && (s = u.endsWith("Capture"), n = u.slice(2, s ? u.length - 7 : void 0), r = l[wl] || null, r = r != null ? r[u] : null, typeof r == "function" && l.removeEventListener(n, r, s), typeof i == "function")) {
              typeof r != "function" && r !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, i, s);
              break t;
            }
            u in l ? l[u] = i : i === !0 ? l.setAttribute(u, "") : go(l, u, i);
          }
    }
  }
  function Ml(l, n, u) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Ut("error", l), Ut("load", l);
        var i = !1, s = !1, r;
        for (r in u)
          if (u.hasOwnProperty(r)) {
            var m = u[r];
            if (m != null)
              switch (r) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(x(137, n));
                default:
                  le(l, n, r, m, u, null);
              }
          }
        s && le(l, n, "srcSet", u.srcSet, u, null), i && le(l, n, "src", u.src, u, null);
        return;
      case "input":
        Ut("invalid", l);
        var v = r = m = s = null, T = null, U = null;
        for (i in u)
          if (u.hasOwnProperty(i)) {
            var q = u[i];
            if (q != null)
              switch (i) {
                case "name":
                  s = q;
                  break;
                case "type":
                  m = q;
                  break;
                case "checked":
                  T = q;
                  break;
                case "defaultChecked":
                  U = q;
                  break;
                case "value":
                  r = q;
                  break;
                case "defaultValue":
                  v = q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (q != null)
                    throw Error(x(137, n));
                  break;
                default:
                  le(l, n, i, q, u, null);
              }
          }
        Pf(
          l,
          r,
          v,
          T,
          U,
          m,
          s,
          !1
        );
        return;
      case "select":
        Ut("invalid", l), i = m = r = null;
        for (s in u)
          if (u.hasOwnProperty(s) && (v = u[s], v != null))
            switch (s) {
              case "value":
                r = v;
                break;
              case "defaultValue":
                m = v;
                break;
              case "multiple":
                i = v;
              default:
                le(l, n, s, v, u, null);
            }
        n = r, u = m, l.multiple = !!i, n != null ? So(l, !!i, n, !1) : u != null && So(l, !!i, u, !0);
        return;
      case "textarea":
        Ut("invalid", l), r = s = i = null;
        for (m in u)
          if (u.hasOwnProperty(m) && (v = u[m], v != null))
            switch (m) {
              case "value":
                i = v;
                break;
              case "defaultValue":
                s = v;
                break;
              case "children":
                r = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(x(91));
                break;
              default:
                le(l, n, m, v, u, null);
            }
        v0(l, i, s, r);
        return;
      case "option":
        for (T in u)
          u.hasOwnProperty(T) && (i = u[T], i != null) && (T === "selected" ? l.selected = i && typeof i != "function" && typeof i != "symbol" : le(l, n, T, i, u, null));
        return;
      case "dialog":
        Ut("beforetoggle", l), Ut("toggle", l), Ut("cancel", l), Ut("close", l);
        break;
      case "iframe":
      case "object":
        Ut("load", l);
        break;
      case "video":
      case "audio":
        for (i = 0; i < of.length; i++)
          Ut(of[i], l);
        break;
      case "image":
        Ut("error", l), Ut("load", l);
        break;
      case "details":
        Ut("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        Ut("error", l), Ut("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (U in u)
          if (u.hasOwnProperty(U) && (i = u[U], i != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(x(137, n));
              default:
                le(l, n, U, i, u, null);
            }
        return;
      default:
        if (g0(n)) {
          for (q in u)
            u.hasOwnProperty(q) && (i = u[q], i !== void 0 && Fm(
              l,
              n,
              q,
              i,
              u,
              void 0
            ));
          return;
        }
    }
    for (v in u)
      u.hasOwnProperty(v) && (i = u[v], i != null && le(l, n, v, i, u, null));
  }
  function Im(l, n, u, i) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, r = null, m = null, v = null, T = null, U = null, q = null;
        for (N in u) {
          var X = u[N];
          if (u.hasOwnProperty(N) && X != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = X;
              default:
                i.hasOwnProperty(N) || le(l, n, N, null, i, X);
            }
        }
        for (var _ in i) {
          var N = i[_];
          if (X = u[_], i.hasOwnProperty(_) && (N != null || X != null))
            switch (_) {
              case "type":
                r = N;
                break;
              case "name":
                s = N;
                break;
              case "checked":
                U = N;
                break;
              case "defaultChecked":
                q = N;
                break;
              case "value":
                m = N;
                break;
              case "defaultValue":
                v = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(x(137, n));
                break;
              default:
                N !== X && le(
                  l,
                  n,
                  _,
                  N,
                  i,
                  X
                );
            }
        }
        If(
          l,
          m,
          v,
          T,
          U,
          q,
          r,
          s
        );
        return;
      case "select":
        N = m = v = _ = null;
        for (r in u)
          if (T = u[r], u.hasOwnProperty(r) && T != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                N = T;
              default:
                i.hasOwnProperty(r) || le(
                  l,
                  n,
                  r,
                  null,
                  i,
                  T
                );
            }
        for (s in i)
          if (r = i[s], T = u[s], i.hasOwnProperty(s) && (r != null || T != null))
            switch (s) {
              case "value":
                _ = r;
                break;
              case "defaultValue":
                v = r;
                break;
              case "multiple":
                m = r;
              default:
                r !== T && le(
                  l,
                  n,
                  s,
                  r,
                  i,
                  T
                );
            }
        n = v, u = m, i = N, _ != null ? So(l, !!u, _, !1) : !!i != !!u && (n != null ? So(l, !!u, n, !0) : So(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        N = _ = null;
        for (v in u)
          if (s = u[v], u.hasOwnProperty(v) && s != null && !i.hasOwnProperty(v))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                le(l, n, v, null, i, s);
            }
        for (m in i)
          if (s = i[m], r = u[m], i.hasOwnProperty(m) && (s != null || r != null))
            switch (m) {
              case "value":
                _ = s;
                break;
              case "defaultValue":
                N = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(x(91));
                break;
              default:
                s !== r && le(l, n, m, s, i, r);
            }
        p0(l, _, N);
        return;
      case "option":
        for (var F in u)
          _ = u[F], u.hasOwnProperty(F) && _ != null && !i.hasOwnProperty(F) && (F === "selected" ? l.selected = !1 : le(
            l,
            n,
            F,
            null,
            i,
            _
          ));
        for (T in i)
          _ = i[T], N = u[T], i.hasOwnProperty(T) && _ !== N && (_ != null || N != null) && (T === "selected" ? l.selected = _ && typeof _ != "function" && typeof _ != "symbol" : le(
            l,
            n,
            T,
            _,
            i,
            N
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var it in u)
          _ = u[it], u.hasOwnProperty(it) && _ != null && !i.hasOwnProperty(it) && le(l, n, it, null, i, _);
        for (U in i)
          if (_ = i[U], N = u[U], i.hasOwnProperty(U) && _ !== N && (_ != null || N != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(x(137, n));
                break;
              default:
                le(
                  l,
                  n,
                  U,
                  _,
                  i,
                  N
                );
            }
        return;
      default:
        if (g0(n)) {
          for (var ae in u)
            _ = u[ae], u.hasOwnProperty(ae) && _ !== void 0 && !i.hasOwnProperty(ae) && Fm(
              l,
              n,
              ae,
              void 0,
              i,
              _
            );
          for (q in i)
            _ = i[q], N = u[q], !i.hasOwnProperty(q) || _ === N || _ === void 0 && N === void 0 || Fm(
              l,
              n,
              q,
              _,
              i,
              N
            );
          return;
        }
    }
    for (var M in u)
      _ = u[M], u.hasOwnProperty(M) && _ != null && !i.hasOwnProperty(M) && le(l, n, M, null, i, _);
    for (X in i)
      _ = i[X], N = u[X], !i.hasOwnProperty(X) || _ === N || _ == null && N == null || le(l, n, X, _, i, N);
  }
  function dh(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Pm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, n = 0, u = performance.getEntriesByType("resource"), i = 0; i < u.length; i++) {
        var s = u[i], r = s.transferSize, m = s.initiatorType, v = s.duration;
        if (r && v && dh(m)) {
          for (m = 0, v = s.responseEnd, i += 1; i < u.length; i++) {
            var T = u[i], U = T.startTime;
            if (U > v) break;
            var q = T.transferSize, X = T.initiatorType;
            q && dh(X) && (T = T.responseEnd, m += q * (T < v ? 1 : (v - U) / (T - U)));
          }
          if (--i, n += 8 * (r + m) / (s.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return n / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var hh = null, mh = null;
  function Lc(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Dv(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ty(l, n) {
    if (l === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && n === "foreignObject" ? 0 : l;
  }
  function sf(l, n) {
    return l === "textarea" || l === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var yh = null;
  function W1() {
    var l = window.event;
    return l && l.type === "popstate" ? l === yh ? !1 : (yh = l, !0) : (yh = null, !1);
  }
  var ar = typeof setTimeout == "function" ? setTimeout : void 0, Ov = typeof clearTimeout == "function" ? clearTimeout : void 0, Li = typeof Promise == "function" ? Promise : void 0, Mv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Li < "u" ? function(l) {
    return Li.resolve(null).then(l).catch(ey);
  } : ar;
  function ey(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Nn(l) {
    return l === "head";
  }
  function ly(l, n) {
    var u = n, i = 0;
    do {
      var s = u.nextSibling;
      if (l.removeChild(u), s && s.nodeType === 8)
        if (u = s.data, u === "/$" || u === "/&") {
          if (i === 0) {
            l.removeChild(s), Ef(n);
            return;
          }
          i--;
        } else if (u === "$" || u === "$?" || u === "$~" || u === "$!" || u === "&")
          i++;
        else if (u === "html")
          wi(l.ownerDocument.documentElement);
        else if (u === "head") {
          u = l.ownerDocument.head, wi(u);
          for (var r = u.firstChild; r; ) {
            var m = r.nextSibling, v = r.nodeName;
            r[Jn] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && r.rel.toLowerCase() === "stylesheet" || u.removeChild(r), r = m;
          }
        } else
          u === "body" && wi(l.ownerDocument.body);
      u = s;
    } while (u);
    Ef(n);
  }
  function we(l, n) {
    var u = l;
    l = 0;
    do {
      var i = u.nextSibling;
      if (u.nodeType === 1 ? n ? (u._stashedDisplay = u.style.display, u.style.display = "none") : (u.style.display = u._stashedDisplay || "", u.getAttribute("style") === "" && u.removeAttribute("style")) : u.nodeType === 3 && (n ? (u._stashedText = u.nodeValue, u.nodeValue = "") : u.nodeValue = u._stashedText || ""), i && i.nodeType === 8)
        if (u = i.data, u === "/$") {
          if (l === 0) break;
          l--;
        } else
          u !== "$" && u !== "$?" && u !== "$~" && u !== "$!" || l++;
      u = i;
    } while (u);
  }
  function nr(l) {
    var n = l.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var u = n;
      switch (n = n.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          nr(u), Zr(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function k1(l, n, u, i) {
    for (; l.nodeType === 1; ) {
      var s = u;
      if (l.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!i && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (i) {
        if (!l[Jn])
          switch (n) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (r = l.getAttribute("rel"), r === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (r !== s.rel || l.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || l.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (r = l.getAttribute("src"), (r !== (s.src == null ? null : s.src) || l.getAttribute("type") !== (s.type == null ? null : s.type) || l.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && r && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (n === "input" && l.type === "hidden") {
        var r = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && l.getAttribute("name") === r)
          return l;
      } else return l;
      if (l = ua(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Et(l, n, u) {
    if (n === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = ua(l.nextSibling), l === null)) return null;
    return l;
  }
  function Rv(l, n) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !n || (l = ua(l.nextSibling), l === null)) return null;
    return l;
  }
  function cn(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function wc(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function rf(l, n) {
    var u = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = n;
    else if (l.data !== "$?" || u.readyState !== "loading")
      n();
    else {
      var i = function() {
        n(), u.removeEventListener("DOMContentLoaded", i);
      };
      u.addEventListener("DOMContentLoaded", i), l._reactRetry = i;
    }
  }
  function ua(l) {
    for (; l != null; l = l.nextSibling) {
      var n = l.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = l.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return l;
  }
  var ur = null;
  function ph(l) {
    l = l.nextSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "/$" || u === "/&") {
          if (n === 0)
            return ua(l.nextSibling);
          n--;
        } else
          u !== "$" && u !== "$!" && u !== "$?" && u !== "$~" && u !== "&" || n++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function xn(l) {
    l = l.previousSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?" || u === "$~" || u === "&") {
          if (n === 0) return l;
          n--;
        } else u !== "/$" && u !== "/&" || n++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function df(l, n, u) {
    switch (n = Lc(u), l) {
      case "html":
        if (l = n.documentElement, !l) throw Error(x(452));
        return l;
      case "head":
        if (l = n.head, !l) throw Error(x(453));
        return l;
      case "body":
        if (l = n.body, !l) throw Error(x(454));
        return l;
      default:
        throw Error(x(451));
    }
  }
  function wi(l) {
    for (var n = l.attributes; n.length; )
      l.removeAttributeNode(n[0]);
    Zr(l);
  }
  var ya = /* @__PURE__ */ new Map(), cr = /* @__PURE__ */ new Set();
  function Gl(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var qn = Q.d;
  Q.d = {
    f: F1,
    r: Uv,
    D: B,
    C: wt,
    L: I1,
    m: ay,
    X: nc,
    S: ny,
    M: Jc
  };
  function F1() {
    var l = qn.f(), n = lf();
    return l || n;
  }
  function Uv(l) {
    var n = ui(l);
    n !== null && n.tag === 5 && n.type === "form" ? te(n) : qn.r(l);
  }
  var hf = typeof document > "u" ? null : document;
  function ke(l, n, u) {
    var i = hf;
    if (i && typeof n == "string" && n) {
      var s = Ea(n);
      s = 'link[rel="' + l + '"][href="' + s + '"]', typeof u == "string" && (s += '[crossorigin="' + u + '"]'), cr.has(s) || (cr.add(s), l = { rel: l, crossOrigin: u, href: n }, i.querySelector(s) === null && (n = i.createElement("link"), Ml(n, "link", l), Jt(n), i.head.appendChild(n)));
    }
  }
  function B(l) {
    qn.D(l), ke("dns-prefetch", l, null);
  }
  function wt(l, n) {
    qn.C(l, n), ke("preconnect", l, n);
  }
  function I1(l, n, u) {
    qn.L(l, n, u);
    var i = hf;
    if (i && l && n) {
      var s = 'link[rel="preload"][as="' + Ea(n) + '"]';
      n === "image" && u && u.imageSrcSet ? (s += '[imagesrcset="' + Ea(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (s += '[imagesizes="' + Ea(
        u.imageSizes
      ) + '"]')) : s += '[href="' + Ea(l) + '"]';
      var r = s;
      switch (n) {
        case "style":
          r = qa(l);
          break;
        case "script":
          r = Ji(l);
      }
      ya.has(r) || (l = ot(
        {
          rel: "preload",
          href: n === "image" && u && u.imageSrcSet ? void 0 : l,
          as: n
        },
        u
      ), ya.set(r, l), i.querySelector(s) !== null || n === "style" && i.querySelector(Kc(r)) || n === "script" && i.querySelector(pf(r)) || (n = i.createElement("link"), Ml(n, "link", l), Jt(n), i.head.appendChild(n)));
    }
  }
  function ay(l, n) {
    qn.m(l, n);
    var u = hf;
    if (u && l) {
      var i = n && typeof n.as == "string" ? n.as : "script", s = 'link[rel="modulepreload"][as="' + Ea(i) + '"][href="' + Ea(l) + '"]', r = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = Ji(l);
      }
      if (!ya.has(r) && (l = ot({ rel: "modulepreload", href: l }, n), ya.set(r, l), u.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(pf(r)))
              return;
        }
        i = u.createElement("link"), Ml(i, "link", l), Jt(i), u.head.appendChild(i);
      }
    }
  }
  function ny(l, n, u) {
    qn.S(l, n, u);
    var i = hf;
    if (i && l) {
      var s = ci(i).hoistableStyles, r = qa(l);
      n = n || "default";
      var m = s.get(r);
      if (!m) {
        var v = { loading: 0, preload: null };
        if (m = i.querySelector(
          Kc(r)
        ))
          v.loading = 5;
        else {
          l = ot(
            { rel: "stylesheet", href: l, "data-precedence": n },
            u
          ), (u = ya.get(r)) && vh(l, u);
          var T = m = i.createElement("link");
          Jt(T), Ml(T, "link", l), T._p = new Promise(function(U, q) {
            T.onload = U, T.onerror = q;
          }), T.addEventListener("load", function() {
            v.loading |= 1;
          }), T.addEventListener("error", function() {
            v.loading |= 2;
          }), v.loading |= 4, ir(m, n, i);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: v
        }, s.set(r, m);
      }
    }
  }
  function nc(l, n) {
    qn.X(l, n);
    var u = hf;
    if (u && l) {
      var i = ci(u).hoistableScripts, s = Ji(l), r = i.get(s);
      r || (r = u.querySelector(pf(s)), r || (l = ot({ src: l, async: !0 }, n), (n = ya.get(s)) && gh(l, n), r = u.createElement("script"), Jt(r), Ml(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, i.set(s, r));
    }
  }
  function Jc(l, n) {
    qn.M(l, n);
    var u = hf;
    if (u && l) {
      var i = ci(u).hoistableScripts, s = Ji(l), r = i.get(s);
      r || (r = u.querySelector(pf(s)), r || (l = ot({ src: l, async: !0, type: "module" }, n), (n = ya.get(s)) && gh(l, n), r = u.createElement("script"), Jt(r), Ml(r, "link", l), u.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, i.set(s, r));
    }
  }
  function mf(l, n, u, i) {
    var s = (s = Ja.current) ? Gl(s) : null;
    if (!s) throw Error(x(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (n = qa(u.href), u = ci(
          s
        ).hoistableStyles, i = u.get(n), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = qa(u.href);
          var r = ci(
            s
          ).hoistableStyles, m = r.get(l);
          if (m || (s = s.ownerDocument || s, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(l, m), (r = s.querySelector(
            Kc(l)
          )) && !r._p && (m.instance = r, m.state.loading = 5), ya.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, ya.set(l, u), r || _v(
            s,
            l,
            u,
            m.state
          ))), n && i === null)
            throw Error(x(528, ""));
          return m;
        }
        if (n && i !== null)
          throw Error(x(529, ""));
        return null;
      case "script":
        return n = u.async, u = u.src, typeof u == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Ji(u), u = ci(
          s
        ).hoistableScripts, i = u.get(n), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(x(444, l));
    }
  }
  function qa(l) {
    return 'href="' + Ea(l) + '"';
  }
  function Kc(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function yf(l) {
    return ot({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function _v(l, n, u, i) {
    l.querySelector('link[rel="preload"][as="style"][' + n + "]") ? i.loading = 1 : (n = l.createElement("link"), i.preload = n, n.addEventListener("load", function() {
      return i.loading |= 1;
    }), n.addEventListener("error", function() {
      return i.loading |= 2;
    }), Ml(n, "link", u), Jt(n), l.head.appendChild(n));
  }
  function Ji(l) {
    return '[src="' + Ea(l) + '"]';
  }
  function pf(l) {
    return "script[async]" + l;
  }
  function uy(l, n, u) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var i = l.querySelector(
            'style[data-href~="' + Ea(u.href) + '"]'
          );
          if (i)
            return n.instance = i, Jt(i), i;
          var s = ot({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return i = (l.ownerDocument || l).createElement(
            "style"
          ), Jt(i), Ml(i, "style", s), ir(i, u.precedence, l), n.instance = i;
        case "stylesheet":
          s = qa(u.href);
          var r = l.querySelector(
            Kc(s)
          );
          if (r)
            return n.state.loading |= 4, n.instance = r, Jt(r), r;
          i = yf(u), (s = ya.get(s)) && vh(i, s), r = (l.ownerDocument || l).createElement("link"), Jt(r);
          var m = r;
          return m._p = new Promise(function(v, T) {
            m.onload = v, m.onerror = T;
          }), Ml(r, "link", i), n.state.loading |= 4, ir(r, u.precedence, l), n.instance = r;
        case "script":
          return r = Ji(u.src), (s = l.querySelector(
            pf(r)
          )) ? (n.instance = s, Jt(s), s) : (i = u, (s = ya.get(r)) && (i = ot({}, u), gh(i, s)), l = l.ownerDocument || l, s = l.createElement("script"), Jt(s), Ml(s, "link", i), l.head.appendChild(s), n.instance = s);
        case "void":
          return null;
        default:
          throw Error(x(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (i = n.instance, n.state.loading |= 4, ir(i, u.precedence, l));
    return n.instance;
  }
  function ir(l, n, u) {
    for (var i = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, r = s, m = 0; m < i.length; m++) {
      var v = i[m];
      if (v.dataset.precedence === n) r = v;
      else if (r !== s) break;
    }
    r ? r.parentNode.insertBefore(l, r.nextSibling) : (n = u.nodeType === 9 ? u.head : u, n.insertBefore(l, n.firstChild));
  }
  function vh(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.title == null && (l.title = n.title);
  }
  function gh(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.integrity == null && (l.integrity = n.integrity);
  }
  var vf = null;
  function cy(l, n, u) {
    if (vf === null) {
      var i = /* @__PURE__ */ new Map(), s = vf = /* @__PURE__ */ new Map();
      s.set(u, i);
    } else
      s = vf, i = s.get(u), i || (i = /* @__PURE__ */ new Map(), s.set(u, i));
    if (i.has(l)) return i;
    for (i.set(l, null), u = u.getElementsByTagName(l), s = 0; s < u.length; s++) {
      var r = u[s];
      if (!(r[Jn] || r[Pt] || l === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = r.getAttribute(n) || "";
        m = l + m;
        var v = i.get(m);
        v ? v.push(r) : i.set(m, [r]);
      }
    }
    return i;
  }
  function Sh(l, n, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      n === "title" ? l.querySelector("head > title") : null
    );
  }
  function iy(l, n, u) {
    if (u === 1 || n.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        return n.rel === "stylesheet" ? (l = n.disabled, typeof n.precedence == "string" && l == null) : !0;
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function pa(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Su(l, n, u, i) {
    if (u.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (u.state.loading & 4) === 0) {
      if (u.instance === null) {
        var s = qa(i.href), r = n.querySelector(
          Kc(s)
        );
        if (r) {
          n = r._p, n !== null && typeof n == "object" && typeof n.then == "function" && (l.count++, l = bh.bind(l), n.then(l, l)), u.state.loading |= 4, u.instance = r, Jt(r);
          return;
        }
        r = n.ownerDocument || n, i = yf(i), (s = ya.get(s)) && vh(i, s), r = r.createElement("link"), Jt(r);
        var m = r;
        m._p = new Promise(function(v, T) {
          m.onload = v, m.onerror = T;
        }), Ml(r, "link", i), u.instance = r;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(u, n), (n = u.state.preload) && (u.state.loading & 3) === 0 && (l.count++, u = bh.bind(l), n.addEventListener("load", u), n.addEventListener("error", u));
    }
  }
  var Ya = 0;
  function oy(l, n) {
    return l.stylesheets && l.count === 0 && Eh(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(u) {
      var i = setTimeout(function() {
        if (l.stylesheets && Eh(l, l.stylesheets), l.unsuspend) {
          var r = l.unsuspend;
          l.unsuspend = null, r();
        }
      }, 6e4 + n);
      0 < l.imgBytes && Ya === 0 && (Ya = 62500 * Pm());
      var s = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Eh(l, l.stylesheets), l.unsuspend)) {
            var r = l.unsuspend;
            l.unsuspend = null, r();
          }
        },
        (l.imgBytes > Ya ? 50 : 800) + n
      );
      return l.unsuspend = u, function() {
        l.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function bh() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Eh(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Th = null;
  function Eh(l, n) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Th = /* @__PURE__ */ new Map(), n.forEach(yl, l), Th = null, bh.call(l));
  }
  function yl(l, n) {
    if (!(n.state.loading & 4)) {
      var u = Th.get(l);
      if (u) var i = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Th.set(l, u);
        for (var s = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < s.length; r++) {
          var m = s[r];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (u.set(m.dataset.precedence, m), i = m);
        }
        i && u.set(null, i);
      }
      s = n.instance, m = s.getAttribute("data-precedence"), r = u.get(m) || i, r === i && u.set(null, s), u.set(m, s), this.count++, i = bh.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), r ? r.parentNode.insertBefore(s, r.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(s, l.firstChild)), n.state.loading |= 4;
    }
  }
  var or = {
    $$typeof: je,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function fy(l, n, u, i, s, r, m, v, T) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Wf(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wf(0), this.hiddenUpdates = Wf(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = r, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = T, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ah(l, n, u, i, s, r, m, v, T, U, q, X) {
    return l = new fy(
      l,
      n,
      u,
      m,
      T,
      U,
      q,
      X,
      v
    ), n = 1, r === !0 && (n |= 24), r = He(3, null, null, n), l.current = r, r.stateNode = l, n = ps(), n.refCount++, l.pooledCache = n, n.refCount++, r.memoizedState = {
      element: i,
      isDehydrated: u,
      cache: n
    }, As(r), l;
  }
  function Ki(l) {
    return l ? (l = $l, l) : $l;
  }
  function Cv(l, n, u, i, s, r) {
    s = Ki(s), i.context === null ? i.context = s : i.pendingContext = s, i = $u(n), i.payload = { element: u }, r = r === void 0 ? null : r, r !== null && (i.callback = r), u = Ua(l, i, n), u !== null && (na(u, l, n), Cc(u, l, n));
  }
  function zh(l, n) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < n ? u : n;
    }
  }
  function sy(l, n) {
    zh(l, n), (l = l.alternate) && zh(l, n);
  }
  function Hv(l) {
    if (l.tag === 13 || l.tag === 31) {
      var n = Qu(l, 67108864);
      n !== null && na(n, l, 67108864), sy(l, 67108864);
    }
  }
  function $i(l) {
    if (l.tag === 13 || l.tag === 31) {
      var n = ma();
      n = Xr(n);
      var u = Qu(l, n);
      u !== null && na(u, l, n), sy(l, n);
    }
  }
  var ll = !0;
  function bu(l, n, u, i) {
    var s = O.T;
    O.T = null;
    var r = Q.p;
    try {
      Q.p = 2, Rl(l, n, u, i);
    } finally {
      Q.p = r, O.T = s;
    }
  }
  function Tu(l, n, u, i) {
    var s = O.T;
    O.T = null;
    var r = Q.p;
    try {
      Q.p = 8, Rl(l, n, u, i);
    } finally {
      Q.p = r, O.T = s;
    }
  }
  function Rl(l, n, u, i) {
    if (ll) {
      var s = ry(i);
      if (s === null)
        Km(
          l,
          n,
          i,
          Dh,
          u
        ), uc(l, i);
      else if (P1(
        s,
        l,
        n,
        u,
        i
      ))
        i.stopPropagation();
      else if (uc(l, i), n & 4 && -1 < ca.indexOf(l)) {
        for (; s !== null; ) {
          var r = ui(s);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var m = $a(r.pendingLanes);
                  if (m !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; m; ) {
                      var T = 1 << 31 - Ll(m);
                      v.entanglements[1] |= T, m &= ~T;
                    }
                    gu(r), (Qt & 6) === 0 && (Lt = Dl() + 500, ac(0));
                  }
                }
                break;
              case 31:
              case 13:
                v = Qu(r, 2), v !== null && na(v, r, 2), lf(), sy(r, 2);
            }
          if (r = ry(i), r === null && Km(
            l,
            n,
            i,
            Dh,
            u
          ), r === s) break;
          s = r;
        }
        s !== null && i.stopPropagation();
      } else
        Km(
          l,
          n,
          i,
          null,
          u
        );
    }
  }
  function ry(l) {
    return l = kr(l), gf(l);
  }
  var Dh = null;
  function gf(l) {
    if (Dh = null, l = ni(l), l !== null) {
      var n = ve(l);
      if (n === null) l = null;
      else {
        var u = n.tag;
        if (u === 13) {
          if (l = Al(n), l !== null) return l;
          l = null;
        } else if (u === 31) {
          if (l = K(n), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          l = null;
        } else n !== l && (l = null);
      }
    }
    return Dh = l, null;
  }
  function fr(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Y1()) {
          case Yr:
            return 2;
          case jr:
            return 8;
          case dc:
          case j1:
            return 32;
          case o0:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Sf = !1, al = null, Ul = null, Xl = null, $c = /* @__PURE__ */ new Map(), on = /* @__PURE__ */ new Map(), Te = [], ca = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function uc(l, n) {
    switch (l) {
      case "focusin":
      case "focusout":
        al = null;
        break;
      case "dragenter":
      case "dragleave":
        Ul = null;
        break;
      case "mouseover":
      case "mouseout":
        Xl = null;
        break;
      case "pointerover":
      case "pointerout":
        $c.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        on.delete(n.pointerId);
    }
  }
  function Wi(l, n, u, i, s, r) {
    return l === null || l.nativeEvent !== r ? (l = {
      blockedOn: n,
      domEventName: u,
      eventSystemFlags: i,
      nativeEvent: r,
      targetContainers: [s]
    }, n !== null && (n = ui(n), n !== null && Hv(n)), l) : (l.eventSystemFlags |= i, n = l.targetContainers, s !== null && n.indexOf(s) === -1 && n.push(s), l);
  }
  function P1(l, n, u, i, s) {
    switch (n) {
      case "focusin":
        return al = Wi(
          al,
          l,
          n,
          u,
          i,
          s
        ), !0;
      case "dragenter":
        return Ul = Wi(
          Ul,
          l,
          n,
          u,
          i,
          s
        ), !0;
      case "mouseover":
        return Xl = Wi(
          Xl,
          l,
          n,
          u,
          i,
          s
        ), !0;
      case "pointerover":
        var r = s.pointerId;
        return $c.set(
          r,
          Wi(
            $c.get(r) || null,
            l,
            n,
            u,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return r = s.pointerId, on.set(
          r,
          Wi(
            on.get(r) || null,
            l,
            n,
            u,
            i,
            s
          )
        ), !0;
    }
    return !1;
  }
  function Bv(l) {
    var n = ni(l.target);
    if (n !== null) {
      var u = ve(n);
      if (u !== null) {
        if (n = u.tag, n === 13) {
          if (n = Al(u), n !== null) {
            l.blockedOn = n, r0(l.priority, function() {
              $i(u);
            });
            return;
          }
        } else if (n === 31) {
          if (n = K(u), n !== null) {
            l.blockedOn = n, r0(l.priority, function() {
              $i(u);
            });
            return;
          }
        } else if (n === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function sr(l) {
    if (l.blockedOn !== null) return !1;
    for (var n = l.targetContainers; 0 < n.length; ) {
      var u = ry(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var i = new u.constructor(
          u.type,
          u
        );
        Wr = i, u.target.dispatchEvent(i), Wr = null;
      } else
        return n = ui(u), n !== null && Hv(n), l.blockedOn = u, !1;
      n.shift();
    }
    return !0;
  }
  function bf(l, n, u) {
    sr(l) && u.delete(n);
  }
  function Nv() {
    Sf = !1, al !== null && sr(al) && (al = null), Ul !== null && sr(Ul) && (Ul = null), Xl !== null && sr(Xl) && (Xl = null), $c.forEach(bf), on.forEach(bf);
  }
  function Eu(l, n) {
    l.blockedOn === n && (l.blockedOn = null, Sf || (Sf = !0, L.unstable_scheduleCallback(
      L.unstable_NormalPriority,
      Nv
    )));
  }
  var Tf = null;
  function xv(l) {
    Tf !== l && (Tf = l, L.unstable_scheduleCallback(
      L.unstable_NormalPriority,
      function() {
        Tf === l && (Tf = null);
        for (var n = 0; n < l.length; n += 3) {
          var u = l[n], i = l[n + 1], s = l[n + 2];
          if (typeof i != "function") {
            if (gf(i || u) === null)
              continue;
            break;
          }
          var r = ui(u);
          r !== null && (l.splice(n, 3), n -= 3, Zo(
            r,
            {
              pending: !0,
              data: s,
              method: u.method,
              action: i
            },
            i,
            s
          ));
        }
      }
    ));
  }
  function Ef(l) {
    function n(T) {
      return Eu(T, l);
    }
    al !== null && Eu(al, l), Ul !== null && Eu(Ul, l), Xl !== null && Eu(Xl, l), $c.forEach(n), on.forEach(n);
    for (var u = 0; u < Te.length; u++) {
      var i = Te[u];
      i.blockedOn === l && (i.blockedOn = null);
    }
    for (; 0 < Te.length && (u = Te[0], u.blockedOn === null); )
      Bv(u), u.blockedOn === null && Te.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (i = 0; i < u.length; i += 3) {
        var s = u[i], r = u[i + 1], m = s[wl] || null;
        if (typeof r == "function")
          m || xv(u);
        else if (m) {
          var v = null;
          if (r && r.hasAttribute("formAction")) {
            if (s = r, m = r[wl] || null)
              v = m.formAction;
            else if (gf(s) !== null) continue;
          } else v = m.action;
          typeof v == "function" ? u[i + 1] = v : (u.splice(i, 3), i -= 3), xv(u);
        }
      }
  }
  function dy() {
    function l(r) {
      r.canIntercept && r.info === "react-transition" && r.intercept({
        handler: function() {
          return new Promise(function(m) {
            return s = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      s !== null && (s(), s = null), i || setTimeout(u, 20);
    }
    function u() {
      if (!i && !navigation.transition) {
        var r = navigation.currentEntry;
        r && r.url != null && navigation.navigate(r.url, {
          state: r.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, s = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(u, 100), function() {
        i = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), s !== null && (s(), s = null);
      };
    }
  }
  function Oh(l) {
    this._internalRoot = l;
  }
  Mh.prototype.render = Oh.prototype.render = function(l) {
    var n = this._internalRoot;
    if (n === null) throw Error(x(409));
    var u = n.current, i = ma();
    Cv(u, i, l, n, null, null);
  }, Mh.prototype.unmount = Oh.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var n = l.containerInfo;
      Cv(l.current, 2, null, l, null, null), lf(), n[mc] = null;
    }
  };
  function Mh(l) {
    this._internalRoot = l;
  }
  Mh.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var n = Qr();
      l = { blockedOn: null, target: l, priority: n };
      for (var u = 0; u < Te.length && n !== 0 && n < Te[u].priority; u++) ;
      Te.splice(u, 0, l), u === 0 && Bv(l);
    }
  };
  var hy = Ye.version;
  if (hy !== "19.2.3")
    throw Error(
      x(
        527,
        hy,
        "19.2.3"
      )
    );
  Q.findDOMNode = function(l) {
    var n = l._reactInternals;
    if (n === void 0)
      throw typeof l.render == "function" ? Error(x(188)) : (l = Object.keys(l).join(","), Error(x(268, l)));
    return l = Hl(n), l = l !== null ? Zn(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var qv = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var rr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!rr.isDisabled && rr.supportsFiber)
      try {
        li = rr.inject(
          qv
        ), oa = rr;
      } catch {
      }
  }
  return ip.createRoot = function(l, n) {
    if (!ue(l)) throw Error(x(299));
    var u = !1, i = "", s = jd, r = mm, m = Gd;
    return n != null && (n.unstable_strictMode === !0 && (u = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError)), n = Ah(
      l,
      1,
      !1,
      null,
      null,
      u,
      i,
      null,
      s,
      r,
      m,
      dy
    ), l[mc] = n.current, ff(l), new Oh(n);
  }, ip.hydrateRoot = function(l, n, u) {
    if (!ue(l)) throw Error(x(299));
    var i = !1, s = "", r = jd, m = mm, v = Gd, T = null;
    return u != null && (u.unstable_strictMode === !0 && (i = !0), u.identifierPrefix !== void 0 && (s = u.identifierPrefix), u.onUncaughtError !== void 0 && (r = u.onUncaughtError), u.onCaughtError !== void 0 && (m = u.onCaughtError), u.onRecoverableError !== void 0 && (v = u.onRecoverableError), u.formState !== void 0 && (T = u.formState)), n = Ah(
      l,
      1,
      !0,
      n,
      u ?? null,
      i,
      s,
      T,
      r,
      m,
      v,
      dy
    ), n.context = Ki(null), u = n.current, i = ma(), i = Xr(i), s = $u(i), s.callback = null, Ua(u, s, i), u = i, n.current.lanes = u, mo(n, u), gu(n), l[mc] = n.current, ff(l), new Mh(n);
  }, ip.version = "19.2.3", ip;
}
var op = {};
var _b;
function s4() {
  return _b || (_b = 1, process.env.NODE_ENV !== "production" && (function() {
    function L(t, e) {
      for (t = t.memoizedState; t !== null && 0 < e; )
        t = t.next, e--;
      return t;
    }
    function Ye(t, e, a, c) {
      if (a >= e.length) return c;
      var o = e[a], f = ke(t) ? t.slice() : Et({}, t);
      return f[o] = Ye(t[o], e, a + 1, c), f;
    }
    function de(t, e, a) {
      if (e.length !== a.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var c = 0; c < a.length - 1; c++)
          if (e[c] !== a[c]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return x(t, e, a, 0);
      }
    }
    function x(t, e, a, c) {
      var o = e[c], f = ke(t) ? t.slice() : Et({}, t);
      return c + 1 === e.length ? (f[a[c]] = f[o], ke(f) ? f.splice(o, 1) : delete f[o]) : f[o] = x(
        t[o],
        e,
        a,
        c + 1
      ), f;
    }
    function ue(t, e, a) {
      var c = e[a], o = ke(t) ? t.slice() : Et({}, t);
      return a + 1 === e.length ? (ke(o) ? o.splice(c, 1) : delete o[c], o) : (o[c] = ue(t[c], e, a + 1), o);
    }
    function ve() {
      return !1;
    }
    function Al() {
      return null;
    }
    function K() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function Ie() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function Hl() {
    }
    function Zn() {
    }
    function ot(t) {
      var e = [];
      return t.forEach(function(a) {
        e.push(a);
      }), e.sort().join(", ");
    }
    function xt(t, e, a, c) {
      return new w1(t, e, a, c);
    }
    function De(t, e) {
      t.context === Of && (rh(t.current, 2, e, t, null, null), Na());
    }
    function Oe(t, e) {
      if (Du !== null) {
        var a = e.staleFamilies;
        e = e.updatedFamilies, Vs(), Mp(
          t.current,
          e,
          a
        ), Na();
      }
    }
    function Bl(t) {
      Du = t;
    }
    function he(t) {
      return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
    }
    function Ft(t) {
      var e = t, a = t;
      if (t.alternate) for (; e.return; ) e = e.return;
      else {
        t = e;
        do
          e = t, (e.flags & 4098) !== 0 && (a = e.return), t = e.return;
        while (t);
      }
      return e.tag === 3 ? a : null;
    }
    function wa(t) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
      }
      return null;
    }
    function je(t) {
      if (t.tag === 31) {
        var e = t.memoizedState;
        if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
      }
      return null;
    }
    function zl(t) {
      if (Ft(t) !== t)
        throw Error("Unable to find node on an unmounted component.");
    }
    function ga(t) {
      var e = t.alternate;
      if (!e) {
        if (e = Ft(t), e === null)
          throw Error("Unable to find node on an unmounted component.");
        return e !== t ? null : t;
      }
      for (var a = t, c = e; ; ) {
        var o = a.return;
        if (o === null) break;
        var f = o.alternate;
        if (f === null) {
          if (c = o.return, c !== null) {
            a = c;
            continue;
          }
          break;
        }
        if (o.child === f.child) {
          for (f = o.child; f; ) {
            if (f === a) return zl(o), t;
            if (f === c) return zl(o), e;
            f = f.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== c.return) a = o, c = f;
        else {
          for (var d = !1, h = o.child; h; ) {
            if (h === a) {
              d = !0, a = o, c = f;
              break;
            }
            if (h === c) {
              d = !0, c = o, a = f;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = f.child; h; ) {
              if (h === a) {
                d = !0, a = f, c = o;
                break;
              }
              if (h === c) {
                d = !0, c = f, a = o;
                break;
              }
              h = h.sibling;
            }
            if (!d)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (a.alternate !== c)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (a.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? t : e;
    }
    function Nl(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t;
      for (t = t.child; t !== null; ) {
        if (e = Nl(t), e !== null) return e;
        t = t.sibling;
      }
      return null;
    }
    function Ke(t) {
      return t === null || typeof t != "object" ? null : (t = Uv && t[Uv] || t["@@iterator"], typeof t == "function" ? t : null);
    }
    function Bt(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === hf ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case rf:
          return "Fragment";
        case ur:
          return "Profiler";
        case ua:
          return "StrictMode";
        case wi:
          return "Suspense";
        case ya:
          return "SuspenseList";
        case qn:
          return "Activity";
      }
      if (typeof t == "object")
        switch (typeof t.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), t.$$typeof) {
          case wc:
            return "Portal";
          case xn:
            return t.displayName || "Context";
          case ph:
            return (t._context.displayName || "Context") + ".Consumer";
          case df:
            var e = t.render;
            return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case cr:
            return e = t.displayName || null, e !== null ? e : Bt(t.type) || "Memo";
          case Gl:
            e = t._payload, t = t._init;
            try {
              return Bt(t(e));
            } catch {
            }
        }
      return null;
    }
    function cl(t) {
      return typeof t.tag == "number" ? et(t) : typeof t.name == "string" ? t.name : null;
    }
    function et(t) {
      var e = t.type;
      switch (t.tag) {
        case 31:
          return "Activity";
        case 24:
          return "Cache";
        case 9:
          return (e._context.displayName || "Context") + ".Consumer";
        case 10:
          return e.displayName || "Context";
        case 18:
          return "DehydratedFragment";
        case 11:
          return t = e.render, t = t.displayName || t.name || "", e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return e;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Bt(e);
        case 8:
          return e === ua ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if (typeof e == "function")
            return e.displayName || e.name || null;
          if (typeof e == "string") return e;
          break;
        case 29:
          if (e = t._debugInfo, e != null) {
            for (var a = e.length - 1; 0 <= a; a--)
              if (typeof e[a].name == "string") return e[a].name;
          }
          if (t.return !== null)
            return et(t.return);
      }
      return null;
    }
    function Ge(t) {
      return { current: t };
    }
    function _t(t, e) {
      0 > nc ? console.error("Unexpected pop.") : (e !== ny[nc] && console.error("Unexpected Fiber popped."), t.current = ay[nc], ay[nc] = null, ny[nc] = null, nc--);
    }
    function Ot(t, e, a) {
      nc++, ay[nc] = t.current, ny[nc] = a, t.current = e;
    }
    function xl(t) {
      return t === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), t;
    }
    function il(t, e) {
      Ot(qa, e, t), Ot(mf, t, t), Ot(Jc, null, t);
      var a = e.nodeType;
      switch (a) {
        case 9:
        case 11:
          a = a === 9 ? "#document" : "#fragment", e = (e = e.documentElement) && (e = e.namespaceURI) ? lv(e) : fo;
          break;
        default:
          if (a = e.tagName, e = e.namespaceURI)
            e = lv(e), e = ec(
              e,
              a
            );
          else
            switch (a) {
              case "svg":
                e = a0;
                break;
              case "math":
                e = M1;
                break;
              default:
                e = fo;
            }
      }
      a = a.toLowerCase(), a = y0(null, a), a = {
        context: e,
        ancestorInfo: a
      }, _t(Jc, t), Ot(Jc, a, t);
    }
    function O(t) {
      _t(Jc, t), _t(mf, t), _t(qa, t);
    }
    function Q() {
      return xl(Jc.current);
    }
    function Z(t) {
      t.memoizedState !== null && Ot(Kc, t, t);
      var e = xl(Jc.current), a = t.type, c = ec(e.context, a);
      a = y0(e.ancestorInfo, a), c = { context: c, ancestorInfo: a }, e !== c && (Ot(mf, t, t), Ot(Jc, c, t));
    }
    function ct(t) {
      mf.current === t && (_t(Jc, t), _t(mf, t)), Kc.current === t && (_t(Kc, t), lp._currentValue = Nr);
    }
    function rt() {
    }
    function j() {
      if (yf === 0) {
        _v = console.log, Ji = console.info, pf = console.warn, uy = console.error, ir = console.group, vh = console.groupCollapsed, gh = console.groupEnd;
        var t = {
          configurable: !0,
          enumerable: !0,
          value: rt,
          writable: !0
        };
        Object.defineProperties(console, {
          info: t,
          log: t,
          warn: t,
          error: t,
          group: t,
          groupCollapsed: t,
          groupEnd: t
        });
      }
      yf++;
    }
    function k() {
      if (yf--, yf === 0) {
        var t = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: Et({}, t, { value: _v }),
          info: Et({}, t, { value: Ji }),
          warn: Et({}, t, { value: pf }),
          error: Et({}, t, { value: uy }),
          group: Et({}, t, { value: ir }),
          groupCollapsed: Et({}, t, { value: vh }),
          groupEnd: Et({}, t, { value: gh })
        });
      }
      0 > yf && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function tt(t) {
      var e = Error.prepareStackTrace;
      if (Error.prepareStackTrace = void 0, t = t.stack, Error.prepareStackTrace = e, t.startsWith(`Error: react-stack-top-frame
`) && (t = t.slice(29)), e = t.indexOf(`
`), e !== -1 && (t = t.slice(e + 1)), e = t.indexOf("react_stack_bottom_frame"), e !== -1 && (e = t.lastIndexOf(
        `
`,
        e
      )), e !== -1)
        t = t.slice(0, e);
      else return "";
      return t;
    }
    function lt(t) {
      if (vf === void 0)
        try {
          throw Error();
        } catch (a) {
          var e = a.stack.trim().match(/\n( *(at )?)/);
          vf = e && e[1] || "", cy = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + vf + t + cy;
    }
    function Ce(t, e) {
      if (!t || Sh) return "";
      var a = iy.get(t);
      if (a !== void 0) return a;
      Sh = !0, a = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var c = null;
      c = B.H, B.H = null, j();
      try {
        var o = {
          DetermineComponentFrameRoot: function() {
            try {
              if (e) {
                var S = function() {
                  throw Error();
                };
                if (Object.defineProperty(S.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(S, []);
                  } catch (w) {
                    var C = w;
                  }
                  Reflect.construct(t, [], S);
                } else {
                  try {
                    S.call();
                  } catch (w) {
                    C = w;
                  }
                  t.call(S.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (w) {
                  C = w;
                }
                (S = t()) && typeof S.catch == "function" && S.catch(function() {
                });
              }
            } catch (w) {
              if (w && C && typeof w.stack == "string")
                return [w.stack, C.stack];
            }
            return [null, null];
          }
        };
        o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var f = Object.getOwnPropertyDescriptor(
          o.DetermineComponentFrameRoot,
          "name"
        );
        f && f.configurable && Object.defineProperty(
          o.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var d = o.DetermineComponentFrameRoot(), h = d[0], y = d[1];
        if (h && y) {
          var p = h.split(`
`), A = y.split(`
`);
          for (d = f = 0; f < p.length && !p[f].includes(
            "DetermineComponentFrameRoot"
          ); )
            f++;
          for (; d < A.length && !A[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (f === p.length || d === A.length)
            for (f = p.length - 1, d = A.length - 1; 1 <= f && 0 <= d && p[f] !== A[d]; )
              d--;
          for (; 1 <= f && 0 <= d; f--, d--)
            if (p[f] !== A[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, 0 > d || p[f] !== A[d]) {
                    var D = `
` + p[f].replace(
                      " at new ",
                      " at "
                    );
                    return t.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t.displayName)), typeof t == "function" && iy.set(t, D), D;
                  }
                while (1 <= f && 0 <= d);
              break;
            }
        }
      } finally {
        Sh = !1, B.H = c, k(), Error.prepareStackTrace = a;
      }
      return p = (p = t ? t.displayName || t.name : "") ? lt(p) : "", typeof t == "function" && iy.set(t, p), p;
    }
    function Ja(t, e) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return lt(t.type);
        case 16:
          return lt("Lazy");
        case 13:
          return t.child !== e && e !== null ? lt("Suspense Fallback") : lt("Suspense");
        case 19:
          return lt("SuspenseList");
        case 0:
        case 15:
          return Ce(t.type, !1);
        case 11:
          return Ce(t.type.render, !1);
        case 1:
          return Ce(t.type, !0);
        case 31:
          return lt("Activity");
        default:
          return "";
      }
    }
    function me(t) {
      try {
        var e = "", a = null;
        do {
          e += Ja(t, a);
          var c = t._debugInfo;
          if (c)
            for (var o = c.length - 1; 0 <= o; o--) {
              var f = c[o];
              if (typeof f.name == "string") {
                var d = e;
                t: {
                  var h = f.name, y = f.env, p = f.debugLocation;
                  if (p != null) {
                    var A = tt(p), D = A.lastIndexOf(`
`), S = D === -1 ? A : A.slice(D + 1);
                    if (S.indexOf(h) !== -1) {
                      var C = `
` + S;
                      break t;
                    }
                  }
                  C = lt(
                    h + (y ? " [" + y + "]" : "")
                  );
                }
                e = d + C;
              }
            }
          a = t, t = t.return;
        } while (t);
        return e;
      } catch (w) {
        return `
Error generating stack: ` + w.message + `
` + w.stack;
      }
    }
    function Ka(t) {
      return (t = t ? t.displayName || t.name : "") ? lt(t) : "";
    }
    function Sa() {
      if (pa === null) return null;
      var t = pa._debugOwner;
      return t != null ? cl(t) : null;
    }
    function Jf() {
      if (pa === null) return "";
      var t = pa;
      try {
        var e = "";
        switch (t.tag === 6 && (t = t.return), t.tag) {
          case 26:
          case 27:
          case 5:
            e += lt(t.type);
            break;
          case 13:
            e += lt("Suspense");
            break;
          case 19:
            e += lt("SuspenseList");
            break;
          case 31:
            e += lt("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            t._debugOwner || e !== "" || (e += Ka(
              t.type
            ));
            break;
          case 11:
            t._debugOwner || e !== "" || (e += Ka(
              t.type.render
            ));
        }
        for (; t; )
          if (typeof t.tag == "number") {
            var a = t;
            t = a._debugOwner;
            var c = a._debugStack;
            if (t && c) {
              var o = tt(c);
              o !== "" && (e += `
` + o);
            }
          } else if (t.debugStack != null) {
            var f = t.debugStack;
            (t = t.owner) && f && (e += `
` + tt(f));
          } else break;
        var d = e;
      } catch (h) {
        d = `
Error generating stack: ` + h.message + `
` + h.stack;
      }
      return d;
    }
    function W(t, e, a, c, o, f, d) {
      var h = pa;
      Kf(t);
      try {
        return t !== null && t._debugTask ? t._debugTask.run(
          e.bind(null, a, c, o, f, d)
        ) : e(a, c, o, f, d);
      } finally {
        Kf(h);
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function Kf(t) {
      B.getCurrentStack = t === null ? null : Jf, Su = !1, pa = t;
    }
    function $f(t) {
      return typeof Symbol == "function" && Symbol.toStringTag && t[Symbol.toStringTag] || t.constructor.name || "Object";
    }
    function Ln(t) {
      try {
        return ti(t), !1;
      } catch {
        return !0;
      }
    }
    function ti(t) {
      return "" + t;
    }
    function It(t, e) {
      if (Ln(t))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          e,
          $f(t)
        ), ti(t);
    }
    function u0(t, e) {
      if (Ln(t))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          e,
          $f(t)
        ), ti(t);
    }
    function xr(t) {
      if (Ln(t))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          $f(t)
        ), ti(t);
    }
    function c0(t) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var e = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (e.isDisabled) return !0;
      if (!e.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        $i = e.inject(t), ll = e;
      } catch (a) {
        console.error("React instrumentation encountered an error: %o.", a);
      }
      return !!e.checkDCE;
    }
    function ce(t) {
      if (typeof sy == "function" && Hv(t), ll && typeof ll.setStrictMode == "function")
        try {
          ll.setStrictMode($i, t);
        } catch (e) {
          bu || (bu = !0, console.error(
            "React instrumentation encountered an error: %o",
            e
          ));
        }
    }
    function i0(t) {
      return t >>>= 0, t === 0 ? 32 : 31 - (ry(t) / Dh | 0) | 0;
    }
    function ei(t) {
      var e = t & 42;
      if (e !== 0) return e;
      switch (t & -t) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return t & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return t & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), t;
      }
    }
    function qr(t, e, a) {
      var c = t.pendingLanes;
      if (c === 0) return 0;
      var o = 0, f = t.suspendedLanes, d = t.pingedLanes;
      t = t.warmLanes;
      var h = c & 134217727;
      return h !== 0 ? (c = h & ~f, c !== 0 ? o = ei(c) : (d &= h, d !== 0 ? o = ei(d) : a || (a = h & ~t, a !== 0 && (o = ei(a))))) : (h = c & ~f, h !== 0 ? o = ei(h) : d !== 0 ? o = ei(d) : a || (a = c & ~t, a !== 0 && (o = ei(a)))), o === 0 ? 0 : e !== 0 && e !== o && (e & f) === 0 && (f = o & -o, a = e & -e, f >= a || f === 32 && (a & 4194048) !== 0) ? e : o;
    }
    function Dl(t, e) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
    }
    function Y1(t, e) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return e + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), -1;
      }
    }
    function Yr() {
      var t = Sf;
      return Sf <<= 1, (Sf & 62914560) === 0 && (Sf = 4194304), t;
    }
    function jr(t) {
      for (var e = [], a = 0; 31 > a; a++) e.push(t);
      return e;
    }
    function dc(t, e) {
      t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
    }
    function j1(t, e, a, c, o, f) {
      var d = t.pendingLanes;
      t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
      var h = t.entanglements, y = t.expirationTimes, p = t.hiddenUpdates;
      for (a = d & ~a; 0 < a; ) {
        var A = 31 - Rl(a), D = 1 << A;
        h[A] = 0, y[A] = -1;
        var S = p[A];
        if (S !== null)
          for (p[A] = null, A = 0; A < S.length; A++) {
            var C = S[A];
            C !== null && (C.lane &= -536870913);
          }
        a &= ~D;
      }
      c !== 0 && o0(t, c, 0), f !== 0 && o === 0 && t.tag !== 0 && (t.suspendedLanes |= f & ~(d & ~e));
    }
    function o0(t, e, a) {
      t.pendingLanes |= e, t.suspendedLanes &= ~e;
      var c = 31 - Rl(e);
      t.entangledLanes |= e, t.entanglements[c] = t.entanglements[c] | 1073741824 | a & 261930;
    }
    function fp(t, e) {
      var a = t.entangledLanes |= e;
      for (t = t.entanglements; a; ) {
        var c = 31 - Rl(a), o = 1 << c;
        o & e | t[c] & e && (t[c] |= e), a &= ~o;
      }
    }
    function sp(t, e) {
      var a = e & -e;
      return a = (a & 42) !== 0 ? 1 : li(a), (a & (t.suspendedLanes | e)) !== 0 ? 0 : a;
    }
    function li(t) {
      switch (t) {
        case 2:
          t = 1;
          break;
        case 8:
          t = 4;
          break;
        case 32:
          t = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          t = 128;
          break;
        case 268435456:
          t = 134217728;
          break;
        default:
          t = 0;
      }
      return t;
    }
    function oa(t, e, a) {
      if (Tu)
        for (t = t.pendingUpdatersLaneMap; 0 < a; ) {
          var c = 31 - Rl(a), o = 1 << c;
          t[c].add(e), a &= ~o;
        }
    }
    function xu(t, e) {
      if (Tu)
        for (var a = t.pendingUpdatersLaneMap, c = t.memoizedUpdaters; 0 < e; ) {
          var o = 31 - Rl(e);
          t = 1 << o, o = a[o], 0 < o.size && (o.forEach(function(f) {
            var d = f.alternate;
            d !== null && c.has(d) || c.add(f);
          }), o.clear()), e &= ~t;
        }
    }
    function Ll(t) {
      return t &= -t, al < t ? Ul < t ? (t & 134217727) !== 0 ? Xl : $c : Ul : al;
    }
    function rp() {
      var t = wt.p;
      return t !== 0 ? t : (t = window.event, t === void 0 ? Xl : hh(t.type));
    }
    function dp(t, e) {
      var a = wt.p;
      try {
        return wt.p = t, e();
      } finally {
        wt.p = a;
      }
    }
    function f0(t) {
      delete t[Te], delete t[ca], delete t[Wi], delete t[P1], delete t[Bv];
    }
    function qu(t) {
      var e = t[Te];
      if (e) return e;
      for (var a = t.parentNode; a; ) {
        if (e = a[uc] || a[Te]) {
          if (a = e.alternate, e.child !== null || a !== null && a.child !== null)
            for (t = Qi(t); t !== null; ) {
              if (a = t[Te])
                return a;
              t = Qi(t);
            }
          return e;
        }
        t = a, a = t.parentNode;
      }
      return null;
    }
    function dn(t) {
      if (t = t[Te] || t[uc]) {
        var e = t.tag;
        if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
          return t;
      }
      return null;
    }
    function hc(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6)
        return t.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function $a(t) {
      var e = t[sr];
      return e || (e = t[sr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
    }
    function Xe(t) {
      t[bf] = !0;
    }
    function hn(t, e) {
      ho(t, e), ho(t + "Capture", e);
    }
    function ho(t, e) {
      Eu[t] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        t
      ), Eu[t] = e;
      var a = t.toLowerCase();
      for (Tf[a] = t, t === "onDoubleClick" && (Tf.ondblclick = t), t = 0; t < e.length; t++)
        Nv.add(e[t]);
    }
    function ai(t, e) {
      xv[e.type] || e.onChange || e.onInput || e.readOnly || e.disabled || e.value == null || console.error(
        t === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), e.onChange || e.readOnly || e.disabled || e.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function Wf(t) {
      return Ya.call(Oh, t) ? !0 : Ya.call(dy, t) ? !1 : Ef.test(t) ? Oh[t] = !0 : (dy[t] = !0, console.error("Invalid attribute name: `%s`", t), !1);
    }
    function mo(t, e, a) {
      if (Wf(e)) {
        if (!t.hasAttribute(e)) {
          switch (typeof a) {
            case "symbol":
            case "object":
              return a;
            case "function":
              return a;
            case "boolean":
              if (a === !1) return a;
          }
          return a === void 0 ? void 0 : null;
        }
        return t = t.getAttribute(e), t === "" && a === !0 ? !0 : (It(a, e), t === "" + a ? a : t);
      }
    }
    function Gr(t, e, a) {
      if (Wf(e))
        if (a === null) t.removeAttribute(e);
        else {
          switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
              t.removeAttribute(e);
              return;
            case "boolean":
              var c = e.toLowerCase().slice(0, 5);
              if (c !== "data-" && c !== "aria-") {
                t.removeAttribute(e);
                return;
              }
          }
          It(a, e), t.setAttribute(e, "" + a);
        }
    }
    function kf(t, e, a) {
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(e);
            return;
        }
        It(a, e), t.setAttribute(e, "" + a);
      }
    }
    function wn(t, e, a, c) {
      if (c === null) t.removeAttribute(a);
      else {
        switch (typeof c) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(a);
            return;
        }
        It(c, a), t.setAttributeNS(e, a, "" + c);
      }
    }
    function ba(t) {
      switch (typeof t) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return t;
        case "object":
          return xr(t), t;
        default:
          return "";
      }
    }
    function Xr(t) {
      var e = t.type;
      return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
    }
    function s0(t, e, a) {
      var c = Object.getOwnPropertyDescriptor(
        t.constructor.prototype,
        e
      );
      if (!t.hasOwnProperty(e) && typeof c < "u" && typeof c.get == "function" && typeof c.set == "function") {
        var o = c.get, f = c.set;
        return Object.defineProperty(t, e, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(d) {
            xr(d), a = "" + d, f.call(this, d);
          }
        }), Object.defineProperty(t, e, {
          enumerable: c.enumerable
        }), {
          getValue: function() {
            return a;
          },
          setValue: function(d) {
            xr(d), a = "" + d;
          },
          stopTracking: function() {
            t._valueTracker = null, delete t[e];
          }
        };
      }
    }
    function Qr(t) {
      if (!t._valueTracker) {
        var e = Xr(t) ? "checked" : "value";
        t._valueTracker = s0(
          t,
          e,
          "" + t[e]
        );
      }
    }
    function r0(t) {
      if (!t) return !1;
      var e = t._valueTracker;
      if (!e) return !0;
      var a = e.getValue(), c = "";
      return t && (c = Xr(t) ? t.checked ? "true" : "false" : t.value), t = c, t !== a ? (e.setValue(t), !0) : !1;
    }
    function mn(t) {
      if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    function Pt(t) {
      return t.replace(
        Mh,
        function(e) {
          return "\\" + e.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function wl(t, e) {
      e.checked === void 0 || e.defaultChecked === void 0 || qv || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Sa() || "A component",
        e.type
      ), qv = !0), e.value === void 0 || e.defaultValue === void 0 || hy || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Sa() || "A component",
        e.type
      ), hy = !0);
    }
    function mc(t, e, a, c, o, f, d, h) {
      t.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (It(d, "type"), t.type = d) : t.removeAttribute("type"), e != null ? d === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + ba(e)) : t.value !== "" + ba(e) && (t.value = "" + ba(e)) : d !== "submit" && d !== "reset" || t.removeAttribute("value"), e != null ? d0(t, d, ba(e)) : a != null ? d0(t, d, ba(a)) : c != null && t.removeAttribute("value"), o == null && f != null && (t.defaultChecked = !!f), o != null && (t.checked = o && typeof o != "function" && typeof o != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (It(h, "name"), t.name = "" + ba(h)) : t.removeAttribute("name");
    }
    function Vr(t, e, a, c, o, f, d, h) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (It(f, "type"), t.type = f), e != null || a != null) {
        if (!(f !== "submit" && f !== "reset" || e != null)) {
          Qr(t);
          return;
        }
        a = a != null ? "" + ba(a) : "", e = e != null ? "" + ba(e) : a, h || e === t.value || (t.value = e), t.defaultValue = e;
      }
      c = c ?? o, c = typeof c != "function" && typeof c != "symbol" && !!c, t.checked = h ? t.checked : !!c, t.defaultChecked = !!c, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (It(d, "name"), t.name = d), Qr(t);
    }
    function d0(t, e, a) {
      e === "number" && mn(t.ownerDocument) === t || t.defaultValue === "" + a || (t.defaultValue = "" + a);
    }
    function hp(t, e) {
      e.value == null && (typeof e.children == "object" && e.children !== null ? nr.Children.forEach(e.children, function(a) {
        a == null || typeof a == "string" || typeof a == "number" || typeof a == "bigint" || l || (l = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : e.dangerouslySetInnerHTML == null || n || (n = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), e.selected == null || rr || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), rr = !0);
    }
    function h0() {
      var t = Sa();
      return t ? `

Check the render method of \`` + t + "`." : "";
    }
    function Jn(t, e, a, c) {
      if (t = t.options, e) {
        e = {};
        for (var o = 0; o < a.length; o++)
          e["$" + a[o]] = !0;
        for (a = 0; a < t.length; a++)
          o = e.hasOwnProperty("$" + t[a].value), t[a].selected !== o && (t[a].selected = o), o && c && (t[a].defaultSelected = !0);
      } else {
        for (a = "" + ba(a), e = null, o = 0; o < t.length; o++) {
          if (t[o].value === a) {
            t[o].selected = !0, c && (t[o].defaultSelected = !0);
            return;
          }
          e !== null || t[o].disabled || (e = t[o]);
        }
        e !== null && (e.selected = !0);
      }
    }
    function Zr(t, e) {
      for (t = 0; t < i.length; t++) {
        var a = i[t];
        if (e[a] != null) {
          var c = ke(e[a]);
          e.multiple && !c ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            a,
            h0()
          ) : !e.multiple && c && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            a,
            h0()
          );
        }
      }
      e.value === void 0 || e.defaultValue === void 0 || u || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), u = !0);
    }
    function ni(t, e) {
      e.value === void 0 || e.defaultValue === void 0 || s || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        Sa() || "A component"
      ), s = !0), e.children != null && e.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function ui(t, e, a) {
      if (e != null && (e = "" + ba(e), e !== t.value && (t.value = e), a == null)) {
        t.defaultValue !== e && (t.defaultValue = e);
        return;
      }
      t.defaultValue = a != null ? "" + ba(a) : "";
    }
    function yo(t, e, a, c) {
      if (e == null) {
        if (c != null) {
          if (a != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (ke(c)) {
            if (1 < c.length)
              throw Error("<textarea> can only have at most one child.");
            c = c[0];
          }
          a = c;
        }
        a == null && (a = ""), e = a;
      }
      a = ba(e), t.defaultValue = a, c = t.textContent, c === a && c !== "" && c !== null && (t.value = c), Qr(t);
    }
    function ci(t, e) {
      return t.serverProps === void 0 && t.serverTail.length === 0 && t.children.length === 1 && 3 < t.distanceFromLeaf && t.distanceFromLeaf > 15 - e ? ci(t.children[0], e) : t;
    }
    function Jt(t) {
      return "  " + "  ".repeat(t);
    }
    function ii(t) {
      return "+ " + "  ".repeat(t);
    }
    function yc(t) {
      return "- " + "  ".repeat(t);
    }
    function pc(t) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return t.type;
        case 16:
          return "Lazy";
        case 31:
          return "Activity";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return t = t.type, t.displayName || t.name || null;
        case 11:
          return t = t.type.render, t.displayName || t.name || null;
        case 1:
          return t = t.type, t.displayName || t.name || null;
        default:
          return null;
      }
    }
    function Kn(t, e) {
      return r.test(t) ? (t = JSON.stringify(t), t.length > e - 2 ? 8 > e ? '{"..."}' : "{" + t.slice(0, e - 7) + '..."}' : "{" + t + "}") : t.length > e ? 5 > e ? '{"..."}' : t.slice(0, e - 3) + "..." : t;
    }
    function Lr(t, e, a) {
      var c = 120 - 2 * a;
      if (e === null)
        return ii(a) + Kn(t, c) + `
`;
      if (typeof e == "string") {
        for (var o = 0; o < e.length && o < t.length && e.charCodeAt(o) === t.charCodeAt(o); o++) ;
        return o > c - 8 && 10 < o && (t = "..." + t.slice(o - 8), e = "..." + e.slice(o - 8)), ii(a) + Kn(t, c) + `
` + yc(a) + Kn(e, c) + `
`;
      }
      return Jt(a) + Kn(t, c) + `
`;
    }
    function wr(t) {
      return Object.prototype.toString.call(t).replace(/^\[object (.*)\]$/, function(e, a) {
        return a;
      });
    }
    function po(t, e) {
      switch (typeof t) {
        case "string":
          return t = JSON.stringify(t), t.length > e ? 5 > e ? '"..."' : t.slice(0, e - 4) + '..."' : t;
        case "object":
          if (t === null) return "null";
          if (ke(t)) return "[...]";
          if (t.$$typeof === cn)
            return (e = Bt(t.type)) ? "<" + e + ">" : "<...>";
          var a = wr(t);
          if (a === "Object") {
            a = "", e -= 2;
            for (var c in t)
              if (t.hasOwnProperty(c)) {
                var o = JSON.stringify(c);
                if (o !== '"' + c + '"' && (c = o), e -= c.length - 2, o = po(
                  t[c],
                  15 > e ? e : 15
                ), e -= o.length, 0 > e) {
                  a += a === "" ? "..." : ", ...";
                  break;
                }
                a += (a === "" ? "" : ",") + c + ":" + o;
              }
            return "{" + a + "}";
          }
          return a;
        case "function":
          return (e = t.displayName || t.name) ? "function " + e : "function";
        default:
          return String(t);
      }
    }
    function vo(t, e) {
      return typeof t != "string" || r.test(t) ? "{" + po(t, e - 2) + "}" : t.length > e - 2 ? 5 > e ? '"..."' : '"' + t.slice(0, e - 5) + '..."' : '"' + t + '"';
    }
    function go(t, e, a) {
      var c = 120 - a.length - t.length, o = [], f;
      for (f in e)
        if (e.hasOwnProperty(f) && f !== "children") {
          var d = vo(
            e[f],
            120 - a.length - f.length - 1
          );
          c -= f.length + d.length + 2, o.push(f + "=" + d);
        }
      return o.length === 0 ? a + "<" + t + `>
` : 0 < c ? a + "<" + t + " " + o.join(" ") + `>
` : a + "<" + t + `
` + a + "  " + o.join(`
` + a + "  ") + `
` + a + `>
`;
    }
    function Jr(t, e, a) {
      var c = "", o = Et({}, e), f;
      for (f in t)
        if (t.hasOwnProperty(f)) {
          delete o[f];
          var d = 120 - 2 * a - f.length - 2, h = po(t[f], d);
          e.hasOwnProperty(f) ? (d = po(e[f], d), c += ii(a) + f + ": " + h + `
`, c += yc(a) + f + ": " + d + `
`) : c += ii(a) + f + ": " + h + `
`;
        }
      for (var y in o)
        o.hasOwnProperty(y) && (t = po(
          o[y],
          120 - 2 * a - y.length - 2
        ), c += yc(a) + y + ": " + t + `
`);
      return c;
    }
    function Yu(t, e, a, c) {
      var o = "", f = /* @__PURE__ */ new Map();
      for (p in a)
        a.hasOwnProperty(p) && f.set(
          p.toLowerCase(),
          p
        );
      if (f.size === 1 && f.has("children"))
        o += go(
          t,
          e,
          Jt(c)
        );
      else {
        for (var d in e)
          if (e.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (c + 1) - d.length - 1, y = f.get(d.toLowerCase());
            if (y !== void 0) {
              f.delete(d.toLowerCase());
              var p = e[d];
              y = a[y];
              var A = vo(
                p,
                h
              );
              h = vo(
                y,
                h
              ), typeof p == "object" && p !== null && typeof y == "object" && y !== null && wr(p) === "Object" && wr(y) === "Object" && (2 < Object.keys(p).length || 2 < Object.keys(y).length || -1 < A.indexOf("...") || -1 < h.indexOf("...")) ? o += Jt(c + 1) + d + `={{
` + Jr(
                p,
                y,
                c + 2
              ) + Jt(c + 1) + `}}
` : (o += ii(c + 1) + d + "=" + A + `
`, o += yc(c + 1) + d + "=" + h + `
`);
            } else
              o += Jt(c + 1) + d + "=" + vo(e[d], h) + `
`;
          }
        f.forEach(function(D) {
          if (D !== "children") {
            var S = 120 - 2 * (c + 1) - D.length - 1;
            o += yc(c + 1) + D + "=" + vo(a[D], S) + `
`;
          }
        }), o = o === "" ? Jt(c) + "<" + t + `>
` : Jt(c) + "<" + t + `
` + o + Jt(c) + `>
`;
      }
      return t = a.children, e = e.children, typeof t == "string" || typeof t == "number" || typeof t == "bigint" ? (f = "", (typeof e == "string" || typeof e == "number" || typeof e == "bigint") && (f = "" + e), o += Lr(f, "" + t, c + 1)) : (typeof e == "string" || typeof e == "number" || typeof e == "bigint") && (o = t == null ? o + Lr("" + e, null, c + 1) : o + Lr("" + e, void 0, c + 1)), o;
    }
    function Ta(t, e) {
      var a = pc(t);
      if (a === null) {
        for (a = "", t = t.child; t; )
          a += Ta(t, e), t = t.sibling;
        return a;
      }
      return Jt(e) + "<" + a + `>
`;
    }
    function Kr(t, e) {
      var a = ci(t, e);
      if (a !== t && (t.children.length !== 1 || t.children[0] !== a))
        return Jt(e) + `...
` + Kr(a, e + 1);
      a = "";
      var c = t.fiber._debugInfo;
      if (c)
        for (var o = 0; o < c.length; o++) {
          var f = c[o].name;
          typeof f == "string" && (a += Jt(e) + "<" + f + `>
`, e++);
        }
      if (c = "", o = t.fiber.pendingProps, t.fiber.tag === 6)
        c = Lr(o, t.serverProps, e), e++;
      else if (f = pc(t.fiber), f !== null)
        if (t.serverProps === void 0) {
          c = e;
          var d = 120 - 2 * c - f.length - 2, h = "";
          for (p in o)
            if (o.hasOwnProperty(p) && p !== "children") {
              var y = vo(o[p], 15);
              if (d -= p.length + y.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + p + "=" + y;
            }
          c = Jt(c) + "<" + f + h + `>
`, e++;
        } else
          t.serverProps === null ? (c = go(
            f,
            o,
            ii(e)
          ), e++) : typeof t.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (c = Yu(
            f,
            o,
            t.serverProps,
            e
          ), e++);
      var p = "";
      for (o = t.fiber.child, f = 0; o && f < t.children.length; )
        d = t.children[f], d.fiber === o ? (p += Kr(d, e), f++) : p += Ta(o, e), o = o.sibling;
      for (o && 0 < t.children.length && (p += Jt(e) + `...
`), o = t.serverTail, t.serverProps === null && e--, t = 0; t < o.length; t++)
        f = o[t], p = typeof f == "string" ? p + (yc(e) + Kn(f, 120 - 2 * e) + `
`) : p + go(
          f.type,
          f.props,
          yc(e)
        );
      return a + c + p;
    }
    function m0(t) {
      try {
        return `

` + Kr(t, 0);
      } catch {
        return "";
      }
    }
    function $r(t, e, a) {
      for (var c = e, o = null, f = 0; c; )
        c === t && (f = 0), o = {
          fiber: c,
          children: o !== null ? [o] : [],
          serverProps: c === e ? a : c === t ? null : void 0,
          serverTail: [],
          distanceFromLeaf: f
        }, f++, c = c.return;
      return o !== null ? m0(o).replaceAll(/^[+-]/gm, ">") : "";
    }
    function y0(t, e) {
      var a = Et({}, t || q), c = { tag: e };
      return v.indexOf(e) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), T.indexOf(e) !== -1 && (a.pTagInButtonScope = null), m.indexOf(e) !== -1 && e !== "address" && e !== "div" && e !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = c, e === "form" && (a.formTag = c), e === "a" && (a.aTagInScope = c), e === "button" && (a.buttonTagInScope = c), e === "nobr" && (a.nobrTagInScope = c), e === "p" && (a.pTagInButtonScope = c), e === "li" && (a.listItemTagAutoclosing = c), (e === "dd" || e === "dt") && (a.dlItemTagAutoclosing = c), e === "#document" || e === "html" ? a.containerTagInScope = null : a.containerTagInScope || (a.containerTagInScope = c), t !== null || e !== "#document" && e !== "html" && e !== "body" ? a.implicitRootScope === !0 && (a.implicitRootScope = !1) : a.implicitRootScope = !0, a;
    }
    function Ff(t, e, a) {
      switch (e) {
        case "select":
          return t === "hr" || t === "option" || t === "optgroup" || t === "script" || t === "template" || t === "#text";
        case "optgroup":
          return t === "option" || t === "#text";
        case "option":
          return t === "#text";
        case "tr":
          return t === "th" || t === "td" || t === "style" || t === "script" || t === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return t === "tr" || t === "style" || t === "script" || t === "template";
        case "colgroup":
          return t === "col" || t === "template";
        case "table":
          return t === "caption" || t === "colgroup" || t === "tbody" || t === "tfoot" || t === "thead" || t === "style" || t === "script" || t === "template";
        case "head":
          return t === "base" || t === "basefont" || t === "bgsound" || t === "link" || t === "meta" || t === "title" || t === "noscript" || t === "noframes" || t === "style" || t === "script" || t === "template";
        case "html":
          if (a) break;
          return t === "head" || t === "body" || t === "frameset";
        case "frameset":
          return t === "frame";
        case "#document":
          if (!a) return t === "html";
      }
      switch (t) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return e !== "h1" && e !== "h2" && e !== "h3" && e !== "h4" && e !== "h5" && e !== "h6";
        case "rp":
        case "rt":
          return U.indexOf(e) === -1;
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return e == null;
        case "head":
          return a || e === null;
        case "html":
          return a && e === "#document" || e === null;
        case "body":
          return a && (e === "#document" || e === "html") || e === null;
      }
      return !0;
    }
    function G1(t, e) {
      switch (t) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return e.pTagInButtonScope;
        case "form":
          return e.formTag || e.pTagInButtonScope;
        case "li":
          return e.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return e.dlItemTagAutoclosing;
        case "button":
          return e.buttonTagInScope;
        case "a":
          return e.aTagInScope;
        case "nobr":
          return e.nobrTagInScope;
      }
      return null;
    }
    function Ea(t, e) {
      for (; t; ) {
        switch (t.tag) {
          case 5:
          case 26:
          case 27:
            if (t.type === e) return t;
        }
        t = t.return;
      }
      return null;
    }
    function If(t, e) {
      e = e || q;
      var a = e.current;
      if (e = (a = Ff(
        t,
        a && a.tag,
        e.implicitRootScope
      ) ? null : a) ? null : G1(t, e), e = a || e, !e) return !0;
      var c = e.tag;
      if (e = String(!!a) + "|" + t + "|" + c, X[e]) return !1;
      X[e] = !0;
      var o = (e = pa) ? Ea(e.return, c) : null, f = e !== null && o !== null ? $r(o, e, null) : "", d = "<" + t + ">";
      return a ? (a = "", c === "table" && t === "tr" && (a += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        d,
        c,
        a,
        f
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        d,
        c,
        f
      ), e && (t = e.return, o === null || t === null || o === t && t._debugOwner === e._debugOwner || W(o, function() {
        console.error(
          `<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,
          c,
          d
        );
      })), !1;
    }
    function Pf(t, e, a) {
      if (a || Ff("#text", e, !1))
        return !0;
      if (a = "#text|" + e, X[a]) return !1;
      X[a] = !0;
      var c = (a = pa) ? Ea(a, e) : null;
      return a = a !== null && c !== null ? $r(
        c,
        a,
        a.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(t) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        e,
        a
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        e,
        a
      ), !1;
    }
    function oi(t, e) {
      if (e) {
        var a = t.firstChild;
        if (a && a === t.lastChild && a.nodeType === 3) {
          a.nodeValue = e;
          return;
        }
      }
      t.textContent = e;
    }
    function So(t) {
      return t.replace(M, function(e, a) {
        return a.toUpperCase();
      });
    }
    function p0(t, e, a) {
      var c = e.indexOf("--") === 0;
      c || (-1 < e.indexOf("-") ? R.hasOwnProperty(e) && R[e] || (R[e] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        e,
        So(e.replace(ae, "ms-"))
      )) : it.test(e) ? R.hasOwnProperty(e) && R[e] || (R[e] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        e,
        e.charAt(0).toUpperCase() + e.slice(1)
      )) : !z.test(a) || G.hasOwnProperty(a) && G[a] || (G[a] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        e,
        a.replace(z, "")
      )), typeof a == "number" && (isNaN(a) ? at || (at = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        e
      )) : isFinite(a) || Gt || (Gt = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        e
      )))), a == null || typeof a == "boolean" || a === "" ? c ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : c ? t.setProperty(e, a) : typeof a != "number" || a === 0 || I.has(e) ? e === "float" ? t.cssFloat = a : (u0(a, e), t[e] = ("" + a).trim()) : t[e] = a + "px";
    }
    function v0(t, e, a) {
      if (e != null && typeof e != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (e && Object.freeze(e), t = t.style, a != null) {
        if (e) {
          var c = {};
          if (a) {
            for (var o in a)
              if (a.hasOwnProperty(o) && !e.hasOwnProperty(o))
                for (var f = _[o] || [o], d = 0; d < f.length; d++)
                  c[f[d]] = o;
          }
          for (var h in e)
            if (e.hasOwnProperty(h) && (!a || a[h] !== e[h]))
              for (o = _[h] || [h], f = 0; f < o.length; f++)
                c[o[f]] = h;
          h = {};
          for (var y in e)
            for (o = _[y] || [y], f = 0; f < o.length; f++)
              h[o[f]] = y;
          y = {};
          for (var p in c)
            if (o = c[p], (f = h[p]) && o !== f && (d = o + "," + f, !y[d])) {
              y[d] = !0, d = console;
              var A = e[o];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                A == null || typeof A == "boolean" || A === "" ? "Removing" : "Updating",
                o,
                f
              );
            }
        }
        for (var D in a)
          !a.hasOwnProperty(D) || e != null && e.hasOwnProperty(D) || (D.indexOf("--") === 0 ? t.setProperty(D, "") : D === "float" ? t.cssFloat = "" : t[D] = "");
        for (var S in e)
          p = e[S], e.hasOwnProperty(S) && a[S] !== p && p0(t, S, p);
      } else
        for (c in e)
          e.hasOwnProperty(c) && p0(t, c, e[c]);
    }
    function $n(t) {
      if (t.indexOf("-") === -1) return !1;
      switch (t) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function mp(t) {
      return Vt.get(t) || t;
    }
    function yp(t, e) {
      if (Ya.call(Rh, e) && Rh[e])
        return !0;
      if (xb.test(e)) {
        if (t = "aria-" + e.slice(4).toLowerCase(), t = Yv.hasOwnProperty(t) ? t : null, t == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            e
          ), Rh[e] = !0;
        if (e !== t)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            e,
            t
          ), Rh[e] = !0;
      }
      if (Nb.test(e)) {
        if (t = e.toLowerCase(), t = Yv.hasOwnProperty(t) ? t : null, t == null) return Rh[e] = !0, !1;
        e !== t && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          e,
          t
        ), Rh[e] = !0);
      }
      return !0;
    }
    function pp(t, e) {
      var a = [], c;
      for (c in e)
        yp(t, c) || a.push(c);
      e = a.map(function(o) {
        return "`" + o + "`";
      }).join(", "), a.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        e,
        t
      ) : 1 < a.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        e,
        t
      );
    }
    function g0(t, e, a, c) {
      if (Ya.call(ja, e) && ja[e])
        return !0;
      var o = e.toLowerCase();
      if (o === "onfocusin" || o === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), ja[e] = !0;
      if (typeof a == "function" && (t === "form" && e === "action" || t === "input" && e === "formAction" || t === "button" && e === "formAction"))
        return !0;
      if (c != null) {
        if (t = c.possibleRegistrationNames, c.registrationNameDependencies.hasOwnProperty(e))
          return !0;
        if (c = t.hasOwnProperty(o) ? t[o] : null, c != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            e,
            c
          ), ja[e] = !0;
        if (m2.test(e))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            e
          ), ja[e] = !0;
      } else if (m2.test(e))
        return qb.test(e) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          e
        ), ja[e] = !0;
      if (Yb.test(e) || jb.test(e)) return !0;
      if (o === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), ja[e] = !0;
      if (o === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), ja[e] = !0;
      if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof a
        ), ja[e] = !0;
      if (typeof a == "number" && isNaN(a))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          e
        ), ja[e] = !0;
      if (Yn.hasOwnProperty(o)) {
        if (o = Yn[o], o !== e)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            e,
            o
          ), ja[e] = !0;
      } else if (e !== o)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          e,
          o
        ), ja[e] = !0;
      switch (e) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof a) {
        case "boolean":
          switch (e) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              return o = e.toLowerCase().slice(0, 5), o === "data-" || o === "aria-" ? !0 : (a ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                a,
                e,
                e,
                a,
                e
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                a,
                e,
                e,
                a,
                e,
                e,
                e
              ), ja[e] = !0);
          }
        case "function":
        case "symbol":
          return ja[e] = !0, !1;
        case "string":
          if (a === "false" || a === "true") {
            switch (e) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              a,
              e,
              a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              e,
              a
            ), ja[e] = !0;
          }
      }
      return !0;
    }
    function X1(t, e, a) {
      var c = [], o;
      for (o in e)
        g0(t, o, e[o], a) || c.push(o);
      e = c.map(function(f) {
        return "`" + f + "`";
      }).join(", "), c.length === 1 ? console.error(
        "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        e,
        t
      ) : 1 < c.length && console.error(
        "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        e,
        t
      );
    }
    function ts(t) {
      return Gb.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
    }
    function Wa() {
    }
    function yn(t) {
      return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
    }
    function Wr(t) {
      var e = dn(t);
      if (e && (t = e.stateNode)) {
        var a = t[ca] || null;
        t: switch (t = e.stateNode, e.type) {
          case "input":
            if (mc(
              t,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ), e = a.name, a.type === "radio" && e != null) {
              for (a = t; a.parentNode; ) a = a.parentNode;
              for (It(e, "name"), a = a.querySelectorAll(
                'input[name="' + Pt(
                  "" + e
                ) + '"][type="radio"]'
              ), e = 0; e < a.length; e++) {
                var c = a[e];
                if (c !== t && c.form === t.form) {
                  var o = c[ca] || null;
                  if (!o)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  mc(
                    c,
                    o.value,
                    o.defaultValue,
                    o.defaultValue,
                    o.checked,
                    o.defaultChecked,
                    o.type,
                    o.name
                  );
                }
              }
              for (e = 0; e < a.length; e++)
                c = a[e], c.form === t.form && r0(c);
            }
            break t;
          case "textarea":
            ui(t, a.value, a.defaultValue);
            break t;
          case "select":
            e = a.value, e != null && Jn(t, !!a.multiple, e, !1);
        }
      }
    }
    function kr(t, e, a) {
      if (tg) return t(e, a);
      tg = !0;
      try {
        var c = t(e);
        return c;
      } finally {
        if (tg = !1, (Uh !== null || _h !== null) && (Na(), Uh && (e = Uh, t = _h, _h = Uh = null, Wr(e), t)))
          for (e = 0; e < t.length; e++) Wr(t[e]);
      }
    }
    function Wn(t, e) {
      var a = t.stateNode;
      if (a === null) return null;
      var c = a[ca] || null;
      if (c === null) return null;
      a = c[e];
      t: switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (c = !c.disabled) || (t = t.type, c = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !c;
          break t;
        default:
          t = !1;
      }
      if (t) return null;
      if (a && typeof a != "function")
        throw Error(
          "Expected `" + e + "` listener to be a function, instead got a value of `" + typeof a + "` type."
        );
      return a;
    }
    function fi() {
      if (jv) return jv;
      var t, e = lg, a = e.length, c, o = "value" in Af ? Af.value : Af.textContent, f = o.length;
      for (t = 0; t < a && e[t] === o[t]; t++) ;
      var d = a - t;
      for (c = 1; c <= d && e[a - c] === o[f - c]; c++) ;
      return jv = o.slice(t, 1 < c ? 1 - c : void 0);
    }
    function es(t) {
      var e = t.keyCode;
      return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
    }
    function bo() {
      return !0;
    }
    function S0() {
      return !1;
    }
    function ol(t) {
      function e(a, c, o, f, d) {
        this._reactName = a, this._targetInst = o, this.type = c, this.nativeEvent = f, this.target = d, this.currentTarget = null;
        for (var h in t)
          t.hasOwnProperty(h) && (a = t[h], this[h] = a ? a(f) : f[h]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? bo : S0, this.isPropagationStopped = S0, this;
      }
      return Et(e.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = bo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = bo);
        },
        persist: function() {
        },
        isPersistent: bo
      }), e;
    }
    function ju(t) {
      var e = this.nativeEvent;
      return e.getModifierState ? e.getModifierState(t) : (t = Ib[t]) ? !!e[t] : !1;
    }
    function ls() {
      return ju;
    }
    function To(t, e) {
      switch (t) {
        case "keyup":
          return s3.indexOf(e.keyCode) !== -1;
        case "keydown":
          return e.keyCode !== g2;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Gu(t) {
      return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
    }
    function b0(t, e) {
      switch (t) {
        case "compositionend":
          return Gu(e);
        case "keypress":
          return e.which !== b2 ? null : (E2 = !0, T2);
        case "textInput":
          return t = e.data, t === T2 && E2 ? null : t;
        default:
          return null;
      }
    }
    function Fr(t, e) {
      if (Ch)
        return t === "compositionend" || !cg && To(t, e) ? (t = fi(), jv = lg = Af = null, Ch = !1, t) : null;
      switch (t) {
        case "paste":
          return null;
        case "keypress":
          if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
            if (e.char && 1 < e.char.length)
              return e.char;
            if (e.which)
              return String.fromCharCode(e.which);
          }
          return null;
        case "compositionend":
          return S2 && e.locale !== "ko" ? null : e.data;
        default:
          return null;
      }
    }
    function T0(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e === "input" ? !!d3[t.type] : e === "textarea";
    }
    function Ir(t) {
      if (!Wc) return !1;
      t = "on" + t;
      var e = t in document;
      return e || (e = document.createElement("div"), e.setAttribute(t, "return;"), e = typeof e[t] == "function"), e;
    }
    function as(t, e, a, c) {
      Uh ? _h ? _h.push(c) : _h = [c] : Uh = c, e = Hn(e, "onChange"), 0 < e.length && (a = new Gv(
        "onChange",
        "change",
        null,
        a,
        c
      ), t.push({ event: a, listeners: e }));
    }
    function vp(t) {
      Wt(t, 0);
    }
    function Ol(t) {
      var e = hc(t);
      if (r0(e)) return t;
    }
    function vc(t, e) {
      if (t === "change") return e;
    }
    function ns() {
      Sy && (Sy.detachEvent("onpropertychange", Eo), by = Sy = null);
    }
    function Eo(t) {
      if (t.propertyName === "value" && Ol(by)) {
        var e = [];
        as(
          e,
          by,
          t,
          yn(t)
        ), kr(vp, e);
      }
    }
    function Q1(t, e, a) {
      t === "focusin" ? (ns(), Sy = e, by = a, Sy.attachEvent("onpropertychange", Eo)) : t === "focusout" && ns();
    }
    function E0(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown")
        return Ol(by);
    }
    function A0(t, e) {
      if (t === "click") return Ol(e);
    }
    function us(t, e) {
      if (t === "input" || t === "change")
        return Ol(e);
    }
    function Pr(t, e) {
      return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
    }
    function Ao(t, e) {
      if (Ga(t, e)) return !0;
      if (typeof t != "object" || t === null || typeof e != "object" || e === null)
        return !1;
      var a = Object.keys(t), c = Object.keys(e);
      if (a.length !== c.length) return !1;
      for (c = 0; c < a.length; c++) {
        var o = a[c];
        if (!Ya.call(e, o) || !Ga(t[o], e[o]))
          return !1;
      }
      return !0;
    }
    function gp(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function Sp(t, e) {
      var a = gp(t);
      t = 0;
      for (var c; a; ) {
        if (a.nodeType === 3) {
          if (c = t + a.textContent.length, t <= e && c >= e)
            return { node: a, offset: e - t };
          t = c;
        }
        t: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break t;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = gp(a);
      }
    }
    function bp(t, e) {
      return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? bp(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
    }
    function td(t) {
      t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
      for (var e = mn(t.document); e instanceof t.HTMLIFrameElement; ) {
        try {
          var a = typeof e.contentWindow.location.href == "string";
        } catch {
          a = !1;
        }
        if (a) t = e.contentWindow;
        else break;
        e = mn(t.document);
      }
      return e;
    }
    function z0(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
    }
    function Tp(t, e, a) {
      var c = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      og || Hh == null || Hh !== mn(c) || (c = Hh, "selectionStart" in c && z0(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
        anchorNode: c.anchorNode,
        anchorOffset: c.anchorOffset,
        focusNode: c.focusNode,
        focusOffset: c.focusOffset
      }), Ty && Ao(Ty, c) || (Ty = c, c = Hn(ig, "onSelect"), 0 < c.length && (e = new Gv(
        "onSelect",
        "select",
        null,
        e,
        a
      ), t.push({ event: e, listeners: c }), e.target = Hh)));
    }
    function si(t, e) {
      var a = {};
      return a[t.toLowerCase()] = e.toLowerCase(), a["Webkit" + t] = "webkit" + e, a["Moz" + t] = "moz" + e, a;
    }
    function ri(t) {
      if (fg[t]) return fg[t];
      if (!Bh[t]) return t;
      var e = Bh[t], a;
      for (a in e)
        if (e.hasOwnProperty(a) && a in z2)
          return fg[t] = e[a];
      return t;
    }
    function pn(t, e) {
      U2.set(t, e), hn(e, [t]);
    }
    function Ep(t) {
      for (var e = Qv, a = 0; a < t.length; a++) {
        var c = t[a];
        if (typeof c == "object" && c !== null)
          if (ke(c) && c.length === 2 && typeof c[0] == "string") {
            if (e !== Qv && e !== mg)
              return dg;
            e = mg;
          } else return dg;
        else {
          if (typeof c == "function" || typeof c == "string" && 50 < c.length || e !== Qv && e !== hg)
            return dg;
          e = hg;
        }
      }
      return e;
    }
    function D0(t, e, a, c) {
      for (var o in t)
        Ya.call(t, o) && o[0] !== "_" && kn(o, t[o], e, a, c);
    }
    function kn(t, e, a, c, o) {
      switch (typeof e) {
        case "object":
          if (e === null) {
            e = "null";
            break;
          } else {
            if (e.$$typeof === cn) {
              var f = Bt(e.type) || "…", d = e.key;
              e = e.props;
              var h = Object.keys(e), y = h.length;
              if (d == null && y === 0) {
                e = "<" + f + " />";
                break;
              }
              if (3 > c || y === 1 && h[0] === "children" && d == null) {
                e = "<" + f + " … />";
                break;
              }
              a.push([
                o + "  ".repeat(c) + t,
                "<" + f
              ]), d !== null && kn(
                "key",
                d,
                a,
                c + 1,
                o
              ), t = !1;
              for (var p in e)
                p === "children" ? e.children != null && (!ke(e.children) || 0 < e.children.length) && (t = !0) : Ya.call(e, p) && p[0] !== "_" && kn(
                  p,
                  e[p],
                  a,
                  c + 1,
                  o
                );
              a.push([
                "",
                t ? ">…</" + f + ">" : "/>"
              ]);
              return;
            }
            if (f = Object.prototype.toString.call(e), f = f.slice(8, f.length - 1), f === "Array") {
              if (p = Ep(e), p === hg || p === Qv) {
                e = JSON.stringify(e);
                break;
              } else if (p === mg) {
                for (a.push([
                  o + "  ".repeat(c) + t,
                  ""
                ]), t = 0; t < e.length; t++)
                  f = e[t], kn(
                    f[0],
                    f[1],
                    a,
                    c + 1,
                    o
                  );
                return;
              }
            }
            if (f === "Promise") {
              if (e.status === "fulfilled") {
                if (f = a.length, kn(
                  t,
                  e.value,
                  a,
                  c,
                  o
                ), a.length > f) {
                  a = a[f], a[1] = "Promise<" + (a[1] || "Object") + ">";
                  return;
                }
              } else if (e.status === "rejected" && (f = a.length, kn(
                t,
                e.reason,
                a,
                c,
                o
              ), a.length > f)) {
                a = a[f], a[1] = "Rejected Promise<" + a[1] + ">";
                return;
              }
              a.push([
                "  ".repeat(c) + t,
                "Promise"
              ]);
              return;
            }
            f === "Object" && (p = Object.getPrototypeOf(e)) && typeof p.constructor == "function" && (f = p.constructor.name), a.push([
              o + "  ".repeat(c) + t,
              f === "Object" ? 3 > c ? "" : "…" : f
            ]), 3 > c && D0(e, a, c + 1, o);
            return;
          }
        case "function":
          e = e.name === "" ? "() => {}" : e.name + "() {}";
          break;
        case "string":
          e = e === S3 ? "…" : JSON.stringify(e);
          break;
        case "undefined":
          e = "undefined";
          break;
        case "boolean":
          e = e ? "true" : "false";
          break;
        default:
          e = String(e);
      }
      a.push([
        o + "  ".repeat(c) + t,
        e
      ]);
    }
    function Ap(t, e, a, c) {
      var o = !0;
      for (d in t)
        d in e || (a.push([
          Vv + "  ".repeat(c) + d,
          "…"
        ]), o = !1);
      for (var f in e)
        if (f in t) {
          var d = t[f], h = e[f];
          if (d !== h) {
            if (c === 0 && f === "children")
              o = "  ".repeat(c) + f, a.push(
                [Vv + o, "…"],
                [Zv + o, "…"]
              );
            else {
              if (!(3 <= c)) {
                if (typeof d == "object" && typeof h == "object" && d !== null && h !== null && d.$$typeof === h.$$typeof)
                  if (h.$$typeof === cn) {
                    if (d.type === h.type && d.key === h.key) {
                      d = Bt(h.type) || "…", o = "  ".repeat(c) + f, d = "<" + d + " … />", a.push(
                        [Vv + o, d],
                        [Zv + o, d]
                      ), o = !1;
                      continue;
                    }
                  } else {
                    var y = Object.prototype.toString.call(d), p = Object.prototype.toString.call(h);
                    if (y === p && (p === "[object Object]" || p === "[object Array]")) {
                      y = [
                        H2 + "  ".repeat(c) + f,
                        p === "[object Array]" ? "Array" : ""
                      ], a.push(y), p = a.length, Ap(
                        d,
                        h,
                        a,
                        c + 1
                      ) ? p === a.length && (y[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : o = !1;
                      continue;
                    }
                  }
                else if (typeof d == "function" && typeof h == "function" && d.name === h.name && d.length === h.length && (y = Function.prototype.toString.call(d), p = Function.prototype.toString.call(h), y === p)) {
                  d = h.name === "" ? "() => {}" : h.name + "() {}", a.push([
                    H2 + "  ".repeat(c) + f,
                    d + " Referentially unequal function closure. Consider memoization."
                  ]);
                  continue;
                }
              }
              kn(f, d, a, c, Vv), kn(f, h, a, c, Zv);
            }
            o = !1;
          }
        } else
          a.push([
            Zv + "  ".repeat(c) + f,
            "…"
          ]), o = !1;
      return o;
    }
    function vn(t) {
      jt = t & 63 ? "Blocking" : t & 64 ? "Gesture" : t & 4194176 ? "Transition" : t & 62914560 ? "Suspense" : t & 2080374784 ? "Idle" : "Other";
    }
    function ka(t, e, a, c) {
      Ee && (Df.start = e, Df.end = a, ki.color = "warning", ki.tooltipText = c, ki.properties = null, (t = t._debugTask) ? t.run(
        performance.measure.bind(
          performance,
          c,
          Df
        )
      ) : performance.measure(c, Df));
    }
    function ed(t, e, a) {
      ka(t, e, a, "Reconnect");
    }
    function ld(t, e, a, c, o) {
      var f = et(t);
      if (f !== null && Ee) {
        var d = t.alternate, h = t.actualDuration;
        if (d === null || d.child !== t.child)
          for (var y = t.child; y !== null; y = y.sibling)
            h -= y.actualDuration;
        c = 0.5 > h ? c ? "tertiary-light" : "primary-light" : 10 > h ? c ? "tertiary" : "primary" : 100 > h ? c ? "tertiary-dark" : "primary-dark" : "error";
        var p = t.memoizedProps;
        h = t._debugTask, p !== null && d !== null && d.memoizedProps !== p ? (y = [b3], p = Ap(
          d.memoizedProps,
          p,
          y,
          0
        ), 1 < y.length && (p && !zf && (d.lanes & o) === 0 && 100 < t.actualDuration ? (zf = !0, y[0] = T3, ki.color = "warning", ki.tooltipText = B2) : (ki.color = c, ki.tooltipText = f), ki.properties = y, Df.start = e, Df.end = a, h != null ? h.run(
          performance.measure.bind(
            performance,
            "​" + f,
            Df
          )
        ) : performance.measure(
          "​" + f,
          Df
        ))) : h != null ? h.run(
          console.timeStamp.bind(
            console,
            f,
            e,
            a,
            Au,
            void 0,
            c
          )
        ) : console.timeStamp(
          f,
          e,
          a,
          Au,
          void 0,
          c
        );
      }
    }
    function O0(t, e, a, c) {
      if (Ee) {
        var o = et(t);
        if (o !== null) {
          for (var f = null, d = [], h = 0; h < c.length; h++) {
            var y = c[h];
            f == null && y.source !== null && (f = y.source._debugTask), y = y.value, d.push([
              "Error",
              typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y)
            ]);
          }
          t.key !== null && kn("key", t.key, d, 0, ""), t.memoizedProps !== null && D0(t.memoizedProps, d, 0, ""), f == null && (f = t._debugTask), t = {
            start: e,
            end: a,
            detail: {
              devtools: {
                color: "error",
                track: Au,
                tooltipText: t.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
                properties: d
              }
            }
          }, f ? f.run(
            performance.measure.bind(performance, "​" + o, t)
          ) : performance.measure("​" + o, t);
        }
      }
    }
    function gn(t, e, a, c, o) {
      if (o !== null) {
        if (Ee) {
          var f = et(t);
          if (f !== null) {
            c = [];
            for (var d = 0; d < o.length; d++) {
              var h = o[d].value;
              c.push([
                "Error",
                typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h)
              ]);
            }
            t.key !== null && kn("key", t.key, c, 0, ""), t.memoizedProps !== null && D0(t.memoizedProps, c, 0, ""), e = {
              start: e,
              end: a,
              detail: {
                devtools: {
                  color: "error",
                  track: Au,
                  tooltipText: "A lifecycle or effect errored",
                  properties: c
                }
              }
            }, (t = t._debugTask) ? t.run(
              performance.measure.bind(
                performance,
                "​" + f,
                e
              )
            ) : performance.measure("​" + f, e);
          }
        }
      } else
        f = et(t), f !== null && Ee && (o = 1 > c ? "secondary-light" : 100 > c ? "secondary" : 500 > c ? "secondary-dark" : "error", (t = t._debugTask) ? t.run(
          console.timeStamp.bind(
            console,
            f,
            e,
            a,
            Au,
            void 0,
            o
          )
        ) : console.timeStamp(
          f,
          e,
          a,
          Au,
          void 0,
          o
        ));
    }
    function V1(t, e, a, c) {
      if (Ee && !(e <= t)) {
        var o = (a & 738197653) === a ? "tertiary-dark" : "primary-dark";
        a = (a & 536870912) === a ? "Prepared" : (a & 201326741) === a ? "Hydrated" : "Render", c ? c.run(
          console.timeStamp.bind(
            console,
            a,
            t,
            e,
            jt,
            qt,
            o
          )
        ) : console.timeStamp(
          a,
          t,
          e,
          jt,
          qt,
          o
        );
      }
    }
    function zp(t, e, a, c) {
      !Ee || e <= t || (a = (a & 738197653) === a ? "tertiary-dark" : "primary-dark", c ? c.run(
        console.timeStamp.bind(
          console,
          "Prewarm",
          t,
          e,
          jt,
          qt,
          a
        )
      ) : console.timeStamp(
        "Prewarm",
        t,
        e,
        jt,
        qt,
        a
      ));
    }
    function Dp(t, e, a, c) {
      !Ee || e <= t || (a = (a & 738197653) === a ? "tertiary-dark" : "primary-dark", c ? c.run(
        console.timeStamp.bind(
          console,
          "Suspended",
          t,
          e,
          jt,
          qt,
          a
        )
      ) : console.timeStamp(
        "Suspended",
        t,
        e,
        jt,
        qt,
        a
      ));
    }
    function Z1(t, e, a, c, o, f) {
      if (Ee && !(e <= t)) {
        a = [];
        for (var d = 0; d < c.length; d++) {
          var h = c[d].value;
          a.push([
            "Recoverable Error",
            typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h)
          ]);
        }
        t = {
          start: t,
          end: e,
          detail: {
            devtools: {
              color: "primary-dark",
              track: jt,
              trackGroup: qt,
              tooltipText: o ? "Hydration Failed" : "Recovered after Error",
              properties: a
            }
          }
        }, f ? f.run(
          performance.measure.bind(performance, "Recovered", t)
        ) : performance.measure("Recovered", t);
      }
    }
    function M0(t, e, a, c) {
      !Ee || e <= t || (c ? c.run(
        console.timeStamp.bind(
          console,
          "Errored",
          t,
          e,
          jt,
          qt,
          "error"
        )
      ) : console.timeStamp(
        "Errored",
        t,
        e,
        jt,
        qt,
        "error"
      ));
    }
    function L1(t, e, a, c) {
      !Ee || e <= t || (c ? c.run(
        console.timeStamp.bind(
          console,
          a,
          t,
          e,
          jt,
          qt,
          "secondary-light"
        )
      ) : console.timeStamp(
        a,
        t,
        e,
        jt,
        qt,
        "secondary-light"
      ));
    }
    function Op(t, e, a, c, o) {
      if (Ee && !(e <= t)) {
        for (var f = [], d = 0; d < a.length; d++) {
          var h = a[d].value;
          f.push([
            "Error",
            typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h)
          ]);
        }
        t = {
          start: t,
          end: e,
          detail: {
            devtools: {
              color: "error",
              track: jt,
              trackGroup: qt,
              tooltipText: c ? "Remaining Effects Errored" : "Commit Errored",
              properties: f
            }
          }
        }, o ? o.run(
          performance.measure.bind(performance, "Errored", t)
        ) : performance.measure("Errored", t);
      }
    }
    function R0(t, e, a) {
      !Ee || e <= t || console.timeStamp(
        "Animating",
        t,
        e,
        jt,
        qt,
        "secondary-dark"
      );
    }
    function ad() {
      for (var t = Nh, e = yg = Nh = 0; e < t; ) {
        var a = zu[e];
        zu[e++] = null;
        var c = zu[e];
        zu[e++] = null;
        var o = zu[e];
        zu[e++] = null;
        var f = zu[e];
        if (zu[e++] = null, c !== null && o !== null) {
          var d = c.pending;
          d === null ? o.next = o : (o.next = d.next, d.next = o), c.pending = o;
        }
        f !== 0 && U0(a, o, f);
      }
    }
    function zo(t, e, a, c) {
      zu[Nh++] = t, zu[Nh++] = e, zu[Nh++] = a, zu[Nh++] = c, yg |= c, t.lanes |= c, t = t.alternate, t !== null && (t.lanes |= c);
    }
    function di(t, e, a, c) {
      return zo(t, e, a, c), cs(t);
    }
    function ql(t, e) {
      return zo(t, null, null, e), cs(t);
    }
    function U0(t, e, a) {
      t.lanes |= a;
      var c = t.alternate;
      c !== null && (c.lanes |= a);
      for (var o = !1, f = t.return; f !== null; )
        f.childLanes |= a, c = f.alternate, c !== null && (c.childLanes |= a), f.tag === 22 && (t = f.stateNode, t === null || t._visibility & Ey || (o = !0)), t = f, f = f.return;
      return t.tag === 3 ? (f = t.stateNode, o && e !== null && (o = 31 - Rl(a), t = f.hiddenUpdates, c = t[o], c === null ? t[o] = [e] : c.push(e), e.lane = a | 536870912), f) : null;
    }
    function cs(t) {
      if (Wy > Y3)
        throw Rr = Wy = 0, ky = $g = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      Rr > j3 && (Rr = 0, ky = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), t.alternate === null && (t.flags & 4098) !== 0 && un(t);
      for (var e = t, a = e.return; a !== null; )
        e.alternate === null && (e.flags & 4098) !== 0 && un(t), e = a, a = e.return;
      return e.tag === 3 ? e.stateNode : null;
    }
    function gc(t) {
      if (Du === null) return t;
      var e = Du(t);
      return e === void 0 ? t : e.current;
    }
    function nd(t) {
      if (Du === null) return t;
      var e = Du(t);
      return e === void 0 ? t != null && typeof t.render == "function" && (e = gc(t.render), t.render !== e) ? (e = { $$typeof: df, render: e }, t.displayName !== void 0 && (e.displayName = t.displayName), e) : t : e.current;
    }
    function _0(t, e) {
      if (Du === null) return !1;
      var a = t.elementType;
      e = e.type;
      var c = !1, o = typeof e == "object" && e !== null ? e.$$typeof : null;
      switch (t.tag) {
        case 1:
          typeof e == "function" && (c = !0);
          break;
        case 0:
          (typeof e == "function" || o === Gl) && (c = !0);
          break;
        case 11:
          (o === df || o === Gl) && (c = !0);
          break;
        case 14:
        case 15:
          (o === cr || o === Gl) && (c = !0);
          break;
        default:
          return !1;
      }
      return !!(c && (t = Du(a), t !== void 0 && t === Du(e)));
    }
    function hi(t) {
      Du !== null && typeof WeakSet == "function" && (xh === null && (xh = /* @__PURE__ */ new WeakSet()), xh.add(t));
    }
    function Mp(t, e, a) {
      do {
        var c = t, o = c.alternate, f = c.child, d = c.sibling, h = c.tag;
        c = c.type;
        var y = null;
        switch (h) {
          case 0:
          case 15:
          case 1:
            y = c;
            break;
          case 11:
            y = c.render;
        }
        if (Du === null)
          throw Error("Expected resolveFamily to be set during hot reload.");
        var p = !1;
        if (c = !1, y !== null && (y = Du(y), y !== void 0 && (a.has(y) ? c = !0 : e.has(y) && (h === 1 ? c = !0 : p = !0))), xh !== null && (xh.has(t) || o !== null && xh.has(o)) && (c = !0), c && (t._debugNeedsRemount = !0), (c || p) && (o = ql(t, 2), o !== null && ht(o, t, 2)), f === null || c || Mp(
          f,
          e,
          a
        ), d === null) break;
        t = d;
      } while (!0);
    }
    function w1(t, e, a, c) {
      this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, N2 || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function C0(t) {
      return t = t.prototype, !(!t || !t.isReactComponent);
    }
    function Fn(t, e) {
      var a = t.alternate;
      switch (a === null ? (a = xt(
        t.tag,
        e,
        t.key,
        t.mode
      ), a.elementType = t.elementType, a.type = t.type, a.stateNode = t.stateNode, a._debugOwner = t._debugOwner, a._debugStack = t._debugStack, a._debugTask = t._debugTask, a._debugHookTypes = t._debugHookTypes, a.alternate = t, t.alternate = a) : (a.pendingProps = e, a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null, a.actualDuration = -0, a.actualStartTime = -1.1), a.flags = t.flags & 65011712, a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, e = t.dependencies, a.dependencies = e === null ? null : {
        lanes: e.lanes,
        firstContext: e.firstContext,
        _debugThenableState: e._debugThenableState
      }, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, a.selfBaseDuration = t.selfBaseDuration, a.treeBaseDuration = t.treeBaseDuration, a._debugInfo = t._debugInfo, a._debugNeedsRemount = t._debugNeedsRemount, a.tag) {
        case 0:
        case 15:
          a.type = gc(t.type);
          break;
        case 1:
          a.type = gc(t.type);
          break;
        case 11:
          a.type = nd(t.type);
      }
      return a;
    }
    function H0(t, e) {
      t.flags &= 65011714;
      var a = t.alternate;
      return a === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null, t.selfBaseDuration = 0, t.treeBaseDuration = 0) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, e = a.dependencies, t.dependencies = e === null ? null : {
        lanes: e.lanes,
        firstContext: e.firstContext,
        _debugThenableState: e._debugThenableState
      }, t.selfBaseDuration = a.selfBaseDuration, t.treeBaseDuration = a.treeBaseDuration), t;
    }
    function mi(t, e, a, c, o, f) {
      var d = 0, h = t;
      if (typeof t == "function")
        C0(t) && (d = 1), h = gc(h);
      else if (typeof t == "string")
        d = Q(), d = Ev(t, a, d) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
      else
        t: switch (t) {
          case qn:
            return e = xt(31, a, e, o), e.elementType = qn, e.lanes = f, e;
          case rf:
            return yi(
              a.children,
              o,
              f,
              e
            );
          case ua:
            d = 8, o |= va, o |= cc;
            break;
          case ur:
            return t = a, c = o, typeof t.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof t.id
            ), e = xt(12, t, e, c | At), e.elementType = ur, e.lanes = f, e.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, e;
          case wi:
            return e = xt(13, a, e, o), e.elementType = wi, e.lanes = f, e;
          case ya:
            return e = xt(19, a, e, o), e.elementType = ya, e.lanes = f, e;
          default:
            if (typeof t == "object" && t !== null)
              switch (t.$$typeof) {
                case xn:
                  d = 10;
                  break t;
                case ph:
                  d = 9;
                  break t;
                case df:
                  d = 11, h = nd(h);
                  break t;
                case cr:
                  d = 14;
                  break t;
                case Gl:
                  d = 16, h = null;
                  break t;
              }
            h = "", (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), t === null ? a = "null" : ke(t) ? a = "array" : t !== void 0 && t.$$typeof === cn ? (a = "<" + (Bt(t.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : a = typeof t, (d = c ? cl(c) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, a = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (a + "." + h)
            ), h = null;
        }
      return e = xt(d, a, e, o), e.elementType = t, e.type = h, e.lanes = f, e._debugOwner = c, e;
    }
    function Sc(t, e, a) {
      return e = mi(
        t.type,
        t.key,
        t.props,
        t._owner,
        e,
        a
      ), e._debugOwner = t._owner, e._debugStack = t._debugStack, e._debugTask = t._debugTask, e;
    }
    function yi(t, e, a, c) {
      return t = xt(7, t, c, e), t.lanes = a, t;
    }
    function Do(t, e, a) {
      return t = xt(6, t, null, e), t.lanes = a, t;
    }
    function B0(t) {
      var e = xt(18, null, null, dt);
      return e.stateNode = t, e;
    }
    function ud(t, e, a) {
      return e = xt(
        4,
        t.children !== null ? t.children : [],
        t.key,
        e
      ), e.lanes = a, e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation
      }, e;
    }
    function Jl(t, e) {
      if (typeof t == "object" && t !== null) {
        var a = pg.get(t);
        return a !== void 0 ? a : (e = {
          value: t,
          source: e,
          stack: me(e)
        }, pg.set(t, e), e);
      }
      return {
        value: t,
        source: e,
        stack: me(e)
      };
    }
    function Sn(t, e) {
      bc(), qh[Yh++] = Ay, qh[Yh++] = Lv, Lv = t, Ay = e;
    }
    function N0(t, e, a) {
      bc(), Ou[Mu++] = Ii, Ou[Mu++] = Pi, Ou[Mu++] = hr, hr = t;
      var c = Ii;
      t = Pi;
      var o = 32 - Rl(c) - 1;
      c &= ~(1 << o), a += 1;
      var f = 32 - Rl(e) + o;
      if (30 < f) {
        var d = o - o % 5;
        f = (c & (1 << d) - 1).toString(32), c >>= d, o -= d, Ii = 1 << 32 - Rl(e) + o | a << o | c, Pi = f + t;
      } else
        Ii = 1 << f | a << o | c, Pi = t;
    }
    function cd(t) {
      bc(), t.return !== null && (Sn(t, 1), N0(t, 1, 0));
    }
    function id(t) {
      for (; t === Lv; )
        Lv = qh[--Yh], qh[Yh] = null, Ay = qh[--Yh], qh[Yh] = null;
      for (; t === hr; )
        hr = Ou[--Mu], Ou[Mu] = null, Pi = Ou[--Mu], Ou[Mu] = null, Ii = Ou[--Mu], Ou[Mu] = null;
    }
    function Rp() {
      return bc(), hr !== null ? { id: Ii, overflow: Pi } : null;
    }
    function Up(t, e) {
      bc(), Ou[Mu++] = Ii, Ou[Mu++] = Pi, Ou[Mu++] = hr, Ii = e.id, Pi = e.overflow, hr = t;
    }
    function bc() {
      Nt || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function pi(t, e) {
      if (t.return === null) {
        if (jn === null)
          jn = {
            fiber: t,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: e
          };
        else {
          if (jn.fiber !== t)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          jn.distanceFromLeaf > e && (jn.distanceFromLeaf = e);
        }
        return jn;
      }
      var a = pi(
        t.return,
        e + 1
      ).children;
      return 0 < a.length && a[a.length - 1].fiber === t ? (a = a[a.length - 1], a.distanceFromLeaf > e && (a.distanceFromLeaf = e), a) : (e = {
        fiber: t,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: e
      }, a.push(e), e);
    }
    function _p() {
      Nt && console.error(
        "We should not be hydrating here. This is a bug in React. Please file a bug."
      );
    }
    function Yl(t, e) {
      kc || (t = pi(t, 0), t.serverProps = null, e !== null && (e = gv(e), t.serverTail.push(e)));
    }
    function Fa(t) {
      var e = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : !1, a = "", c = jn;
      throw c !== null && (jn = null, a = m0(c)), os(
        Jl(
          Error(
            "Hydration failed because the server rendered " + (e ? "text" : "HTML") + ` didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch` + a
          ),
          t
        )
      ), vg;
    }
    function x0(t) {
      var e = t.stateNode, a = t.type, c = t.memoizedProps;
      switch (e[Te] = t, e[ca] = c, aa(a, c), a) {
        case "dialog":
          st("cancel", e), st("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          st("load", e);
          break;
        case "video":
        case "audio":
          for (a = 0; a < Fy.length; a++)
            st(Fy[a], e);
          break;
        case "source":
          st("error", e);
          break;
        case "img":
        case "image":
        case "link":
          st("error", e), st("load", e);
          break;
        case "details":
          st("toggle", e);
          break;
        case "input":
          ai("input", c), st("invalid", e), wl(e, c), Vr(
            e,
            c.value,
            c.defaultValue,
            c.checked,
            c.defaultChecked,
            c.type,
            c.name,
            !0
          );
          break;
        case "option":
          hp(e, c);
          break;
        case "select":
          ai("select", c), st("invalid", e), Zr(e, c);
          break;
        case "textarea":
          ai("textarea", c), st("invalid", e), ni(e, c), yo(
            e,
            c.value,
            c.defaultValue,
            c.children
          );
      }
      a = c.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || e.textContent === "" + a || c.suppressHydrationWarning === !0 || Ym(e.textContent, a) ? (c.popover != null && (st("beforetoggle", e), st("toggle", e)), c.onScroll != null && st("scroll", e), c.onScrollEnd != null && st("scrollend", e), c.onClick != null && (e.onclick = Wa), e = !0) : e = !1, e || Fa(t, !0);
    }
    function q0(t) {
      for (ia = t.return; ia; )
        switch (ia.tag) {
          case 5:
          case 31:
          case 13:
            Ru = !1;
            return;
          case 27:
          case 3:
            Ru = !0;
            return;
          default:
            ia = ia.return;
        }
    }
    function vi(t) {
      if (t !== ia) return !1;
      if (!Nt)
        return q0(t), Nt = !0, !1;
      var e = t.tag, a;
      if ((a = e !== 3 && e !== 27) && ((a = e === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || lf(t.type, t.memoizedProps)), a = !a), a && Ae) {
        for (a = Ae; a; ) {
          var c = pi(t, 0), o = gv(a);
          c.serverTail.push(o), a = o.type === "Suspense" ? uf(a) : xa(a.nextSibling);
        }
        Fa(t);
      }
      if (q0(t), e === 13) {
        if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        Ae = uf(t);
      } else if (e === 31) {
        if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        Ae = uf(t);
      } else
        e === 27 ? (e = Ae, Zc(t.type) ? (t = c2, c2 = null, Ae = t) : Ae = e) : Ae = ia ? xa(t.stateNode.nextSibling) : null;
      return !0;
    }
    function Tc() {
      Ae = ia = null, kc = Nt = !1;
    }
    function is() {
      var t = Mf;
      return t !== null && (Za === null ? Za = t : Za.push.apply(
        Za,
        t
      ), Mf = null), t;
    }
    function os(t) {
      Mf === null ? Mf = [t] : Mf.push(t);
    }
    function Ec() {
      var t = jn;
      if (t !== null) {
        jn = null;
        for (var e = m0(t); 0 < t.children.length; )
          t = t.children[0];
        W(t.fiber, function() {
          console.error(
            `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,
            "https://react.dev/link/hydration-mismatch",
            e
          );
        });
      }
    }
    function Oo() {
      jh = wv = null, Gh = !1;
    }
    function Ia(t, e, a) {
      Ot(gg, e._currentValue, t), e._currentValue = a, Ot(Sg, e._currentRenderer, t), e._currentRenderer !== void 0 && e._currentRenderer !== null && e._currentRenderer !== q2 && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), e._currentRenderer = q2;
    }
    function bn(t, e) {
      t._currentValue = gg.current;
      var a = Sg.current;
      _t(Sg, e), t._currentRenderer = a, _t(gg, e);
    }
    function od(t, e, a) {
      for (; t !== null; ) {
        var c = t.alternate;
        if ((t.childLanes & e) !== e ? (t.childLanes |= e, c !== null && (c.childLanes |= e)) : c !== null && (c.childLanes & e) !== e && (c.childLanes |= e), t === a) break;
        t = t.return;
      }
      t !== a && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Xu(t, e, a, c) {
      var o = t.child;
      for (o !== null && (o.return = t); o !== null; ) {
        var f = o.dependencies;
        if (f !== null) {
          var d = o.child;
          f = f.firstContext;
          t: for (; f !== null; ) {
            var h = f;
            f = o;
            for (var y = 0; y < e.length; y++)
              if (h.context === e[y]) {
                f.lanes |= a, h = f.alternate, h !== null && (h.lanes |= a), od(
                  f.return,
                  a,
                  t
                ), c || (d = null);
                break t;
              }
            f = h.next;
          }
        } else if (o.tag === 18) {
          if (d = o.return, d === null)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          d.lanes |= a, f = d.alternate, f !== null && (f.lanes |= a), od(
            d,
            a,
            t
          ), d = null;
        } else d = o.child;
        if (d !== null) d.return = o;
        else
          for (d = o; d !== null; ) {
            if (d === t) {
              d = null;
              break;
            }
            if (o = d.sibling, o !== null) {
              o.return = d.return, d = o;
              break;
            }
            d = d.return;
          }
        o = d;
      }
    }
    function Tn(t, e, a, c) {
      t = null;
      for (var o = e, f = !1; o !== null; ) {
        if (!f) {
          if ((o.flags & 524288) !== 0) f = !0;
          else if ((o.flags & 262144) !== 0) break;
        }
        if (o.tag === 10) {
          var d = o.alternate;
          if (d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          if (d = d.memoizedProps, d !== null) {
            var h = o.type;
            Ga(o.pendingProps.value, d.value) || (t !== null ? t.push(h) : t = [h]);
          }
        } else if (o === Kc.current) {
          if (d = o.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== o.memoizedState.memoizedState && (t !== null ? t.push(lp) : t = [lp]);
        }
        o = o.return;
      }
      t !== null && Xu(
        e,
        t,
        a,
        c
      ), e.flags |= 262144;
    }
    function Mo(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!Ga(
          t.context._currentValue,
          t.memoizedValue
        ))
          return !0;
        t = t.next;
      }
      return !1;
    }
    function Ac(t) {
      wv = t, jh = null, t = t.dependencies, t !== null && (t.firstContext = null);
    }
    function Zt(t) {
      return Gh && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), Y0(wv, t);
    }
    function fs(t, e) {
      return wv === null && Ac(t), Y0(t, e);
    }
    function Y0(t, e) {
      var a = e._currentValue;
      if (e = { context: e, memoizedValue: a, next: null }, jh === null) {
        if (t === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        jh = e, t.dependencies = {
          lanes: 0,
          firstContext: e,
          _debugThenableState: null
        }, t.flags |= 524288;
      } else jh = jh.next = e;
      return a;
    }
    function fd() {
      return {
        controller: new z3(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function gi(t) {
      t.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), t.refCount++;
    }
    function ss(t) {
      t.refCount--, 0 > t.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), t.refCount === 0 && D3(O3, function() {
        t.controller.abort();
      });
    }
    function In(t, e, a) {
      (t & 127) !== 0 ? 0 > Fc && (Fc = vl(), Dy = Jv(e), bg = e, a != null && (Tg = et(a)), (Xt & (Cl | Qn)) !== Zl && (Je = !0, Uf = zy), t = af(), e = vu(), t !== Xh || e !== Oy ? Xh = -1.1 : e !== null && (Uf = zy), pr = t, Oy = e) : (t & 4194048) !== 0 && 0 > Uu && (Uu = vl(), My = Jv(e), Y2 = e, a != null && (j2 = et(a)), 0 > ao) && (t = af(), e = vu(), (t !== Cf || e !== vr) && (Cf = -1.1), _f = t, vr = e);
    }
    function Cp(t) {
      if (0 > Fc) {
        Fc = vl(), Dy = t._debugTask != null ? t._debugTask : null, (Xt & (Cl | Qn)) !== Zl && (Uf = zy);
        var e = af(), a = vu();
        e !== Xh || a !== Oy ? Xh = -1.1 : a !== null && (Uf = zy), pr = e, Oy = a;
      }
      0 > Uu && (Uu = vl(), My = t._debugTask != null ? t._debugTask : null, 0 > ao) && (t = af(), e = vu(), (t !== Cf || e !== vr) && (Cf = -1.1), _f = t, vr = e);
    }
    function Pn() {
      var t = mr;
      return mr = 0, t;
    }
    function Ro(t) {
      var e = mr;
      return mr = t, e;
    }
    function Kl(t) {
      var e = mr;
      return mr += t, e;
    }
    function Si() {
      ft = ut = -1.1;
    }
    function ge() {
      var t = ut;
      return ut = -1.1, t;
    }
    function fl(t) {
      0 <= t && (ut = t);
    }
    function Pa() {
      var t = xe;
      return xe = -0, t;
    }
    function Aa(t) {
      0 <= t && (xe = t);
    }
    function za() {
      var t = _e;
      return _e = null, t;
    }
    function tn() {
      var t = Je;
      return Je = !1, t;
    }
    function Qu(t) {
      Xa = vl(), 0 > t.actualStartTime && (t.actualStartTime = Xa);
    }
    function sd(t) {
      if (0 <= Xa) {
        var e = vl() - Xa;
        t.actualDuration += e, t.selfBaseDuration = e, Xa = -1;
      }
    }
    function rs(t) {
      if (0 <= Xa) {
        var e = vl() - Xa;
        t.actualDuration += e, Xa = -1;
      }
    }
    function $l() {
      if (0 <= Xa) {
        var t = vl(), e = t - Xa;
        Xa = -1, mr += e, xe += e, ft = t;
      }
    }
    function Hp(t) {
      _e === null && (_e = []), _e.push(t), eo === null && (eo = []), eo.push(t);
    }
    function He() {
      Xa = vl(), 0 > ut && (ut = Xa);
    }
    function bi(t) {
      for (var e = t.child; e; )
        t.actualDuration += e.actualDuration, e = e.sibling;
    }
    function Vu(t, e) {
      if (Uy === null) {
        var a = Uy = [];
        Ag = 0, gr = qm(), Qh = {
          status: "pending",
          value: void 0,
          then: function(c) {
            a.push(c);
          }
        };
      }
      return Ag++, e.then(j0, j0), e;
    }
    function j0() {
      if (--Ag === 0 && (-1 < Uu || (ao = -1.1), Uy !== null)) {
        Qh !== null && (Qh.status = "fulfilled");
        var t = Uy;
        Uy = null, gr = 0, Qh = null;
        for (var e = 0; e < t.length; e++) (0, t[e])();
      }
    }
    function rd(t, e) {
      var a = [], c = {
        status: "pending",
        value: null,
        reason: null,
        then: function(o) {
          a.push(o);
        }
      };
      return t.then(
        function() {
          c.status = "fulfilled", c.value = e;
          for (var o = 0; o < a.length; o++) (0, a[o])(e);
        },
        function(o) {
          for (c.status = "rejected", c.reason = o, o = 0; o < a.length; o++)
            (0, a[o])(void 0);
        }
      ), c;
    }
    function Zu() {
      var t = Sr.current;
      return t !== null ? t : re.pooledCache;
    }
    function Uo(t, e) {
      e === null ? Ot(Sr, Sr.current, t) : Ot(Sr, e.pool, t);
    }
    function G0() {
      var t = Zu();
      return t === null ? null : { parent: pl._currentValue, pool: t };
    }
    function dd() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function X0(t) {
      return t = t.status, t === "fulfilled" || t === "rejected";
    }
    function Da(t, e, a) {
      B.actQueue !== null && (B.didUsePromise = !0);
      var c = t.thenables;
      if (a = c[a], a === void 0 ? c.push(e) : a !== e && (t.didWarnAboutUncachedPromise || (t.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), e.then(Wa, Wa), e = a), e._debugInfo === void 0) {
        t = performance.now(), c = e.displayName;
        var o = {
          name: typeof c == "string" ? c : "Promise",
          start: t,
          end: t,
          value: e
        };
        e._debugInfo = [{ awaited: o }], e.status !== "fulfilled" && e.status !== "rejected" && (t = function() {
          o.end = performance.now();
        }, e.then(t, t));
      }
      switch (e.status) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw t = e.reason, ds(t), t;
        default:
          if (typeof e.status == "string")
            e.then(Wa, Wa);
          else {
            if (t = re, t !== null && 100 < t.shellSuspendCounter)
              throw Error(
                "An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            t = e, t.status = "pending", t.then(
              function(f) {
                if (e.status === "pending") {
                  var d = e;
                  d.status = "fulfilled", d.value = f;
                }
              },
              function(f) {
                if (e.status === "pending") {
                  var d = e;
                  d.status = "rejected", d.reason = f;
                }
              }
            );
          }
          switch (e.status) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw t = e.reason, ds(t), t;
          }
          throw Tr = e, qy = !0, Vh;
      }
    }
    function Oa(t) {
      try {
        return C3(t);
      } catch (e) {
        throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Tr = e, qy = !0, Vh) : e;
      }
    }
    function Ti() {
      if (Tr === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var t = Tr;
      return Tr = null, qy = !1, t;
    }
    function ds(t) {
      if (t === Vh || t === t1)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function Qe(t) {
      var e = zt;
      return t != null && (zt = e === null ? t : e.concat(t)), e;
    }
    function fa() {
      var t = zt;
      if (t != null) {
        for (var e = t.length - 1; 0 <= e; e--)
          if (t[e].name != null) {
            var a = t[e].debugTask;
            if (a != null) return a;
          }
      }
      return null;
    }
    function Wl(t, e, a) {
      for (var c = Object.keys(t.props), o = 0; o < c.length; o++) {
        var f = c[o];
        if (f !== "children" && f !== "key") {
          e === null && (e = Sc(t, a.mode, 0), e._debugInfo = zt, e.return = a), W(
            e,
            function(d) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                d
              );
            },
            f
          );
          break;
        }
      }
    }
    function En(t) {
      var e = Yy;
      return Yy += 1, Zh === null && (Zh = dd()), Da(Zh, t, e);
    }
    function sa(t, e) {
      e = e.props.ref, t.ref = e !== void 0 ? e : null;
    }
    function An(t, e) {
      throw e.$$typeof === Rv ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (t = Object.prototype.toString.call(e), Error(
        "Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function en(t, e) {
      var a = fa();
      a !== null ? a.run(
        An.bind(null, t, e)
      ) : An(t, e);
    }
    function Q0(t, e) {
      var a = et(t) || "Component";
      nS[a] || (nS[a] = !0, e = e.displayName || e.name || "Component", t.tag === 3 ? console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,
        e,
        e,
        e
      ) : console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,
        e,
        e,
        a,
        e,
        a
      ));
    }
    function _o(t, e) {
      var a = fa();
      a !== null ? a.run(
        Q0.bind(null, t, e)
      ) : Q0(t, e);
    }
    function hd(t, e) {
      var a = et(t) || "Component";
      uS[a] || (uS[a] = !0, e = String(e), t.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        e
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        a,
        e,
        a
      ));
    }
    function hs(t, e) {
      var a = fa();
      a !== null ? a.run(
        hd.bind(null, t, e)
      ) : hd(t, e);
    }
    function sl(t) {
      function e(g, b) {
        if (t) {
          var E = g.deletions;
          E === null ? (g.deletions = [b], g.flags |= 16) : E.push(b);
        }
      }
      function a(g, b) {
        if (!t) return null;
        for (; b !== null; )
          e(g, b), b = b.sibling;
        return null;
      }
      function c(g) {
        for (var b = /* @__PURE__ */ new Map(); g !== null; )
          g.key !== null ? b.set(g.key, g) : b.set(g.index, g), g = g.sibling;
        return b;
      }
      function o(g, b) {
        return g = Fn(g, b), g.index = 0, g.sibling = null, g;
      }
      function f(g, b, E) {
        return g.index = E, t ? (E = g.alternate, E !== null ? (E = E.index, E < b ? (g.flags |= 67108866, b) : E) : (g.flags |= 67108866, b)) : (g.flags |= 1048576, b);
      }
      function d(g) {
        return t && g.alternate === null && (g.flags |= 67108866), g;
      }
      function h(g, b, E, Y) {
        return b === null || b.tag !== 6 ? (b = Do(
          E,
          g.mode,
          Y
        ), b.return = g, b._debugOwner = g, b._debugTask = g._debugTask, b._debugInfo = zt, b) : (b = o(b, E), b.return = g, b._debugInfo = zt, b);
      }
      function y(g, b, E, Y) {
        var J = E.type;
        return J === rf ? (b = A(
          g,
          b,
          E.props.children,
          Y,
          E.key
        ), Wl(E, b, g), b) : b !== null && (b.elementType === J || _0(b, E) || typeof J == "object" && J !== null && J.$$typeof === Gl && Oa(J) === b.type) ? (b = o(b, E.props), sa(b, E), b.return = g, b._debugOwner = E._owner, b._debugInfo = zt, b) : (b = Sc(E, g.mode, Y), sa(b, E), b.return = g, b._debugInfo = zt, b);
      }
      function p(g, b, E, Y) {
        return b === null || b.tag !== 4 || b.stateNode.containerInfo !== E.containerInfo || b.stateNode.implementation !== E.implementation ? (b = ud(E, g.mode, Y), b.return = g, b._debugInfo = zt, b) : (b = o(b, E.children || []), b.return = g, b._debugInfo = zt, b);
      }
      function A(g, b, E, Y, J) {
        return b === null || b.tag !== 7 ? (b = yi(
          E,
          g.mode,
          Y,
          J
        ), b.return = g, b._debugOwner = g, b._debugTask = g._debugTask, b._debugInfo = zt, b) : (b = o(b, E), b.return = g, b._debugInfo = zt, b);
      }
      function D(g, b, E) {
        if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
          return b = Do(
            "" + b,
            g.mode,
            E
          ), b.return = g, b._debugOwner = g, b._debugTask = g._debugTask, b._debugInfo = zt, b;
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case cn:
              return E = Sc(
                b,
                g.mode,
                E
              ), sa(E, b), E.return = g, g = Qe(b._debugInfo), E._debugInfo = zt, zt = g, E;
            case wc:
              return b = ud(
                b,
                g.mode,
                E
              ), b.return = g, b._debugInfo = zt, b;
            case Gl:
              var Y = Qe(b._debugInfo);
              return b = Oa(b), g = D(g, b, E), zt = Y, g;
          }
          if (ke(b) || Ke(b))
            return E = yi(
              b,
              g.mode,
              E,
              null
            ), E.return = g, E._debugOwner = g, E._debugTask = g._debugTask, g = Qe(b._debugInfo), E._debugInfo = zt, zt = g, E;
          if (typeof b.then == "function")
            return Y = Qe(b._debugInfo), g = D(
              g,
              En(b),
              E
            ), zt = Y, g;
          if (b.$$typeof === xn)
            return D(
              g,
              fs(g, b),
              E
            );
          en(g, b);
        }
        return typeof b == "function" && _o(g, b), typeof b == "symbol" && hs(g, b), null;
      }
      function S(g, b, E, Y) {
        var J = b !== null ? b.key : null;
        if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
          return J !== null ? null : h(g, b, "" + E, Y);
        if (typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case cn:
              return E.key === J ? (J = Qe(E._debugInfo), g = y(
                g,
                b,
                E,
                Y
              ), zt = J, g) : null;
            case wc:
              return E.key === J ? p(g, b, E, Y) : null;
            case Gl:
              return J = Qe(E._debugInfo), E = Oa(E), g = S(
                g,
                b,
                E,
                Y
              ), zt = J, g;
          }
          if (ke(E) || Ke(E))
            return J !== null ? null : (J = Qe(E._debugInfo), g = A(
              g,
              b,
              E,
              Y,
              null
            ), zt = J, g);
          if (typeof E.then == "function")
            return J = Qe(E._debugInfo), g = S(
              g,
              b,
              En(E),
              Y
            ), zt = J, g;
          if (E.$$typeof === xn)
            return S(
              g,
              b,
              fs(g, E),
              Y
            );
          en(g, E);
        }
        return typeof E == "function" && _o(g, E), typeof E == "symbol" && hs(g, E), null;
      }
      function C(g, b, E, Y, J) {
        if (typeof Y == "string" && Y !== "" || typeof Y == "number" || typeof Y == "bigint")
          return g = g.get(E) || null, h(b, g, "" + Y, J);
        if (typeof Y == "object" && Y !== null) {
          switch (Y.$$typeof) {
            case cn:
              return E = g.get(
                Y.key === null ? E : Y.key
              ) || null, g = Qe(Y._debugInfo), b = y(
                b,
                E,
                Y,
                J
              ), zt = g, b;
            case wc:
              return g = g.get(
                Y.key === null ? E : Y.key
              ) || null, p(b, g, Y, J);
            case Gl:
              var pt = Qe(Y._debugInfo);
              return Y = Oa(Y), b = C(
                g,
                b,
                E,
                Y,
                J
              ), zt = pt, b;
          }
          if (ke(Y) || Ke(Y))
            return E = g.get(E) || null, g = Qe(Y._debugInfo), b = A(
              b,
              E,
              Y,
              J,
              null
            ), zt = g, b;
          if (typeof Y.then == "function")
            return pt = Qe(Y._debugInfo), b = C(
              g,
              b,
              E,
              En(Y),
              J
            ), zt = pt, b;
          if (Y.$$typeof === xn)
            return C(
              g,
              b,
              E,
              fs(b, Y),
              J
            );
          en(b, Y);
        }
        return typeof Y == "function" && _o(b, Y), typeof Y == "symbol" && hs(b, Y), null;
      }
      function w(g, b, E, Y) {
        if (typeof E != "object" || E === null) return Y;
        switch (E.$$typeof) {
          case cn:
          case wc:
            Zn(g, b, E);
            var J = E.key;
            if (typeof J != "string") break;
            if (Y === null) {
              Y = /* @__PURE__ */ new Set(), Y.add(J);
              break;
            }
            if (!Y.has(J)) {
              Y.add(J);
              break;
            }
            W(b, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                J
              );
            });
            break;
          case Gl:
            E = Oa(E), w(g, b, E, Y);
        }
        return Y;
      }
      function $(g, b, E, Y) {
        for (var J = null, pt = null, nt = null, P = b, Tt = b = 0, ze = null; P !== null && Tt < E.length; Tt++) {
          P.index > Tt ? (ze = P, P = null) : ze = P.sibling;
          var ul = S(
            g,
            P,
            E[Tt],
            Y
          );
          if (ul === null) {
            P === null && (P = ze);
            break;
          }
          J = w(
            g,
            ul,
            E[Tt],
            J
          ), t && P && ul.alternate === null && e(g, P), b = f(ul, b, Tt), nt === null ? pt = ul : nt.sibling = ul, nt = ul, P = ze;
        }
        if (Tt === E.length)
          return a(g, P), Nt && Sn(g, Tt), pt;
        if (P === null) {
          for (; Tt < E.length; Tt++)
            P = D(g, E[Tt], Y), P !== null && (J = w(
              g,
              P,
              E[Tt],
              J
            ), b = f(
              P,
              b,
              Tt
            ), nt === null ? pt = P : nt.sibling = P, nt = P);
          return Nt && Sn(g, Tt), pt;
        }
        for (P = c(P); Tt < E.length; Tt++)
          ze = C(
            P,
            g,
            Tt,
            E[Tt],
            Y
          ), ze !== null && (J = w(
            g,
            ze,
            E[Tt],
            J
          ), t && ze.alternate !== null && P.delete(
            ze.key === null ? Tt : ze.key
          ), b = f(
            ze,
            b,
            Tt
          ), nt === null ? pt = ze : nt.sibling = ze, nt = ze);
        return t && P.forEach(function(ro) {
          return e(g, ro);
        }), Nt && Sn(g, Tt), pt;
      }
      function pe(g, b, E, Y) {
        if (E == null)
          throw Error("An iterable object provided no iterator.");
        for (var J = null, pt = null, nt = b, P = b = 0, Tt = null, ze = null, ul = E.next(); nt !== null && !ul.done; P++, ul = E.next()) {
          nt.index > P ? (Tt = nt, nt = null) : Tt = nt.sibling;
          var ro = S(g, nt, ul.value, Y);
          if (ro === null) {
            nt === null && (nt = Tt);
            break;
          }
          ze = w(
            g,
            ro,
            ul.value,
            ze
          ), t && nt && ro.alternate === null && e(g, nt), b = f(ro, b, P), pt === null ? J = ro : pt.sibling = ro, pt = ro, nt = Tt;
        }
        if (ul.done)
          return a(g, nt), Nt && Sn(g, P), J;
        if (nt === null) {
          for (; !ul.done; P++, ul = E.next())
            nt = D(g, ul.value, Y), nt !== null && (ze = w(
              g,
              nt,
              ul.value,
              ze
            ), b = f(
              nt,
              b,
              P
            ), pt === null ? J = nt : pt.sibling = nt, pt = nt);
          return Nt && Sn(g, P), J;
        }
        for (nt = c(nt); !ul.done; P++, ul = E.next())
          Tt = C(
            nt,
            g,
            P,
            ul.value,
            Y
          ), Tt !== null && (ze = w(
            g,
            Tt,
            ul.value,
            ze
          ), t && Tt.alternate !== null && nt.delete(
            Tt.key === null ? P : Tt.key
          ), b = f(
            Tt,
            b,
            P
          ), pt === null ? J = Tt : pt.sibling = Tt, pt = Tt);
        return t && nt.forEach(function(e4) {
          return e(g, e4);
        }), Nt && Sn(g, P), J;
      }
      function Yt(g, b, E, Y) {
        if (typeof E == "object" && E !== null && E.type === rf && E.key === null && (Wl(E, null, g), E = E.props.children), typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case cn:
              var J = Qe(E._debugInfo);
              t: {
                for (var pt = E.key; b !== null; ) {
                  if (b.key === pt) {
                    if (pt = E.type, pt === rf) {
                      if (b.tag === 7) {
                        a(
                          g,
                          b.sibling
                        ), Y = o(
                          b,
                          E.props.children
                        ), Y.return = g, Y._debugOwner = E._owner, Y._debugInfo = zt, Wl(E, Y, g), g = Y;
                        break t;
                      }
                    } else if (b.elementType === pt || _0(
                      b,
                      E
                    ) || typeof pt == "object" && pt !== null && pt.$$typeof === Gl && Oa(pt) === b.type) {
                      a(
                        g,
                        b.sibling
                      ), Y = o(b, E.props), sa(Y, E), Y.return = g, Y._debugOwner = E._owner, Y._debugInfo = zt, g = Y;
                      break t;
                    }
                    a(g, b);
                    break;
                  } else e(g, b);
                  b = b.sibling;
                }
                E.type === rf ? (Y = yi(
                  E.props.children,
                  g.mode,
                  Y,
                  E.key
                ), Y.return = g, Y._debugOwner = g, Y._debugTask = g._debugTask, Y._debugInfo = zt, Wl(E, Y, g), g = Y) : (Y = Sc(
                  E,
                  g.mode,
                  Y
                ), sa(Y, E), Y.return = g, Y._debugInfo = zt, g = Y);
              }
              return g = d(g), zt = J, g;
            case wc:
              t: {
                for (J = E, E = J.key; b !== null; ) {
                  if (b.key === E)
                    if (b.tag === 4 && b.stateNode.containerInfo === J.containerInfo && b.stateNode.implementation === J.implementation) {
                      a(
                        g,
                        b.sibling
                      ), Y = o(
                        b,
                        J.children || []
                      ), Y.return = g, g = Y;
                      break t;
                    } else {
                      a(g, b);
                      break;
                    }
                  else e(g, b);
                  b = b.sibling;
                }
                Y = ud(
                  J,
                  g.mode,
                  Y
                ), Y.return = g, g = Y;
              }
              return d(g);
            case Gl:
              return J = Qe(E._debugInfo), E = Oa(E), g = Yt(
                g,
                b,
                E,
                Y
              ), zt = J, g;
          }
          if (ke(E))
            return J = Qe(E._debugInfo), g = $(
              g,
              b,
              E,
              Y
            ), zt = J, g;
          if (Ke(E)) {
            if (J = Qe(E._debugInfo), pt = Ke(E), typeof pt != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var nt = pt.call(E);
            return nt === E ? (g.tag !== 0 || Object.prototype.toString.call(g.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(nt) !== "[object Generator]") && (lS || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), lS = !0) : E.entries !== pt || Mg || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), Mg = !0), g = pe(
              g,
              b,
              nt,
              Y
            ), zt = J, g;
          }
          if (typeof E.then == "function")
            return J = Qe(E._debugInfo), g = Yt(
              g,
              b,
              En(E),
              Y
            ), zt = J, g;
          if (E.$$typeof === xn)
            return Yt(
              g,
              b,
              fs(g, E),
              Y
            );
          en(g, E);
        }
        return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (J = "" + E, b !== null && b.tag === 6 ? (a(
          g,
          b.sibling
        ), Y = o(b, J), Y.return = g, g = Y) : (a(g, b), Y = Do(
          J,
          g.mode,
          Y
        ), Y.return = g, Y._debugOwner = g, Y._debugTask = g._debugTask, Y._debugInfo = zt, g = Y), d(g)) : (typeof E == "function" && _o(g, E), typeof E == "symbol" && hs(g, E), a(g, b));
      }
      return function(g, b, E, Y) {
        var J = zt;
        zt = null;
        try {
          Yy = 0;
          var pt = Yt(
            g,
            b,
            E,
            Y
          );
          return Zh = null, pt;
        } catch (ze) {
          if (ze === Vh || ze === t1) throw ze;
          var nt = xt(29, ze, null, g.mode);
          nt.lanes = Y, nt.return = g;
          var P = nt._debugInfo = zt;
          if (nt._debugOwner = g._debugOwner, nt._debugTask = g._debugTask, P != null) {
            for (var Tt = P.length - 1; 0 <= Tt; Tt--)
              if (typeof P[Tt].stack == "string") {
                nt._debugOwner = P[Tt], nt._debugTask = P[Tt].debugTask;
                break;
              }
          }
          return nt;
        } finally {
          zt = J;
        }
      };
    }
    function ie(t, e) {
      var a = ke(t);
      return t = !a && typeof Ke(t) == "function", a || t ? (a = a ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        a,
        e,
        a
      ), !1) : !0;
    }
    function Ct(t) {
      t.updateQueue = {
        baseState: t.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function tu(t, e) {
      t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        callbacks: null
      });
    }
    function Pe(t) {
      return {
        lane: t,
        tag: iS,
        payload: null,
        callback: null,
        next: null
      };
    }
    function eu(t, e, a) {
      var c = t.updateQueue;
      if (c === null) return null;
      if (c = c.shared, Ug === c && !sS) {
        var o = et(t);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          o
        ), sS = !0;
      }
      return (Xt & Cl) !== Zl ? (o = c.pending, o === null ? e.next = e : (e.next = o.next, o.next = e), c.pending = e, e = cs(t), U0(t, null, a), e) : (zo(t, c, e, a), cs(t));
    }
    function ln(t, e, a) {
      if (e = e.updateQueue, e !== null && (e = e.shared, (a & 4194048) !== 0)) {
        var c = e.lanes;
        c &= t.pendingLanes, a |= c, e.lanes = a, fp(t, a);
      }
    }
    function ms(t, e) {
      var a = t.updateQueue, c = t.alternate;
      if (c !== null && (c = c.updateQueue, a === c)) {
        var o = null, f = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var d = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            f === null ? o = f = d : f = f.next = d, a = a.next;
          } while (a !== null);
          f === null ? o = f = e : f = f.next = e;
        } else o = f = e;
        a = {
          baseState: c.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: f,
          shared: c.shared,
          callbacks: c.callbacks
        }, t.updateQueue = a;
        return;
      }
      t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = e : t.next = e, a.lastBaseUpdate = e;
    }
    function Co() {
      if (_g) {
        var t = Qh;
        if (t !== null) throw t;
      }
    }
    function lu(t, e, a, c) {
      _g = !1;
      var o = t.updateQueue;
      Hf = !1, Ug = o.shared;
      var f = o.firstBaseUpdate, d = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var y = h, p = y.next;
        y.next = null, d === null ? f = p : d.next = p, d = y;
        var A = t.alternate;
        A !== null && (A = A.updateQueue, h = A.lastBaseUpdate, h !== d && (h === null ? A.firstBaseUpdate = p : h.next = p, A.lastBaseUpdate = y));
      }
      if (f !== null) {
        var D = o.baseState;
        d = 0, A = p = y = null, h = f;
        do {
          var S = h.lane & -536870913, C = S !== h.lane;
          if (C ? (Dt & S) === S : (c & S) === S) {
            S !== 0 && S === gr && (_g = !0), A !== null && (A = A.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            t: {
              S = t;
              var w = h, $ = e, pe = a;
              switch (w.tag) {
                case oS:
                  if (w = w.payload, typeof w == "function") {
                    Gh = !0;
                    var Yt = w.call(
                      pe,
                      D,
                      $
                    );
                    if (S.mode & va) {
                      ce(!0);
                      try {
                        w.call(pe, D, $);
                      } finally {
                        ce(!1);
                      }
                    }
                    Gh = !1, D = Yt;
                    break t;
                  }
                  D = w;
                  break t;
                case Rg:
                  S.flags = S.flags & -65537 | 128;
                case iS:
                  if (Yt = w.payload, typeof Yt == "function") {
                    if (Gh = !0, w = Yt.call(
                      pe,
                      D,
                      $
                    ), S.mode & va) {
                      ce(!0);
                      try {
                        Yt.call(pe, D, $);
                      } finally {
                        ce(!1);
                      }
                    }
                    Gh = !1;
                  } else w = Yt;
                  if (w == null) break t;
                  D = Et({}, D, w);
                  break t;
                case fS:
                  Hf = !0;
              }
            }
            S = h.callback, S !== null && (t.flags |= 64, C && (t.flags |= 8192), C = o.callbacks, C === null ? o.callbacks = [S] : C.push(S));
          } else
            C = {
              lane: S,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, A === null ? (p = A = C, y = D) : A = A.next = C, d |= S;
          if (h = h.next, h === null) {
            if (h = o.shared.pending, h === null)
              break;
            C = h, h = C.next, C.next = null, o.lastBaseUpdate = C, o.shared.pending = null;
          }
        } while (!0);
        A === null && (y = D), o.baseState = y, o.firstBaseUpdate = p, o.lastBaseUpdate = A, f === null && (o.shared.lanes = 0), xf |= d, t.lanes = d, t.memoizedState = D;
      }
      Ug = null;
    }
    function zc(t, e) {
      if (typeof t != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + t
        );
      t.call(e);
    }
    function V0(t, e) {
      var a = t.shared.hiddenCallbacks;
      if (a !== null)
        for (t.shared.hiddenCallbacks = null, t = 0; t < a.length; t++)
          zc(a[t], e);
    }
    function Ho(t, e) {
      var a = t.callbacks;
      if (a !== null)
        for (t.callbacks = null, t = 0; t < a.length; t++)
          zc(a[t], e);
    }
    function md(t, e) {
      var a = Pc;
      Ot(l1, a, t), Ot(Lh, e, t), Pc = a | e.baseLanes;
    }
    function Lu(t) {
      Ot(l1, Pc, t), Ot(
        Lh,
        Lh.current,
        t
      );
    }
    function zn(t) {
      Pc = l1.current, _t(Lh, t), _t(l1, t);
    }
    function kl(t) {
      var e = t.alternate;
      Ot(
        nl,
        nl.current & wh,
        t
      ), Ot(Gn, t, t), _u === null && (e === null || Lh.current !== null || e.memoizedState !== null) && (_u = t);
    }
    function Dn(t) {
      Ot(nl, nl.current, t), Ot(Gn, t, t), _u === null && (_u = t);
    }
    function yd(t) {
      t.tag === 22 ? (Ot(nl, nl.current, t), Ot(Gn, t, t), _u === null && (_u = t)) : au(t);
    }
    function au(t) {
      Ot(nl, nl.current, t), Ot(
        Gn,
        Gn.current,
        t
      );
    }
    function rl(t) {
      _t(Gn, t), _u === t && (_u = null), _t(nl, t);
    }
    function Ei(t) {
      for (var e = t; e !== null; ) {
        if (e.tag === 13) {
          var a = e.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || ks(a) || Gm(a)))
            return e;
        } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
          if ((e.flags & 128) !== 0) return e;
        } else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return null;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      return null;
    }
    function mt() {
      var t = H;
      Hu === null ? Hu = [t] : Hu.push(t);
    }
    function V() {
      var t = H;
      if (Hu !== null && (co++, Hu[co] !== t)) {
        var e = et(yt);
        if (!rS.has(e) && (rS.add(e), Hu !== null)) {
          for (var a = "", c = 0; c <= co; c++) {
            var o = Hu[c], f = c === co ? t : o;
            for (o = c + 1 + ". " + o; 30 > o.length; )
              o += " ";
            o += f + `
`, a += o;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            e,
            a
          );
        }
      }
    }
    function wu(t) {
      t == null || ke(t) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        H,
        typeof t
      );
    }
    function ys() {
      var t = et(yt);
      hS.has(t) || (hS.add(t), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        t
      ));
    }
    function Be() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function Z0(t, e) {
      if (Xy) return !1;
      if (e === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          H
        ), !1;
      t.length !== e.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        H,
        "[" + e.join(", ") + "]",
        "[" + t.join(", ") + "]"
      );
      for (var a = 0; a < e.length && a < t.length; a++)
        if (!Ga(t[a], e[a])) return !1;
      return !0;
    }
    function L0(t, e, a, c, o, f) {
      no = f, yt = e, Hu = t !== null ? t._debugHookTypes : null, co = -1, Xy = t !== null && t.type !== e.type, (Object.prototype.toString.call(a) === "[object AsyncFunction]" || Object.prototype.toString.call(a) === "[object AsyncGeneratorFunction]") && (f = et(yt), Cg.has(f) || (Cg.add(f), console.error(
        "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
        f === null ? "An unknown Component" : "<" + f + ">"
      ))), e.memoizedState = null, e.updateQueue = null, e.lanes = 0, B.H = t !== null && t.memoizedState !== null ? Bg : Hu !== null ? mS : Hg, Ar = f = (e.mode & va) !== dt;
      var d = zg(a, c, o);
      if (Ar = !1, Kh && (d = ps(
        e,
        a,
        c,
        o
      )), f) {
        ce(!0);
        try {
          d = ps(
            e,
            a,
            c,
            o
          );
        } finally {
          ce(!1);
        }
      }
      return Ve(t, e), d;
    }
    function Ve(t, e) {
      e._debugHookTypes = Hu, e.dependencies === null ? uo !== null && (e.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: uo
      }) : e.dependencies._debugThenableState = uo, B.H = Qy;
      var a = se !== null && se.next !== null;
      if (no = 0, Hu = H = gl = se = yt = null, co = -1, t !== null && (t.flags & 65011712) !== (e.flags & 65011712) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), n1 = !1, Gy = 0, uo = null, a)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      t === null || Sl || (t = t.dependencies, t !== null && Mo(t) && (Sl = !0)), qy ? (qy = !1, t = !0) : t = !1, t && (e = et(e) || "Unknown", dS.has(e) || Cg.has(e) || (dS.add(e), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function ps(t, e, a, c) {
      yt = t;
      var o = 0;
      do {
        if (Kh && (uo = null), Gy = 0, Kh = !1, o >= B3)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (o += 1, Xy = !1, gl = se = null, t.updateQueue != null) {
          var f = t.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        co = -1, B.H = yS, f = zg(e, a, c);
      } while (Kh);
      return f;
    }
    function vs() {
      var t = B.H, e = t.useState()[0];
      return e = typeof e.then == "function" ? bs(e) : e, t = t.useState()[0], (se !== null ? se.memoizedState : null) !== t && (yt.flags |= 1024), e;
    }
    function Ai() {
      var t = u1 !== 0;
      return u1 = 0, t;
    }
    function gs(t, e, a) {
      e.updateQueue = t.updateQueue, e.flags = (e.mode & cc) !== dt ? e.flags & -402655237 : e.flags & -2053, t.lanes &= ~a;
    }
    function Dc(t) {
      if (n1) {
        for (t = t.memoizedState; t !== null; ) {
          var e = t.queue;
          e !== null && (e.pending = null), t = t.next;
        }
        n1 = !1;
      }
      no = 0, Hu = gl = se = yt = null, co = -1, H = null, Kh = !1, Gy = u1 = 0, uo = null;
    }
    function $e() {
      var t = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return gl === null ? yt.memoizedState = gl = t : gl = gl.next = t, gl;
    }
    function Kt() {
      if (se === null) {
        var t = yt.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = se.next;
      var e = gl === null ? yt.memoizedState : gl.next;
      if (e !== null)
        gl = e, se = t;
      else {
        if (t === null)
          throw yt.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        se = t, t = {
          memoizedState: se.memoizedState,
          baseState: se.baseState,
          baseQueue: se.baseQueue,
          queue: se.queue,
          next: null
        }, gl === null ? yt.memoizedState = gl = t : gl = gl.next = t;
      }
      return gl;
    }
    function Ss() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function bs(t) {
      var e = Gy;
      return Gy += 1, uo === null && (uo = dd()), t = Da(uo, t, e), e = yt, (gl === null ? e.memoizedState : gl.next) === null && (e = e.alternate, B.H = e !== null && e.memoizedState !== null ? Bg : Hg), t;
    }
    function Ju(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return bs(t);
        if (t.$$typeof === xn) return Zt(t);
      }
      throw Error("An unsupported type was passed to use(): " + String(t));
    }
    function Ma(t) {
      var e = null, a = yt.updateQueue;
      if (a !== null && (e = a.memoCache), e == null) {
        var c = yt.alternate;
        c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (e = {
          data: c.data.map(function(o) {
            return o.slice();
          }),
          index: 0
        })));
      }
      if (e == null && (e = { data: [], index: 0 }), a === null && (a = Ss(), yt.updateQueue = a), a.memoCache = e, a = e.data[e.index], a === void 0 || Xy)
        for (a = e.data[e.index] = Array(t), c = 0; c < t; c++)
          a[c] = F1;
      else
        a.length !== t && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          a.length,
          t
        );
      return e.index++, a;
    }
    function Ra(t, e) {
      return typeof e == "function" ? e(t) : e;
    }
    function Bo(t, e, a) {
      var c = $e();
      if (a !== void 0) {
        var o = a(e);
        if (Ar) {
          ce(!0);
          try {
            a(e);
          } finally {
            ce(!1);
          }
        }
      } else o = e;
      return c.memoizedState = c.baseState = o, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: o
      }, c.queue = t, t = t.dispatch = J1.bind(
        null,
        yt,
        t
      ), [c.memoizedState, t];
    }
    function zi(t) {
      var e = Kt();
      return Oc(e, se, t);
    }
    function Oc(t, e, a) {
      var c = t.queue;
      if (c === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      c.lastRenderedReducer = a;
      var o = t.baseQueue, f = c.pending;
      if (f !== null) {
        if (o !== null) {
          var d = o.next;
          o.next = f.next, f.next = d;
        }
        e.baseQueue !== o && console.error(
          "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
        ), e.baseQueue = o = f, c.pending = null;
      }
      if (f = t.baseState, o === null) t.memoizedState = f;
      else {
        e = o.next;
        var h = d = null, y = null, p = e, A = !1;
        do {
          var D = p.lane & -536870913;
          if (D !== p.lane ? (Dt & D) === D : (no & D) === D) {
            var S = p.revertLane;
            if (S === 0)
              y !== null && (y = y.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: p.action,
                hasEagerState: p.hasEagerState,
                eagerState: p.eagerState,
                next: null
              }), D === gr && (A = !0);
            else if ((no & S) === S) {
              p = p.next, S === gr && (A = !0);
              continue;
            } else
              D = {
                lane: 0,
                revertLane: p.revertLane,
                gesture: null,
                action: p.action,
                hasEagerState: p.hasEagerState,
                eagerState: p.eagerState,
                next: null
              }, y === null ? (h = y = D, d = f) : y = y.next = D, yt.lanes |= S, xf |= S;
            D = p.action, Ar && a(f, D), f = p.hasEagerState ? p.eagerState : a(f, D);
          } else
            S = {
              lane: D,
              revertLane: p.revertLane,
              gesture: p.gesture,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }, y === null ? (h = y = S, d = f) : y = y.next = S, yt.lanes |= D, xf |= D;
          p = p.next;
        } while (p !== null && p !== e);
        if (y === null ? d = f : y.next = h, !Ga(f, t.memoizedState) && (Sl = !0, A && (a = Qh, a !== null)))
          throw a;
        t.memoizedState = f, t.baseState = d, t.baseQueue = y, c.lastRenderedState = f;
      }
      return o === null && (c.lanes = 0), [t.memoizedState, c.dispatch];
    }
    function Di(t) {
      var e = Kt(), a = e.queue;
      if (a === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      a.lastRenderedReducer = t;
      var c = a.dispatch, o = a.pending, f = e.memoizedState;
      if (o !== null) {
        a.pending = null;
        var d = o = o.next;
        do
          f = t(f, d.action), d = d.next;
        while (d !== o);
        Ga(f, e.memoizedState) || (Sl = !0), e.memoizedState = f, e.baseQueue === null && (e.baseState = f), a.lastRenderedState = f;
      }
      return [f, c];
    }
    function No(t, e, a) {
      var c = yt, o = $e();
      if (Nt) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var f = a();
        Jh || f === a() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), Jh = !0);
      } else {
        if (f = e(), Jh || (a = e(), Ga(f, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Jh = !0)), re === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        (Dt & 127) !== 0 || w0(c, e, f);
      }
      return o.memoizedState = f, a = { value: f, getSnapshot: e }, o.queue = a, Ri(
        Mc.bind(null, c, a, t),
        [t]
      ), c.flags |= 2048, nu(
        Cu | Va,
        { destroy: void 0 },
        J0.bind(
          null,
          c,
          a,
          f,
          e
        ),
        null
      ), f;
    }
    function Oi(t, e, a) {
      var c = yt, o = Kt(), f = Nt;
      if (f) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        a = a();
      } else if (a = e(), !Jh) {
        var d = e();
        Ga(a, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Jh = !0);
      }
      (d = !Ga(
        (se || o).memoizedState,
        a
      )) && (o.memoizedState = a, Sl = !0), o = o.queue;
      var h = Mc.bind(null, c, o, t);
      if (tl(2048, Va, h, [t]), o.getSnapshot !== e || d || gl !== null && gl.memoizedState.tag & Cu) {
        if (c.flags |= 2048, nu(
          Cu | Va,
          { destroy: void 0 },
          J0.bind(
            null,
            c,
            o,
            a,
            e
          ),
          null
        ), re === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        f || (no & 127) !== 0 || w0(c, e, a);
      }
      return a;
    }
    function w0(t, e, a) {
      t.flags |= 16384, t = { getSnapshot: e, value: a }, e = yt.updateQueue, e === null ? (e = Ss(), yt.updateQueue = e, e.stores = [t]) : (a = e.stores, a === null ? e.stores = [t] : a.push(t));
    }
    function J0(t, e, a, c) {
      e.value = a, e.getSnapshot = c, Rc(e) && K0(t);
    }
    function Mc(t, e, a) {
      return a(function() {
        Rc(e) && (In(2, "updateSyncExternalStore()", t), K0(t));
      });
    }
    function Rc(t) {
      var e = t.getSnapshot;
      t = t.value;
      try {
        var a = e();
        return !Ga(t, a);
      } catch {
        return !0;
      }
    }
    function K0(t) {
      var e = ql(t, 2);
      e !== null && ht(e, t, 2);
    }
    function pd(t) {
      var e = $e();
      if (typeof t == "function") {
        var a = t;
        if (t = a(), Ar) {
          ce(!0);
          try {
            a();
          } finally {
            ce(!1);
          }
        }
      }
      return e.memoizedState = e.baseState = t, e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ra,
        lastRenderedState: t
      }, e;
    }
    function Uc(t) {
      t = pd(t);
      var e = t.queue, a = Ed.bind(null, yt, e);
      return e.dispatch = a, [t.memoizedState, a];
    }
    function Mi(t) {
      var e = $e();
      e.memoizedState = e.baseState = t;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = a, e = Ms.bind(
        null,
        yt,
        !0,
        a
      ), a.dispatch = e, [t, e];
    }
    function Ts(t, e) {
      var a = Kt();
      return xo(a, se, t, e);
    }
    function xo(t, e, a, c) {
      return t.baseState = a, Oc(
        t,
        se,
        typeof c == "function" ? c : Ra
      );
    }
    function Es(t, e) {
      var a = Kt();
      return se !== null ? xo(a, se, t, e) : (a.baseState = t, [t, a.queue.dispatch]);
    }
    function Bp(t, e, a, c, o) {
      if (dl(t))
        throw Error("Cannot update form state while rendering.");
      if (t = e.action, t !== null) {
        var f = {
          payload: o,
          action: t,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(d) {
            f.listeners.push(d);
          }
        };
        B.T !== null ? a(!0) : f.isTransition = !1, c(f), a = e.pending, a === null ? (f.next = e.pending = f, _c(e, f)) : (f.next = a.next, e.pending = a.next = f);
      }
    }
    function _c(t, e) {
      var a = e.action, c = e.payload, o = t.state;
      if (e.isTransition) {
        var f = B.T, d = {};
        d._updatedFibers = /* @__PURE__ */ new Set(), B.T = d;
        try {
          var h = a(o, c), y = B.S;
          y !== null && y(d, h), $0(t, e, h);
        } catch (p) {
          As(t, e, p);
        } finally {
          f !== null && d.types !== null && (f.types !== null && f.types !== d.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), f.types = d.types), B.T = f, f === null && d._updatedFibers && (t = d._updatedFibers.size, d._updatedFibers.clear(), 10 < t && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = a(o, c), $0(t, e, d);
        } catch (p) {
          As(t, e, p);
        }
    }
    function $0(t, e, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? (B.asyncTransitions++, a.then(Ui, Ui), a.then(
        function(c) {
          Ku(t, e, c);
        },
        function(c) {
          return As(t, e, c);
        }
      ), e.isTransition || console.error(
        "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
      )) : Ku(t, e, a);
    }
    function Ku(t, e, a) {
      e.status = "fulfilled", e.value = a, vd(e), t.state = a, e = t.pending, e !== null && (a = e.next, a === e ? t.pending = null : (a = a.next, e.next = a, _c(t, a)));
    }
    function As(t, e, a) {
      var c = t.pending;
      if (t.pending = null, c !== null) {
        c = c.next;
        do
          e.status = "rejected", e.reason = a, vd(e), e = e.next;
        while (e !== c);
      }
      t.action = null;
    }
    function vd(t) {
      t = t.listeners;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
    function $u(t, e) {
      return e;
    }
    function Ua(t, e) {
      if (Nt) {
        var a = re.formState;
        if (a !== null) {
          t: {
            var c = yt;
            if (Nt) {
              if (Ae) {
                e: {
                  for (var o = Ae, f = Ru; o.nodeType !== 8; ) {
                    if (!f) {
                      o = null;
                      break e;
                    }
                    if (o = xa(
                      o.nextSibling
                    ), o === null) {
                      o = null;
                      break e;
                    }
                  }
                  f = o.data, o = f === l2 || f === tb ? o : null;
                }
                if (o) {
                  Ae = xa(
                    o.nextSibling
                  ), c = o.data === l2;
                  break t;
                }
              }
              Fa(c);
            }
            c = !1;
          }
          c && (e = a[0]);
        }
      }
      return a = $e(), a.memoizedState = a.baseState = e, c = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $u,
        lastRenderedState: e
      }, a.queue = c, a = Ed.bind(
        null,
        yt,
        c
      ), c.dispatch = a, c = pd(!1), f = Ms.bind(
        null,
        yt,
        !1,
        c.queue
      ), c = $e(), o = {
        state: e,
        dispatch: null,
        action: t,
        pending: null
      }, c.queue = o, a = Bp.bind(
        null,
        yt,
        o,
        f,
        a
      ), o.dispatch = a, c.memoizedState = t, [e, a, !1];
    }
    function Cc(t) {
      var e = Kt();
      return gd(e, se, t);
    }
    function gd(t, e, a) {
      if (e = Oc(
        t,
        e,
        $u
      )[0], t = zi(Ra)[0], typeof e == "object" && e !== null && typeof e.then == "function")
        try {
          var c = bs(e);
        } catch (d) {
          throw d === Vh ? t1 : d;
        }
      else c = e;
      e = Kt();
      var o = e.queue, f = o.dispatch;
      return a !== e.memoizedState && (yt.flags |= 2048, nu(
        Cu | Va,
        { destroy: void 0 },
        W0.bind(null, o, a),
        null
      )), [c, f, t];
    }
    function W0(t, e) {
      t.action = e;
    }
    function Hc(t) {
      var e = Kt(), a = se;
      if (a !== null)
        return gd(e, a, t);
      Kt(), e = e.memoizedState, a = Kt();
      var c = a.queue.dispatch;
      return a.memoizedState = t, [e, c, !1];
    }
    function nu(t, e, a, c) {
      return t = { tag: t, create: a, deps: c, inst: e, next: null }, e = yt.updateQueue, e === null && (e = Ss(), yt.updateQueue = e), a = e.lastEffect, a === null ? e.lastEffect = t.next = t : (c = a.next, a.next = t, t.next = c, e.lastEffect = t), t;
    }
    function Sd(t) {
      var e = $e();
      return t = { current: t }, e.memoizedState = t;
    }
    function Bc(t, e, a, c) {
      var o = $e();
      yt.flags |= t, o.memoizedState = nu(
        Cu | e,
        { destroy: void 0 },
        a,
        c === void 0 ? null : c
      );
    }
    function tl(t, e, a, c) {
      var o = Kt();
      c = c === void 0 ? null : c;
      var f = o.memoizedState.inst;
      se !== null && c !== null && Z0(c, se.memoizedState.deps) ? o.memoizedState = nu(e, f, a, c) : (yt.flags |= t, o.memoizedState = nu(
        Cu | e,
        f,
        a,
        c
      ));
    }
    function Ri(t, e) {
      (yt.mode & cc) !== dt ? Bc(276826112, Va, t, e) : Bc(8390656, Va, t, e);
    }
    function Np(t) {
      yt.flags |= 4;
      var e = yt.updateQueue;
      if (e === null)
        e = Ss(), yt.updateQueue = e, e.events = [t];
      else {
        var a = e.events;
        a === null ? e.events = [t] : a.push(t);
      }
    }
    function zs(t) {
      var e = $e(), a = { impl: t };
      return e.memoizedState = a, function() {
        if ((Xt & Cl) !== Zl)
          throw Error(
            "A function wrapped in useEffectEvent can't be called during rendering."
          );
        return a.impl.apply(void 0, arguments);
      };
    }
    function qo(t) {
      var e = Kt().memoizedState;
      return Np({ ref: e, nextImpl: t }), function() {
        if ((Xt & Cl) !== Zl)
          throw Error(
            "A function wrapped in useEffectEvent can't be called during rendering."
          );
        return e.impl.apply(void 0, arguments);
      };
    }
    function Fl(t, e) {
      var a = 4194308;
      return (yt.mode & cc) !== dt && (a |= 134217728), Bc(a, Xn, t, e);
    }
    function _a(t, e) {
      if (typeof e == "function") {
        t = t();
        var a = e(t);
        return function() {
          typeof a == "function" ? a() : e(null);
        };
      }
      if (e != null)
        return e.hasOwnProperty("current") || console.error(
          "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
          "an object with keys {" + Object.keys(e).join(", ") + "}"
        ), t = t(), e.current = t, function() {
          e.current = null;
        };
    }
    function uu(t, e, a) {
      typeof e != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        e !== null ? typeof e : "null"
      ), a = a != null ? a.concat([t]) : null;
      var c = 4194308;
      (yt.mode & cc) !== dt && (c |= 134217728), Bc(
        c,
        Xn,
        _a.bind(null, e, t),
        a
      );
    }
    function Yo(t, e, a) {
      typeof e != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        e !== null ? typeof e : "null"
      ), a = a != null ? a.concat([t]) : null, tl(
        4,
        Xn,
        _a.bind(null, e, t),
        a
      );
    }
    function bd(t, e) {
      return $e().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    }
    function On(t, e) {
      var a = Kt();
      e = e === void 0 ? null : e;
      var c = a.memoizedState;
      return e !== null && Z0(e, c[1]) ? c[0] : (a.memoizedState = [t, e], t);
    }
    function Il(t, e) {
      var a = $e();
      e = e === void 0 ? null : e;
      var c = t();
      if (Ar) {
        ce(!0);
        try {
          t();
        } finally {
          ce(!1);
        }
      }
      return a.memoizedState = [c, e], c;
    }
    function Se(t, e) {
      var a = Kt();
      e = e === void 0 ? null : e;
      var c = a.memoizedState;
      if (e !== null && Z0(e, c[1]))
        return c[0];
      if (c = t(), Ar) {
        ce(!0);
        try {
          t();
        } finally {
          ce(!1);
        }
      }
      return a.memoizedState = [c, e], c;
    }
    function jo(t, e) {
      var a = $e();
      return $t(a, t, e);
    }
    function cu(t, e) {
      var a = Kt();
      return Ze(
        a,
        se.memoizedState,
        t,
        e
      );
    }
    function gt(t, e) {
      var a = Kt();
      return se === null ? $t(a, t, e) : Ze(
        a,
        se.memoizedState,
        t,
        e
      );
    }
    function $t(t, e, a) {
      return a === void 0 || (no & 1073741824) !== 0 && (Dt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = a, t = Jo(), yt.lanes |= t, xf |= t, a);
    }
    function Ze(t, e, a, c) {
      return Ga(a, e) ? a : Lh.current !== null ? (t = $t(t, a, c), Ga(t, e) || (Sl = !0), t) : (no & 42) === 0 || (no & 1073741824) !== 0 && (Dt & 261930) === 0 ? (Sl = !0, t.memoizedState = a) : (t = Jo(), yt.lanes |= t, xf |= t, e);
    }
    function Ui() {
      B.asyncTransitions--;
    }
    function _i(t, e, a, c, o) {
      var f = wt.p;
      wt.p = f !== 0 && f < Ul ? f : Ul;
      var d = B.T, h = {};
      h._updatedFibers = /* @__PURE__ */ new Set(), B.T = h, Ms(t, !1, e, a);
      try {
        var y = o(), p = B.S;
        if (p !== null && p(h, y), y !== null && typeof y == "object" && typeof y.then == "function") {
          B.asyncTransitions++, y.then(Ui, Ui);
          var A = rd(
            y,
            c
          );
          Ci(
            t,
            e,
            A,
            jl(t)
          );
        } else
          Ci(
            t,
            e,
            c,
            jl(t)
          );
      } catch (D) {
        Ci(
          t,
          e,
          { then: function() {
          }, status: "rejected", reason: D },
          jl(t)
        );
      } finally {
        wt.p = f, d !== null && h.types !== null && (d.types !== null && d.types !== h.types && console.error(
          "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
        ), d.types = h.types), B.T = d, d === null && h._updatedFibers && (t = h._updatedFibers.size, h._updatedFibers.clear(), 10 < t && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function Wu(t, e, a, c) {
      if (t.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var o = Ds(t).queue;
      Cp(t), _i(
        t,
        o,
        e,
        Nr,
        a === null ? Hl : function() {
          return Go(t), a(c);
        }
      );
    }
    function Ds(t) {
      var e = t.memoizedState;
      if (e !== null) return e;
      e = {
        memoizedState: Nr,
        baseState: Nr,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ra,
          lastRenderedState: Nr
        },
        next: null
      };
      var a = {};
      return e.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ra,
          lastRenderedState: a
        },
        next: null
      }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
    }
    function Go(t) {
      B.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var e = Ds(t);
      e.next === null && (e = t.alternate.memoizedState), Ci(
        t,
        e.next.queue,
        {},
        jl(t)
      );
    }
    function Nc() {
      var t = pd(!1);
      return t = _i.bind(
        null,
        yt,
        t.queue,
        !0,
        !1
      ), $e().memoizedState = t, [!1, t];
    }
    function xp() {
      var t = zi(Ra)[0], e = Kt().memoizedState;
      return [
        typeof t == "boolean" ? t : bs(t),
        e
      ];
    }
    function Me() {
      var t = Di(Ra)[0], e = Kt().memoizedState;
      return [
        typeof t == "boolean" ? t : bs(t),
        e
      ];
    }
    function ku() {
      return Zt(lp);
    }
    function Os() {
      var t = $e(), e = re.identifierPrefix;
      if (Nt) {
        var a = Pi, c = Ii;
        a = (c & ~(1 << 32 - Rl(c) - 1)).toString(32) + a, e = "_" + e + "R_" + a, a = u1++, 0 < a && (e += "H" + a.toString(32)), e += "_";
      } else
        a = H3++, e = "_" + e + "r_" + a.toString(32) + "_";
      return t.memoizedState = e;
    }
    function Td() {
      return $e().memoizedState = qp.bind(
        null,
        yt
      );
    }
    function qp(t, e) {
      for (var a = t.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var c = jl(a), o = Pe(c), f = eu(a, o, c);
            f !== null && (In(c, "refresh()", t), ht(f, a, c), ln(f, a, c)), t = fd(), e != null && f !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), o.payload = { cache: t };
            return;
        }
        a = a.return;
      }
    }
    function J1(t, e, a) {
      var c = arguments;
      typeof c[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), c = jl(t);
      var o = {
        lane: c,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      dl(t) ? Ne(e, o) : (o = di(t, e, o, c), o !== null && (In(c, "dispatch()", t), ht(o, t, c), Rs(o, e, c)));
    }
    function Ed(t, e, a) {
      var c = arguments;
      typeof c[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), c = jl(t), Ci(t, e, a, c) && In(c, "setState()", t);
    }
    function Ci(t, e, a, c) {
      var o = {
        lane: c,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (dl(t)) Ne(e, o);
      else {
        var f = t.alternate;
        if (t.lanes === 0 && (f === null || f.lanes === 0) && (f = e.lastRenderedReducer, f !== null)) {
          var d = B.H;
          B.H = oc;
          try {
            var h = e.lastRenderedState, y = f(h, a);
            if (o.hasEagerState = !0, o.eagerState = y, Ga(y, h))
              return zo(t, e, o, 0), re === null && ad(), !1;
          } catch {
          } finally {
            B.H = d;
          }
        }
        if (a = di(t, e, o, c), a !== null)
          return ht(a, t, c), Rs(a, e, c), !0;
      }
      return !1;
    }
    function Ms(t, e, a, c) {
      if (B.T === null && gr === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), c = {
        lane: 2,
        revertLane: qm(),
        gesture: null,
        action: c,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, dl(t)) {
        if (e)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        e = di(
          t,
          a,
          c,
          2
        ), e !== null && (In(2, "setOptimistic()", t), ht(e, t, 2));
    }
    function dl(t) {
      var e = t.alternate;
      return t === yt || e !== null && e === yt;
    }
    function Ne(t, e) {
      Kh = n1 = !0;
      var a = t.pending;
      a === null ? e.next = e : (e.next = a.next, a.next = e), t.pending = e;
    }
    function Rs(t, e, a) {
      if ((a & 4194048) !== 0) {
        var c = e.lanes;
        c &= t.pendingLanes, a |= c, e.lanes = a, fp(t, a);
      }
    }
    function Hi(t) {
      if (t !== null && typeof t != "function") {
        var e = String(t);
        OS.has(e) || (OS.add(e), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          t
        ));
      }
    }
    function Xo(t, e, a, c) {
      var o = t.memoizedState, f = a(c, o);
      if (t.mode & va) {
        ce(!0);
        try {
          f = a(c, o);
        } finally {
          ce(!1);
        }
      }
      f === void 0 && (e = Bt(e) || "Component", ES.has(e) || (ES.add(e), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        e
      ))), o = f == null ? o : Et({}, o, f), t.memoizedState = o, t.lanes === 0 && (t.updateQueue.baseState = o);
    }
    function Ad(t, e, a, c, o, f, d) {
      var h = t.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (a = h.shouldComponentUpdate(
          c,
          f,
          d
        ), t.mode & va) {
          ce(!0);
          try {
            a = h.shouldComponentUpdate(
              c,
              f,
              d
            );
          } finally {
            ce(!1);
          }
        }
        return a === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          Bt(e) || "Component"
        ), a;
      }
      return e.prototype && e.prototype.isPureReactComponent ? !Ao(a, c) || !Ao(o, f) : !0;
    }
    function iu(t, e, a, c) {
      var o = e.state;
      typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(a, c), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(a, c), e.state !== o && (t = et(t) || "Component", vS.has(t) || (vS.add(t), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        t
      )), Ng.enqueueReplaceState(
        e,
        e.state,
        null
      ));
    }
    function ou(t, e) {
      var a = e;
      if ("ref" in e) {
        a = {};
        for (var c in e)
          c !== "ref" && (a[c] = e[c]);
      }
      if (t = t.defaultProps) {
        a === e && (a = Et({}, a));
        for (var o in t)
          a[o] === void 0 && (a[o] = t[o]);
      }
      return a;
    }
    function zd(t) {
      rg(t), console.warn(
        `%s

%s
`,
        $h ? "An error occurred in the <" + $h + "> component." : "An error occurred in one of your React components.",
        `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
      );
    }
    function Dd(t) {
      var e = $h ? "The above error occurred in the <" + $h + "> component." : "The above error occurred in one of your React components.", a = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((xg || "Anonymous") + ".");
      if (typeof t == "object" && t !== null && typeof t.environmentName == "string") {
        var c = t.environmentName;
        t = [
          `%o

%s

%s
`,
          t,
          e,
          a
        ].slice(0), typeof t[0] == "string" ? t.splice(
          0,
          1,
          ob + " " + t[0],
          fb,
          _1 + c + _1,
          sb
        ) : t.splice(
          0,
          0,
          ob,
          fb,
          _1 + c + _1,
          sb
        ), t.unshift(console), c = P3.apply(console.error, t), c();
      } else
        console.error(
          `%o

%s

%s
`,
          t,
          e,
          a
        );
    }
    function k0(t) {
      rg(t);
    }
    function Us(t, e) {
      try {
        $h = e.source ? et(e.source) : null, xg = null;
        var a = e.value;
        if (B.actQueue !== null)
          B.thrownErrors.push(a);
        else {
          var c = t.onUncaughtError;
          c(a, { componentStack: e.stack });
        }
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function F0(t, e, a) {
      try {
        $h = a.source ? et(a.source) : null, xg = et(e);
        var c = t.onCaughtError;
        c(a.value, {
          componentStack: a.stack,
          errorBoundary: e.tag === 1 ? e.stateNode : null
        });
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function Od(t, e, a) {
      return a = Pe(a), a.tag = Rg, a.payload = { element: null }, a.callback = function() {
        W(e.source, Us, t, e);
      }, a;
    }
    function Md(t) {
      return t = Pe(t), t.tag = Rg, t;
    }
    function Rd(t, e, a, c) {
      var o = a.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = c.value;
        t.payload = function() {
          return o(f);
        }, t.callback = function() {
          hi(a), W(
            c.source,
            F0,
            e,
            a,
            c
          );
        };
      }
      var d = a.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (t.callback = function() {
        hi(a), W(
          c.source,
          F0,
          e,
          a,
          c
        ), typeof o != "function" && (Yf === null ? Yf = /* @__PURE__ */ new Set([this]) : Yf.add(this)), R3(this, c), typeof o == "function" || (a.lanes & 2) === 0 && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          et(a) || "Unknown"
        );
      });
    }
    function I0(t, e, a, c, o) {
      if (a.flags |= 32768, Tu && Fo(t, o), c !== null && typeof c == "object" && typeof c.then == "function") {
        if (e = a.alternate, e !== null && Tn(
          e,
          a,
          o,
          !0
        ), Nt && (kc = !0), a = Gn.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
              return _u === null ? $o() : a.alternate === null && qe === oo && (qe = o1), a.flags &= -257, a.flags |= 65536, a.lanes = o, c === e1 ? a.flags |= 16384 : (e = a.updateQueue, e === null ? a.updateQueue = /* @__PURE__ */ new Set([c]) : e.add(c), $d(t, c, o)), !1;
            case 22:
              return a.flags |= 65536, c === e1 ? a.flags |= 16384 : (e = a.updateQueue, e === null ? (e = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([c])
              }, a.updateQueue = e) : (a = e.retryQueue, a === null ? e.retryQueue = /* @__PURE__ */ new Set([c]) : a.add(c)), $d(t, c, o)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + a.tag + "). This is a bug in React."
          );
        }
        return $d(t, c, o), $o(), !1;
      }
      if (Nt)
        return kc = !0, e = Gn.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = o, c !== vg && os(
          Jl(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: c }
            ),
            a
          )
        )) : (c !== vg && os(
          Jl(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: c }
            ),
            a
          )
        ), t = t.current.alternate, t.flags |= 65536, o &= -o, t.lanes |= o, c = Jl(c, a), o = Od(
          t.stateNode,
          c,
          o
        ), ms(t, o), qe !== Bf && (qe = zr)), !1;
      var f = Jl(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: c }
        ),
        a
      );
      if (Ky === null ? Ky = [f] : Ky.push(f), qe !== Bf && (qe = zr), e === null) return !0;
      c = Jl(c, a), a = e;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, t = o & -o, a.lanes |= t, t = Od(
              a.stateNode,
              c,
              t
            ), ms(a, t), !1;
          case 1:
            if (e = a.type, f = a.stateNode, (a.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (Yf === null || !Yf.has(f))))
              return a.flags |= 65536, o &= -o, a.lanes |= o, o = Md(o), Rd(
                o,
                t,
                a,
                c
              ), ms(a, o), !1;
        }
        a = a.return;
      } while (a !== null);
      return !1;
    }
    function hl(t, e, a, c) {
      e.child = t === null ? cS(e, null, a, c) : Er(
        e,
        t.child,
        a,
        c
      );
    }
    function Yp(t, e, a, c, o) {
      a = a.render;
      var f = e.ref;
      if ("ref" in c) {
        var d = {};
        for (var h in c)
          h !== "ref" && (d[h] = c[h]);
      } else d = c;
      return Ac(e), c = L0(
        t,
        e,
        a,
        d,
        f,
        o
      ), h = Ai(), t !== null && !Sl ? (gs(t, e, o), Mn(t, e, o)) : (Nt && h && cd(e), e.flags |= 1, hl(t, e, c, o), e.child);
    }
    function P0(t, e, a, c, o) {
      if (t === null) {
        var f = a.type;
        return typeof f == "function" && !C0(f) && f.defaultProps === void 0 && a.compare === null ? (a = gc(f), e.tag = 15, e.type = a, Qo(e, f), tm(
          t,
          e,
          a,
          c,
          o
        )) : (t = mi(
          a.type,
          null,
          c,
          e,
          e.mode,
          o
        ), t.ref = e.ref, t.return = e, e.child = t);
      }
      if (f = t.child, !Bd(t, o)) {
        var d = f.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Ao, a(d, c) && t.ref === e.ref)
          return Mn(
            t,
            e,
            o
          );
      }
      return e.flags |= 1, t = Fn(f, c), t.ref = e.ref, t.return = e, e.child = t;
    }
    function tm(t, e, a, c, o) {
      if (t !== null) {
        var f = t.memoizedProps;
        if (Ao(f, c) && t.ref === e.ref && e.type === t.type)
          if (Sl = !1, e.pendingProps = c = f, Bd(t, o))
            (t.flags & 131072) !== 0 && (Sl = !0);
          else
            return e.lanes = t.lanes, Mn(t, e, o);
      }
      return nm(
        t,
        e,
        a,
        c,
        o
      );
    }
    function em(t, e, a, c) {
      var o = c.children, f = t !== null ? t.memoizedState : null;
      if (t === null && e.stateNode === null && (e.stateNode = {
        _visibility: Ey,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), c.mode === "hidden") {
        if ((e.flags & 128) !== 0) {
          if (f = f !== null ? f.baseLanes | a : a, t !== null) {
            for (c = e.child = t.child, o = 0; c !== null; )
              o = o | c.lanes | c.childLanes, c = c.sibling;
            c = o & ~f;
          } else c = 0, e.child = null;
          return lm(
            t,
            e,
            f,
            a,
            c
          );
        }
        if ((a & 536870912) !== 0)
          e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Uo(
            e,
            f !== null ? f.cachePool : null
          ), f !== null ? md(e, f) : Lu(e), yd(e);
        else
          return c = e.lanes = 536870912, lm(
            t,
            e,
            f !== null ? f.baseLanes | a : a,
            a,
            c
          );
      } else
        f !== null ? (Uo(e, f.cachePool), md(e, f), au(e), e.memoizedState = null) : (t !== null && Uo(e, null), Lu(e), au(e));
      return hl(t, e, o, a), e.child;
    }
    function Bi(t, e) {
      return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
        _visibility: Ey,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), e.sibling;
    }
    function lm(t, e, a, c, o) {
      var f = Zu();
      return f = f === null ? null : {
        parent: pl._currentValue,
        pool: f
      }, e.memoizedState = {
        baseLanes: a,
        cachePool: f
      }, t !== null && Uo(e, null), Lu(e), yd(e), t !== null && Tn(t, e, c, !0), e.childLanes = o, null;
    }
    function _s(t, e) {
      var a = e.hidden;
      return a !== void 0 && console.error(
        `<Activity> doesn't accept a hidden prop. Use mode="hidden" instead.
- <Activity %s>
+ <Activity %s>`,
        a === !0 ? "hidden" : a === !1 ? "hidden={false}" : "hidden={...}",
        a ? 'mode="hidden"' : 'mode="visible"'
      ), e = Hs(
        { mode: e.mode, children: e.children },
        t.mode
      ), e.ref = t.ref, t.child = e, e.return = t, e;
    }
    function am(t, e, a) {
      return Er(e, t.child, null, a), t = _s(
        e,
        e.pendingProps
      ), t.flags |= 2, rl(e), e.memoizedState = null, t;
    }
    function jp(t, e, a) {
      var c = e.pendingProps, o = (e.flags & 128) !== 0;
      if (e.flags &= -129, t === null) {
        if (Nt) {
          if (c.mode === "hidden")
            return t = _s(e, c), e.lanes = 536870912, Bi(null, t);
          if (Dn(e), (t = Ae) ? (a = kt(
            t,
            Ru
          ), a = a !== null && a.data === _r ? a : null, a !== null && (c = {
            dehydrated: a,
            treeContext: Rp(),
            retryLane: 536870912,
            hydrationErrors: null
          }, e.memoizedState = c, c = B0(a), c.return = e, e.child = c, ia = e, Ae = null)) : a = null, a === null)
            throw Yl(e, t), Fa(e);
          return e.lanes = 536870912, null;
        }
        return _s(e, c);
      }
      var f = t.memoizedState;
      if (f !== null) {
        var d = f.dehydrated;
        if (Dn(e), o)
          if (e.flags & 256)
            e.flags &= -257, e = am(
              t,
              e,
              a
            );
          else if (e.memoizedState !== null)
            e.child = t.child, e.flags |= 128, e = null;
          else
            throw Error(
              "Client rendering an Activity suspended it again. This is a bug in React."
            );
        else if (_p(), (a & 536870912) !== 0 && Ko(e), Sl || Tn(
          t,
          e,
          a,
          !1
        ), o = (a & t.childLanes) !== 0, Sl || o) {
          if (c = re, c !== null && (d = sp(
            c,
            a
          ), d !== 0 && d !== f.retryLane))
            throw f.retryLane = d, ql(t, d), ht(c, t, d), qg;
          $o(), e = am(
            t,
            e,
            a
          );
        } else
          t = f.treeContext, Ae = xa(
            d.nextSibling
          ), ia = e, Nt = !0, Mf = null, kc = !1, jn = null, Ru = !1, t !== null && Up(e, t), e = _s(e, c), e.flags |= 4096;
        return e;
      }
      return f = t.child, c = { mode: c.mode, children: c.children }, (a & 536870912) !== 0 && (a & t.lanes) !== 0 && Ko(e), t = Fn(f, c), t.ref = e.ref, e.child = t, t.return = e, t;
    }
    function Cs(t, e) {
      var a = e.ref;
      if (a === null)
        t !== null && t.ref !== null && (e.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (t === null || t.ref !== a) && (e.flags |= 4194816);
      }
    }
    function nm(t, e, a, c, o) {
      if (a.prototype && typeof a.prototype.render == "function") {
        var f = Bt(a) || "Unknown";
        MS[f] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          f,
          f
        ), MS[f] = !0);
      }
      return e.mode & va && ic.recordLegacyContextWarning(
        e,
        null
      ), t === null && (Qo(e, e.type), a.contextTypes && (f = Bt(a) || "Unknown", US[f] || (US[f] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        f
      )))), Ac(e), a = L0(
        t,
        e,
        a,
        c,
        void 0,
        o
      ), c = Ai(), t !== null && !Sl ? (gs(t, e, o), Mn(t, e, o)) : (Nt && c && cd(e), e.flags |= 1, hl(t, e, a, o), e.child);
    }
    function um(t, e, a, c, o, f) {
      return Ac(e), co = -1, Xy = t !== null && t.type !== e.type, e.updateQueue = null, a = ps(
        e,
        c,
        a,
        o
      ), Ve(t, e), c = Ai(), t !== null && !Sl ? (gs(t, e, f), Mn(t, e, f)) : (Nt && c && cd(e), e.flags |= 1, hl(t, e, a, f), e.child);
    }
    function Ni(t, e, a, c, o) {
      switch (Al(e)) {
        case !1:
          var f = e.stateNode, d = new e.type(
            e.memoizedProps,
            f.context
          ).state;
          f.updater.enqueueSetState(f, d, null);
          break;
        case !0:
          e.flags |= 128, e.flags |= 65536, f = Error("Simulated error coming from DevTools");
          var h = o & -o;
          if (e.lanes |= h, d = re, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = Md(h), Rd(
            h,
            d,
            e,
            Jl(f, e)
          ), ms(e, h);
      }
      if (Ac(e), e.stateNode === null) {
        if (d = Of, f = a.contextType, "contextType" in a && f !== null && (f === void 0 || f.$$typeof !== xn) && !DS.has(a) && (DS.add(a), h = f === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? " However, it is set to a " + typeof f + "." : f.$$typeof === ph ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          Bt(a) || "Component",
          h
        )), typeof f == "object" && f !== null && (d = Zt(f)), f = new a(c, d), e.mode & va) {
          ce(!0);
          try {
            f = new a(c, d);
          } finally {
            ce(!1);
          }
        }
        if (d = e.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = Ng, e.stateNode = f, f._reactInternals = e, f._reactInternalInstance = pS, typeof a.getDerivedStateFromProps == "function" && d === null && (d = Bt(a) || "Component", gS.has(d) || (gS.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          f.state === null ? "null" : "undefined",
          d
        ))), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function") {
          var y = h = d = null;
          if (typeof f.componentWillMount == "function" && f.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof f.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof f.componentWillReceiveProps == "function" && f.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof f.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof f.componentWillUpdate == "function" && f.componentWillUpdate.__suppressDeprecationWarning !== !0 ? y = "componentWillUpdate" : typeof f.UNSAFE_componentWillUpdate == "function" && (y = "UNSAFE_componentWillUpdate"), d !== null || h !== null || y !== null) {
            f = Bt(a) || "Component";
            var p = typeof a.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            bS.has(f) || (bS.add(f), console.error(
              `Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,
              f,
              p,
              d !== null ? `
  ` + d : "",
              h !== null ? `
  ` + h : "",
              y !== null ? `
  ` + y : ""
            ));
          }
        }
        f = e.stateNode, d = Bt(a) || "Component", f.render || (a.prototype && typeof a.prototype.render == "function" ? console.error(
          "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
          d
        ) : console.error(
          "No `render` method found on the %s instance: you may have forgotten to define `render`.",
          d
        )), !f.getInitialState || f.getInitialState.isReactClassApproved || f.state || console.error(
          "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
          d
        ), f.getDefaultProps && !f.getDefaultProps.isReactClassApproved && console.error(
          "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
          d
        ), f.contextType && console.error(
          "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
          d
        ), a.childContextTypes && !zS.has(a) && (zS.add(a), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), a.contextTypes && !AS.has(a) && (AS.add(a), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof f.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), a.prototype && a.prototype.isPureReactComponent && typeof f.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          Bt(a) || "A pure component"
        ), typeof f.componentDidUnmount == "function" && console.error(
          "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
          d
        ), typeof f.componentDidReceiveProps == "function" && console.error(
          "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
          d
        ), typeof f.componentWillRecieveProps == "function" && console.error(
          "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
          d
        ), typeof f.UNSAFE_componentWillRecieveProps == "function" && console.error(
          "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
          d
        ), h = f.props !== c, f.props !== void 0 && h && console.error(
          "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
          d
        ), f.defaultProps && console.error(
          "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
          d,
          d
        ), typeof f.getSnapshotBeforeUpdate != "function" || typeof f.componentDidUpdate == "function" || SS.has(a) || (SS.add(a), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          Bt(a)
        )), typeof f.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof f.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof a.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = f.state) && (typeof h != "object" || ke(h)) && console.error("%s.state: must be set to an object or null", d), typeof f.getChildContext == "function" && typeof a.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), f = e.stateNode, f.props = c, f.state = e.memoizedState, f.refs = {}, Ct(e), d = a.contextType, f.context = typeof d == "object" && d !== null ? Zt(d) : Of, f.state === c && (d = Bt(a) || "Component", TS.has(d) || (TS.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), e.mode & va && ic.recordLegacyContextWarning(
          e,
          f
        ), ic.recordUnsafeLifecycleWarnings(
          e,
          f
        ), f.state = e.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && (Xo(
          e,
          a,
          d,
          c
        ), f.state = e.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (d = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), d !== f.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          et(e) || "Component"
        ), Ng.enqueueReplaceState(
          f,
          f.state,
          null
        )), lu(e, c, f, o), Co(), f.state = e.memoizedState), typeof f.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & cc) !== dt && (e.flags |= 134217728), f = !0;
      } else if (t === null) {
        f = e.stateNode;
        var A = e.memoizedProps;
        h = ou(a, A), f.props = h;
        var D = f.context;
        y = a.contextType, d = Of, typeof y == "object" && y !== null && (d = Zt(y)), p = a.getDerivedStateFromProps, y = typeof p == "function" || typeof f.getSnapshotBeforeUpdate == "function", A = e.pendingProps !== A, y || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (A || D !== d) && iu(
          e,
          f,
          c,
          d
        ), Hf = !1;
        var S = e.memoizedState;
        f.state = S, lu(e, c, f, o), Co(), D = e.memoizedState, A || S !== D || Hf ? (typeof p == "function" && (Xo(
          e,
          a,
          p,
          c
        ), D = e.memoizedState), (h = Hf || Ad(
          e,
          a,
          h,
          c,
          S,
          D,
          d
        )) ? (y || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & cc) !== dt && (e.flags |= 134217728)) : (typeof f.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & cc) !== dt && (e.flags |= 134217728), e.memoizedProps = c, e.memoizedState = D), f.props = c, f.state = D, f.context = d, f = h) : (typeof f.componentDidMount == "function" && (e.flags |= 4194308), (e.mode & cc) !== dt && (e.flags |= 134217728), f = !1);
      } else {
        f = e.stateNode, tu(t, e), d = e.memoizedProps, y = ou(a, d), f.props = y, p = e.pendingProps, S = f.context, D = a.contextType, h = Of, typeof D == "object" && D !== null && (h = Zt(D)), A = a.getDerivedStateFromProps, (D = typeof A == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d !== p || S !== h) && iu(
          e,
          f,
          c,
          h
        ), Hf = !1, S = e.memoizedState, f.state = S, lu(e, c, f, o), Co();
        var C = e.memoizedState;
        d !== p || S !== C || Hf || t !== null && t.dependencies !== null && Mo(t.dependencies) ? (typeof A == "function" && (Xo(
          e,
          a,
          A,
          c
        ), C = e.memoizedState), (y = Hf || Ad(
          e,
          a,
          y,
          c,
          S,
          C,
          h
        ) || t !== null && t.dependencies !== null && Mo(t.dependencies)) ? (D || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(c, C, h), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          c,
          C,
          h
        )), typeof f.componentDidUpdate == "function" && (e.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || d === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), e.memoizedProps = c, e.memoizedState = C), f.props = c, f.state = C, f.context = h, f = y) : (typeof f.componentDidUpdate != "function" || d === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), f = !1);
      }
      if (h = f, Cs(t, e), d = (e.flags & 128) !== 0, h || d) {
        if (h = e.stateNode, Kf(e), d && typeof a.getDerivedStateFromError != "function")
          a = null, Xa = -1;
        else if (a = J2(h), e.mode & va) {
          ce(!0);
          try {
            J2(h);
          } finally {
            ce(!1);
          }
        }
        e.flags |= 1, t !== null && d ? (e.child = Er(
          e,
          t.child,
          null,
          o
        ), e.child = Er(
          e,
          null,
          a,
          o
        )) : hl(t, e, a, o), e.memoizedState = h.state, t = e.child;
      } else
        t = Mn(
          t,
          e,
          o
        );
      return o = e.stateNode, f && o.props !== c && (Wh || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        et(e) || "a component"
      ), Wh = !0), t;
    }
    function cm(t, e, a, c) {
      return Tc(), e.flags |= 256, hl(t, e, a, c), e.child;
    }
    function Qo(t, e) {
      e && e.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        e.displayName || e.name || "Component"
      ), typeof e.getDerivedStateFromProps == "function" && (t = Bt(e) || "Unknown", _S[t] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        t
      ), _S[t] = !0)), typeof e.contextType == "object" && e.contextType !== null && (e = Bt(e) || "Unknown", RS[e] || (console.error(
        "%s: Function components do not support contextType.",
        e
      ), RS[e] = !0));
    }
    function Vo(t) {
      return { baseLanes: t, cachePool: G0() };
    }
    function Ud(t, e, a) {
      return t = t !== null ? t.childLanes & ~a : 0, e && (t |= rn), t;
    }
    function _d(t, e, a) {
      var c, o = e.pendingProps;
      ve(e) && (e.flags |= 128);
      var f = !1, d = (e.flags & 128) !== 0;
      if ((c = d) || (c = t !== null && t.memoizedState === null ? !1 : (nl.current & jy) !== 0), c && (f = !0, e.flags &= -129), c = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
        if (Nt) {
          if (f ? kl(e) : au(e), (t = Ae) ? (a = kt(
            t,
            Ru
          ), a = a !== null && a.data !== _r ? a : null, a !== null && (c = {
            dehydrated: a,
            treeContext: Rp(),
            retryLane: 536870912,
            hydrationErrors: null
          }, e.memoizedState = c, c = B0(a), c.return = e, e.child = c, ia = e, Ae = null)) : a = null, a === null)
            throw Yl(e, t), Fa(e);
          return Gm(a) ? e.lanes = 32 : e.lanes = 536870912, null;
        }
        var h = o.children;
        if (o = o.fallback, f) {
          au(e);
          var y = e.mode;
          return h = Hs(
            { mode: "hidden", children: h },
            y
          ), o = yi(
            o,
            y,
            a,
            null
          ), h.return = e, o.return = e, h.sibling = o, e.child = h, o = e.child, o.memoizedState = Vo(a), o.childLanes = Ud(
            t,
            c,
            a
          ), e.memoizedState = Yg, Bi(
            null,
            o
          );
        }
        return kl(e), im(
          e,
          h
        );
      }
      var p = t.memoizedState;
      if (p !== null) {
        var A = p.dehydrated;
        if (A !== null) {
          if (d)
            e.flags & 256 ? (kl(e), e.flags &= -257, e = Cd(
              t,
              e,
              a
            )) : e.memoizedState !== null ? (au(e), e.child = t.child, e.flags |= 128, e = null) : (au(e), h = o.fallback, y = e.mode, o = Hs(
              {
                mode: "visible",
                children: o.children
              },
              y
            ), h = yi(
              h,
              y,
              a,
              null
            ), h.flags |= 2, o.return = e, h.return = e, o.sibling = h, e.child = o, Er(
              e,
              t.child,
              null,
              a
            ), o = e.child, o.memoizedState = Vo(a), o.childLanes = Ud(
              t,
              c,
              a
            ), e.memoizedState = Yg, e = Bi(
              null,
              o
            ));
          else if (kl(e), _p(), (a & 536870912) !== 0 && Ko(e), Gm(
            A
          )) {
            if (c = A.nextSibling && A.nextSibling.dataset, c) {
              h = c.dgst;
              var D = c.msg;
              y = c.stck;
              var S = c.cstck;
            }
            f = D, c = h, o = y, A = S, h = f, y = A, h = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), h.stack = o || "", h.digest = c, c = y === void 0 ? null : y, o = {
              value: h,
              source: null,
              stack: c
            }, typeof c == "string" && pg.set(
              h,
              o
            ), os(o), e = Cd(
              t,
              e,
              a
            );
          } else if (Sl || Tn(
            t,
            e,
            a,
            !1
          ), c = (a & t.childLanes) !== 0, Sl || c) {
            if (c = re, c !== null && (o = sp(
              c,
              a
            ), o !== 0 && o !== p.retryLane))
              throw p.retryLane = o, ql(
                t,
                o
              ), ht(
                c,
                t,
                o
              ), qg;
            ks(
              A
            ) || $o(), e = Cd(
              t,
              e,
              a
            );
          } else
            ks(
              A
            ) ? (e.flags |= 192, e.child = t.child, e = null) : (t = p.treeContext, Ae = xa(
              A.nextSibling
            ), ia = e, Nt = !0, Mf = null, kc = !1, jn = null, Ru = !1, t !== null && Up(e, t), e = im(
              e,
              o.children
            ), e.flags |= 4096);
          return e;
        }
      }
      return f ? (au(e), h = o.fallback, y = e.mode, S = t.child, A = S.sibling, o = Fn(
        S,
        {
          mode: "hidden",
          children: o.children
        }
      ), o.subtreeFlags = S.subtreeFlags & 65011712, A !== null ? h = Fn(
        A,
        h
      ) : (h = yi(
        h,
        y,
        a,
        null
      ), h.flags |= 2), h.return = e, o.return = e, o.sibling = h, e.child = o, Bi(null, o), o = e.child, h = t.child.memoizedState, h === null ? h = Vo(a) : (y = h.cachePool, y !== null ? (S = pl._currentValue, y = y.parent !== S ? { parent: S, pool: S } : y) : y = G0(), h = {
        baseLanes: h.baseLanes | a,
        cachePool: y
      }), o.memoizedState = h, o.childLanes = Ud(
        t,
        c,
        a
      ), e.memoizedState = Yg, Bi(
        t.child,
        o
      )) : (p !== null && (a & 62914560) === a && (a & t.lanes) !== 0 && Ko(e), kl(e), a = t.child, t = a.sibling, a = Fn(a, {
        mode: "visible",
        children: o.children
      }), a.return = e, a.sibling = null, t !== null && (c = e.deletions, c === null ? (e.deletions = [t], e.flags |= 16) : c.push(t)), e.child = a, e.memoizedState = null, a);
    }
    function im(t, e) {
      return e = Hs(
        { mode: "visible", children: e },
        t.mode
      ), e.return = t, t.child = e;
    }
    function Hs(t, e) {
      return t = xt(22, t, null, e), t.lanes = 0, t;
    }
    function Cd(t, e, a) {
      return Er(e, t.child, null, a), t = im(
        e,
        e.pendingProps.children
      ), t.flags |= 2, e.memoizedState = null, t;
    }
    function om(t, e, a) {
      t.lanes |= e;
      var c = t.alternate;
      c !== null && (c.lanes |= e), od(
        t.return,
        e,
        a
      );
    }
    function Hd(t, e, a, c, o, f) {
      var d = t.memoizedState;
      d === null ? t.memoizedState = {
        isBackwards: e,
        rendering: null,
        renderingStartTime: 0,
        last: c,
        tail: a,
        tailMode: o,
        treeForkCount: f
      } : (d.isBackwards = e, d.rendering = null, d.renderingStartTime = 0, d.last = c, d.tail = a, d.tailMode = o, d.treeForkCount = f);
    }
    function fm(t, e, a) {
      var c = e.pendingProps, o = c.revealOrder, f = c.tail, d = c.children, h = nl.current;
      if ((c = (h & jy) !== 0) ? (h = h & wh | jy, e.flags |= 128) : h &= wh, Ot(nl, h, e), h = o ?? "null", o !== "forwards" && o !== "unstable_legacy-backwards" && o !== "together" && o !== "independent" && !CS[h])
        if (CS[h] = !0, o == null)
          console.error(
            'The default for the <SuspenseList revealOrder="..."> prop is changing. To be future compatible you must explictly specify either "independent" (the current default), "together", "forwards" or "legacy_unstable-backwards".'
          );
        else if (o === "backwards")
          console.error(
            'The rendering order of <SuspenseList revealOrder="backwards"> is changing. To be future compatible you must specify revealOrder="legacy_unstable-backwards" instead.'
          );
        else if (typeof o == "string")
          switch (o.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
            case "independent":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                o,
                o.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                o,
                o.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',
                o
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "independent", "together", "forwards" or "backwards"?',
            o
          );
      h = f ?? "null", i1[h] || (f == null ? (o === "forwards" || o === "backwards" || o === "unstable_legacy-backwards") && (i1[h] = !0, console.error(
        'The default for the <SuspenseList tail="..."> prop is changing. To be future compatible you must explictly specify either "visible" (the current default), "collapsed" or "hidden".'
      )) : f !== "visible" && f !== "collapsed" && f !== "hidden" ? (i1[h] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "visible", "collapsed" or "hidden"?',
        f
      )) : o !== "forwards" && o !== "backwards" && o !== "unstable_legacy-backwards" && (i1[h] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        f
      )));
      t: if ((o === "forwards" || o === "backwards" || o === "unstable_legacy-backwards") && d !== void 0 && d !== null && d !== !1)
        if (ke(d)) {
          for (h = 0; h < d.length; h++)
            if (!ie(
              d[h],
              h
            ))
              break t;
        } else if (h = Ke(d), typeof h == "function") {
          if (h = h.call(d))
            for (var y = h.next(), p = 0; !y.done; y = h.next()) {
              if (!ie(y.value, p)) break t;
              p++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            o
          );
      if (hl(t, e, d, a), Nt ? (bc(), d = Ay) : d = 0, !c && t !== null && (t.flags & 128) !== 0)
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && om(t, a, e);
          else if (t.tag === 19)
            om(t, a, e);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
              break t;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      switch (o) {
        case "forwards":
          for (a = e.child, o = null; a !== null; )
            t = a.alternate, t !== null && Ei(t) === null && (o = a), a = a.sibling;
          a = o, a === null ? (o = e.child, e.child = null) : (o = a.sibling, a.sibling = null), Hd(
            e,
            !1,
            o,
            a,
            f,
            d
          );
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (a = null, o = e.child, e.child = null; o !== null; ) {
            if (t = o.alternate, t !== null && Ei(t) === null) {
              e.child = o;
              break;
            }
            t = o.sibling, o.sibling = a, a = o, o = t;
          }
          Hd(
            e,
            !0,
            a,
            null,
            f,
            d
          );
          break;
        case "together":
          Hd(
            e,
            !1,
            null,
            null,
            void 0,
            d
          );
          break;
        default:
          e.memoizedState = null;
      }
      return e.child;
    }
    function Mn(t, e, a) {
      if (t !== null && (e.dependencies = t.dependencies), Xa = -1, xf |= e.lanes, (a & e.childLanes) === 0)
        if (t !== null) {
          if (Tn(
            t,
            e,
            a,
            !1
          ), (a & e.childLanes) === 0)
            return null;
        } else return null;
      if (t !== null && e.child !== t.child)
        throw Error("Resuming work not yet implemented.");
      if (e.child !== null) {
        for (t = e.child, a = Fn(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
          t = t.sibling, a = a.sibling = Fn(t, t.pendingProps), a.return = e;
        a.sibling = null;
      }
      return e.child;
    }
    function Bd(t, e) {
      return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Mo(t)));
    }
    function Gp(t, e, a) {
      switch (e.tag) {
        case 3:
          il(
            e,
            e.stateNode.containerInfo
          ), Ia(
            e,
            pl,
            t.memoizedState.cache
          ), Tc();
          break;
        case 27:
        case 5:
          Z(e);
          break;
        case 4:
          il(
            e,
            e.stateNode.containerInfo
          );
          break;
        case 10:
          Ia(
            e,
            e.type,
            e.memoizedProps.value
          );
          break;
        case 12:
          (a & e.childLanes) !== 0 && (e.flags |= 4), e.flags |= 2048;
          var c = e.stateNode;
          c.effectDuration = -0, c.passiveEffectDuration = -0;
          break;
        case 31:
          if (e.memoizedState !== null)
            return e.flags |= 128, Dn(e), null;
          break;
        case 13:
          if (c = e.memoizedState, c !== null)
            return c.dehydrated !== null ? (kl(e), e.flags |= 128, null) : (a & e.child.childLanes) !== 0 ? _d(
              t,
              e,
              a
            ) : (kl(e), t = Mn(
              t,
              e,
              a
            ), t !== null ? t.sibling : null);
          kl(e);
          break;
        case 19:
          var o = (t.flags & 128) !== 0;
          if (c = (a & e.childLanes) !== 0, c || (Tn(
            t,
            e,
            a,
            !1
          ), c = (a & e.childLanes) !== 0), o) {
            if (c)
              return fm(
                t,
                e,
                a
              );
            e.flags |= 128;
          }
          if (o = e.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Ot(
            nl,
            nl.current,
            e
          ), c) break;
          return null;
        case 22:
          return e.lanes = 0, em(
            t,
            e,
            a,
            e.pendingProps
          );
        case 24:
          Ia(
            e,
            pl,
            t.memoizedState.cache
          );
      }
      return Mn(t, e, a);
    }
    function Bs(t, e, a) {
      if (e._debugNeedsRemount && t !== null) {
        a = mi(
          e.type,
          e.key,
          e.pendingProps,
          e._debugOwner || null,
          e.mode,
          e.lanes
        ), a._debugStack = e._debugStack, a._debugTask = e._debugTask;
        var c = e.return;
        if (c === null) throw Error("Cannot swap the root fiber.");
        if (t.alternate = null, e.alternate = null, a.index = e.index, a.sibling = e.sibling, a.return = e.return, a.ref = e.ref, a._debugInfo = e._debugInfo, e === c.child)
          c.child = a;
        else {
          var o = c.child;
          if (o === null)
            throw Error("Expected parent to have a child.");
          for (; o.sibling !== e; )
            if (o = o.sibling, o === null)
              throw Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        return e = c.deletions, e === null ? (c.deletions = [t], c.flags |= 16) : e.push(t), a.flags |= 2, a;
      }
      if (t !== null)
        if (t.memoizedProps !== e.pendingProps || e.type !== t.type)
          Sl = !0;
        else {
          if (!Bd(t, a) && (e.flags & 128) === 0)
            return Sl = !1, Gp(
              t,
              e,
              a
            );
          Sl = (t.flags & 131072) !== 0;
        }
      else
        Sl = !1, (c = Nt) && (bc(), c = (e.flags & 1048576) !== 0), c && (c = e.index, bc(), N0(e, Ay, c));
      switch (e.lanes = 0, e.tag) {
        case 16:
          t: if (c = e.pendingProps, t = Oa(e.elementType), e.type = t, typeof t == "function")
            C0(t) ? (c = ou(
              t,
              c
            ), e.tag = 1, e.type = t = gc(t), e = Ni(
              null,
              e,
              t,
              c,
              a
            )) : (e.tag = 0, Qo(e, t), e.type = t = gc(t), e = nm(
              null,
              e,
              t,
              c,
              a
            ));
          else {
            if (t != null) {
              if (o = t.$$typeof, o === df) {
                e.tag = 11, e.type = t = nd(t), e = Yp(
                  null,
                  e,
                  t,
                  c,
                  a
                );
                break t;
              } else if (o === cr) {
                e.tag = 14, e = P0(
                  null,
                  e,
                  t,
                  c,
                  a
                );
                break t;
              }
            }
            throw e = "", t !== null && typeof t == "object" && t.$$typeof === Gl && (e = " Did you wrap a component in React.lazy() more than once?"), a = Bt(t) || t, Error(
              "Element type is invalid. Received a promise that resolves to: " + a + ". Lazy element type must resolve to a class or function." + e
            );
          }
          return e;
        case 0:
          return nm(
            t,
            e,
            e.type,
            e.pendingProps,
            a
          );
        case 1:
          return c = e.type, o = ou(
            c,
            e.pendingProps
          ), Ni(
            t,
            e,
            c,
            o,
            a
          );
        case 3:
          t: {
            if (il(
              e,
              e.stateNode.containerInfo
            ), t === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            c = e.pendingProps;
            var f = e.memoizedState;
            o = f.element, tu(t, e), lu(e, c, null, a);
            var d = e.memoizedState;
            if (c = d.cache, Ia(e, pl, c), c !== f.cache && Xu(
              e,
              [pl],
              a,
              !0
            ), Co(), c = d.element, f.isDehydrated)
              if (f = {
                element: c,
                isDehydrated: !1,
                cache: d.cache
              }, e.updateQueue.baseState = f, e.memoizedState = f, e.flags & 256) {
                e = cm(
                  t,
                  e,
                  c,
                  a
                );
                break t;
              } else if (c !== o) {
                o = Jl(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  e
                ), os(o), e = cm(
                  t,
                  e,
                  c,
                  a
                );
                break t;
              } else
                for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Ae = xa(t.firstChild), ia = e, Nt = !0, Mf = null, kc = !1, jn = null, Ru = !0, a = cS(
                  e,
                  null,
                  c,
                  a
                ), e.child = a; a; )
                  a.flags = a.flags & -3 | 4096, a = a.sibling;
            else {
              if (Tc(), c === o) {
                e = Mn(
                  t,
                  e,
                  a
                );
                break t;
              }
              hl(
                t,
                e,
                c,
                a
              );
            }
            e = e.child;
          }
          return e;
        case 26:
          return Cs(t, e), t === null ? (a = Zm(
            e.type,
            null,
            e.pendingProps,
            null
          )) ? e.memoizedState = a : Nt || (a = e.type, t = e.pendingProps, c = xl(
            qa.current
          ), c = $s(
            c
          ).createElement(a), c[Te] = e, c[ca] = t, be(c, a, t), Xe(c), e.stateNode = c) : e.memoizedState = Zm(
            e.type,
            t.memoizedProps,
            e.pendingProps,
            t.memoizedState
          ), null;
        case 27:
          return Z(e), t === null && Nt && (c = xl(qa.current), o = Q(), c = e.stateNode = lc(
            e.type,
            e.pendingProps,
            c,
            o,
            !1
          ), kc || (o = ma(
            c,
            e.type,
            e.pendingProps,
            o
          ), o !== null && (pi(e, 0).serverProps = o)), ia = e, Ru = !0, o = Ae, Zc(e.type) ? (c2 = o, Ae = xa(
            c.firstChild
          )) : Ae = o), hl(
            t,
            e,
            e.pendingProps.children,
            a
          ), Cs(t, e), t === null && (e.flags |= 4194304), e.child;
        case 5:
          return t === null && Nt && (f = Q(), c = If(
            e.type,
            f.ancestorInfo
          ), o = Ae, (d = !o) || (d = yv(
            o,
            e.type,
            e.pendingProps,
            Ru
          ), d !== null ? (e.stateNode = d, kc || (f = ma(
            d,
            e.type,
            e.pendingProps,
            f
          ), f !== null && (pi(e, 0).serverProps = f)), ia = e, Ae = xa(
            d.firstChild
          ), Ru = !1, f = !0) : f = !1, d = !f), d && (c && Yl(e, o), Fa(e))), Z(e), o = e.type, f = e.pendingProps, d = t !== null ? t.memoizedProps : null, c = f.children, lf(o, f) ? c = null : d !== null && lf(o, d) && (e.flags |= 32), e.memoizedState !== null && (o = L0(
            t,
            e,
            vs,
            null,
            null,
            a
          ), lp._currentValue = o), Cs(t, e), hl(
            t,
            e,
            c,
            a
          ), e.child;
        case 6:
          return t === null && Nt && (a = e.pendingProps, t = Q(), c = t.ancestorInfo.current, a = c != null ? Pf(
            a,
            c.tag,
            t.ancestorInfo.implicitRootScope
          ) : !0, t = Ae, (c = !t) || (c = pv(
            t,
            e.pendingProps,
            Ru
          ), c !== null ? (e.stateNode = c, ia = e, Ae = null, c = !0) : c = !1, c = !c), c && (a && Yl(e, t), Fa(e))), null;
        case 13:
          return _d(t, e, a);
        case 4:
          return il(
            e,
            e.stateNode.containerInfo
          ), c = e.pendingProps, t === null ? e.child = Er(
            e,
            null,
            c,
            a
          ) : hl(
            t,
            e,
            c,
            a
          ), e.child;
        case 11:
          return Yp(
            t,
            e,
            e.type,
            e.pendingProps,
            a
          );
        case 7:
          return hl(
            t,
            e,
            e.pendingProps,
            a
          ), e.child;
        case 8:
          return hl(
            t,
            e,
            e.pendingProps.children,
            a
          ), e.child;
        case 12:
          return e.flags |= 4, e.flags |= 2048, c = e.stateNode, c.effectDuration = -0, c.passiveEffectDuration = -0, hl(
            t,
            e,
            e.pendingProps.children,
            a
          ), e.child;
        case 10:
          return c = e.type, o = e.pendingProps, f = o.value, "value" in o || HS || (HS = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), Ia(e, c, f), hl(
            t,
            e,
            o.children,
            a
          ), e.child;
        case 9:
          return o = e.type._context, c = e.pendingProps.children, typeof c != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), Ac(e), o = Zt(o), c = zg(
            c,
            o,
            void 0
          ), e.flags |= 1, hl(
            t,
            e,
            c,
            a
          ), e.child;
        case 14:
          return P0(
            t,
            e,
            e.type,
            e.pendingProps,
            a
          );
        case 15:
          return tm(
            t,
            e,
            e.type,
            e.pendingProps,
            a
          );
        case 19:
          return fm(
            t,
            e,
            a
          );
        case 31:
          return jp(t, e, a);
        case 22:
          return em(
            t,
            e,
            a,
            e.pendingProps
          );
        case 24:
          return Ac(e), c = Zt(pl), t === null ? (o = Zu(), o === null && (o = re, f = fd(), o.pooledCache = f, gi(f), f !== null && (o.pooledCacheLanes |= a), o = f), e.memoizedState = {
            parent: c,
            cache: o
          }, Ct(e), Ia(e, pl, o)) : ((t.lanes & a) !== 0 && (tu(t, e), lu(e, null, null, a), Co()), o = t.memoizedState, f = e.memoizedState, o.parent !== c ? (o = {
            parent: c,
            cache: c
          }, e.memoizedState = o, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = o), Ia(e, pl, c)) : (c = f.cache, Ia(e, pl, c), c !== o.cache && Xu(
            e,
            [pl],
            a,
            !0
          ))), hl(
            t,
            e,
            e.pendingProps.children,
            a
          ), e.child;
        case 29:
          throw e.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + e.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function fu(t) {
      t.flags |= 4;
    }
    function Nd(t, e, a, c, o) {
      if ((e = (t.mode & A3) !== dt) && (e = !1), e) {
        if (t.flags |= 16777216, (o & 335544128) === o)
          if (t.stateNode.complete) t.flags |= 8192;
          else if (Mm()) t.flags |= 8192;
          else
            throw Tr = e1, Og;
      } else t.flags &= -16777217;
    }
    function Xp(t, e) {
      if (e.type !== "stylesheet" || (e.state.loading & Bu) !== Br)
        t.flags &= -16777217;
      else if (t.flags |= 16777216, !Ut(e))
        if (Mm()) t.flags |= 8192;
        else
          throw Tr = e1, Og;
    }
    function Zo(t, e) {
      e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Yr() : 536870912, t.lanes |= e, Mr |= e);
    }
    function Lo(t, e) {
      if (!Nt)
        switch (t.tailMode) {
          case "hidden":
            e = t.tail;
            for (var a = null; e !== null; )
              e.alternate !== null && (a = e), e = e.sibling;
            a === null ? t.tail = null : a.sibling = null;
            break;
          case "collapsed":
            a = t.tail;
            for (var c = null; a !== null; )
              a.alternate !== null && (c = a), a = a.sibling;
            c === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : c.sibling = null;
        }
    }
    function te(t) {
      var e = t.alternate !== null && t.alternate.child === t.child, a = 0, c = 0;
      if (e)
        if ((t.mode & At) !== dt) {
          for (var o = t.selfBaseDuration, f = t.child; f !== null; )
            a |= f.lanes | f.childLanes, c |= f.subtreeFlags & 65011712, c |= f.flags & 65011712, o += f.treeBaseDuration, f = f.sibling;
          t.treeBaseDuration = o;
        } else
          for (o = t.child; o !== null; )
            a |= o.lanes | o.childLanes, c |= o.subtreeFlags & 65011712, c |= o.flags & 65011712, o.return = t, o = o.sibling;
      else if ((t.mode & At) !== dt) {
        o = t.actualDuration, f = t.selfBaseDuration;
        for (var d = t.child; d !== null; )
          a |= d.lanes | d.childLanes, c |= d.subtreeFlags, c |= d.flags, o += d.actualDuration, f += d.treeBaseDuration, d = d.sibling;
        t.actualDuration = o, t.treeBaseDuration = f;
      } else
        for (o = t.child; o !== null; )
          a |= o.lanes | o.childLanes, c |= o.subtreeFlags, c |= o.flags, o.return = t, o = o.sibling;
      return t.subtreeFlags |= c, t.childLanes = a, e;
    }
    function sm(t, e, a) {
      var c = e.pendingProps;
      switch (id(e), e.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return te(e), null;
        case 1:
          return te(e), null;
        case 3:
          return a = e.stateNode, c = null, t !== null && (c = t.memoizedState.cache), e.memoizedState.cache !== c && (e.flags |= 2048), bn(pl, e), O(e), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (vi(e) ? (Ec(), fu(e)) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, is())), te(e), null;
        case 26:
          var o = e.type, f = e.memoizedState;
          return t === null ? (fu(e), f !== null ? (te(e), Xp(
            e,
            f
          )) : (te(e), Nd(
            e,
            o,
            null,
            c,
            a
          ))) : f ? f !== t.memoizedState ? (fu(e), te(e), Xp(
            e,
            f
          )) : (te(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== c && fu(e), te(e), Nd(
            e,
            o,
            t,
            c,
            a
          )), null;
        case 27:
          if (ct(e), a = xl(qa.current), o = e.type, t !== null && e.stateNode != null)
            t.memoizedProps !== c && fu(e);
          else {
            if (!c) {
              if (e.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return te(e), null;
            }
            t = Q(), vi(e) ? x0(e) : (t = lc(
              o,
              c,
              a,
              t,
              !0
            ), e.stateNode = t, fu(e));
          }
          return te(e), null;
        case 5:
          if (ct(e), o = e.type, t !== null && e.stateNode != null)
            t.memoizedProps !== c && fu(e);
          else {
            if (!c) {
              if (e.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return te(e), null;
            }
            var d = Q();
            if (vi(e))
              x0(e);
            else {
              switch (f = xl(qa.current), If(o, d.ancestorInfo), d = d.context, f = $s(f), d) {
                case a0:
                  f = f.createElementNS(
                    bt,
                    o
                  );
                  break;
                case M1:
                  f = f.createElementNS(
                    vt,
                    o
                  );
                  break;
                default:
                  switch (o) {
                    case "svg":
                      f = f.createElementNS(
                        bt,
                        o
                      );
                      break;
                    case "math":
                      f = f.createElementNS(
                        vt,
                        o
                      );
                      break;
                    case "script":
                      f = f.createElement("div"), f.innerHTML = "<script><\/script>", f = f.removeChild(
                        f.firstChild
                      );
                      break;
                    case "select":
                      f = typeof c.is == "string" ? f.createElement("select", {
                        is: c.is
                      }) : f.createElement("select"), c.multiple ? f.multiple = !0 : c.size && (f.size = c.size);
                      break;
                    default:
                      f = typeof c.is == "string" ? f.createElement(o, {
                        is: c.is
                      }) : f.createElement(o), o.indexOf("-") === -1 && (o !== o.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        o
                      ), Object.prototype.toString.call(f) !== "[object HTMLUnknownElement]" || Ya.call(lb, o) || (lb[o] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        o
                      )));
                  }
              }
              f[Te] = e, f[ca] = c;
              t: for (d = e.child; d !== null; ) {
                if (d.tag === 5 || d.tag === 6)
                  f.appendChild(d.stateNode);
                else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                  d.child.return = d, d = d.child;
                  continue;
                }
                if (d === e) break t;
                for (; d.sibling === null; ) {
                  if (d.return === null || d.return === e)
                    break t;
                  d = d.return;
                }
                d.sibling.return = d.return, d = d.sibling;
              }
              e.stateNode = f;
              t: switch (be(f, o, c), o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c = !!c.autoFocus;
                  break t;
                case "img":
                  c = !0;
                  break t;
                default:
                  c = !1;
              }
              c && fu(e);
            }
          }
          return te(e), Nd(
            e,
            e.type,
            t === null ? null : t.memoizedProps,
            e.pendingProps,
            a
          ), null;
        case 6:
          if (t && e.stateNode != null)
            t.memoizedProps !== c && fu(e);
          else {
            if (typeof c != "string" && e.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (t = xl(qa.current), a = Q(), vi(e)) {
              if (t = e.stateNode, a = e.memoizedProps, o = !kc, c = null, f = ia, f !== null)
                switch (f.tag) {
                  case 3:
                    o && (o = Sv(
                      t,
                      a,
                      c
                    ), o !== null && (pi(e, 0).serverProps = o));
                    break;
                  case 27:
                  case 5:
                    c = f.memoizedProps, o && (o = Sv(
                      t,
                      a,
                      c
                    ), o !== null && (pi(
                      e,
                      0
                    ).serverProps = o));
                }
              t[Te] = e, t = !!(t.nodeValue === a || c !== null && c.suppressHydrationWarning === !0 || Ym(t.nodeValue, a)), t || Fa(e, !0);
            } else
              o = a.ancestorInfo.current, o != null && Pf(
                c,
                o.tag,
                a.ancestorInfo.implicitRootScope
              ), t = $s(t).createTextNode(
                c
              ), t[Te] = e, e.stateNode = t;
          }
          return te(e), null;
        case 31:
          if (a = e.memoizedState, t === null || t.memoizedState !== null) {
            if (c = vi(e), a !== null) {
              if (t === null) {
                if (!c)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t)
                  throw Error(
                    "Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                t[Te] = e, te(e), (e.mode & At) !== dt && a !== null && (t = e.child, t !== null && (e.treeBaseDuration -= t.treeBaseDuration));
              } else
                Ec(), Tc(), (e.flags & 128) === 0 && (a = e.memoizedState = null), e.flags |= 4, te(e), (e.mode & At) !== dt && a !== null && (t = e.child, t !== null && (e.treeBaseDuration -= t.treeBaseDuration));
              t = !1;
            } else
              a = is(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), t = !0;
            if (!t)
              return e.flags & 256 ? (rl(e), e) : (rl(e), null);
            if ((e.flags & 128) !== 0)
              throw Error(
                "Client rendering an Activity suspended it again. This is a bug in React."
              );
          }
          return te(e), null;
        case 13:
          if (c = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
            if (o = c, f = vi(e), o !== null && o.dehydrated !== null) {
              if (t === null) {
                if (!f)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (f = e.memoizedState, f = f !== null ? f.dehydrated : null, !f)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                f[Te] = e, te(e), (e.mode & At) !== dt && o !== null && (o = e.child, o !== null && (e.treeBaseDuration -= o.treeBaseDuration));
              } else
                Ec(), Tc(), (e.flags & 128) === 0 && (o = e.memoizedState = null), e.flags |= 4, te(e), (e.mode & At) !== dt && o !== null && (o = e.child, o !== null && (e.treeBaseDuration -= o.treeBaseDuration));
              o = !1;
            } else
              o = is(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = o), o = !0;
            if (!o)
              return e.flags & 256 ? (rl(e), e) : (rl(e), null);
          }
          return rl(e), (e.flags & 128) !== 0 ? (e.lanes = a, (e.mode & At) !== dt && bi(e), e) : (a = c !== null, t = t !== null && t.memoizedState !== null, a && (c = e.child, o = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (o = c.alternate.memoizedState.cachePool.pool), f = null, c.memoizedState !== null && c.memoizedState.cachePool !== null && (f = c.memoizedState.cachePool.pool), f !== o && (c.flags |= 2048)), a !== t && a && (e.child.flags |= 8192), Zo(e, e.updateQueue), te(e), (e.mode & At) !== dt && a && (t = e.child, t !== null && (e.treeBaseDuration -= t.treeBaseDuration)), null);
        case 4:
          return O(e), t === null && Qc(
            e.stateNode.containerInfo
          ), te(e), null;
        case 10:
          return bn(e.type, e), te(e), null;
        case 19:
          if (_t(nl, e), c = e.memoizedState, c === null) return te(e), null;
          if (o = (e.flags & 128) !== 0, f = c.rendering, f === null)
            if (o) Lo(c, !1);
            else {
              if (qe !== oo || t !== null && (t.flags & 128) !== 0)
                for (t = e.child; t !== null; ) {
                  if (f = Ei(t), f !== null) {
                    for (e.flags |= 128, Lo(c, !1), t = f.updateQueue, e.updateQueue = t, Zo(e, t), e.subtreeFlags = 0, t = a, a = e.child; a !== null; )
                      H0(a, t), a = a.sibling;
                    return Ot(
                      nl,
                      nl.current & wh | jy,
                      e
                    ), Nt && Sn(e, c.treeForkCount), e.child;
                  }
                  t = t.sibling;
                }
              c.tail !== null && yl() > m1 && (e.flags |= 128, o = !0, Lo(c, !1), e.lanes = 4194304);
            }
          else {
            if (!o)
              if (t = Ei(f), t !== null) {
                if (e.flags |= 128, o = !0, t = t.updateQueue, e.updateQueue = t, Zo(e, t), Lo(c, !0), c.tail === null && c.tailMode === "hidden" && !f.alternate && !Nt)
                  return te(e), null;
              } else
                2 * yl() - c.renderingStartTime > m1 && a !== 536870912 && (e.flags |= 128, o = !0, Lo(c, !1), e.lanes = 4194304);
            c.isBackwards ? (f.sibling = e.child, e.child = f) : (t = c.last, t !== null ? t.sibling = f : e.child = f, c.last = f);
          }
          return c.tail !== null ? (t = c.tail, c.rendering = t, c.tail = t.sibling, c.renderingStartTime = yl(), t.sibling = null, a = nl.current, a = o ? a & wh | jy : a & wh, Ot(nl, a, e), Nt && Sn(e, c.treeForkCount), t) : (te(e), null);
        case 22:
        case 23:
          return rl(e), zn(e), c = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== c && (e.flags |= 8192) : c && (e.flags |= 8192), c ? (a & 536870912) !== 0 && (e.flags & 128) === 0 && (te(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : te(e), a = e.updateQueue, a !== null && Zo(e, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), c = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (c = e.memoizedState.cachePool.pool), c !== a && (e.flags |= 2048), t !== null && _t(Sr, e), null;
        case 24:
          return a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), bn(pl, e), te(e), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + e.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Qp(t, e) {
      switch (id(e), e.tag) {
        case 1:
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, (e.mode & At) !== dt && bi(e), e) : null;
        case 3:
          return bn(pl, e), O(e), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
        case 26:
        case 27:
        case 5:
          return ct(e), null;
        case 31:
          if (e.memoizedState !== null) {
            if (rl(e), e.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            Tc();
          }
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, (e.mode & At) !== dt && bi(e), e) : null;
        case 13:
          if (rl(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
            if (e.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            Tc();
          }
          return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, (e.mode & At) !== dt && bi(e), e) : null;
        case 19:
          return _t(nl, e), null;
        case 4:
          return O(e), null;
        case 10:
          return bn(e.type, e), null;
        case 22:
        case 23:
          return rl(e), zn(e), t !== null && _t(Sr, e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, (e.mode & At) !== dt && bi(e), e) : null;
        case 24:
          return bn(pl, e), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function rm(t, e) {
      switch (id(e), e.tag) {
        case 3:
          bn(pl, e), O(e);
          break;
        case 26:
        case 27:
        case 5:
          ct(e);
          break;
        case 4:
          O(e);
          break;
        case 31:
          e.memoizedState !== null && rl(e);
          break;
        case 13:
          rl(e);
          break;
        case 19:
          _t(nl, e);
          break;
        case 10:
          bn(e.type, e);
          break;
        case 22:
        case 23:
          rl(e), zn(e), t !== null && _t(Sr, e);
          break;
        case 24:
          bn(pl, e);
      }
    }
    function su(t) {
      return (t.mode & At) !== dt;
    }
    function Vp(t, e) {
      su(t) ? (He(), Fu(e, t), $l()) : Fu(e, t);
    }
    function xd(t, e, a) {
      su(t) ? (He(), xc(
        a,
        t,
        e
      ), $l()) : xc(
        a,
        t,
        e
      );
    }
    function Fu(t, e) {
      try {
        var a = e.updateQueue, c = a !== null ? a.lastEffect : null;
        if (c !== null) {
          var o = c.next;
          a = o;
          do {
            if ((a.tag & t) === t && (c = void 0, (t & Qa) !== a1 && (t0 = !0), c = W(
              e,
              U3,
              a
            ), (t & Qa) !== a1 && (t0 = !1), c !== void 0 && typeof c != "function")) {
              var f = void 0;
              f = (a.tag & Xn) !== 0 ? "useLayoutEffect" : (a.tag & Qa) !== 0 ? "useInsertionEffect" : "useEffect";
              var d = void 0;
              d = c === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof c.then == "function" ? `

It looks like you wrote ` + f + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + f + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + c, W(
                e,
                function(h, y) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    h,
                    y
                  );
                },
                f,
                d
              );
            }
            a = a.next;
          } while (a !== o);
        }
      } catch (h) {
        St(e, e.return, h);
      }
    }
    function xc(t, e, a) {
      try {
        var c = e.updateQueue, o = c !== null ? c.lastEffect : null;
        if (o !== null) {
          var f = o.next;
          c = f;
          do {
            if ((c.tag & t) === t) {
              var d = c.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (t & Qa) !== a1 && (t0 = !0), o = e, W(
                o,
                _3,
                o,
                a,
                h
              ), (t & Qa) !== a1 && (t0 = !1));
            }
            c = c.next;
          } while (c !== f);
        }
      } catch (y) {
        St(e, e.return, y);
      }
    }
    function Ns(t, e) {
      su(t) ? (He(), Fu(e, t), $l()) : Fu(e, t);
    }
    function qd(t, e, a) {
      su(t) ? (He(), xc(
        a,
        t,
        e
      ), $l()) : xc(
        a,
        t,
        e
      );
    }
    function dm(t) {
      var e = t.updateQueue;
      if (e !== null) {
        var a = t.stateNode;
        t.type.defaultProps || "ref" in t.memoizedProps || Wh || (a.props !== t.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          et(t) || "instance"
        ), a.state !== t.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          et(t) || "instance"
        ));
        try {
          W(
            t,
            Ho,
            e,
            a
          );
        } catch (c) {
          St(t, t.return, c);
        }
      }
    }
    function xs(t, e, a) {
      return t.getSnapshotBeforeUpdate(e, a);
    }
    function Zp(t, e) {
      var a = e.memoizedProps, c = e.memoizedState;
      e = t.stateNode, t.type.defaultProps || "ref" in t.memoizedProps || Wh || (e.props !== t.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        et(t) || "instance"
      ), e.state !== t.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        et(t) || "instance"
      ));
      try {
        var o = ou(
          t.type,
          a
        ), f = W(
          t,
          xs,
          e,
          o,
          c
        );
        a = BS, f !== void 0 || a.has(t.type) || (a.add(t.type), W(t, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            et(t)
          );
        })), e.__reactInternalSnapshotBeforeUpdate = f;
      } catch (d) {
        St(t, t.return, d);
      }
    }
    function Yd(t, e, a) {
      a.props = ou(
        t.type,
        t.memoizedProps
      ), a.state = t.memoizedState, su(t) ? (He(), W(
        t,
        I2,
        t,
        e,
        a
      ), $l()) : W(
        t,
        I2,
        t,
        e,
        a
      );
    }
    function Lp(t) {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        if (typeof e == "function")
          if (su(t))
            try {
              He(), t.refCleanup = e(a);
            } finally {
              $l();
            }
          else t.refCleanup = e(a);
        else
          typeof e == "string" ? console.error("String refs are no longer supported.") : e.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            et(t)
          ), e.current = a;
      }
    }
    function xi(t, e) {
      try {
        W(t, Lp, t);
      } catch (a) {
        St(t, e, a);
      }
    }
    function an(t, e) {
      var a = t.ref, c = t.refCleanup;
      if (a !== null)
        if (typeof c == "function")
          try {
            if (su(t))
              try {
                He(), W(t, c);
              } finally {
                $l(t);
              }
            else W(t, c);
          } catch (o) {
            St(t, e, o);
          } finally {
            t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
          }
        else if (typeof a == "function")
          try {
            if (su(t))
              try {
                He(), W(t, a, null);
              } finally {
                $l(t);
              }
            else W(t, a, null);
          } catch (o) {
            St(t, e, o);
          }
        else a.current = null;
    }
    function hm(t, e, a, c) {
      var o = t.memoizedProps, f = o.id, d = o.onCommit;
      o = o.onRender, e = e === null ? "mount" : "update", Fv && (e = "nested-update"), typeof o == "function" && o(
        f,
        e,
        t.actualDuration,
        t.treeBaseDuration,
        t.actualStartTime,
        a
      ), typeof d == "function" && d(f, e, c, a);
    }
    function wp(t, e, a, c) {
      var o = t.memoizedProps;
      t = o.id, o = o.onPostCommit, e = e === null ? "mount" : "update", Fv && (e = "nested-update"), typeof o == "function" && o(
        t,
        e,
        c,
        a
      );
    }
    function qc(t) {
      var e = t.type, a = t.memoizedProps, c = t.stateNode;
      try {
        W(
          t,
          nv,
          c,
          e,
          a,
          t
        );
      } catch (o) {
        St(t, t.return, o);
      }
    }
    function jd(t, e, a) {
      try {
        W(
          t,
          nh,
          t.stateNode,
          t.type,
          a,
          e,
          t
        );
      } catch (c) {
        St(t, t.return, c);
      }
    }
    function mm(t) {
      return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Zc(t.type) || t.tag === 4;
    }
    function Gd(t) {
      t: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || mm(t.return)) return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
          if (t.tag === 27 && Zc(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function wo(t, e, a) {
      var c = t.tag;
      if (c === 5 || c === 6)
        t = t.stateNode, e ? (cv(a), (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, e)) : (cv(a), e = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, e.appendChild(t), a = a._reactRootContainer, a != null || e.onclick !== null || (e.onclick = Wa));
      else if (c !== 4 && (c === 27 && Zc(t.type) && (a = t.stateNode, e = null), t = t.child, t !== null))
        for (wo(t, e, a), t = t.sibling; t !== null; )
          wo(t, e, a), t = t.sibling;
    }
    function qs(t, e, a) {
      var c = t.tag;
      if (c === 5 || c === 6)
        t = t.stateNode, e ? a.insertBefore(t, e) : a.appendChild(t);
      else if (c !== 4 && (c === 27 && Zc(t.type) && (a = t.stateNode), t = t.child, t !== null))
        for (qs(t, e, a), t = t.sibling; t !== null; )
          qs(t, e, a), t = t.sibling;
    }
    function ym(t) {
      for (var e, a = t.return; a !== null; ) {
        if (mm(a)) {
          e = a;
          break;
        }
        a = a.return;
      }
      if (e == null)
        throw Error(
          "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
        );
      switch (e.tag) {
        case 27:
          e = e.stateNode, a = Gd(t), qs(
            t,
            a,
            e
          );
          break;
        case 5:
          a = e.stateNode, e.flags & 32 && (uh(a), e.flags &= -33), e = Gd(t), qs(
            t,
            e,
            a
          );
          break;
        case 3:
        case 4:
          e = e.stateNode.containerInfo, a = Gd(t), wo(
            t,
            a,
            e
          );
          break;
        default:
          throw Error(
            "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
          );
      }
    }
    function pm(t) {
      var e = t.stateNode, a = t.memoizedProps;
      try {
        W(
          t,
          gu,
          t.type,
          a,
          e,
          t
        );
      } catch (c) {
        St(t, t.return, c);
      }
    }
    function vm(t, e) {
      return e.tag === 31 ? (e = e.memoizedState, t.memoizedState !== null && e === null) : e.tag === 13 ? (t = t.memoizedState, e = e.memoizedState, t !== null && t.dehydrated !== null && (e === null || e.dehydrated === null)) : e.tag === 3 ? t.memoizedState.isDehydrated && (e.flags & 256) === 0 : !1;
    }
    function K1(t, e) {
      if (t = t.containerInfo, a2 = C1, t = td(t), z0(t)) {
        if ("selectionStart" in t)
          var a = {
            start: t.selectionStart,
            end: t.selectionEnd
          };
        else
          t: {
            a = (a = t.ownerDocument) && a.defaultView || window;
            var c = a.getSelection && a.getSelection();
            if (c && c.rangeCount !== 0) {
              a = c.anchorNode;
              var o = c.anchorOffset, f = c.focusNode;
              c = c.focusOffset;
              try {
                a.nodeType, f.nodeType;
              } catch {
                a = null;
                break t;
              }
              var d = 0, h = -1, y = -1, p = 0, A = 0, D = t, S = null;
              e: for (; ; ) {
                for (var C; D !== a || o !== 0 && D.nodeType !== 3 || (h = d + o), D !== f || c !== 0 && D.nodeType !== 3 || (y = d + c), D.nodeType === 3 && (d += D.nodeValue.length), (C = D.firstChild) !== null; )
                  S = D, D = C;
                for (; ; ) {
                  if (D === t) break e;
                  if (S === a && ++p === o && (h = d), S === f && ++A === c && (y = d), (C = D.nextSibling) !== null) break;
                  D = S, S = D.parentNode;
                }
                D = C;
              }
              a = h === -1 || y === -1 ? null : { start: h, end: y };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (n2 = {
        focusedElem: t,
        selectionRange: a
      }, C1 = !1, Vl = e; Vl !== null; )
        if (e = Vl, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
          t.return = e, Vl = t;
        else
          for (; Vl !== null; ) {
            switch (t = e = Vl, a = t.alternate, o = t.flags, t.tag) {
              case 0:
                if ((o & 4) !== 0 && (t = t.updateQueue, t = t !== null ? t.events : null, t !== null))
                  for (a = 0; a < t.length; a++)
                    o = t[a], o.ref.impl = o.nextImpl;
                break;
              case 11:
              case 15:
                break;
              case 1:
                (o & 1024) !== 0 && a !== null && Zp(t, a);
                break;
              case 3:
                if ((o & 1024) !== 0) {
                  if (t = t.stateNode.containerInfo, a = t.nodeType, a === 9)
                    nf(t);
                  else if (a === 1)
                    switch (t.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        nf(t);
                        break;
                      default:
                        t.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((o & 1024) !== 0)
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            if (t = e.sibling, t !== null) {
              t.return = e.return, Vl = t;
              break;
            }
            Vl = e.return;
          }
    }
    function Xd(t, e, a) {
      var c = ge(), o = Pa(), f = za(), d = tn(), h = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ca(t, a), h & 4 && Vp(a, Xn | Cu);
          break;
        case 1:
          if (Ca(t, a), h & 4)
            if (t = a.stateNode, e === null)
              a.type.defaultProps || "ref" in a.memoizedProps || Wh || (t.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                et(a) || "instance"
              ), t.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                et(a) || "instance"
              )), su(a) ? (He(), W(
                a,
                Dg,
                a,
                t
              ), $l()) : W(
                a,
                Dg,
                a,
                t
              );
            else {
              var y = ou(
                a.type,
                e.memoizedProps
              );
              e = e.memoizedState, a.type.defaultProps || "ref" in a.memoizedProps || Wh || (t.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                et(a) || "instance"
              ), t.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                et(a) || "instance"
              )), su(a) ? (He(), W(
                a,
                W2,
                a,
                t,
                y,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              ), $l()) : W(
                a,
                W2,
                a,
                t,
                y,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            }
          h & 64 && dm(a), h & 512 && xi(a, a.return);
          break;
        case 3:
          if (e = Pn(), Ca(t, a), h & 64 && (h = a.updateQueue, h !== null)) {
            if (y = null, a.child !== null)
              switch (a.child.tag) {
                case 27:
                case 5:
                  y = a.child.stateNode;
                  break;
                case 1:
                  y = a.child.stateNode;
              }
            try {
              W(
                a,
                Ho,
                h,
                y
              );
            } catch (A) {
              St(a, a.return, A);
            }
          }
          t.effectDuration += Ro(e);
          break;
        case 27:
          e === null && h & 4 && pm(a);
        case 26:
        case 5:
          if (Ca(t, a), e === null) {
            if (h & 4) qc(a);
            else if (h & 64) {
              t = a.type, e = a.memoizedProps, y = a.stateNode;
              try {
                W(
                  a,
                  uv,
                  y,
                  t,
                  e,
                  a
                );
              } catch (A) {
                St(
                  a,
                  a.return,
                  A
                );
              }
            }
          }
          h & 512 && xi(a, a.return);
          break;
        case 12:
          if (h & 4) {
            h = Pn(), Ca(t, a), t = a.stateNode, t.effectDuration += Kl(h);
            try {
              W(
                a,
                hm,
                a,
                e,
                Rf,
                t.effectDuration
              );
            } catch (A) {
              St(a, a.return, A);
            }
          } else Ca(t, a);
          break;
        case 31:
          Ca(t, a), h & 4 && Sm(t, a);
          break;
        case 13:
          Ca(t, a), h & 4 && bm(t, a), h & 64 && (t = a.memoizedState, t !== null && (t = t.dehydrated, t !== null && (h = Pu.bind(
            null,
            a
          ), vv(t, h))));
          break;
        case 22:
          if (h = a.memoizedState !== null || io, !h) {
            e = e !== null && e.memoizedState !== null || bl, y = io;
            var p = bl;
            io = h, (bl = e) && !p ? (Rn(
              t,
              a,
              (a.subtreeFlags & 8772) !== 0
            ), (a.mode & At) !== dt && 0 <= ut && 0 <= ft && 0.05 < ft - ut && ed(
              a,
              ut,
              ft
            )) : Ca(t, a), io = y, bl = p;
          }
          break;
        case 30:
          break;
        default:
          Ca(t, a);
      }
      (a.mode & At) !== dt && 0 <= ut && 0 <= ft && ((Je || 0.05 < xe) && gn(
        a,
        ut,
        ft,
        xe,
        _e
      ), a.alternate === null && a.return !== null && a.return.alternate !== null && 0.05 < ft - ut && (vm(
        a.return.alternate,
        a.return
      ) || ka(
        a,
        ut,
        ft,
        "Mount"
      ))), fl(c), Aa(o), _e = f, Je = d;
    }
    function Le(t) {
      var e = t.alternate;
      e !== null && (t.alternate = null, Le(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && f0(e)), t.stateNode = null, t._debugOwner = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
    }
    function ye(t, e, a) {
      for (a = a.child; a !== null; )
        gm(
          t,
          e,
          a
        ), a = a.sibling;
    }
    function gm(t, e, a) {
      if (ll && typeof ll.onCommitFiberUnmount == "function")
        try {
          ll.onCommitFiberUnmount($i, a);
        } catch (p) {
          bu || (bu = !0, console.error(
            "React instrumentation encountered an error: %o",
            p
          ));
        }
      var c = ge(), o = Pa(), f = za(), d = tn();
      switch (a.tag) {
        case 26:
          bl || an(a, e), ye(
            t,
            e,
            a
          ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (t = a.stateNode, t.parentNode.removeChild(t));
          break;
        case 27:
          bl || an(a, e);
          var h = Tl, y = fn;
          Zc(a.type) && (Tl = a.stateNode, fn = !1), ye(
            t,
            e,
            a
          ), W(
            a,
            ac,
            a.stateNode
          ), Tl = h, fn = y;
          break;
        case 5:
          bl || an(a, e);
        case 6:
          if (h = Tl, y = fn, Tl = null, ye(
            t,
            e,
            a
          ), Tl = h, fn = y, Tl !== null)
            if (fn)
              try {
                W(
                  a,
                  ov,
                  Tl,
                  a.stateNode
                );
              } catch (p) {
                St(
                  a,
                  e,
                  p
                );
              }
            else
              try {
                W(
                  a,
                  iv,
                  Tl,
                  a.stateNode
                );
              } catch (p) {
                St(
                  a,
                  e,
                  p
                );
              }
          break;
        case 18:
          Tl !== null && (fn ? (t = Tl, Xi(
            t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
            a.stateNode
          ), Li(t)) : Xi(Tl, a.stateNode));
          break;
        case 4:
          h = Tl, y = fn, Tl = a.stateNode.containerInfo, fn = !0, ye(
            t,
            e,
            a
          ), Tl = h, fn = y;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          xc(
            Qa,
            a,
            e
          ), bl || xd(
            a,
            e,
            Xn
          ), ye(
            t,
            e,
            a
          );
          break;
        case 1:
          bl || (an(a, e), h = a.stateNode, typeof h.componentWillUnmount == "function" && Yd(
            a,
            e,
            h
          )), ye(
            t,
            e,
            a
          );
          break;
        case 21:
          ye(
            t,
            e,
            a
          );
          break;
        case 22:
          bl = (h = bl) || a.memoizedState !== null, ye(
            t,
            e,
            a
          ), bl = h;
          break;
        default:
          ye(
            t,
            e,
            a
          );
      }
      (a.mode & At) !== dt && 0 <= ut && 0 <= ft && (Je || 0.05 < xe) && gn(
        a,
        ut,
        ft,
        xe,
        _e
      ), fl(c), Aa(o), _e = f, Je = d;
    }
    function Sm(t, e) {
      if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
        t = t.dehydrated;
        try {
          W(
            e,
            ch,
            t
          );
        } catch (a) {
          St(e, e.return, a);
        }
      }
    }
    function bm(t, e) {
      if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
        try {
          W(
            e,
            Qm,
            t
          );
        } catch (a) {
          St(e, e.return, a);
        }
    }
    function Jp(t) {
      switch (t.tag) {
        case 31:
        case 13:
        case 19:
          var e = t.stateNode;
          return e === null && (e = t.stateNode = new NS()), e;
        case 22:
          return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new NS()), e;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + t.tag + "). This is a bug in React."
          );
      }
    }
    function Yc(t, e) {
      var a = Jp(t);
      e.forEach(function(c) {
        if (!a.has(c)) {
          if (a.add(c), Tu)
            if (kh !== null && Fh !== null)
              Fo(Fh, kh);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          var o = ji.bind(null, t, c);
          c.then(o, o);
        }
      });
    }
    function Pl(t, e) {
      var a = e.deletions;
      if (a !== null)
        for (var c = 0; c < a.length; c++) {
          var o = t, f = e, d = a[c], h = ge(), y = f;
          t: for (; y !== null; ) {
            switch (y.tag) {
              case 27:
                if (Zc(y.type)) {
                  Tl = y.stateNode, fn = !1;
                  break t;
                }
                break;
              case 5:
                Tl = y.stateNode, fn = !1;
                break t;
              case 3:
              case 4:
                Tl = y.stateNode.containerInfo, fn = !0;
                break t;
            }
            y = y.return;
          }
          if (Tl === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          gm(o, f, d), Tl = null, fn = !1, (d.mode & At) !== dt && 0 <= ut && 0 <= ft && 0.05 < ft - ut && ka(
            d,
            ut,
            ft,
            "Unmount"
          ), fl(h), o = d, f = o.alternate, f !== null && (f.return = null), o.return = null;
        }
      if (e.subtreeFlags & 13886)
        for (e = e.child; e !== null; )
          Ys(e, t), e = e.sibling;
    }
    function Ys(t, e) {
      var a = ge(), c = Pa(), o = za(), f = tn(), d = t.alternate, h = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Pl(e, t), ta(t), h & 4 && (xc(
            Qa | Cu,
            t,
            t.return
          ), Fu(Qa | Cu, t), xd(
            t,
            t.return,
            Xn | Cu
          ));
          break;
        case 1:
          if (Pl(e, t), ta(t), h & 512 && (bl || d === null || an(d, d.return)), h & 64 && io && (h = t.updateQueue, h !== null && (d = h.callbacks, d !== null))) {
            var y = h.shared.hiddenCallbacks;
            h.shared.hiddenCallbacks = y === null ? d : y.concat(d);
          }
          break;
        case 26:
          if (y = fc, Pl(e, t), ta(t), h & 512 && (bl || d === null || an(d, d.return)), h & 4) {
            var p = d !== null ? d.memoizedState : null;
            if (h = t.memoizedState, d === null)
              if (h === null)
                if (t.stateNode === null) {
                  t: {
                    h = t.type, d = t.memoizedProps, y = y.ownerDocument || y;
                    e: switch (h) {
                      case "title":
                        p = y.getElementsByTagName(
                          "title"
                        )[0], (!p || p[bf] || p[Te] || p.namespaceURI === bt || p.hasAttribute("itemprop")) && (p = y.createElement(h), y.head.insertBefore(
                          p,
                          y.querySelector(
                            "head > title"
                          )
                        )), be(p, h, d), p[Te] = t, Xe(p), h = p;
                        break t;
                      case "link":
                        var A = of(
                          "link",
                          "href",
                          y
                        ).get(h + (d.href || ""));
                        if (A) {
                          for (var D = 0; D < A.length; D++)
                            if (p = A[D], p.getAttribute("href") === (d.href == null || d.href === "" ? null : d.href) && p.getAttribute("rel") === (d.rel == null ? null : d.rel) && p.getAttribute("title") === (d.title == null ? null : d.title) && p.getAttribute("crossorigin") === (d.crossOrigin == null ? null : d.crossOrigin)) {
                              A.splice(D, 1);
                              break e;
                            }
                        }
                        p = y.createElement(h), be(p, h, d), y.head.appendChild(
                          p
                        );
                        break;
                      case "meta":
                        if (A = of(
                          "meta",
                          "content",
                          y
                        ).get(h + (d.content || ""))) {
                          for (D = 0; D < A.length; D++)
                            if (p = A[D], It(
                              d.content,
                              "content"
                            ), p.getAttribute("content") === (d.content == null ? null : "" + d.content) && p.getAttribute("name") === (d.name == null ? null : d.name) && p.getAttribute("property") === (d.property == null ? null : d.property) && p.getAttribute("http-equiv") === (d.httpEquiv == null ? null : d.httpEquiv) && p.getAttribute("charset") === (d.charSet == null ? null : d.charSet)) {
                              A.splice(D, 1);
                              break e;
                            }
                        }
                        p = y.createElement(h), be(p, h, d), y.head.appendChild(
                          p
                        );
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + h + '". This is a bug in React.'
                        );
                    }
                    p[Te] = t, Xe(p), h = p;
                  }
                  t.stateNode = h;
                } else
                  Tv(
                    y,
                    t.type,
                    t.stateNode
                  );
              else
                t.stateNode = fh(
                  y,
                  h,
                  t.memoizedProps
                );
            else
              p !== h ? (p === null ? d.stateNode !== null && (d = d.stateNode, d.parentNode.removeChild(d)) : p.count--, h === null ? Tv(
                y,
                t.type,
                t.stateNode
              ) : fh(
                y,
                h,
                t.memoizedProps
              )) : h === null && t.stateNode !== null && jd(
                t,
                t.memoizedProps,
                d.memoizedProps
              );
          }
          break;
        case 27:
          Pl(e, t), ta(t), h & 512 && (bl || d === null || an(d, d.return)), d !== null && h & 4 && jd(
            t,
            t.memoizedProps,
            d.memoizedProps
          );
          break;
        case 5:
          if (Pl(e, t), ta(t), h & 512 && (bl || d === null || an(d, d.return)), t.flags & 32) {
            y = t.stateNode;
            try {
              W(
                t,
                uh,
                y
              );
            } catch ($) {
              St(t, t.return, $);
            }
          }
          h & 4 && t.stateNode != null && (y = t.memoizedProps, jd(
            t,
            y,
            d !== null ? d.memoizedProps : y
          )), h & 1024 && (jg = !0, t.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (Pl(e, t), ta(t), h & 4) {
            if (t.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            h = t.memoizedProps, d = d !== null ? d.memoizedProps : h, y = t.stateNode;
            try {
              W(
                t,
                $1,
                y,
                d,
                h
              );
            } catch ($) {
              St(t, t.return, $);
            }
          }
          break;
        case 3:
          if (y = Pn(), R1 = null, p = fc, fc = ih(e.containerInfo), Pl(e, t), fc = p, ta(t), h & 4 && d !== null && d.memoizedState.isDehydrated)
            try {
              W(
                t,
                Xm,
                e.containerInfo
              );
            } catch ($) {
              St(t, t.return, $);
            }
          jg && (jg = !1, Kp(t)), e.effectDuration += Ro(
            y
          );
          break;
        case 4:
          h = fc, fc = ih(
            t.stateNode.containerInfo
          ), Pl(e, t), ta(t), fc = h;
          break;
        case 12:
          h = Pn(), Pl(e, t), ta(t), t.stateNode.effectDuration += Kl(h);
          break;
        case 31:
          Pl(e, t), ta(t), h & 4 && (h = t.updateQueue, h !== null && (t.updateQueue = null, Yc(t, h)));
          break;
        case 13:
          Pl(e, t), ta(t), t.child.flags & 8192 && t.memoizedState !== null != (d !== null && d.memoizedState !== null) && (h1 = yl()), h & 4 && (h = t.updateQueue, h !== null && (t.updateQueue = null, Yc(t, h)));
          break;
        case 22:
          y = t.memoizedState !== null;
          var S = d !== null && d.memoizedState !== null, C = io, w = bl;
          if (io = C || y, bl = w || S, Pl(e, t), bl = w, io = C, S && !y && !C && !w && (t.mode & At) !== dt && 0 <= ut && 0 <= ft && 0.05 < ft - ut && ed(
            t,
            ut,
            ft
          ), ta(t), h & 8192)
            t: for (e = t.stateNode, e._visibility = y ? e._visibility & ~Ey : e._visibility | Ey, !y || d === null || S || io || bl || (jc(t), (t.mode & At) !== dt && 0 <= ut && 0 <= ft && 0.05 < ft - ut && ka(
              t,
              ut,
              ft,
              "Disconnect"
            )), d = null, e = t; ; ) {
              if (e.tag === 5 || e.tag === 26) {
                if (d === null) {
                  S = d = e;
                  try {
                    p = S.stateNode, y ? W(
                      S,
                      sv,
                      p
                    ) : W(
                      S,
                      hv,
                      S.stateNode,
                      S.memoizedProps
                    );
                  } catch ($) {
                    St(S, S.return, $);
                  }
                }
              } else if (e.tag === 6) {
                if (d === null) {
                  S = e;
                  try {
                    A = S.stateNode, y ? W(
                      S,
                      rv,
                      A
                    ) : W(
                      S,
                      mv,
                      A,
                      S.memoizedProps
                    );
                  } catch ($) {
                    St(S, S.return, $);
                  }
                }
              } else if (e.tag === 18) {
                if (d === null) {
                  S = e;
                  try {
                    D = S.stateNode, y ? W(
                      S,
                      fv,
                      D
                    ) : W(
                      S,
                      dv,
                      S.stateNode
                    );
                  } catch ($) {
                    St(S, S.return, $);
                  }
                }
              } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
                e.child.return = e, e = e.child;
                continue;
              }
              if (e === t) break t;
              for (; e.sibling === null; ) {
                if (e.return === null || e.return === t)
                  break t;
                d === e && (d = null), e = e.return;
              }
              d === e && (d = null), e.sibling.return = e.return, e = e.sibling;
            }
          h & 4 && (h = t.updateQueue, h !== null && (d = h.retryQueue, d !== null && (h.retryQueue = null, Yc(t, d))));
          break;
        case 19:
          Pl(e, t), ta(t), h & 4 && (h = t.updateQueue, h !== null && (t.updateQueue = null, Yc(t, h)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          Pl(e, t), ta(t);
      }
      (t.mode & At) !== dt && 0 <= ut && 0 <= ft && ((Je || 0.05 < xe) && gn(
        t,
        ut,
        ft,
        xe,
        _e
      ), t.alternate === null && t.return !== null && t.return.alternate !== null && 0.05 < ft - ut && (vm(
        t.return.alternate,
        t.return
      ) || ka(
        t,
        ut,
        ft,
        "Mount"
      ))), fl(a), Aa(c), _e = o, Je = f;
    }
    function ta(t) {
      var e = t.flags;
      if (e & 2) {
        try {
          W(t, ym, t);
        } catch (a) {
          St(t, t.return, a);
        }
        t.flags &= -3;
      }
      e & 4096 && (t.flags &= -4097);
    }
    function Kp(t) {
      if (t.subtreeFlags & 1024)
        for (t = t.child; t !== null; ) {
          var e = t;
          Kp(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
        }
    }
    function Ca(t, e) {
      if (e.subtreeFlags & 8772)
        for (e = e.child; e !== null; )
          Xd(t, e.alternate, e), e = e.sibling;
    }
    function Qd(t) {
      var e = ge(), a = Pa(), c = za(), o = tn();
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          xd(
            t,
            t.return,
            Xn
          ), jc(t);
          break;
        case 1:
          an(t, t.return);
          var f = t.stateNode;
          typeof f.componentWillUnmount == "function" && Yd(
            t,
            t.return,
            f
          ), jc(t);
          break;
        case 27:
          W(
            t,
            ac,
            t.stateNode
          );
        case 26:
        case 5:
          an(t, t.return), jc(t);
          break;
        case 22:
          t.memoizedState === null && jc(t);
          break;
        case 30:
          jc(t);
          break;
        default:
          jc(t);
      }
      (t.mode & At) !== dt && 0 <= ut && 0 <= ft && (Je || 0.05 < xe) && gn(
        t,
        ut,
        ft,
        xe,
        _e
      ), fl(e), Aa(a), _e = c, Je = o;
    }
    function jc(t) {
      for (t = t.child; t !== null; )
        Qd(t), t = t.sibling;
    }
    function Tm(t, e, a, c) {
      var o = ge(), f = Pa(), d = za(), h = tn(), y = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Rn(
            t,
            a,
            c
          ), Vp(a, Xn);
          break;
        case 1:
          if (Rn(
            t,
            a,
            c
          ), e = a.stateNode, typeof e.componentDidMount == "function" && W(
            a,
            Dg,
            a,
            e
          ), e = a.updateQueue, e !== null) {
            t = a.stateNode;
            try {
              W(
                a,
                V0,
                e,
                t
              );
            } catch (p) {
              St(a, a.return, p);
            }
          }
          c && y & 64 && dm(a), xi(a, a.return);
          break;
        case 27:
          pm(a);
        case 26:
        case 5:
          Rn(
            t,
            a,
            c
          ), c && e === null && y & 4 && qc(a), xi(a, a.return);
          break;
        case 12:
          if (c && y & 4) {
            y = Pn(), Rn(
              t,
              a,
              c
            ), c = a.stateNode, c.effectDuration += Kl(y);
            try {
              W(
                a,
                hm,
                a,
                e,
                Rf,
                c.effectDuration
              );
            } catch (p) {
              St(a, a.return, p);
            }
          } else
            Rn(
              t,
              a,
              c
            );
          break;
        case 31:
          Rn(
            t,
            a,
            c
          ), c && y & 4 && Sm(t, a);
          break;
        case 13:
          Rn(
            t,
            a,
            c
          ), c && y & 4 && bm(t, a);
          break;
        case 22:
          a.memoizedState === null && Rn(
            t,
            a,
            c
          ), xi(a, a.return);
          break;
        case 30:
          break;
        default:
          Rn(
            t,
            a,
            c
          );
      }
      (a.mode & At) !== dt && 0 <= ut && 0 <= ft && (Je || 0.05 < xe) && gn(
        a,
        ut,
        ft,
        xe,
        _e
      ), fl(o), Aa(f), _e = d, Je = h;
    }
    function Rn(t, e, a) {
      for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; )
        Tm(
          t,
          e.alternate,
          e,
          a
        ), e = e.sibling;
    }
    function js(t, e) {
      var a = null;
      t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== a && (t != null && gi(t), a != null && ss(a));
    }
    function Gs(t, e) {
      t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (gi(e), t != null && ss(t));
    }
    function Ha(t, e, a, c, o) {
      if (e.subtreeFlags & 10256 || e.actualDuration !== 0 && (e.alternate === null || e.alternate.child !== e.child))
        for (e = e.child; e !== null; ) {
          var f = e.sibling;
          Em(
            t,
            e,
            a,
            c,
            f !== null ? f.actualStartTime : o
          ), e = f;
        }
    }
    function Em(t, e, a, c, o) {
      var f = ge(), d = Pa(), h = za(), y = tn(), p = zf, A = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          (e.mode & At) !== dt && 0 < e.actualStartTime && (e.flags & 1) !== 0 && ld(
            e,
            e.actualStartTime,
            o,
            _l,
            a
          ), Ha(
            t,
            e,
            a,
            c,
            o
          ), A & 2048 && Ns(e, Va | Cu);
          break;
        case 1:
          (e.mode & At) !== dt && 0 < e.actualStartTime && ((e.flags & 128) !== 0 ? O0(
            e,
            e.actualStartTime,
            o,
            []
          ) : (e.flags & 1) !== 0 && ld(
            e,
            e.actualStartTime,
            o,
            _l,
            a
          )), Ha(
            t,
            e,
            a,
            c,
            o
          );
          break;
        case 3:
          var D = Pn(), S = _l;
          _l = e.alternate !== null && e.alternate.memoizedState.isDehydrated && (e.flags & 256) === 0, Ha(
            t,
            e,
            a,
            c,
            o
          ), _l = S, A & 2048 && (a = null, e.alternate !== null && (a = e.alternate.memoizedState.cache), c = e.memoizedState.cache, c !== a && (gi(c), a != null && ss(a))), t.passiveEffectDuration += Ro(
            D
          );
          break;
        case 12:
          if (A & 2048) {
            A = Pn(), Ha(
              t,
              e,
              a,
              c,
              o
            ), t = e.stateNode, t.passiveEffectDuration += Kl(A);
            try {
              W(
                e,
                wp,
                e,
                e.alternate,
                Rf,
                t.passiveEffectDuration
              );
            } catch (C) {
              St(e, e.return, C);
            }
          } else
            Ha(
              t,
              e,
              a,
              c,
              o
            );
          break;
        case 31:
          A = _l, D = e.alternate !== null ? e.alternate.memoizedState : null, S = e.memoizedState, D !== null && S === null ? (S = e.deletions, S !== null && 0 < S.length && S[0].tag === 18 ? (_l = !1, D = D.hydrationErrors, D !== null && O0(
            e,
            e.actualStartTime,
            o,
            D
          )) : _l = !0) : _l = !1, Ha(
            t,
            e,
            a,
            c,
            o
          ), _l = A;
          break;
        case 13:
          A = _l, D = e.alternate !== null ? e.alternate.memoizedState : null, S = e.memoizedState, D === null || D.dehydrated === null || S !== null && S.dehydrated !== null ? _l = !1 : (S = e.deletions, S !== null && 0 < S.length && S[0].tag === 18 ? (_l = !1, D = D.hydrationErrors, D !== null && O0(
            e,
            e.actualStartTime,
            o,
            D
          )) : _l = !0), Ha(
            t,
            e,
            a,
            c,
            o
          ), _l = A;
          break;
        case 23:
          break;
        case 22:
          S = e.stateNode, D = e.alternate, e.memoizedState !== null ? S._visibility & Fi ? Ha(
            t,
            e,
            a,
            c,
            o
          ) : qi(
            t,
            e,
            a,
            c,
            o
          ) : S._visibility & Fi ? Ha(
            t,
            e,
            a,
            c,
            o
          ) : (S._visibility |= Fi, Gc(
            t,
            e,
            a,
            c,
            (e.subtreeFlags & 10256) !== 0 || e.actualDuration !== 0 && (e.alternate === null || e.alternate.child !== e.child),
            o
          ), (e.mode & At) === dt || _l || (t = e.actualStartTime, 0 <= t && 0.05 < o - t && ed(e, t, o), 0 <= ut && 0 <= ft && 0.05 < ft - ut && ed(
            e,
            ut,
            ft
          ))), A & 2048 && js(
            D,
            e
          );
          break;
        case 24:
          Ha(
            t,
            e,
            a,
            c,
            o
          ), A & 2048 && Gs(e.alternate, e);
          break;
        default:
          Ha(
            t,
            e,
            a,
            c,
            o
          );
      }
      (e.mode & At) !== dt && ((t = !_l && e.alternate === null && e.return !== null && e.return.alternate !== null) && (a = e.actualStartTime, 0 <= a && 0.05 < o - a && ka(
        e,
        a,
        o,
        "Mount"
      )), 0 <= ut && 0 <= ft && ((Je || 0.05 < xe) && gn(
        e,
        ut,
        ft,
        xe,
        _e
      ), t && 0.05 < ft - ut && ka(
        e,
        ut,
        ft,
        "Mount"
      ))), fl(f), Aa(d), _e = h, Je = y, zf = p;
    }
    function Gc(t, e, a, c, o, f) {
      for (o = o && ((e.subtreeFlags & 10256) !== 0 || e.actualDuration !== 0 && (e.alternate === null || e.alternate.child !== e.child)), e = e.child; e !== null; ) {
        var d = e.sibling;
        Xs(
          t,
          e,
          a,
          c,
          o,
          d !== null ? d.actualStartTime : f
        ), e = d;
      }
    }
    function Xs(t, e, a, c, o, f) {
      var d = ge(), h = Pa(), y = za(), p = tn(), A = zf;
      o && (e.mode & At) !== dt && 0 < e.actualStartTime && (e.flags & 1) !== 0 && ld(
        e,
        e.actualStartTime,
        f,
        _l,
        a
      );
      var D = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Gc(
            t,
            e,
            a,
            c,
            o,
            f
          ), Ns(e, Va);
          break;
        case 23:
          break;
        case 22:
          var S = e.stateNode;
          e.memoizedState !== null ? S._visibility & Fi ? Gc(
            t,
            e,
            a,
            c,
            o,
            f
          ) : qi(
            t,
            e,
            a,
            c,
            f
          ) : (S._visibility |= Fi, Gc(
            t,
            e,
            a,
            c,
            o,
            f
          )), o && D & 2048 && js(
            e.alternate,
            e
          );
          break;
        case 24:
          Gc(
            t,
            e,
            a,
            c,
            o,
            f
          ), o && D & 2048 && Gs(e.alternate, e);
          break;
        default:
          Gc(
            t,
            e,
            a,
            c,
            o,
            f
          );
      }
      (e.mode & At) !== dt && 0 <= ut && 0 <= ft && (Je || 0.05 < xe) && gn(
        e,
        ut,
        ft,
        xe,
        _e
      ), fl(d), Aa(h), _e = y, Je = p, zf = A;
    }
    function qi(t, e, a, c, o) {
      if (e.subtreeFlags & 10256 || e.actualDuration !== 0 && (e.alternate === null || e.alternate.child !== e.child))
        for (var f = e.child; f !== null; ) {
          e = f.sibling;
          var d = t, h = a, y = c, p = e !== null ? e.actualStartTime : o, A = zf;
          (f.mode & At) !== dt && 0 < f.actualStartTime && (f.flags & 1) !== 0 && ld(
            f,
            f.actualStartTime,
            p,
            _l,
            h
          );
          var D = f.flags;
          switch (f.tag) {
            case 22:
              qi(
                d,
                f,
                h,
                y,
                p
              ), D & 2048 && js(f.alternate, f);
              break;
            case 24:
              qi(
                d,
                f,
                h,
                y,
                p
              ), D & 2048 && Gs(f.alternate, f);
              break;
            default:
              qi(
                d,
                f,
                h,
                y,
                p
              );
          }
          zf = A, f = e;
        }
    }
    function Yi(t, e, a) {
      if (t.subtreeFlags & Vy)
        for (t = t.child; t !== null; )
          Vd(
            t,
            e,
            a
          ), t = t.sibling;
    }
    function Vd(t, e, a) {
      switch (t.tag) {
        case 26:
          Yi(
            t,
            e,
            a
          ), t.flags & Vy && t.memoizedState !== null && Jm(
            a,
            fc,
            t.memoizedState,
            t.memoizedProps
          );
          break;
        case 5:
          Yi(
            t,
            e,
            a
          );
          break;
        case 3:
        case 4:
          var c = fc;
          fc = ih(
            t.stateNode.containerInfo
          ), Yi(
            t,
            e,
            a
          ), fc = c;
          break;
        case 22:
          t.memoizedState === null && (c = t.alternate, c !== null && c.memoizedState !== null ? (c = Vy, Vy = 16777216, Yi(
            t,
            e,
            a
          ), Vy = c) : Yi(
            t,
            e,
            a
          ));
          break;
        default:
          Yi(
            t,
            e,
            a
          );
      }
    }
    function Am(t) {
      var e = t.alternate;
      if (e !== null && (t = e.child, t !== null)) {
        e.child = null;
        do
          e = t.sibling, t.sibling = null, t = e;
        while (t !== null);
      }
    }
    function Ba(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var a = 0; a < e.length; a++) {
            var c = e[a], o = ge();
            Vl = c, ru(
              c,
              t
            ), (c.mode & At) !== dt && 0 <= ut && 0 <= ft && 0.05 < ft - ut && ka(
              c,
              ut,
              ft,
              "Unmount"
            ), fl(o);
          }
        Am(t);
      }
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          Zd(t), t = t.sibling;
    }
    function Zd(t) {
      var e = ge(), a = Pa(), c = za(), o = tn();
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Ba(t), t.flags & 2048 && qd(
            t,
            t.return,
            Va | Cu
          );
          break;
        case 3:
          var f = Pn();
          Ba(t), t.stateNode.passiveEffectDuration += Ro(f);
          break;
        case 12:
          f = Pn(), Ba(t), t.stateNode.passiveEffectDuration += Kl(f);
          break;
        case 22:
          f = t.stateNode, t.memoizedState !== null && f._visibility & Fi && (t.return === null || t.return.tag !== 13) ? (f._visibility &= ~Fi, Ld(t), (t.mode & At) !== dt && 0 <= ut && 0 <= ft && 0.05 < ft - ut && ka(
            t,
            ut,
            ft,
            "Disconnect"
          )) : Ba(t);
          break;
        default:
          Ba(t);
      }
      (t.mode & At) !== dt && 0 <= ut && 0 <= ft && (Je || 0.05 < xe) && gn(
        t,
        ut,
        ft,
        xe,
        _e
      ), fl(e), Aa(a), Je = o, _e = c;
    }
    function Ld(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var a = 0; a < e.length; a++) {
            var c = e[a], o = ge();
            Vl = c, ru(
              c,
              t
            ), (c.mode & At) !== dt && 0 <= ut && 0 <= ft && 0.05 < ft - ut && ka(
              c,
              ut,
              ft,
              "Unmount"
            ), fl(o);
          }
        Am(t);
      }
      for (t = t.child; t !== null; )
        zm(t), t = t.sibling;
    }
    function zm(t) {
      var e = ge(), a = Pa(), c = za(), o = tn();
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          qd(
            t,
            t.return,
            Va
          ), Ld(t);
          break;
        case 22:
          var f = t.stateNode;
          f._visibility & Fi && (f._visibility &= ~Fi, Ld(t));
          break;
        default:
          Ld(t);
      }
      (t.mode & At) !== dt && 0 <= ut && 0 <= ft && (Je || 0.05 < xe) && gn(
        t,
        ut,
        ft,
        xe,
        _e
      ), fl(e), Aa(a), Je = o, _e = c;
    }
    function ru(t, e) {
      for (; Vl !== null; ) {
        var a = Vl, c = a, o = e, f = ge(), d = Pa(), h = za(), y = tn();
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
            qd(
              c,
              o,
              Va
            );
            break;
          case 23:
          case 22:
            c.memoizedState !== null && c.memoizedState.cachePool !== null && (o = c.memoizedState.cachePool.pool, o != null && gi(o));
            break;
          case 24:
            ss(c.memoizedState.cache);
        }
        if ((c.mode & At) !== dt && 0 <= ut && 0 <= ft && (Je || 0.05 < xe) && gn(
          c,
          ut,
          ft,
          xe,
          _e
        ), fl(f), Aa(d), Je = y, _e = h, c = a.child, c !== null) c.return = a, Vl = c;
        else
          t: for (a = t; Vl !== null; ) {
            if (c = Vl, f = c.sibling, d = c.return, Le(c), c === a) {
              Vl = null;
              break t;
            }
            if (f !== null) {
              f.return = d, Vl = f;
              break t;
            }
            Vl = d;
          }
      }
    }
    function Dm() {
      x3.forEach(function(t) {
        return t();
      });
    }
    function Om() {
      var t = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return t || B.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), t;
    }
    function jl(t) {
      if ((Xt & Cl) !== Zl && Dt !== 0)
        return Dt & -Dt;
      var e = B.T;
      return e !== null ? (e._updatedFibers || (e._updatedFibers = /* @__PURE__ */ new Set()), e._updatedFibers.add(t), qm()) : rp();
    }
    function Jo() {
      if (rn === 0)
        if ((Dt & 536870912) === 0 || Nt) {
          var t = fr;
          fr <<= 1, (fr & 3932160) === 0 && (fr = 262144), rn = t;
        } else rn = 536870912;
      return t = Gn.current, t !== null && (t.flags |= 32), rn;
    }
    function ht(t, e, a) {
      if (t0 && console.error("useInsertionEffect must not schedule updates."), Wg && (v1 = !0), (t === re && (ne === Dr || ne === Or) || t.cancelPendingCommit !== null) && (du(t, 0), nn(
        t,
        Dt,
        rn,
        !1
      )), dc(t, a), (Xt & Cl) !== Zl && t === re) {
        if (Su)
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              t = Rt && et(Rt) || "Unknown", WS.has(t) || (WS.add(t), e = et(e) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                e,
                t,
                t
              ));
              break;
            case 1:
              $S || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), $S = !0);
          }
      } else
        Tu && oa(t, e, a), Ls(e), t === re && ((Xt & Cl) === Zl && (qf |= a), qe === Bf && nn(
          t,
          Dt,
          rn,
          !1
        )), da(t);
    }
    function $p(t, e, a) {
      if ((Xt & (Cl | Qn)) !== Zl)
        throw Error("Should not already be working.");
      if (Dt !== 0 && Rt !== null) {
        var c = Rt, o = yl();
        switch (Q2) {
          case wy:
          case Dr:
            var f = Ry;
            Ee && ((c = c._debugTask) ? c.run(
              console.timeStamp.bind(
                console,
                "Suspended",
                f,
                o,
                Au,
                void 0,
                "primary-light"
              )
            ) : console.timeStamp(
              "Suspended",
              f,
              o,
              Au,
              void 0,
              "primary-light"
            ));
            break;
          case Or:
            f = Ry, Ee && ((c = c._debugTask) ? c.run(
              console.timeStamp.bind(
                console,
                "Action",
                f,
                o,
                Au,
                void 0,
                "primary-light"
              )
            ) : console.timeStamp(
              "Action",
              f,
              o,
              Au,
              void 0,
              "primary-light"
            ));
            break;
          default:
            Ee && (c = o - Ry, 3 > c || console.timeStamp(
              "Blocked",
              Ry,
              o,
              Au,
              void 0,
              5 > c ? "primary-light" : 10 > c ? "primary" : 100 > c ? "primary-dark" : "error"
            ));
        }
      }
      f = (a = !a && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Dl(t, e)) ? Iu(t, e) : Wo(t, e, !0);
      var d = a;
      do {
        if (f === oo) {
          Ih && !a && nn(t, e, 0, !1), e = ne, Ry = vl(), Q2 = e;
          break;
        } else {
          if (c = yl(), o = t.current.alternate, d && !kp(o)) {
            vn(e), o = Ql, f = c, !Ee || f <= o || (Fe ? Fe.run(
              console.timeStamp.bind(
                console,
                "Teared Render",
                o,
                f,
                jt,
                qt,
                "error"
              )
            ) : console.timeStamp(
              "Teared Render",
              o,
              f,
              jt,
              qt,
              "error"
            )), Xc(e, c), f = Wo(t, e, !1), d = !1;
            continue;
          }
          if (f === zr) {
            if (d = e, t.errorRecoveryDisabledLanes & d)
              var h = 0;
            else
              h = t.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
            if (h !== 0) {
              vn(e), M0(
                Ql,
                c,
                e,
                Fe
              ), Xc(e, c), e = h;
              t: {
                c = t, f = d, d = Ky;
                var y = c.current.memoizedState.isDehydrated;
                if (y && (du(c, h).flags |= 256), h = Wo(
                  c,
                  h,
                  !1
                ), h !== zr) {
                  if (Qg && !y) {
                    c.errorRecoveryDisabledLanes |= f, qf |= f, f = Bf;
                    break t;
                  }
                  c = Za, Za = d, c !== null && (Za === null ? Za = c : Za.push.apply(
                    Za,
                    c
                  ));
                }
                f = h;
              }
              if (d = !1, f !== zr) continue;
              c = yl();
            }
          }
          if (f === Ly) {
            vn(e), M0(
              Ql,
              c,
              e,
              Fe
            ), Xc(e, c), du(t, 0), nn(t, e, 0, !0);
            break;
          }
          t: {
            switch (a = t, f) {
              case oo:
              case Ly:
                throw Error("Root did not complete. This is a bug in React.");
              case Bf:
                if ((e & 4194048) !== e) break;
              case f1:
                vn(e), zp(
                  Ql,
                  c,
                  e,
                  Fe
                ), Xc(e, c), o = e, (o & 127) !== 0 ? $v = c : (o & 4194048) !== 0 && (Wv = c), nn(
                  a,
                  e,
                  rn,
                  !Nf
                );
                break t;
              case zr:
                Za = null;
                break;
              case o1:
              case xS:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (B.actQueue !== null)
              oe(
                a,
                o,
                e,
                Za,
                $y,
                d1,
                rn,
                qf,
                Mr,
                f,
                null,
                null,
                Ql,
                c
              );
            else {
              if ((e & 62914560) === e && (d = h1 + jS - yl(), 10 < d)) {
                if (nn(
                  a,
                  e,
                  rn,
                  !Nf
                ), qr(a, 0, !0) !== 0) break t;
                sc = e, a.timeoutHandle = ab(
                  Wp.bind(
                    null,
                    a,
                    o,
                    Za,
                    $y,
                    d1,
                    e,
                    rn,
                    qf,
                    Mr,
                    Nf,
                    f,
                    "Throttled",
                    Ql,
                    c
                  ),
                  d
                );
                break t;
              }
              Wp(
                a,
                o,
                Za,
                $y,
                d1,
                e,
                rn,
                qf,
                Mr,
                Nf,
                f,
                null,
                Ql,
                c
              );
            }
          }
        }
        break;
      } while (!0);
      da(t);
    }
    function Wp(t, e, a, c, o, f, d, h, y, p, A, D, S, C) {
      t.timeoutHandle = Hr;
      var w = e.subtreeFlags, $ = null;
      if ((w & 8192 || (w & 16785408) === 16785408) && ($ = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Wa
      }, Vd(e, f, $), w = (f & 62914560) === f ? h1 - yl() : (f & 4194048) === f ? YS - yl() : 0, w = sh($, w), w !== null)) {
        sc = f, t.cancelPendingCommit = w(
          oe.bind(
            null,
            t,
            e,
            f,
            a,
            c,
            o,
            d,
            h,
            y,
            A,
            $,
            $.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < $.count ? 0 < $.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : $.imgCount === 1 ? "Suspended on an Image" : 0 < $.imgCount ? "Suspended on Images" : null,
            S,
            C
          )
        ), nn(
          t,
          f,
          d,
          !p
        );
        return;
      }
      oe(
        t,
        e,
        f,
        a,
        c,
        o,
        d,
        h,
        y,
        A,
        $,
        D,
        S,
        C
      );
    }
    function kp(t) {
      for (var e = t; ; ) {
        var a = e.tag;
        if ((a === 0 || a === 11 || a === 15) && e.flags & 16384 && (a = e.updateQueue, a !== null && (a = a.stores, a !== null)))
          for (var c = 0; c < a.length; c++) {
            var o = a[c], f = o.getSnapshot;
            o = o.value;
            try {
              if (!Ga(f(), o)) return !1;
            } catch {
              return !1;
            }
          }
        if (a = e.child, e.subtreeFlags & 16384 && a !== null)
          a.return = e, e = a;
        else {
          if (e === t) break;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) return !0;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      }
      return !0;
    }
    function nn(t, e, a, c) {
      e &= ~Vg, e &= ~qf, t.suspendedLanes |= e, t.pingedLanes &= ~e, c && (t.warmLanes |= e), c = t.expirationTimes;
      for (var o = e; 0 < o; ) {
        var f = 31 - Rl(o), d = 1 << f;
        c[f] = -1, o &= ~d;
      }
      a !== 0 && o0(t, a, e);
    }
    function Na() {
      return (Xt & (Cl | Qn)) === Zl ? (mu(0), !1) : !0;
    }
    function wd() {
      if (Rt !== null) {
        if (ne === sn)
          var t = Rt.return;
        else
          t = Rt, Oo(), Dc(t), Zh = null, Yy = 0, t = Rt;
        for (; t !== null; )
          rm(t.alternate, t), t = t.return;
        Rt = null;
      }
    }
    function Xc(t, e) {
      (t & 127) !== 0 && (yr = e), (t & 4194048) !== 0 && (lo = e), (t & 62914560) !== 0 && (G2 = e), (t & 2080374784) !== 0 && (X2 = e);
    }
    function du(t, e) {
      Ee && (console.timeStamp(
        "Blocking Track",
        3e-3,
        3e-3,
        "Blocking",
        qt,
        "primary-light"
      ), console.timeStamp(
        "Transition Track",
        3e-3,
        3e-3,
        "Transition",
        qt,
        "primary-light"
      ), console.timeStamp(
        "Suspense Track",
        3e-3,
        3e-3,
        "Suspense",
        qt,
        "primary-light"
      ), console.timeStamp(
        "Idle Track",
        3e-3,
        3e-3,
        "Idle",
        qt,
        "primary-light"
      ));
      var a = Ql;
      if (Ql = vl(), Dt !== 0 && 0 < a) {
        if (vn(Dt), qe === o1 || qe === Bf)
          zp(
            a,
            Ql,
            e,
            Fe
          );
        else {
          var c = Ql, o = Fe;
          if (Ee && !(c <= a)) {
            var f = (e & 738197653) === e ? "tertiary-dark" : "primary-dark", d = (e & 536870912) === e ? "Prewarm" : (e & 201326741) === e ? "Interrupted Hydration" : "Interrupted Render";
            o ? o.run(
              console.timeStamp.bind(
                console,
                d,
                a,
                c,
                jt,
                qt,
                f
              )
            ) : console.timeStamp(
              d,
              a,
              c,
              jt,
              qt,
              f
            );
          }
        }
        Xc(Dt, Ql);
      }
      if (a = Fe, Fe = null, (e & 127) !== 0) {
        Fe = Dy, o = 0 <= Fc && Fc < yr ? yr : Fc, c = 0 <= pr && pr < yr ? yr : pr, f = 0 <= c ? c : 0 <= o ? o : Ql, 0 <= $v ? (vn(2), Dp(
          $v,
          f,
          e,
          a
        )) : kv & 127, a = o;
        var h = c, y = Oy, p = 0 < Xh, A = Uf === zy, D = Uf === Kv;
        if (o = Ql, c = Dy, f = bg, d = Tg, Ee) {
          if (jt = "Blocking", 0 < a ? a > o && (a = o) : a = o, 0 < h ? h > a && (h = a) : h = a, y !== null && a > h) {
            var S = p ? "secondary-light" : "warning";
            c ? c.run(
              console.timeStamp.bind(
                console,
                p ? "Consecutive" : "Event: " + y,
                h,
                a,
                jt,
                qt,
                S
              )
            ) : console.timeStamp(
              p ? "Consecutive" : "Event: " + y,
              h,
              a,
              jt,
              qt,
              S
            );
          }
          o > a && (h = A ? "error" : (e & 738197653) === e ? "tertiary-light" : "primary-light", A = D ? "Promise Resolved" : A ? "Cascading Update" : 5 < o - a ? "Update Blocked" : "Update", D = [], d != null && D.push(["Component name", d]), f != null && D.push(["Method name", f]), a = {
            start: a,
            end: o,
            detail: {
              devtools: {
                properties: D,
                track: jt,
                trackGroup: qt,
                color: h
              }
            }
          }, c ? c.run(
            performance.measure.bind(
              performance,
              A,
              a
            )
          ) : performance.measure(A, a));
        }
        Fc = -1.1, Uf = 0, Tg = bg = null, $v = -1.1, Xh = pr, pr = -1.1, yr = vl();
      }
      if ((e & 4194048) !== 0 && (Fe = My, o = 0 <= ao && ao < lo ? lo : ao, a = 0 <= Uu && Uu < lo ? lo : Uu, c = 0 <= _f && _f < lo ? lo : _f, f = 0 <= c ? c : 0 <= a ? a : Ql, 0 <= Wv ? (vn(256), Dp(
        Wv,
        f,
        e,
        Fe
      )) : kv & 4194048, D = c, h = vr, y = 0 < Cf, p = Eg === Kv, f = Ql, c = My, d = Y2, A = j2, Ee && (jt = "Transition", 0 < a ? a > f && (a = f) : a = f, 0 < o ? o > a && (o = a) : o = a, 0 < D ? D > o && (D = o) : D = o, o > D && h !== null && (S = y ? "secondary-light" : "warning", c ? c.run(
        console.timeStamp.bind(
          console,
          y ? "Consecutive" : "Event: " + h,
          D,
          o,
          jt,
          qt,
          S
        )
      ) : console.timeStamp(
        y ? "Consecutive" : "Event: " + h,
        D,
        o,
        jt,
        qt,
        S
      )), a > o && (c ? c.run(
        console.timeStamp.bind(
          console,
          "Action",
          o,
          a,
          jt,
          qt,
          "primary-dark"
        )
      ) : console.timeStamp(
        "Action",
        o,
        a,
        jt,
        qt,
        "primary-dark"
      )), f > a && (o = p ? "Promise Resolved" : 5 < f - a ? "Update Blocked" : "Update", D = [], A != null && D.push(["Component name", A]), d != null && D.push(["Method name", d]), a = {
        start: a,
        end: f,
        detail: {
          devtools: {
            properties: D,
            track: jt,
            trackGroup: qt,
            color: "primary-light"
          }
        }
      }, c ? c.run(
        performance.measure.bind(
          performance,
          o,
          a
        )
      ) : performance.measure(o, a))), Uu = ao = -1.1, Eg = 0, Wv = -1.1, Cf = _f, _f = -1.1, lo = vl()), (e & 62914560) !== 0 && (kv & 62914560) !== 0 && (vn(4194304), R0(G2, Ql)), (e & 2080374784) !== 0 && (kv & 2080374784) !== 0 && (vn(268435456), R0(X2, Ql)), a = t.timeoutHandle, a !== Hr && (t.timeoutHandle = Hr, $3(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), sc = 0, wd(), re = t, Rt = a = Fn(
        t.current,
        null
      ), Dt = e, ne = sn, Vn = null, Nf = !1, Ih = Dl(t, e), Qg = !1, qe = oo, Mr = rn = Vg = qf = xf = 0, Za = Ky = null, d1 = !1, (e & 8) !== 0 && (e |= e & 32), c = t.entangledLanes, c !== 0)
        for (t = t.entanglements, c &= e; 0 < c; )
          o = 31 - Rl(c), f = 1 << o, e |= t[o], c &= ~f;
      return Pc = e, ad(), t = C2(), 1e3 < t - _2 && (B.recentlyCreatedOwnerStacks = 0, _2 = t), ic.discardPendingWarnings(), a;
    }
    function Un(t, e) {
      yt = null, B.H = Qy, B.getCurrentStack = null, Su = !1, pa = null, e === Vh || e === t1 ? (e = Ti(), ne = wy) : e === Og ? (e = Ti(), ne = qS) : ne = e === qg ? Xg : e !== null && typeof e == "object" && typeof e.then == "function" ? Jy : s1, Vn = e;
      var a = Rt;
      a === null ? (qe = Ly, Us(
        t,
        Jl(e, t.current)
      )) : a.mode & At && sd(a);
    }
    function Mm() {
      var t = Gn.current;
      return t === null ? !0 : (Dt & 4194048) === Dt ? _u === null : (Dt & 62914560) === Dt || (Dt & 536870912) !== 0 ? t === _u : !1;
    }
    function Jd() {
      var t = B.H;
      return B.H = Qy, t === null ? Qy : t;
    }
    function Rm() {
      var t = B.A;
      return B.A = N3, t;
    }
    function Ko(t) {
      Fe === null && (Fe = t._debugTask == null ? null : t._debugTask);
    }
    function $o() {
      qe = Bf, Nf || (Dt & 4194048) !== Dt && Gn.current !== null || (Ih = !0), (xf & 134217727) === 0 && (qf & 134217727) === 0 || re === null || nn(
        re,
        Dt,
        rn,
        !1
      );
    }
    function Wo(t, e, a) {
      var c = Xt;
      Xt |= Cl;
      var o = Jd(), f = Rm();
      if (re !== t || Dt !== e) {
        if (Tu) {
          var d = t.memoizedUpdaters;
          0 < d.size && (Fo(t, Dt), d.clear()), xu(t, e);
        }
        $y = null, du(t, e);
      }
      e = !1, d = qe;
      t: do
        try {
          if (ne !== sn && Rt !== null) {
            var h = Rt, y = Vn;
            switch (ne) {
              case Xg:
                wd(), d = f1;
                break t;
              case wy:
              case Dr:
              case Or:
              case Jy:
                Gn.current === null && (e = !0);
                var p = ne;
                if (ne = sn, Vn = null, ko(t, h, y, p), a && Ih) {
                  d = oo;
                  break t;
                }
                break;
              default:
                p = ne, ne = sn, Vn = null, ko(t, h, y, p);
            }
          }
          Um(), d = qe;
          break;
        } catch (A) {
          Un(t, A);
        }
      while (!0);
      return e && t.shellSuspendCounter++, Oo(), Xt = c, B.H = o, B.A = f, Rt === null && (re = null, Dt = 0, ad()), d;
    }
    function Um() {
      for (; Rt !== null; ) Kd(Rt);
    }
    function Iu(t, e) {
      var a = Xt;
      Xt |= Cl;
      var c = Jd(), o = Rm();
      if (re !== t || Dt !== e) {
        if (Tu) {
          var f = t.memoizedUpdaters;
          0 < f.size && (Fo(t, Dt), f.clear()), xu(t, e);
        }
        $y = null, m1 = yl() + GS, du(t, e);
      } else
        Ih = Dl(
          t,
          e
        );
      t: do
        try {
          if (ne !== sn && Rt !== null)
            e: switch (e = Rt, f = Vn, ne) {
              case s1:
                ne = sn, Vn = null, ko(
                  t,
                  e,
                  f,
                  s1
                );
                break;
              case Dr:
              case Or:
                if (X0(f)) {
                  ne = sn, Vn = null, _m(e);
                  break;
                }
                e = function() {
                  ne !== Dr && ne !== Or || re !== t || (ne = r1), da(t);
                }, f.then(e, e);
                break t;
              case wy:
                ne = r1;
                break t;
              case qS:
                ne = Gg;
                break t;
              case r1:
                X0(f) ? (ne = sn, Vn = null, _m(e)) : (ne = sn, Vn = null, ko(
                  t,
                  e,
                  f,
                  r1
                ));
                break;
              case Gg:
                var d = null;
                switch (Rt.tag) {
                  case 26:
                    d = Rt.memoizedState;
                  case 5:
                  case 27:
                    var h = Rt;
                    if (d ? Ut(d) : h.stateNode.complete) {
                      ne = sn, Vn = null;
                      var y = h.sibling;
                      if (y !== null) Rt = y;
                      else {
                        var p = h.return;
                        p !== null ? (Rt = p, Qs(p)) : Rt = null;
                      }
                      break e;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                ne = sn, Vn = null, ko(
                  t,
                  e,
                  f,
                  Gg
                );
                break;
              case Jy:
                ne = sn, Vn = null, ko(
                  t,
                  e,
                  f,
                  Jy
                );
                break;
              case Xg:
                wd(), qe = f1;
                break t;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          B.actQueue !== null ? Um() : We();
          break;
        } catch (A) {
          Un(t, A);
        }
      while (!0);
      return Oo(), B.H = c, B.A = o, Xt = a, Rt !== null ? oo : (re = null, Dt = 0, ad(), qe);
    }
    function We() {
      for (; Rt !== null && !Th(); )
        Kd(Rt);
    }
    function Kd(t) {
      var e = t.alternate;
      (t.mode & At) !== dt ? (Qu(t), e = W(
        t,
        Bs,
        e,
        t,
        Pc
      ), sd(t)) : e = W(
        t,
        Bs,
        e,
        t,
        Pc
      ), t.memoizedProps = t.pendingProps, e === null ? Qs(t) : Rt = e;
    }
    function _m(t) {
      var e = W(t, ml, t);
      t.memoizedProps = t.pendingProps, e === null ? Qs(t) : Rt = e;
    }
    function ml(t) {
      var e = t.alternate, a = (t.mode & At) !== dt;
      switch (a && Qu(t), t.tag) {
        case 15:
        case 0:
          e = um(
            e,
            t,
            t.pendingProps,
            t.type,
            void 0,
            Dt
          );
          break;
        case 11:
          e = um(
            e,
            t,
            t.pendingProps,
            t.type.render,
            t.ref,
            Dt
          );
          break;
        case 5:
          Dc(t);
        default:
          rm(e, t), t = Rt = H0(t, Pc), e = Bs(e, t, Pc);
      }
      return a && sd(t), e;
    }
    function ko(t, e, a, c) {
      Oo(), Dc(e), Zh = null, Yy = 0;
      var o = e.return;
      try {
        if (I0(
          t,
          o,
          e,
          a,
          Dt
        )) {
          qe = Ly, Us(
            t,
            Jl(a, t.current)
          ), Rt = null;
          return;
        }
      } catch (f) {
        if (o !== null) throw Rt = o, f;
        qe = Ly, Us(
          t,
          Jl(a, t.current)
        ), Rt = null;
        return;
      }
      e.flags & 32768 ? (Nt || c === s1 ? t = !0 : Ih || (Dt & 536870912) !== 0 ? t = !1 : (Nf = t = !0, (c === Dr || c === Or || c === wy || c === Jy) && (c = Gn.current, c !== null && c.tag === 13 && (c.flags |= 16384))), Cm(e, t)) : Qs(e);
    }
    function Qs(t) {
      var e = t;
      do {
        if ((e.flags & 32768) !== 0) {
          Cm(
            e,
            Nf
          );
          return;
        }
        var a = e.alternate;
        if (t = e.return, Qu(e), a = W(
          e,
          sm,
          a,
          e,
          Pc
        ), (e.mode & At) !== dt && rs(e), a !== null) {
          Rt = a;
          return;
        }
        if (e = e.sibling, e !== null) {
          Rt = e;
          return;
        }
        Rt = e = t;
      } while (e !== null);
      qe === oo && (qe = xS);
    }
    function Cm(t, e) {
      do {
        var a = Qp(t.alternate, t);
        if (a !== null) {
          a.flags &= 32767, Rt = a;
          return;
        }
        if ((t.mode & At) !== dt) {
          rs(t), a = t.actualDuration;
          for (var c = t.child; c !== null; )
            a += c.actualDuration, c = c.sibling;
          t.actualDuration = a;
        }
        if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !e && (t = t.sibling, t !== null)) {
          Rt = t;
          return;
        }
        Rt = t = a;
      } while (t !== null);
      qe = f1, Rt = null;
    }
    function oe(t, e, a, c, o, f, d, h, y, p, A, D, S, C) {
      t.cancelPendingCommit = null;
      do
        Vs();
      while (El !== jf);
      if (ic.flushLegacyContextWarning(), ic.flushPendingUnsafeLifecycleWarnings(), (Xt & (Cl | Qn)) !== Zl)
        throw Error("Should not already be working.");
      if (vn(a), p === zr ? M0(
        S,
        C,
        a,
        Fe
      ) : c !== null ? Z1(
        S,
        C,
        a,
        c,
        e !== null && e.alternate !== null && e.alternate.memoizedState.isDehydrated && (e.flags & 256) !== 0,
        Fe
      ) : V1(
        S,
        C,
        a,
        Fe
      ), e !== null) {
        if (a === 0 && console.error(
          "finishedLanes should not be empty during a commit. This is a bug in React."
        ), e === t.current)
          throw Error(
            "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
          );
        if (f = e.lanes | e.childLanes, f |= yg, j1(
          t,
          a,
          f,
          d,
          h,
          y
        ), t === re && (Rt = re = null, Dt = 0), Ph = e, Gf = t, sc = a, wg = f, Kg = o, wS = c, Jg = C, JS = D, rc = y1, KS = null, e.actualDuration !== 0 || (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Io(Ki, function() {
          return tp = window.event, rc === y1 && (rc = Lg), Zs(), null;
        })) : (t.callbackNode = null, t.callbackPriority = 0), eo = null, Rf = vl(), D !== null && L1(
          C,
          Rf,
          D,
          Fe
        ), c = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || c) {
          c = B.T, B.T = null, o = wt.p, wt.p = al, d = Xt, Xt |= Qn;
          try {
            K1(t, e, a);
          } finally {
            Xt = d, wt.p = o, B.T = c;
          }
        }
        El = QS, ea(), hu(), Hm();
      }
    }
    function ea() {
      if (El === QS) {
        El = jf;
        var t = Gf, e = Ph, a = sc, c = (e.flags & 13878) !== 0;
        if ((e.subtreeFlags & 13878) !== 0 || c) {
          c = B.T, B.T = null;
          var o = wt.p;
          wt.p = al;
          var f = Xt;
          Xt |= Qn;
          try {
            kh = a, Fh = t, Si(), Ys(e, t), Fh = kh = null, a = n2;
            var d = td(t.containerInfo), h = a.focusedElem, y = a.selectionRange;
            if (d !== h && h && h.ownerDocument && bp(
              h.ownerDocument.documentElement,
              h
            )) {
              if (y !== null && z0(h)) {
                var p = y.start, A = y.end;
                if (A === void 0 && (A = p), "selectionStart" in h)
                  h.selectionStart = p, h.selectionEnd = Math.min(
                    A,
                    h.value.length
                  );
                else {
                  var D = h.ownerDocument || document, S = D && D.defaultView || window;
                  if (S.getSelection) {
                    var C = S.getSelection(), w = h.textContent.length, $ = Math.min(
                      y.start,
                      w
                    ), pe = y.end === void 0 ? $ : Math.min(y.end, w);
                    !C.extend && $ > pe && (d = pe, pe = $, $ = d);
                    var Yt = Sp(
                      h,
                      $
                    ), g = Sp(
                      h,
                      pe
                    );
                    if (Yt && g && (C.rangeCount !== 1 || C.anchorNode !== Yt.node || C.anchorOffset !== Yt.offset || C.focusNode !== g.node || C.focusOffset !== g.offset)) {
                      var b = D.createRange();
                      b.setStart(Yt.node, Yt.offset), C.removeAllRanges(), $ > pe ? (C.addRange(b), C.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), C.addRange(b));
                    }
                  }
                }
              }
              for (D = [], C = h; C = C.parentNode; )
                C.nodeType === 1 && D.push({
                  element: C,
                  left: C.scrollLeft,
                  top: C.scrollTop
                });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < D.length; h++) {
                var E = D[h];
                E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
              }
            }
            C1 = !!a2, n2 = a2 = null;
          } finally {
            Xt = f, wt.p = o, B.T = c;
          }
        }
        t.current = e, El = VS;
      }
    }
    function hu() {
      if (El === VS) {
        El = jf;
        var t = KS;
        if (t !== null) {
          Rf = vl();
          var e = to, a = Rf;
          !Ee || a <= e || console.timeStamp(
            t,
            e,
            a,
            jt,
            qt,
            "secondary-light"
          );
        }
        t = Gf, e = Ph, a = sc;
        var c = (e.flags & 8772) !== 0;
        if ((e.subtreeFlags & 8772) !== 0 || c) {
          c = B.T, B.T = null;
          var o = wt.p;
          wt.p = al;
          var f = Xt;
          Xt |= Qn;
          try {
            kh = a, Fh = t, Si(), Xd(
              t,
              e.alternate,
              e
            ), Fh = kh = null;
          } finally {
            Xt = f, wt.p = o, B.T = c;
          }
        }
        t = Jg, e = JS, to = vl(), t = e === null ? t : Rf, e = to, a = rc === Zg, c = Fe, eo !== null ? Op(
          t,
          e,
          eo,
          !1,
          c
        ) : !Ee || e <= t || (c ? c.run(
          console.timeStamp.bind(
            console,
            a ? "Commit Interrupted View Transition" : "Commit",
            t,
            e,
            jt,
            qt,
            a ? "error" : "secondary-dark"
          )
        ) : console.timeStamp(
          a ? "Commit Interrupted View Transition" : "Commit",
          t,
          e,
          jt,
          qt,
          a ? "error" : "secondary-dark"
        )), El = ZS;
      }
    }
    function Hm() {
      if (El === LS || El === ZS) {
        if (El === LS) {
          var t = to;
          to = vl();
          var e = to, a = rc === Zg;
          !Ee || e <= t || console.timeStamp(
            a ? "Interrupted View Transition" : "Starting Animation",
            t,
            e,
            jt,
            qt,
            a ? " error" : "secondary-light"
          ), rc !== Zg && (rc = XS);
        }
        El = jf, Eh(), t = Gf;
        var c = Ph;
        e = sc, a = wS;
        var o = c.actualDuration !== 0 || (c.subtreeFlags & 10256) !== 0 || (c.flags & 10256) !== 0;
        o ? El = p1 : (El = jf, Ph = Gf = null, Bm(
          t,
          t.pendingLanes
        ), Rr = 0, ky = null);
        var f = t.pendingLanes;
        if (f === 0 && (Yf = null), o || kd(t), f = Ll(e), c = c.stateNode, ll && typeof ll.onCommitFiberRoot == "function")
          try {
            var d = (c.current.flags & 128) === 128;
            switch (f) {
              case al:
                var h = fy;
                break;
              case Ul:
                h = Ah;
                break;
              case Xl:
                h = Ki;
                break;
              case $c:
                h = zh;
                break;
              default:
                h = Ki;
            }
            ll.onCommitFiberRoot(
              $i,
              c,
              h,
              d
            );
          } catch (D) {
            bu || (bu = !0, console.error(
              "React instrumentation encountered an error: %o",
              D
            ));
          }
        if (Tu && t.memoizedUpdaters.clear(), Dm(), a !== null) {
          d = B.T, h = wt.p, wt.p = al, B.T = null;
          try {
            var y = t.onRecoverableError;
            for (c = 0; c < a.length; c++) {
              var p = a[c], A = Fp(p.stack);
              W(
                p.source,
                y,
                p.value,
                A
              );
            }
          } finally {
            B.T = d, wt.p = h;
          }
        }
        (sc & 3) !== 0 && Vs(), da(t), f = t.pendingLanes, (e & 261930) !== 0 && (f & 42) !== 0 ? (Iv = !0, t === $g ? Wy++ : (Wy = 0, $g = t)) : Wy = 0, o || Xc(e, to), mu(0);
      }
    }
    function Fp(t) {
      return t = { componentStack: t }, Object.defineProperty(t, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), t;
    }
    function Bm(t, e) {
      (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, ss(e)));
    }
    function Vs() {
      return ea(), hu(), Hm(), Zs();
    }
    function Zs() {
      if (El !== p1) return !1;
      var t = Gf, e = wg;
      wg = 0;
      var a = Ll(sc), c = Xl > a ? Xl : a;
      a = B.T;
      var o = wt.p;
      try {
        wt.p = c, B.T = null;
        var f = Kg;
        Kg = null, c = Gf;
        var d = sc;
        if (El = jf, Ph = Gf = null, sc = 0, (Xt & (Cl | Qn)) !== Zl)
          throw Error("Cannot flush passive effects while already rendering.");
        vn(d), Wg = !0, v1 = !1;
        var h = 0;
        if (eo = null, h = yl(), rc === XS)
          R0(
            to,
            h,
            M3
          );
        else {
          var y = to, p = h, A = rc === Lg;
          !Ee || p <= y || (Fe ? Fe.run(
            console.timeStamp.bind(
              console,
              A ? "Waiting for Paint" : "Waiting",
              y,
              p,
              jt,
              qt,
              "secondary-light"
            )
          ) : console.timeStamp(
            A ? "Waiting for Paint" : "Waiting",
            y,
            p,
            jt,
            qt,
            "secondary-light"
          ));
        }
        y = Xt, Xt |= Qn;
        var D = c.current;
        Si(), Zd(D);
        var S = c.current;
        D = Jg, Si(), Em(
          c,
          S,
          d,
          f,
          D
        ), kd(c), Xt = y;
        var C = yl();
        if (S = h, D = Fe, eo !== null ? Op(
          S,
          C,
          eo,
          !0,
          D
        ) : !Ee || C <= S || (D ? D.run(
          console.timeStamp.bind(
            console,
            "Remaining Effects",
            S,
            C,
            jt,
            qt,
            "secondary-dark"
          )
        ) : console.timeStamp(
          "Remaining Effects",
          S,
          C,
          jt,
          qt,
          "secondary-dark"
        )), Xc(d, C), mu(0, !1), v1 ? c === ky ? Rr++ : (Rr = 0, ky = c) : Rr = 0, v1 = Wg = !1, ll && typeof ll.onPostCommitFiberRoot == "function")
          try {
            ll.onPostCommitFiberRoot($i, c);
          } catch ($) {
            bu || (bu = !0, console.error(
              "React instrumentation encountered an error: %o",
              $
            ));
          }
        var w = c.current.stateNode;
        return w.effectDuration = 0, w.passiveEffectDuration = 0, !0;
      } finally {
        wt.p = o, B.T = a, Bm(t, e);
      }
    }
    function la(t, e, a) {
      e = Jl(a, e), Hp(e), e = Od(t.stateNode, e, 2), t = eu(t, e, 2), t !== null && (dc(t, 2), da(t));
    }
    function St(t, e, a) {
      if (t0 = !1, t.tag === 3)
        la(t, t, a);
      else {
        for (; e !== null; ) {
          if (e.tag === 3) {
            la(
              e,
              t,
              a
            );
            return;
          }
          if (e.tag === 1) {
            var c = e.stateNode;
            if (typeof e.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (Yf === null || !Yf.has(c))) {
              t = Jl(a, t), Hp(t), a = Md(2), c = eu(e, a, 2), c !== null && (Rd(
                a,
                c,
                e,
                t
              ), dc(c, 2), da(c));
              return;
            }
          }
          e = e.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          a
        );
      }
    }
    function $d(t, e, a) {
      var c = t.pingCache;
      if (c === null) {
        c = t.pingCache = new q3();
        var o = /* @__PURE__ */ new Set();
        c.set(e, o);
      } else
        o = c.get(e), o === void 0 && (o = /* @__PURE__ */ new Set(), c.set(e, o));
      o.has(a) || (Qg = !0, o.add(a), c = ra.bind(null, t, e, a), Tu && Fo(t, a), e.then(c, c));
    }
    function ra(t, e, a) {
      var c = t.pingCache;
      c !== null && c.delete(e), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, (a & 127) !== 0 ? 0 > Fc && (yr = Fc = vl(), Dy = Jv("Promise Resolved"), Uf = Kv) : (a & 4194048) !== 0 && 0 > Uu && (lo = Uu = vl(), My = Jv("Promise Resolved"), Eg = Kv), Om() && B.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), re === t && (Dt & a) === a && (qe === Bf || qe === o1 && (Dt & 62914560) === Dt && yl() - h1 < jS ? (Xt & Cl) === Zl && du(t, 0) : Vg |= a, Mr === Dt && (Mr = 0)), da(t);
    }
    function Nm(t, e) {
      e === 0 && (e = Yr()), t = ql(t, e), t !== null && (dc(t, e), da(t));
    }
    function Pu(t) {
      var e = t.memoizedState, a = 0;
      e !== null && (a = e.retryLane), Nm(t, a);
    }
    function ji(t, e) {
      var a = 0;
      switch (t.tag) {
        case 31:
        case 13:
          var c = t.stateNode, o = t.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case 19:
          c = t.stateNode;
          break;
        case 22:
          c = t.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      c !== null && c.delete(e), Nm(t, a);
    }
    function _n(t, e, a) {
      if ((e.subtreeFlags & 67117056) !== 0)
        for (e = e.child; e !== null; ) {
          var c = t, o = e, f = o.type === ua;
          f = a || f, o.tag !== 22 ? o.flags & 67108864 ? f && W(
            o,
            Wd,
            c,
            o
          ) : _n(
            c,
            o,
            f
          ) : o.memoizedState === null && (f && o.flags & 8192 ? W(
            o,
            Wd,
            c,
            o
          ) : o.subtreeFlags & 67108864 && W(
            o,
            _n,
            c,
            o,
            f
          )), e = e.sibling;
        }
    }
    function Wd(t, e) {
      ce(!0);
      try {
        Qd(e), zm(e), Tm(t, e.alternate, e, !1), Xs(t, e, 0, null, !1, 0);
      } finally {
        ce(!1);
      }
    }
    function kd(t) {
      var e = !0;
      t.current.mode & (va | cc) || (e = !1), _n(
        t,
        t.current,
        e
      );
    }
    function un(t) {
      if ((Xt & Cl) === Zl) {
        var e = t.tag;
        if (e === 3 || e === 1 || e === 0 || e === 11 || e === 14 || e === 15) {
          if (e = et(t) || "ReactComponent", g1 !== null) {
            if (g1.has(e)) return;
            g1.add(e);
          } else g1 = /* @__PURE__ */ new Set([e]);
          W(t, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function Fo(t, e) {
      Tu && t.memoizedUpdaters.forEach(function(a) {
        oa(t, a, e);
      });
    }
    function Io(t, e) {
      var a = B.actQueue;
      return a !== null ? (a.push(e), G3) : oy(t, e);
    }
    function Ls(t) {
      Om() && B.actQueue === null && W(t, function() {
        console.error(
          `An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,
          et(t)
        );
      });
    }
    function da(t) {
      t !== e0 && t.next === null && (e0 === null ? S1 = e0 = t : e0 = e0.next = t), b1 = !0, B.actQueue !== null ? Fg || (Fg = !0, Pp()) : kg || (kg = !0, Pp());
    }
    function mu(t, e) {
      if (!Ig && b1) {
        Ig = !0;
        do
          for (var a = !1, c = S1; c !== null; ) {
            if (t !== 0) {
              var o = c.pendingLanes;
              if (o === 0) var f = 0;
              else {
                var d = c.suspendedLanes, h = c.pingedLanes;
                f = (1 << 31 - Rl(42 | t) + 1) - 1, f &= o & ~(d & ~h), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (a = !0, ws(c, f));
            } else
              f = Dt, f = qr(
                c,
                c === re ? f : 0,
                c.cancelPendingCommit !== null || c.timeoutHandle !== Hr
              ), (f & 3) === 0 || Dl(c, f) || (a = !0, ws(c, f));
            c = c.next;
          }
        while (a);
        Ig = !1;
      }
    }
    function Ip() {
      tp = window.event, Fd();
    }
    function Fd() {
      b1 = Fg = kg = !1;
      var t = 0;
      Xf !== 0 && jm() && (t = Xf);
      for (var e = yl(), a = null, c = S1; c !== null; ) {
        var o = c.next, f = Po(c, e);
        f === 0 ? (c.next = null, a === null ? S1 = o : a.next = o, o === null && (e0 = a)) : (a = c, (t !== 0 || (f & 3) !== 0) && (b1 = !0)), c = o;
      }
      El !== jf && El !== p1 || mu(t), Xf !== 0 && (Xf = 0);
    }
    function Po(t, e) {
      for (var a = t.suspendedLanes, c = t.pingedLanes, o = t.expirationTimes, f = t.pendingLanes & -62914561; 0 < f; ) {
        var d = 31 - Rl(f), h = 1 << d, y = o[d];
        y === -1 ? ((h & a) === 0 || (h & c) !== 0) && (o[d] = Y1(h, e)) : y <= e && (t.expiredLanes |= h), f &= ~h;
      }
      if (e = re, a = Dt, a = qr(
        t,
        t === e ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== Hr
      ), c = t.callbackNode, a === 0 || t === e && (ne === Dr || ne === Or) || t.cancelPendingCommit !== null)
        return c !== null && Id(c), t.callbackNode = null, t.callbackPriority = 0;
      if ((a & 3) === 0 || Dl(t, a)) {
        if (e = a & -a, e !== t.callbackPriority || B.actQueue !== null && c !== Pg)
          Id(c);
        else return e;
        switch (Ll(a)) {
          case al:
          case Ul:
            a = Ah;
            break;
          case Xl:
            a = Ki;
            break;
          case $c:
            a = zh;
            break;
          default:
            a = Ki;
        }
        return c = xm.bind(null, t), B.actQueue !== null ? (B.actQueue.push(c), a = Pg) : a = oy(a, c), t.callbackPriority = e, t.callbackNode = a, e;
      }
      return c !== null && Id(c), t.callbackPriority = 2, t.callbackNode = null, 2;
    }
    function xm(t, e) {
      if (Iv = Fv = !1, tp = window.event, El !== jf && El !== p1)
        return t.callbackNode = null, t.callbackPriority = 0, null;
      var a = t.callbackNode;
      if (rc === y1 && (rc = Lg), Vs() && t.callbackNode !== a)
        return null;
      var c = Dt;
      return c = qr(
        t,
        t === re ? c : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== Hr
      ), c === 0 ? null : ($p(
        t,
        c,
        e
      ), Po(t, yl()), t.callbackNode != null && t.callbackNode === a ? xm.bind(null, t) : null);
    }
    function ws(t, e) {
      if (Vs()) return null;
      Fv = Iv, Iv = !1, $p(t, e, !0);
    }
    function Id(t) {
      t !== Pg && t !== null && bh(t);
    }
    function Pp() {
      B.actQueue !== null && B.actQueue.push(function() {
        return Fd(), null;
      }), W3(function() {
        (Xt & (Cl | Qn)) !== Zl ? oy(
          fy,
          Ip
        ) : Fd();
      });
    }
    function qm() {
      if (Xf === 0) {
        var t = gr;
        t === 0 && (t = gf, gf <<= 1, (gf & 261888) === 0 && (gf = 256)), Xf = t;
      }
      return Xf;
    }
    function Qt(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : (It(t, "action"), ts("" + t));
    }
    function ee(t, e) {
      var a = e.ownerDocument.createElement("input");
      return a.name = e.name, a.value = e.value, t.id && a.setAttribute("form", t.id), e.parentNode.insertBefore(a, e), t = new FormData(t), a.parentNode.removeChild(a), t;
    }
    function Ht(t, e, a, c, o) {
      if (e === "submit" && a && a.stateNode === o) {
        var f = Qt(
          (o[ca] || null).action
        ), d = c.submitter;
        d && (e = (e = d[ca] || null) ? Qt(e.formAction) : d.getAttribute("formAction"), e !== null && (f = e, d = null));
        var h = new Gv(
          "action",
          "action",
          null,
          c,
          o
        );
        t.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (c.defaultPrevented) {
                  if (Xf !== 0) {
                    var y = d ? ee(
                      o,
                      d
                    ) : new FormData(o), p = {
                      pending: !0,
                      data: y,
                      method: o.method,
                      action: f
                    };
                    Object.freeze(p), Wu(
                      a,
                      p,
                      null,
                      y
                    );
                  }
                } else
                  typeof f == "function" && (h.preventDefault(), y = d ? ee(
                    o,
                    d
                  ) : new FormData(o), p = {
                    pending: !0,
                    data: y,
                    method: o.method,
                    action: f
                  }, Object.freeze(p), Wu(
                    a,
                    p,
                    f,
                    y
                  ));
              },
              currentTarget: o
            }
          ]
        });
      }
    }
    function Mt(t, e, a) {
      t.currentTarget = a;
      try {
        e(t);
      } catch (c) {
        rg(c);
      }
      t.currentTarget = null;
    }
    function Wt(t, e) {
      e = (e & 4) !== 0;
      for (var a = 0; a < t.length; a++) {
        var c = t[a];
        t: {
          var o = void 0, f = c.event;
          if (c = c.listeners, e)
            for (var d = c.length - 1; 0 <= d; d--) {
              var h = c[d], y = h.instance, p = h.currentTarget;
              if (h = h.listener, y !== o && f.isPropagationStopped())
                break t;
              y !== null ? W(
                y,
                Mt,
                f,
                h,
                p
              ) : Mt(f, h, p), o = y;
            }
          else
            for (d = 0; d < c.length; d++) {
              if (h = c[d], y = h.instance, p = h.currentTarget, h = h.listener, y !== o && f.isPropagationStopped())
                break t;
              y !== null ? W(
                y,
                Mt,
                f,
                h,
                p
              ) : Mt(f, h, p), o = y;
            }
        }
      }
    }
    function st(t, e) {
      t2.has(t) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        t
      );
      var a = e[Wi];
      a === void 0 && (a = e[Wi] = /* @__PURE__ */ new Set());
      var c = t + "__bubble";
      a.has(c) || (Pd(e, t, 2, !1), a.add(c));
    }
    function yu(t, e, a) {
      t2.has(t) && !e && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        t
      );
      var c = 0;
      e && (c |= 4), Pd(
        a,
        t,
        c,
        e
      );
    }
    function Qc(t) {
      if (!t[T1]) {
        t[T1] = !0, Nv.forEach(function(a) {
          a !== "selectionchange" && (t2.has(a) || yu(a, !1, t), yu(a, !0, t));
        });
        var e = t.nodeType === 9 ? t : t.ownerDocument;
        e === null || e[T1] || (e[T1] = !0, yu("selectionchange", !1, e));
      }
    }
    function Pd(t, e, a, c) {
      switch (hh(e)) {
        case al:
          var o = Fm;
          break;
        case Ul:
          o = Ml;
          break;
        default:
          o = Im;
      }
      a = o.bind(
        null,
        e,
        a,
        t
      ), o = void 0, !eg || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (o = !0), c ? o !== void 0 ? t.addEventListener(e, a, {
        capture: !0,
        passive: o
      }) : t.addEventListener(e, a, !0) : o !== void 0 ? t.addEventListener(e, a, {
        passive: o
      }) : t.addEventListener(
        e,
        a,
        !1
      );
    }
    function Cn(t, e, a, c, o) {
      var f = c;
      if ((e & 1) === 0 && (e & 2) === 0 && c !== null)
        t: for (; ; ) {
          if (c === null) return;
          var d = c.tag;
          if (d === 3 || d === 4) {
            var h = c.stateNode.containerInfo;
            if (h === o) break;
            if (d === 4)
              for (d = c.return; d !== null; ) {
                var y = d.tag;
                if ((y === 3 || y === 4) && d.stateNode.containerInfo === o)
                  return;
                d = d.return;
              }
            for (; h !== null; ) {
              if (d = qu(h), d === null) return;
              if (y = d.tag, y === 5 || y === 6 || y === 26 || y === 27) {
                c = f = d;
                continue t;
              }
              h = h.parentNode;
            }
          }
          c = c.return;
        }
      kr(function() {
        var p = f, A = yn(a), D = [];
        t: {
          var S = U2.get(t);
          if (S !== void 0) {
            var C = Gv, w = t;
            switch (t) {
              case "keypress":
                if (es(a) === 0) break t;
              case "keydown":
              case "keyup":
                C = t3;
                break;
              case "focusin":
                w = "focus", C = ug;
                break;
              case "focusout":
                w = "blur", C = ug;
                break;
              case "beforeblur":
              case "afterblur":
                C = ug;
                break;
              case "click":
                if (a.button === 2) break t;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                C = y2;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                C = Vb;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                C = a3;
                break;
              case D2:
              case O2:
              case M2:
                C = wb;
                break;
              case R2:
                C = u3;
                break;
              case "scroll":
              case "scrollend":
                C = Xb;
                break;
              case "wheel":
                C = i3;
                break;
              case "copy":
              case "cut":
              case "paste":
                C = Kb;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                C = v2;
                break;
              case "toggle":
              case "beforetoggle":
                C = f3;
            }
            var $ = (e & 4) !== 0, pe = !$ && (t === "scroll" || t === "scrollend"), Yt = $ ? S !== null ? S + "Capture" : null : S;
            $ = [];
            for (var g = p, b; g !== null; ) {
              var E = g;
              if (b = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || b === null || Yt === null || (E = Wn(g, Yt), E != null && $.push(
                fe(
                  g,
                  E,
                  b
                )
              )), pe) break;
              g = g.return;
            }
            0 < $.length && (S = new C(
              S,
              w,
              null,
              a,
              A
            ), D.push({
              event: S,
              listeners: $
            }));
          }
        }
        if ((e & 7) === 0) {
          t: {
            if (S = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout", S && a !== my && (w = a.relatedTarget || a.fromElement) && (qu(w) || w[uc]))
              break t;
            if ((C || S) && (S = A.window === A ? A : (S = A.ownerDocument) ? S.defaultView || S.parentWindow : window, C ? (w = a.relatedTarget || a.toElement, C = p, w = w ? qu(w) : null, w !== null && (pe = Ft(w), $ = w.tag, w !== pe || $ !== 5 && $ !== 27 && $ !== 6) && (w = null)) : (C = null, w = p), C !== w)) {
              if ($ = y2, E = "onMouseLeave", Yt = "onMouseEnter", g = "mouse", (t === "pointerout" || t === "pointerover") && ($ = v2, E = "onPointerLeave", Yt = "onPointerEnter", g = "pointer"), pe = C == null ? S : hc(C), b = w == null ? S : hc(w), S = new $(
                E,
                g + "leave",
                C,
                a,
                A
              ), S.target = pe, S.relatedTarget = b, E = null, qu(A) === p && ($ = new $(
                Yt,
                g + "enter",
                w,
                a,
                A
              ), $.target = b, $.relatedTarget = pe, E = $), pe = E, C && w)
                e: {
                  for ($ = Gi, Yt = C, g = w, b = 0, E = Yt; E; E = $(E))
                    b++;
                  E = 0;
                  for (var Y = g; Y; Y = $(Y))
                    E++;
                  for (; 0 < b - E; )
                    Yt = $(Yt), b--;
                  for (; 0 < E - b; )
                    g = $(g), E--;
                  for (; b--; ) {
                    if (Yt === g || g !== null && Yt === g.alternate) {
                      $ = Yt;
                      break e;
                    }
                    Yt = $(Yt), g = $(g);
                  }
                  $ = null;
                }
              else $ = null;
              C !== null && th(
                D,
                S,
                C,
                $,
                !1
              ), w !== null && pe !== null && th(
                D,
                pe,
                w,
                $,
                !0
              );
            }
          }
          t: {
            if (S = p ? hc(p) : window, C = S.nodeName && S.nodeName.toLowerCase(), C === "select" || C === "input" && S.type === "file")
              var J = vc;
            else if (T0(S))
              if (A2)
                J = us;
              else {
                J = E0;
                var pt = Q1;
              }
            else
              C = S.nodeName, !C || C.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? p && $n(p.elementType) && (J = vc) : J = A0;
            if (J && (J = J(t, p))) {
              as(
                D,
                J,
                a,
                A
              );
              break t;
            }
            pt && pt(t, S, p), t === "focusout" && p && S.type === "number" && p.memoizedProps.value != null && d0(S, "number", S.value);
          }
          switch (pt = p ? hc(p) : window, t) {
            case "focusin":
              (T0(pt) || pt.contentEditable === "true") && (Hh = pt, ig = p, Ty = null);
              break;
            case "focusout":
              Ty = ig = Hh = null;
              break;
            case "mousedown":
              og = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              og = !1, Tp(
                D,
                a,
                A
              );
              break;
            case "selectionchange":
              if (h3) break;
            case "keydown":
            case "keyup":
              Tp(
                D,
                a,
                A
              );
          }
          var nt;
          if (cg)
            t: {
              switch (t) {
                case "compositionstart":
                  var P = "onCompositionStart";
                  break t;
                case "compositionend":
                  P = "onCompositionEnd";
                  break t;
                case "compositionupdate":
                  P = "onCompositionUpdate";
                  break t;
              }
              P = void 0;
            }
          else
            Ch ? To(t, a) && (P = "onCompositionEnd") : t === "keydown" && a.keyCode === g2 && (P = "onCompositionStart");
          P && (S2 && a.locale !== "ko" && (Ch || P !== "onCompositionStart" ? P === "onCompositionEnd" && Ch && (nt = fi()) : (Af = A, lg = "value" in Af ? Af.value : Af.textContent, Ch = !0)), pt = Hn(
            p,
            P
          ), 0 < pt.length && (P = new p2(
            P,
            t,
            null,
            a,
            A
          ), D.push({
            event: P,
            listeners: pt
          }), nt ? P.data = nt : (nt = Gu(a), nt !== null && (P.data = nt)))), (nt = r3 ? b0(t, a) : Fr(t, a)) && (P = Hn(
            p,
            "onBeforeInput"
          ), 0 < P.length && (pt = new Wb(
            "onBeforeInput",
            "beforeinput",
            null,
            a,
            A
          ), D.push({
            event: pt,
            listeners: P
          }), pt.data = nt)), Ht(
            D,
            t,
            p,
            a,
            A
          );
        }
        Wt(D, e);
      });
    }
    function fe(t, e, a) {
      return {
        instance: t,
        listener: e,
        currentTarget: a
      };
    }
    function Hn(t, e) {
      for (var a = e + "Capture", c = []; t !== null; ) {
        var o = t, f = o.stateNode;
        if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || f === null || (o = Wn(t, a), o != null && c.unshift(
          fe(t, o, f)
        ), o = Wn(t, e), o != null && c.push(
          fe(t, o, f)
        )), t.tag === 3) return c;
        t = t.return;
      }
      return [];
    }
    function Gi(t) {
      if (t === null) return null;
      do
        t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function th(t, e, a, c, o) {
      for (var f = e._reactName, d = []; a !== null && a !== c; ) {
        var h = a, y = h.alternate, p = h.stateNode;
        if (h = h.tag, y !== null && y === c) break;
        h !== 5 && h !== 26 && h !== 27 || p === null || (y = p, o ? (p = Wn(a, f), p != null && d.unshift(
          fe(a, p, y)
        )) : o || (p = Wn(a, f), p != null && d.push(
          fe(a, p, y)
        ))), a = a.return;
      }
      d.length !== 0 && t.push({ event: e, listeners: d });
    }
    function aa(t, e) {
      pp(t, e), t !== "input" && t !== "textarea" && t !== "select" || e == null || e.value !== null || h2 || (h2 = !0, t === "select" && e.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        t
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        t
      ));
      var a = {
        registrationNameDependencies: Eu,
        possibleRegistrationNames: Tf
      };
      $n(t) || typeof e.is == "string" || X1(t, e, a), e.contentEditable && !e.suppressContentEditableWarning && e.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function Re(t, e, a, c) {
      e !== a && (a = Bn(a), Bn(e) !== a && (c[t] = e));
    }
    function Js(t, e, a) {
      e.forEach(function(c) {
        a[tc(c)] = c === "style" ? Vc(t) : t.getAttribute(c);
      });
    }
    function Ue(t, e) {
      e === !1 ? console.error(
        "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
        t,
        t,
        t
      ) : console.error(
        "Expected `%s` listener to be a function, instead got a value of `%s` type.",
        t,
        typeof e
      );
    }
    function eh(t, e) {
      return t = t.namespaceURI === vt || t.namespaceURI === bt ? t.ownerDocument.createElementNS(
        t.namespaceURI,
        t.tagName
      ) : t.ownerDocument.createElement(t.tagName), t.innerHTML = e, t.innerHTML;
    }
    function Bn(t) {
      return Ln(t) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        $f(t)
      ), ti(t)), (typeof t == "string" ? t : "" + t).replace(X3, `
`).replace(Q3, "");
    }
    function Ym(t, e) {
      return e = Bn(e), Bn(t) === e;
    }
    function Lt(t, e, a, c, o, f) {
      switch (a) {
        case "children":
          typeof c == "string" ? (Pf(c, e, !1), e === "body" || e === "textarea" && c === "" || oi(t, c)) : (typeof c == "number" || typeof c == "bigint") && (Pf("" + c, e, !1), e !== "body" && oi(t, "" + c));
          break;
        case "className":
          kf(t, "class", c);
          break;
        case "tabIndex":
          kf(t, "tabindex", c);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          kf(t, a, c);
          break;
        case "style":
          v0(t, c, f);
          break;
        case "data":
          if (e !== "object") {
            kf(t, "data", c);
            break;
          }
        case "src":
        case "href":
          if (c === "" && (e !== "a" || a !== "href")) {
            console.error(
              a === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              a,
              a
            ), t.removeAttribute(a);
            break;
          }
          if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
            t.removeAttribute(a);
            break;
          }
          It(c, a), c = ts("" + c), t.setAttribute(a, c);
          break;
        case "action":
        case "formAction":
          if (c != null && (e === "form" ? a === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof c == "function" && (o.encType == null && o.method == null || z1 || (z1 = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), o.target == null || A1 || (A1 = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : e === "input" || e === "button" ? a === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : e !== "input" || o.type === "submit" || o.type === "image" || E1 ? e !== "button" || o.type == null || o.type === "submit" || E1 ? typeof c == "function" && (o.name == null || IS || (IS = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), o.formEncType == null && o.formMethod == null || z1 || (z1 = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), o.formTarget == null || A1 || (A1 = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (E1 = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (E1 = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            a === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof c == "function") {
            t.setAttribute(
              a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (a === "formAction" ? (e !== "input" && Lt(t, e, "name", o.name, o, null), Lt(
              t,
              e,
              "formEncType",
              o.formEncType,
              o,
              null
            ), Lt(
              t,
              e,
              "formMethod",
              o.formMethod,
              o,
              null
            ), Lt(
              t,
              e,
              "formTarget",
              o.formTarget,
              o,
              null
            )) : (Lt(
              t,
              e,
              "encType",
              o.encType,
              o,
              null
            ), Lt(t, e, "method", o.method, o, null), Lt(
              t,
              e,
              "target",
              o.target,
              o,
              null
            )));
          if (c == null || typeof c == "symbol" || typeof c == "boolean") {
            t.removeAttribute(a);
            break;
          }
          It(c, a), c = ts("" + c), t.setAttribute(a, c);
          break;
        case "onClick":
          c != null && (typeof c != "function" && Ue(a, c), t.onclick = Wa);
          break;
        case "onScroll":
          c != null && (typeof c != "function" && Ue(a, c), st("scroll", t));
          break;
        case "onScrollEnd":
          c != null && (typeof c != "function" && Ue(a, c), st("scrollend", t));
          break;
        case "dangerouslySetInnerHTML":
          if (c != null) {
            if (typeof c != "object" || !("__html" in c))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = c.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              t.innerHTML = a;
            }
          }
          break;
        case "multiple":
          t.multiple = c && typeof c != "function" && typeof c != "symbol";
          break;
        case "muted":
          t.muted = c && typeof c != "function" && typeof c != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c == "symbol") {
            t.removeAttribute("xlink:href");
            break;
          }
          It(c, a), a = ts("" + c), t.setAttributeNS(Ur, "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          c != null && typeof c != "function" && typeof c != "symbol" ? (It(c, a), t.setAttribute(a, "" + c)) : t.removeAttribute(a);
          break;
        case "inert":
          c !== "" || D1[a] || (D1[a] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            a
          ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          c && typeof c != "function" && typeof c != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
          break;
        case "capture":
        case "download":
          c === !0 ? t.setAttribute(a, "") : c !== !1 && c != null && typeof c != "function" && typeof c != "symbol" ? (It(c, a), t.setAttribute(a, c)) : t.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ? (It(c, a), t.setAttribute(a, c)) : t.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? t.removeAttribute(a) : (It(c, a), t.setAttribute(a, c));
          break;
        case "popover":
          st("beforetoggle", t), st("toggle", t), Gr(t, "popover", c);
          break;
        case "xlinkActuate":
          wn(
            t,
            Ur,
            "xlink:actuate",
            c
          );
          break;
        case "xlinkArcrole":
          wn(
            t,
            Ur,
            "xlink:arcrole",
            c
          );
          break;
        case "xlinkRole":
          wn(
            t,
            Ur,
            "xlink:role",
            c
          );
          break;
        case "xlinkShow":
          wn(
            t,
            Ur,
            "xlink:show",
            c
          );
          break;
        case "xlinkTitle":
          wn(
            t,
            Ur,
            "xlink:title",
            c
          );
          break;
        case "xlinkType":
          wn(
            t,
            Ur,
            "xlink:type",
            c
          );
          break;
        case "xmlBase":
          wn(
            t,
            e2,
            "xml:base",
            c
          );
          break;
        case "xmlLang":
          wn(
            t,
            e2,
            "xml:lang",
            c
          );
          break;
        case "xmlSpace":
          wn(
            t,
            e2,
            "xml:space",
            c
          );
          break;
        case "is":
          f != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), Gr(t, "is", c);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          PS || c == null || typeof c != "object" || (PS = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            c
          ));
        default:
          !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? (a = mp(a), Gr(t, a, c)) : Eu.hasOwnProperty(a) && c != null && typeof c != "function" && Ue(a, c);
      }
    }
    function tf(t, e, a, c, o, f) {
      switch (a) {
        case "style":
          v0(t, c, f);
          break;
        case "dangerouslySetInnerHTML":
          if (c != null) {
            if (typeof c != "object" || !("__html" in c))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = c.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              t.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof c == "string" ? oi(t, c) : (typeof c == "number" || typeof c == "bigint") && oi(t, "" + c);
          break;
        case "onScroll":
          c != null && (typeof c != "function" && Ue(a, c), st("scroll", t));
          break;
        case "onScrollEnd":
          c != null && (typeof c != "function" && Ue(a, c), st("scrollend", t));
          break;
        case "onClick":
          c != null && (typeof c != "function" && Ue(a, c), t.onclick = Wa);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (Eu.hasOwnProperty(a))
            c != null && typeof c != "function" && Ue(a, c);
          else
            t: {
              if (a[0] === "o" && a[1] === "n" && (o = a.endsWith("Capture"), e = a.slice(2, o ? a.length - 7 : void 0), f = t[ca] || null, f = f != null ? f[a] : null, typeof f == "function" && t.removeEventListener(e, f, o), typeof c == "function")) {
                typeof f != "function" && f !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), t.addEventListener(e, c, o);
                break t;
              }
              a in t ? t[a] = c : c === !0 ? t.setAttribute(a, "") : Gr(t, a, c);
            }
      }
    }
    function be(t, e, a) {
      switch (aa(e, a), e) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          st("error", t), st("load", t);
          var c = !1, o = !1, f;
          for (f in a)
            if (a.hasOwnProperty(f)) {
              var d = a[f];
              if (d != null)
                switch (f) {
                  case "src":
                    c = !0;
                    break;
                  case "srcSet":
                    o = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    Lt(t, e, f, d, a, null);
                }
            }
          o && Lt(t, e, "srcSet", a.srcSet, a, null), c && Lt(t, e, "src", a.src, a, null);
          return;
        case "input":
          ai("input", a), st("invalid", t);
          var h = f = d = o = null, y = null, p = null;
          for (c in a)
            if (a.hasOwnProperty(c)) {
              var A = a[c];
              if (A != null)
                switch (c) {
                  case "name":
                    o = A;
                    break;
                  case "type":
                    d = A;
                    break;
                  case "checked":
                    y = A;
                    break;
                  case "defaultChecked":
                    p = A;
                    break;
                  case "value":
                    f = A;
                    break;
                  case "defaultValue":
                    h = A;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (A != null)
                      throw Error(
                        e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    Lt(t, e, c, A, a, null);
                }
            }
          wl(t, a), Vr(
            t,
            f,
            h,
            y,
            p,
            d,
            o,
            !1
          );
          return;
        case "select":
          ai("select", a), st("invalid", t), c = d = f = null;
          for (o in a)
            if (a.hasOwnProperty(o) && (h = a[o], h != null))
              switch (o) {
                case "value":
                  f = h;
                  break;
                case "defaultValue":
                  d = h;
                  break;
                case "multiple":
                  c = h;
                default:
                  Lt(
                    t,
                    e,
                    o,
                    h,
                    a,
                    null
                  );
              }
          Zr(t, a), e = f, a = d, t.multiple = !!c, e != null ? Jn(t, !!c, e, !1) : a != null && Jn(t, !!c, a, !0);
          return;
        case "textarea":
          ai("textarea", a), st("invalid", t), f = o = c = null;
          for (d in a)
            if (a.hasOwnProperty(d) && (h = a[d], h != null))
              switch (d) {
                case "value":
                  c = h;
                  break;
                case "defaultValue":
                  o = h;
                  break;
                case "children":
                  f = h;
                  break;
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  Lt(
                    t,
                    e,
                    d,
                    h,
                    a,
                    null
                  );
              }
          ni(t, a), yo(t, c, o, f);
          return;
        case "option":
          hp(t, a);
          for (y in a)
            a.hasOwnProperty(y) && (c = a[y], c != null) && (y === "selected" ? t.selected = c && typeof c != "function" && typeof c != "symbol" : Lt(t, e, y, c, a, null));
          return;
        case "dialog":
          st("beforetoggle", t), st("toggle", t), st("cancel", t), st("close", t);
          break;
        case "iframe":
        case "object":
          st("load", t);
          break;
        case "video":
        case "audio":
          for (c = 0; c < Fy.length; c++)
            st(Fy[c], t);
          break;
        case "image":
          st("error", t), st("load", t);
          break;
        case "details":
          st("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          st("error", t), st("load", t);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (p in a)
            if (a.hasOwnProperty(p) && (c = a[p], c != null))
              switch (p) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  Lt(t, e, p, c, a, null);
              }
          return;
        default:
          if ($n(e)) {
            for (A in a)
              a.hasOwnProperty(A) && (c = a[A], c !== void 0 && tf(
                t,
                e,
                A,
                c,
                a,
                void 0
              ));
            return;
          }
      }
      for (h in a)
        a.hasOwnProperty(h) && (c = a[h], c != null && Lt(t, e, h, c, a, null));
    }
    function el(t, e, a, c) {
      switch (aa(e, c), e) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var o = null, f = null, d = null, h = null, y = null, p = null, A = null;
          for (C in a) {
            var D = a[C];
            if (a.hasOwnProperty(C) && D != null)
              switch (C) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  y = D;
                default:
                  c.hasOwnProperty(C) || Lt(
                    t,
                    e,
                    C,
                    null,
                    c,
                    D
                  );
              }
          }
          for (var S in c) {
            var C = c[S];
            if (D = a[S], c.hasOwnProperty(S) && (C != null || D != null))
              switch (S) {
                case "type":
                  f = C;
                  break;
                case "name":
                  o = C;
                  break;
                case "checked":
                  p = C;
                  break;
                case "defaultChecked":
                  A = C;
                  break;
                case "value":
                  d = C;
                  break;
                case "defaultValue":
                  h = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null)
                    throw Error(
                      e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  C !== D && Lt(
                    t,
                    e,
                    S,
                    C,
                    c,
                    D
                  );
              }
          }
          e = a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null, c = c.type === "checkbox" || c.type === "radio" ? c.checked != null : c.value != null, e || !c || FS || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), FS = !0), !e || c || kS || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), kS = !0), mc(
            t,
            d,
            h,
            y,
            p,
            A,
            f,
            o
          );
          return;
        case "select":
          C = d = h = S = null;
          for (f in a)
            if (y = a[f], a.hasOwnProperty(f) && y != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  C = y;
                default:
                  c.hasOwnProperty(f) || Lt(
                    t,
                    e,
                    f,
                    null,
                    c,
                    y
                  );
              }
          for (o in c)
            if (f = c[o], y = a[o], c.hasOwnProperty(o) && (f != null || y != null))
              switch (o) {
                case "value":
                  S = f;
                  break;
                case "defaultValue":
                  h = f;
                  break;
                case "multiple":
                  d = f;
                default:
                  f !== y && Lt(
                    t,
                    e,
                    o,
                    f,
                    c,
                    y
                  );
              }
          c = h, e = d, a = C, S != null ? Jn(t, !!e, S, !1) : !!a != !!e && (c != null ? Jn(t, !!e, c, !0) : Jn(t, !!e, e ? [] : "", !1));
          return;
        case "textarea":
          C = S = null;
          for (h in a)
            if (o = a[h], a.hasOwnProperty(h) && o != null && !c.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  Lt(t, e, h, null, c, o);
              }
          for (d in c)
            if (o = c[d], f = a[d], c.hasOwnProperty(d) && (o != null || f != null))
              switch (d) {
                case "value":
                  S = o;
                  break;
                case "defaultValue":
                  C = o;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (o != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  o !== f && Lt(t, e, d, o, c, f);
              }
          ui(t, S, C);
          return;
        case "option":
          for (var w in a)
            S = a[w], a.hasOwnProperty(w) && S != null && !c.hasOwnProperty(w) && (w === "selected" ? t.selected = !1 : Lt(
              t,
              e,
              w,
              null,
              c,
              S
            ));
          for (y in c)
            S = c[y], C = a[y], c.hasOwnProperty(y) && S !== C && (S != null || C != null) && (y === "selected" ? t.selected = S && typeof S != "function" && typeof S != "symbol" : Lt(
              t,
              e,
              y,
              S,
              c,
              C
            ));
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var $ in a)
            S = a[$], a.hasOwnProperty($) && S != null && !c.hasOwnProperty($) && Lt(
              t,
              e,
              $,
              null,
              c,
              S
            );
          for (p in c)
            if (S = c[p], C = a[p], c.hasOwnProperty(p) && S !== C && (S != null || C != null))
              switch (p) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (S != null)
                    throw Error(
                      e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  Lt(
                    t,
                    e,
                    p,
                    S,
                    c,
                    C
                  );
              }
          return;
        default:
          if ($n(e)) {
            for (var pe in a)
              S = a[pe], a.hasOwnProperty(pe) && S !== void 0 && !c.hasOwnProperty(pe) && tf(
                t,
                e,
                pe,
                void 0,
                c,
                S
              );
            for (A in c)
              S = c[A], C = a[A], !c.hasOwnProperty(A) || S === C || S === void 0 && C === void 0 || tf(
                t,
                e,
                A,
                S,
                c,
                C
              );
            return;
          }
      }
      for (var Yt in a)
        S = a[Yt], a.hasOwnProperty(Yt) && S != null && !c.hasOwnProperty(Yt) && Lt(t, e, Yt, null, c, S);
      for (D in c)
        S = c[D], C = a[D], !c.hasOwnProperty(D) || S === C || S == null && C == null || Lt(t, e, D, S, c, C);
    }
    function tc(t) {
      switch (t) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return t;
      }
    }
    function Vc(t) {
      var e = {};
      t = t.style;
      for (var a = 0; a < t.length; a++) {
        var c = t[a];
        e[c] = t.getPropertyValue(c);
      }
      return e;
    }
    function pu(t, e, a) {
      if (e != null && typeof e != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var c, o = c = "", f;
        for (f in e)
          if (e.hasOwnProperty(f)) {
            var d = e[f];
            d != null && typeof d != "boolean" && d !== "" && (f.indexOf("--") === 0 ? (u0(d, f), c += o + f + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || I.has(f) ? (u0(d, f), c += o + f.replace(N, "-$1").toLowerCase().replace(F, "-ms-") + ":" + ("" + d).trim()) : c += o + f.replace(N, "-$1").toLowerCase().replace(F, "-ms-") + ":" + d + "px", o = ";");
          }
        c = c || null, e = t.getAttribute("style"), e !== c && (c = Bn(c), Bn(e) !== c && (a.style = Vc(t)));
      }
    }
    function ha(t, e, a, c, o, f) {
      if (o.delete(a), t = t.getAttribute(a), t === null)
        switch (typeof c) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (c != null)
        switch (typeof c) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (It(c, e), t === "" + c)
              return;
        }
      Re(e, t, c, f);
    }
    function lh(t, e, a, c, o, f) {
      if (o.delete(a), t = t.getAttribute(a), t === null) {
        switch (typeof c) {
          case "function":
          case "symbol":
            return;
        }
        if (!c) return;
      } else
        switch (typeof c) {
          case "function":
          case "symbol":
            break;
          default:
            if (c) return;
        }
      Re(e, t, c, f);
    }
    function ah(t, e, a, c, o, f) {
      if (o.delete(a), t = t.getAttribute(a), t === null)
        switch (typeof c) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (c != null)
        switch (typeof c) {
          case "function":
          case "symbol":
            break;
          default:
            if (It(c, a), t === "" + c)
              return;
        }
      Re(e, t, c, f);
    }
    function ef(t, e, a, c, o, f) {
      if (o.delete(a), t = t.getAttribute(a), t === null)
        switch (typeof c) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(c)) return;
        }
      else if (c != null)
        switch (typeof c) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (!isNaN(c) && (It(c, e), t === "" + c))
              return;
        }
      Re(e, t, c, f);
    }
    function Ks(t, e, a, c, o, f) {
      if (o.delete(a), t = t.getAttribute(a), t === null)
        switch (typeof c) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (c != null)
        switch (typeof c) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (It(c, e), a = ts("" + c), t === a)
              return;
        }
      Re(e, t, c, f);
    }
    function ma(t, e, a, c) {
      for (var o = {}, f = /* @__PURE__ */ new Set(), d = t.attributes, h = 0; h < d.length; h++)
        switch (d[h].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            f.add(d[h].name);
        }
      if ($n(e)) {
        for (var y in a)
          if (a.hasOwnProperty(y)) {
            var p = a[y];
            if (p != null) {
              if (Eu.hasOwnProperty(y))
                typeof p != "function" && Ue(y, p);
              else if (a.suppressHydrationWarning !== !0)
                switch (y) {
                  case "children":
                    typeof p != "string" && typeof p != "number" || Re(
                      "children",
                      t.textContent,
                      p,
                      o
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    d = t.innerHTML, p = p ? p.__html : void 0, p != null && (p = eh(t, p), Re(
                      y,
                      d,
                      p,
                      o
                    ));
                    continue;
                  case "style":
                    f.delete(y), pu(t, p, o);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    f.delete(y.toLowerCase()), console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      y
                    );
                    continue;
                  case "className":
                    f.delete("class"), d = mo(
                      t,
                      "class",
                      p
                    ), Re(
                      "className",
                      d,
                      p,
                      o
                    );
                    continue;
                  default:
                    c.context === fo && e !== "svg" && e !== "math" ? f.delete(y.toLowerCase()) : f.delete(y), d = mo(
                      t,
                      y,
                      p
                    ), Re(
                      y,
                      d,
                      p,
                      o
                    );
                }
            }
          }
      } else
        for (p in a)
          if (a.hasOwnProperty(p) && (y = a[p], y != null)) {
            if (Eu.hasOwnProperty(p))
              typeof y != "function" && Ue(p, y);
            else if (a.suppressHydrationWarning !== !0)
              switch (p) {
                case "children":
                  typeof y != "string" && typeof y != "number" || Re(
                    "children",
                    t.textContent,
                    y,
                    o
                  );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  d = t.innerHTML, y = y ? y.__html : void 0, y != null && (y = eh(t, y), d !== y && (o[p] = { __html: d }));
                  continue;
                case "className":
                  ha(
                    t,
                    p,
                    "class",
                    y,
                    f,
                    o
                  );
                  continue;
                case "tabIndex":
                  ha(
                    t,
                    p,
                    "tabindex",
                    y,
                    f,
                    o
                  );
                  continue;
                case "style":
                  f.delete(p), pu(t, y, o);
                  continue;
                case "multiple":
                  f.delete(p), Re(
                    p,
                    t.multiple,
                    y,
                    o
                  );
                  continue;
                case "muted":
                  f.delete(p), Re(
                    p,
                    t.muted,
                    y,
                    o
                  );
                  continue;
                case "autoFocus":
                  f.delete("autofocus"), Re(
                    p,
                    t.autofocus,
                    y,
                    o
                  );
                  continue;
                case "data":
                  if (e !== "object") {
                    f.delete(p), d = t.getAttribute("data"), Re(
                      p,
                      d,
                      y,
                      o
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (!(y !== "" || e === "a" && p === "href" || e === "object" && p === "data")) {
                    console.error(
                      p === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      p,
                      p
                    );
                    continue;
                  }
                  Ks(
                    t,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                case "action":
                case "formAction":
                  if (d = t.getAttribute(p), typeof y == "function") {
                    f.delete(p.toLowerCase()), p === "formAction" ? (f.delete("name"), f.delete("formenctype"), f.delete("formmethod"), f.delete("formtarget")) : (f.delete("enctype"), f.delete("method"), f.delete("target"));
                    continue;
                  } else if (d === V3) {
                    f.delete(p.toLowerCase()), Re(
                      p,
                      "function",
                      y,
                      o
                    );
                    continue;
                  }
                  Ks(
                    t,
                    p,
                    p.toLowerCase(),
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkHref":
                  Ks(
                    t,
                    p,
                    "xlink:href",
                    y,
                    f,
                    o
                  );
                  continue;
                case "contentEditable":
                  ah(
                    t,
                    p,
                    "contenteditable",
                    y,
                    f,
                    o
                  );
                  continue;
                case "spellCheck":
                  ah(
                    t,
                    p,
                    "spellcheck",
                    y,
                    f,
                    o
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  ah(
                    t,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                  lh(
                    t,
                    p,
                    p.toLowerCase(),
                    y,
                    f,
                    o
                  );
                  continue;
                case "capture":
                case "download":
                  t: {
                    h = t;
                    var A = d = p, D = o;
                    if (f.delete(A), h = h.getAttribute(A), h === null)
                      switch (typeof y) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break t;
                        default:
                          if (y === !1) break t;
                      }
                    else if (y != null)
                      switch (typeof y) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (y === !0 && h === "") break t;
                          break;
                        default:
                          if (It(y, d), h === "" + y)
                            break t;
                      }
                    Re(
                      d,
                      h,
                      y,
                      D
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  t: {
                    if (h = t, A = d = p, D = o, f.delete(A), h = h.getAttribute(A), h === null)
                      switch (typeof y) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break t;
                        default:
                          if (isNaN(y) || 1 > y) break t;
                      }
                    else if (y != null)
                      switch (typeof y) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (!(isNaN(y) || 1 > y) && (It(y, d), h === "" + y))
                            break t;
                      }
                    Re(
                      d,
                      h,
                      y,
                      D
                    );
                  }
                  continue;
                case "rowSpan":
                  ef(
                    t,
                    p,
                    "rowspan",
                    y,
                    f,
                    o
                  );
                  continue;
                case "start":
                  ef(
                    t,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                case "xHeight":
                  ha(
                    t,
                    p,
                    "x-height",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkActuate":
                  ha(
                    t,
                    p,
                    "xlink:actuate",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkArcrole":
                  ha(
                    t,
                    p,
                    "xlink:arcrole",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkRole":
                  ha(
                    t,
                    p,
                    "xlink:role",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkShow":
                  ha(
                    t,
                    p,
                    "xlink:show",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkTitle":
                  ha(
                    t,
                    p,
                    "xlink:title",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xlinkType":
                  ha(
                    t,
                    p,
                    "xlink:type",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xmlBase":
                  ha(
                    t,
                    p,
                    "xml:base",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xmlLang":
                  ha(
                    t,
                    p,
                    "xml:lang",
                    y,
                    f,
                    o
                  );
                  continue;
                case "xmlSpace":
                  ha(
                    t,
                    p,
                    "xml:space",
                    y,
                    f,
                    o
                  );
                  continue;
                case "inert":
                  y !== "" || D1[p] || (D1[p] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    p
                  )), lh(
                    t,
                    p,
                    p,
                    y,
                    f,
                    o
                  );
                  continue;
                default:
                  if (!(2 < p.length) || p[0] !== "o" && p[0] !== "O" || p[1] !== "n" && p[1] !== "N") {
                    h = mp(p), d = !1, c.context === fo && e !== "svg" && e !== "math" ? f.delete(h.toLowerCase()) : (A = p.toLowerCase(), A = Yn.hasOwnProperty(
                      A
                    ) && Yn[A] || null, A !== null && A !== p && (d = !0, f.delete(A)), f.delete(h));
                    t: if (A = t, D = h, h = y, Wf(D))
                      if (A.hasAttribute(D))
                        A = A.getAttribute(
                          D
                        ), It(
                          h,
                          D
                        ), h = A === "" + h ? h : A;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break t;
                          case "boolean":
                            if (A = D.toLowerCase().slice(0, 5), A !== "data-" && A !== "aria-")
                              break t;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || Re(
                      p,
                      h,
                      y,
                      o
                    );
                  }
              }
          }
      return 0 < f.size && a.suppressHydrationWarning !== !0 && Js(t, f, o), Object.keys(o).length === 0 ? null : o;
    }
    function tv(t, e) {
      switch (t.length) {
        case 0:
          return "";
        case 1:
          return t[0];
        case 2:
          return t[0] + " " + e + " " + t[1];
        default:
          return t.slice(0, -1).join(", ") + ", " + e + " " + t[t.length - 1];
      }
    }
    function na(t) {
      switch (t) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return !0;
        default:
          return !1;
      }
    }
    function ev() {
      if (typeof performance.getEntriesByType == "function") {
        for (var t = 0, e = 0, a = performance.getEntriesByType("resource"), c = 0; c < a.length; c++) {
          var o = a[c], f = o.transferSize, d = o.initiatorType, h = o.duration;
          if (f && h && na(d)) {
            for (d = 0, h = o.responseEnd, c += 1; c < a.length; c++) {
              var y = a[c], p = y.startTime;
              if (p > h) break;
              var A = y.transferSize, D = y.initiatorType;
              A && na(D) && (y = y.responseEnd, d += A * (y < h ? 1 : (h - p) / (y - p)));
            }
            if (--c, e += 8 * (f + d) / (o.duration / 1e3), t++, 10 < t) break;
          }
        }
        if (0 < t) return e / t / 1e6;
      }
      return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
    }
    function $s(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function lv(t) {
      switch (t) {
        case bt:
          return a0;
        case vt:
          return M1;
        default:
          return fo;
      }
    }
    function ec(t, e) {
      if (t === fo)
        switch (e) {
          case "svg":
            return a0;
          case "math":
            return M1;
          default:
            return fo;
        }
      return t === a0 && e === "foreignObject" ? fo : t;
    }
    function lf(t, e) {
      return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
    }
    function jm() {
      var t = window.event;
      return t && t.type === "popstate" ? t === u2 ? !1 : (u2 = t, !0) : (u2 = null, !1);
    }
    function vu() {
      var t = window.event;
      return t && t !== tp ? t.type : null;
    }
    function af() {
      var t = window.event;
      return t && t !== tp ? t.timeStamp : -1.1;
    }
    function av(t) {
      setTimeout(function() {
        throw t;
      });
    }
    function nv(t, e, a) {
      switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && t.focus();
          break;
        case "img":
          a.src ? t.src = a.src : a.srcSet && (t.srcset = a.srcSet);
      }
    }
    function uv() {
    }
    function nh(t, e, a, c) {
      el(t, e, a, c), t[ca] = c;
    }
    function uh(t) {
      oi(t, "");
    }
    function $1(t, e, a) {
      t.nodeValue = a;
    }
    function cv(t) {
      if (!t.__reactWarnedAboutChildrenConflict) {
        var e = t[ca] || null;
        if (e !== null) {
          var a = dn(t);
          a !== null && (typeof e.children == "string" || typeof e.children == "number" ? (t.__reactWarnedAboutChildrenConflict = !0, W(a, function() {
            console.error(
              'Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "children" text content using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.'
            );
          })) : e.dangerouslySetInnerHTML != null && (t.__reactWarnedAboutChildrenConflict = !0, W(a, function() {
            console.error(
              'Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets "dangerouslySetInnerHTML" using React. It should be a leaf with no children. Otherwise it\'s ambiguous which children should be used.'
            );
          })));
        }
      }
    }
    function Zc(t) {
      return t === "head";
    }
    function iv(t, e) {
      t.removeChild(e);
    }
    function ov(t, e) {
      (t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t).removeChild(e);
    }
    function Xi(t, e) {
      var a = e, c = 0;
      do {
        var o = a.nextSibling;
        if (t.removeChild(a), o && o.nodeType === 8)
          if (a = o.data, a === Py || a === O1) {
            if (c === 0) {
              t.removeChild(o), Li(e);
              return;
            }
            c--;
          } else if (a === Iy || a === Qf || a === Cr || a === l0 || a === _r)
            c++;
          else if (a === L3)
            ac(
              t.ownerDocument.documentElement
            );
          else if (a === J3) {
            a = t.ownerDocument.head, ac(a);
            for (var f = a.firstChild; f; ) {
              var d = f.nextSibling, h = f.nodeName;
              f[bf] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && f.rel.toLowerCase() === "stylesheet" || a.removeChild(f), f = d;
            }
          } else
            a === w3 && ac(t.ownerDocument.body);
        a = o;
      } while (a);
      Li(e);
    }
    function Ws(t, e) {
      var a = t;
      t = 0;
      do {
        var c = a.nextSibling;
        if (a.nodeType === 1 ? e ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (e ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), c && c.nodeType === 8)
          if (a = c.data, a === Py) {
            if (t === 0) break;
            t--;
          } else
            a !== Iy && a !== Qf && a !== Cr && a !== l0 || t++;
        a = c;
      } while (a);
    }
    function fv(t) {
      Ws(t, !0);
    }
    function sv(t) {
      t = t.style, typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function rv(t) {
      t.nodeValue = "";
    }
    function dv(t) {
      Ws(t, !1);
    }
    function hv(t, e) {
      e = e[K3], e = e != null && e.hasOwnProperty("display") ? e.display : null, t.style.display = e == null || typeof e == "boolean" ? "" : ("" + e).trim();
    }
    function mv(t, e) {
      t.nodeValue = e;
    }
    function nf(t) {
      var e = t.firstChild;
      for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
        var a = e;
        switch (e = e.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            nf(a), f0(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        t.removeChild(a);
      }
    }
    function yv(t, e, a, c) {
      for (; t.nodeType === 1; ) {
        var o = a;
        if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
          if (!c && (t.nodeName !== "INPUT" || t.type !== "hidden"))
            break;
        } else if (c) {
          if (!t[bf])
            switch (e) {
              case "meta":
                if (!t.hasAttribute("itemprop")) break;
                return t;
              case "link":
                if (f = t.getAttribute("rel"), f === "stylesheet" && t.hasAttribute("data-precedence"))
                  break;
                if (f !== o.rel || t.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || t.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || t.getAttribute("title") !== (o.title == null ? null : o.title))
                  break;
                return t;
              case "style":
                if (t.hasAttribute("data-precedence")) break;
                return t;
              case "script":
                if (f = t.getAttribute("src"), (f !== (o.src == null ? null : o.src) || t.getAttribute("type") !== (o.type == null ? null : o.type) || t.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && f && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                  break;
                return t;
              default:
                return t;
            }
        } else if (e === "input" && t.type === "hidden") {
          It(o.name, "name");
          var f = o.name == null ? null : "" + o.name;
          if (o.type === "hidden" && t.getAttribute("name") === f)
            return t;
        } else return t;
        if (t = xa(t.nextSibling), t === null) break;
      }
      return null;
    }
    function pv(t, e, a) {
      if (e === "") return null;
      for (; t.nodeType !== 3; )
        if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = xa(t.nextSibling), t === null)) return null;
      return t;
    }
    function kt(t, e) {
      for (; t.nodeType !== 8; )
        if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = xa(t.nextSibling), t === null)) return null;
      return t;
    }
    function ks(t) {
      return t.data === Qf || t.data === Cr;
    }
    function Gm(t) {
      return t.data === l0 || t.data === Qf && t.ownerDocument.readyState !== eb;
    }
    function vv(t, e) {
      var a = t.ownerDocument;
      if (t.data === Cr)
        t._reactRetry = e;
      else if (t.data !== Qf || a.readyState !== eb)
        e();
      else {
        var c = function() {
          e(), a.removeEventListener("DOMContentLoaded", c);
        };
        a.addEventListener("DOMContentLoaded", c), t._reactRetry = c;
      }
    }
    function xa(t) {
      for (; t != null; t = t.nextSibling) {
        var e = t.nodeType;
        if (e === 1 || e === 3) break;
        if (e === 8) {
          if (e = t.data, e === Iy || e === l0 || e === Qf || e === Cr || e === _r || e === l2 || e === tb)
            break;
          if (e === Py || e === O1)
            return null;
        }
      }
      return t;
    }
    function gv(t) {
      if (t.nodeType === 1) {
        for (var e = t.nodeName.toLowerCase(), a = {}, c = t.attributes, o = 0; o < c.length; o++) {
          var f = c[o];
          a[tc(f.name)] = f.name.toLowerCase() === "style" ? Vc(t) : f.value;
        }
        return { type: e, props: a };
      }
      return t.nodeType === 8 ? t.data === _r ? { type: "Activity", props: {} } : { type: "Suspense", props: {} } : t.nodeValue;
    }
    function Sv(t, e, a) {
      return a === null || a[Z3] !== !0 ? (t.nodeValue === e ? t = null : (e = Bn(e), t = Bn(t.nodeValue) === e ? null : t.nodeValue), t) : null;
    }
    function uf(t) {
      t = t.nextSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var a = t.data;
          if (a === Py || a === O1) {
            if (e === 0)
              return xa(t.nextSibling);
            e--;
          } else
            a !== Iy && a !== l0 && a !== Qf && a !== Cr && a !== _r || e++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function Qi(t) {
      t = t.previousSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var a = t.data;
          if (a === Iy || a === l0 || a === Qf || a === Cr || a === _r) {
            if (e === 0) return t;
            e--;
          } else
            a !== Py && a !== O1 || e++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Xm(t) {
      Li(t);
    }
    function ch(t) {
      Li(t);
    }
    function Qm(t) {
      Li(t);
    }
    function lc(t, e, a, c, o) {
      switch (o && If(t, c.ancestorInfo), e = $s(a), t) {
        case "html":
          if (t = e.documentElement, !t)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return t;
        case "head":
          if (t = e.head, !t)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return t;
        case "body":
          if (t = e.body, !t)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return t;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function gu(t, e, a, c) {
      if (!a[uc] && dn(a)) {
        var o = a.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          o,
          o,
          o
        );
      }
      switch (t) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (o = a.attributes; o.length; )
        a.removeAttributeNode(o[0]);
      be(a, t, e), a[Te] = c, a[ca] = e;
    }
    function ac(t) {
      for (var e = t.attributes; e.length; )
        t.removeAttributeNode(e[0]);
      f0(t);
    }
    function ih(t) {
      return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
    }
    function Vm(t, e, a) {
      var c = n0;
      if (c && typeof e == "string" && e) {
        var o = Pt(e);
        o = 'link[rel="' + t + '"][href="' + o + '"]', typeof a == "string" && (o += '[crossorigin="' + a + '"]'), ib.has(o) || (ib.add(o), t = { rel: t, crossOrigin: a, href: e }, c.querySelector(o) === null && (e = c.createElement("link"), be(e, "link", t), Xe(e), c.head.appendChild(e)));
      }
    }
    function Zm(t, e, a, c) {
      var o = (o = qa.current) ? ih(o) : null;
      if (!o)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (t) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = Vi(a.href), e = $a(o).hoistableStyles, c = e.get(a), c || (c = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, e.set(a, c)), c) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            t = Vi(a.href);
            var f = $a(o).hoistableStyles, d = f.get(t);
            if (!d && (o = o.ownerDocument || o, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: Br, preload: null }
            }, f.set(t, d), (f = o.querySelector(
              Is(t)
            )) && !f._p && (d.instance = f, d.state.loading = ep | Bu), !Nu.has(t))) {
              var h = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              Nu.set(t, h), f || bv(
                o,
                t,
                h,
                d.state
              );
            }
            if (e && c === null)
              throw a = `

  - ` + Fs(e) + `
  + ` + Fs(a), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
              );
            return d;
          }
          if (e && c !== null)
            throw a = `

  - ` + Fs(e) + `
  + ` + Fs(a), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
            );
          return null;
        case "script":
          return e = a.async, a = a.src, typeof a == "string" && e && typeof e != "function" && typeof e != "symbol" ? (a = Zi(a), e = $a(o).hoistableScripts, c = e.get(a), c || (c = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, e.set(a, c)), c) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + t + '". this is a bug in React.'
          );
      }
    }
    function Fs(t) {
      var e = 0, a = "<link";
      return typeof t.rel == "string" ? (e++, a += ' rel="' + t.rel + '"') : Ya.call(t, "rel") && (e++, a += ' rel="' + (t.rel === null ? "null" : "invalid type " + typeof t.rel) + '"'), typeof t.href == "string" ? (e++, a += ' href="' + t.href + '"') : Ya.call(t, "href") && (e++, a += ' href="' + (t.href === null ? "null" : "invalid type " + typeof t.href) + '"'), typeof t.precedence == "string" ? (e++, a += ' precedence="' + t.precedence + '"') : Ya.call(t, "precedence") && (e++, a += " precedence={" + (t.precedence === null ? "null" : "invalid type " + typeof t.precedence) + "}"), Object.getOwnPropertyNames(t).length > e && (a += " ..."), a + " />";
    }
    function Vi(t) {
      return 'href="' + Pt(t) + '"';
    }
    function Is(t) {
      return 'link[rel="stylesheet"][' + t + "]";
    }
    function oh(t) {
      return Et({}, t, {
        "data-precedence": t.precedence,
        precedence: null
      });
    }
    function bv(t, e, a, c) {
      t.querySelector(
        'link[rel="preload"][as="style"][' + e + "]"
      ) ? c.loading = ep : (e = t.createElement("link"), c.preload = e, e.addEventListener("load", function() {
        return c.loading |= ep;
      }), e.addEventListener("error", function() {
        return c.loading |= ub;
      }), be(e, "link", a), Xe(e), t.head.appendChild(e));
    }
    function Zi(t) {
      return '[src="' + Pt(t) + '"]';
    }
    function Ps(t) {
      return "script[async]" + t;
    }
    function fh(t, e, a) {
      if (e.count++, e.instance === null)
        switch (e.type) {
          case "style":
            var c = t.querySelector(
              'style[data-href~="' + Pt(a.href) + '"]'
            );
            if (c)
              return e.instance = c, Xe(c), c;
            var o = Et({}, a, {
              "data-href": a.href,
              "data-precedence": a.precedence,
              href: null,
              precedence: null
            });
            return c = (t.ownerDocument || t).createElement("style"), Xe(c), be(c, "style", o), cf(c, a.precedence, t), e.instance = c;
          case "stylesheet":
            o = Vi(a.href);
            var f = t.querySelector(
              Is(o)
            );
            if (f)
              return e.state.loading |= Bu, e.instance = f, Xe(f), f;
            c = oh(a), (o = Nu.get(o)) && Lm(c, o), f = (t.ownerDocument || t).createElement("link"), Xe(f);
            var d = f;
            return d._p = new Promise(function(h, y) {
              d.onload = h, d.onerror = y;
            }), be(f, "link", c), e.state.loading |= Bu, cf(f, a.precedence, t), e.instance = f;
          case "script":
            return f = Zi(a.src), (o = t.querySelector(
              Ps(f)
            )) ? (e.instance = o, Xe(o), o) : (c = a, (o = Nu.get(f)) && (c = Et({}, a), wm(c, o)), t = t.ownerDocument || t, o = t.createElement("script"), Xe(o), be(o, "link", c), t.head.appendChild(o), e.instance = o);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + e.type + '". this is a bug in React.'
            );
        }
      else
        e.type === "stylesheet" && (e.state.loading & Bu) === Br && (c = e.instance, e.state.loading |= Bu, cf(c, a.precedence, t));
      return e.instance;
    }
    function cf(t, e, a) {
      for (var c = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), o = c.length ? c[c.length - 1] : null, f = o, d = 0; d < c.length; d++) {
        var h = c[d];
        if (h.dataset.precedence === e) f = h;
        else if (f !== o) break;
      }
      f ? f.parentNode.insertBefore(t, f.nextSibling) : (e = a.nodeType === 9 ? a.head : a, e.insertBefore(t, e.firstChild));
    }
    function Lm(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
    }
    function wm(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
    }
    function of(t, e, a) {
      if (R1 === null) {
        var c = /* @__PURE__ */ new Map(), o = R1 = /* @__PURE__ */ new Map();
        o.set(a, c);
      } else
        o = R1, c = o.get(a), c || (c = /* @__PURE__ */ new Map(), o.set(a, c));
      if (c.has(t)) return c;
      for (c.set(t, null), a = a.getElementsByTagName(t), o = 0; o < a.length; o++) {
        var f = a[o];
        if (!(f[bf] || f[Te] || t === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== bt) {
          var d = f.getAttribute(e) || "";
          d = t + d;
          var h = c.get(d);
          h ? h.push(f) : c.set(d, [f]);
        }
      }
      return c;
    }
    function Tv(t, e, a) {
      t = t.ownerDocument || t, t.head.insertBefore(
        a,
        e === "title" ? t.querySelector("head > title") : null
      );
    }
    function Ev(t, e, a) {
      var c = !a.ancestorInfo.containerTagInScope;
      if (a.context === a0 || e.itemProp != null)
        return !c || e.itemProp == null || t !== "meta" && t !== "title" && t !== "style" && t !== "link" && t !== "script" || console.error(
          "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
          t,
          t
        ), !1;
      switch (t) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "") {
            c && console.error(
              'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
            );
            break;
          }
          return !0;
        case "link":
          if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError) {
            if (e.rel === "stylesheet" && typeof e.precedence == "string") {
              t = e.href;
              var o = e.onError, f = e.disabled;
              a = [], e.onLoad && a.push("`onLoad`"), o && a.push("`onError`"), f != null && a.push("`disabled`"), o = tv(a, "and"), o += a.length === 1 ? " prop" : " props", f = a.length === 1 ? "an " + o : "the " + o, a.length && console.error(
                'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                t,
                f,
                o
              );
            }
            c && (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" ? console.error(
              "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
            ) : (e.onError || e.onLoad) && console.error(
              "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ));
            break;
          }
          return e.rel === "stylesheet" ? (t = e.precedence, e = e.disabled, typeof t != "string" && c && console.error(
            'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
          ), typeof t == "string" && e == null) : !0;
        case "script":
          if (t = e.async && typeof e.async != "function" && typeof e.async != "symbol", !t || e.onLoad || e.onError || !e.src || typeof e.src != "string") {
            c && (t ? e.onLoad || e.onError ? console.error(
              "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
            ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          c && console.error(
            "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
            t
          );
      }
      return !1;
    }
    function Ut(t) {
      return !(t.type === "stylesheet" && (t.state.loading & cb) === Br);
    }
    function Jm(t, e, a, c) {
      if (a.type === "stylesheet" && (typeof c.media != "string" || matchMedia(c.media).matches !== !1) && (a.state.loading & Bu) === Br) {
        if (a.instance === null) {
          var o = Vi(c.href), f = e.querySelector(
            Is(o)
          );
          if (f) {
            e = f._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ff.bind(t), e.then(t, t)), a.state.loading |= Bu, a.instance = f, Xe(f);
            return;
          }
          f = e.ownerDocument || e, c = oh(c), (o = Nu.get(o)) && Lm(c, o), f = f.createElement("link"), Xe(f);
          var d = f;
          d._p = new Promise(function(h, y) {
            d.onload = h, d.onerror = y;
          }), be(f, "link", c), a.instance = f;
        }
        t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(a, e), (e = a.state.preload) && (a.state.loading & cb) === Br && (t.count++, a = ff.bind(t), e.addEventListener("load", a), e.addEventListener("error", a));
      }
    }
    function sh(t, e) {
      return t.stylesheets && t.count === 0 && tr(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(a) {
        var c = setTimeout(function() {
          if (t.stylesheets && tr(t, t.stylesheets), t.unsuspend) {
            var f = t.unsuspend;
            t.unsuspend = null, f();
          }
        }, k3 + e);
        0 < t.imgBytes && i2 === 0 && (i2 = 125 * ev() * I3);
        var o = setTimeout(
          function() {
            if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && tr(t, t.stylesheets), t.unsuspend)) {
              var f = t.unsuspend;
              t.unsuspend = null, f();
            }
          },
          (t.imgBytes > i2 ? 50 : F3) + e
        );
        return t.unsuspend = a, function() {
          t.unsuspend = null, clearTimeout(c), clearTimeout(o);
        };
      } : null;
    }
    function ff() {
      if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
        if (this.stylesheets)
          tr(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          this.unsuspend = null, t();
        }
      }
    }
    function tr(t, e) {
      t.stylesheets = null, t.unsuspend !== null && (t.count++, U1 = /* @__PURE__ */ new Map(), e.forEach(Km, t), U1 = null, ff.call(t));
    }
    function Km(t, e) {
      if (!(e.state.loading & Bu)) {
        var a = U1.get(t);
        if (a) var c = a.get(o2);
        else {
          a = /* @__PURE__ */ new Map(), U1.set(t, a);
          for (var o = t.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < o.length; f++) {
            var d = o[f];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), c = d);
          }
          c && a.set(o2, c);
        }
        o = e.instance, d = o.getAttribute("data-precedence"), f = a.get(d) || c, f === c && a.set(o2, o), a.set(d, o), this.count++, c = ff.bind(this), o.addEventListener("load", c), o.addEventListener("error", c), f ? f.parentNode.insertBefore(o, f.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(o, t.firstChild)), e.state.loading |= Bu;
      }
    }
    function er(t, e, a, c, o, f, d, h, y) {
      for (this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = Hr, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = jr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jr(0), this.hiddenUpdates = jr(null), this.identifierPrefix = c, this.onUncaughtError = o, this.onCaughtError = f, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), t = this.pendingUpdatersLaneMap = [], e = 0; 31 > e; e++) t.push(/* @__PURE__ */ new Set());
      this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
    }
    function lr(t, e, a, c, o, f, d, h, y, p, A, D) {
      return t = new er(
        t,
        e,
        a,
        d,
        y,
        p,
        A,
        D,
        h
      ), e = E3, f === !0 && (e |= va | cc), e |= At, f = xt(3, null, null, e), t.current = f, f.stateNode = t, e = fd(), gi(e), t.pooledCache = e, gi(e), f.memoizedState = {
        element: c,
        isDehydrated: a,
        cache: e
      }, Ct(f), t;
    }
    function Av(t) {
      return t ? (t = Of, t) : Of;
    }
    function rh(t, e, a, c, o, f) {
      if (ll && typeof ll.onScheduleFiberRoot == "function")
        try {
          ll.onScheduleFiberRoot($i, c, a);
        } catch (d) {
          bu || (bu = !0, console.error(
            "React instrumentation encountered an error: %o",
            d
          ));
        }
      o = Av(o), c.context === null ? c.context = o : c.pendingContext = o, Su && pa !== null && !rb && (rb = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        et(pa) || "Unknown"
      )), c = Pe(e), c.payload = { element: a }, f = f === void 0 ? null : f, f !== null && (typeof f != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        f
      ), c.callback = f), a = eu(t, c, e), a !== null && (In(e, "root.render()", null), ht(a, t, e), ln(a, t, e));
    }
    function zv(t, e) {
      if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
        var a = t.retryLane;
        t.retryLane = a !== 0 && a < e ? a : e;
      }
    }
    function $m(t, e) {
      zv(t, e), (t = t.alternate) && zv(t, e);
    }
    function Wm(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = ql(t, 67108864);
        e !== null && ht(e, t, 67108864), $m(t, 67108864);
      }
    }
    function km(t) {
      if (t.tag === 13 || t.tag === 31) {
        var e = jl(t);
        e = li(e);
        var a = ql(t, e);
        a !== null && ht(a, t, e), $m(t, e);
      }
    }
    function le() {
      return pa;
    }
    function Fm(t, e, a, c) {
      var o = B.T;
      B.T = null;
      var f = wt.p;
      try {
        wt.p = al, Im(t, e, a, c);
      } finally {
        wt.p = f, B.T = o;
      }
    }
    function Ml(t, e, a, c) {
      var o = B.T;
      B.T = null;
      var f = wt.p;
      try {
        wt.p = Ul, Im(t, e, a, c);
      } finally {
        wt.p = f, B.T = o;
      }
    }
    function Im(t, e, a, c) {
      if (C1) {
        var o = dh(c);
        if (o === null)
          Cn(
            t,
            e,
            c,
            H1,
            a
          ), mh(t, c);
        else if (Dv(
          o,
          t,
          e,
          a,
          c
        ))
          c.stopPropagation();
        else if (mh(t, c), e & 4 && -1 < t4.indexOf(t)) {
          for (; o !== null; ) {
            var f = dn(o);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var d = ei(f.pendingLanes);
                    if (d !== 0) {
                      var h = f;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var y = 1 << 31 - Rl(d);
                        h.entanglements[1] |= y, d &= ~y;
                      }
                      da(f), (Xt & (Cl | Qn)) === Zl && (m1 = yl() + GS, mu(0));
                    }
                  }
                  break;
                case 31:
                case 13:
                  h = ql(f, 2), h !== null && ht(h, f, 2), Na(), $m(f, 2);
              }
            if (f = dh(c), f === null && Cn(
              t,
              e,
              c,
              H1,
              a
            ), f === o) break;
            o = f;
          }
          o !== null && c.stopPropagation();
        } else
          Cn(
            t,
            e,
            c,
            null,
            a
          );
      }
    }
    function dh(t) {
      return t = yn(t), Pm(t);
    }
    function Pm(t) {
      if (H1 = null, t = qu(t), t !== null) {
        var e = Ft(t);
        if (e === null) t = null;
        else {
          var a = e.tag;
          if (a === 13) {
            if (t = wa(e), t !== null) return t;
            t = null;
          } else if (a === 31) {
            if (t = je(e), t !== null) return t;
            t = null;
          } else if (a === 3) {
            if (e.stateNode.current.memoizedState.isDehydrated)
              return e.tag === 3 ? e.stateNode.containerInfo : null;
            t = null;
          } else e !== t && (t = null);
        }
      }
      return H1 = t, null;
    }
    function hh(t) {
      switch (t) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return al;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return Ul;
        case "message":
          switch (or()) {
            case fy:
              return al;
            case Ah:
              return Ul;
            case Ki:
            case Cv:
              return Xl;
            case zh:
              return $c;
            default:
              return Xl;
          }
        default:
          return Xl;
      }
    }
    function mh(t, e) {
      switch (t) {
        case "focusin":
        case "focusout":
          Vf = null;
          break;
        case "dragenter":
        case "dragleave":
          Zf = null;
          break;
        case "mouseover":
        case "mouseout":
          Lf = null;
          break;
        case "pointerover":
        case "pointerout":
          ap.delete(e.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          np.delete(e.pointerId);
      }
    }
    function Lc(t, e, a, c, o, f) {
      return t === null || t.nativeEvent !== f ? (t = {
        blockedOn: e,
        domEventName: a,
        eventSystemFlags: c,
        nativeEvent: f,
        targetContainers: [o]
      }, e !== null && (e = dn(e), e !== null && Wm(e)), t) : (t.eventSystemFlags |= c, e = t.targetContainers, o !== null && e.indexOf(o) === -1 && e.push(o), t);
    }
    function Dv(t, e, a, c, o) {
      switch (e) {
        case "focusin":
          return Vf = Lc(
            Vf,
            t,
            e,
            a,
            c,
            o
          ), !0;
        case "dragenter":
          return Zf = Lc(
            Zf,
            t,
            e,
            a,
            c,
            o
          ), !0;
        case "mouseover":
          return Lf = Lc(
            Lf,
            t,
            e,
            a,
            c,
            o
          ), !0;
        case "pointerover":
          var f = o.pointerId;
          return ap.set(
            f,
            Lc(
              ap.get(f) || null,
              t,
              e,
              a,
              c,
              o
            )
          ), !0;
        case "gotpointercapture":
          return f = o.pointerId, np.set(
            f,
            Lc(
              np.get(f) || null,
              t,
              e,
              a,
              c,
              o
            )
          ), !0;
      }
      return !1;
    }
    function ty(t) {
      var e = qu(t.target);
      if (e !== null) {
        var a = Ft(e);
        if (a !== null) {
          if (e = a.tag, e === 13) {
            if (e = wa(a), e !== null) {
              t.blockedOn = e, dp(t.priority, function() {
                km(a);
              });
              return;
            }
          } else if (e === 31) {
            if (e = je(a), e !== null) {
              t.blockedOn = e, dp(t.priority, function() {
                km(a);
              });
              return;
            }
          } else if (e === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function sf(t) {
      if (t.blockedOn !== null) return !1;
      for (var e = t.targetContainers; 0 < e.length; ) {
        var a = dh(t.nativeEvent);
        if (a === null) {
          a = t.nativeEvent;
          var c = new a.constructor(
            a.type,
            a
          ), o = c;
          my !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), my = o, a.target.dispatchEvent(c), my === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), my = null;
        } else
          return e = dn(a), e !== null && Wm(e), t.blockedOn = a, !1;
        e.shift();
      }
      return !0;
    }
    function yh(t, e, a) {
      sf(t) && a.delete(e);
    }
    function W1() {
      f2 = !1, Vf !== null && sf(Vf) && (Vf = null), Zf !== null && sf(Zf) && (Zf = null), Lf !== null && sf(Lf) && (Lf = null), ap.forEach(yh), np.forEach(yh);
    }
    function ar(t, e) {
      t.blockedOn === e && (t.blockedOn = null, f2 || (f2 = !0, we.unstable_scheduleCallback(
        we.unstable_NormalPriority,
        W1
      )));
    }
    function Ov(t) {
      B1 !== t && (B1 = t, we.unstable_scheduleCallback(
        we.unstable_NormalPriority,
        function() {
          B1 === t && (B1 = null);
          for (var e = 0; e < t.length; e += 3) {
            var a = t[e], c = t[e + 1], o = t[e + 2];
            if (typeof c != "function") {
              if (Pm(c || a) === null)
                continue;
              break;
            }
            var f = dn(a);
            f !== null && (t.splice(e, 3), e -= 3, a = {
              pending: !0,
              data: o,
              method: a.method,
              action: c
            }, Object.freeze(a), Wu(
              f,
              a,
              c,
              o
            ));
          }
        }
      ));
    }
    function Li(t) {
      function e(y) {
        return ar(y, t);
      }
      Vf !== null && ar(Vf, t), Zf !== null && ar(Zf, t), Lf !== null && ar(Lf, t), ap.forEach(e), np.forEach(e);
      for (var a = 0; a < wf.length; a++) {
        var c = wf[a];
        c.blockedOn === t && (c.blockedOn = null);
      }
      for (; 0 < wf.length && (a = wf[0], a.blockedOn === null); )
        ty(a), a.blockedOn === null && wf.shift();
      if (a = (t.ownerDocument || t).$$reactFormReplay, a != null)
        for (c = 0; c < a.length; c += 3) {
          var o = a[c], f = a[c + 1], d = o[ca] || null;
          if (typeof f == "function")
            d || Ov(a);
          else if (d) {
            var h = null;
            if (f && f.hasAttribute("formAction")) {
              if (o = f, d = f[ca] || null)
                h = d.formAction;
              else if (Pm(o) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? a[c + 1] = h : (a.splice(c, 3), c -= 3), Ov(a);
          }
        }
    }
    function Mv() {
      function t(f) {
        f.canIntercept && f.info === "react-transition" && f.intercept({
          handler: function() {
            return new Promise(function(d) {
              return o = d;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function e() {
        o !== null && (o(), o = null), c || setTimeout(a, 20);
      }
      function a() {
        if (!c && !navigation.transition) {
          var f = navigation.currentEntry;
          f && f.url != null && navigation.navigate(f.url, {
            state: f.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation == "object") {
        var c = !1, o = null;
        return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(a, 100), function() {
          c = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener(
            "navigatesuccess",
            e
          ), navigation.removeEventListener(
            "navigateerror",
            e
          ), o !== null && (o(), o = null);
        };
      }
    }
    function ey(t) {
      this._internalRoot = t;
    }
    function Nn(t) {
      this._internalRoot = t;
    }
    function ly(t) {
      t[uc] && (t._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var we = Bb(), nr = d2, k1 = Hb, Et = Object.assign, Rv = /* @__PURE__ */ Symbol.for("react.element"), cn = /* @__PURE__ */ Symbol.for("react.transitional.element"), wc = /* @__PURE__ */ Symbol.for("react.portal"), rf = /* @__PURE__ */ Symbol.for("react.fragment"), ua = /* @__PURE__ */ Symbol.for("react.strict_mode"), ur = /* @__PURE__ */ Symbol.for("react.profiler"), ph = /* @__PURE__ */ Symbol.for("react.consumer"), xn = /* @__PURE__ */ Symbol.for("react.context"), df = /* @__PURE__ */ Symbol.for("react.forward_ref"), wi = /* @__PURE__ */ Symbol.for("react.suspense"), ya = /* @__PURE__ */ Symbol.for("react.suspense_list"), cr = /* @__PURE__ */ Symbol.for("react.memo"), Gl = /* @__PURE__ */ Symbol.for("react.lazy"), qn = /* @__PURE__ */ Symbol.for("react.activity"), F1 = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Uv = Symbol.iterator, hf = /* @__PURE__ */ Symbol.for("react.client.reference"), ke = Array.isArray, B = nr.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, wt = k1.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I1 = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), ay = [], ny = [], nc = -1, Jc = Ge(null), mf = Ge(null), qa = Ge(null), Kc = Ge(null), yf = 0, _v, Ji, pf, uy, ir, vh, gh;
    rt.__reactDisabledLog = !0;
    var vf, cy, Sh = !1, iy = new (typeof WeakMap == "function" ? WeakMap : Map)(), pa = null, Su = !1, Ya = Object.prototype.hasOwnProperty, oy = we.unstable_scheduleCallback, bh = we.unstable_cancelCallback, Th = we.unstable_shouldYield, Eh = we.unstable_requestPaint, yl = we.unstable_now, or = we.unstable_getCurrentPriorityLevel, fy = we.unstable_ImmediatePriority, Ah = we.unstable_UserBlockingPriority, Ki = we.unstable_NormalPriority, Cv = we.unstable_LowPriority, zh = we.unstable_IdlePriority, sy = we.log, Hv = we.unstable_setDisableYieldValue, $i = null, ll = null, bu = !1, Tu = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Rl = Math.clz32 ? Math.clz32 : i0, ry = Math.log, Dh = Math.LN2, gf = 256, fr = 262144, Sf = 4194304, al = 2, Ul = 8, Xl = 32, $c = 268435456, on = Math.random().toString(36).slice(2), Te = "__reactFiber$" + on, ca = "__reactProps$" + on, uc = "__reactContainer$" + on, Wi = "__reactEvents$" + on, P1 = "__reactListeners$" + on, Bv = "__reactHandles$" + on, sr = "__reactResources$" + on, bf = "__reactMarker$" + on, Nv = /* @__PURE__ */ new Set(), Eu = {}, Tf = {}, xv = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, Ef = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), dy = {}, Oh = {}, Mh = /[\n"\\]/g, hy = !1, qv = !1, rr = !1, l = !1, n = !1, u = !1, i = ["value", "defaultValue"], s = !1, r = /["'&<>\n\t]|^\s|\s$/, m = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), v = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), T = v.concat(["button"]), U = "dd dt li option optgroup p rp rt".split(" "), q = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null,
      containerTagInScope: null,
      implicitRootScope: !1
    }, X = {}, _ = {
      animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
        " "
      ),
      background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
        " "
      ),
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
        " "
      ),
      borderBlockEnd: [
        "borderBlockEndColor",
        "borderBlockEndStyle",
        "borderBlockEndWidth"
      ],
      borderBlockStart: [
        "borderBlockStartColor",
        "borderBlockStartStyle",
        "borderBlockStartWidth"
      ],
      borderBottom: [
        "borderBottomColor",
        "borderBottomStyle",
        "borderBottomWidth"
      ],
      borderColor: [
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor"
      ],
      borderImage: [
        "borderImageOutset",
        "borderImageRepeat",
        "borderImageSlice",
        "borderImageSource",
        "borderImageWidth"
      ],
      borderInlineEnd: [
        "borderInlineEndColor",
        "borderInlineEndStyle",
        "borderInlineEndWidth"
      ],
      borderInlineStart: [
        "borderInlineStartColor",
        "borderInlineStartStyle",
        "borderInlineStartWidth"
      ],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: [
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius"
      ],
      borderRight: [
        "borderRightColor",
        "borderRightStyle",
        "borderRightWidth"
      ],
      borderStyle: [
        "borderBottomStyle",
        "borderLeftStyle",
        "borderRightStyle",
        "borderTopStyle"
      ],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: [
        "borderBottomWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth"
      ],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
        " "
      ),
      fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
        " "
      ),
      gap: ["columnGap", "rowGap"],
      grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
        " "
      ),
      gridArea: [
        "gridColumnEnd",
        "gridColumnStart",
        "gridRowEnd",
        "gridRowStart"
      ],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: [
        "gridTemplateAreas",
        "gridTemplateColumns",
        "gridTemplateRows"
      ],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
        " "
      ),
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle"
      ],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: [
        "transitionDelay",
        "transitionDuration",
        "transitionProperty",
        "transitionTimingFunction"
      ],
      wordWrap: ["overflowWrap"]
    }, N = /([A-Z])/g, F = /^ms-/, it = /^(?:webkit|moz|o)[A-Z]/, ae = /^-ms-/, M = /-(.)/g, z = /;\s*$/, R = {}, G = {}, at = !1, Gt = !1, I = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), vt = "http://www.w3.org/1998/Math/MathML", bt = "http://www.w3.org/2000/svg", Vt = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), Yn = {
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      fetchpriority: "fetchPriority",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      inert: "inert",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      popover: "popover",
      popovertarget: "popoverTarget",
      popovertargetaction: "popoverTargetAction",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      transformorigin: "transformOrigin",
      "transform-origin": "transformOrigin",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, Yv = {
      "aria-current": 0,
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      "aria-hidden": 0,
      "aria-invalid": 0,
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0,
      "aria-braillelabel": 0,
      "aria-brailleroledescription": 0,
      "aria-colindextext": 0,
      "aria-rowindextext": 0
    }, Rh = {}, Nb = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), xb = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), h2 = !1, ja = {}, m2 = /^on./, qb = /^on[^A-Z]/, Yb = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), jb = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Gb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, my = null, Uh = null, _h = null, tg = !1, Wc = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), eg = !1;
    if (Wc)
      try {
        var yy = {};
        Object.defineProperty(yy, "passive", {
          get: function() {
            eg = !0;
          }
        }), window.addEventListener("test", yy, yy), window.removeEventListener("test", yy, yy);
      } catch {
        eg = !1;
      }
    var Af = null, lg = null, jv = null, dr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Gv = ol(dr), py = Et({}, dr, { view: 0, detail: 0 }), Xb = ol(py), ag, ng, vy, Xv = Et({}, py, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ls,
      button: 0,
      buttons: 0,
      relatedTarget: function(t) {
        return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
      },
      movementX: function(t) {
        return "movementX" in t ? t.movementX : (t !== vy && (vy && t.type === "mousemove" ? (ag = t.screenX - vy.screenX, ng = t.screenY - vy.screenY) : ng = ag = 0, vy = t), ag);
      },
      movementY: function(t) {
        return "movementY" in t ? t.movementY : ng;
      }
    }), y2 = ol(Xv), Qb = Et({}, Xv, { dataTransfer: 0 }), Vb = ol(Qb), Zb = Et({}, py, { relatedTarget: 0 }), ug = ol(Zb), Lb = Et({}, dr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), wb = ol(Lb), Jb = Et({}, dr, {
      clipboardData: function(t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      }
    }), Kb = ol(Jb), $b = Et({}, dr, { data: 0 }), p2 = ol(
      $b
    ), Wb = p2, kb = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Fb = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, Ib = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, Pb = Et({}, py, {
      key: function(t) {
        if (t.key) {
          var e = kb[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress" ? (t = es(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Fb[t.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ls,
      charCode: function(t) {
        return t.type === "keypress" ? es(t) : 0;
      },
      keyCode: function(t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function(t) {
        return t.type === "keypress" ? es(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      }
    }), t3 = ol(Pb), e3 = Et({}, Xv, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), v2 = ol(e3), l3 = Et({}, py, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ls
    }), a3 = ol(l3), n3 = Et({}, dr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), u3 = ol(n3), c3 = Et({}, Xv, {
      deltaX: function(t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function(t) {
        return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), i3 = ol(c3), o3 = Et({}, dr, {
      newState: 0,
      oldState: 0
    }), f3 = ol(o3), s3 = [9, 13, 27, 32], g2 = 229, cg = Wc && "CompositionEvent" in window, gy = null;
    Wc && "documentMode" in document && (gy = document.documentMode);
    var r3 = Wc && "TextEvent" in window && !gy, S2 = Wc && (!cg || gy && 8 < gy && 11 >= gy), b2 = 32, T2 = String.fromCharCode(b2), E2 = !1, Ch = !1, d3 = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    }, Sy = null, by = null, A2 = !1;
    Wc && (A2 = Ir("input") && (!document.documentMode || 9 < document.documentMode));
    var Ga = typeof Object.is == "function" ? Object.is : Pr, h3 = Wc && "documentMode" in document && 11 >= document.documentMode, Hh = null, ig = null, Ty = null, og = !1, Bh = {
      animationend: si("Animation", "AnimationEnd"),
      animationiteration: si("Animation", "AnimationIteration"),
      animationstart: si("Animation", "AnimationStart"),
      transitionrun: si("Transition", "TransitionRun"),
      transitionstart: si("Transition", "TransitionStart"),
      transitioncancel: si("Transition", "TransitionCancel"),
      transitionend: si("Transition", "TransitionEnd")
    }, fg = {}, z2 = {};
    Wc && (z2 = document.createElement("div").style, "AnimationEvent" in window || (delete Bh.animationend.animation, delete Bh.animationiteration.animation, delete Bh.animationstart.animation), "TransitionEvent" in window || delete Bh.transitionend.transition);
    var D2 = ri("animationend"), O2 = ri("animationiteration"), M2 = ri("animationstart"), m3 = ri("transitionrun"), y3 = ri("transitionstart"), p3 = ri("transitioncancel"), R2 = ri("transitionend"), U2 = /* @__PURE__ */ new Map(), sg = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    sg.push("scrollEnd");
    var _2 = 0;
    if (typeof performance == "object" && typeof performance.now == "function")
      var v3 = performance, C2 = function() {
        return v3.now();
      };
    else {
      var g3 = Date;
      C2 = function() {
        return g3.now();
      };
    }
    var rg = typeof reportError == "function" ? reportError : function(t) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var e = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
          error: t
        });
        if (!window.dispatchEvent(e)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", t);
        return;
      }
      console.error(t);
    }, S3 = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", Qv = 0, dg = 1, hg = 2, mg = 3, Vv = "– ", Zv = "+ ", H2 = "  ", Ee = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", Au = "Components ⚛", qt = "Scheduler ⚛", jt = "Blocking", zf = !1, ki = {
      color: "primary",
      properties: null,
      tooltipText: "",
      track: Au
    }, Df = {
      start: -0,
      end: -0,
      detail: { devtools: ki }
    }, b3 = ["Changed Props", ""], B2 = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", T3 = ["Changed Props", B2], Ey = 1, Fi = 2, zu = [], Nh = 0, yg = 0, Of = {};
    Object.freeze(Of);
    var Du = null, xh = null, dt = 0, E3 = 1, At = 2, va = 8, cc = 16, A3 = 32, N2 = !1;
    try {
      var x2 = Object.preventExtensions({});
    } catch {
      N2 = !0;
    }
    var pg = /* @__PURE__ */ new WeakMap(), qh = [], Yh = 0, Lv = null, Ay = 0, Ou = [], Mu = 0, hr = null, Ii = 1, Pi = "", ia = null, Ae = null, Nt = !1, kc = !1, jn = null, Mf = null, Ru = !1, vg = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), gg = Ge(null), Sg = Ge(null), q2 = {}, wv = null, jh = null, Gh = !1, z3 = typeof AbortController < "u" ? AbortController : function() {
      var t = [], e = this.signal = {
        aborted: !1,
        addEventListener: function(a, c) {
          t.push(c);
        }
      };
      this.abort = function() {
        e.aborted = !0, t.forEach(function(a) {
          return a();
        });
      };
    }, D3 = we.unstable_scheduleCallback, O3 = we.unstable_NormalPriority, pl = {
      $$typeof: xn,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, vl = we.unstable_now, Jv = console.createTask ? console.createTask : function() {
      return null;
    }, zy = 1, Kv = 2, Ql = -0, Rf = -0, to = -0, eo = null, Xa = -1.1, mr = -0, xe = -0, ut = -1.1, ft = -1.1, _e = null, Je = !1, yr = -0, Fc = -1.1, Dy = null, Uf = 0, bg = null, Tg = null, pr = -1.1, Oy = null, Xh = -1.1, $v = -1.1, lo = -0, ao = -1.1, Uu = -1.1, Eg = 0, My = null, Y2 = null, j2 = null, _f = -1.1, vr = null, Cf = -1.1, Wv = -1.1, G2 = -0, X2 = -0, kv = 0, M3 = null, Q2 = 0, Ry = -1.1, Fv = !1, Iv = !1, Uy = null, Ag = 0, gr = 0, Qh = null, V2 = B.S;
    B.S = function(t, e) {
      if (YS = yl(), typeof e == "object" && e !== null && typeof e.then == "function") {
        if (0 > ao && 0 > Uu) {
          ao = vl();
          var a = af(), c = vu();
          (a !== Cf || c !== vr) && (Cf = -1.1), _f = a, vr = c;
        }
        Vu(t, e);
      }
      V2 !== null && V2(t, e);
    };
    var Sr = Ge(null), ic = {
      recordUnsafeLifecycleWarnings: function() {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function() {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    }, _y = [], Cy = [], Hy = [], By = [], Ny = [], xy = [], br = /* @__PURE__ */ new Set();
    ic.recordUnsafeLifecycleWarnings = function(t, e) {
      br.has(t.type) || (typeof e.componentWillMount == "function" && e.componentWillMount.__suppressDeprecationWarning !== !0 && _y.push(t), t.mode & va && typeof e.UNSAFE_componentWillMount == "function" && Cy.push(t), typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Hy.push(t), t.mode & va && typeof e.UNSAFE_componentWillReceiveProps == "function" && By.push(t), typeof e.componentWillUpdate == "function" && e.componentWillUpdate.__suppressDeprecationWarning !== !0 && Ny.push(t), t.mode & va && typeof e.UNSAFE_componentWillUpdate == "function" && xy.push(t));
    }, ic.flushPendingUnsafeLifecycleWarnings = function() {
      var t = /* @__PURE__ */ new Set();
      0 < _y.length && (_y.forEach(function(h) {
        t.add(
          et(h) || "Component"
        ), br.add(h.type);
      }), _y = []);
      var e = /* @__PURE__ */ new Set();
      0 < Cy.length && (Cy.forEach(function(h) {
        e.add(
          et(h) || "Component"
        ), br.add(h.type);
      }), Cy = []);
      var a = /* @__PURE__ */ new Set();
      0 < Hy.length && (Hy.forEach(function(h) {
        a.add(
          et(h) || "Component"
        ), br.add(h.type);
      }), Hy = []);
      var c = /* @__PURE__ */ new Set();
      0 < By.length && (By.forEach(
        function(h) {
          c.add(
            et(h) || "Component"
          ), br.add(h.type);
        }
      ), By = []);
      var o = /* @__PURE__ */ new Set();
      0 < Ny.length && (Ny.forEach(function(h) {
        o.add(
          et(h) || "Component"
        ), br.add(h.type);
      }), Ny = []);
      var f = /* @__PURE__ */ new Set();
      if (0 < xy.length && (xy.forEach(function(h) {
        f.add(
          et(h) || "Component"
        ), br.add(h.type);
      }), xy = []), 0 < e.size) {
        var d = ot(
          e
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < c.size && (d = ot(
        c
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = ot(
        f
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < t.size && (d = ot(t), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < a.size && (d = ot(
        a
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = ot(o), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var Pv = /* @__PURE__ */ new Map(), Z2 = /* @__PURE__ */ new Set();
    ic.recordLegacyContextWarning = function(t, e) {
      for (var a = null, c = t; c !== null; )
        c.mode & va && (a = c), c = c.return;
      a === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !Z2.has(t.type) && (c = Pv.get(a), t.type.contextTypes != null || t.type.childContextTypes != null || e !== null && typeof e.getChildContext == "function") && (c === void 0 && (c = [], Pv.set(a, c)), c.push(t));
    }, ic.flushLegacyContextWarning = function() {
      Pv.forEach(function(t) {
        if (t.length !== 0) {
          var e = t[0], a = /* @__PURE__ */ new Set();
          t.forEach(function(o) {
            a.add(et(o) || "Component"), Z2.add(o.type);
          });
          var c = ot(a);
          W(e, function() {
            console.error(
              `Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,
              c
            );
          });
        }
      });
    }, ic.discardPendingWarnings = function() {
      _y = [], Cy = [], Hy = [], By = [], Ny = [], xy = [], Pv = /* @__PURE__ */ new Map();
    };
    var L2 = {
      react_stack_bottom_frame: function(t, e, a) {
        var c = Su;
        Su = !0;
        try {
          return t(e, a);
        } finally {
          Su = c;
        }
      }
    }, zg = L2.react_stack_bottom_frame.bind(L2), w2 = {
      react_stack_bottom_frame: function(t) {
        var e = Su;
        Su = !0;
        try {
          return t.render();
        } finally {
          Su = e;
        }
      }
    }, J2 = w2.react_stack_bottom_frame.bind(w2), K2 = {
      react_stack_bottom_frame: function(t, e) {
        try {
          e.componentDidMount();
        } catch (a) {
          St(t, t.return, a);
        }
      }
    }, Dg = K2.react_stack_bottom_frame.bind(
      K2
    ), $2 = {
      react_stack_bottom_frame: function(t, e, a, c, o) {
        try {
          e.componentDidUpdate(a, c, o);
        } catch (f) {
          St(t, t.return, f);
        }
      }
    }, W2 = $2.react_stack_bottom_frame.bind(
      $2
    ), k2 = {
      react_stack_bottom_frame: function(t, e) {
        var a = e.stack;
        t.componentDidCatch(e.value, {
          componentStack: a !== null ? a : ""
        });
      }
    }, R3 = k2.react_stack_bottom_frame.bind(
      k2
    ), F2 = {
      react_stack_bottom_frame: function(t, e, a) {
        try {
          a.componentWillUnmount();
        } catch (c) {
          St(t, e, c);
        }
      }
    }, I2 = F2.react_stack_bottom_frame.bind(
      F2
    ), P2 = {
      react_stack_bottom_frame: function(t) {
        var e = t.create;
        return t = t.inst, e = e(), t.destroy = e;
      }
    }, U3 = P2.react_stack_bottom_frame.bind(P2), tS = {
      react_stack_bottom_frame: function(t, e, a) {
        try {
          a();
        } catch (c) {
          St(t, e, c);
        }
      }
    }, _3 = tS.react_stack_bottom_frame.bind(tS), eS = {
      react_stack_bottom_frame: function(t) {
        var e = t._init;
        return e(t._payload);
      }
    }, C3 = eS.react_stack_bottom_frame.bind(eS), Vh = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), Og = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), t1 = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
    ), e1 = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, Tr = null, qy = !1, Zh = null, Yy = 0, zt = null, Mg, lS = Mg = !1, aS = {}, nS = {}, uS = {};
    Zn = function(t, e, a) {
      if (a !== null && typeof a == "object" && a._store && (!a._store.validated && a.key == null || a._store.validated === 2)) {
        if (typeof a._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        a._store.validated = 1;
        var c = et(t), o = c || "null";
        if (!aS[o]) {
          aS[o] = !0, a = a._owner, t = t._debugOwner;
          var f = "";
          t && typeof t.tag == "number" && (o = et(t)) && (f = `

Check the render method of \`` + o + "`."), f || c && (f = `

Check the top-level render call using <` + c + ">.");
          var d = "";
          a != null && t !== a && (c = null, typeof a.tag == "number" ? c = et(a) : typeof a.name == "string" && (c = a.name), c && (d = " It was passed a child from " + c + ".")), W(e, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              f,
              d
            );
          });
        }
      }
    };
    var Er = sl(!0), cS = sl(!1), iS = 0, oS = 1, fS = 2, Rg = 3, Hf = !1, sS = !1, Ug = null, _g = !1, Lh = Ge(null), l1 = Ge(0), Gn = Ge(null), _u = null, wh = 1, jy = 2, nl = Ge(0), a1 = 0, Cu = 1, Qa = 2, Xn = 4, Va = 8, Jh, rS = /* @__PURE__ */ new Set(), dS = /* @__PURE__ */ new Set(), Cg = /* @__PURE__ */ new Set(), hS = /* @__PURE__ */ new Set(), no = 0, yt = null, se = null, gl = null, n1 = !1, Kh = !1, Ar = !1, u1 = 0, Gy = 0, uo = null, H3 = 0, B3 = 25, H = null, Hu = null, co = -1, Xy = !1, Qy = {
      readContext: Zt,
      use: Ju,
      useCallback: Be,
      useContext: Be,
      useEffect: Be,
      useImperativeHandle: Be,
      useLayoutEffect: Be,
      useInsertionEffect: Be,
      useMemo: Be,
      useReducer: Be,
      useRef: Be,
      useState: Be,
      useDebugValue: Be,
      useDeferredValue: Be,
      useTransition: Be,
      useSyncExternalStore: Be,
      useId: Be,
      useHostTransitionStatus: Be,
      useFormState: Be,
      useActionState: Be,
      useOptimistic: Be,
      useMemoCache: Be,
      useCacheRefresh: Be
    };
    Qy.useEffectEvent = Be;
    var Hg = null, mS = null, Bg = null, yS = null, Ic = null, oc = null, c1 = null;
    Hg = {
      readContext: function(t) {
        return Zt(t);
      },
      use: Ju,
      useCallback: function(t, e) {
        return H = "useCallback", mt(), wu(e), bd(t, e);
      },
      useContext: function(t) {
        return H = "useContext", mt(), Zt(t);
      },
      useEffect: function(t, e) {
        return H = "useEffect", mt(), wu(e), Ri(t, e);
      },
      useImperativeHandle: function(t, e, a) {
        return H = "useImperativeHandle", mt(), wu(a), uu(t, e, a);
      },
      useInsertionEffect: function(t, e) {
        H = "useInsertionEffect", mt(), wu(e), Bc(4, Qa, t, e);
      },
      useLayoutEffect: function(t, e) {
        return H = "useLayoutEffect", mt(), wu(e), Fl(t, e);
      },
      useMemo: function(t, e) {
        H = "useMemo", mt(), wu(e);
        var a = B.H;
        B.H = Ic;
        try {
          return Il(t, e);
        } finally {
          B.H = a;
        }
      },
      useReducer: function(t, e, a) {
        H = "useReducer", mt();
        var c = B.H;
        B.H = Ic;
        try {
          return Bo(t, e, a);
        } finally {
          B.H = c;
        }
      },
      useRef: function(t) {
        return H = "useRef", mt(), Sd(t);
      },
      useState: function(t) {
        H = "useState", mt();
        var e = B.H;
        B.H = Ic;
        try {
          return Uc(t);
        } finally {
          B.H = e;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", mt();
      },
      useDeferredValue: function(t, e) {
        return H = "useDeferredValue", mt(), jo(t, e);
      },
      useTransition: function() {
        return H = "useTransition", mt(), Nc();
      },
      useSyncExternalStore: function(t, e, a) {
        return H = "useSyncExternalStore", mt(), No(
          t,
          e,
          a
        );
      },
      useId: function() {
        return H = "useId", mt(), Os();
      },
      useFormState: function(t, e) {
        return H = "useFormState", mt(), ys(), Ua(t, e);
      },
      useActionState: function(t, e) {
        return H = "useActionState", mt(), Ua(t, e);
      },
      useOptimistic: function(t) {
        return H = "useOptimistic", mt(), Mi(t);
      },
      useHostTransitionStatus: ku,
      useMemoCache: Ma,
      useCacheRefresh: function() {
        return H = "useCacheRefresh", mt(), Td();
      },
      useEffectEvent: function(t) {
        return H = "useEffectEvent", mt(), zs(t);
      }
    }, mS = {
      readContext: function(t) {
        return Zt(t);
      },
      use: Ju,
      useCallback: function(t, e) {
        return H = "useCallback", V(), bd(t, e);
      },
      useContext: function(t) {
        return H = "useContext", V(), Zt(t);
      },
      useEffect: function(t, e) {
        return H = "useEffect", V(), Ri(t, e);
      },
      useImperativeHandle: function(t, e, a) {
        return H = "useImperativeHandle", V(), uu(t, e, a);
      },
      useInsertionEffect: function(t, e) {
        H = "useInsertionEffect", V(), Bc(4, Qa, t, e);
      },
      useLayoutEffect: function(t, e) {
        return H = "useLayoutEffect", V(), Fl(t, e);
      },
      useMemo: function(t, e) {
        H = "useMemo", V();
        var a = B.H;
        B.H = Ic;
        try {
          return Il(t, e);
        } finally {
          B.H = a;
        }
      },
      useReducer: function(t, e, a) {
        H = "useReducer", V();
        var c = B.H;
        B.H = Ic;
        try {
          return Bo(t, e, a);
        } finally {
          B.H = c;
        }
      },
      useRef: function(t) {
        return H = "useRef", V(), Sd(t);
      },
      useState: function(t) {
        H = "useState", V();
        var e = B.H;
        B.H = Ic;
        try {
          return Uc(t);
        } finally {
          B.H = e;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", V();
      },
      useDeferredValue: function(t, e) {
        return H = "useDeferredValue", V(), jo(t, e);
      },
      useTransition: function() {
        return H = "useTransition", V(), Nc();
      },
      useSyncExternalStore: function(t, e, a) {
        return H = "useSyncExternalStore", V(), No(
          t,
          e,
          a
        );
      },
      useId: function() {
        return H = "useId", V(), Os();
      },
      useActionState: function(t, e) {
        return H = "useActionState", V(), Ua(t, e);
      },
      useFormState: function(t, e) {
        return H = "useFormState", V(), ys(), Ua(t, e);
      },
      useOptimistic: function(t) {
        return H = "useOptimistic", V(), Mi(t);
      },
      useHostTransitionStatus: ku,
      useMemoCache: Ma,
      useCacheRefresh: function() {
        return H = "useCacheRefresh", V(), Td();
      },
      useEffectEvent: function(t) {
        return H = "useEffectEvent", V(), zs(t);
      }
    }, Bg = {
      readContext: function(t) {
        return Zt(t);
      },
      use: Ju,
      useCallback: function(t, e) {
        return H = "useCallback", V(), On(t, e);
      },
      useContext: function(t) {
        return H = "useContext", V(), Zt(t);
      },
      useEffect: function(t, e) {
        H = "useEffect", V(), tl(2048, Va, t, e);
      },
      useImperativeHandle: function(t, e, a) {
        return H = "useImperativeHandle", V(), Yo(t, e, a);
      },
      useInsertionEffect: function(t, e) {
        return H = "useInsertionEffect", V(), tl(4, Qa, t, e);
      },
      useLayoutEffect: function(t, e) {
        return H = "useLayoutEffect", V(), tl(4, Xn, t, e);
      },
      useMemo: function(t, e) {
        H = "useMemo", V();
        var a = B.H;
        B.H = oc;
        try {
          return Se(t, e);
        } finally {
          B.H = a;
        }
      },
      useReducer: function(t, e, a) {
        H = "useReducer", V();
        var c = B.H;
        B.H = oc;
        try {
          return zi(t, e, a);
        } finally {
          B.H = c;
        }
      },
      useRef: function() {
        return H = "useRef", V(), Kt().memoizedState;
      },
      useState: function() {
        H = "useState", V();
        var t = B.H;
        B.H = oc;
        try {
          return zi(Ra);
        } finally {
          B.H = t;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", V();
      },
      useDeferredValue: function(t, e) {
        return H = "useDeferredValue", V(), cu(t, e);
      },
      useTransition: function() {
        return H = "useTransition", V(), xp();
      },
      useSyncExternalStore: function(t, e, a) {
        return H = "useSyncExternalStore", V(), Oi(
          t,
          e,
          a
        );
      },
      useId: function() {
        return H = "useId", V(), Kt().memoizedState;
      },
      useFormState: function(t) {
        return H = "useFormState", V(), ys(), Cc(t);
      },
      useActionState: function(t) {
        return H = "useActionState", V(), Cc(t);
      },
      useOptimistic: function(t, e) {
        return H = "useOptimistic", V(), Ts(t, e);
      },
      useHostTransitionStatus: ku,
      useMemoCache: Ma,
      useCacheRefresh: function() {
        return H = "useCacheRefresh", V(), Kt().memoizedState;
      },
      useEffectEvent: function(t) {
        return H = "useEffectEvent", V(), qo(t);
      }
    }, yS = {
      readContext: function(t) {
        return Zt(t);
      },
      use: Ju,
      useCallback: function(t, e) {
        return H = "useCallback", V(), On(t, e);
      },
      useContext: function(t) {
        return H = "useContext", V(), Zt(t);
      },
      useEffect: function(t, e) {
        H = "useEffect", V(), tl(2048, Va, t, e);
      },
      useImperativeHandle: function(t, e, a) {
        return H = "useImperativeHandle", V(), Yo(t, e, a);
      },
      useInsertionEffect: function(t, e) {
        return H = "useInsertionEffect", V(), tl(4, Qa, t, e);
      },
      useLayoutEffect: function(t, e) {
        return H = "useLayoutEffect", V(), tl(4, Xn, t, e);
      },
      useMemo: function(t, e) {
        H = "useMemo", V();
        var a = B.H;
        B.H = c1;
        try {
          return Se(t, e);
        } finally {
          B.H = a;
        }
      },
      useReducer: function(t, e, a) {
        H = "useReducer", V();
        var c = B.H;
        B.H = c1;
        try {
          return Di(t, e, a);
        } finally {
          B.H = c;
        }
      },
      useRef: function() {
        return H = "useRef", V(), Kt().memoizedState;
      },
      useState: function() {
        H = "useState", V();
        var t = B.H;
        B.H = c1;
        try {
          return Di(Ra);
        } finally {
          B.H = t;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", V();
      },
      useDeferredValue: function(t, e) {
        return H = "useDeferredValue", V(), gt(t, e);
      },
      useTransition: function() {
        return H = "useTransition", V(), Me();
      },
      useSyncExternalStore: function(t, e, a) {
        return H = "useSyncExternalStore", V(), Oi(
          t,
          e,
          a
        );
      },
      useId: function() {
        return H = "useId", V(), Kt().memoizedState;
      },
      useFormState: function(t) {
        return H = "useFormState", V(), ys(), Hc(t);
      },
      useActionState: function(t) {
        return H = "useActionState", V(), Hc(t);
      },
      useOptimistic: function(t, e) {
        return H = "useOptimistic", V(), Es(t, e);
      },
      useHostTransitionStatus: ku,
      useMemoCache: Ma,
      useCacheRefresh: function() {
        return H = "useCacheRefresh", V(), Kt().memoizedState;
      },
      useEffectEvent: function(t) {
        return H = "useEffectEvent", V(), qo(t);
      }
    }, Ic = {
      readContext: function(t) {
        return Ie(), Zt(t);
      },
      use: function(t) {
        return K(), Ju(t);
      },
      useCallback: function(t, e) {
        return H = "useCallback", K(), mt(), bd(t, e);
      },
      useContext: function(t) {
        return H = "useContext", K(), mt(), Zt(t);
      },
      useEffect: function(t, e) {
        return H = "useEffect", K(), mt(), Ri(t, e);
      },
      useImperativeHandle: function(t, e, a) {
        return H = "useImperativeHandle", K(), mt(), uu(t, e, a);
      },
      useInsertionEffect: function(t, e) {
        H = "useInsertionEffect", K(), mt(), Bc(4, Qa, t, e);
      },
      useLayoutEffect: function(t, e) {
        return H = "useLayoutEffect", K(), mt(), Fl(t, e);
      },
      useMemo: function(t, e) {
        H = "useMemo", K(), mt();
        var a = B.H;
        B.H = Ic;
        try {
          return Il(t, e);
        } finally {
          B.H = a;
        }
      },
      useReducer: function(t, e, a) {
        H = "useReducer", K(), mt();
        var c = B.H;
        B.H = Ic;
        try {
          return Bo(t, e, a);
        } finally {
          B.H = c;
        }
      },
      useRef: function(t) {
        return H = "useRef", K(), mt(), Sd(t);
      },
      useState: function(t) {
        H = "useState", K(), mt();
        var e = B.H;
        B.H = Ic;
        try {
          return Uc(t);
        } finally {
          B.H = e;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", K(), mt();
      },
      useDeferredValue: function(t, e) {
        return H = "useDeferredValue", K(), mt(), jo(t, e);
      },
      useTransition: function() {
        return H = "useTransition", K(), mt(), Nc();
      },
      useSyncExternalStore: function(t, e, a) {
        return H = "useSyncExternalStore", K(), mt(), No(
          t,
          e,
          a
        );
      },
      useId: function() {
        return H = "useId", K(), mt(), Os();
      },
      useFormState: function(t, e) {
        return H = "useFormState", K(), mt(), Ua(t, e);
      },
      useActionState: function(t, e) {
        return H = "useActionState", K(), mt(), Ua(t, e);
      },
      useOptimistic: function(t) {
        return H = "useOptimistic", K(), mt(), Mi(t);
      },
      useMemoCache: function(t) {
        return K(), Ma(t);
      },
      useHostTransitionStatus: ku,
      useCacheRefresh: function() {
        return H = "useCacheRefresh", mt(), Td();
      },
      useEffectEvent: function(t) {
        return H = "useEffectEvent", K(), mt(), zs(t);
      }
    }, oc = {
      readContext: function(t) {
        return Ie(), Zt(t);
      },
      use: function(t) {
        return K(), Ju(t);
      },
      useCallback: function(t, e) {
        return H = "useCallback", K(), V(), On(t, e);
      },
      useContext: function(t) {
        return H = "useContext", K(), V(), Zt(t);
      },
      useEffect: function(t, e) {
        H = "useEffect", K(), V(), tl(2048, Va, t, e);
      },
      useImperativeHandle: function(t, e, a) {
        return H = "useImperativeHandle", K(), V(), Yo(t, e, a);
      },
      useInsertionEffect: function(t, e) {
        return H = "useInsertionEffect", K(), V(), tl(4, Qa, t, e);
      },
      useLayoutEffect: function(t, e) {
        return H = "useLayoutEffect", K(), V(), tl(4, Xn, t, e);
      },
      useMemo: function(t, e) {
        H = "useMemo", K(), V();
        var a = B.H;
        B.H = oc;
        try {
          return Se(t, e);
        } finally {
          B.H = a;
        }
      },
      useReducer: function(t, e, a) {
        H = "useReducer", K(), V();
        var c = B.H;
        B.H = oc;
        try {
          return zi(t, e, a);
        } finally {
          B.H = c;
        }
      },
      useRef: function() {
        return H = "useRef", K(), V(), Kt().memoizedState;
      },
      useState: function() {
        H = "useState", K(), V();
        var t = B.H;
        B.H = oc;
        try {
          return zi(Ra);
        } finally {
          B.H = t;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", K(), V();
      },
      useDeferredValue: function(t, e) {
        return H = "useDeferredValue", K(), V(), cu(t, e);
      },
      useTransition: function() {
        return H = "useTransition", K(), V(), xp();
      },
      useSyncExternalStore: function(t, e, a) {
        return H = "useSyncExternalStore", K(), V(), Oi(
          t,
          e,
          a
        );
      },
      useId: function() {
        return H = "useId", K(), V(), Kt().memoizedState;
      },
      useFormState: function(t) {
        return H = "useFormState", K(), V(), Cc(t);
      },
      useActionState: function(t) {
        return H = "useActionState", K(), V(), Cc(t);
      },
      useOptimistic: function(t, e) {
        return H = "useOptimistic", K(), V(), Ts(t, e);
      },
      useMemoCache: function(t) {
        return K(), Ma(t);
      },
      useHostTransitionStatus: ku,
      useCacheRefresh: function() {
        return H = "useCacheRefresh", V(), Kt().memoizedState;
      },
      useEffectEvent: function(t) {
        return H = "useEffectEvent", K(), V(), qo(t);
      }
    }, c1 = {
      readContext: function(t) {
        return Ie(), Zt(t);
      },
      use: function(t) {
        return K(), Ju(t);
      },
      useCallback: function(t, e) {
        return H = "useCallback", K(), V(), On(t, e);
      },
      useContext: function(t) {
        return H = "useContext", K(), V(), Zt(t);
      },
      useEffect: function(t, e) {
        H = "useEffect", K(), V(), tl(2048, Va, t, e);
      },
      useImperativeHandle: function(t, e, a) {
        return H = "useImperativeHandle", K(), V(), Yo(t, e, a);
      },
      useInsertionEffect: function(t, e) {
        return H = "useInsertionEffect", K(), V(), tl(4, Qa, t, e);
      },
      useLayoutEffect: function(t, e) {
        return H = "useLayoutEffect", K(), V(), tl(4, Xn, t, e);
      },
      useMemo: function(t, e) {
        H = "useMemo", K(), V();
        var a = B.H;
        B.H = oc;
        try {
          return Se(t, e);
        } finally {
          B.H = a;
        }
      },
      useReducer: function(t, e, a) {
        H = "useReducer", K(), V();
        var c = B.H;
        B.H = oc;
        try {
          return Di(t, e, a);
        } finally {
          B.H = c;
        }
      },
      useRef: function() {
        return H = "useRef", K(), V(), Kt().memoizedState;
      },
      useState: function() {
        H = "useState", K(), V();
        var t = B.H;
        B.H = oc;
        try {
          return Di(Ra);
        } finally {
          B.H = t;
        }
      },
      useDebugValue: function() {
        H = "useDebugValue", K(), V();
      },
      useDeferredValue: function(t, e) {
        return H = "useDeferredValue", K(), V(), gt(t, e);
      },
      useTransition: function() {
        return H = "useTransition", K(), V(), Me();
      },
      useSyncExternalStore: function(t, e, a) {
        return H = "useSyncExternalStore", K(), V(), Oi(
          t,
          e,
          a
        );
      },
      useId: function() {
        return H = "useId", K(), V(), Kt().memoizedState;
      },
      useFormState: function(t) {
        return H = "useFormState", K(), V(), Hc(t);
      },
      useActionState: function(t) {
        return H = "useActionState", K(), V(), Hc(t);
      },
      useOptimistic: function(t, e) {
        return H = "useOptimistic", K(), V(), Es(t, e);
      },
      useMemoCache: function(t) {
        return K(), Ma(t);
      },
      useHostTransitionStatus: ku,
      useCacheRefresh: function() {
        return H = "useCacheRefresh", V(), Kt().memoizedState;
      },
      useEffectEvent: function(t) {
        return H = "useEffectEvent", K(), V(), qo(t);
      }
    };
    var pS = {}, vS = /* @__PURE__ */ new Set(), gS = /* @__PURE__ */ new Set(), SS = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), TS = /* @__PURE__ */ new Set(), ES = /* @__PURE__ */ new Set(), AS = /* @__PURE__ */ new Set(), zS = /* @__PURE__ */ new Set(), DS = /* @__PURE__ */ new Set(), OS = /* @__PURE__ */ new Set();
    Object.freeze(pS);
    var Ng = {
      enqueueSetState: function(t, e, a) {
        t = t._reactInternals;
        var c = jl(t), o = Pe(c);
        o.payload = e, a != null && (Hi(a), o.callback = a), e = eu(t, o, c), e !== null && (In(c, "this.setState()", t), ht(e, t, c), ln(e, t, c));
      },
      enqueueReplaceState: function(t, e, a) {
        t = t._reactInternals;
        var c = jl(t), o = Pe(c);
        o.tag = oS, o.payload = e, a != null && (Hi(a), o.callback = a), e = eu(t, o, c), e !== null && (In(c, "this.replaceState()", t), ht(e, t, c), ln(e, t, c));
      },
      enqueueForceUpdate: function(t, e) {
        t = t._reactInternals;
        var a = jl(t), c = Pe(a);
        c.tag = fS, e != null && (Hi(e), c.callback = e), e = eu(t, c, a), e !== null && (In(a, "this.forceUpdate()", t), ht(e, t, a), ln(e, t, a));
      }
    }, $h = null, xg = null, qg = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), Sl = !1, MS = {}, RS = {}, US = {}, _S = {}, Wh = !1, CS = {}, i1 = {}, Yg = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    }, HS = !1, BS = null;
    BS = /* @__PURE__ */ new Set();
    var io = !1, bl = !1, jg = !1, NS = typeof WeakSet == "function" ? WeakSet : Set, Vl = null, kh = null, Fh = null, Tl = null, fn = !1, fc = null, _l = !1, Vy = 8192, N3 = {
      getCacheForType: function(t) {
        var e = Zt(pl), a = e.data.get(t);
        return a === void 0 && (a = t(), e.data.set(t, a)), a;
      },
      cacheSignal: function() {
        return Zt(pl).controller.signal;
      },
      getOwner: function() {
        return pa;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var Zy = Symbol.for;
      Zy("selector.component"), Zy("selector.has_pseudo_class"), Zy("selector.role"), Zy("selector.test_id"), Zy("selector.text");
    }
    var x3 = [], q3 = typeof WeakMap == "function" ? WeakMap : Map, Zl = 0, Cl = 2, Qn = 4, oo = 0, Ly = 1, zr = 2, o1 = 3, Bf = 4, f1 = 6, xS = 5, Xt = Zl, re = null, Rt = null, Dt = 0, sn = 0, s1 = 1, Dr = 2, wy = 3, qS = 4, Gg = 5, Jy = 6, r1 = 7, Xg = 8, Or = 9, ne = sn, Vn = null, Nf = !1, Ih = !1, Qg = !1, Pc = 0, qe = oo, xf = 0, qf = 0, Vg = 0, rn = 0, Mr = 0, Ky = null, Za = null, d1 = !1, h1 = 0, YS = 0, jS = 300, m1 = 1 / 0, GS = 500, $y = null, Fe = null, Yf = null, y1 = 0, Zg = 1, Lg = 2, XS = 3, jf = 0, QS = 1, VS = 2, ZS = 3, LS = 4, p1 = 5, El = 0, Gf = null, Ph = null, sc = 0, wg = 0, Jg = -0, Kg = null, wS = null, JS = null, rc = y1, KS = null, Y3 = 50, Wy = 0, $g = null, Wg = !1, v1 = !1, j3 = 50, Rr = 0, ky = null, t0 = !1, g1 = null, $S = !1, WS = /* @__PURE__ */ new Set(), G3 = {}, S1 = null, e0 = null, kg = !1, Fg = !1, b1 = !1, Ig = !1, Xf = 0, Pg = {};
    (function() {
      for (var t = 0; t < sg.length; t++) {
        var e = sg[t], a = e.toLowerCase();
        e = e[0].toUpperCase() + e.slice(1), pn(a, "on" + e);
      }
      pn(D2, "onAnimationEnd"), pn(O2, "onAnimationIteration"), pn(M2, "onAnimationStart"), pn("dblclick", "onDoubleClick"), pn("focusin", "onFocus"), pn("focusout", "onBlur"), pn(m3, "onTransitionRun"), pn(y3, "onTransitionStart"), pn(p3, "onTransitionCancel"), pn(R2, "onTransitionEnd");
    })(), ho("onMouseEnter", ["mouseout", "mouseover"]), ho("onMouseLeave", ["mouseout", "mouseover"]), ho("onPointerEnter", ["pointerout", "pointerover"]), ho("onPointerLeave", ["pointerout", "pointerover"]), hn(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), hn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), hn("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), hn(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), hn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), hn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var Fy = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), t2 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fy)
    ), T1 = "_reactListening" + Math.random().toString(36).slice(2), kS = !1, FS = !1, E1 = !1, IS = !1, A1 = !1, z1 = !1, PS = !1, D1 = {}, X3 = /\r\n?/g, Q3 = /\u0000|\uFFFD/g, Ur = "http://www.w3.org/1999/xlink", e2 = "http://www.w3.org/XML/1998/namespace", V3 = "javascript:throw new Error('React form unexpectedly submitted.')", Z3 = "suppressHydrationWarning", _r = "&", O1 = "/&", Iy = "$", Py = "/$", Qf = "$?", Cr = "$~", l0 = "$!", L3 = "html", w3 = "body", J3 = "head", l2 = "F!", tb = "F", eb = "loading", K3 = "style", fo = 0, a0 = 1, M1 = 2, a2 = null, n2 = null, lb = { dialog: !0, webview: !0 }, u2 = null, tp = void 0, ab = typeof setTimeout == "function" ? setTimeout : void 0, $3 = typeof clearTimeout == "function" ? clearTimeout : void 0, Hr = -1, nb = typeof Promise == "function" ? Promise : void 0, W3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof nb < "u" ? function(t) {
      return nb.resolve(null).then(t).catch(av);
    } : ab, c2 = null, Br = 0, ep = 1, ub = 2, cb = 3, Bu = 4, Nu = /* @__PURE__ */ new Map(), ib = /* @__PURE__ */ new Set(), so = wt.d;
    wt.d = {
      f: function() {
        var t = so.f(), e = Na();
        return t || e;
      },
      r: function(t) {
        var e = dn(t);
        e !== null && e.tag === 5 && e.type === "form" ? Go(e) : so.r(t);
      },
      D: function(t) {
        so.D(t), Vm("dns-prefetch", t, null);
      },
      C: function(t, e) {
        so.C(t, e), Vm("preconnect", t, e);
      },
      L: function(t, e, a) {
        so.L(t, e, a);
        var c = n0;
        if (c && t && e) {
          var o = 'link[rel="preload"][as="' + Pt(e) + '"]';
          e === "image" && a && a.imageSrcSet ? (o += '[imagesrcset="' + Pt(
            a.imageSrcSet
          ) + '"]', typeof a.imageSizes == "string" && (o += '[imagesizes="' + Pt(
            a.imageSizes
          ) + '"]')) : o += '[href="' + Pt(t) + '"]';
          var f = o;
          switch (e) {
            case "style":
              f = Vi(t);
              break;
            case "script":
              f = Zi(t);
          }
          Nu.has(f) || (t = Et(
            {
              rel: "preload",
              href: e === "image" && a && a.imageSrcSet ? void 0 : t,
              as: e
            },
            a
          ), Nu.set(f, t), c.querySelector(o) !== null || e === "style" && c.querySelector(
            Is(f)
          ) || e === "script" && c.querySelector(Ps(f)) || (e = c.createElement("link"), be(e, "link", t), Xe(e), c.head.appendChild(e)));
        }
      },
      m: function(t, e) {
        so.m(t, e);
        var a = n0;
        if (a && t) {
          var c = e && typeof e.as == "string" ? e.as : "script", o = 'link[rel="modulepreload"][as="' + Pt(c) + '"][href="' + Pt(t) + '"]', f = o;
          switch (c) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              f = Zi(t);
          }
          if (!Nu.has(f) && (t = Et({ rel: "modulepreload", href: t }, e), Nu.set(f, t), a.querySelector(o) === null)) {
            switch (c) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (a.querySelector(Ps(f)))
                  return;
            }
            c = a.createElement("link"), be(c, "link", t), Xe(c), a.head.appendChild(c);
          }
        }
      },
      X: function(t, e) {
        so.X(t, e);
        var a = n0;
        if (a && t) {
          var c = $a(a).hoistableScripts, o = Zi(t), f = c.get(o);
          f || (f = a.querySelector(
            Ps(o)
          ), f || (t = Et({ src: t, async: !0 }, e), (e = Nu.get(o)) && wm(t, e), f = a.createElement("script"), Xe(f), be(f, "link", t), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, c.set(o, f));
        }
      },
      S: function(t, e, a) {
        so.S(t, e, a);
        var c = n0;
        if (c && t) {
          var o = $a(c).hoistableStyles, f = Vi(t);
          e = e || "default";
          var d = o.get(f);
          if (!d) {
            var h = { loading: Br, preload: null };
            if (d = c.querySelector(
              Is(f)
            ))
              h.loading = ep | Bu;
            else {
              t = Et(
                {
                  rel: "stylesheet",
                  href: t,
                  "data-precedence": e
                },
                a
              ), (a = Nu.get(f)) && Lm(t, a);
              var y = d = c.createElement("link");
              Xe(y), be(y, "link", t), y._p = new Promise(function(p, A) {
                y.onload = p, y.onerror = A;
              }), y.addEventListener("load", function() {
                h.loading |= ep;
              }), y.addEventListener("error", function() {
                h.loading |= ub;
              }), h.loading |= Bu, cf(d, e, c);
            }
            d = {
              type: "stylesheet",
              instance: d,
              count: 1,
              state: h
            }, o.set(f, d);
          }
        }
      },
      M: function(t, e) {
        so.M(t, e);
        var a = n0;
        if (a && t) {
          var c = $a(a).hoistableScripts, o = Zi(t), f = c.get(o);
          f || (f = a.querySelector(
            Ps(o)
          ), f || (t = Et({ src: t, async: !0, type: "module" }, e), (e = Nu.get(o)) && wm(t, e), f = a.createElement("script"), Xe(f), be(f, "link", t), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, c.set(o, f));
        }
      }
    };
    var n0 = typeof document > "u" ? null : document, R1 = null, k3 = 6e4, F3 = 800, I3 = 500, i2 = 0, o2 = null, U1 = null, Nr = I1, lp = {
      $$typeof: xn,
      Provider: null,
      Consumer: null,
      _currentValue: Nr,
      _currentValue2: Nr,
      _threadCount: 0
    }, ob = "%c%s%c", fb = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", sb = "", _1 = " ", P3 = Function.prototype.bind, rb = !1, db = null, hb = null, mb = null, yb = null, pb = null, vb = null, gb = null, Sb = null, bb = null, Tb = null;
    db = function(t, e, a, c) {
      e = L(t, e), e !== null && (a = Ye(e.memoizedState, a, 0, c), e.memoizedState = a, e.baseState = a, t.memoizedProps = Et({}, t.memoizedProps), a = ql(t, 2), a !== null && ht(a, t, 2));
    }, hb = function(t, e, a) {
      e = L(t, e), e !== null && (a = ue(e.memoizedState, a, 0), e.memoizedState = a, e.baseState = a, t.memoizedProps = Et({}, t.memoizedProps), a = ql(t, 2), a !== null && ht(a, t, 2));
    }, mb = function(t, e, a, c) {
      e = L(t, e), e !== null && (a = de(e.memoizedState, a, c), e.memoizedState = a, e.baseState = a, t.memoizedProps = Et({}, t.memoizedProps), a = ql(t, 2), a !== null && ht(a, t, 2));
    }, yb = function(t, e, a) {
      t.pendingProps = Ye(t.memoizedProps, e, 0, a), t.alternate && (t.alternate.pendingProps = t.pendingProps), e = ql(t, 2), e !== null && ht(e, t, 2);
    }, pb = function(t, e) {
      t.pendingProps = ue(t.memoizedProps, e, 0), t.alternate && (t.alternate.pendingProps = t.pendingProps), e = ql(t, 2), e !== null && ht(e, t, 2);
    }, vb = function(t, e, a) {
      t.pendingProps = de(
        t.memoizedProps,
        e,
        a
      ), t.alternate && (t.alternate.pendingProps = t.pendingProps), e = ql(t, 2), e !== null && ht(e, t, 2);
    }, gb = function(t) {
      var e = ql(t, 2);
      e !== null && ht(e, t, 2);
    }, Sb = function(t) {
      var e = Yr(), a = ql(t, e);
      a !== null && ht(a, t, e);
    }, bb = function(t) {
      Al = t;
    }, Tb = function(t) {
      ve = t;
    };
    var C1 = !0, H1 = null, f2 = !1, Vf = null, Zf = null, Lf = null, ap = /* @__PURE__ */ new Map(), np = /* @__PURE__ */ new Map(), wf = [], t4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), B1 = null;
    if (Nn.prototype.render = ey.prototype.render = function(t) {
      var e = this._internalRoot;
      if (e === null) throw Error("Cannot update an unmounted root.");
      var a = arguments;
      typeof a[1] == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : he(a[1]) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof a[1] < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), a = t;
      var c = e.current, o = jl(c);
      rh(c, o, a, e, null, null);
    }, Nn.prototype.unmount = ey.prototype.unmount = function() {
      var t = arguments;
      if (typeof t[0] == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), t = this._internalRoot, t !== null) {
        this._internalRoot = null;
        var e = t.containerInfo;
        (Xt & (Cl | Qn)) !== Zl && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), rh(t.current, 2, null, t, null, null), Na(), e[uc] = null;
      }
    }, Nn.prototype.unstable_scheduleHydration = function(t) {
      if (t) {
        var e = rp();
        t = { blockedOn: null, target: t, priority: e };
        for (var a = 0; a < wf.length && e !== 0 && e < wf[a].priority; a++) ;
        wf.splice(a, 0, t), a === 0 && ty(t);
      }
    }, (function() {
      var t = nr.version;
      if (t !== "19.2.3")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (t + `
  - react-dom:  19.2.3
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    })(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), wt.findDOMNode = function(t) {
      var e = t._reactInternals;
      if (e === void 0)
        throw typeof t.render == "function" ? Error("Unable to find node on an unmounted component.") : (t = Object.keys(t).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + t
        ));
      return t = ga(e), t = t !== null ? Nl(t) : null, t = t === null ? null : t.stateNode, t;
    }, !(function() {
      var t = {
        bundleType: 1,
        version: "19.2.3",
        rendererPackageName: "react-dom",
        currentDispatcherRef: B,
        reconcilerVersion: "19.2.3"
      };
      return t.overrideHookState = db, t.overrideHookStateDeletePath = hb, t.overrideHookStateRenamePath = mb, t.overrideProps = yb, t.overridePropsDeletePath = pb, t.overridePropsRenamePath = vb, t.scheduleUpdate = gb, t.scheduleRetry = Sb, t.setErrorHandler = bb, t.setSuspenseHandler = Tb, t.scheduleRefresh = Oe, t.scheduleRoot = De, t.setRefreshHandler = Bl, t.getCurrentFiber = le, c0(t);
    })() && Wc && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var Eb = window.location.protocol;
      /^(https?|file):$/.test(Eb) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (Eb === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    op.createRoot = function(t, e) {
      if (!he(t))
        throw Error("Target container is not a DOM element.");
      ly(t);
      var a = !1, c = "", o = zd, f = Dd, d = k0;
      return e != null && (e.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof e == "object" && e !== null && e.$$typeof === cn && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (c = e.identifierPrefix), e.onUncaughtError !== void 0 && (o = e.onUncaughtError), e.onCaughtError !== void 0 && (f = e.onCaughtError), e.onRecoverableError !== void 0 && (d = e.onRecoverableError)), e = lr(
        t,
        1,
        !1,
        null,
        null,
        a,
        c,
        null,
        o,
        f,
        d,
        Mv
      ), t[uc] = e.current, Qc(t), new ey(e);
    }, op.hydrateRoot = function(t, e, a) {
      if (!he(t))
        throw Error("Target container is not a DOM element.");
      ly(t), e === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var c = !1, o = "", f = zd, d = Dd, h = k0, y = null;
      return a != null && (a.unstable_strictMode === !0 && (c = !0), a.identifierPrefix !== void 0 && (o = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.formState !== void 0 && (y = a.formState)), e = lr(
        t,
        1,
        !0,
        e,
        a ?? null,
        c,
        o,
        y,
        f,
        d,
        h,
        Mv
      ), e.context = Av(null), a = e.current, c = jl(a), c = li(c), o = Pe(c), o.callback = null, eu(a, o, c), In(c, "hydrateRoot()", null), a = c, e.current.lanes = a, dc(e, a), da(e), t[uc] = e.current, Qc(t), new Nn(e);
    }, op.version = "19.2.3", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), op;
}
var Cb;
function r4() {
  if (Cb) return x1.exports;
  Cb = 1;
  function L() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(L);
      } catch (Ye) {
        console.error(Ye);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (L(), x1.exports = f4()) : x1.exports = s4(), x1.exports;
}
var d4 = r4();
const h4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='35.93'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20228'%3e%3cpath%20fill='%2300D8FF'%20d='M210.483%2073.824a171.49%20171.49%200%200%200-8.24-2.597c.465-1.9.893-3.777%201.273-5.621c6.238-30.281%202.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254%2019.526a171.23%20171.23%200%200%200-6.375%205.848a155.866%20155.866%200%200%200-4.241-3.917C100.759%203.829%2077.587-4.822%2063.673%203.233C50.33%2010.957%2046.379%2033.89%2051.995%2062.588a170.974%20170.974%200%200%200%201.892%208.48c-3.28.932-6.445%201.924-9.474%202.98C17.309%2083.498%200%2098.307%200%20113.668c0%2015.865%2018.582%2031.778%2046.812%2041.427a145.52%20145.52%200%200%200%206.921%202.165a167.467%20167.467%200%200%200-2.01%209.138c-5.354%2028.2-1.173%2050.591%2012.134%2058.266c13.744%207.926%2036.812-.22%2059.273-19.855a145.567%20145.567%200%200%200%205.342-4.923a168.064%20168.064%200%200%200%206.92%206.314c21.758%2018.722%2043.246%2026.282%2056.54%2018.586c13.731-7.949%2018.194-32.003%2012.4-61.268a145.016%20145.016%200%200%200-1.535-6.842c1.62-.48%203.21-.974%204.76-1.488c29.348-9.723%2048.443-25.443%2048.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365%2070.984c-1.4.463-2.836.91-4.3%201.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11%209.31-21.767%2012.459-31.957c2.619.758%205.16%201.557%207.61%202.4c23.69%208.156%2038.14%2020.213%2038.14%2029.504c0%209.896-15.606%2022.743-40.946%2031.14Zm-10.514%2020.834c2.562%2012.94%202.927%2024.64%201.23%2033.787c-1.524%208.219-4.59%2013.698-8.382%2015.893c-8.067%204.67-25.32-1.4-43.927-17.412a156.726%20156.726%200%200%201-6.437-5.87c7.214-7.889%2014.423-17.06%2021.459-27.246c12.376-1.098%2024.068-2.894%2034.671-5.345a134.17%20134.17%200%200%201%201.386%206.193ZM87.276%20214.515c-7.882%202.783-14.16%202.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923%20156.923%200%200%201%201.869-8.499c10.486%202.32%2022.093%203.988%2034.498%204.994c7.084%209.967%2014.501%2019.128%2021.976%2027.15a134.668%20134.668%200%200%201-4.877%204.492c-9.933%208.682-19.886%2014.842-28.658%2017.94ZM50.35%20144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322%2013.897-21.212%2037.076-29.293c2.813-.98%205.757-1.905%208.812-2.773c3.204%2010.42%207.406%2021.315%2012.477%2032.332c-5.137%2011.18-9.399%2022.249-12.634%2032.792a134.718%20134.718%200%200%201-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134%206.425-47.789c8.564-4.958%2027.502%202.111%2047.463%2019.835a144.318%20144.318%200%200%201%203.841%203.545c-7.438%207.987-14.787%2017.08-21.808%2026.988c-12.04%201.116-23.565%202.908-34.161%205.309a160.342%20160.342%200%200%201-1.76-7.887Zm110.427%2027.268a347.8%20347.8%200%200%200-7.785-12.803c8.168%201.033%2015.994%202.404%2023.343%204.08c-2.206%207.072-4.956%2014.465-8.193%2022.045a381.151%20381.151%200%200%200-7.365-13.322Zm-45.032-43.861c5.044%205.465%2010.096%2011.566%2015.065%2018.186a322.04%20322.04%200%200%200-30.257-.006c4.974-6.559%2010.069-12.652%2015.192-18.18ZM82.802%2087.83a323.167%20323.167%200%200%200-7.227%2013.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634%2015.093-2.97%2023.209-3.984a321.524%20321.524%200%200%200-7.848%2012.897Zm8.081%2065.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3%205.045-14.885%208.298-22.6a321.187%20321.187%200%200%200%207.257%2013.246c2.594%204.48%205.28%208.868%208.038%2013.147Zm37.542%2031.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192%209.899.29%2014.978.29c5.218%200%2010.376-.117%2015.453-.343c-4.985%206.774-10.018%2012.97-15.028%2018.486Zm52.198-57.817c3.422%207.8%206.306%2015.345%208.596%2022.52c-7.422%201.694-15.436%203.058-23.88%204.071a382.417%20382.417%200%200%200%207.859-13.026a347.403%20347.403%200%200%200%207.425-13.565Zm-16.898%208.101a358.557%20358.557%200%200%201-12.281%2019.815a329.4%20329.4%200%200%201-23.444.823c-7.967%200-15.716-.248-23.178-.732a310.202%20310.202%200%200%201-12.513-19.846h.001a307.41%20307.41%200%200%201-10.923-20.627a310.278%20310.278%200%200%201%2010.89-20.637l-.001.001a307.318%20307.318%200%200%201%2012.413-19.761c7.613-.576%2015.42-.876%2023.31-.876H128c7.926%200%2015.743.303%2023.354.883a329.357%20329.357%200%200%201%2012.335%2019.695a358.489%20358.489%200%200%201%2011.036%2020.54a329.472%20329.472%200%200%201-11%2020.722Zm22.56-122.124c8.572%204.944%2011.906%2024.881%206.52%2051.026c-.344%201.668-.73%203.367-1.15%205.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789%20160.789%200%200%201%205.888-5.4c18.9-16.447%2036.564-22.941%2044.612-18.3ZM128%2090.808c12.625%200%2022.86%2010.235%2022.86%2022.86s-10.235%2022.86-22.86%2022.86s-22.86-10.235-22.86-22.86s10.235-22.86%2022.86-22.86Z'%3e%3c/path%3e%3c/svg%3e", m4 = "/vite.svg";
function y4() {
  const [L, Ye] = l4(0);
  return /* @__PURE__ */ La.jsxs(La.Fragment, { children: [
    /* @__PURE__ */ La.jsxs("div", { children: [
      /* @__PURE__ */ La.jsx("a", { href: "https://vite.dev", target: "_blank", children: /* @__PURE__ */ La.jsx("img", { src: m4, className: "logo", alt: "Vite logo" }) }),
      /* @__PURE__ */ La.jsx("a", { href: "https://react.dev", target: "_blank", children: /* @__PURE__ */ La.jsx("img", { src: h4, className: "logo react", alt: "React logo" }) })
    ] }),
    /* @__PURE__ */ La.jsx("h1", { children: "Vite + React" }),
    /* @__PURE__ */ La.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ La.jsxs("button", { onClick: () => Ye((de) => de + 1), children: [
        "count is ",
        L
      ] }),
      /* @__PURE__ */ La.jsxs("p", { children: [
        "Edit ",
        /* @__PURE__ */ La.jsx("code", { children: "src/App.tsx" }),
        " and save to test HMR"
      ] })
    ] }),
    /* @__PURE__ */ La.jsx("p", { className: "read-the-docs", children: "Click on the Vite and React logos to learn more" })
  ] });
}
d4.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ La.jsx(a4, { children: /* @__PURE__ */ La.jsx(y4, {}) })
);
//# sourceMappingURL=my-app.js.map
