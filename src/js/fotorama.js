jQuery.Fotorama = function ($fotorama, opts) {
  $HTML = $('html');
  $BODY = $('body');

  var that = this,
      stamp = $.now(),
      stampClass = _fotoramaClass + stamp,
      fotorama = $fotorama[0],
      data,
      dataFrameCount = 1,
      fotoramaData = $fotorama.data(),
      size,

      $style = $('<style></style>'),

      $anchor = $(div(hiddenClass)),
      $wrap = $(div(wrapClass)),
      $stage = $(div(stageClass)).appendTo($wrap),
      stage = $stage[0],

      $stageShaft = $(div(stageShaftClass)).appendTo($stage),
      $stageFrame = $(),
      $arrPrev = $(div(arrClass + ' ' + arrPrevClass + buttonAttributes)),
      $arrNext = $(div(arrClass + ' ' + arrNextClass + buttonAttributes)),
      $arrs = $arrPrev.add($arrNext).appendTo($stage),
      $navWrap = $(div(navWrapClass)),
      $nav = $(div(navClass)).appendTo($navWrap),
      $navShaft = $(div(navShaftClass)).appendTo($nav),
      $navFrame,
      $navDotFrame = $(),
      $navThumbFrame = $(),

      stageShaftData = $stageShaft.data(),
      navShaftData = $navShaft.data(),

      $thumbBorder = $(div(thumbBorderClass)).appendTo($navShaft),

      $fullscreenIcon = $(div(fullscreenIconClass + buttonAttributes)),
      fullscreenIcon = $fullscreenIcon[0],
      $videoPlay = $(div(videoPlayClass)),
      $videoClose = $(div(videoCloseClass)).appendTo($stage),
      videoClose = $videoClose[0],

      spinner,
      $spinner = $(div(spinnerClass)),

      $videoPlaying,

      activeIndex = false,
      activeFrame,
      activeIndexes,
      repositionIndex,
      dirtyIndex,
      lastActiveIndex,
      prevIndex,
      nextIndex,
      nextAutoplayIndex,
      startIndex,

      o_loop,
      o_nav,
      o_navThumbs,
      o_navTop,
      o_allowFullScreen,
      o_nativeFullScreen,
      o_fade,
      o_thumbSide,
      o_thumbSide2,
      o_transitionDuration,
      o_transition,
      o_shadows,
      o_rtl,
      o_keyboard,
      lastOptions = {},

      measures = {},
      measuresSetFLAG,

      stageShaftTouchTail = {},
      stageWheelTail = {},
      navShaftTouchTail = {},
      navWheelTail = {},

      scrollTop,
      scrollLeft,

      showedFLAG,
      pausedAutoplayFLAG,
      stoppedAutoplayFLAG,

      toDeactivate = {},
      toDetach = {},

      measuresStash,

      touchedFLAG,

      hoverFLAG,

      navFrameKey,
      stageLeft = 0,

      fadeStack = [];

  $wrap[STAGE_FRAME_KEY] = $(div(stageFrameClass));
  $wrap[NAV_THUMB_FRAME_KEY] = $(div(navFrameClass + ' ' + navFrameThumbClass + buttonAttributes, div(thumbClass)));
  $wrap[NAV_DOT_FRAME_KEY] = $(div(navFrameClass + ' ' + navFrameDotClass + buttonAttributes, div(dotClass)));

  toDeactivate[STAGE_FRAME_KEY] = [];
  toDeactivate[NAV_THUMB_FRAME_KEY] = [];
  toDeactivate[NAV_DOT_FRAME_KEY] = [];
  toDetach[STAGE_FRAME_KEY] = {};

  $wrap
      .addClass(CSS3 ? wrapCss3Class : wrapCss2Class)
      .toggleClass(wrapNoControlsClass, !opts.controlsonstart);

  fotoramaData.fotorama = this;

  function checkForVideo () {
    $.each(data, function (i, dataFrame) {
      if (!dataFrame.i) {
        dataFrame.i = dataFrameCount++;
        var video = findVideoId(dataFrame.video, true);
        if (video) {
          var thumbs = {};
          dataFrame.video = video;
          if (!dataFrame.img && !dataFrame.thumb) {
            thumbs = getVideoThumbs(dataFrame, data, that);
          } else {
            dataFrame.thumbsReady = true;
          }
          updateData(data, {img: thumbs.img, thumb: thumbs.thumb}, dataFrame.i, that);
        }
      }
    });
  }

  function allowKey (key) {
    return o_keyboard[key] || that.fullScreen;
  }

  function bindGlobalEvents (FLAG) {
    var keydownCommon = 'keydown.' + _fotoramaClass,
        localStamp = _fotoramaClass + stamp,
        keydownLocal = 'keydown.' + localStamp,
        resizeLocal = 'resize.' + localStamp + ' ' + 'orientationchange.' + localStamp;

    if (FLAG) {
      $DOCUMENT
          .on(keydownLocal, function (e) {
            var catched,
                index;

            if ($videoPlaying && e.keyCode === 27) {
              catched = true;
              unloadVideo($videoPlaying, true, true);
            } else if (that.fullScreen || (opts.keyboard && !that.index)) {
              if (e.keyCode === 27) {
                catched = true;
                that.cancelFullScreen();
              } else if ((e.shiftKey && e.keyCode === 32 && allowKey('space')) || (e.keyCode === 37 && allowKey('left')) || (e.keyCode === 38 && allowKey('up'))) {
                index = '<';
              } else if ((e.keyCode === 32 && allowKey('space')) || (e.keyCode === 39 && allowKey('right')) || (e.keyCode === 40 && allowKey('down'))) {
                index = '>';
              } else if (e.keyCode === 36 && allowKey('home')) {
                index = '<<';
              } else if (e.keyCode === 35 && allowKey('end')) {
                index = '>>';
              }
            }

            (catched || index) && stopEvent(e);
            index && that.show({index: index, slow: e.altKey, user: true});
          });

      if (!that.index) {
        $DOCUMENT
            .off(keydownCommon)
            .on(keydownCommon, 'textarea, input, select', function (e) {
              !$BODY.hasClass(_fullscreenClass) && e.stopPropagation();
            });
      }

      $WINDOW.on(resizeLocal, that.resize);
    } else {
      $DOCUMENT.off(keydownLocal);
      $WINDOW.off(resizeLocal);
    }
  }

  function appendElements (FLAG) {
    if (FLAG === appendElements.f) return;

    if (FLAG) {
      $fotorama
          .html('')
          .addClass(_fotoramaClass + ' ' + stampClass)
          .append($wrap)
          .before($style)
          .before($anchor);

      addInstance(that);
    } else {
      $wrap.detach();
      $style.detach();
      $anchor.detach();
      $fotorama
          .html(fotoramaData.urtext)
          .removeClass(stampClass);

      hideInstance(that);
    }

    bindGlobalEvents(FLAG);
    appendElements.f = FLAG;
  }

  function setData () {
    data = that.data = data || clone(opts.data) || getDataFromHtml($fotorama);
    size = that.size = data.length;

    !ready.ok && opts.shuffle && shuffle(data);

    checkForVideo();

    activeIndex = limitIndex(activeIndex);

    size && appendElements(true);
  }

  function stageNoMove () {
    var _noMove = (size < 2 && !opts.enableifsingleframe) || $videoPlaying;
    stageShaftTouchTail.noMove = _noMove || o_fade;
    stageShaftTouchTail.noSwipe = _noMove || !opts.swipe;

    !o_transition && $stageShaft.toggleClass(grabClass, !opts.click && !stageShaftTouchTail.noMove && !stageShaftTouchTail.noSwipe);
    MS_POINTER && $wrap.toggleClass(wrapPanYClass, !stageShaftTouchTail.noSwipe);
  }

  function setAutoplayInterval (interval) {
    if (interval === true) interval = '';
    opts.autoplay = Math.max(+interval || AUTOPLAY_INTERVAL, o_transitionDuration * 1.5);
  }

  /**
   * Options on the fly
   * */
  function setOptions () {
    that.options = opts = optionsToLowerCase(opts);

    o_fade = (opts.transition === 'crossfade' || opts.transition === 'dissolve');

    o_loop = opts.loop && (size > 2 || (o_fade && (!o_transition || o_transition !== 'slide')));

    o_transitionDuration = +opts.transitionduration || TRANSITION_DURATION;

    o_rtl = opts.direction === 'rtl';

    o_keyboard = $.extend({}, opts.keyboard && KEYBOARD_OPTIONS, opts.keyboard);

    var classes = {add: [], remove: []};

    function addOrRemoveClass (FLAG, value) {
      classes[FLAG ? 'add' : 'remove'].push(value);
    }

    if (size > 1 || opts.enableifsingleframe) {
      o_nav = opts.nav;
      o_navTop = opts.navposition === 'top';
      classes.remove.push(selectClass);

      $arrs.toggle(!!opts.arrows);
    } else {
      o_nav = false;
      $arrs.hide();
    }

    spinnerStop();
    spinner = new Spinner($.extend(spinnerDefaults, opts.spinner, spinnerOverride, {direction: o_rtl ? -1 : 1}));

    arrsUpdate();
    stageWheelUpdate();

    if (opts.autoplay) setAutoplayInterval(opts.autoplay);

    o_thumbSide = numberFromMeasure(opts.thumbwidth) || THUMB_SIZE;
    o_thumbSide2 = numberFromMeasure(opts.thumbheight) || THUMB_SIZE;

    stageWheelTail.ok = navWheelTail.ok = opts.trackpad && !SLOW;

    stageNoMove();

    extendMeasures(opts, [measures]);

    o_navThumbs = o_nav === 'thumbs';

    if (o_navThumbs) {
      frameDraw(size, 'navThumb');

      $navFrame = $navThumbFrame;
      navFrameKey = NAV_THUMB_FRAME_KEY;

      setStyle($style, $.Fotorama.jst.style({w: o_thumbSide, h: o_thumbSide2, b: opts.thumbborderwidth, m: opts.thumbmargin, s: stamp, q: !COMPAT}));

      $nav
          .addClass(navThumbsClass)
          .removeClass(navDotsClass);
    } else if (o_nav === 'dots') {
      frameDraw(size, 'navDot');

      $navFrame = $navDotFrame;
      navFrameKey = NAV_DOT_FRAME_KEY;

      $nav
          .addClass(navDotsClass)
          .removeClass(navThumbsClass);
    } else {
      o_nav = false;
      $nav.removeClass(navThumbsClass + ' ' + navDotsClass);
    }

    if (o_nav) {
      if (o_navTop) {
        $navWrap.insertBefore($stage);
      } else {
        $navWrap.insertAfter($stage);
      }
      frameAppend.nav = false;
      frameAppend($navFrame, $navShaft, 'nav');
    }

    o_allowFullScreen = opts.allowfullscreen;

    if (o_allowFullScreen) {
      $fullscreenIcon.prependTo($stage);
      o_nativeFullScreen = FULLSCREEN && o_allowFullScreen === 'native';
    } else {
      $fullscreenIcon.detach();
      o_nativeFullScreen = false;
    }

    addOrRemoveClass(o_fade, wrapFadeClass);
    addOrRemoveClass(!o_fade, wrapSlideClass);
    addOrRemoveClass(!opts.captions, wrapNoCaptionsClass);
    addOrRemoveClass(o_rtl, wrapRtlClass);
    addOrRemoveClass(opts.arrows !== 'always', wrapToggleArrowsClass);

    o_shadows = opts.shadows && !SLOW;
    addOrRemoveClass(!o_shadows, wrapNoShadowsClass);

    $wrap
        .addClass(classes.add.join(' '))
        .removeClass(classes.remove.join(' '));

    lastOptions = $.extend({}, opts);
  }

  function normalizeIndex (index) {
    return index < 0 ? (size + (index % size)) % size : index >= size ? index % size : index;
  }

  function limitIndex (index) {
    return minMaxLimit(index, 0, size - 1);
  }

  function edgeIndex (index) {
    return o_loop ? normalizeIndex(index) : limitIndex(index);
  }

  function getPrevIndex (index) {
    return index > 0 || o_loop ? index - 1 : false;
  }

  function getNextIndex (index) {
    return index < size - 1 || o_loop ? index + 1 : false;
  }

  function setStageShaftMinmaxAndSnap () {
    stageShaftTouchTail.min = o_loop ? -Infinity : -getPosByIndex(size - 1, measures.w, opts.margin, repositionIndex);
    stageShaftTouchTail.max = o_loop ? Infinity : -getPosByIndex(0, measures.w, opts.margin, repositionIndex);
    stageShaftTouchTail.snap = measures.w + opts.margin;
  }

  function setNavShaftMinMax () {
    //////console.log('setNavShaftMinMax', measures.nw);
    navShaftTouchTail.min = Math.min(0, measures.nw - $navShaft.width());
    navShaftTouchTail.max = 0;
    $navShaft.toggleClass(grabClass, !(navShaftTouchTail.noMove = navShaftTouchTail.min === navShaftTouchTail.max));
  }

  function eachIndex (indexes, type, fn) {
    if (typeof indexes === 'number') {
      indexes = new Array(indexes);
      var rangeFLAG = true;
    }
    return $.each(indexes, function (i, index) {
      if (rangeFLAG) index = i;
      if (typeof index === 'number') {
        var dataFrame = data[normalizeIndex(index)];

        if (dataFrame) {
          var key = '$' + type + 'Frame',
              $frame = dataFrame[key];

          fn.call(this, i, index, dataFrame, $frame, key, $frame && $frame.data());
        }
      }
    });
  }

  function setMeasures (width, height, ratio, index) {
    if (!measuresSetFLAG || (measuresSetFLAG === '*' && index === startIndex)) {

      ////console.log('setMeasures', index, opts.width, opts.height);

      width = measureIsValid(opts.width) || measureIsValid(width) || WIDTH;
      height = measureIsValid(opts.height) || measureIsValid(height) || HEIGHT;
      that.resize({
        width: width,
        ratio: opts.ratio || ratio || width / height
      }, 0, index !== startIndex && '*');
    }
  }

  function loadImg (indexes, type, specialMeasures, method, position, again) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {

      if (!$frame) return;

      var fullFLAG = that.fullScreen && dataFrame.full && dataFrame.full !== dataFrame.img && !frameData.$full && type === 'stage';

      if (frameData.$img && !again && !fullFLAG) return;

      var img = new Image(),
          $img = $(img),
          imgData = $img.data();

      frameData[fullFLAG ? '$full' : '$img'] = $img;

      var srcKey = type === 'stage' ? (fullFLAG ? 'full' : 'img') : 'thumb',
          src = dataFrame[srcKey],
          dummy = fullFLAG ? null : dataFrame[type === 'stage' ? 'thumb' : 'img'];

      if (type === 'navThumb') $frame = frameData.$wrap;

      function triggerTriggerEvent (event) {
        var _index = normalizeIndex(index);
        triggerEvent(event, {
          index: _index,
          src: src,
          frame: data[_index]
        });
      }

      function error () {
        $img.remove();

        $.Fotorama.cache[src] = 'error';

        if ((!dataFrame.html || type !== 'stage') && dummy && dummy !== src) {
          dataFrame[srcKey] = src = dummy;
          loadImg([index], type, specialMeasures, method, position, true);
        } else {
          if (src && !dataFrame.html && !fullFLAG) {
            $frame
                .trigger('f:error')
                .removeClass(loadingClass)
                .addClass(errorClass);

            triggerTriggerEvent('error');
          } else if (type === 'stage') {
            $frame
                .trigger('f:load')
                .removeClass(loadingClass + ' ' + errorClass)
                .addClass(loadedClass);

            triggerTriggerEvent('load');
            setMeasures();
          }

          frameData.state = 'error';

          if (size > 1 && data[index] === dataFrame && !dataFrame.html && !dataFrame.deleted && !dataFrame.video && !fullFLAG) {
            dataFrame.deleted = true;
            that.splice(index, 1);
          }
        }
      }

      function loaded () {
        ////console.log('loaded: ' + src);

        //console.log('$.Fotorama.measures[src]', $.Fotorama.measures[src]);

        $.Fotorama.measures[src] = imgData.measures = $.Fotorama.measures[src] || {
          width: img.width,
          height: img.height,
          ratio: img.width / img.height
        };

        setMeasures(imgData.measures.width, imgData.measures.height, imgData.measures.ratio, index);

        $img
            .off('load error')
            .addClass(imgClass + (fullFLAG ? ' ' + imgFullClass : ''))
            .prependTo($frame);

        fit($img, ($.isFunction(specialMeasures) ? specialMeasures() : specialMeasures) || measures, method || dataFrame.fit || opts.fit, position || dataFrame.position || opts.position);

        $.Fotorama.cache[src] = frameData.state = 'loaded';

        setTimeout(function () {
          $frame
              .trigger('f:load')
              .removeClass(loadingClass + ' ' + errorClass)
              .addClass(loadedClass + ' ' + (fullFLAG ? loadedFullClass : loadedImgClass));

          if (type === 'stage') {
            triggerTriggerEvent('load');
          } else if (dataFrame.thumbratio === AUTO || !dataFrame.thumbratio && opts.thumbratio === AUTO) {
            // danger! reflow for all thumbnails
            dataFrame.thumbratio = imgData.measures.ratio;
            reset();
          }
        }, 0);
      }

      if (!src) {
        error();
        return;
      }

      function waitAndLoad () {
        var _i = 10;
        waitFor(function () {
          return !touchedFLAG || !_i-- && !SLOW;
        }, function () {
          loaded();
        });
      }

      if (!$.Fotorama.cache[src]) {
        $.Fotorama.cache[src] = '*';

        $img
            .on('load', waitAndLoad)
            .on('error', error);
      } else {
        (function justWait () {
          if ($.Fotorama.cache[src] === 'error') {
            error();
          } else if ($.Fotorama.cache[src] === 'loaded') {
            //console.log('take from cache: ' + src);
            setTimeout(waitAndLoad, 0);
          } else {
            setTimeout(justWait, 100);
          }
        })();
      }

      frameData.state = '';
      img.src = src;
    });
  }

  function spinnerSpin ($el) {
    $spinner.append(spinner.spin().el).appendTo($el);
  }

  function spinnerStop () {
    $spinner.detach();
    spinner && spinner.stop();
  }

  function updateFotoramaState () {
    var $frame = activeFrame[STAGE_FRAME_KEY];

    if ($frame && !$frame.data().state) {
      spinnerSpin($frame);
      $frame.on('f:load f:error', function () {
        $frame.off('f:load f:error');
        spinnerStop();
      });
    }
  }

  function addNavFrameEvents (frame) {
    addEnterUp(frame, onNavFrameClick);
    addFocus(frame, function () {

      setTimeout(function () {
        lockScroll($nav);
      }, 0);
      slideNavShaft({time: o_transitionDuration, guessIndex: $(this).data().eq, minMax: navShaftTouchTail});
    });
  }

  function frameDraw (indexes, type) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {
      if ($frame) return;

      $frame = dataFrame[key] = $wrap[key].clone();
      frameData = $frame.data();
      frameData.data = dataFrame;
      var frame = $frame[0];

      if (type === 'stage') {

        if (dataFrame.html) {
          $('<div class="' + htmlClass + '"></div>')
              .append(
                  dataFrame._html ? $(dataFrame.html)
                      .removeAttr('id')
                      .html(dataFrame._html) // Because of IE
                  : dataFrame.html
              )
              .appendTo($frame);
        }

        dataFrame.caption && $(div(captionClass, div(captionWrapClass, dataFrame.caption))).appendTo($frame);

        dataFrame.video && $frame
          .addClass(stageFrameVideoClass)
          .append($videoPlay.clone());

        // This solves tabbing problems
        addFocus(frame, function () {
          setTimeout(function () {
            lockScroll($stage);
          }, 0);
          clickToShow({index: frameData.eq, user: true});
        });

        $stageFrame = $stageFrame.add($frame);
      } else if (type === 'navDot') {
        addNavFrameEvents(frame);
        $navDotFrame = $navDotFrame.add($frame);
      } else if (type === 'navThumb') {
        addNavFrameEvents(frame);
        frameData.$wrap = $frame.children(':first');
        $navThumbFrame = $navThumbFrame.add($frame);
        if (dataFrame.video) {
          frameData.$wrap.append($videoPlay.clone());
        }
      }
    });
  }

  function callFit ($img, measuresToFit, method, position) {
    return $img && $img.length && fit($img, measuresToFit, method, position);
  }

  function stageFramePosition (indexes) {
    eachIndex(indexes, 'stage', function (i, index, dataFrame, $frame, key, frameData) {
      if (!$frame) return;

      var normalizedIndex = normalizeIndex(index),
          method = dataFrame.fit || opts.fit,
          position = dataFrame.position || opts.position;
      frameData.eq = normalizedIndex;

      toDetach[STAGE_FRAME_KEY][normalizedIndex] = $frame.css($.extend({left: o_fade ? 0 : getPosByIndex(index, measures.w, opts.margin, repositionIndex)}, o_fade && getDuration(0)));

      if (isDetached($frame[0])) {
        $frame.appendTo($stageShaft);
        unloadVideo(dataFrame.$video);
      }

      callFit(frameData.$img, measures, method, position);
      callFit(frameData.$full, measures, method, position);
    });
  }

  function thumbsDraw (pos, loadFLAG) {
    if (o_nav !== 'thumbs' || isNaN(pos)) return;

    var leftLimit = -pos,
        rightLimit = -pos + measures.nw;

    $navThumbFrame.each(function () {
      var $this = $(this),
          thisData = $this.data(),
          eq = thisData.eq,
          getSpecialMeasures = function () {
            return {
              h: o_thumbSide2,
              w: thisData.w
            }
          },
          specialMeasures = getSpecialMeasures(),
          dataFrame = data[eq] || {},
          method = dataFrame.thumbfit || opts.thumbfit,
          position = dataFrame.thumbposition || opts.thumbposition;

      specialMeasures.w = thisData.w;

      if (thisData.l + thisData.w < leftLimit
          || thisData.l > rightLimit
          || callFit(thisData.$img, specialMeasures, method, position)) return;

      loadFLAG && loadImg([eq], 'navThumb', getSpecialMeasures, method, position);
    });
  }

  function frameAppend ($frames, $shaft, type) {
    if (!frameAppend[type]) {

      var thumbsFLAG = type === 'nav' && o_navThumbs,
          left = 0;

      $shaft.append(
        $frames
            .filter(function () {
              var actual,
                  $this = $(this),
                  frameData = $this.data();
              for (var _i = 0, _l = data.length; _i < _l; _i++) {
                if (frameData.data === data[_i]) {
                  actual = true;
                  frameData.eq = _i;
                  break;
                }
              }
              return actual || $this.remove() && false;
            })
            .sort(function (a, b) {
              return $(a).data().eq - $(b).data().eq;
            })
            .each(function () {

              if (!thumbsFLAG) return;

              var $this = $(this),
                  frameData = $this.data(),
                  thumbwidth = Math.round(o_thumbSide2 * frameData.data.thumbratio) || o_thumbSide;

              frameData.l = left;
              frameData.w = thumbwidth;

              $this.css({width: thumbwidth});

              left += thumbwidth + opts.thumbmargin;
            })
      );

      frameAppend[type] = true;
    }
  }

  function getDirection (x) {
    return x - stageLeft > measures.w / 3;
  }

  function disableDirrection (i) {
    return !o_loop && (!(activeIndex + i) || !(activeIndex - size + i)) && !$videoPlaying;
  }

  function arrsUpdate () {
    var disablePrev = disableDirrection(0),
        disableNext = disableDirrection(1);
    $arrPrev
        .toggleClass(arrDisabledClass, disablePrev)
        .attr(disableAttr(disablePrev));
    $arrNext
        .toggleClass(arrDisabledClass, disableNext)
        .attr(disableAttr(disableNext));
  }

  function stageWheelUpdate () {
    if (stageWheelTail.ok) {
      stageWheelTail.prevent = {'<': disableDirrection(0), '>': disableDirrection(1)};
    }
  }

  function getNavFrameBounds ($navFrame) {
    var navFrameData = $navFrame.data(),
        left,
        width;

    if (o_navThumbs) {
      left = navFrameData.l;
      width = navFrameData.w;
    } else {
      left = $navFrame.position().left;
      width = $navFrame.width();
    }

    return {
      c: left + width / 2,
      min: -left + opts.thumbmargin * 10,
      max: -left + measures.w - width - opts.thumbmargin * 10
    };
  }

  function slideThumbBorder (time) {
    var navFrameData = activeFrame[navFrameKey].data();
    slide($thumbBorder, {
      time: time * 1.2,
      pos: navFrameData.l,
      width: navFrameData.w - opts.thumbborderwidth * 2
    });
  }

  function slideNavShaft (options) {
    //console.log('slideNavShaft', options.guessIndex, options.keep, slideNavShaft.l);
    var $guessNavFrame = data[options.guessIndex][navFrameKey];
    if ($guessNavFrame) {
      var overflowFLAG = navShaftTouchTail.min !== navShaftTouchTail.max,
          minMax = options.minMax || overflowFLAG && getNavFrameBounds(activeFrame[navFrameKey]),
          l = overflowFLAG && (options.keep && slideNavShaft.l ? slideNavShaft.l : minMaxLimit((options.coo || measures.nw / 2) - getNavFrameBounds($guessNavFrame).c, minMax.min, minMax.max)),
          pos = overflowFLAG && minMaxLimit(l, navShaftTouchTail.min, navShaftTouchTail.max),
          time = options.time * 1.1;

      slide($navShaft, {
        time: time,
        pos: pos || 0,
        onEnd: function () {
          thumbsDraw(pos, true);
        }
      });

      //if (time) thumbsDraw(pos);

      setShadow($nav, findShadowEdge(pos, navShaftTouchTail.min, navShaftTouchTail.max));
      slideNavShaft.l = l;
    }
  }

  function navUpdate () {
    deactivateFrames(navFrameKey);
    toDeactivate[navFrameKey].push(activeFrame[navFrameKey].addClass(activeClass));
  }

  function deactivateFrames (key) {
    var _toDeactivate = toDeactivate[key];

    while (_toDeactivate.length) {
      _toDeactivate.shift().removeClass(activeClass);
    }
  }

  function detachFrames (key) {
    var _toDetach = toDetach[key];

    ////console.log('_toDetach', _toDetach);
    ////console.log('activeIndexes', activeIndexes);

    $.each(activeIndexes, function (i, index) {
      delete _toDetach[normalizeIndex(index)];
    });

    $.each(_toDetach, function (index, $frame) {
      delete _toDetach[index];
      ////console.log('Detach', index);
      $frame.detach();
    });
  }

  function stageShaftReposition (skipOnEnd) {

    repositionIndex = dirtyIndex = activeIndex;

    var $frame = activeFrame[STAGE_FRAME_KEY];

    if ($frame) {
      deactivateFrames(STAGE_FRAME_KEY);
      toDeactivate[STAGE_FRAME_KEY].push($frame.addClass(activeClass));

      skipOnEnd || that.show.onEnd(true);
      stop($stageShaft, 0, true);

      detachFrames(STAGE_FRAME_KEY);
      stageFramePosition(activeIndexes);
      setStageShaftMinmaxAndSnap();
      setNavShaftMinMax();
    }
  }

  function extendMeasures (options, measuresArray) {
    if (!options) return;

    $.each(measuresArray, function (i, measures) {
      if (!measures) return;

      $.extend(measures, {
        width: options.width || measures.width,
        height: options.height,
        minwidth: options.minwidth,
        maxwidth: options.maxwidth,
        minheight: options.minheight,
        maxheight: options.maxheight,
        ratio: getRatio(options.ratio)
      })
    });
  }

  function triggerEvent (event, extra) {
    $fotorama.trigger(_fotoramaClass + ':' + event, [that, extra]);
  }

  function onTouchStart () {
    clearTimeout(onTouchEnd.t);
    touchedFLAG = 1;

    if (opts.stopautoplayontouch) {
      that.stopAutoplay();
    } else {
      pausedAutoplayFLAG = true;
    }
  }

  function onTouchEnd () {
    if (!touchedFLAG) return;
    if (!opts.stopautoplayontouch) {
      releaseAutoplay();
      changeAutoplay();
    }

    onTouchEnd.t = setTimeout(function () {
      touchedFLAG = 0;
    }, TRANSITION_DURATION + TOUCH_TIMEOUT);
    ////console.timeEnd('onTouchEnd');
  }

  function releaseAutoplay () {
    //console.log('releaseAutoplay');
    pausedAutoplayFLAG = !!($videoPlaying || stoppedAutoplayFLAG);
  }

  function changeAutoplay () {
    //console.log('changeAutoplay');

    clearTimeout(changeAutoplay.t);
    waitFor.stop(changeAutoplay.w);

    if (!opts.autoplay || pausedAutoplayFLAG) {
      if (that.autoplay) {
        that.autoplay = false;
        triggerEvent('stopautoplay');
      }

      return;
    }

    //console.log('changeAutoplay continue');

    if (!that.autoplay) {
      that.autoplay = true;
      triggerEvent('startautoplay');
    }

    var _activeIndex = activeIndex;


    var frameData = activeFrame[STAGE_FRAME_KEY].data();
    changeAutoplay.w = waitFor(function () {
      //console.log('wait for the state of the current frame');
      return frameData.state || _activeIndex !== activeIndex;
    }, function () {
      //console.log('the current frame is ready');
      changeAutoplay.t = setTimeout(function () {
        //console.log('changeAutoplay.t setTimeout', pausedAutoplayFLAG, _activeIndex !== activeIndex);
        if (pausedAutoplayFLAG || _activeIndex !== activeIndex) return;

        var _nextAutoplayIndex = nextAutoplayIndex,
            nextFrameData = data[_nextAutoplayIndex][STAGE_FRAME_KEY].data();

        changeAutoplay.w = waitFor(function () {
          //console.log('wait for the state of the next frame');
          return nextFrameData.state || _nextAutoplayIndex !== nextAutoplayIndex;
        }, function () {
          if (pausedAutoplayFLAG || _nextAutoplayIndex !== nextAutoplayIndex) return;
          that.show(o_loop ? getDirectionSign(!o_rtl) : nextAutoplayIndex);
        });
      }, opts.autoplay);
    });

  }

  that.startAutoplay = function (interval) {
    if (that.autoplay) return this;
    pausedAutoplayFLAG = stoppedAutoplayFLAG = false;
    setAutoplayInterval(interval || opts.autoplay);
    changeAutoplay();

    return this;
  };

  that.stopAutoplay = function () {
    if (that.autoplay) {
      pausedAutoplayFLAG = stoppedAutoplayFLAG = true;
      changeAutoplay();
    }
    return this;
  };

  that.show = function (options) {
    //console.log('that.show');
    ////console.time('that.show prepare');
    var index;

    if (typeof options !== 'object') {
      index = options;
      options = {};
    } else {
      index = options.index;
    }

    index = index === '>' ? dirtyIndex + 1 : index === '<' ? dirtyIndex - 1 : index === '<<' ? 0 : index === '>>' ? size - 1 : index;
    index = isNaN(index) ? getIndexFromHash(index, data, true) : index;
    index = typeof index === 'undefined' ? activeIndex || 0 : index;

    that.activeIndex = activeIndex = edgeIndex(index);
    prevIndex = getPrevIndex(activeIndex);
    nextIndex = getNextIndex(activeIndex);
    nextAutoplayIndex = normalizeIndex(activeIndex + (o_rtl ? -1 : 1));
    activeIndexes = [activeIndex, prevIndex, nextIndex];

    dirtyIndex = o_loop ? index : activeIndex;

    var diffIndex = Math.abs(lastActiveIndex - dirtyIndex),
        time = getNumber(options.time, function () {
          return Math.min(o_transitionDuration * (1 + (diffIndex - 1) / 12), o_transitionDuration * 2);
        }),
        overPos = options.overPos;

    if (options.slow) time *= 10;

    var _activeFrame = activeFrame;
    that.activeFrame = activeFrame = data[activeIndex];
    ////console.timeEnd('that.show prepare');

    var silent = _activeFrame === activeFrame && !options.user;

    //setTimeout(function () {
    ////console.time('unloadVideo');
    unloadVideo($videoPlaying, activeFrame.i !== data[normalizeIndex(repositionIndex)].i);
    ////console.timeEnd('unloadVideo');
    ////console.time('frameDraw');
    frameDraw(activeIndexes, 'stage');
    ////console.timeEnd('frameDraw');
    ////console.time('stageFramePosition');
    stageFramePosition(SLOW ? [dirtyIndex] : [dirtyIndex, getPrevIndex(dirtyIndex), getNextIndex(dirtyIndex)]);
    ////console.timeEnd('stageFramePosition');
    ////console.time('updateTouchTails');
    updateTouchTails('go', true);
    ////console.timeEnd('updateTouchTails');
    ////console.time('triggerEvent');

    silent || triggerEvent('show', {
      user: options.user,
      time: time
    });
    ////console.timeEnd('triggerEvent');
    //}, 0);

    ////console.time('bind onEnd');

    pausedAutoplayFLAG = true;

    var onEnd = that.show.onEnd = function (skipReposition) {
      if (onEnd.ok) return;
      onEnd.ok = true;

      skipReposition || stageShaftReposition(true);

      if (!silent) {
        triggerEvent('showend', {
          user: options.user
        });
      }

      //console.log('o_transition', o_transition);

      if (!skipReposition && o_transition && o_transition !== opts.transition) {
        //console.log('set transition back to: ' + o_transition);
        that.setOptions({transition: o_transition});
        o_transition = false;
        return;
      }

      updateFotoramaState();
      loadImg(activeIndexes, 'stage');

      updateTouchTails('go', false);
      stageWheelUpdate();

      stageCursor();
      releaseAutoplay();
      changeAutoplay();
    };
    ////console.timeEnd('bind onEnd');

    if (!o_fade) {
      ////console.time('slide');
      slide($stageShaft, {
        pos: -getPosByIndex(dirtyIndex, measures.w, opts.margin, repositionIndex),
        overPos: overPos,
        time: time,
        onEnd: onEnd/*,
        _001: true*/
      });
      ////console.timeEnd('slide');
    } else {
      var $activeFrame = activeFrame[STAGE_FRAME_KEY],
          $prevActiveFrame = activeIndex !== lastActiveIndex ? data[lastActiveIndex][STAGE_FRAME_KEY] : null;

      fade($activeFrame, $prevActiveFrame, $stageFrame, {
        time: time,
        method: opts.transition,
        onEnd: onEnd
      }, fadeStack);
    }

    ////console.time('arrsUpdate');
    arrsUpdate();
    ////console.timeEnd('arrsUpdate');

    if (o_nav) {
      ////console.time('navUpdate');
      navUpdate();
      ////console.timeEnd('navUpdate');

      ////console.time('slideNavShaft');
      var guessIndex = limitIndex(activeIndex + minMaxLimit(dirtyIndex - lastActiveIndex, -1, 1));
      slideNavShaft({time: time, coo: guessIndex !== activeIndex && options.coo, guessIndex: typeof options.coo !== 'undefined' ? guessIndex : activeIndex, keep: silent});
      ////console.timeEnd('slideNavShaft');

      ////console.time('slideThumbBorder');
      if (o_navThumbs) slideThumbBorder(time);
      ////console.timeEnd('slideThumbBorder');
    }

    ////console.time('that.show end');
    showedFLAG = typeof lastActiveIndex !== 'undefined' && lastActiveIndex !== activeIndex;
    lastActiveIndex = activeIndex;
    opts.hash && showedFLAG && !that.eq && setHash(activeFrame.id || activeIndex + 1);
    ////console.timeEnd('that.show end');

    ////console.timeEnd('that.show');

    return this;
  };

  that.requestFullScreen = function () {
    if (o_allowFullScreen && !that.fullScreen) {
      scrollTop = $WINDOW.scrollTop();
      scrollLeft = $WINDOW.scrollLeft();

      lockScroll($WINDOW);

      updateTouchTails('x', true);

      measuresStash = $.extend({}, measures);

      $fotorama
          .addClass(fullscreenClass)
          .appendTo($BODY.addClass(_fullscreenClass));

      $HTML.addClass(_fullscreenClass);

      unloadVideo($videoPlaying, true, true);

      that.fullScreen = true;

      if (o_nativeFullScreen) {
        fullScreenApi.request(fotorama);
      }

      that.resize();
      loadImg(activeIndexes, 'stage');
      updateFotoramaState();

      triggerEvent('fullscreenenter');
    }

    return this;
  };

  function cancelFullScreen () {
    if (that.fullScreen) {
      that.fullScreen = false;

      if (FULLSCREEN) {
        fullScreenApi.cancel(fotorama);
      }

      $BODY.removeClass(_fullscreenClass);
      $HTML.removeClass(_fullscreenClass);

      $fotorama
          .removeClass(fullscreenClass)
          .insertAfter($anchor);

      measures = $.extend({}, measuresStash);

      unloadVideo($videoPlaying, true, true);

      updateTouchTails('x', false);

      that.resize();
      loadImg(activeIndexes, 'stage');

      lockScroll($WINDOW, scrollLeft, scrollTop);

      triggerEvent('fullscreenexit');
    }
  }

  that.cancelFullScreen = function () {
    if (o_nativeFullScreen && fullScreenApi.is()) {
      fullScreenApi.cancel(document);
    } else {
      cancelFullScreen();
    }

    return this;
  };

  that.toggleFullScreen = function () {
    return that[(that.fullScreen ? 'cancel' : 'request') + 'FullScreen']();
  };

  addEvent(document, fullScreenApi.event, function () {
    if (data && !fullScreenApi.is() && !$videoPlaying) {
      cancelFullScreen();
    }
  });

  that.resize = function (options) {
    if (!data) return this;

    var time = arguments[1] || 0,
        setFLAG = arguments[2];

    extendMeasures(!that.fullScreen ? optionsToLowerCase(options) : {width: '100%', maxwidth: null, minwidth: null, height: '100%', maxheight: null, minheight: null}, [measures, setFLAG || that.fullScreen || opts]);

    var width = measures.width,
        height = measures.height,
        ratio = measures.ratio,
        windowHeight = $WINDOW.height() - (o_nav ? $nav.height() : 0);

    if (measureIsValid(width)) {
      $wrap
          .addClass(wrapOnlyActiveClass)
          .css({width: width, minWidth: measures.minwidth || 0, maxWidth: measures.maxwidth || MAX_WIDTH});

      width = measures.W = measures.w = $wrap.width();
      measures.nw = o_nav && numberFromWhatever(opts.navwidth, width) || width;

      if (opts.glimpse) {
        // Glimpse
        measures.w -= Math.round((numberFromWhatever(opts.glimpse, width) || 0) * 2);
      }

      $stageShaft.css({width: measures.w, marginLeft: (measures.W - measures.w) / 2});

      ////console.log('measures.W', measures.W);
      ////console.log('measures.w', measures.w);

      height = numberFromWhatever(height, windowHeight);

      height = height || (ratio && width / ratio);

      if (height) {
        width = Math.round(width);
        height = measures.h = Math.round(minMaxLimit(height, numberFromWhatever(measures.minheight, windowHeight), numberFromWhatever(measures.maxheight, windowHeight)));

        $stage
            .stop()
            .animate({width: width, height: height}, time, function () {
              $wrap.removeClass(wrapOnlyActiveClass);
            });

        stageShaftReposition();

        if (o_nav) {
          $nav
              .stop()
              .animate({width: measures.nw}, time);

          slideNavShaft({guessIndex: activeIndex, time: time, keep: true});
          if (o_navThumbs && frameAppend.nav) slideThumbBorder(time);
        }

        measuresSetFLAG = setFLAG || true;

        ready();
      }
    }

    stageLeft = $stage.offset().left;

    return this;
  };

  that.setOptions = function (options) {
    $.extend(opts, options);
    reset();
    return this;
  };

  that.shuffle = function () {
    data && shuffle(data) && reset();
    return this;
  };

  function setShadow ($el, edge) {
    ////console.time('setShadow');
    if (o_shadows) {
      $el.removeClass(shadowsLeftClass + ' ' + shadowsRightClass);
      edge && !$videoPlaying && $el.addClass(edge.replace(/^|\s/g, ' ' + shadowsClass + '--'));
    }
    ////console.timeEnd('setShadow');
  }

  that.destroy = function () {
    that.cancelFullScreen();
    that.stopAutoplay();

    data = that.data = null;

    appendElements();

    activeIndexes = [];
    detachFrames(STAGE_FRAME_KEY);

    reset.ok = false;

    return this;
  };

  that.playVideo = function () {
    var dataFrame = activeFrame,
        video = dataFrame.video,
        _activeIndex = activeIndex;

    if (typeof video === 'object' && dataFrame.videoReady) {
      o_nativeFullScreen && that.fullScreen && that.cancelFullScreen();

      waitFor(function () {
        return !fullScreenApi.is() || _activeIndex !== activeIndex;
      }, function () {
        if (_activeIndex === activeIndex) {
          dataFrame.$video = dataFrame.$video || $($.Fotorama.jst.video(video));
          dataFrame.$video.appendTo(dataFrame[STAGE_FRAME_KEY]);

          $wrap.addClass(wrapVideoClass);
          $videoPlaying = dataFrame.$video;

          stageNoMove();

          $arrs.blur();
          $fullscreenIcon.blur();

          triggerEvent('loadvideo');
        }
      });
    }

    return this;
  };

  that.stopVideo = function () {
    unloadVideo($videoPlaying, true, true);
    return this;
  };

  function unloadVideo ($video, unloadActiveFLAG, releaseAutoplayFLAG) {
    if (unloadActiveFLAG) {
      $wrap.removeClass(wrapVideoClass);
      $videoPlaying = false;

      stageNoMove();
    }

    if ($video && $video !== $videoPlaying) {
      $video.remove();
      triggerEvent('unloadvideo');
    }

    if (releaseAutoplayFLAG) {
      releaseAutoplay();
      changeAutoplay();
    }
  }

  function toggleControlsClass (FLAG) {
    $wrap.toggleClass(wrapNoControlsClass, FLAG);
  }

  function stageCursor (e) {
    if (stageShaftTouchTail.flow) return;

    var x = e ? e.pageX : stageCursor.x,
        pointerFLAG = x && !disableDirrection(getDirection(x)) && opts.click;

    if (stageCursor.p !== pointerFLAG
        && $stage.toggleClass(pointerClass, pointerFLAG)) {
      stageCursor.p = pointerFLAG;
      stageCursor.x = x;
    }
  }

  $stage.on('mousemove', stageCursor);

  function clickToShow (showOptions) {
    clearTimeout(clickToShow.t);

    if (opts.clicktransition && opts.clicktransition !== opts.transition) {
      //console.log('change transition to: ' + opts.clicktransition);

      // this timeout is for yield events flow
      setTimeout(function () {
        // save original transition for later
        var _o_transition = opts.transition;

        that.setOptions({transition: opts.clicktransition});

        // now safe to pass base transition to o_transition, so that.show will restor it
        o_transition = _o_transition;
        // this timeout is here to prevent jerking in some browsers
        clickToShow.t = setTimeout(function () {
          that.show(showOptions);
        }, 10);
      }, 0);
    } else {
      that.show(showOptions);
    }
  }

  function onStageTap (e, toggleControlsFLAG) {
    ////console.time('onStageTap');
    var target = e.target,
        $target = $(target);

    if ($target.hasClass(videoPlayClass)) {
      that.playVideo();
    } else if (target === fullscreenIcon) {
      that.toggleFullScreen();
    } else if ($videoPlaying) {
      target === videoClose && unloadVideo($videoPlaying, true, true);
    } else {
      if (toggleControlsFLAG) {
        toggleControlsClass();
      } else if (opts.click) {

        clickToShow({index: e.shiftKey || getDirectionSign(getDirection(e._x)), slow: e.altKey, user: true});
      }
    }
    ////console.timeEnd('onStageTap');
  }

  function updateTouchTails (key, value) {
    stageShaftTouchTail[key] = navShaftTouchTail[key] = value;
  }

  stageShaftTouchTail = moveOnTouch($stageShaft, {
    onStart: onTouchStart,
    onMove: function (e, result) {
      setShadow($stage, result.edge);
    },
    onTouchEnd: onTouchEnd,
    onEnd: function (result) {
      ////console.time('stageShaftTouchTail.onEnd');
      setShadow($stage);

      ////console.log('result', result);

      var toggleControlsFLAG = (MS_POINTER && !hoverFLAG || result.touch) && opts.arrows && opts.arrows !== 'always';

      if (result.moved || (toggleControlsFLAG && result.pos !== result.newPos && !result.control)) {
        var index = getIndexByPos(result.newPos, measures.w, opts.margin, repositionIndex);
        that.show({
          index: index,
          time: o_fade ? o_transitionDuration : result.time,
          overPos: result.overPos,
          user: true
        });
      } else if (!result.aborted && !result.control) {
        onStageTap(result.startEvent, toggleControlsFLAG);
      }
      ////console.timeEnd('stageShaftTouchTail.onEnd');
    },
//    getPos: function () {
//      return -getPosByIndex(dirtyIndex, measures.w, opts.margin, repositionIndex);
//    },
    //_001: true,
    timeLow: 1,
    timeHigh: 1,
    friction: 2,
    select: '.' + selectClass + ', .' + selectClass + ' *',
    $wrap: $stage
  });

  navShaftTouchTail = moveOnTouch($navShaft, {
    onStart: onTouchStart,
    onMove: function (e, result) {
      setShadow($nav, result.edge);
    },
    onTouchEnd: onTouchEnd,
    onEnd: function (result) {

      function onEnd () {
        slideNavShaft.l = result.newPos;
        releaseAutoplay();
        changeAutoplay();
        thumbsDraw(result.newPos, true);
      }

      if (!result.moved) {
        var target = result.$target.closest('.' + navFrameClass, $navShaft)[0];
        target && onNavFrameClick.call(target, result.startEvent);
      } else if (result.pos !== result.newPos) {
        pausedAutoplayFLAG = true;
        slide($navShaft, {
          time: result.time,
          pos: result.newPos,
          overPos: result.overPos,
          onEnd: onEnd
        });
        thumbsDraw(result.newPos);
        o_shadows && setShadow($nav, findShadowEdge(result.newPos, navShaftTouchTail.min, navShaftTouchTail.max));
      } else {
        onEnd();
      }
    },
    timeLow: .5,
    timeHigh: 2,
    friction: 5,
    $wrap: $nav
  });

  stageWheelTail = wheel($stage, {
    shift: true,
    onEnd: function (e, direction) {
      ////console.log('wheel $stage onEnd', direction);
      onTouchStart();
      onTouchEnd();
      that.show({index: direction, slow: e.altKey})
    }
  });

  navWheelTail = wheel($nav, {
    onEnd: function (e, direction) {
      ////console.log('wheel $nav onEnd', direction);
      onTouchStart();
      onTouchEnd();
      var newPos = stop($navShaft) + direction * .25;
      $navShaft.css(getTranslate(minMaxLimit(newPos, navShaftTouchTail.min, navShaftTouchTail.max)));
      o_shadows && setShadow($nav, findShadowEdge(newPos, navShaftTouchTail.min, navShaftTouchTail.max));
      navWheelTail.prevent = {'<': newPos >= navShaftTouchTail.max, '>': newPos <= navShaftTouchTail.min};
      clearTimeout(navWheelTail.t);
      navWheelTail.t = setTimeout(function () {
        slideNavShaft.l = newPos;
        thumbsDraw(newPos, true)
      }, TOUCH_TIMEOUT);
      thumbsDraw(newPos);
    }
  });

  $wrap.hover(
      function () {
        setTimeout(function () {
          if (touchedFLAG) return;
          toggleControlsClass(!(hoverFLAG = true));
        }, 0);
      }, function () {
        if (!hoverFLAG) return;
        toggleControlsClass(!(hoverFLAG = false));
      }
  );

  function onNavFrameClick (e) {
    var index = $(this).data().eq;
    clickToShow({index: index, slow: e.altKey, user: true, coo: e._x - $nav.offset().left});
  }

  function onArrClick (e) {
    clickToShow({index: $arrs.index(this) ? '>' : '<', slow: e.altKey, user: true});
  }

  smartClick($arrs, function (e) {
    stopEvent(e);
    onArrClick.call(this, e);
  }, {
    onStart: function () {
      onTouchStart();
      stageShaftTouchTail.control = true;
    },
    onTouchEnd: onTouchEnd
  });

  function addFocusOnControls (el) {
    addFocus(el, function () {
      setTimeout(function () {
        lockScroll($stage);
      }, 0);
      toggleControlsClass(false);
    });
  }

  $arrs.each(function () {
    addEnterUp(this, function (e) {
      onArrClick.call(this, e);
    });
    addFocusOnControls(this);
  });

  addEnterUp(fullscreenIcon, that.toggleFullScreen);
  addFocusOnControls(fullscreenIcon);

  function reset () {
    setData();
    setOptions();

    if (!reset.i) {
      reset.i = true;
      // Only once
      var _startindex = opts.startindex;
      if (_startindex || opts.hash && location.hash) {
        startIndex = getIndexFromHash(_startindex || location.hash.replace(/^#/, ''), data, that.index === 0 || _startindex, _startindex);
      }
      activeIndex = repositionIndex = dirtyIndex = lastActiveIndex = startIndex = edgeIndex(startIndex) || 0;/*(o_rtl ? size - 1 : 0)*///;
    }

    if (size) {
      if (changeToRtl()) return;

      if ($videoPlaying) {
        unloadVideo($videoPlaying, true);
      }

      activeIndexes = [];
      detachFrames(STAGE_FRAME_KEY);

      reset.ok = true;

      that.show({index: activeIndex, time: 0});
      that.resize();
    } else {
      that.destroy();
    }
  }

  function changeToRtl () {
    ////console.log('changeToRtl');
    if (!changeToRtl.f === o_rtl) {
      changeToRtl.f = o_rtl;
      activeIndex = size - 1 - activeIndex;
      ////console.log('changeToRtl execute, activeIndex is', activeIndex);
      that.reverse();

      return true;
    }
  }

  $.each('load push pop shift unshift reverse sort splice'.split(' '), function (i, method) {
    that[method] = function () {
      data = data || [];
      if (method !== 'load') {
        Array.prototype[method].apply(data, arguments);
      } else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].length) {
        data = clone(arguments[0]);
      }
      reset();
      return that;
    }
  });

  function ready () {
    if (!ready.ok) {
      ready.ok = true;
      triggerEvent('ready');
    }
  }

  reset();
};

