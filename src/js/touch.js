var lastEvent,
    moveEventType,
    preventEvent,
    preventEventTimeout;

function extendEvent (e, touchFLAG) {
  console.log(e.type);
  e._x = touchFLAG ? e.touches[0].pageX : e.pageX;
  e._y = touchFLAG ? e.touches[0].pageY : e.pageY;
}

function touch ($el, options) {
  var el = $el[0],
      tail = {},
      touchEnabledFLAG,
      movableFLAG,
      startEvent,
      eventFlowFLAG,
      movedFLAG,
      $target,
      controlTouch,
      touchFLAG,
      targetIsSelectFLAG;

  function onStart (e) {

    $target = $(e.target);
    targetIsSelectFLAG = false;

    if (touchEnabledFLAG
        || eventFlowFLAG
        || (e.touches && e.touches.length > 1)
        || e.which > 1
        || tail.prevent
        || (lastEvent && lastEvent.type !== e.type && preventEvent)
        || (targetIsSelectFLAG = options.select && $target.is(options.select, el))) return tail.prevent !== true || targetIsSelectFLAG;

    touchFLAG = e.type.match('touch');
    extendEvent(e, touchFLAG);

    tail.checked = movableFLAG = movedFLAG = false;

    lastEvent = e;
    moveEventType = e.type.replace(/down|start/, 'move');
    startEvent = e;
    controlTouch = tail.control;

    (options.onStart || noop).call(el, e, {control: controlTouch, $target: $target});

    touchEnabledFLAG = eventFlowFLAG = true;

    if (!touchFLAG) {
      e.preventDefault();
    }
  }

  function onMove (e) {

    if (!touchEnabledFLAG
        || (e.touches && e.touches.length > 1)) {
      onEnd();
      return;
    } else if (moveEventType !== e.type) {
      return;
    }

    extendEvent(e, touchFLAG);

    var xDiff = Math.abs(e._x - startEvent._x),
        yDiff = Math.abs(e._y - startEvent._y),
        xWin = xDiff > yDiff,
        yWin = yDiff > xDiff;

    if (!movedFLAG) {
      movedFLAG = !(!xWin && !yWin);
    }

    if (touchFLAG && !tail.checked) {
      if (xWin || yWin) {
        tail.checked = true;
        movableFLAG = xWin;
      }

      if (!tail.checked || movableFLAG) {
        e.preventDefault();
      }
    } else if (!touchFLAG || movableFLAG) {
      e.preventDefault();
      (options.onMove || noop).call(el, e);
    } else {
      touchEnabledFLAG = false;
    }

    tail.checked = tail.checked || xWin || yWin;
  }

  function onEnd (e) {
    eventFlowFLAG = tail.control = false;
    if (!touchEnabledFLAG) return;
    e && e.preventDefault && e.preventDefault();
    preventEvent = true;
    clearTimeout(preventEventTimeout);
    preventEventTimeout = setTimeout(function () {
      preventEvent = false;
    }, 1000);
    (options.onEnd || noop).call(el, {moved: !!movedFLAG, $target: $target, control: controlTouch, startEvent: startEvent, aborted: !e, touch: touchFLAG});
    touchEnabledFLAG = false;
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
    // Клик по ссылкам только если не начато перетаскивание
    if (tail.checked) {
      e.preventDefault();
    }
  });

  // Возвращаем хвостик, чтобы управлять некоторыми параметрами в будущем,
  // например ориентацией
  return tail;
}