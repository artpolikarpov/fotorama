var lastEvent,
    moveEventType,
    preventEvent,
    preventEventTimeout,
    addEventListener = 'addEventListener';

function extendEvent (e) {
  var touch = (e.touches || [])[0] || e;
  e._x = touch.pageX;
  e._y = touch.clientY;
}

function touch ($el, options) {
  var el = $el[0],
      docTouchTimeout,
      tail = {},
      touchEnabledFLAG,
      startEvent,
      $target,
      controlTouch,
      touchFLAG,
      targetIsSelectFLAG,
      targetIsLinkFlag;

  function onStart (e) {
    $target = $(e.target);
    tail.checked = targetIsSelectFLAG = targetIsLinkFlag = false;

    if (touchEnabledFLAG
        || tail.flow
        || (e.touches && e.touches.length > 1)
        || e.which > 1
        || (lastEvent && lastEvent.type !== e.type && preventEvent)
        || (targetIsSelectFLAG = options.select && $target.is(options.select, el))) return targetIsSelectFLAG;

    touchFLAG = e.type.match(/^t/);
    targetIsLinkFlag = $target.is('a, a *', el);

    extendEvent(e);

    startEvent = lastEvent = e;
    moveEventType = e.type.replace(/down|start/, 'move').replace(/Down/, 'Move');
    controlTouch = tail.control;

    (options.onStart || noop).call(el, e, {control: controlTouch, $target: $target});

    touchEnabledFLAG = tail.flow = true;

    if (!touchFLAG || tail.go) {
      e.preventDefault();
    }
  }

  function onMove (e) {
    if ((e.touches && e.touches.length > 1)
        || (MS_POINTER && !e.isPrimary)
        || moveEventType !== e.type
        || !touchEnabledFLAG) {
      touchEnabledFLAG && onEnd();
      return;
    }

    extendEvent(e);

    var xDiff = Math.abs(e._x - startEvent._x), // opt _x → _pageX
        yDiff = Math.abs(e._y - startEvent._y),
        xyDiff = xDiff - yDiff,
        xWin = (tail.go || tail.x || xyDiff > 0) && !tail.noSwipe,
        yWin = xyDiff < 0;

    if (touchFLAG && !tail.checked) {
      touchEnabledFLAG = xWin;
      touchEnabledFLAG && e.preventDefault();
    } else {
      e.preventDefault();
      (options.onMove || noop).call(el, e, {touch: touchFLAG});
    }

    tail.checked = tail.checked || xWin || yWin;
  }

  function onEnd (e) {
    var _touchEnabledFLAG = touchEnabledFLAG;
    tail.control = touchEnabledFLAG = false;

    if (_touchEnabledFLAG) {
      tail.flow = false;
    }

    if (!_touchEnabledFLAG || (targetIsLinkFlag && !tail.checked)) return;

    e && e.preventDefault();

    preventEvent = true;
    clearTimeout(preventEventTimeout);
    preventEventTimeout = setTimeout(function () {
      preventEvent = false;
    }, 1000);
    (options.onEnd || noop).call(el, {moved: tail.checked, $target: $target, control: controlTouch, touch: touchFLAG, startEvent: startEvent, aborted: !e});
  }

  function onOtherStart () {
    clearTimeout(docTouchTimeout);
    docTouchTimeout = setTimeout(function () {
      tail.flow = true;
    }, 10);
  }

  function onOtherEnd () {
    clearTimeout(docTouchTimeout);
    docTouchTimeout = setTimeout(function () {
      tail.flow = false;
    }, TOUCH_TIMEOUT);
  }

  if (MS_POINTER) {
    el[addEventListener]('MSPointerDown', onStart);
    document[addEventListener]('MSPointerMove', onMove);
    document[addEventListener]('MSPointerCancel', onEnd);
    document[addEventListener]('MSPointerUp', onEnd);
  } else {
    if (el[addEventListener]) {
      el[addEventListener]('touchstart', onStart);
      el[addEventListener]('touchmove', onMove);
      el[addEventListener]('touchend', onEnd);

      document[addEventListener]('touchstart', onOtherStart);
      document[addEventListener]('touchend', onOtherEnd);
      window[addEventListener]('scroll', onOtherEnd);
    }

    $el.on('mousedown', onStart);
    $DOCUMENT
        .on('mousemove', onMove)
        .on('mouseup', onEnd);
  }

  $el.on('click', 'a', function (e) {
    tail.checked && e.preventDefault();
  });

  return tail;
}
