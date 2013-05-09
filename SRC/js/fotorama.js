jQuery.Fotorama = function ($fotorama, opts) {

  //if (!$HTML || !$BODY || !$.Fotorama.$load) {
  $HTML = $HTML || $('html');
  $BODY = $BODY || $('body');

  // Блок-спутник для загрузки в нём фотографий и проверки размеров,
  // прямо в фотораме это не всегда удобно делать:
  $.Fotorama.$load = $.Fotorama.$load || $('<div class="' + loadClass+ '"></div>').appendTo($BODY);
  //}

  var that = this,
      index = _size,
      stamp = new Date().getTime(),
      fotorama = $fotorama.addClass(_fotoramaClass + stamp).get(0),
      data,
      dataFrameCount = 0,
      fotoramaData = $fotorama.data(),
      size,

      // Скелет разметки будущей фоторамы:
      $style = $(document.createElement('style')).insertBefore($fotorama),

      $anchor = $('<div style="display: none;"></div>').insertBefore($fotorama),
      $_wrap = $('<div></div>'),
      $wrap = $('<div class="' + wrapClass + ' ' + wrapNotReadyClass + '"></div>').appendTo($_wrap),
      $stage = $('<div class="' + stageClass +'"></div>').appendTo($wrap),
      stage = $stage.get(0),
      $stageShaft = $('<div class="' + stageShaftClass + '"></div>').appendTo($stage),
      $stageFrame = $(),
      $arrPrev = $('<div class="' + arrClass + ' ' + arrPrevClass +'"><div class="' + arrArrClass + '"></div></div>'),
      $arrNext = $('<div class="' + arrClass + ' ' + arrNextClass + '"><div class="' + arrArrClass + '"></div></div>'),
      $arrs = $arrPrev.add($arrNext).appendTo($stage),
      $navWrap = $('<div class="' + navWrapClass + '"></div>'),
      $nav = $('<div class="' + navClass + '"></div>').appendTo($navWrap),
      $navShaft = $('<div class="' + navShaftClass +'"></div>').appendTo($nav),
      $navFrame,
      $navDotFrame = $(),
      $navThumbFrame = $(),
      stageFrameKey = '$stageFrame',
      navFrameKey,
      navDotFrameKey = '$navDotFrame',
      navThumbFrameKey = '$navThumbFrame',

      stageShaftData = $stageShaft.data(),
      navShaftData = $navShaft.data(),

      $shadows = bindNoInteraction($('<div class="' + shadowClass + ' ' + shadowLeftClass + '"></div><div class="' + shadowClass + ' ' + shadowRightClass + '"></div>').appendTo($stage)),
      $navShadows = bindNoInteraction($shadows.clone().appendTo($nav)),

      $thumbBorder = $('<div class="' + thumbBorderClass + '"></div>').appendTo($navShaft),

      $fullscreenIcon = $('<div class="' + fullscreenIconClass + '"></div>'),
      $videoPlay = $('<div class="' + videoPlayClass + '"></div>'),
      $videoClose = $('<div class="' + videoCloseClass + '"></div>').appendTo($stage),


      $videoPlaying,

      // Индексы на все случаи:
      activeIndex = false,
      activeFrame,
      repositionIndex,
      dirtyIndex,
      lastActiveIndex,
      prevIndex,
      nextIndex,

      // Некоторые опции, которые могут измениться:
      o_loop,
      o_vertical,
      o_nav,
      o_navBefore,
      o_arrows,
      o_startIndex = false,
      o_allowFullScreen,
      o_nativeFullScreen,
      o_fade,
      o_thumbSide,
      o_thumbSide2,
      ///o_margin,
      ///o_glimpse,
      lastOptions = {},

      // Ключи к ориентации Фоторамы, горизонтальной или вертикальной
      orientation,
      _pos,
      _pos2,
      _coo,
      _side,
      _side_,
      //_innerSide,
      _side2,
      _side2_,
      //_innerSide2,

      // Размеры сцены:
      measures = {},
      ///wrapMeasures = {},
      measuresSetFLAG,

      // Крутилка:
      krutilka = {},

      stageShaftTouchTail = {},
      navShaftTouchTail = {},

      // Разные вспомогательные переменнные:
      scrollTop,
      scrollLeft,
      showedFLAG,
      pausedAutoplayFLAG,
      stoppedAutoplayFLAG,

      measuresStash;

  $wrap[stageFrameKey] = $('<div class="' + stageFrameClass +'"></div>');
  $wrap[navThumbFrameKey] = $('<div class="' + navFrameClass + ' ' + navFrameThumbClass + '"><div class="' + thumbClass + '"></div></div>');
  $wrap[navDotFrameKey] = $('<div class="' + navFrameClass + ' ' + navFrameDotClass + '"><div class="' + dotClass + '"></div></div>');

  /* Включаем фотораму */
  $.Fotorama.size++; _size++;
  $.Fotorama.api[index] = this;

  /**
   * Есть ли видео?
   */
  function checkForVideo () {
    $.each(data, function (i, dataFrame) {
      if (typeof dataFrame.i !== 'undefined') return;
      dataFrameCount++;
      dataFrame.i = dataFrameCount;
      var video = dataFrame.video,
          thumbs = {};

      if (typeof video === 'string') {
        video = findVideoId(video, true);
      }

      if (video) {
        dataFrame.video = video;
        if (!dataFrame.img && !dataFrame.thumb) {
          thumbs = getVideoThumbs(dataFrame, data, dataFrameCount, that);
        } else {
          dataFrame.thumbsReady = true;
        }
        updateData(data, {img: thumbs.img, thumb: thumbs.thumb}, dataFrameCount, that);
      }


    });
  }

//  function showArrows () {
//    if (o_arrows) {
//      $arrs.show();
//      arrsUpdate();
//    } else {
//      $arrs.hide();
//    }
//  }

  /**
   * Данные
   * */
  function setData () {
    data = that.data = opts.data && typeof opts.data === 'object' ? opts.data : data || getDataFromHtml($fotorama);
    size = that.size = data.length;

    checkForVideo();

    activeIndex = limitIndex(activeIndex);
    navAppend.done = false;

    if (!size) {
      // Если ничего нет, ничего и не показываем
      that.destroy();
    } else if (!setData.called) {
      setData.called = true;
      // Заменяем содержимое блока:
      $fotorama.html($_wrap);
    }
  }

  function stageNoMove () {
    // Запрещаем таскать фотки
    stageShaftTouchTail.noMove = size < 2 || $videoPlaying || o_fade;
  }

  function setAutoplayInterval (interval) {
    if (interval === true) interval = '';
    opts.autoplay = Math.max(Number(interval) || AUTOPLAY_INTERVAL, opts.transitionDuration * 3);
  }

  /**
   * Options on the fly
   * */
  function setOptions () {
    //console.log('setOptions');

    o_loop = opts.loop && size > 2;
    o_vertical = opts.orientation === 'vertical';

    o_fade = opts.transition === 'crossfade' || opts.transition === 'dissolve';

    var classes = {add: [], remove: []};

    if (size > 1) {
      o_nav = opts.nav;
      o_navBefore = opts.navPosition === 'before';
      o_arrows = opts.arrows;
      classes.remove.push(selectClass);
    } else {
      o_nav = o_arrows = false;
      //classes.add.push(selectClass);
    }



    if (opts.autoplay) setAutoplayInterval(opts.autoplay);

    orientation = getOrientationKeys(opts.orientation);
    _pos = orientation._pos;
    _pos2 = orientation._pos2;
    _coo = orientation._coo;
    _side = orientation._side;
    _side_ = _side + '_';
    //_innerSide = innerSideMethod(_side);
    _side2 = orientation._side2;
    _side2_ = _side2 + '_';
    //_innerSide2 = innerSideMethod(_side2);

    o_thumbSide = numberFromMeasure(opts['thumb' + capitaliseFirstLetter(_side)]) || THUMB_SIZE;
    o_thumbSide2 = numberFromMeasure(opts['thumb' + capitaliseFirstLetter(_side2)]) || THUMB_SIZE;

    // В хвостике для доступа к touch.js и moveontouch.js
    // меняем необходимые параметры
    stageShaftTouchTail._pos = navShaftTouchTail._pos = _pos;
    stageShaftTouchTail._coo = navShaftTouchTail._coo = _coo;
    stageShaftTouchTail.orientation = navShaftTouchTail.orientation = opts.orientation;
    stageShaftTouchTail.css3 = navShaftTouchTail.css3 = opts.css3;

    stageNoMove();

    ////////////////console.log('setOptions', measures);

    //setMarginAndGlimpse();
    extendMeasures(opts);

    ////////////////console.log('setOptions after', measures);
    $style.html($.Fotorama.jst.style({thumbWidth: o_vertical ? o_thumbSide2 : o_thumbSide , thumbHeight: o_vertical ? o_thumbSide : o_thumbSide2, thumbMargin: MARGIN, stamp: stamp}));
    console.log('set $style');


    // Создаём или убираем кучу навигационных кадров под точки или превьюшки
    if (o_nav === true || o_nav === 'dots') {
      $nav
          .addClass(navDotsClass)
          .removeClass(navThumbsClass);
      frameDraw(size, 'navDot');
      //smartClick($navDotFrame, onNavFrameClick, {tail: navShaftTouchTail});
    } else if (o_nav === 'thumbs') {
      $nav
          .addClass(navThumbsClass)
          .removeClass(navDotsClass);

      ////////////console.log('frameDraw navThumb');
      frameDraw(size, 'navThumb');
      //smartClick($navThumbFrame, onNavFrameClick, {tail: navShaftTouchTail});
    } else {
      o_nav = false;
      $nav.removeClass(navThumbsClass + ' ' + navDotsClass);
    }


      o_allowFullScreen = opts.allowFullScreen;
      $fotorama
          .insertAfter($anchor)
          .removeClass(hiddenClass);

    if (o_nav && o_navBefore) {
      classes.add.push(wrapNavBeforeClass);
      $navWrap.insertBefore($stage);
    } else {
      classes.remove.push(wrapNavBeforeClass);
      $navWrap.insertAfter($stage);
    }

    if (o_allowFullScreen/* || opts.lightbox*/) {
      $fullscreenIcon.appendTo($stage);
      o_nativeFullScreen = FULLSCREEN && o_allowFullScreen === 'native';
    } else {
      $fullscreenIcon.detach();
      o_nativeFullScreen = false;
    }

    // Анимация перехода, и соответствующие классы:
    classes[o_fade ? 'add' : 'remove'].push(wrapFadeClass);

    if (o_arrows) {
      $arrs.show();
      arrsUpdate();
    } else {
      $arrs.hide();
    }

    // Переворачиваем фотораму, если нужно
    classes[o_vertical ? 'add' : 'remove'].push(wrapVerticalClass);
    classes[o_vertical ? 'remove' : 'add'].push(wrapHorizontalClass);

    // Если ЦСС-транзишны поддерживаются и не отменены пользователем
    ////////////console.log('lastOptions.css3', lastOptions.css3);
    if (lastOptions.css3 !== opts.css3) {
      if (CSSTR && opts.css3) {
        ////////////console.log('css3 true');

        classes.add.push(wrapCssTransitionsClass);

        $stageShaft.add($navShaft).add(o_nav === 'thumbs' ? $thumbBorder : null).each(function () {
          var $this = $(this);
          $this
              .css(getTranslate(Number($navShaft.css(_pos).replace('px', '')), _pos, opts.css3))
              .css({top: 0, left: 0});
        });
      } else {
        ////////////console.log('css3 false');

        classes.remove.push(wrapCssTransitionsClass);

        $stageShaft.add($navShaft).add(o_nav === 'thumbs' ? $thumbBorder : null).each(function () {
          var $this = $(this);
          $this
              .css(CSSTR && lastOptions.css3 ? getTranslate(Number(readTransform($this.css('transform'), _pos)), _pos, opts.css3) : {})
              .css({transform: 'none', transition: '0ms'});
        });
      }
    }

    if (TOUCH) {
      classes.add.push(wrapTouchClass);
    }

    if (krutilka.stop) {
      krutilka.stop();
    }
    krutilka = new Spinner({length: 8, radius: 6, width: 2, color: SPINNER_COLOR, rotate: 15});

    // Одним скопом удаляем и добавляем классы:
    $wrap
        .addClass(classes.add.join(' '))
        .removeClass(classes.remove.join(' '));

    lastOptions = $.extend({}, opts);
  }


  /**
   * Нормализуем индекс, например -2 при 5 фотках будет 3, а 11 — 1 :-)
   * */
  function normalizeIndex (index) {
    if (index < 0) return (size + (index % size)) % size;
    if (index >= size) return index % size;
    return index;
  }

  /**
   * Ограничиваем индекс
   * */
  function limitIndex (index) {
    return minMaxLimit(index, 0, size - 1);
  }

  /**
   * Предыдущий индекс от текущего
   * */
  function getPrevIndex (index) {
    return index > 0 || o_loop ? index - 1 : false;
  }

  /**
   * Следующий индекс от текущего
   * */
  function getNextIndex (index) {
    return index < size - 1 || o_loop ? index + 1 : false;
  }

  /**
   * Параметры для таскания шахты
   * */
  function setStageShaftMinMaxPosAndSnap () {
    stageShaftData.minPos = o_loop ? - Infinity : - getPosByIndex(size - 1, measures[_side_], MARGIN, repositionIndex);
    stageShaftData.maxPos = o_loop? Infinity : - getPosByIndex(0, measures[_side_], MARGIN, repositionIndex);
    stageShaftData.snap = measures[_side_] + MARGIN;
  }

  /**
   * Параметры для таскания шахты c точками и превьюшками
   * */
  function setNavShaftMinMaxPos () {
    console.log('setNavShaftMinMaxPos', measures[_side_],  $navShaft[_side]());
    navShaftData.minPos = Math.min(0, measures[_side_] - $navShaft[_side]());
    navShaftData.maxPos = 0;

    navShaftTouchTail.noMove = navShaftData.minPos === navShaftData.maxPos;

    ////////console.log('navShaftData.minPos', navShaftData.minPos);
    ////////console.log('navShaftData.maxPos', navShaftData.maxPos);
  }

  /**
   * Итератор для груповой работы с кадрами
   * Принимает как массив индексов для перебора [1, 0, 2],
   * так и диапазон массива, например, если indexes равно 3,
   * будут перебраны индексы 0, 1 и 2.
   * */
  function eachIndex(indexes, type, fn) {
    if (typeof indexes === 'number') {
      indexes = new Array(indexes);
      var rangeFLAG = true;
    }
    return $.each(indexes, function (i, index) {
      if (rangeFLAG) index = i;
      if (typeof(index) !== 'number') return;

      var dataFrame = data[normalizeIndex(index)],
          key = '$' + type + 'Frame',
          $frame = dataFrame[key];

      fn.call(this, i, index, dataFrame, $frame, key, $frame ? $frame.data() : undefined);
    });
  }

  function setMeasures (width, height, ratio, index) {
    if (!measuresSetFLAG || (measuresSetFLAG === '*' && index === o_startIndex)) {
      // Если размеры ещё не определены пытаемся сделать это по первой фотке
      width = measureIsValid(opts.width) || measureIsValid(width) || WIDTH;
      height = measureIsValid(opts.height) || measureIsValid(height) || HEIGHT;
      that.resize({
        width: width,
        ratio: opts.ratio || ratio || width / height
      }, 0, index === o_startIndex ? true : '*');
    }
  }

  /**
   * Загружает картинки
   * */
  function loadImg(indexes, type, specialMeasures, specialFit, again) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {

      if (!$frame) return;

      var fullFLAG = that.fullScreen && dataFrame.full && !frameData.$full && type === 'stage';

      if (!(!frameData.$img || again || fullFLAG)) return;

//      if (fullFLAG && _$img) {
//        var _measures = _$img.data().measures;
//        if (typeof _measures === 'object' && (_measures.width >= _$img.width())) return;
//      }

      ////////console.log('start loading', fullFLAG, index, type);

      var img = new Image(),
          $img = $(img),
          imgData = $img.data();

      frameData[fullFLAG ? '$full' : '$img'] = $img;

      var srcKey = type === 'stage' ? (fullFLAG ? 'full' : 'img') : 'thumb',
          src = dataFrame[srcKey],
          dummy = fullFLAG ? null : dataFrame[type === 'stage' ? 'thumb' : 'img'];

      if (type === 'navThumb') $frame = frameData.$wrap;

      function error () {
        ////////////console.log('error', index, type, dummy, src);
        // Ошибка
        $img.remove();

        $.Fotorama.cache[src] = 'error';

        // Попытаемся загрузить запасную картинку, если она есть:
        if ((!dataFrame.html || type !== 'stage') && dummy && dummy !== src) {
          dataFrame[srcKey] = src = dummy;
          loadImg([index], type, specialMeasures, specialFit, true);
        } else {
          ////////////console.log('error', index, type, dummy, src);

          if (src && !frameData.html) {
            $frame
                .trigger('f:error')
                .removeClass(loadingClass)
                .addClass(errorClass);
          } else if (type === 'stage') {
            $frame
                .trigger('f:load')
                .removeClass(loadingClass + ' ' + errorClass)
                .addClass(loadedClass);

            setMeasures();
          }

          // Записываем в кеш, что картинка загрузилась:
          frameData.state = 'error';

          if (size > 1 && !dataFrame.html && !dataFrame.deleted && !dataFrame.video && !fullFLAG) {
            // Ни одной картинки не удалось загрузить,
            // удаляем кадр совсем из фоторамы,
            // если он не последний, и в нём нет ХТМЛ
            dataFrame.deleted = true;
            that.splice(index, 1);
          }
        }
      }

      function loaded() {
        // Удачная загрузка:
        //


        //var $html = $(frameData.$html).children();

        //////////////////console.log('loaded', $img.width(), $img.height());
        // Кешируем оригинальные размеры картинки

        var width = $img.width(),
            height = $img.height(),
            ratio = width / height;

        imgData.measures = {
          width: width,
          height: height,
          ratio: ratio
        };

        setMeasures(width, height, ratio, index);

        $img
            .off('load error')
            .addClass(imgClass + (fullFLAG ? ' ' + imgFullClass : ''))
            .prependTo($frame);

          fit($img, specialMeasures || measures, specialFit || dataFrame.fit || opts.fit);

        $.Fotorama.cache[src] = 'loaded';
        frameData.state = 'loaded';

        setTimeout(function () {
          $frame
              .trigger('f:load')
              .removeClass(loadingClass + ' ' + errorClass)
              .addClass(loadedClass + ' ' + (fullFLAG ? loadedFullClass : loadedImgClass));

          if (type === 'stage') {
            $fotorama.trigger('fotorama:load', eventData(normalizeIndex(index)));
          }
        }, 4);
      }

      if (!src) {
        error();
        return;
      }

      function waitAndLoad () {
        waitFor(function () {
          return !isHidden(img);
        }, function () {
          loaded();
        });
      }

      if (!$.Fotorama.cache[src]) {

        // Если адреса картинки в кеше нет,
        // загружаем картинку:
        ////////////console.log('Загружаем картинку', src);
        $.Fotorama.cache[src] = '*';

        $img
            .on('load', waitAndLoad)
            .on('error', error);
      } else {
        // Возьмём из кеша
        ////////////console.log('Возьмём из кеша', src);
        (function justWait () {
          if ($.Fotorama.cache[src] === 'error') {
            // Ошибка
            ////////////console.log('Ошибка', src);
            error();
          } else if ($.Fotorama.cache[src] === 'loaded') {
            // Усхпех
            //////////////console.log('Усхпех', src);
            waitAndLoad();
          } else {
            // Ждём
            //////////////console.log('Ждём', src);
            setTimeout(justWait, 100);
          }
        })();
      }

      img.src = src;
      $img.appendTo($.Fotorama.$load);
    });
  }

  /**
   * Проверяет статус активной картинки, если надо показывает крутилку
   * */
  function updateFotoramaState () {
    var $frame = that.activeFrame[stageFrameKey];

    if (!$frame || $frame.data().state) return;

    krutilka
        .stop()
        .spin($frame.get(0));
    $frame.on('f:load f:error', function () {
      //////////////////////console.log('krutilka stop', activeIndex);
      $frame.off('f:load f:error');
      krutilka.stop();
    });
  }

  /**
   * Отрисовываем кадр (на сцене или в навигации), загружаем изображение, если требуется, оборачиваем в див.
   * @param {Array} indexes Массив индексов
   * @param {String} type Кадр для сцены — 'stage', для навигации — 'nav'
   * */
  function frameDraw (indexes, type) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {
      if ($frame) return;

      $frame = dataFrame[key] = $wrap[key].clone();
      frameData = $frame.data();
      frameData.data = dataFrame;

      if (type === 'stage') {
        // Сцена
        if (dataFrame.html) {
          $('<div class="' + htmlClass +'"></div>')
              .append(dataFrame.html)
              .appendTo($frame);
        }

        if (opts.captions && dataFrame.caption) {
          var $caption = $('<div class="' + captionClass +'"></div>').appendTo($frame);
          $('<div class="' + captionInnerClass +'"></div>')
              .append(dataFrame.caption)
              .appendTo($caption);
        }

        if (dataFrame.video) {
          var $oneVideoPlay = $videoPlay.clone();

          smartClick($oneVideoPlay, function () {
              that.playVideo();
            }, {
              onStart: function (e) {
                onTouch.call(this, e);
                stageShaftTouchTail.control = true;
              },
              tail: stageShaftTouchTail
            }
          );

          $frame.addClass(stageFrameVideoClass)
              .append($oneVideoPlay);
        }

        $stageFrame = $stageFrame.add($frame);
      } else if (type === 'navDot') {
        // Точки

        $navDotFrame = $navDotFrame.add($frame);

        //////////////////////console.log('Точка', index, $navDotFrame);
      } else if (type === 'navThumb') {
        frameData.$wrap = $frame.children(':first');
        $navThumbFrame = $navThumbFrame.add($frame);
        if (dataFrame.video) {
          $frame.append($videoPlay.clone());
        }
      }/* else if (type === 'lightboxNav') {
        $lightboxNavFrame = $lightboxNavFrame.add($frame);
        if (dataFrame.video) {
          $frame.append($videoPlay.clone());
        }
        $frame.click(onLightboxNavFrameClick);
      }*/
    });
  }

  function callFit ($img, measuresToFit, method) {
    if ($img && $img.size()) {
      return fit($img, measuresToFit, method);
    }
  }

  /**
   * Позиционируем и показываем кадры с определённым индексом.
   * */
  function stageFramePosition (indexes) {
    eachIndex(indexes, 'stage', function (i, index, dataFrame, $frame, key, frameData) {
      if (!$frame) return;

      //////////////console.log('stageFramePosition', index, $frame, $stageShaft);

      $frame
          .css(_pos, o_fade ? 0 : getPosByIndex(index, measures[_side_], MARGIN, repositionIndex))
          .css(_pos2, 0)
          .css(o_fade ? {} : getDuration(0))
          .fadeTo(0, o_fade && index !== activeIndex ? 0 : 1);

      if (!frameData.appended) {
        frameData.appended = true;
        $frame.appendTo($stageShaft);
        unloadVideo(dataFrame.$video);
      }

      var method = dataFrame.fit || opts.fit;

      callFit(frameData.$img, measures, method);
      callFit(frameData.$full, measures, method);
    });
  }

  function thumbsDraw (pos, loadFLAG) {
    ////////////console.log('thumbsDraw', pos, loadFLAG);
    if (o_nav !== 'thumbs' || isNaN(pos)) return;

    var thumbSide = o_thumbSide + MARGIN,
        startIndex = limitIndex(getIndexByPos(pos + thumbSide, thumbSide)),
        stopIndex = limitIndex(getIndexByPos(pos - measures[_side_]/* - thumbSide*/, thumbSide)),
        specialMeasures = {};

    specialMeasures[_side_] = o_thumbSide;
    specialMeasures[_side2_] = o_thumbSide2;

    $navThumbFrame.each(function () {
      var $this = $(this),
          thisData = $this.data(),
          eq = thisData.eq,
          specialFit = 'cover';

      if (eq < startIndex || eq > stopIndex) return;

      if (callFit(thisData.$img, specialMeasures, 'cover')) return;

      if (loadFLAG) {
        loadImg([eq], 'navThumb', specialMeasures, specialFit);
      }
    });
  }

  /**
   * Вставляем, удаляем, сортируем точки и превьюшки:
   * */
  function navAppend ($navFrame, $navShaft, mainFLAG) {
    //console.log('navAppend');
    if (navAppend.done) return;

    //console.log('append execute');

    $navFrame = $navFrame
        .filter(function () {
          var actual,
              $this = $(this),
              frameData = $this.data();
          for (var _i = 0, _l = data.length; _i < _l; _i++) {
            var dataFrame = data[_i];
            if (frameData.data === dataFrame) {
              actual = true;
              frameData.eq = _i;
              break;
            }
          }
          if (!actual) {
            $this.remove();
          }

          ////////////////////console.log(frameData.eq);

          return actual;
        })
        .sort(function (a, b) {
          return $(a).data().eq - $(b).data().eq;
        })
        .appendTo($navShaft);

    if (mainFLAG) {
      setNavShaftMinMaxPos();
    }
  }

  /**
   * ОБновляем стрелки, дизаблим крайние
   * */
  function arrsUpdate () {
    if (!o_arrows) return;

    $arrs.each(function (i) {
      $(this).toggleClass(
          arrDisabledClass,
          (!o_loop
              && ((activeIndex === 0 && i === 0)
              || (activeIndex === size - 1 && i === 1)))
          && !$videoPlaying
      );
    });
  }

  function getNavFrameCenter($navFrame) {
    console.log('getNavFrameCenter', $navFrame.position()[_pos], o_thumbSide);
    return $navFrame.position()[_pos] + (o_thumbSide) / 2
  }

  function slideThumbBorder (time) {
    slide($thumbBorder, {
      time: time * .9,
      pos: getNavFrameCenter(that.activeFrame[navFrameKey]),
      _pos: _pos
    }, opts.css3);
  }

  function slideNavShaft(options) {
    if (!data[options.guessIndex][navFrameKey]) return;
      var pos = minMaxLimit(options.coo - getNavFrameCenter(data[options.guessIndex][navFrameKey]), navShaftData.minPos, navShaftData.maxPos),
          time = options.time * .9;
      slide($navShaft, {
        time: time,
        pos: pos,
        _pos: _pos,
        onEnd: function () {
          ////////console.log('thumbsDraw', pos);
          thumbsDraw(pos, true);
        }
      }, opts.css3);

      if (time) thumbsDraw(pos);
      setShadow($nav, findShadowEdge(pos, navShaftData.minPos, navShaftData.maxPos));
  }

  /**
   * Обновляем навигацию
   * */
  function navUpdate () {
    if (o_nav === 'thumbs') {
      $navFrame = $navThumbFrame;
      navFrameKey = navThumbFrameKey;
    } else if (o_nav) {
      $navFrame = $navDotFrame;
      navFrameKey = navDotFrameKey;
    } else {
      return;
    }

    navAppend($navFrame, $navShaft, true);

    navAppend.done = true;


    $navFrame.removeClass(activeClass);
    that.activeFrame[navFrameKey].addClass(activeClass);
  }

  /**
   * Позиционируем шахту, чтобы текущий кадр имел нулевую позицию
   * */
  function stageShaftReposition () {

    ////////console.log('stageShaftReposition');

    repositionIndex = dirtyIndex = activeIndex;

    var dataFrame = that.activeFrame,
        $frame = dataFrame[stageFrameKey];

    if (!$frame) return;

    // Скрываем все лишние кадры
    $stageFrame
        .not(that.activeFrame[stageFrameKey].addClass(activeClass))
        .detach()
        .data('appended', false)
        .removeClass(activeClass + ' ' + fadeFrontClass + ' ' + fadeRearClass);

    // Возвращаем шахту в начальную позицию
    stop($stageShaft, _pos, opts.css3);
    $stageShaft.css(getTranslate(0, _pos, opts.css3));

    // Force reflow
    ////readPosition($stageShaft, _pos, options.css3);

    // Показываем нужные
    stageFramePosition([activeIndex, prevIndex, nextIndex]);

    setStageShaftMinMaxPosAndSnap();

    ////////console.log('stageShaftReposition -> setNavShaftMinMaxPos');
    setNavShaftMinMaxPos();
  }



//  function setMarginAndGlimpse () {
//    o_margin = Math.max(0, numberFromPercent(MARGIN) / 100 * measures[_side_] || numberFromMeasure(MARGIN)) || 0;
//
//    if (opts.glimpse && !o_fade) {
//      o_glimpse = Math.max(0, numberFromPercent(opts.glimpse) / 100 * measures[_side_] || numberFromMeasure(opts.glimpse)) || 0;
//      o_glimpse += o_glimpse ? o_margin : o_glimpse;
//      o_glimpse = Math.min(measures[_side_] * .33 || Infinity, o_glimpse);
//      o_margin -= o_glimpse * 2;
//    } else {
//      o_glimpse = 0;
//    }
//
//    //////console.log('setMarginAndGlimpse', o_margin, o_glimpse);
//  }

  function extendMeasures (options) {
    if (!options) return;
    $.extend(measures, {
      width: options.width,
      height: options.height,
      minWidth: options.minWidth,
      maxWidth: options.maxWidth,
      minHeight: options.minHeight,
      maxHeight: options.maxHeight,
      ratio: (function (_ratio) {
        if (!_ratio) return;
        var ratio = Number(_ratio);
        if (!isNaN(ratio)) {
          return ratio;
        } else {
          ratio = _ratio.split('/');
          return Number(ratio[0] / ratio[1]) || undefined;
        }
      })(options.ratio)
    });
  }

  function eventData (index) {
    return data ? {
      index: index,
      frame: data[index]
    } : false;
  }

  function resetFotoramaMargins () {
    $_wrap.css({marginLeft: 0, marginRight: 0});
  }

  function onTouch (e) {
    if (opts.stopAutoplayOnTouch) {
      that.stopAutoplay();
    } else {
      pausedAutoplayFLAG = true;
    }
  }

  function releaseAutoplay () {
    pausedAutoplayFLAG = !(!$videoPlaying && !stoppedAutoplayFLAG);
  }

  function changeAutoplay () {
    clearTimeout(changeAutoplay.timeout);
    if (!opts.autoplay || pausedAutoplayFLAG) {
      if (that.autoplay) {
        that.autoplay = false;
        $fotorama.trigger('fotorama:stopautoplay');
      }

      return;
    }

    if (!that.autoplay) {
      that.autoplay = true;
      $fotorama.trigger('fotorama:startautoplay');
    }

    var _activeIndex = activeIndex;

    changeAutoplay.timeout = setTimeout(function () {
      var frameData = that.activeFrame[stageFrameKey].data();
      waitFor(function () {
        return frameData.state || _activeIndex !== activeIndex;
      }, function () {
        if (pausedAutoplayFLAG || _activeIndex !== activeIndex) return;
        that.show(normalizeIndex(activeIndex + 1));
      });
    }, opts.autoplay);
  }


  this.startAutoplay = function (interval) {
    if (that.autoplay) return this;
    pausedAutoplayFLAG = stoppedAutoplayFLAG = false;
    setAutoplayInterval(interval || opts.autoplay);
    changeAutoplay();

    return this;
  }

  this.stopAutoplay = function () {
    if (!that.autoplay) return this;
    pausedAutoplayFLAG = stoppedAutoplayFLAG = true;
    changeAutoplay();

    return this;
  }

  /**
   * Показываем кадр по индексу, или по кодовому символу '>' — вперёд, '<' — назад, '>>' — в конец, '<<' в начало
   * */
  this.show = function (options) {
    if (!data) return this;
    var index,
        time = opts.transitionDuration,
        overPos;

    if (typeof options !== 'object') {
      index = options
    } else {
      index = options.index;
      time = typeof options.time === 'number' ? options.time : time;
      overPos = options.overPos;
    }

    if (options.slow) time *= 10;

    if (index === '>') {
      index = dirtyIndex + 1;
    } else if (index === '<') {
      index = dirtyIndex - 1;
    } else if (index === '<<') {
      index = 0;
    } else if (index === '>>') {
      index = size - 1;
    }

    if (isNaN(index)) {
      var _index = getIndexFromHash(index, data, true);
      if (isNaN(_index)) return this;
      index = _index;
    }

    that.activeIndex = activeIndex = o_loop ? normalizeIndex(index) : limitIndex(index);
    prevIndex = getPrevIndex(activeIndex);
    nextIndex = getNextIndex(activeIndex);

    dirtyIndex = o_loop ? index : activeIndex;

    that.activeFrame = activeFrame = data[activeIndex];

//    if (stageShaftTouchTail && !force && isFarAway(dirtyIndex)) {
//      //////////////////console.log('shaftTouchTail.disable');
//      stageShaftTouchTail.prevent = true;
//    }

    stageFramePosition(/*o_glimpse ? [dirtyIndex, getPrevIndex(dirtyIndex), getNextIndex(dirtyIndex)] : */[dirtyIndex]);

    //showCaption(time);
    unloadVideo(false, activeFrame.i !== data[normalizeIndex(repositionIndex)].i);

    //console.log('that.activeIndex', that.activeIndex);
    $fotorama.trigger('fotorama:show');

    function onEnd () {
      frameDraw([activeIndex, prevIndex, nextIndex], 'stage');
      updateFotoramaState();
      loadImg([activeIndex, prevIndex, nextIndex], 'stage');
      stageShaftReposition();

      $fotorama.trigger('fotorama:showend');

      if (opts.hash && showedFLAG) {
        setHash(activeFrame.id || activeIndex + 1, that.eq);
      }

      releaseAutoplay();
      changeAutoplay();

      showedFLAG = true;
    }

    if (!o_fade) {
      slide($stageShaft, {
        pos: - getPosByIndex(dirtyIndex, measures[_side_], MARGIN, repositionIndex),
        _pos: _pos,
        overPos: overPos,
        time: time,
        onEnd: onEnd
      }, opts.css3);
    } else {
      var $activeFrame = activeFrame[stageFrameKey],
          $prevActiveFrame = activeIndex !== lastActiveIndex ? data[lastActiveIndex][stageFrameKey] : null;

      //////console.log('FADE', activeIndex, activeIndex !== lastActiveIndex ? lastActiveIndex : null);

      fade($activeFrame, $prevActiveFrame, {
        time: time,
        method: opts.transition,
        onEnd: onEnd
      }, opts.css3);
    }

    arrsUpdate();
    navUpdate();

    var guessIndex = limitIndex(activeIndex + minMaxLimit(dirtyIndex - lastActiveIndex, -1, 1)),
        cooUndefinedFLAG = typeof options.coo === 'undefined';

    ////////////console.log('slideNavShaft in show', guessIndex, activeIndex);
    if (o_nav && (cooUndefinedFLAG || guessIndex !== activeIndex)) {
      slideNavShaft({time: time, coo: !cooUndefinedFLAG ? options.coo : measures[_side_] / 2, guessIndex: !cooUndefinedFLAG ? guessIndex : activeIndex});
    }
    if (o_nav === 'thumbs') slideThumbBorder(time);

    lastActiveIndex = activeIndex;

    return this;
  }

  this.requestFullScreen = function () {
    //var lightboxFLAG = opts.lightbox;

    if (/*(*/!o_allowFullScreen/* && !lightboxFLAG)*/ || that.fullScreen) return this;

    that.fullScreen = true;

    scrollTop = $WINDOW.scrollTop();
    scrollLeft = $WINDOW.scrollLeft();

//    $BODY.animate({scrollTop: scrollTop + 1, scrollLeft: scrollLeft + 1}, 0, function () {
//      $BODY.animate({scrollTop: scrollTop - 1, scrollLeft: scrollLeft - 1}, 0);
//    });

    //if (!lightboxFLAG) {
      $WINDOW.scrollLeft(1).scrollTop(1);

    //}

    if (o_nativeFullScreen) {
      fullScreenApi.requestFullScreen(fotorama);
    }

    setTimeout(function () {
      $WINDOW.scrollLeft(0).scrollTop(0);
      // Таймаут нужен для Сафари, чтобы он успел пересчитать скрол и не залип
      $BODY.addClass(_fullscreenClass);

      $fotorama
          .addClass(fullscreenClass)
          .css({top: 0})
          .appendTo($BODY)
          .trigger('fotorama:fullscreenenter');

      measuresStash = $.extend({}, measures);

      unloadVideo($videoPlaying, true);

      that.resize();
      loadImg([activeIndex, prevIndex, nextIndex], 'stage');
    }, 5);

    return this;
  }

  function cancelFullScreen () {
    if (!that.fullScreen) return;

    that.fullScreen = false;


    if (FULLSCREEN) {
      fullScreenApi.cancelFullScreen(fotorama);
    }

    $BODY.removeClass(_fullscreenClass);

    $fotorama
        .removeClass(fullscreenClass)
        .insertAfter($anchor)
        .trigger('fotorama:fullscreenexit');

    measures = $.extend({}, measuresStash);

    unloadVideo($videoPlaying, true);

    that.resize();
    loadImg([activeIndex, prevIndex, nextIndex], 'stage');

    $WINDOW.scrollLeft(scrollLeft).scrollTop(scrollTop);
  }

  this.cancelFullScreen = function () {
    if (o_nativeFullScreen && fullScreenApi.isFullScreen()) {
      fullScreenApi.cancelFullScreen(document);
    } else {
      cancelFullScreen();
    }

    return this;
  }

  if (document.addEventListener) {
    document.addEventListener(fullScreenApi.fullScreenEventName, function () {
      if (!fullScreenApi.isFullScreen() && !$videoPlaying) {
        cancelFullScreen();
      }
    });
  }

  $DOCUMENT.on('keydown', function (e) {
    if ($videoPlaying && e.keyCode === 27) {
      e.preventDefault();
      unloadVideo($videoPlaying, true, true);
    } else if (that.fullScreen || (opts.keyboard && !index && /*(!opts.lightbox || */that.fullScreen/*)*/)) {
      ////////console.log('e.keyCode', e.keyCode);
      if (e.keyCode === 27) {
        e.preventDefault();
        that.cancelFullScreen();
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        if (e.keyCode === 40 && !that.fullScreen) return;
        e.preventDefault();
        that.show({index: '>', slow: e.altKey});
      } else if (e.keyCode === 37 || e.keyCode === 38) {
        if (e.keyCode === 38 && !that.fullScreen) return;
        e.preventDefault();
        that.show({index: '<', slow: e.altKey});
      }
    }
  });

  if (!index) {
    $DOCUMENT.on('keydown', 'textarea, input, select', function (e) {
      if (!that.fullScreen) {
        e.stopPropagation();
      }
    });
  }

  /**
   * Изменяем размер фоторамы
   *
   * @param {Object} options Объект с набором размеров
   * @param {Number|String} options.width
   * @param {Number|String} options.height
   * @param {Number} options.time
   *
   * */
  this.resize = function (options) {
    if (!data) return this;

    var time = arguments[1] || 0,
        setFLAG = arguments[2];

    extendMeasures(!that.fullScreen/* && !opts.lightbox*/ ? options : {width: '100%', maxWidth: null, minWidth: null, height: '100%', maxHeight: null, minHeight: null});

    ////////////////console.log('setFLAG', setFLAG);

    //if (setFLAG !== '*') {
      //$.extend(options, measures);
    //}

    ////////////////console.log('resize', measures);

    var width = measures.width,
        height = measures.height,
        ratio = measures.ratio,
        windowHeight = $WINDOW.height() - (o_nav && !o_vertical ? $nav.height() : 0),
        navWidth = $nav.width();
        //widthCorrection = o_nav && o_vertical ? $nav.width() : 0;

    if (!measureIsValid(width)) return this;

    resetFotoramaMargins();

    if (o_vertical && o_nav) {
      $_wrap.css('margin-' + (o_navBefore ? 'left' : 'right'), navWidth);
    }

    $wrap.css({width: width, minWidth: measures.minWidth, maxWidth: measures.maxWidth});

    width = measures.width_ = $wrap.width()/* - widthCorrection*/;
    height = numberFromPercent(height) / 100 * windowHeight || numberFromMeasure(height);

    ////////console.log('resize', width, height, ratio);

    console.log('height', height, width, ratio);

    if (!height) {
      if (!ratio) return this;
      height = width / ratio;
    }


    height = measures.height_ = minMaxLimit(height, numberFromPercent(measures.minHeight) / 100 * windowHeight || numberFromMeasure(measures.minHeight), numberFromPercent(measures.maxHeight) / 100 * windowHeight || numberFromMeasure(measures.maxHeight));



    ///setMarginAndGlimpse();

    ///measures[_side_ + '_'] = wrapMeasures[_side] = measures[_side_] - o_glimpse * 2;
    ///measures[_side2_ + '_'] = wrapMeasures[_side2] = measures[_side2_];
    ///wrapMeasures.ratio = wrapMeasures.width / wrapMeasures.height;

    stageShaftReposition();

    $stage
        .addClass(stageOnlyActiveClass)
        .stop()
        .animate({width: width, height: height/*, marginLeft: o_navBefore ? widthCorrection : 0*/}, time, function () {
          $stage.removeClass(stageOnlyActiveClass);
        });

    if (o_nav) {
      //var _animate = {};

//      _animate[o_vertical ? 'left' : 'width'] = o_navBefore && o_vertical ? 0 : width;
//      if (o_vertical) {
//        _animate.height = height;
//      }


      $nav
          .stop()
          .animate(o_vertical ? {
              left: o_navBefore ? -navWidth : width,
              height: height
            } : {
              width: width
            }, time)
          .css(o_vertical ? {
              width: 'auto'
            } : {
              left: 0,
              height: 'auto'
            });

      ////////console.log('resize -> slideNavShaft', {guessIndex: activeIndex, time: time, coo: measures[_side_] / 2});
      slideNavShaft({guessIndex: activeIndex, time: time, coo: measures[_side_] / 2});
      if (o_nav === 'thumbs' && navAppend.done) slideThumbBorder(time);
    }

    /*if (opts.lightbox) lightboxNavDraw();*/

    //if (opts.captions) showCaption();

    //////////////////console.log('measuresSetFLAG', doNotSet || true);
    measuresSetFLAG = setFLAG || true;
    ready();

    return this;
  }

  /**
   * Применяем любые опции после инициализации
   * */
  this.setOptions = function (options) {
    if (!data) return this;

    $.extend(opts, options);

    reset();

    return this;
  }


  function setShadow ($el, edge) {
    $el.removeClass(shadowsLeftClass + ' ' + shadowsRightClass);

    if (edge && !$videoPlaying) {
      $el
          .addClass(edge.replace(/^|\s/g, ' ' + shadowsClass + '--'));
    }
  }

  this.destroy = function () {
    if (!data) return this;
    // Убиваем фотораму.
    // Возвращаем исходное состояние:
    resetFotoramaMargins();
    $fotorama.html(fotoramaData.urtext);

    that.data = data = undefined;
    $.Fotorama.size--;
    return this;
  }

  this.initialize = function (options) {
    if (data) return this;
    // Восстанавливаем фотораму
    fotoramaData.api = undefined;
    $fotorama.fotorama(options);

    return this;
  }

  this.playVideo = function () {
    var dataFrame = that.activeFrame,
        video = dataFrame.video,
        _activeIndex = activeIndex;

    if (typeof video !== 'object' || !dataFrame.videoReady) return this;

    if (o_nativeFullScreen && that.fullScreen) {
      that.cancelFullScreen();
    }

    waitFor(function () {
      return !fullScreenApi.isFullScreen() || _activeIndex !== activeIndex;
    }, function () {
      if (_activeIndex !== activeIndex) return;
      if (!dataFrame.$video) {
        dataFrame.$video = $(VIDEO_IFRAME.replace(X, VIDEO_IFRAME_SRC[video.type].replace(X, video.id)));
      }

      dataFrame.$video.appendTo(dataFrame[stageFrameKey]);

      $wrap.addClass(wrapVideoClass);
      $videoPlaying = dataFrame.$video;
      stageShaftTouchTail.noMove = true;

      //if (opts.captions) showCaption();

      $fotorama.trigger('fotorama:loadvideo');
    });

    return this;
  }

  this.stopVideo = function () {
    unloadVideo($videoPlaying, true, true);
    return this;
  }


  function unloadVideo ($video, unloadActiveFLAG, releaseAutoplayFLAG) {
    if (unloadActiveFLAG) {
      $wrap.removeClass(wrapVideoClass);
      $videoPlaying = false;

      stageNoMove();

      //showArrows();
    }

    if ($video) {
      $video.remove();
      $fotorama.trigger('fotorama:unloadvideo');
    }

    if (releaseAutoplayFLAG) {
      releaseAutoplay();
      changeAutoplay();
    }
  }

  //function toggleTapClass () {
    //$stage.toggleClass(stageTapClass, onStageTap.tap || false);
  //}

  /**
   * Тап по сцене:
   * */
  function onStageTap (e) {
    //if (that.playVideo()) return;

    if ($videoPlaying) {
      unloadVideo($videoPlaying, true, true);
    } else {

      //////console.log('onStageTap', $stage.offset()[_pos] < measures[_side_] / 3);

      that.show({index: e.shiftKey || e[_coo] - $stage.offset()[_pos] < measures[_side_] / 3 ? '<' : '>', slow: e.altKey});
    }


    //onStageTap.tap = !onStageTap.tap;
    //toggleTapClass();
  }

  // Подключаем перелистывание кадров в шахте на сцене
  stageShaftTouchTail = moveOnTouch($stageShaft, {
    onStart: onTouch,
    onMove: function (e, result) {
      setShadow($stage, result.edge);
    },
    onEnd: function(result) {

      setShadow($stage);

      console.log('onEnd result', result);

      //if (result.pos === result.newPos) {
        if (!result.moved) {
          onStageTap(result.startEvent);
          return;
        }

      //}

      var index = getIndexByPos(result.newPos, measures[_side_], MARGIN, repositionIndex);
      that.show({
        index: index,
        time: result.time,
        overPos: result.overPos
      });
    },
    timeLow: 1,
    timeHigh: 1,
    friction: 2,
    select: '.' + selectClass + ', .' + selectClass + ' *',
    //control: '.' + controlClass,
    $wrap: $stage,
    orientation: opts.orientation,
    css3: opts.css3
  });

  // Подключаем таскание шахты в навигации
  navShaftTouchTail = moveOnTouch($navShaft, {
    onStart: onTouch,
    onMove: function (e, result) {
      setShadow($nav, result.edge);
    },
    onEnd: function (result) {
      function onEnd () {
        releaseAutoplay();
        changeAutoplay();
        thumbsDraw(result.newPos, true);
      }

      if (!result.moved) {
        var target = result.$target.closest('.' + navFrameClass, $navShaft).get(0);
        if (!target) return;
//          if (result.$target.is($thumbBorder)) {
//            unloadVideo($videoPlaying, true);
//          }
        //} else {
          onNavFrameClick.call(target, result.startEvent);
        //}
      } else if (result.pos !== result.newPos) {
        ////////////console.log('moveOnTouch onEnd');
        slide($navShaft, {
          time: result.time,
          pos: result.newPos,
          _pos: _pos,
          overPos: result.overPos,
          onEnd: onEnd
        }, opts.css3);
        thumbsDraw(result.newPos);
        setShadow($nav, findShadowEdge(result.newPos, navShaftData.minPos, navShaftData.maxPos));
      } else {
        onEnd();
      }
    },
    timeLow:.5,
    timeHigh: 2,
    friction: 5,
//    control: '.' + navFrameClass,
    $wrap: $nav,
    orientation: opts.orientation,
    css3: opts.css3
  });

  /*function onLightboxNavFrameClick (e) {
    onNavFrameClick.call(this, e, 0);
    that.requestFullScreen();
  }*/

  // Клик по точкам и превьюшкам
  function onNavFrameClick (e, time) {
    var index = $(this).data().eq;
    ////////////console.log('COO', e[_coo], $nav.offset()[_pos], this);
    that.show({index: index, slow: e.altKey, coo: e[_coo] - $nav.offset()[_pos], time: time});
  }

  // Клик по стрелкам
  smartClick($arrs, function (e) {
    e.preventDefault();
    if ($videoPlaying) {
      unloadVideo($videoPlaying, true, true);
    } else {
      that.show({index: $arrs.index(this) ? '>' : '<', slow: e.altKey});
    }
  }, {
    onStart: function (e) {
      onTouch.call(this, e);
      stageShaftTouchTail.control = true;
    },
    tail: stageShaftTouchTail
  });

  // Клик по иконке фуллскрина
  smartClick($fullscreenIcon, function () {
    if (that.fullScreen) {
      that.cancelFullScreen();
    } else {
      that.requestFullScreen();
    }
    releaseAutoplay();
    changeAutoplay();
  }, {
    onStart: function (e) {
      onTouch.call(this, e);
      stageShaftTouchTail.control = true;
    },
    tail: stageShaftTouchTail
  });


  /**
   * Мягкий ресет после каких-нибудь манипуляций
   * */
  function reset () {

    setData();
    setOptions();

    if (!ready.done) {
      // Only first time
      if (opts.hash && location.hash) {
        opts.startIndex = getIndexFromHash(location.hash.replace(/^#/, ''), data, index === 0) || 0;
      }

      if (opts.startIndex === 'random') {
        opts.startIndex = getRandomInt(0, size - 1);
      }
      o_startIndex = o_loop ? normalizeIndex(opts.startIndex) : limitIndex(opts.startIndex);
      if (isNaN(o_startIndex)) {
        var _index = getIndexFromHash(opts.startIndex, data, true);
        o_startIndex = isNaN(_index) ? 0 : _index;
      }

      activeIndex = repositionIndex = dirtyIndex = lastActiveIndex = o_startIndex;
      ////////////console.log('activeIndex', activeIndex);
    }

    if (size) {
      if ($videoPlaying) {
        unloadVideo($videoPlaying, true);
      }
      that.show({index: activeIndex, time: 0});
      that.resize();
    } else {
      that.destroy();
    }

    //////////console.log('RESET');
  }

  /**
   * Создаём пачку методов для добавления и удаления кадров на лету
   * */
  $.each('load push pop shift unshift reverse sort splice'.split(' '), function (i, method) {
    that[method] = function () {
      if (method !== 'load') {
        Array.prototype[method].apply(data, arguments);
      } else if (arguments[0] && typeof arguments[0] === 'object') {
          opts.data = arguments[0];
      }

      reset();

      return that;
    }
  });

  /**
   * Когда Фоторама готова
   * */
  function ready () {
    if (ready.done) return;
    ready.done = true;
    $wrap.removeClass(wrapNotReadyClass);
    $fotorama
        .trigger('fotorama:ready');
  }


  $WINDOW.on('resize', this.resize);

  reset();
  //setTimeout(reset, 0);
}

var methods = {};

// Создаём алиасы публичных методов, для доступа к ним через $(elem).fotorama('method', argument1, argument2, argument3/*, ...*/)
$.each('show resize load push pop shift unshift reverse sort splice setOptions requestFullScreen cancelFullScreen startAutoplay stopAutoplay playVideo stopVideo destroy'.split(' '), function (i, method) {
  methods[method] = function () {
    ////

    var args = arguments;
    return this.each(function (i) {
      if (i && (method === 'load' || method === 'push' || method === 'unshift' || method === 'splice')) return;
      if (i && method === 'setOptions' && typeof args[0] === 'object') args[0].data = null;

      var $fotorama = $(this),
          fotoramaData = $fotorama.data(),
          api = fotoramaData.api;

      if (api) {
        //if (method !== 'destroy') {
          // Вызываем метод
          api[method].apply(api, args);
//        } else {
//          ////
//
//        }
      }
    });
  }
});

// Заворачиваем в джейквери-плагин:
$.fn.fotorama = function (method) {
  if (methods[method]) {
    return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
  } else {
    var opts = method === 'initialize' ? arguments[1] : method;

    return this.each(function () {
      var that = this,
          $fotorama = $(this),
          fotoramaData = $fotorama.data();

      if (!fotoramaData.api) {
        // Если фоторама ещё не инициализирована, включаем её:
        waitFor(function () {
          return !isHidden(that);
        }, function () {
          fotoramaData.urtext = $fotorama.html();
          fotoramaData.api = new $.Fotorama($fotorama,
              /* Иерархия приоритета опций, выше — приоритетней:
               * 1. Дата-атрибуты (<div data-loop="true"></div>)
               * 2. Массив опций при инициализации ($('div').fotorama({loop: false}))
               * 3. Дефолтные значения */
              $.extend(
                  {},
{
  // Настройка по умолчанию.
  loop:false,
  data:null, // [{}, {}, {}]
  startIndex:0, // 'random' || id
  orientation:'horizontal', // 'vertical'
  transition:'slide', // 'crossfade' || 'dissolve'
  css3:true,
  arrows:true,
  keyboard:false,
  fit:'contain', // true || 'cover' || false
  nav:'dots', // 'thumbs' || false
  navPosition:'after', // 'before'
  hash:false,
  allowFullScreen:false, // true || 'native'
  transitionDuration:TRANSITION_DURATION,
  captions:true,
  autoplay:false,
  stopAutoplayOnTouch:true,
  width: null, // 500 || '100%'
  minWidth: null,
  maxWidth: null, // '100%'
  height: null,
  minHeight: null,
  maxHeight: null,
  ratio: null, // '16:9' || 500/333
  thumbWidth: THUMB_SIZE,
  thumbHeight: THUMB_SIZE
},
                  $.extend(
                      {},
                      opts,
                      fotoramaData
                  )
              )
          );

          if (typeof opts === 'object') {
            opts.data = null;
          }
        });
      }
    });
  }
};

//$.Fotorama = {};

// Глобальный массив для хранения адресов загруженных фоток, (чтобы не загружать дважды)
$.Fotorama.cache = {};

var _size = 0;
$.Fotorama.size = 0;
$.Fotorama.api = [];

// Когда DOM готов:
$(function () {
  // Авто-инициализация по классу
  $('.fotorama').fotorama();
});
