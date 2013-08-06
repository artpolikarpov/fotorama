var lastEvent,
    moveEventType,
    preventEvent,
    preventEventTimeout;

function extendEvent (e, touchFLAG) {
  if (touchFLAG) {
    var touch = e.touches[0];
    e._x = touch.clientX;
    e._y = touch.clientY;
  } else {
    e._x = e.clientX;
    e._y = e.clientY;
  }
}

function touch ($el, options) {
  var el = $el[0],
      addEventListener = 'addEventListener',
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

    e.stopPropagation();

    if (touchEnabledFLAG
        || tail.flow
        || (e.touches && e.touches.length > 1)
        || e.which > 1
        || (lastEvent && lastEvent.type !== e.type && preventEvent)
        || (targetIsSelectFLAG = options.select && $target.is(options.select, el))) return targetIsSelectFLAG;

    //console.log('onStart $WINDOW.scrollTop', $WINDOW.scrollTop());

    touchFLAG = e.type.match('touch');
    targetIsLinkFlag = $target.is('a, a *', el);

    extendEvent(e, touchFLAG);

    startEvent = lastEvent = e;
    moveEventType = e.type.replace(/down|start/, 'move');
    controlTouch = tail.control;

    (options.onStart || noop).call(el, e, {control: controlTouch, $target: $target});

    tail.flow = touchEnabledFLAG = true;

    if (!touchFLAG || tail.go) {
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

    //console.log('onMove $WINDOW.scrollTop', $WINDOW.scrollTop());

    extendEvent(e, touchFLAG);

    var xDiff = Math.abs(e._x - startEvent._x), // opt _x → _pageX
        yDiff = Math.abs(e._y - startEvent._y),
        xyDiff = xDiff - yDiff,
        xWin = (tail.go || xyDiff >= 0) && !tail.noSwipe,
        yWin = xyDiff < 0;

    console.log('x y', e._x, startEvent._x, e._y, startEvent._y);

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

  if (el[addEventListener]) {
    el[addEventListener]('touchstart', onStart);
    el[addEventListener]('touchmove', onMove);
    el[addEventListener]('touchend', onEnd);

    document[addEventListener]('touchstart', function () {
      clearTimeout(docTouchTimeout);
      console.log('DOC TOUCHSTART');
      tail.flow = true;
    });

    document[addEventListener]('touchend', function () {
      clearTimeout(docTouchTimeout);
      docTouchTimeout = setTimeout(function () {
        console.log('DOC TOUCHEND');
        tail.flow = false;
      }, TOUCH_TIMEOUT);
    });
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