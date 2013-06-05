jQuery.Fotorama = function ($fotorama, opts) {

  $HTML = $HTML || $('html');
  $BODY = $BODY || $('body');

  // Блок-спутник для загрузки в нём фотографий и проверки размеров,
  // прямо в фотораме это не всегда удобно делать:
  $.Fotorama.$load = $.Fotorama.$load || $('<div class="' + loadClass+ '"></div>').appendTo($BODY);

  var that = this,
      index = _size,
      stamp = new Date().getTime(),
      fotorama = $fotorama.addClass(_fotoramaClass + stamp)[0],
      data,
      dataFrameCount = 1,
      fotoramaData = $fotorama.data(),
      size,

      // Скелет разметки будущей фоторамы:
      $style = $('<style></style>').insertBefore($fotorama),

      $anchor = $('<div style="display: none;"></div>').insertBefore($fotorama),
      $wrap = $('<div class="' + wrapClass + ' ' + wrapNotReadyClass + '"></div>'),
      $stage = $('<div class="' + stageClass +'"></div>').appendTo($wrap),
      stage = $stage[0],
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
      startIndex = false,

      // Некоторые опции, которые могут измениться:
      o_loop,
      o_nav,
      o_navTop,
      o_allowFullScreen,
      o_nativeFullScreen,
      o_fade,
      o_thumbSide,
      o_thumbSide2,
      lastOptions = {},

      // Размеры сцены:
      measures = {},
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
			wrapAppendedFLAG,

      measuresStash;

  $wrap[stageFrameKey] = $('<div class="' + stageFrameClass +'"></div>');
  $wrap[navThumbFrameKey] = $('<div class="' + navFrameClass + ' ' + navFrameThumbClass + '"><div class="' + thumbClass + '"></div></div>');
  $wrap[navDotFrameKey] = $('<div class="' + navFrameClass + ' ' + navFrameDotClass + '"><div class="' + dotClass + '"></div></div>');


	if (CSS3) {
		$wrap.addClass(wrapCss3Class);
	}

  /* Включаем фотораму */
  $.Fotorama.size++; _size++;
  $.Fotorama.api[index] = this;

  /**
   * Есть ли видео?
   */
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
						console.log('thumbs', thumbs)
					} else {
						dataFrame.thumbsReady = true;
					}
					updateData(data, {img: thumbs.img, thumb: thumbs.thumb}, dataFrame.i, that);
				}
			}
    });
  }

  /**
   * Данные
   * */
  function setData () {
    data = that.data = data && data.length ? data : getDataFromHtml($fotorama);
    size = that.size = data.length;

    checkForVideo();

    activeIndex = limitIndex(activeIndex);
    navAppend.ok = false;

    if (!size) {
      // Если ничего нет, ничего и не показываем
      that.destroy();
    } else if (!wrapAppendedFLAG) {
      // Заменяем содержимое блока:
      $fotorama
					.html('')
					.append($wrap);

			wrapAppendedFLAG = true;
    }
  }

  function stageNoMove () {
    // Запрещаем таскать фотки
		stageShaftTouchTail.noMove = size < 2 || $videoPlaying || o_fade;
  }

  function setAutoplayInterval (interval) {
    if (interval === true) interval = '';
    opts.autoplay = Math.max(Number(interval) || AUTOPLAY_INTERVAL, TRANSITION_DURATION * 3);
  }

  function addOrRemove (FLAG) {
    return FLAG ? 'add' : 'remove';
  }

  /**
   * Options on the fly
   * */
  function setOptions () {
    o_loop = opts.loop && size > 2;

    o_fade = opts.transition === 'crossfade' || opts.transition === 'dissolve';

    var classes = {add: [], remove: []};

    if (size > 1) {
      o_nav = opts.nav;
      o_navTop = opts.navPosition === 'top';
      classes.remove.push(selectClass);

			$arrs.show();
			arrsUpdate();
    } else {
      o_nav = false;

			$arrs.hide();
    }

    if (opts.autoplay) setAutoplayInterval(opts.autoplay);

    o_thumbSide = numberFromMeasure(opts.thumbWidth) || THUMB_SIZE;
    o_thumbSide2 = numberFromMeasure(opts.thumbHeight) || THUMB_SIZE;

    stageNoMove();

    extendMeasures(opts);

    // Создаём или убираем кучу навигационных кадров под точки или превьюшки
    if (o_nav === true || o_nav === 'dots') {
      $nav
          .addClass(navDotsClass)
          .removeClass(navThumbsClass);
      frameDraw(size, 'navDot');
    } else if (o_nav === 'thumbs') {
	    setStyle($style, $.Fotorama.jst.style({thumbWidth: o_thumbSide , thumbHeight: o_thumbSide2, thumbMargin: MARGIN, stamp: stamp}));

      $nav
          .addClass(navThumbsClass)
          .removeClass(navDotsClass);

      frameDraw(size, 'navThumb');
    } else {
      o_nav = false;
      $nav.removeClass(navThumbsClass + ' ' + navDotsClass);
    }

    o_allowFullScreen = opts.allowFullScreen;
    $fotorama
        .insertAfter($anchor)
        .removeClass(hiddenClass);

    if (o_nav && o_navTop) {
      $navWrap.insertBefore($stage);
    } else {
      $navWrap.insertAfter($stage);
    }

    if (o_allowFullScreen) {
      $fullscreenIcon.appendTo($stage);
      o_nativeFullScreen = FULLSCREEN && o_allowFullScreen === 'native';
    } else {
      $fullscreenIcon.detach();
      o_nativeFullScreen = false;
    }

    // Анимация перехода, и соответствующие классы:
    classes[addOrRemove(o_fade)].push(wrapFadeClass);
    classes[addOrRemove(!o_fade && !stageShaftTouchTail.noMove)].push(wrapSlideClass);

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
    return index < 0 ? (size + (index % size)) % size : index >= size ? index % size : index;
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
    stageShaftData.minPos = o_loop ? - Infinity : - getPosByIndex(size - 1, measures.w, MARGIN, repositionIndex);
    stageShaftData.maxPos = o_loop? Infinity : - getPosByIndex(0, measures.w, MARGIN, repositionIndex);
    stageShaftData.snap = measures.w + MARGIN;
  }

  /**
   * Параметры для таскания шахты c точками и превьюшками
   * */
  function setNavShaftMinMaxPos () {
    navShaftData.minPos = Math.min(0, measures.w - $navShaft.width());
    navShaftData.maxPos = 0;

    navShaftTouchTail.noMove = navShaftData.minPos === navShaftData.maxPos;
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
      if (typeof(index) === 'number') {
				var dataFrame = data[normalizeIndex(index)],
						key = '$' + type + 'Frame',
						$frame = dataFrame[key];

				fn.call(this, i, index, dataFrame, $frame, key, $frame && $frame.data());
			}
    });
  }

  function setMeasures (width, height, ratio, index) {
    if (!measuresSetFLAG || (measuresSetFLAG === '*' && index === startIndex)) {
      // Если размеры ещё не определены пытаемся сделать это по первой фотке
      width = measureIsValid(opts.width) || measureIsValid(width) || WIDTH;
      height = measureIsValid(opts.height) || measureIsValid(height) || HEIGHT;
      that.resize({
        width: width,
        ratio: opts.ratio || ratio || width / height
      }, 0, index === startIndex ? true : '*');
    }
  }

  /**
   * Загружает картинки
   * */
  function loadImg(indexes, type, specialMeasures, specialFit, again) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {

      if (!$frame) return;

      var fullFLAG = that.fullScreen && dataFrame.full && !frameData.$full && type === 'stage';

      if (frameData.$img && !again && !fullFLAG) return;

      var img = new Image(),
          $img = $(img),
          imgData = $img.data();

      frameData[fullFLAG ? '$full' : '$img'] = $img;

      var srcKey = type === 'stage' ? (fullFLAG ? 'full' : 'img') : 'thumb',
          src = dataFrame[srcKey],
          dummy = fullFLAG ? null : dataFrame[type === 'stage' ? 'thumb' : 'img'];

      if (type === 'navThumb') $frame = frameData.$wrap;

      function error () {
        console.log('error', index, src);
        // Ошибка
        $img.remove();

        $.Fotorama.cache[src] = 'error';

        // Попытаемся загрузить запасную картинку, если она есть:
        if ((!dataFrame.html || type !== 'stage') && dummy && dummy !== src) {
          dataFrame[srcKey] = src = dummy;
          loadImg([index], type, specialMeasures, specialFit, true);
        } else {
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
        console.log('loaded', index, src);

        // Удачная загрузка:
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
        }, 5);
      }

      if (!src) {
        error();
        return;
      }

      function waitAndLoad () {
        waitFor(function () {
          return !isHidden(img)/* && !touchedFLAG*/;
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
        // Возьмём из кеша
        (function justWait () {
          if ($.Fotorama.cache[src] === 'error') {
            // Ошибка
            error();
          } else if ($.Fotorama.cache[src] === 'loaded') {
            // Усхпех
            waitAndLoad();
          } else {
            // Ждём
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

    if ($frame && !$frame.data().state) {
			krutilka
					.stop()
					.spin($frame[0]);
			$frame.on('f:load f:error', function () {
				$frame.off('f:load f:error');
				krutilka.stop();
			});
		}
  }

  /**
   * Отрисовываем кадр (на сцене или в навигации), загружаем изображение, если требуется, оборачиваем в див.
   * @param {Array} indexes Массив индексов
   * @param {String} type Кадр для сцены — 'stage', для навигации — 'nav'
   * */
  function frameDraw (indexes, type) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {
      console.log('frameDraw');

			if ($frame) return;

			console.log('frameDraw execute');

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
          $('<div class="' + captionClass +'"></div>').append(dataFrame.caption).appendTo($frame);
        }

        if (dataFrame.video) {
          var $oneVideoPlay = $videoPlay.clone();

          smartClick($oneVideoPlay, function () {
              that.playVideo();
            }, {
              onStart: function (e) {
                onTouchStart.call(this, e);
                stageShaftTouchTail.control = true;
              },
              tail: stageShaftTouchTail
            }
          );

          $frame
              .addClass(stageFrameVideoClass)
              .append($oneVideoPlay);
        }

        $stageFrame = $stageFrame.add($frame);
      } else if (type === 'navDot') {
        // Точки

        $navDotFrame = $navDotFrame.add($frame);
      } else if (type === 'navThumb') {
        frameData.$wrap = $frame.children(':first');
        $navThumbFrame = $navThumbFrame.add($frame);
        if (dataFrame.video) {
          $frame.append($videoPlay.clone());
        }
      }
    });
  }

  function callFit ($img, measuresToFit, method) {
		return $img && $img.length && fit($img, measuresToFit, method);
  }

  /**
   * Позиционируем и показываем кадры с определённым индексом.
   * */
  function stageFramePosition (indexes) {
    eachIndex(indexes, 'stage', function (i, index, dataFrame, $frame, key, frameData) {
      if (!$frame) return;

      $frame
          .css($.extend({left: o_fade ? 0 : getPosByIndex(index, measures.w, MARGIN, repositionIndex)}, o_fade && getDuration(0)))
          .fadeTo(0, o_fade && index !== activeIndex ? 0 : 1);

      if (!frameData.appended) {
        $frame.appendTo($stageShaft);
				frameData.appended = true;
				unloadVideo(dataFrame.$video);
      }



			///
//			if (frameData.hidden) {
//				$frame.show();
//				frameData.hidden = false;
//
//			}
			///

      var method = dataFrame.fit || opts.fit;

      callFit(frameData.$img, measures, method);
      callFit(frameData.$full, measures, method);
    });
  }

  function thumbsDraw (pos, loadFLAG) {
    if (o_nav !== 'thumbs' || isNaN(pos)) return;

    var thumbSide = o_thumbSide + MARGIN,
        leftIndex = limitIndex(getIndexByPos(pos + thumbSide, thumbSide)),
        rightIndex = limitIndex(getIndexByPos(pos - measures.w/* - thumbSide*/, thumbSide)),
        specialMeasures = {};

    specialMeasures.w = o_thumbSide;
    specialMeasures.h = o_thumbSide2;

    $navThumbFrame.each(function () {
      var $this = $(this),
          thisData = $this.data(),
          eq = thisData.eq,
          specialFit = 'cover';

      if (eq < leftIndex
					|| eq > rightIndex
					|| callFit(thisData.$img, specialMeasures, specialFit)) return;

			loadFLAG && loadImg([eq], 'navThumb', specialMeasures, specialFit);
    });
  }

  /**
   * Вставляем, удаляем, сортируем точки и превьюшки:
   * */
  function navAppend ($navFrame, $navShaft, mainFLAG) {
    if (!navAppend.ok) {
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
						return actual;
					})
					.sort(function (a, b) {
						return $(a).data().eq - $(b).data().eq;
					})
					.appendTo($navShaft);

			if (mainFLAG) {
				setNavShaftMinMaxPos();
			}

			navAppend.ok = true;
		}
  }

  /**
   * ОБновляем стрелки, дизаблим крайние
   * */
  function arrsUpdate () {
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
    return $navFrame.position().left + (o_thumbSide) / 2
  }

  function slideThumbBorder (time) {
    slide($thumbBorder, {
      time: time * .9,
      pos: getNavFrameCenter(that.activeFrame[navFrameKey])
    });
  }

  function slideNavShaft(options) {
    if (data[options.guessIndex][navFrameKey]) {
      var pos = minMaxLimit(options.coo - getNavFrameCenter(data[options.guessIndex][navFrameKey]), navShaftData.minPos, navShaftData.maxPos),
          time = options.time * .9;
      slide($navShaft, {
        time: time,
        pos: pos,
        onEnd: function () {
          thumbsDraw(pos, true);
        }
      });

      if (time) thumbsDraw(pos);
      setShadow($nav, findShadowEdge(pos, navShaftData.minPos, navShaftData.maxPos));
		}
  }

  /**
   * Обновляем навигацию
   * */
  function navUpdate () {
    console.log('navUpdate', o_nav);
    if (o_nav === 'thumbs') {
      $navFrame = $navThumbFrame;
      navFrameKey = navThumbFrameKey;
    } else if (o_nav) {
      $navFrame = $navDotFrame;
      navFrameKey = navDotFrameKey;
    } else return;

    navAppend($navFrame, $navShaft, true);
    $navFrame.removeClass(activeClass);
    that.activeFrame[navFrameKey].addClass(activeClass);
  }

  /**
   * Позиционируем шахту, чтобы текущий кадр имел нулевую позицию
   * */
  function stageShaftReposition () {
		/*if (touchedFLAG) {
			waitFor(function () {
				return !touchedFLAG;
			}, stageShaftReposition, 100);
			return;
		}*/
		repositionIndex = dirtyIndex = activeIndex;

		var dataFrame = that.activeFrame,
				$frame = dataFrame[stageFrameKey];

		if ($frame) {
			// Скрываем все лишние кадры
			$stageFrame
					.not(that.activeFrame[stageFrameKey].addClass(activeClass))
					//.css({display: 'none'})
					//.hide()
					//.data('hidden', true)
					.detach()
					.data('appended', false)
					.removeClass(activeClass + ' ' + fadeFrontClass + ' ' + fadeRearClass);

			// Возвращаем шахту в начальную позицию
			stop($stageShaft);
			$stageShaft.css(getTranslate(0));

			// Показываем нужные
			stageFramePosition([activeIndex, prevIndex, nextIndex]);
			setStageShaftMinMaxPosAndSnap();
			setNavShaftMinMaxPos();
		}
  }

  function extendMeasures (options) {
		options && $.extend(measures, {
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
    return {
      index: index,
      frame: data[index]
    }
  }

  /*var touchedFLAG; */

	function onTouchStart () {
		/*clearTimeout(onTouchEnd.t);
		touchedFLAG = 1;*/

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
    clearTimeout(changeAutoplay.t);
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

    changeAutoplay.t = setTimeout(function () {
      var frameData = that.activeFrame[stageFrameKey].data();
      waitFor(function () {
        return frameData.state || _activeIndex !== activeIndex;
      }, function () {
        if (pausedAutoplayFLAG || _activeIndex !== activeIndex) return;
        that.show({index: normalizeIndex(activeIndex + 1), auto: true});
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
    if (that.autoplay) {
			pausedAutoplayFLAG = stoppedAutoplayFLAG = true;
			changeAutoplay();
		}
    return this;
  };

  /**
   * Показываем кадр по индексу, или по кодовому символу '>' — вперёд, '<' — назад, '>>' — в конец, '<<' в начало
   * */
  this.show = function (options) {
		var index,
				time = TRANSITION_DURATION,
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
			index = getIndexFromHash(index, data, true) || activeIndex || 0;
		}

		that.activeIndex = activeIndex = o_loop ? normalizeIndex(index) : limitIndex(index);
		prevIndex = getPrevIndex(activeIndex);
		nextIndex = getNextIndex(activeIndex);

		dirtyIndex = o_loop ? index : activeIndex;

		that.activeFrame = activeFrame = data[activeIndex];

		stageFramePosition([dirtyIndex]);
		frameDraw([activeIndex, prevIndex, nextIndex], 'stage'); /////
		unloadVideo(false, activeFrame.i !== data[normalizeIndex(repositionIndex)].i);
		$fotorama.trigger('fotorama:show', options.auto);

		function onEnd () {
			///// frameDraw([activeIndex, prevIndex, nextIndex], 'stage'); /////
			updateFotoramaState();
			loadImg([activeIndex, prevIndex, nextIndex], 'stage');
			stageShaftReposition(); /////

			$fotorama.trigger('fotorama:showend', options.auto);

			opts.hash && showedFLAG && !that.eq && location.replace('#' + (activeFrame.id || activeIndex + 1));

			releaseAutoplay();
			changeAutoplay();

			showedFLAG = true;
		}

		if (!o_fade) {
			slide($stageShaft, {
				pos: - getPosByIndex(dirtyIndex, measures.w, MARGIN, repositionIndex),
				overPos: overPos,
				time: time,
				onEnd: onEnd
			});
		} else {
			var $activeFrame = activeFrame[stageFrameKey],
					$prevActiveFrame = activeIndex !== lastActiveIndex ? data[lastActiveIndex][stageFrameKey] : null;

			fade($activeFrame, $prevActiveFrame, {
				time: time,
				method: opts.transition,
				onEnd: onEnd
			});
		}

		arrsUpdate();
		navUpdate();

		if (o_nav) {
			var guessIndex = limitIndex(activeIndex + minMaxLimit(dirtyIndex - lastActiveIndex, -1, 1)),
					cooUndefinedFLAG = typeof options.coo === 'undefined';

			if (cooUndefinedFLAG || guessIndex !== activeIndex) {
				slideNavShaft({time: time, coo: !cooUndefinedFLAG ? options.coo : measures.w / 2, guessIndex: !cooUndefinedFLAG ? guessIndex : activeIndex});
			}
		}
		if (o_nav === 'thumbs') slideThumbBorder(time);

		lastActiveIndex = activeIndex;

    return this;
  };

  this.requestFullScreen = function () {
    if (o_allowFullScreen && !that.fullScreen) {
			that.fullScreen = true;

			scrollTop = $WINDOW.scrollTop();
			scrollLeft = $WINDOW.scrollLeft();

			$WINDOW.scrollLeft(1).scrollTop(1);

			if (o_nativeFullScreen) {
				fullScreenApi.request(fotorama);
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
  }

  this.cancelFullScreen = function () {
    if (o_nativeFullScreen && fullScreenApi.is()) {
      fullScreenApi.cancel(document);
    } else {
      cancelFullScreen();
    }

    return this;
  };

  if (document.addEventListener) {
    document.addEventListener(fullScreenApi.event, function () {
      if (!fullScreenApi.is() && !$videoPlaying) {
        cancelFullScreen();
      }
    });
  }

  $DOCUMENT.on('keydown', function (e) {
    if ($videoPlaying && e.keyCode === 27) {
      e.preventDefault();
      unloadVideo($videoPlaying, true, true);
    } else if (that.fullScreen || (opts.keyboard && !index)) {
      if (e.keyCode === 27) {
        e.preventDefault();
        that.cancelFullScreen();
      } else if (e.keyCode === 39 || (e.keyCode === 40 && that.fullScreen)) {
				e.preventDefault();
				that.show({index: '>', slow: e.altKey});
      } else if (e.keyCode === 37 || (e.keyCode === 38 && that.fullScreen)) {
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
		extendMeasures(!that.fullScreen ? options : {width: '100%', maxWidth: null, minWidth: null, height: '100%', maxHeight: null, minHeight: null});

		var time = arguments[1] || 0,
				setFLAG = arguments[2],
				width = measures.width,
				height = measures.height,
				ratio = measures.ratio,
				windowHeight = window.innerHeight - (o_nav ? $nav.height() : 0);

		if (measureIsValid(width)) {
			$wrap.css({width: width, minWidth: measures.minWidth, maxWidth: measures.maxWidth});

			width = measures.w = $wrap.width();
			height = numberFromPercent(height) / 100 * windowHeight || numberFromMeasure(height);

			height = height || (ratio && width / ratio);

			if (height) {
				height = measures.h = minMaxLimit(height, numberFromPercent(measures.minHeight) / 100 * windowHeight || numberFromMeasure(measures.minHeight), numberFromPercent(measures.maxHeight) / 100 * windowHeight || numberFromMeasure(measures.maxHeight));

				stageShaftReposition();

				$stage
						.addClass(stageOnlyActiveClass)
						.stop()
						.animate({width: width, height: height}, time, function () {
							$stage.removeClass(stageOnlyActiveClass);
						});

				if (o_nav) {
					$nav
							.stop()
							.animate({width: width}, time)
							.css({left: 0});

					slideNavShaft({guessIndex: activeIndex, time: time, coo: measures.w / 2});
					if (o_nav === 'thumbs' && navAppend.ok) slideThumbBorder(time);
				}
				measuresSetFLAG = setFLAG || true;
				ready();
			}
		}

    return this;
  }

  /**
   * Применяем любые опции после инициализации
   * */
  this.setOptions = function (options) {
		$.extend(opts, options);
		reset();
    return this;
  };


  function setShadow ($el, edge) {

    $el.removeClass(shadowsLeftClass + ' ' + shadowsRightClass);

    if (edge && !$videoPlaying) {
      $el
          .addClass(edge.replace(/^|\s/g, ' ' + shadowsClass + '--'));
    }
  }

  this.destroy = function () {
		// Убиваем фотораму.
		// Возвращаем исходное состояние:
		$wrap.detach();
		$fotorama.html(fotoramaData.urtext);
		wrapAppendedFLAG = false;

		data = that.data = [];
		$.Fotorama.size--;
    return this;
  };

  this.playVideo = function () {
    var dataFrame = that.activeFrame,
        video = dataFrame.video,
        _activeIndex = activeIndex;

    if (typeof video === 'object' && dataFrame.videoReady) {
			o_nativeFullScreen && that.fullScreen && that.cancelFullScreen();

			waitFor(function () {
				return !fullScreenApi.is() || _activeIndex !== activeIndex;
			}, function () {
				if (_activeIndex === activeIndex) {
					dataFrame.$video = dataFrame.$video || $(VIDEO_IFRAME.replace(X, VIDEO_IFRAME_SRC[video.type].replace(X, video.id)));
					dataFrame.$video.appendTo(dataFrame[stageFrameKey]);

					$wrap.addClass(wrapVideoClass);
					$videoPlaying = dataFrame.$video;
					stageShaftTouchTail.noMove = true;

					$fotorama.trigger('fotorama:loadvideo');
				}
			});
		}

    return this;
  };

  this.stopVideo = function () {
    unloadVideo($videoPlaying, true, true);
    return this;
  };


  function unloadVideo ($video, unloadActiveFLAG, releaseAutoplayFLAG) {
    if (unloadActiveFLAG) {
      $wrap.removeClass(wrapVideoClass);
      $videoPlaying = false;

      stageNoMove();
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

	function toggleControlsClass (FLAG) {
		$wrap.toggleClass(wrapNoControlsClass, FLAG);
	}

	$wrap.hover(
		function () {
			toggleControlsClass(false);
		}, function () {
			toggleControlsClass(true);
		}
	);

  /**
   * Тап по сцене:
   * */
  function onStageTap (e, touch) {
    if ($videoPlaying) {
      unloadVideo($videoPlaying, true, true);
    } else {
	    if (touch) {
        toggleControlsClass();
		  } else {
		    that.show({index: e.shiftKey || e._x - $stage.offset().left < measures.w / 3 ? '<' : '>', slow: e.altKey});
	    }
    }
  }

  // Подключаем перелистывание кадров в шахте на сцене
  stageShaftTouchTail = moveOnTouch($stageShaft, {
    onStart: onTouchStart,
    onMove: function (e, result) {
      setShadow($stage, result.edge);
    },
    onEnd: function(result) {
			//onTouchEnd();

	    console.log('onEnd', result);

      setShadow($stage);
      if (result.pos !== result.newPos) {
				var index = getIndexByPos(result.newPos, measures.w, MARGIN, repositionIndex);
				that.show({
					index: index,
					time: result.time,
					overPos: result.overPos
				});
      } else if (!result.aborted) {
				onStageTap(result.startEvent, result.touch);
			}
    },
    timeLow: 1,
    timeHigh: 1,
    friction: 2,
    select: '.' + selectClass + ', .' + selectClass + ' *',
    $wrap: $stage
  });

  // Подключаем таскание шахты в навигации
  navShaftTouchTail = moveOnTouch($navShaft, {
    onStart: onTouchStart,
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
        var target = result.$target.closest('.' + navFrameClass, $navShaft)[0];
				target && onNavFrameClick.call(target, result.startEvent);
      } else if (result.pos !== result.newPos) {
        slide($navShaft, {
          time: result.time,
          pos: result.newPos,
          overPos: result.overPos,
          onEnd: onEnd
        });
        thumbsDraw(result.newPos);
        setShadow($nav, findShadowEdge(result.newPos, navShaftData.minPos, navShaftData.maxPos));
      } else {
        onEnd();
      }
    },
    timeLow: .5,
    timeHigh: 2,
    friction: 5,
    $wrap: $nav
  });

  // Клик по точкам и превьюшкам
  function onNavFrameClick (e, time) {
    var index = $(this).data().eq;
    that.show({index: index, slow: e.altKey, coo: e._x - $nav.offset().left, time: time});
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
      onTouchStart.call(this, e);
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
      onTouchStart.call(this, e);
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

    if (!ready.ok) {
      // Only first time
      if (opts.hash && location.hash) {
        startIndex = getIndexFromHash(location.hash.replace(/^#/, ''), data, index === 0);
      }
      startIndex = (o_loop ? normalizeIndex(startIndex) : limitIndex(startIndex)) || 0;
      activeIndex = repositionIndex = dirtyIndex = lastActiveIndex = startIndex;
    }

    if (size) {
      if ($videoPlaying) {
        unloadVideo($videoPlaying, true);
      }
      that.show({index: activeIndex, time: 0, auto: true});
      that.resize();
    } else {
      that.destroy();
    }
  }

  /**
   * Создаём пачку методов для добавления и удаления кадров на лету
   * */
  $.each('load push pop shift unshift reverse sort splice'.split(' '), function (i, method) {
    that[method] = function () {
      if (method !== 'load') {
        Array.prototype[method].apply(data, arguments);
      } else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].length) {
				data = arguments[0];
      }
      reset();
      return that;
    }
  });

  /**
   * Когда Фоторама готова
   * */
  function ready () {
    if (!ready.ok) {
			ready.ok = true;
			$wrap.removeClass(wrapNotReadyClass);
			$fotorama.trigger('fotorama:ready');
		}
  }

  $WINDOW.on('resize', this.resize);
  reset();
};

// Заворачиваем в джейквери-плагин:
$.fn.fotorama = function (opts) {
    return this.each(function () {
      var that = this,
          $fotorama = $(this),
          fotoramaData = $fotorama.data(),
					api = fotoramaData.api;

      if (!api) {
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
										// dimensions
										width: null, // 500 || '100%'
										minWidth: null,
										maxWidth: null, // '100%'
										height: null,
										minHeight: null,
										maxHeight: null,
										ratio: null, // '16/9' || 500/333

										// navigation, thumbs
										nav: 'dots', // 'thumbs' || false
										navPosition: 'bottom', // 'top'
										thumbWidth: THUMB_SIZE,
										thumbHeight: THUMB_SIZE,

										allowFullScreen: false, // true || 'native'

										fit: 'contain', // true || 'cover' || false

										transition: 'slide', // 'crossfade' || 'dissolve'

										captions: true,

										hash: false,

										autoplay: false,
										stopAutoplayOnTouch: true,

										keyboard: false,

										loop: false
									},
                  $.extend(
                      {},
                      opts,
                      fotoramaData
                  )
              )
          );
        });
      } else {
				api.setOptions(opts);
			}
    });
//  }
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