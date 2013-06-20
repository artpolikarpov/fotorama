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
			afterTransition($el, 'transform', onEndFn, options.time);
		} else {
			onEndFn();
		}
	} else {
		$el.stop().animate(translate, options.time, BEZIER, onEndFn);
	}
}

function fade ($el1, $el2, $frames, options) {
	var _$el1 = $el1, _$el2 = $el2, crossfadeFLAG = options.method === 'crossfade';
	fade.$el1 = $el1 = $el1 || $($el1);
	fade.$el2 = $el2 = $el2 || $($el2);

	var onEndFn = function () {
				if (!onEndFn.done) {
					//$el1.removeClass(fadeRearClass);
					//$el2.removeClass(fadeFrontClass);
					(options.onEnd || noop)();
					onEndFn.done = true;
				}
			},
			duration = getDuration(options.time),
			duration0 = getDuration(0),
			opacity0 = {opacity: 0},
			opacity1 = {opacity: 1};

	$frames.removeClass(fadeRearClass + ' ' + fadeFrontClass);

	$el1
			.addClass(fadeFrontClass);
	//.removeClass(fadeRearClass);
	$el2
			.addClass(fadeRearClass);
	//.removeClass(fadeFrontClass);

	if (CSS3) {
		stop($el1);
		stop($el2);

		if (_$el2) {
			$el1.css($.extend(duration0, opacity0));
			// Reflow
			$el1.width();
		}

		$el1.css($.extend(duration, opacity1));

		crossfadeFLAG && $el2.css($.extend(duration, opacity0));

		if (options.time > 10 && (_$el1 || _$el2)) {
			afterTransition($el1, 'opacity', onEndFn, options.time);
			afterTransition($el2, 'opacity', onEndFn, options.time);
		} else {
			onEndFn();
		}

	} else {
		$el1.stop();
		$el2.stop();

		if (_$el2) {
			$el1.fadeTo(0, 0);
		}

		$el1.fadeTo(options.time, 1, onEndFn);
		crossfadeFLAG && $el2.fadeTo(options.time, 0);

		if (!_$el1 && !_$el2) onEndFn();
	}
}