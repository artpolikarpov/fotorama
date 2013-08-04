var lastEvent,
    moveEventType,
    preventEvent,
    preventEventTimeout;

function extendEvent (e, touchFLAG) {
  if (touchFLAG) {
    var touch = e.touches[0];
    e._x = touch.pageX;
    e._y = touch.pageY;
    e._X = touch.clientX;
    e._Y = touch.clientY;
  } else {
    e._x = e.pageX;
    e._y = e.pageY;
    e._X = e.clientX;
    e._Y = e.clientY;
  }
}

function touch ($el, options) {
  var el = $el[0],
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

    touchFLAG = e.type.match('touch');
    targetIsLinkFlag = $target.is('a, a *', el);

    extendEvent(e, touchFLAG);

    startEvent = lastEvent = e;
    moveEventType = e.type.replace(/down|start/, 'move');
    controlTouch = tail.control;

    (options.onStart || noop).call(el, e, {control: controlTouch, $target: $target});

    tail.flow = touchEnabledFLAG = true;

    if (!touchFLAG) {
      e.preventDefault();
    }
  }

  function onMove (e) {
    if ((e.touches && e.touches.length > 1)
        || moveEventType !== e.type
        || !touchEnabledFLAG) {
      onEnd();
      return;
    }

    extendEvent(e, touchFLAG);

    var xDiff = Math.abs(e._X - startEvent._X), // opt _x → _pageX
        yDiff = Math.abs(e._Y - startEvent._Y),
        xyDiff = xDiff - yDiff,
        xWin = (!tail.stable || xyDiff > 0) && !tail.noSwipe,
        yWin = xyDiff < 1;

    if (touchFLAG && !tail.checked) {
      tail.checked = xWin || yWin;
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
    tail.flow = tail.control = touchEnabledFLAG = false;
    if (!_touchEnabledFLAG || (targetIsLinkFlag && !tail.checked)) return;
    e && e.preventDefault();
    preventEvent = true;
    clearTimeout(preventEventTimeout);
    preventEventTimeout = setTimeout(function () {
      preventEvent = false;
    }, 1000);
    (options.onEnd || noop).call(el, {moved: tail.checked, $target: $target, control: controlTouch, startEvent: startEvent, aborted: !e, touch: touchFLAG});
  }

  if (el.addEventListener) {
    el.addEventListener('touchstart', onStart);
    el.addEventListener('touchmove', onMove);
    el.addEventListener('touchend', onEnd);
  }

  $el.on('mousedown', onStart);
  $DOCUMENT
      .on('mousemove', onMove)
      .on('mouseup', onEnd);

  $el.on('click', 'a', function (e) {
    tail.checked && e.preventDefault();
  });

  return tail;
}