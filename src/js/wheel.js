function wheel ($el, options) {
  var el = $el[0],
      lockFLAG,
      unlockTimestamp,
      tail = {
        prevent: {}
      };

  el[ADD_EVENT_LISTENER] && el[ADD_EVENT_LISTENER](WHEEL, function (e) {
    var yDelta = e.wheelDeltaY || -1 * e.deltaY || 0,
        xDelta = e.wheelDeltaX || -1 * e.deltaX || 0,
        xWin = Math.abs(xDelta) > Math.abs(yDelta),
        direction;

    if (!xWin || !tail.ok || tail.prevent[direction = getDirectionSign(xDelta < 0)] && !lockFLAG) {
      return;
    } else {
      stopEvent(e, true);
      if (lockFLAG || $.now() - unlockTimestamp < TOUCH_TIMEOUT / 2) return;
    }


    (options.onEnd || noop)(e, options.shift ? direction : xDelta);

    if (options.shift) {
      lockFLAG = true;
      setTimeout(function () {
        unlockTimestamp = $.now();
        lockFLAG = false;
      }, SCROLL_LOCK_TIMEOUT);
    }

  }, false);

  return tail;
}