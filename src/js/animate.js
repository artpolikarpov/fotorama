/**
 * Универсальная функция для анимирования блока (через ЦСС3 или Джейквери),
 * по одному из свойств, top или left
 * */
function slide ($el, options) {
  var elPos = Math.round(options.pos),
      onEndFn = options.onEnd || noop;

  if (typeof options.overPos !== 'undefined' && options.overPos !== options.pos) {
    elPos = options.overPos;
    onEndFn = function () {
      slide($el, $.extend({}, options, {overPos: options.pos, time: Math.max(TRANSITION_DURATION, options.time / 2)}))
    };
  }

  var translate = getTranslate(elPos);

  if (CSS3) {
    $el.css($.extend(getDuration(options.time), translate));
    if (options.time > 10) {
      afterTransition($el, onEndFn, options.time);
    } else {
      onEndFn();
    }
  } else {
    $el.stop().animate(translate, options.time, BEZIER, onEndFn);
  }
}

function fade ($el1, $el2, options) {
  var _$el1 = $el1, _$el2 = $el2, crossfadeFLAG = options.method === 'crossfade';
  fade.$el1 = $el1 = $el1 || $($el1);
  fade.$el2 = $el2 = $el2 || $($el2);

  var onEndFn = function () {
        if (onEndFn.done || fade.$el1 !== $el1 || fade.$el2 !== $el2) return;
        $el1.removeClass(fadeRearClass);
        $el2.removeClass(fadeFrontClass);
        (options.onEnd || noop)();
        onEndFn.done = true;
      },
      duration = getDuration(options.time),
      duration0 = getDuration(0),
      opacity0 = {opacity: 0},
      opacity1 = {opacity: 1};

  $el1
      .stop()
      .css(duration0)
      .addClass(fadeRearClass)
      .removeClass(fadeFrontClass);
  $el2
      .stop()
      .css(duration0)
      .addClass(fadeFrontClass)
      .removeClass(fadeRearClass);

  if (CSS3) {
    if (_$el2) {
      $el1.css(crossfadeFLAG ? opacity0 : opacity1);
    }

    setTimeout(function () {
      $el1.css($.extend(duration, opacity1))
      $el2.css($.extend(duration, opacity0));
    }, 4);

    if (options.time > 10 && (_$el1 || _$el2)) {
      if (_$el1) {
        afterTransition($el1, onEndFn, options.time);
      } else if (_$el2) {
        afterTransition($el2, onEndFn, options.time);
      }
    } else {
      onEndFn();
    }


  } else {
    if (_$el2) {
      $el1
          .stop()
          .fadeTo(0, crossfadeFLAG ? 0 : 1);
    }

    $el1
        .stop()
        .fadeTo(options.time, 1, onEndFn);
    $el2
        .stop()
        .fadeTo(options.time, 0, onEndFn);

    if (!_$el1 && !_$el2) onEndFn();
  }
}