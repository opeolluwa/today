import WheelGestures from 'wheel-gestures';

var defaultOptions = {
  active: true,
  breakpoints: {},
  wheelDraggingClass: 'is-wheel-dragging',
  forceWheelAxis: undefined,
  target: undefined
};
WheelGesturesPlugin.globalOptions = undefined;

var __DEV__ = process.env.NODE_ENV !== 'production';

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
        if (__DEV__) {
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

export default WheelGesturesPlugin;
export { WheelGesturesPlugin };
//# sourceMappingURL=embla-carousel-wheel-gestures.esm.js.map
