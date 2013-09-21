/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 *
 * Requires: 1.2.2+
 */
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(i){var g=i||window.event,f=[].slice.call(arguments,1),j=0,h=true,e=0,d=0;i=c.event.fix(g);i.type="mousewheel";if(i.wheelDelta){j=i.wheelDelta/120}if(i.detail){j=-i.detail/3}d=j;if(g.axis!==undefined&&g.axis===g.HORIZONTAL_AXIS){d=0;e=-1*j}if(g.wheelDeltaY!==undefined){d=g.wheelDeltaY/120}if(g.wheelDeltaX!==undefined){e=-1*g.wheelDeltaX/120}f.unshift(i,j,e,d);return c.event.handle.apply(this,f)}})(jQuery);


/* stickyeah 0.1, v001
 * © Artem Polikarpov | artpolikarpov.ru | artpolikarpov@gmail.com
 * Licensed under the MIT License */

(function($){
	/*if (typeof(console) == 'undefined') {
		console = {log: $.noop};
	}*/

	var touchFLAG = false;//('ontouchstart' in document);
	var ieFLAG = false;//$.browser.msie;
	var ie6FLAG = false;//$.browser.version == '6.0' && ieFLAG;
	var quirksFLAG = false;//document.compatMode != 'CSS1Compat' && ieFLAG;
	var stopFLAG = touchFLAG || ie6FLAG || quirksFLAG;

  var $document = $(document);
  var $window = $(window);
	var sticky = $();
	var pushers = {};
	var groups = {};

	var stickyeah = function($sticky, i, o) {
		var $stickyClone = $sticky.clone().addClass('stickyeah_clone').data({initialized: true}).removeAttr('id').insertAfter($sticky).css({visibility: 'hidden'}).hide();
		$sticky.data({clone: $stickyClone});
		var originalStickyPosition = $sticky.css('position');

		var stickyTop, stickyHeight, scrollTop, scrollLeft, windowHeight, stickyTopNew, heightDiff;
		var cloneActivatedFLAG = false;
		var mousewheelActivatedFLAG = false;
		var mousewheeledFLAG = false;
		var setMousewheeledFLAG;

		var $stickyPusher, pusherTop;
		if ($sticky.data('stickyeah-push')) {
			$stickyPusher = pushers[$sticky.data('stickyeah-push')].slice(pushers[$sticky.data('stickyeah-push')].index($sticky)+1);
			////console.log($stickyPusher, i);
		}
    //console.log($stickyPusher);
    if (!$stickyPusher || !$stickyPusher.length) {
      $stickyPusher = $('<div></div>').css({height: 0, fontSize: 0, margin: 0, clear: 'both', float: 'none'}).appendTo('body');
/*
			console.log('$stickyPusher', $stickyPusher);*/
    }

		var $stickyStopper, stopperHeight;
		if ($sticky.data('stickyeah-group')) {
			var thisIndex = groups[$sticky.data('stickyeah-group')].index($sticky);
			if (thisIndex != 0) {
				$stickyStopper = groups[$sticky.data('stickyeah-group')].slice(0,thisIndex);
			}
			////console.log($stickyStopper, i);
		}

		var getPusherTop = function() {
			//console.log('getPusherTop', i);
			pusherTop = 0;
			if ($stickyPusher && $stickyPusher.length) {
				pusherTop = $stickyPusher.not('.stickyeah_disabled').eq(0).offset().top
			}
		}

		var getStopperHeight = function() {
			//console.log('getStopperHeight', i);
			stopperHeight = 0;
			if ($stickyStopper && $stickyStopper.length) {
				$stickyStopper.not('.stickyeah_disabled').each(function(){
					var $this = $(this);
					stopperHeight += $this.data('stickyeah-offset') + ($this.data('clone').height() || 0);
					////console.log($this.data('stickyeah-offset'), $this.next().height());
				});
			}
		}

		var stickyTopNewLast, stickyLeftLast, stickyWidthLast;

		var stick = function() {
			////console.log('stick', i);
			var stickyLeft = $stickyClone.offset().left - scrollLeft;
			stickyTopNew = $sticky.data('stickyeah-offset');
			var stickyWidth = $stickyClone.width();

			if ($stickyPusher && $stickyPusher.length) {
				getPusherTop();
				var stickyHeight = $stickyClone.height() + stickyTopNew*2;
				var pushindDiff = scrollTop - (pusherTop - stickyHeight /*- Number($stickyPusher.attr('data-stickyeah-offset') || 0)*/);
				pushindDiff = Math.max(pushindDiff, $sticky.data('stickyeah-offset'));
				stickyTopNew = stickyTopNew*2 - pushindDiff;
        /*if ($stickyPusher.data('stickyeah-on') && stickyTopNew > 0) {
          stickyTopNew = - stickyHeight;
        }*/
			}

			//if ($stickyStopper && $stickyStopper.length) {
				//var stopperHeight = getStopperHeight();
				stickyTopNew = stickyTopNew + stopperHeight;
			//}
			//////console.log(top, -stickyHeight, i);

			var time = 0;

			$sticky.stop();

			if (mousewheeledFLAG) {
				var distance = Math.abs(parseInt($sticky.css('top')) - stickyTopNew);
				if (distance > 10) time = distance / 2;
				clearTimeout(setMousewheeledFLAG);
				setMousewheeledFLAG = setTimeout(function(){
					mousewheeledFLAG = false;
				}, 100);
			}

			if (stickyTopNewLast !== stickyTopNew || stickyLeftLast != stickyLeft || stickyWidthLast != stickyWidth || mousewheeledFLAG) {
				//console.log('stick css redraw', i);
				var overflow = $sticky.css('overflow');
				$sticky.animate({
					top: stickyTopNew,
					left: stickyLeft,
					width: stickyWidth,
					marginTop: 0,
					marginLeft: 0
				}, time, 'linear', function(){
					$sticky.css({overflow: overflow});
				});
				stickyTopNewLast = stickyTopNew;
				stickyLeftLast = stickyLeft;
				stickyWidthLast = stickyWidth;
			}
		}

		var activateClone = function(FLAG) {
			if (FLAG != cloneActivatedFLAG) {
				$sticky.stop().css({position: FLAG ? 'fixed' : originalStickyPosition, top: '', left: '', marginTop: '', marginLeft: '', width: ''})[FLAG ? 'addClass' : 'removeClass']($sticky.data('stickyeah-class')).data({'stickyeah-on': FLAG});
				stickyTopNewLast = '';
				$stickyClone[FLAG ? 'show' : 'hide']();
				cloneActivatedFLAG = FLAG;
				listenHeight();
				//console.log('activateClone: ' + FLAG, i);
			}
			if (cloneActivatedFLAG) {
				stick();
			}
		}

		var onMousewheel = function(event, delta, deltaX, deltaY) {
			event.preventDefault();
			stickyTopNew = stickyTopNew + Math.round(deltaY*25);
			var topLimit = stickyHeight - windowHeight - $sticky.data('stickyeah-offset');
			var bottomLimit = $sticky.data('stickyeah-offset')*2 - $sticky.data('stickyeah-offset');
			if (stickyTopNew < -topLimit) {
				stickyTopNew = -topLimit;
			} else if (stickyTopNew > bottomLimit) {
				stickyTopNew = bottomLimit;
			}
			$sticky.stop().css({
				top: stickyTopNew
			});
			mousewheeledFLAG = true;
		}

		var activateMousewheel = function(FLAG) {
			////console.log('activateMousewheel', FLAG);
			if (o.scroll && FLAG != mousewheelActivatedFLAG) {
				$sticky[FLAG ? 'bind' : 'unbind']('mousewheel', onMousewheel);
				//console.log('mousewheelActivatedFLAG: ' + FLAG);
				mousewheelActivatedFLAG = FLAG;
			}
		}

		var listenTop = function() {
			if (!$sticky.data('disabled')) {
				//console.log('listenTop');
				stickyTop = (cloneActivatedFLAG ? $stickyClone : $sticky).offset().top;
				//scrollTop = $window.scrollTop();
        scrollTop = Math.max(Math.min($window.scrollTop(), $document.height() - $window.height()), 0);
				scrollLeft = Math.max(Math.min($window.scrollLeft(), $document.width() - $window.width()), 0);
				//////console.log('stickyTop: '+stickyTop,'scrollTop: '+scrollTop);
				activateClone(stickyTop - $sticky.data('stickyeah-offset') - stopperHeight <= scrollTop);
			}
		}

		var listenHeight = function() {
			////console.log('listenHeight', cloneActivatedFLAG);
			if (!$sticky.data('disabled')) {
				//console.log('listenHeight');
				stickyHeight = $stickyClone.height() + $sticky.data('stickyeah-offset') * 2;
				windowHeight = $window.height();
				heightDiff = stickyHeight - windowHeight;
				if (cloneActivatedFLAG) {
					activateMousewheel(heightDiff >= 0);
				} else {
					activateMousewheel(false);
				}
			}
		}

		$sticky
				.bind('stickyeah:disable', function(){
					$sticky.data({'disabled': true}).addClass('stickyeah_disabled');
					////console.log('inside', $sticky.data('disabled'));
					activateClone(false);
					activateMousewheel(false);
					sticky.trigger('stickyeah:reflow');
				})
				.bind('stickyeah:enable', function(){
					$sticky.data({'disabled': false}).removeClass('stickyeah_disabled');
					////console.log('inside', $sticky.data('disabled'));
					sticky.trigger('stickyeah:reflow');
				})
				.bind('stickyeah:reflow', function(e, originalEvent){
					if (!originalEvent) {
						getStopperHeight();
					}
					listenTop();
					if (!originalEvent || originalEvent.type == 'resize') {
						listenHeight();
					}
					////console.log(originalEvent);
				});



	}

	$.stickyeah = function(o) {
		o = $.extend({
			scroll: true
		}, o);

		if (!stopFLAG) {
			sticky = $('.stickyeah');

      sticky
					.filter(function() {
						return !$(this).data('initialized');
					})
					.data({initialized: true})
					.each(function(i){
						var $this = $(this);
						var push = $this.attr('data-stickyeah-push');
						////console.log(push);
						if (push) {
							if (!pushers[push]) {
								pushers[push] = $();
							}
							pushers[push].push(this);
							$this.data({'stickyeah-push': push});
						}
						var group = $this.attr('data-stickyeah-group');
						if (group) {
							if (!groups[group]) {
								groups[group] = $();
							}
							groups[group].push(this);
							$this.data({'stickyeah-group': group});
						}
						$this.data({
							'stickyeah-offset': Number($this.attr('data-stickyeah-offset') || 0),
							'stickyeah-class': $this.attr('data-stickyeah-class') || ''
						});
						////console.log(i, $this.data('stickyeah-offset'));
					})
					.each(function(i) {
						stickyeah($(this), i, o);
					});

      sticky.trigger('stickyeah:reflow');
		}
	}

	$(function(){
		$.stickyeah();
	});


	$window.bind('resize scroll', function(e){
		console.log('resize or scroll');
    sticky.trigger('stickyeah:reflow', e);
	});
})(jQuery);
