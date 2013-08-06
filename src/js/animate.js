function slide ($el, options) {
  var elPos = Math.round(options.pos),
      onEndFn = options.onEnd || noop;

  if (typeof options.overPos !== 'undefined' && options.overPos !== options.pos) {
    elPos = options.overPos;
    onEndFn = function () {
      slide($el, $.extend({}, options, {overPos: options.pos, time: Math.max(TRANSITION_DURATION, options.time / 2)}))
    };
  }

  var translate = $.extend(getTranslate(elPos), {width: options.width});

  if (CSS3) {
    $el.css($.extend(getDuration(options.time), translate));
    if (options.time > 10) {
      afterTransition($el, 'transform', onEndFn, options.time);
    } else {
      onEndFn();
    }
  } else {
    $el.stop().animate(translate, options.time, BEZIER, onEndFn);
  }
}

function fade ($el1, $el2, $frames, options) {
  $el1 = $el1 || $($el1);
  $el2 = $el2 || $($el2);
  var _$el1 = $el1[0],
      _$el2 = $el2[0],
      crossfadeFLAG = options.method === 'crossfade',
      onEndFn = function () {
        if (!onEndFn.done) {
          (options.onEnd || noop)();
          onEndFn.done = true;
        }
      },
      duration = getDuration(options.time),
      duration0 = getDuration(0),
      opacity0 = {opacity: 0},
      opacity1 = {opacity: 1};

  $frames.removeClass(fadeRearClass + ' ' + fadeFrontClass);

  $el1.addClass(fadeRearClass);
  $el2.addClass(fadeFrontClass);

  if (CSS3) {
    stop($el1);
    stop($el2);

    crossfadeFLAG && _$el2 && $el1.css($.extend(duration0, opacity0)).width(); // .width() for immediate reflow

    $el1.css($.extend(crossfadeFLAG ? duration : duration0, opacity1));
    $el2.css($.extend(duration, opacity0));

    if (options.time > 10 && (_$el1 || _$el2)) {
      afterTransition($el1, 'opacity', onEndFn, options.time);
      afterTransition($el2, 'opacity', onEndFn, options.time);
    } else {
      onEndFn();
    }

  } else {
    $el1.stop();
    $el2.stop();

    crossfadeFLAG && _$el2 && $el1.fadeTo(0, 0);

    $el1.fadeTo(crossfadeFLAG ? options.time : 1, 1, crossfadeFLAG && onEndFn);
    $el2.fadeTo(options.time, 0, onEndFn);

    (_$el1 && crossfadeFLAG) || _$el2 || onEndFn();
  }
}