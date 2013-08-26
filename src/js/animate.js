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

function fade ($el1, $el2, $frames, options, fadeStack, chain) {
  var chainedFLAG = typeof chain !== 'undefined';
  if (!chainedFLAG) {
    fadeStack.push(arguments);
    Array.prototype.push.call(arguments, fadeStack.length);
    if (fadeStack.length > 1) return;
  }

  $el1 = $el1 || $($el1);
  $el2 = $el2 || $($el2);
  var _$el1 = $el1[0],
      _$el2 = $el2[0],
      crossfadeFLAG = options.method === 'crossfade',
      onEndFn = function () {
        if (!onEndFn.done) {
          onEndFn.done = true;
          var args = (chainedFLAG || fadeStack.shift()) && fadeStack.shift();
          args && fade.apply(this, args);
          (options.onEnd || noop)(!!args);
        }
      },
      time = options.time / (chain || 1),
      duration = getDuration(time),
      duration0 = getDuration(0),
      opacity0 = {opacity: 0},
      opacity1 = {opacity: 1};

  $frames
      .not($el1.addClass(fadeRearClass).removeClass(fadeFrontClass))
      .not($el2.addClass(fadeFrontClass).removeClass(fadeRearClass))
      .removeClass(fadeRearClass + ' ' + fadeFrontClass);

  if (CSS3 && false) {
    stop($el1);
    stop($el2);

    crossfadeFLAG && _$el2 && $el1.css($.extend({}, duration0, opacity0)).width(); // .width() for immediate reflow

    $el1.css($.extend({}, crossfadeFLAG ? duration : duration0, opacity1));
    $el2.css($.extend({}, duration, opacity0));

    if (time > 10 && (_$el1 || _$el2)) {
      afterTransition($el1, 'opacity', onEndFn, time);
      afterTransition($el2, 'opacity', onEndFn, time);
    } else {
      onEndFn();
    }

  } else {
    $el1.stop();
    $el2.stop();

    crossfadeFLAG && _$el2 && $el1.fadeTo(0, 0);

    $el1.fadeTo(crossfadeFLAG ? time : 1, 1, crossfadeFLAG && onEndFn);
    $el2.fadeTo(time, 0, onEndFn);

    (_$el1 && crossfadeFLAG) || _$el2 || onEndFn();
  }
}