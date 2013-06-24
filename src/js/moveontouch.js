/**
 * Функция для перетаскивания и швыряния некого объекта. Для работы необходима функция touch,
 * предоставляющая универсальный доступ к событиям.
 * Имеет три колбека — onStart, onMove, onEnd, в которые (кроме onEnd) отдаётся объект
 * события и дополнительные вычисленные параметры, для добавления инерции или показа определённого изображения
 * в фотораме, например.
 *
 * @param {jQuery} $el Джейквери-объект, на котором будут отслеживаться события
 * @param {Object} options Объект с опциями
 */
function moveOnTouch ($el, options) {
  var el = $el[0],
      elData = $el.data(),
      tail = {},
      startCoo,
      coo,
      startElPos,
      moveElPos,
      edge,
      moveTrack,
      endTime,
      minPos,
      maxPos,
      snap,
      slowFLAG,
      controlFLAG,
      movedFLAG;

  function startTracking (e) {
    startCoo = coo = e._x;

    // Начинаем запись маршрута курсора
    moveTrack = [
      [new Date().getTime(), startCoo]
    ];

    startElPos = moveElPos = stop($el);

    (options.onStart || noop).call(el, e, {pos: startElPos});
  }

  function onStart (e, result) {
    minPos = elData.minPos;
    maxPos = elData.maxPos;
    snap = elData.snap;

    slowFLAG = e.altKey;
    movedFLAG = false;

    controlFLAG = result.control;

    if (!controlFLAG) {
      startTracking(e);
    }
  }

  function onMove (e) {
    if (controlFLAG) {
      controlFLAG = false;
      startTracking(e);
    }

    coo = e._x;

    // Продолжаем запись маршрута курсора
    moveTrack.push([new Date().getTime(), coo]);

    moveElPos = startElPos - (startCoo - coo);

    edge = findShadowEdge(moveElPos, minPos, maxPos);

    if (moveElPos <= minPos) {
      moveElPos = edgeResistance(moveElPos, minPos);
    } else if (moveElPos >= maxPos) {
      moveElPos = edgeResistance(moveElPos, maxPos);
    }


    if (!tail.noMove) {
      $el.css(getTranslate(moveElPos));
      if (!movedFLAG) {
        movedFLAG = true;
        $BODY.addClass('grabbing');
      }
    }

    (options.onMove || noop).call(el, e, {pos: moveElPos, edge: edge});
  }

  function onEnd (result) {
    if (controlFLAG) return;

    $BODY.removeClass('grabbing');

    endTime = new Date().getTime();

    var _backTimeIdeal = endTime - TOUCH_TIMEOUT,
        _backTime,
        _timeDiff,
        _timeDiffLast,
        backTime = null,
        backCoo,
        virtualPos,
        limitPos,
        newPos,
        overPos,
        time = TRANSITION_DURATION,
        speed,
        friction = options.friction;

    for (var _i = moveTrack.length - 1; _i >= 0; _i--) {
      _backTime = moveTrack[_i][0];
      _timeDiff = Math.abs(_backTime - _backTimeIdeal);
      if (backTime === null || _timeDiff < _timeDiffLast) {
        backTime = _backTime;
        backCoo = moveTrack[_i][1];
      } else if (backTime === _backTimeIdeal || _timeDiff > _timeDiffLast) {
        break;
      }
      _timeDiffLast = _timeDiff;
    }

    newPos = minMaxLimit(moveElPos, minPos, maxPos);

    var cooDiff = backCoo - coo,
        forwardFLAG = cooDiff >= 0,
        timeDiff = endTime - backTime,
        swipeFLAG = timeDiff <= TOUCH_TIMEOUT && moveElPos !== startElPos && newPos === moveElPos;

    if (snap) {
      newPos = minMaxLimit(Math[swipeFLAG ? (forwardFLAG ? 'floor' : 'ceil') : 'round'](moveElPos / snap) * snap, minPos, maxPos);
      minPos = maxPos = newPos;
    }

    if (swipeFLAG && (snap || newPos === moveElPos)) {
      speed = -(cooDiff / timeDiff);
      time *= minMaxLimit(Math.abs(speed), options.timeLow, options.timeHigh);
      virtualPos = Math.round(moveElPos + speed * time / friction);

      if (!snap) {
        newPos = virtualPos;
      }

      if (!forwardFLAG && virtualPos > maxPos || forwardFLAG && virtualPos < minPos) {
        limitPos = forwardFLAG ? minPos : maxPos;
        overPos = virtualPos - limitPos;
        if (!snap) {
          newPos = limitPos;
        }
        overPos = minMaxLimit(newPos + overPos * .03, limitPos - 50, limitPos + 50);
        time = Math.abs((moveElPos - overPos) / (speed / friction));
      }
    }

    time *= slowFLAG ? 10 : 1;

    (options.onEnd || noop).call(el, $.extend(result, {pos: moveElPos, newPos: newPos, overPos: overPos, time: time}));
  }

  tail = $.extend(touch(options.$wrap, {
    onStart: onStart,
    onMove: onMove,
    onEnd: onEnd,
    select: options.select,
    control: options.control
  }), tail);

  return tail;
}