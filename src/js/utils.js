/**
 * Noop
 * */
function noop () {}

/**
 * Простой лимитер
 * */
function minMaxLimit (value, min, max) {
  return Math.max(typeof min !== 'number' ? -Infinity : min, Math.min(typeof max !== 'number' ? Infinity : max, value));
}

/**
 * Парсит матрицу трансформации элемента,
 * возвращает величину по определённой координате (top или left)
 * */
function readTransform (css) {
  ////////console.log('---readTransform---', css);
  return css.match(/-?\d+/g)[4];
}

/**
 * Функция для чтения актуальной позиции элемента
 * */
function readPosition ($el) {
  if (CSS3) {
    return Number(readTransform($el.css('transform')));
  } else {
    return Number($el.css('left').replace('px', ''));
  }
}

/**
 * Возвращает позицию для использования в .css(), например:
 *   $el.css(getTranslate(100, 'left'));
 * */
function getTranslate (pos) {
  var obj = {};
  if (CSS3) {
    obj.transform = 'translate3d(' + pos + 'px,0,0)';
  } else {
    obj.left = pos;
  }
  return obj;
}

/**
 * Возвращает время анимации для использования в .css(), например:
 *   $el.css(getDuration(333));
 * */
function getDuration (time) {
  return {'transition-duration': time + 'ms'};
}

/**
 * Получаем число N из строки 'Npx'.
 * Можно вычленить любую другую единицу, передав её вторым параметром:
 * numberFromPx()
 * */
function numberFromMeasure (value, measure) {
  value = Number(String(value).replace(measure || 'px', ''));
  return isNaN(value) ? false : value;
}

/**
 * Размер в процентах
 * */
function numberFromPercent (value) {
  var number = numberFromMeasure(value, '%');
  return !!number && /%$/.test(value) ? number : false;
}

/**
 * Можно ли использовать размер, если да — возвращает исходное value
 * */
function measureIsValid (value) {
  return !!numberFromMeasure(value) || !!numberFromMeasure(value, '%') ? value : false;
}

function capitaliseFirstLetter (string) {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Позиция по индексу
 * */
function getPosByIndex (index, side, margin, baseIndex) {
  return (index - (baseIndex || 0)) * (side + (margin || 0));
}

/**
 * Индекс по позиции
 * */
function getIndexByPos (pos, side, margin, baseIndex) {
  return - Math.round(pos / (side + (margin || 0)) - (baseIndex || 0));
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Слушаем событие transitionend,
 * выполняем заданный колбек
 * */
function bindTransitionEnd ($el) {

  var elData = $el.data();

  if (elData.transEnd) return;

  var el = $el[0],
      transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        msTransition: 'MSTransitionEnd',
        transition: 'transitionend'
      };
  el.addEventListener(transitionEndEvent[Modernizr.prefixed('transition')], function (e) {
    var transProp = elData.transProp;
    if (transProp.match(e.propertyName) || transProp.match('all')) {
      elData.transProp = transProp.replace(e.propertyName, '');

      elData.onEndFn.call(this);
    }
  });
  elData.transEnd = true;
}

/**
 * Присваивание колбека для выполнения после завершения анимации
 * */
function afterTransition ($el, fn, time) {
  var done,
      elData = $el.data();

  elData.transProp = $el.css('transition-property');
  elData.onEndFn = function () {
    done = true;
    fn.call(this);
  };

  bindTransitionEnd($el);

  clearTimeout(elData.transTimeout);

  if (!time) return;

  elData.transTimeout = setTimeout(function () {
    // Если не сработал нативный transitionend (а такое бывает),
    // через таймаут вызываем onEndFn насильно:
    if (done) return;
    $el.data().onEndFn = noop;
    fn.call($el[0]);
  }, time * 1.1);
}

/**
 * Универсальная функция для остановки анимируемого объекта,
 * возвращает актуальную позицию
 * */
function stop ($el) {
  if (CSS3) {
    $el.css(getDuration(0));
    afterTransition($el, noop);
  } else {
    $el.stop();
  }
  var lockedLeft = readPosition($el);
  $el.css(getTranslate(lockedLeft));
  return lockedLeft;
}

/**
 * Сопротивление на краях шахты
 * */
function edgeResistance (pos, edge) {
  return Math.round(pos + ((edge - pos) / 1.5));
}

function getProtocol() {
  getProtocol.protocol = getProtocol.protocol || (location.protocol === 'https://' ? 'https://' : 'http://');
  return getProtocol.protocol;
}

function parseHref (href) {
  var a = document.createElement('a');
  a.href = href;
  return a;
}

function findVideoId (href, forceVideo) {
  if (typeof href !== 'string') return href;
  href = parseHref(href);
	href.host = href.host.replace(/^www./, '');

  var id,
      type;

  if (href.host === 'youtube.com' && href.search) {
    id = href.search.split('v=')[1];
    if (id) {
      var ampersandPosition = id.indexOf('&');
      if (ampersandPosition !== -1) {
        id = id.substring(0, ampersandPosition);
      }
      type = 'youtube';
    }
  } else if (href.host === 'youtube.com' || href.host === 'youtu.be') {
    id = href.pathname.replace(/^\/(embed\/|v\/)?/, '').replace(/\/.*/, '');
    type = 'youtube';
  } else if (href.host === 'vimeo.com' || href.host === 'player.vimeo.com') {
    type = 'vimeo';
    id = href.pathname.replace(/^\/(video\/)?/, '').replace(/\/.*/, '');
  }

  if ((!id || !type) && forceVideo) {
    id = href.href;
    type = 'custom';
  }

  return id ? {id: id, type: type} : false;
}

function getVideoThumbs (dataFrame, data, api) {
	console.log('getVideoThumbs');

  var img, thumb, video = dataFrame.video;
  if (video.type === 'youtube') {
    thumb = getProtocol() + 'img.youtube.com/vi/' + video.id + '/default.jpg';
    img = thumb.replace(/\/default.jpg$/, '/hqdefault.jpg');
    dataFrame.thumbsReady = true;
  } else if (video.type === 'vimeo') {
    $.ajax({
      url: getProtocol() + 'vimeo.com/api/v2/video/' + video.id + '.json',
      dataType: 'jsonp',
      success: function(json){
        dataFrame.thumbsReady = true;
        updateData(data, {img: json[0].thumbnail_large, thumb: json[0].thumbnail_small}, dataFrame.i, api);
      }
    });
  } else {
    dataFrame.thumbsReady = true;
  }

  return {
    img: img,
    thumb: thumb
  }
}

function updateData (data, _dataFrame, i, api) {
  for (var _i = 0, _l = data.length; _i < _l; _i++) {
    var dataFrame = data[_i];

    if (dataFrame.i === i && dataFrame.thumbsReady) {

      api.splice(_i, 1, {
        i: i,
        video: dataFrame.video,
        videoReady: true,
        caption: dataFrame.caption,
        img: dataFrame.img || _dataFrame.img,
        thumb: dataFrame.thumb || _dataFrame.thumb
      });

      break;
    }
  }
}

/**
 * Парсим ХТМЛ в массив с данными об изображениях
 * */
function getDataFromHtml ($el) {
  var data = [];

  function getDataFromImg ($img, checkVideo) {
    var imgData = $img.data(),
        $child = $img.children('img').eq(0),
        _imgHref = $img.attr('href'),
        _imgSrc = $img.attr('src'),
        _thumbSrc = $child.attr('src'),
        _video = imgData.video,
        video = checkVideo ? findVideoId(_imgHref, _video === true) : false;

    if (video) {
      _imgHref = false;
    } else {
      video = findVideoId(_video, _video);
    }

    return {
      video: video,
      img: imgData.img || _imgHref || _imgSrc || _thumbSrc,
      thumb: imgData.thumb || _thumbSrc || _imgSrc || _imgHref,
      id: $img.attr('id')
    }
  }

  $el.children().each(function (i) {
    var $this = $(this),
        dataFrame = $this.data();
    if ($this.is('a, img')) {
	    $.extend(dataFrame, getDataFromImg($this, true));
    } else if (!$this.is(':empty')) {
	    dataFrame.html = this;
    } else return;

    data.push(dataFrame);
  });

  return data;
}

/**
 * Проверка видимости элемента (visibility: hidden — это видимый элемент, в данном контексте)
 * Работает в 3-4 раза быстрее джейкверевского ':hidden'
 * */
function isHidden (el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

/**
 * Фунция-посредник, чтобы выполнить другую функцию только, если определённый элемент видим (имеет размеры) на странице
 * */
function waitFor (test, fn, timeout) {
  if (test()) {
    fn();
  } else {
    setTimeout(function () {
      waitFor(test, fn);
    }, timeout || 100);
  }
}

/**
 * Вписывает объект в заданные рамки тремя способами: none, contain и cover
 * */
function fit ($el, measuresToFit, method) {
	console.log('fit');

  var elData = $el.data(),
      measures = elData.measures;

  if (measures && (!elData.l ||
      elData.l.w !== measures.width ||
      elData.l.h !== measures.height ||
      elData.l.r !== measures.ratio ||
      elData.l.W !== measuresToFit.w ||
      elData.l.H !== measuresToFit.h ||
      elData.l.m !== method)) {

		console.log('fit execute', measures, measuresToFit);

    var width = measures.width,
        height = measures.height,
        ratio = measuresToFit.w / measuresToFit.h,
        biggerRatioFLAG = measures.ratio >= ratio,
        fitFLAG = method === true,
        containFLAG = method === 'contain',
        coverFLAG = method === 'cover';

    if (biggerRatioFLAG && (fitFLAG || containFLAG) || !biggerRatioFLAG && coverFLAG) {
      width = minMaxLimit(measuresToFit.w, 0, fitFLAG ? width : Infinity);
      height = width / measures.ratio;
    } else if (biggerRatioFLAG && coverFLAG || !biggerRatioFLAG && (fitFLAG || containFLAG)) {
      height = minMaxLimit(measuresToFit.h, 0, fitFLAG ? height : Infinity);
      width = height * measures.ratio;
    }

    $el.css({
      width: Math.round(width),
      height: Math.round(height),
      marginLeft: Math.round(- width / 2),
      marginTop: Math.round(- height / 2)
    });

    elData.l = {
      w: measures.width,
      h: measures.height,
      r: measures.ratio,
      W: measuresToFit.w,
      H: measuresToFit.h,
      m: method
    }
  }
}

function setStyle ($el, style) {
  var el = $el[0];
  if (el.styleSheet){
    el.styleSheet.cssText = style;
  } else {
    $el.html(style);
  }
}

function findShadowEdge (pos, minPos, maxPos) {
  return minPos === maxPos ? false : pos <= minPos ? 'left' : pos >= maxPos ? 'right' : 'left right';
}

function getIndexFromHash (hash, data, ok) {
  if (!ok) return false;

  var index = Number(hash);
  if (!isNaN(index)) return index - 1;

  for (var _i = 0, _l = data.length; _i < _l; _i++) {
    var dataFrame = data[_i];

    if (dataFrame.id === hash) {
      index = _i;
      break;
    }
  }

  return index;
}

function smartClick ($el, fn, _options) {
  _options = _options || {};

  $el.each(function () {
    var $this = $(this),
        thisData = $this.data(),
        startEvent;

    if (thisData.clickOn) return;

    thisData.clickOn = true;

    $.extend(touch($this, {
      onStart: function (e) {
        startEvent = e;
        (_options.onStart || noop).call(this, e);
      },
      onMove: _options.onMove || noop,
      onEnd: function (result) {
        if (result.moved || _options.tail.checked) return;
        fn.call(this, startEvent);
      }
    }), _options.tail);

  });
}

function preventDefault (e) {
  e.preventDefault();
}

//function stopPropagation (e) {
//  e.stopPropagation();
//}
//
//function noInteraction () {
//  return false;
//}

//function bindNoInteraction ($el) {
//  return $el.each(function () {
//    $(this)
//        .off('mousedown mousemove mouseup')
//        .on('mousedown mousemove mouseup', noInteraction);
//    if (TOUCH) {
//      this.removeEventListener('touchstart', noInteraction);
//      this.removeEventListener('touchmove', noInteraction);
//      this.removeEventListener('touchend', noInteraction);
//      this.addEventListener('touchstart', noInteraction);
//      this.addEventListener('touchmove', noInteraction);
//      this.addEventListener('touchend', noInteraction);
//    }
//  });
//}