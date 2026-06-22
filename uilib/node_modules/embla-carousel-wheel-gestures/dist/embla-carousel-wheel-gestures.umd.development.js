(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.EmblaCarouselWheelGestures = factory());
}(this, (function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var DECAY = 0.996;
  /**
   * movement projection based on velocity
   * @param velocityPxMs
   * @param decay
   */

  var projection = function projection(velocityPxMs, decay) {
    if (decay === void 0) {
      decay = DECAY;
    }

    return velocityPxMs * decay / (1 - decay);
  };

  function lastOf(array) {
    return array[array.length - 1];
  }

  function average(numbers) {
    return numbers.reduce(function (a, b) {
      return a + b;
    }) / numbers.length;
  }

  var clamp = function clamp(value, min, max) {
    return Math.min(Math.max(min, value), max);
  };

  function addVectors(v1, v2) {
    if (v1.length !== v2.length) {
      throw new Error('vectors must be same length');
    }

    return v1.map(function (val, i) {
      return val + v2[i];
    });
  }

  function absMax(numbers) {
    return Math.max.apply(Math, numbers.map(Math.abs));
  } // eslint-disable-next-line @typescript-eslint/ban-types


  function deepFreeze(o) {
    Object.freeze(o);
    Object.values(o).forEach(function (value) {
      if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
        deepFreeze(value);
      }
    });
    return o;
  }

  function EventBus() {
    var listeners = {};

    function on(type, listener) {
      listeners[type] = (listeners[type] || []).concat(listener);
      return function () {
        return off(type, listener);
      };
    }

    function off(type, listener) {
      listeners[type] = (listeners[type] || []).filter(function (l) {
        return l !== listener;
      });
    }

    function dispatch(type, data) {
      if (!(type in listeners)) return;
      listeners[type].forEach(function (l) {
        return l(data);
      });
    }

    return deepFreeze({
      on: on,
      off: off,
      dispatch: dispatch
    });
  }

  function WheelTargetObserver(eventListener) {
    var targets = []; // add event listener to target element

    var observe = function observe(target) {
      target.addEventListener('wheel', eventListener, {
        passive: false
      });
      targets.push(target);
      return function () {
        return unobserve(target);
      };
    }; /// remove event listener from target element


    var unobserve = function unobserve(target) {
      target.removeEventListener('wheel', eventListener);
      targets = targets.filter(function (t) {
        return t !== target;
      });
    }; // stops watching all of its target elements for visibility changes.


    var disconnect = function disconnect() {
      targets.forEach(unobserve);
    };

    return deepFreeze({
      observe: observe,
      unobserve: unobserve,
      disconnect: disconnect
    });
  }

  var LINE_HEIGHT = 16 * 1.125;
  var PAGE_HEIGHT = typeof window !== 'undefined' && window.innerHeight || 800;
  var DELTA_MODE_UNIT = [1, LINE_HEIGHT, PAGE_HEIGHT];

  function normalizeWheel(e) {
    var deltaX = e.deltaX * DELTA_MODE_UNIT[e.deltaMode];
    var deltaY = e.deltaY * DELTA_MODE_UNIT[e.deltaMode];
    var deltaZ = (e.deltaZ || 0) * DELTA_MODE_UNIT[e.deltaMode];
    return {
      timeStamp: e.timeStamp,
      axisDelta: [deltaX, deltaY, deltaZ]
    };
  }

  var reverseAll = [-1, -1, -1];

  function reverseAxisDeltaSign(wheel, reverseSign) {
    if (!reverseSign) {
      return wheel;
    }

    var multipliers = reverseSign === true ? reverseAll : reverseSign.map(function (shouldReverse) {
      return shouldReverse ? -1 : 1;
    });
    return _extends({}, wheel, {
      axisDelta: wheel.axisDelta.map(function (delta, i) {
        return delta * multipliers[i];
      })
    });
  }

  var DELTA_MAX_ABS = 700;

  var clampAxisDelta = function clampAxisDelta(wheel) {
    return _extends({}, wheel, {
      axisDelta: wheel.axisDelta.map(function (delta) {
        return clamp(delta, -DELTA_MAX_ABS, DELTA_MAX_ABS);
      })
    });
  };

  var ACC_FACTOR_MIN = 0.6;
  var ACC_FACTOR_MAX = 0.96;
  var WHEELEVENTS_TO_MERGE = 2;
  var WHEELEVENTS_TO_ANALAZE = 5;
  var configDefaults = /*#__PURE__*/deepFreeze({
    preventWheelAction: true,
    reverseSign: [true, true, false]
  });
  var WILL_END_TIMEOUT_DEFAULT = 400;

  function createWheelGesturesState() {
    return {
      isStarted: false,
      isStartPublished: false,
      isMomentum: false,
      startTime: 0,
      lastAbsDelta: Infinity,
      axisMovement: [0, 0, 0],
      axisVelocity: [0, 0, 0],
      accelerationFactors: [],
      scrollPoints: [],
      scrollPointsToMerge: [],
      willEndTimeout: WILL_END_TIMEOUT_DEFAULT
    };
  }

  function WheelGestures(optionsParam) {
    if (optionsParam === void 0) {
      optionsParam = {};
    }

    var _EventBus = EventBus(),
        on = _EventBus.on,
        off = _EventBus.off,
        dispatch = _EventBus.dispatch;

    var config = configDefaults;
    var state = createWheelGesturesState();
    var currentEvent;
    var negativeZeroFingerUpSpecialEvent = false;
    var prevWheelEventState;

    var feedWheel = function feedWheel(wheelEvents) {
      if (Array.isArray(wheelEvents)) {
        wheelEvents.forEach(function (wheelEvent) {
          return processWheelEventData(wheelEvent);
        });
      } else {
        processWheelEventData(wheelEvents);
      }
    };

    var updateOptions = function updateOptions(newOptions) {
      if (newOptions === void 0) {
        newOptions = {};
      }

      if (Object.values(newOptions).some(function (option) {
        return option === undefined || option === null;
      })) {
         console.error('updateOptions ignored! undefined & null options not allowed');
        return config;
      }

      return config = deepFreeze(_extends({}, configDefaults, config, newOptions));
    };

    var publishWheel = function publishWheel(additionalData) {
      var wheelEventState = _extends({
        event: currentEvent,
        isStart: false,
        isEnding: false,
        isMomentumCancel: false,
        isMomentum: state.isMomentum,
        axisDelta: [0, 0, 0],
        axisVelocity: state.axisVelocity,
        axisMovement: state.axisMovement,

        get axisMovementProjection() {
          return addVectors(wheelEventState.axisMovement, wheelEventState.axisVelocity.map(function (velocity) {
            return projection(velocity);
          }));
        }

      }, additionalData);

      dispatch('wheel', _extends({}, wheelEventState, {
        previous: prevWheelEventState
      })); // keep reference without previous, otherwise we would create a long chain

      prevWheelEventState = wheelEventState;
    }; // should prevent when there is mainly movement on the desired axis


    var shouldPreventDefault = function shouldPreventDefault(deltaMaxAbs, axisDelta) {
      var _config = config,
          preventWheelAction = _config.preventWheelAction;
      var deltaX = axisDelta[0],
          deltaY = axisDelta[1],
          deltaZ = axisDelta[2];
      if (typeof preventWheelAction === 'boolean') return preventWheelAction;

      switch (preventWheelAction) {
        case 'x':
          return Math.abs(deltaX) >= deltaMaxAbs;

        case 'y':
          return Math.abs(deltaY) >= deltaMaxAbs;

        case 'z':
          return Math.abs(deltaZ) >= deltaMaxAbs;

        default:
           console.warn('unsupported preventWheelAction value: ' + preventWheelAction, 'warn');
          return false;
      }
    };

    var processWheelEventData = function processWheelEventData(wheelEvent) {
      var _clampAxisDelta = clampAxisDelta(reverseAxisDeltaSign(normalizeWheel(wheelEvent), config.reverseSign)),
          axisDelta = _clampAxisDelta.axisDelta,
          timeStamp = _clampAxisDelta.timeStamp;

      var deltaMaxAbs = absMax(axisDelta);

      if (wheelEvent.preventDefault && shouldPreventDefault(deltaMaxAbs, axisDelta)) {
        wheelEvent.preventDefault();
      }

      if (!state.isStarted) {
        start();
      } // check if user started scrolling again -> cancel
      else if (state.isMomentum && deltaMaxAbs > Math.max(2, state.lastAbsDelta * 2)) {
          end(true);
          start();
        } // special finger up event on windows + blink


      if (deltaMaxAbs === 0 && Object.is && Object.is(wheelEvent.deltaX, -0)) {
        negativeZeroFingerUpSpecialEvent = true; // return -> zero delta event should not influence velocity

        return;
      }

      currentEvent = wheelEvent;
      state.axisMovement = addVectors(state.axisMovement, axisDelta);
      state.lastAbsDelta = deltaMaxAbs;
      state.scrollPointsToMerge.push({
        axisDelta: axisDelta,
        timeStamp: timeStamp
      });
      mergeScrollPointsCalcVelocity(); // only wheel event (move) and not start/end get the delta values

      publishWheel({
        axisDelta: axisDelta,
        isStart: !state.isStartPublished
      }); // state.isMomentum ? MOMENTUM_WHEEL : WHEEL, { axisDelta })
      // publish start after velocity etc. have been updated

      state.isStartPublished = true; // calc debounced end function, to recognize end of wheel event stream

      willEnd();
    };

    var mergeScrollPointsCalcVelocity = function mergeScrollPointsCalcVelocity() {
      if (state.scrollPointsToMerge.length === WHEELEVENTS_TO_MERGE) {
        state.scrollPoints.unshift({
          axisDeltaSum: state.scrollPointsToMerge.map(function (b) {
            return b.axisDelta;
          }).reduce(addVectors),
          timeStamp: average(state.scrollPointsToMerge.map(function (b) {
            return b.timeStamp;
          }))
        }); // only update velocity after a merged scrollpoint was generated

        updateVelocity(); // reset toMerge array

        state.scrollPointsToMerge.length = 0; // after calculation of velocity only keep the most recent merged scrollPoint

        state.scrollPoints.length = 1;

        if (!state.isMomentum) {
          detectMomentum();
        }
      } else if (!state.isStartPublished) {
        updateStartVelocity();
      }
    };

    var updateStartVelocity = function updateStartVelocity() {
      state.axisVelocity = lastOf(state.scrollPointsToMerge).axisDelta.map(function (d) {
        return d / state.willEndTimeout;
      });
    };

    var updateVelocity = function updateVelocity() {
      // need to have two recent points to calc velocity
      var _state$scrollPoints = state.scrollPoints,
          latestScrollPoint = _state$scrollPoints[0],
          prevScrollPoint = _state$scrollPoints[1];

      if (!prevScrollPoint || !latestScrollPoint) {
        return;
      } // time delta


      var deltaTime = latestScrollPoint.timeStamp - prevScrollPoint.timeStamp;

      if (deltaTime <= 0) {
         console.warn('invalid deltaTime');
        return;
      } // calc the velocity per axes


      var velocity = latestScrollPoint.axisDeltaSum.map(function (d) {
        return d / deltaTime;
      }); // calc the acceleration factor per axis

      var accelerationFactor = velocity.map(function (v, i) {
        return v / (state.axisVelocity[i] || 1);
      });
      state.axisVelocity = velocity;
      state.accelerationFactors.push(accelerationFactor);
      updateWillEndTimeout(deltaTime);
    };

    var updateWillEndTimeout = function updateWillEndTimeout(deltaTime) {
      // use current time between events rounded up and increased by a bit as timeout
      var newTimeout = Math.ceil(deltaTime / 10) * 10 * 1.2; // double the timeout, when momentum was not detected yet

      if (!state.isMomentum) {
        newTimeout = Math.max(100, newTimeout * 2);
      }

      state.willEndTimeout = Math.min(1000, Math.round(newTimeout));
    };

    var accelerationFactorInMomentumRange = function accelerationFactorInMomentumRange(accFactor) {
      // when main axis is the the other one and there is no movement/change on the current one
      if (accFactor === 0) return true;
      return accFactor <= ACC_FACTOR_MAX && accFactor >= ACC_FACTOR_MIN;
    };

    var detectMomentum = function detectMomentum() {
      if (state.accelerationFactors.length >= WHEELEVENTS_TO_ANALAZE) {
        if (negativeZeroFingerUpSpecialEvent) {
          negativeZeroFingerUpSpecialEvent = false;

          if (absMax(state.axisVelocity) >= 0.2) {
            recognizedMomentum();
            return;
          }
        }

        var recentAccelerationFactors = state.accelerationFactors.slice(WHEELEVENTS_TO_ANALAZE * -1); // check recent acceleration / deceleration factors
        // all recent need to match, if any did not match

        var detectedMomentum = recentAccelerationFactors.every(function (accFac) {
          // when both axis decelerate exactly in the same rate it is very likely caused by momentum
          var sameAccFac = !!accFac.reduce(function (f1, f2) {
            return f1 && f1 < 1 && f1 === f2 ? 1 : 0;
          }); // check if acceleration factor is within momentum range

          var bothAreInRangeOrZero = accFac.filter(accelerationFactorInMomentumRange).length === accFac.length; // one the requirements must be fulfilled

          return sameAccFac || bothAreInRangeOrZero;
        });

        if (detectedMomentum) {
          recognizedMomentum();
        } // only keep the most recent events


        state.accelerationFactors = recentAccelerationFactors;
      }
    };

    var recognizedMomentum = function recognizedMomentum() {
      state.isMomentum = true;
    };

    var start = function start() {
      state = createWheelGesturesState();
      state.isStarted = true;
      state.startTime = Date.now();
      prevWheelEventState = undefined;
      negativeZeroFingerUpSpecialEvent = false;
    };

    var willEnd = function () {
      var willEndId;
      return function () {
        clearTimeout(willEndId);
        willEndId = setTimeout(end, state.willEndTimeout);
      };
    }();

    var end = function end(isMomentumCancel) {
      if (isMomentumCancel === void 0) {
        isMomentumCancel = false;
      }

      if (!state.isStarted) return;

      if (state.isMomentum && isMomentumCancel) {
        publishWheel({
          isEnding: true,
          isMomentumCancel: true
        });
      } else {
        publishWheel({
          isEnding: true
        });
      }

      state.isMomentum = false;
      state.isStarted = false;
    };

    var _WheelTargetObserver = WheelTargetObserver(feedWheel),
        observe = _WheelTargetObserver.observe,
        unobserve = _WheelTargetObserver.unobserve,
        disconnect = _WheelTargetObserver.disconnect;

    updateOptions(optionsParam);
    return deepFreeze({
      on: on,
      off: off,
      observe: observe,
      unobserve: unobserve,
      disconnect: disconnect,
      feedWheel: feedWheel,
      updateOptions: updateOptions
    });
  }

  var defaultOptions = {
    active: true,
    breakpoints: {},
    wheelDraggingClass: 'is-wheel-dragging',
    forceWheelAxis: undefined,
    target: undefined
  };
  WheelGesturesPlugin.globalOptions = undefined;

  function WheelGesturesPlugin(userOptions) {
    if (userOptions === void 0) {
      userOptions = {};
    }

    var options;

    var cleanup = function cleanup() {};

    function init(embla, optionsHandler) {
      var _options$target, _options$forceWheelAx;

      var mergeOptions = optionsHandler.mergeOptions,
          optionsAtMedia = optionsHandler.optionsAtMedia;
      var optionsBase = mergeOptions(defaultOptions, WheelGesturesPlugin.globalOptions);
      var allOptions = mergeOptions(optionsBase, userOptions);
      options = optionsAtMedia(allOptions);
      var engine = embla.internalEngine();
      var targetNode = (_options$target = options.target) != null ? _options$target : embla.containerNode().parentNode;
      var wheelAxis = (_options$forceWheelAx = options.forceWheelAxis) != null ? _options$forceWheelAx : engine.options.axis;
      var wheelGestures = WheelGestures({
        preventWheelAction: wheelAxis,
        reverseSign: [true, true, false]
      });

      function updateSizeRelatedVariables() {
        scrollBoundaryThreshold = (wheelAxis === 'x' ? engine.containerRect.width : engine.containerRect.height) / 2;
      }

      var unobserveTargetNode = wheelGestures.observe(targetNode);
      var offWheel = wheelGestures.on('wheel', handleWheel);
      var isStarted = false;
      var startEvent;
      var overBoundaryAccumulation = 0;
      var scrollBoundaryThreshold = 0;
      var blockedWaitUntilGestureEnd = false;
      updateSizeRelatedVariables();
      embla.on('resize', updateSizeRelatedVariables);

      function wheelGestureStarted(state) {
        try {
          startEvent = new MouseEvent('mousedown', state.event);
          dispatchEvent(startEvent);
        } catch (e) {
          // Legacy Browsers like IE 10 & 11 will throw when attempting to create the Event
          {
            console.warn('Legacy browser requires events-polyfill (https://github.com/xiel/embla-carousel-wheel-gestures#legacy-browsers)');
          }

          return cleanup();
        }

        isStarted = true;
        overBoundaryAccumulation = 0;
        addNativeMouseEventListeners();

        if (options.wheelDraggingClass) {
          targetNode.classList.add(options.wheelDraggingClass);
        }
      }

      function wheelGestureEnded(state) {
        isStarted = false;
        dispatchEvent(createRelativeMouseEvent('mouseup', state));
        removeNativeMouseEventListeners();

        if (options.wheelDraggingClass) {
          targetNode.classList.remove(options.wheelDraggingClass);
        }
      }

      function addNativeMouseEventListeners() {
        document.documentElement.addEventListener('mousemove', preventNativeMouseHandler, true);
        document.documentElement.addEventListener('mouseup', preventNativeMouseHandler, true);
        document.documentElement.addEventListener('mousedown', preventNativeMouseHandler, true);
      }

      function removeNativeMouseEventListeners() {
        document.documentElement.removeEventListener('mousemove', preventNativeMouseHandler, true);
        document.documentElement.removeEventListener('mouseup', preventNativeMouseHandler, true);
        document.documentElement.removeEventListener('mousedown', preventNativeMouseHandler, true);
      }

      function preventNativeMouseHandler(e) {
        if (isStarted && e.isTrusted) {
          e.stopImmediatePropagation();
        }
      }

      function createRelativeMouseEvent(type, state) {
        var moveX, moveY;

        if (wheelAxis === engine.options.axis) {
          var _state$axisMovement = state.axisMovement;
          moveX = _state$axisMovement[0];
          moveY = _state$axisMovement[1];
        } else {
          var _state$axisMovement2 = state.axisMovement;
          moveY = _state$axisMovement2[0];
          moveX = _state$axisMovement2[1];
        }

        var _checkIfAtBoundary = checkIfAtBoundary(state),
            isAtBoundary = _checkIfAtBoundary.isAtBoundary; // Apply progressive rubber band damping when at boundaries


        if (isAtBoundary) {
          // Calculate progressive damping factor based on how far over boundary we are
          var progressRatio = Math.min(overBoundaryAccumulation / scrollBoundaryThreshold, 1);
          var dampingFactor = 0.25 + progressRatio * 0.5;
          var counterMoveSign = moveX > 0 ? -1 : 1;
          var counterMovement = overBoundaryAccumulation * counterMoveSign;
          var dampingMovement = counterMovement * dampingFactor;
          moveX += dampingMovement;
          moveY += dampingMovement;
        } // prevent skipping slides


        if (!engine.options.skipSnaps && !engine.options.dragFree) {
          var maxX = engine.containerRect.width;
          var maxY = engine.containerRect.height;
          moveX = moveX < 0 ? Math.max(moveX, -maxX) : Math.min(moveX, maxX);
          moveY = moveY < 0 ? Math.max(moveY, -maxY) : Math.min(moveY, maxY);
        }

        return new MouseEvent(type, {
          clientX: startEvent.clientX + moveX,
          clientY: startEvent.clientY + moveY,
          screenX: startEvent.screenX + moveX,
          screenY: startEvent.screenY + moveY,
          movementX: moveX,
          movementY: moveY,
          button: 0,
          bubbles: true,
          cancelable: true,
          composed: true
        });
      }

      function dispatchEvent(event) {
        embla.containerNode().dispatchEvent(event);
      }

      function checkIfAtBoundary(state) {
        var _state$axisDelta = state.axisDelta,
            deltaX = _state$axisDelta[0],
            deltaY = _state$axisDelta[1];
        var scrollProgress = embla.scrollProgress();
        var canScrollNext = scrollProgress < 1;
        var canScrollPrev = scrollProgress > 0;
        var primaryAxisDelta = wheelAxis === 'x' ? deltaX : deltaY;
        var isScrollingNext = primaryAxisDelta < 0;
        var isScrollingPrev = primaryAxisDelta > 0;
        var isAtBoundary = isScrollingNext && !canScrollNext || isScrollingPrev && !canScrollPrev;
        return {
          isAtBoundary: isAtBoundary,
          primaryAxisDelta: primaryAxisDelta
        };
      }

      function isBoundaryThresholdReached(state) {
        var _checkIfAtBoundary2 = checkIfAtBoundary(state),
            isAtBoundary = _checkIfAtBoundary2.isAtBoundary,
            primaryAxisDelta = _checkIfAtBoundary2.primaryAxisDelta;

        if (isAtBoundary && !state.isMomentum) {
          overBoundaryAccumulation += Math.abs(primaryAxisDelta); // End gesture if we exceed the threshold

          if (overBoundaryAccumulation > scrollBoundaryThreshold) {
            blockedWaitUntilGestureEnd = true;
            wheelGestureEnded(state);
            return true;
          }
        } else {
          // Reset accumulation when we can scroll or when not at boundary
          overBoundaryAccumulation = 0;
        }

        return false;
      }

      function handleWheel(state) {
        var _state$axisDelta2 = state.axisDelta,
            deltaX = _state$axisDelta2[0],
            deltaY = _state$axisDelta2[1];
        var primaryAxisDelta = wheelAxis === 'x' ? deltaX : deltaY;
        var crossAxisDelta = wheelAxis === 'x' ? deltaY : deltaX;
        var isRelease = state.isMomentum && state.previous && !state.previous.isMomentum;
        var isEndingOrRelease = state.isEnding && !state.isMomentum || isRelease;
        var primaryAxisDeltaIsDominant = Math.abs(primaryAxisDelta) > Math.abs(crossAxisDelta);

        if (primaryAxisDeltaIsDominant && !isStarted && !state.isMomentum && !blockedWaitUntilGestureEnd) {
          wheelGestureStarted(state);
        }

        if (blockedWaitUntilGestureEnd && state.isEnding) {
          blockedWaitUntilGestureEnd = false;
        }

        if (!isStarted) return;
        if (isBoundaryThresholdReached(state)) return;

        if (isEndingOrRelease) {
          wheelGestureEnded(state);
        } else {
          dispatchEvent(createRelativeMouseEvent('mousemove', state));
        }
      }

      cleanup = function cleanup() {
        unobserveTargetNode();
        offWheel();
        embla.off('resize', updateSizeRelatedVariables);
        removeNativeMouseEventListeners();
      };
    }

    var self = {
      name: 'wheelGestures',
      options: userOptions,
      init: init,
      destroy: function destroy() {
        return cleanup();
      }
    };
    return self;
  }

  return WheelGesturesPlugin;

})));
//# sourceMappingURL=embla-carousel-wheel-gestures.umd.development.js.map
