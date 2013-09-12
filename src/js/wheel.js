function wheel ($el, options) {
  var el = $el[0],
      lockFLAG,
      lastDirection,
      /*unlockTimestamp,*/
      tail = {
        prevent: {}
      };

  el[ADD_EVENT_LISTENER] && el[ADD_EVENT_LISTENER](WHEEL, function (e) {
    var yDelta = e.wheelDeltaY || -1 * e.deltaY || 0,
        xDelta = e.wheelDeltaX || -1 * e.deltaX || 0,
        xWin = Math.abs(xDelta) > Math.abs(yDelta),
        direction = getDirectionSign(xDelta < 0),
        sameDirection = lastDirection === direction;

    console.log('direction', direction);
    console.log('lastDirection', lastDirection);

    lastDirection = direction;

    if (!xWin || !tail.ok || tail.prevent[direction] && !lockFLAG) {
      return;
    } else {
      stopEvent(e, true);
      if (lockFLAG && sameDirection /*|| $.now() - unlockTimestamp < TOUCH_TIMEOUT / 2*/) return;
    }

    if (options.shift) {
      lockFLAG = true;
      clearTimeout(tail.t);
      tail.t = setTimeout(function () {
        //unlockTimestamp = $.now();
        lockFLAG = false;
      }, SCROLL_LOCK_TIMEOUT);
    }

    (options.onEnd || noop)(e, options.shift ? direction : xDelta);

  }, false);

  return tail;
}