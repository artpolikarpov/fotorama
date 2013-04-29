/*!
 * Fotorama 4.0 β | MIT License
 */

!function (window, document, $, undefined) {

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-csstransitions-touch-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */

/* !FOTORAMA: было - window.Modernizr, стало - var Modernizr */
var Modernizr = (function( window, document, undefined ) {

  var version = '2.6.2',

      Modernizr = {},


      docElement = document.documentElement,

      mod = 'modernizr',
      modElem = document.createElement(mod),
      mStyle = modElem.style,

      inputElem  ,


      toString = {}.toString,

      prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



      omPrefixes = 'Webkit Moz O ms',

      cssomPrefixes = omPrefixes.split(' '),

      domPrefixes = omPrefixes.toLowerCase().split(' '),


      tests = {},
      inputs = {},
      attrs = {},

      classes = [],

      slice = classes.slice,

      featureName,


      injectElementWithStyles = function( rule, callback, nodes, testnames ) {

        var style, ret, node, docOverflow,
            div = document.createElement('div'),
            body = document.body,
            fakeBody = body || document.createElement('body');

        if ( parseInt(nodes, 10) ) {
          while ( nodes-- ) {
            node = document.createElement('div');
            node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
            div.appendChild(node);
          }
        }

        style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
        div.id = mod;
        (body ? div : fakeBody).innerHTML += style;
        fakeBody.appendChild(div);
        if ( !body ) {
          fakeBody.style.background = '';
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
        }

        ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
        } else {
          div.parentNode.removeChild(div);
        }

        return !!ret;

      },
      _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

  if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
    hasOwnProp = function (object, property) {
      return _hasOwnProperty.call(object, property);
    };
  }
  else {
    hasOwnProp = function (object, property) {
      return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
    };
  }


  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {

      var target = this;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1),
          bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

          };

      return bound;
    };
  }

  function setCss( str ) {
    mStyle.cssText = str;
  }

  function setCssAll( str1, str2 ) {
    return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
  }

  function is( obj, type ) {
    return typeof obj === type;
  }

  function contains( str, substr ) {
    return !!~('' + str).indexOf(substr);
  }

  function testProps( props, prefixed ) {
    for ( var i in props ) {
      var prop = props[i];
      if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
        return prefixed == 'pfx' ? prop : true;
      }
    }
    return false;
  }

  function testDOMProps( props, obj, elem ) {
    for ( var i in props ) {
      var item = obj[props[i]];
      if ( item !== undefined) {

        if (elem === false) return props[i];

        if (is(item, 'function')){
          return item.bind(elem || obj);
        }

        return item;
      }
    }
    return false;
  }

  function testPropsAll( prop, prefixed, elem ) {

    var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
        props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    if(is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed);

    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }    tests['touch'] = function() {
    var bool;

    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
        bool = node.offsetTop === 9;
      });
    }

    return bool;
  };
  tests['csstransforms3d'] = function() {

    var ret = !!testPropsAll('perspective');

    if ( ret && 'webkitPerspective' in docElement.style ) {

      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
        ret = node.offsetLeft === 9 && node.offsetHeight === 3;
      });
    }
    return ret;
  };


  tests['csstransitions'] = function() {
    return testPropsAll('transition');
  };



  for ( var feature in tests ) {
    if ( hasOwnProp(tests, feature) ) {
      featureName  = feature.toLowerCase();
      Modernizr[featureName] = tests[feature]();

      classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
    }
  }



  Modernizr.addTest = function ( feature, test ) {
    if ( typeof feature == 'object' ) {
      for ( var key in feature ) {
        if ( hasOwnProp( feature, key ) ) {
          Modernizr.addTest( key, feature[ key ] );
        }
      }
    } else {

      feature = feature.toLowerCase();

      if ( Modernizr[feature] !== undefined ) {
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      if (typeof enableClasses !== "undefined" && enableClasses) {
        docElement.className += ' ' + (test ? '' : 'no-') + feature;
      }
      Modernizr[feature] = test;

    }

    return Modernizr;
  };


  setCss('');
  modElem = inputElem = null;


  Modernizr._version      = version;

  Modernizr._prefixes     = prefixes;
  Modernizr._domPrefixes  = domPrefixes;
  Modernizr._cssomPrefixes  = cssomPrefixes;



  Modernizr.testProp      = function(prop){
    return testProps([prop]);
  };

  Modernizr.testAllProps  = testPropsAll;


  Modernizr.testStyles    = injectElementWithStyles;
  Modernizr.prefixed      = function(prop, obj, elem){
    if(!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      return testPropsAll(prop, obj, elem);
    }
  };



  return Modernizr;

})(this, this.document);
var
    fullScreenApi = {
      supportsFullScreen:false,
      isFullScreen:function () {
        return false;
      },
      requestFullScreen:function () {
      },
      cancelFullScreen:function () {
      },
      fullScreenEventName:'',
      prefix:''
    },
    browserPrefixes = 'webkit moz o ms khtml'.split(' ');

// check for native support
if (typeof document.cancelFullScreen != 'undefined') {
  fullScreenApi.supportsFullScreen = true;
} else {
  // check for fullscreen support by vendor prefix
  for (var i = 0, il = browserPrefixes.length; i < il; i++) {
    fullScreenApi.prefix = browserPrefixes[i];

    if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined') {
      fullScreenApi.supportsFullScreen = true;

      break;
    }
  }
}

// update methods to do something useful
if (fullScreenApi.supportsFullScreen) {
  fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

  fullScreenApi.isFullScreen = function () {
    switch (this.prefix) {
      case '':
        return document.fullScreen;
      case 'webkit':
        return document.webkitIsFullScreen;
      default:
        return document[this.prefix + 'FullScreen'];
    }
  };
  fullScreenApi.requestFullScreen = function (el) {
    return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
  };
  fullScreenApi.cancelFullScreen = function (el) {
    return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
  };
}
/* Часто встречающиеся классы */
var stageFrameClass = 'fotorama__stage__frame',
    //stageTapClass = 'fotorama__stage--tap',
    stageFrameActiveClass = stageFrameClass + '--active',
    navFrameActiveClass = 'fotorama__nav__frame--active',
    stageOnlyActiveClass = 'fotorama__stage--only-active',
    wrapNotReadyClass = 'fotorama__wrap--not-ready',
    //controlClass = 'fotorama__control',
    arrClass = 'fotorama__arr',
    arrDisabledClass = 'fotorama__arr--disabled',
    navDotsClass = 'fotorama__nav--dots',
    navThumbsClass = 'fotorama__nav--thumbs',
    navFrameClass = 'fotorama__nav__frame',
    navFrameThumbClass = 'fotorama__nav__frame--thumb',
    wrapNavBeforeClass = 'fotorama__wrap--nav-before',
    fadeFrontClass = 'fotorama__fade-front',
    fadeRearClass = 'fotorama__fade-rear',
    ////wrapSlideClass = 'fotorama__wrap--slide',
    wrapVerticalClass = 'fotorama__wrap--vertical',
    wrapHorizontalClass = 'fotorama__wrap--horizontal',
    wrapCssTransitionsClass = 'fotorama__wrap--css-transitions',
    wrapVideoClass = 'fotorama__wrap--video',
    //wrapNoVideoClass = 'fotorama__wrap--no-video',
    selectClass = 'fotorama__select',
    arrArrClass = 'fotorama__arr__arr',
    errorClass = 'fotorama__error',
    loadingClass = 'fotorama__loading';
    //videoClass = 'fotorama__video';

var $WINDOW = $(window),
    $DOCUMENT = $(document),
    $HTML,
    $BODY,

    //CANVAS = Modernizr.canvas,
    TOUCH = Modernizr.touch,
    //SVG = Modernizr.inlinesvg,
    QUIRKS_FORCE = document.location.hash.replace('#', '') === 'quirks',
    //MOBILE = navigator.userAgent.toLowerCase().match(/(phone|ipod|ipad|windows ce|netfront|playstation|midp|up\.browser|android|mobile|mini|tablet|symbian|nintendo|wii)/),
    //IE = $.browser.msie,
    //IE6 = IE && $.browser.version === '6.0',
    CSSTR = Modernizr.csstransforms3d && Modernizr.csstransitions && !QUIRKS_FORCE,
    FULLSCREEN = fullScreenApi.supportsFullScreen,
    //QUIRKS = document.compatMode !== 'CSS1Compat' && IE,

    TOUCH_TIMEOUT = 300,
    TRANSITION_DURATION = 333,
    SPINNER_COLOR = '#777',
    MARGIN = 2,

    // Размеры на тот случай, если пользователь не укажет и брать не откуда
    WIDTH = 500,
    HEIGHT = 333,

    X = '{{X}}',
    VIDEO_IFRAME = '<div class="fotorama__video"><iframe src="' + X +'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>',
    VIDEO_IFRAME_SRC = {
      vimeo: 'http://player.vimeo.com/video/' + X +'?autoplay=1&amp;badge=0',
      youtube: 'http://www.youtube.com/embed/' + X +'?autoplay=1',
      custom: X
    };

/**
 * Noop
 * */
function noop () {}

/**
 * Ключи к координатам и размерам в зависимости от ориентации фоторамы
 * */
function getOrientationKeys (orientation) {
  if (orientation === 'vertical') {
    return { _pos: 'top',
    _pos2: 'left',
    _coo: 'pageY',
    _coo2: 'pageX',
    _side: 'height',
    _side2: 'width' }
  } else {
    return { _pos: 'left',
      _pos2: 'top',
      _coo: 'pageX',
      _coo2: 'pageY',
      _side: 'width',
      _side2: 'height' }
  }
}

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
function readTransform (css, _pos) {
  
  return css.match(/-?\d+/g)[_pos === 'left' ? 4 : 5];
}

/**
 * Функция для чтения актуальной позиции элемента
 * */
function readPosition ($el, _pos, cssTransitions) {
  if (CSSTR && cssTransitions) {
    return Number(readTransform($el.css('transform'), _pos));
  } else {
    return Number($el.css(_pos).replace('px', ''));
  }
}

/**
 * Возвращает позицию для использования в .css(), например:
 *   $el.css(getTranslate(100, 'left'));
 * */
function getTranslate (pos, _pos, cssTransitions) {
  var obj = {};
  if (CSSTR && cssTransitions) {
    obj.transform = _pos === 'left' ? 'translate3d(' + pos + 'px,0,0)' : 'translate3d(0,' + pos + 'px,0)';
  } else {
    obj[_pos] = pos;
    obj[_pos === 'left' ? 'top' : 'left'] = 0;
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

/**
 * returning innerWidth or innerHeight depends on orientation
 * */
function innerSideMethod (_side) {
  return ('inner' + _side).replace('rw', 'rW').replace('rh', 'rH');
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

  var el = $el.get(0),
      transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd',
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
    ////
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
    ////
    $el.data().onEndFn = noop;
    fn.call($el.get(0));
  }, time * 1.1);
}

/**
 * Универсальная функция для остановки анимируемого объекта,
 * возвращает актуальную позицию
 * */
function stop ($el, _pos, cssTransitions) {
  if (CSSTR && cssTransitions) {
    $el.css(getDuration(0));
    afterTransition($el, noop);
  } else {
    $el.stop();
  }
  var lockedLeft = readPosition($el, _pos, cssTransitions);
  $el.css(getTranslate(lockedLeft, _pos, cssTransitions));
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
  a.host = a.host.replace(/^www./, '');
  return a;
}

function findVideoId (href, forceVideo) {
  if (typeof href === 'undefined') return;
  href = parseHref(href);
  var id, type;
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

function getVideoThumbs (dataFrame, data, i, api) {
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
        ////
        dataFrame.thumbsReady = true;
        updateData(data, {img: json[0].thumbnail_large, thumb: json[0].thumbnail_small}, i, api);
      }
    });
  } else {
    dataFrame.thumbsReady = true;
  }

  //if (img || thumb) {
    return {
      img: img,
      thumb: thumb
    }
  //}
}

function updateData (data, _dataFrame, i, api) {
  ////
  for (var _i = 0, _l = data.length; _i < _l; _i++) {
    var dataFrame = data[_i];

    ////

    if (dataFrame.i === i && dataFrame.thumbsReady) {
      ////

      api.splice(_i, 1, {
        //_imgSrc: dataFrame._imgSrc,
        //_thumbSrc: dataFrame._thumbSrc,
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

    //

    if (video) {
      _imgHref = false;
    } else if (checkVideo) {
      //
      video = findVideoId(_imgSrc, _video === true);
      if (video) {
        _imgSrc = false;
      } else {
        video = findVideoId(_video, _video);
      }
    }

    //

//    if (video && (!imgSrc || !thumbSrc)) {
//      var thumbs = getVideoThumbs(video, data, i, api);
//      imgHref = imgSrc = imgSrc || thumbs.img;
//      thumbSrc = thumbSrc || thumbs.thumb;
//    }

    return {
      //_imgHref: _imgHref,
      //_imgSrc: _imgSrc,
      //_thumbSrc: _thumbSrc,
      video: video,
      img: _imgHref || _imgSrc || _thumbSrc,
      thumb: _thumbSrc || _imgSrc || _imgHref,
      full: $img.attr('data-full') || $child.attr('data-full'),
      caption: $img.attr('data-caption') || $child.attr('data-caption'),
      fit: imgData.fit || $child.data('fit'),
      id: $img.attr('id') || $child.attr('id')
    }
  }

  $el.children().each(function (i) {
    var $this = $(this),
        dataFrame = {};
    if ($this.is('a, img')) {
      dataFrame = getDataFromImg($this, true);
    } else if (!$this.is(':empty')) {
      var $innerImg = $this.children('.fotorama__img').eq(0).detach();
      if ($innerImg.size()) {
        dataFrame = getDataFromImg($innerImg);
      }
      dataFrame.html = this;
      dataFrame.caption = dataFrame.caption || $this.attr('data-caption');
    } else {
      return;
    }
    //dataFrame.i = i;
    data.push(dataFrame);
  });

  return data;
}

/**
 * Проверка видимости элемента (visibility: hidden — это видимый элемент, в данном контексте)
 * Работает в 3-4 раза быстрее джейкверевского ':hidden'
 * */
function isHidden (el) {
  //////

  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

/**
 * Фунция-посредник, чтобы выполнить другую функцию только, если определённый элемент видим (имеет размеры) на странице
 * */
function waitFor (test, fn, timeout) {
  //////
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
function fit ($el, measures, measuresToFit, method) {
  var elData = $el.data();

  if (!elData.last ||
      elData.last.mw !== measures.width ||
      elData.last.mh !== measures.height ||
      elData.last.mr !== measures.ratio ||
      elData.last.mfw !== measuresToFit.width_ ||
      elData.last.mfh !== measuresToFit.height_ ||
      elData.last.mm !== method) {

    ////

    var width = measures.width,
        height = measures.height,
        biggerRatioFLAG = measures.ratio >= measuresToFit.width_ / measuresToFit.height_,
        fitFLAG = method === true,
        containFLAG = method === 'contain',
        coverFLAG = method === 'cover';

    if (biggerRatioFLAG && (fitFLAG || containFLAG) || !biggerRatioFLAG && coverFLAG) {
      width = minMaxLimit(measuresToFit.width_, 0, fitFLAG ? width : Infinity);
      height = Math.round(width / measures.ratio);
    } else if (biggerRatioFLAG && coverFLAG || !biggerRatioFLAG && (fitFLAG || containFLAG)) {
      height = minMaxLimit(measuresToFit.height_, 0, fitFLAG ? height : Infinity);
      width = Math.round(height * measures.ratio);
    }

    $el.css({
      width: width,
      height: height,
      marginLeft: - width / 2,
      marginTop: - height / 2
    });

    elData.last = {
      mw: measures.width,
      mh: measures.height,
      mr: measures.ratio,
      mfw: measuresToFit.width_,
      mfh: measuresToFit.height_,
      mm: method
    }
  }
}

function findShadowEdge (pos, minPos, maxPos) {
  return minPos === maxPos ? false : pos <= minPos ? 'left' : pos >= maxPos ? 'right' : 'left right';
}

function getHashPattern (eq) {
  return new RegExp('(f' + eq + '=)([^&]+)');
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

function setHash (hash, eq) {
  if (eq) return;

  setHash.on = true;

  location.replace(location.protocol
      + '//'
      + location.host
      + location.pathname.replace(/^\/?/, '/')
      + location.search
      + '#' + hash);

  clearTimeout(setHash.timeout);
  setHash.timeout = setTimeout(function () {
    setHash.on = false;
  }, 100);
}

function smartClick ($el, fn, _options) {
  _options = _options || {};

  $el.each(function () {
    var $this = $(this),
        thisData = $this.data(),
        startEvent;

    if (thisData.clickOn) return;

    ////

    thisData.clickOn = true;

    $.extend(touch($this, {
      onStart: function (e) {
        //
        startEvent = e;
        (_options.onStart || noop).call(this, e);
      },
      onMove: _options.onMove || noop,
      onEnd: function (result) {
        if (result.moved || _options.tail.checked) return;

        //
        fn.call(this, startEvent);
      }
    }), _options.tail);

  });
}

function preventDefault (e) {
  e.preventDefault();
}

function stopPropagation (e) {
  e.stopPropagation();
}

function noInteraction () {
  return false;
}

function bindNoInteraction ($el) {
  return $el.each(function () {
    $(this)
        .off('mousedown mousemove mouseup')
        .on('mousedown mousemove mouseup', noInteraction);
    if (TOUCH) {
      this.removeEventListener('touchstart', noInteraction);
      this.removeEventListener('touchmove', noInteraction);
      this.removeEventListener('touchend', noInteraction);
      this.addEventListener('touchstart', noInteraction);
      this.addEventListener('touchmove', noInteraction);
      this.addEventListener('touchend', noInteraction);
    }
  });
}
/* Bez v1.0.10-g5ae0136
 * http://github.com/rdallasgray/bez
 *
 * A plugin to convert CSS3 cubic-bezier co-ordinates to jQuery-compatible easing functions
 *
 * With thanks to Nikolay Nemshilov for clarification on the cubic-bezier maths
 * See http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
 *
 * Copyright 2011 Robert Dallas Gray. All rights reserved.
 * Provided under the FreeBSD license: https://github.com/rdallasgray/bez/blob/master/LICENSE.txt
 */
function bez(coOrdArray) {
  var encodedFuncName = "bez_" + $.makeArray(arguments).join("_").replace(".", "p");
  if (typeof $['easing'][encodedFuncName] !== "function") {
    var polyBez = function (p1, p2) {
      var A = [null, null],
          B = [null, null],
          C = [null, null],
          bezCoOrd = function (t, ax) {
            C[ax] = 3 * p1[ax];
            B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax];
            A[ax] = 1 - C[ax] - B[ax];
            return t * (C[ax] + t * (B[ax] + t * A[ax]));
          },
          xDeriv = function (t) {
            return C[0] + t * (2 * B[0] + 3 * A[0] * t);
          },
          xForT = function (t) {
            var x = t, i = 0, z;
            while (++i < 14) {
              z = bezCoOrd(x, 0) - t;
              if (Math.abs(z) < 1e-3) break;
              x -= z / xDeriv(x);
            }
            return x;
          };
      return function (t) {
        return bezCoOrd(xForT(t), 1);
      }
    };
    $['easing'][encodedFuncName] = function (x, t, b, c, d) {
      return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t / d) + b;
    }
  }
  return encodedFuncName;
}
var BEZIER = bez([.1, 0, .25, 1]);

/**
 * Универсальная функция для анимирования блока (через ЦСС3 или Джейквери),
 * по одному из свойств, top или left
 * */
function slide ($el, options, cssTransitions) {
  var elPos = Math.round(options.pos),
      onEndFn = options.onEnd || noop;

  if (typeof options.overPos !== 'undefined' && options.overPos !== options.pos) {
    elPos = options.overPos;
    onEndFn = function () {
      slide($el, $.extend({}, options, {overPos: options.pos, time: Math.max(TRANSITION_DURATION, options.time / 2)}), cssTransitions)
    };
  }

  var translate = getTranslate(elPos, options._pos, cssTransitions);

  if (CSSTR && cssTransitions) {
    $el
        .css(getDuration(options.time))
        .css(translate);
    if (options.time > 10) {
      afterTransition($el, onEndFn, options.time);
    } else {
      
      onEndFn();
    }
  } else {
    $el.stop().animate(translate, options.time, BEZIER, onEndFn);
  }
}

function fade ($el1, $el2, options, cssTransitions) {
  var _$el1 = $el1, _$el2 = $el2, crossfadeFLAG = options.method === 'crossfade';
  $el1 = $el1 || $($el1);
  $el2 = $el2 || $($el2);

  var onEndFn = function () {
        if (onEndFn.done) return;
        $el1.removeClass(fadeRearClass);
        $el2.removeClass(fadeFrontClass);
        (options.onEnd || noop)();

        onEndFn.done = true;
      },
      duration = getDuration(options.time),
      opacity0 = {opacity: 0},
      opacity1 = {opacity: 1};

  $el1.addClass(fadeRearClass);
  $el2.addClass(fadeFrontClass);

  

  if (CSSTR && cssTransitions) {
    if (_$el2) {
      $el1
          .css(getDuration(0))
          .css(crossfadeFLAG ? opacity0 : opacity1);
    }

    setTimeout(function () {
      $el1
          .css(duration)
          .css(opacity1);

      $el2
          .css(duration)
          .css(opacity0);
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

    //setTimeout(function () {
      $el1
          .stop()
          .fadeTo(options.time, 1, onEndFn);
      $el2
          .stop()
          .fadeTo(options.time, 0, onEndFn);

      if (!_$el1 && !_$el2) onEndFn();
    //}, 4);
  }
}

var lastEvent,
    preventEvent,
    preventEventTimeout;

/**
 * Базовая функция для таскания и швыряния некого элемента.
 * Работает с событиями touchstart, touchmove, touchend на тач-девайсах
 * и mousedown, mousemove, mouseup. Блокирует многопальцевые жесты.
 * На тач-дейвасах может сохранить возможность прокрутки страницы в одном из направлений.
 * Сама функция не перемещает элемент, но предоставляет интерфейс для этого.
 * Имеет три колбека — onStart, onMove, onEnd, в которые (кроме onEnd) первым параметром отдаётся объект
 * события, для непосредственного изменения позиции элемента, this внутри колбеков — это элемент,
 * на котором сработало событие.
 *
 * Пример использования:
 *   touch($('#shaft'), {
 *     onStart: function (e) { // log(e.type) },
 *     onMove: function (e) { ... },
 *     onEnd: function () { ... },
 *     keepTouchScroll: 'y' // or 'x'
 *   });
 *
 * @param $el {jQuery} Джейквери-объект, на котором будут отслеживаться события
 * @param options {Object} Объект с опциями
 */
function touch ($el, options) {
  var el = $el.get(0),
      tail = {},
      touchEnabledFLAG,
      movableFLAG,
      offset,
      width,
      height,
      startEvent,
      eventFlowFLAG,
      movedFLAG,
      $target,
      controlTouch,
      touchFLAG;

  function onStart (e) {
    $target = $(e.target);

    //

    if (touchEnabledFLAG
        || eventFlowFLAG
        || (e.touches && e.touches.length > 1)
        || e.which > 1
        || tail.prevent
        || (lastEvent && lastEvent.type !== e.type && preventEvent)
        || (options.select && $target.is(options.select, el))) return tail.prevent !== true;

    touchFLAG = e.type.match('touch');

    //

    offset = $el.offset();
    width = $el.width();
    height = $el.height();

    tail.checked = movableFLAG = movedFLAG = false;

    lastEvent = e;
    startEvent = e;
    controlTouch = tail.control;

    //////

    (options.onStart || noop).call(el, e, {control: controlTouch, $target: $target});

    touchEnabledFLAG = eventFlowFLAG = true;

    if (!touchFLAG) {
      e.preventDefault();
    }
  }

  function onMove (e) {
    if (!touchEnabledFLAG
        || (e.pageX - offset.left > width
          || e.pageX - offset.left < 0
          || e.pageY - offset.top > height
          || e.pageY - offset.top < 0)
        || (e.touches && e.touches.length > 1)) {
      onEnd();
      return;
    }

    ////

    var xDiff = Math.abs(e.pageX - startEvent.pageX),
        yDiff = Math.abs(e.pageY - startEvent.pageY),
        xyDiff = xDiff - yDiff,
        xWin = xyDiff >= 3,
        yWin = xyDiff <= -3;

    if (!movedFLAG) {
      movedFLAG = !tail.noMove && !(!xWin && !yWin);
    }

    if (touchFLAG && !tail.checked) {
      if (xWin || yWin) {
        tail.checked = true;
        movableFLAG = tail.orientation === 'horizontal' ? xWin : yWin;
      }

      if (!tail.checked || movableFLAG) {
        //////
        e.preventDefault();
      }
    } else if (!touchFLAG || movableFLAG) {
      ////
      e.preventDefault();
      (options.onMove || noop).call(el, e);
    } else {
      touchEnabledFLAG = false;
    }

    tail.checked = tail.checked || xWin || yWin;
  }

  function onEnd (e) {
    eventFlowFLAG = tail.control = false;
    if (!touchEnabledFLAG) return;
    if (e && e.preventDefault) e.preventDefault();
    ////
    preventEvent = true;
    ////
    clearTimeout(preventEventTimeout);
    preventEventTimeout = setTimeout(function () {
      preventEvent = false;
      ////
    }, 1000);
    (options.onEnd || noop).call(el, {moved: !!movedFLAG, $target: $target, control: controlTouch, startEvent: startEvent});
    touchEnabledFLAG = false;
  }


  if (TOUCH) {
    el.addEventListener('touchstart', onStart);
    el.addEventListener('touchmove', onMove);
    el.addEventListener('touchend', onEnd);
  }

  $el.on('mousedown', onStart);
  $DOCUMENT
      .on('mousemove', onMove)
      .on('mouseup', onEnd);

  $el.on('click', 'a', function (e) {
    //////
    // Клик по ссылкам только если не начато перетаскивание
    if (tail.checked) e.preventDefault();
  });


  // Возвращаем хвостик, чтобы управлять некоторыми параметрами в будущем,
  // например ориентацией
  return tail;
}
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
  var el = $el.get(0),
      elData = $el.data(),
      orientationKeys = getOrientationKeys(options.orientation),
      tail = {
        _coo: orientationKeys._coo,
        _pos: orientationKeys._pos,
        cssTransitions: options.cssTransitions
      },
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
      controlFLAG;

  function startTracking (e) {
    startCoo = coo = e[tail._coo];

    // Начинаем запись маршрута курсора
    moveTrack = [[new Date().getTime(), startCoo]];

    startElPos = moveElPos = stop($el, tail._pos, tail.cssTransitions);

    (options.onStart || noop).call(el, e, {pos: startElPos});
  }

  function onStart (e, result) {

    minPos = elData.minPos;
    maxPos = elData.maxPos;
    snap = elData.snap;

    slowFLAG = e.altKey;



    

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

    coo = e[tail._coo];

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
      $el.css(getTranslate(moveElPos, tail._pos, tail.cssTransitions));
    }

    (options.onMove || noop).call(el, e, {pos: moveElPos, edge: edge});
  }

  function onEnd (result) {
    if (controlFLAG) return;

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

    (options.onEnd || noop).call(el, {pos: moveElPos, newPos: newPos, overPos: overPos, time: time, moved: result.moved, $target: result.$target, startEvent: result.startEvent});
  }

  tail = $.extend(touch(options.$wrap, {
    onStart: onStart,
    onMove: onMove,
    onEnd: onEnd,
//    orientation: options.orientation,
    select: options.select,
    control: options.control
  }), tail);

  return tail;
}
//fgnass.github.com/spin.js#v1.2.6

/* !FOTORAMA: добавил var Spinner для локального доступа, убрал ! перед function */
var Spinner;

!function (window, document, undefined) {

  /**
   * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
   * Licensed under the MIT license
   */

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
      , animations = {} /* Animation rules keyed by their name */
      , useCssAnimations

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
        , n

    for (n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = function () {
    var el = createEl('style', {type:'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }()

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
        , start = 0.01 + i / lines * 100
        , z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha)
        , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
        , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
          '@' + pre + 'keyframes ' + name + '{' +
              '0%{opacity:' + z + '}' +
              start + '%{opacity:' + alpha + '}' +
              (start + 0.01) + '%{opacity:1}' +
              (start + trail) % 100 + '%{opacity:' + alpha + '}' +
              '100%{opacity:' + z + '}' +
              '}', sheet.cssRules.length)

      animations[name] = 1
    }
    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   **/
  function vendor(el, prop) {
    var s = el.style
        , pp
        , i

    if (s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i] + prop
      if (s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n) || n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while ((el = el.offsetParent))
      o.x += el.offsetLeft, o.y += el.offsetTop

    return o
  }

  var defaults = {
    lines:12, // The number of lines to draw
    length:7, // The length of each line
    width:5, // The line thickness
    radius:10, // The radius of the inner circle
    rotate:0, // Rotation offset
    corners:1, // Roundness (0..1)
    color:'#000', // #rgb or #rrggbb
    speed:1, // Rounds per second
    trail:100, // Afterglow percentage
    opacity:1 / 4, // Opacity of the lines
    fps:20, // Frames per second when using setTimeout()
    zIndex:2e9, // Use a high z-index by default
    className:'spinner', // CSS class to assign to the element
    top:'auto', // center vertically
    left:'auto'          // center horizontally
  }

  /** The constructor */
  /* !FOTORAMA: убрал имя функции Spinner */
  Spinner = function (o) {
    if (!this.spin) return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  Spinner.defaults = {}

  merge(Spinner.prototype, {
    spin:function (target) {
      this.stop()
      var self = this
          , o = self.opts
          , el = self.el = css(createEl(0, {className:o.className}), {position:'relative', width:0, zIndex:o.zIndex})
          , mid = o.radius + o.length + o.width
          , ep // element position
          , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild || null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left:(o.left == 'auto' ? tp.x - ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top:(o.top == 'auto' ? tp.y - ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid) + 'px'
        })
      }

      el.setAttribute('aria-role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
            , fps = o.fps
            , f = fps / o.speed
            , ostep = (1 - o.opacity) / (f * o.trail / 100)
            , astep = f / o.lines

            ;
        (function anim() {
          i++;
          for (var s = o.lines; s; s--) {
            var alpha = Math.max(1 - (i + s * astep) % f * ostep, o.opacity)
            self.opacity(el, o.lines - s, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
        })()
      }
      return self
    },

    stop:function () {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    lines:function (el, o) {
      var i = 0
          , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position:'absolute',
          width:(o.length + o.width) + 'px',
          height:o.width + 'px',
          background:color,
          boxShadow:shadow,
          transformOrigin:'left',
          transform:'rotate(' + ~~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.radius + 'px' + ',0)',
          borderRadius:(o.corners * o.width >> 1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position:'absolute',
          top:1 + ~(o.width / 2) + 'px',
          transform:o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity:o.opacity,
          animation:useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top:2 + 'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    opacity:function (el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })

    /////////////////////////////////////////////////////////////////////////
    // VML rendering for IE
    /////////////////////////////////////////////////////////////////////////

  /**
   * Check and init VML support
   */
  ;
  (function () {

    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    var s = css(createEl('group'), {behavior:'url(#default#VML)'})

    if (!vendor(s, 'transform') && s.adj) {

      // VML support detected. Insert CSS rule ...
      sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

      Spinner.prototype.lines = function (el, o) {
        var r = o.length + o.width
            , s = 2 * r

        function grp() {
          return css(
              vml('group', {
                coordsize:s + ' ' + s,
                coordorigin:-r + ' ' + -r
              }),
              { width:s, height:s }
          )
        }

        var margin = -(o.width + o.length) * 2 + 'px'
            , g = css(grp(), {position:'absolute', top:margin, left:margin})
            , i

        function seg(i, dx, filter) {
          ins(g,
              ins(css(grp(), {rotation:360 / o.lines * i + 'deg', left:~~dx}),
                  ins(css(vml('roundrect', {arcsize:o.corners}), {
                    width:r,
                    height:o.width,
                    left:o.radius,
                    top:-o.width >> 1,
                    filter:filter
                  }),
                      vml('fill', {color:o.color, opacity:o.opacity}),
                      vml('stroke', {opacity:0}) // transparent stroke to fix color bleeding upon opacity change
                  )
              )
          )
        }

        if (o.shadow)
          for (i = 1; i <= o.lines; i++)
            seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

        for (i = 1; i <= o.lines; i++) seg(i)
        return ins(el, g)
      }

      Spinner.prototype.opacity = function (el, i, val, o) {
        var c = el.firstChild
        o = o.shadow && o.lines || 0
        if (c && i + o < c.childNodes.length) {
          c = c.childNodes[i + o];
          c = c && c.firstChild;
          c = c && c.firstChild
          if (c) c.opacity = val
        }
      }
    }
    else
      useCssAnimations = vendor(s, 'animation')
  })()

  /* !FOTORAMA: закомментировал для исключительно локального доступа */
//	if (typeof define == 'function' && define.amd)
//		define(function() { return Spinner })
//	else
//		window.Spinner = Spinner

}(window, document)
jQuery.Fotorama = function ($fotorama, options) {

  var that = this,
      fotorama = $fotorama.get(0),
      data,
      dataFrameCount = 0,
      fotoramaData = $fotorama.data(),
      size,

      // Скелет разметки будущей фоторамы:
      $anchor = $('<div style="display: none;"></div>').insertBefore($fotorama),
      $wrap = $('<div class="fotorama__wrap ' + wrapNotReadyClass + '"></div>'),
      $stage = $('<div class="fotorama__stage"></div>').appendTo($wrap),
      stage = $stage.get(0),
      $stageShaft = $('<div class="fotorama__stage__shaft"></div>').appendTo($stage),
      $stageFrame = $(),
      $arrPrev = $('<div class="' + arrClass + ' fotorama__arr--prev"><div class="' + arrArrClass + '"></div></div>'),
      $arrNext = $('<div class="' + arrClass + ' fotorama__arr--next"><div class="' + arrArrClass + '"></div></div>'),
      $arrs = $arrPrev.add($arrNext).appendTo($stage),
      $caption = $('<div class="fotorama__caption"></div>').appendTo($stage),
      $captionInner = $('<div class="fotorama__caption__inner"></div>').appendTo($caption),
      $nav = $('<div class="fotorama__nav"></div>'),
      $navShaft = $('<div class="fotorama__nav__shaft"></div>').appendTo($nav),
      $navFrame,
      $navDotFrame = $(),
      $navThumbFrame = $(),
      stageFrameKey = '$stageFrame',
      navFrameKey,
      navDotFrameKey = '$navDotFrame',
      navThumbFrameKey = '$navThumbFrame',

      stageShaftData = $stageShaft.data(),
      navShaftData = $navShaft.data(),

      $shadows = bindNoInteraction($('<div class="fotorama__shadow fotorama__shadow--left"></div><div class="fotorama__shadow fotorama__shadow--right"></div>').appendTo($stage)),
      $navShadows = bindNoInteraction($shadows.clone().appendTo($nav)),

      $thumbBorder = $('<div class="fotorama__thumb-border"></div>').appendTo($navShaft),

      $fullscreenIcon = $('<div class="fotorama__fullscreen"></div>'),
      $videoPlay = $('<div class="fotorama__video-play"></div>'),
      $videoClose = $('<div class="fotorama__video-close"></div>').appendTo($stage),


      $videoPlaying,

      // Индексы на все случаи:
      activeIndex = false,
      repositionIndex,
      dirtyIndex,
      lastActiveIndex,
      prevIndex,
      nextIndex,

      // Некоторые опции, которые могут измениться:
      o_loop,
      o_vertical,
      o_fit,
      o_nav,
      o_navBefore,
      o_arrows,
      o_startIndex = false,
      o_nativeFullScreen,
      o_fade,
      lastOptions = {},

      // Ключи к ориентации Фоторамы, горизонтальной или вертикальной
      orientation,
      _pos,
      _pos2,
      _coo,
      _side,
      _side_,
      _innerSide,
      _side2,
      _side2_,
      _innerSide2,

      // Размеры сцены:
      measures = {},
      measuresSetFLAG,
      _measuresSetFLAG,

      // Крутилка:
      krutilka = {},

      stageShaftTouchTail = {},
      navShaftTouchTail = {},

      // Разные вспомогательные переменнные:
      scrollTop,
      scrollLeft,
      showedFLAG,

      measuresStash;

  $wrap[stageFrameKey] = $('<div class="' + stageFrameClass +'"></div>');
  $wrap[navThumbFrameKey] = $('<div class="' + navFrameClass + ' ' + navFrameThumbClass + '"><div class="fotorama__thumb"></div></div>');
  $wrap[navDotFrameKey] = $('<div class="' + navFrameClass + ' fotorama__nav__frame--dot"><div class="fotorama__dot"></div></div>');

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
    data = fotoramaData.data = options.data && typeof options.data === 'object' ? options.data : data || getDataFromHtml($fotorama);
    size = fotoramaData.size = data.length;

    checkForVideo();

    activeIndex = limitIndex(activeIndex);
    navAppend.done = false;

    if (!size) {
      // Если ничего нет, ничего и не показываем
      that.destroy();
    } else if (!setData.called) {
      setData.called = true;
      // Заменяем содержимое блока:
      $fotorama.html($wrap);
    }
  }

  function stageNoMove () {
    // Запрещаем таскать фотки
    stageShaftTouchTail.noMove = size < 2 || $videoPlaying || o_fade;
  }

  /**
   * Опции и всё, что от них зависит
   * */
  function setOptions () {
    o_loop = options.loop && size > 2;
    o_vertical = options.orientation === 'vertical';
    o_fit = options.flexible && !fotoramaData.fullscreen ? false : options.fit;

    o_fade = options.transition === 'crossfade' || options.transition === 'dissolve';

    var classes = {add: [], remove: []};

    if (size > 1) {
      o_nav = options.nav;
      o_navBefore = options.navPosition === 'before';
      o_arrows = options.arrows;
      classes.remove.push(selectClass);
    } else {
      o_nav = o_arrows = false;
      //classes.add.push(selectClass);
    }

    orientation = getOrientationKeys(options.orientation);
    _pos = orientation._pos;
    _pos2 = orientation._pos2;
    _coo = orientation._coo;
    _side = orientation._side;
    _side_ = _side + '_';
    _innerSide = innerSideMethod(_side);
    _side2 = orientation._side2;
    _side2_ = _side2 + '_';
    _innerSide2 = innerSideMethod(_side2);

    // В хвостике для доступа к touch.js и moveontouch.js
    // меняем необходимые параметры
    stageShaftTouchTail._pos = navShaftTouchTail._pos = _pos;
    stageShaftTouchTail._coo = navShaftTouchTail._coo = _coo;
    stageShaftTouchTail.orientation = navShaftTouchTail.orientation = options.orientation;
    stageShaftTouchTail.cssTransitions = navShaftTouchTail.cssTransitions = options.cssTransitions;

    stageNoMove();


    ////////

    extendMeasures(options);

    ////////

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

      ////
      frameDraw(size, 'navThumb');
      //smartClick($navThumbFrame, onNavFrameClick, {tail: navShaftTouchTail});
    } else {
      o_nav = false;
      $nav.removeClass(navThumbsClass + ' ' + navDotsClass);
    }

    if (o_nav && o_navBefore) {
      classes.add.push(wrapNavBeforeClass);
      $nav.insertBefore($stage);
    } else {
      classes.remove.push(wrapNavBeforeClass);
      $nav.insertAfter($stage);
    }

    if (options.allowFullScreen) {
      $fullscreenIcon.appendTo($stage);
      o_nativeFullScreen = FULLSCREEN && options.allowFullScreen === 'native';
    } else {
      $fullscreenIcon.detach();
      o_nativeFullScreen = false;
    }

    // Анимация перехода, и соответствующие классы:
    classes[o_fade ? 'add' : 'remove'].push('fotorama__wrap--fade');

    if (o_arrows) {
      $arrs.show();
      arrsUpdate();
    } else {
      $arrs.hide();
    }

    // Переворачиваем фотораму, если нужно
    classes[o_vertical ? 'add' : 'remove'].push(wrapVerticalClass);
    classes[o_vertical ? 'remove' : 'add'].push(wrapHorizontalClass);

    // Тени
    ////classes[options.shadows ? 'add' : 'remove'].push('fotorama__wrap--shadows');

    // Если ЦСС-транзишны поддерживаются и не отменены пользователем
    ////
    if (lastOptions.cssTransitions !== options.cssTransitions) {
      if (CSSTR && options.cssTransitions) {
        ////

        classes.add.push(wrapCssTransitionsClass);

        $stageShaft.add($navShaft).add(o_nav === 'thumbs' ? $thumbBorder : null).each(function () {
          var $this = $(this);
          $this
              .css(getTranslate(Number($navShaft.css(_pos).replace('px', '')), _pos, options.cssTransitions))
              .css({top: 0, left: 0});
        });
      } else {
        ////

        classes.remove.push(wrapCssTransitionsClass);

        $stageShaft.add($navShaft).add(o_nav === 'thumbs' ? $thumbBorder : null).each(function () {
          var $this = $(this);
          $this
              .css(CSSTR && lastOptions.cssTransitions ? getTranslate(Number(readTransform($this.css('transform'), _pos)), _pos, options.cssTransitions) : {})
              .css({transform: 'none', transition: '0ms'});
        });
      }
    }

    if (TOUCH) {
      classes.add.push('fotorama__wrap--touch');
    }

    if (krutilka.stop) {
      krutilka.stop();
    }
    krutilka = new Spinner({length: 8, radius: 6, width: 2, color: SPINNER_COLOR, rotate: 15});

    // Одним скопом удаляем и добавляем классы:
    $wrap
        .addClass(classes.add.join(' '))
        .removeClass(classes.remove.join(' '));

    lastOptions = $.extend({}, options);
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
   * Ограничиваем «грязный индекс»,
   * чтобы перелистывания с большим шагом, сокращались до двух кадров
   * */
//  function limitDirtyIndex (index) {
//    return minMaxLimit(index, repositionIndex - 2, repositionIndex + 2)
//  }

  /**
   *
   */
//  function isFarAway (index) {
//    return index < repositionIndex - 1 || index > repositionIndex + 1
//  }

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
    
    navShaftData.minPos = Math.min(0, measures[_side_] - $navShaft[_side]());
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
      if (typeof(index) !== 'number') return;

      var dataFrame = data[normalizeIndex(index)],
          key = '$' + type + 'Frame',
          $frame = dataFrame[key];

      fn.call(this, i, index, dataFrame, $frame, key, $frame ? $frame.data() : undefined);
    });
  }

  /**
   * Загружает картинки
   * */
  function loadImg(indexes, type, specialMeasures, specialFit, again) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {

      var fullFLAG = fotoramaData.fullscreen && dataFrame.full && !frameData.$full && type === 'stage';

      if (!(!frameData.$img || again || fullFLAG)) return;

//      if (fullFLAG && _$img) {
//        var _measures = _$img.data().measures;
//        if (typeof _measures === 'object' && (_measures.width >= _$img.width())) return;
//      }

      

      var img = new Image(),
          $img = $(img);

      frameData[fullFLAG ? '$full' : '$img'] = $img;

      var srcKey = type === 'stage' ? (fullFLAG ? 'full' : 'img') : 'thumb',
          src = dataFrame[srcKey],
          dummy = fullFLAG ? false : dataFrame[type === 'stage' ? 'thumb' : 'img'];

      if (type === 'navThumb') $frame = frameData.$wrap;

      function error () {
        ////
        // Ошибка
        $img.remove();

        $.Fotorama.cache[src] = 'error';

        // Попытаемся загрузить запасную картинку, если она есть:
        if (dummy && dummy !== src) {
          dataFrame[srcKey] = src = dummy;
          loadImg([index], type, specialMeasures, specialFit, true);
        } else {
          ////

          $frame
              .trigger('f:error')
              .removeClass(loadingClass)
              .addClass(errorClass);

          // Записываем в кеш, что картинка загрузилась:
          frameData.state = 'error';

          if (size > 1 && !frameData.$html && !dataFrame.deleted && !dataFrame.video && !fullFLAG) {
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


        var $html = $(frameData.$html).children();

        //////////
        // Кешируем оригинальные размеры картинки

        var width = $img.width() || numberFromMeasure($html.attr('data-width')) || WIDTH,
            height = $img.height() || numberFromMeasure($html.attr('data-height')) || HEIGHT,
            imgMeasures = {
              width: width,
              height: height
            },
            ratio = imgMeasures.ratio = imgMeasures.width / imgMeasures.height;

        $img.data().measures = imgMeasures;

        //////////

        if (!measuresSetFLAG || (_measuresSetFLAG === '*' && index === o_startIndex) || (options.flexible && !fotoramaData.fullscreen && index === activeIndex) || !measures.ratio) {
          //////////
          // Если размеры ещё не определены пытаемся сделать это по первой фотке
          that.resize(options.flexible && !fotoramaData.fullscreen ? imgMeasures : {
            width: measureIsValid(options.width) || imgMeasures.width,
            ratio: ratio
          }, measuresSetFLAG && options.flexible && !fotoramaData.fullscreen ? options.transitionDuration : 0, _measuresSetFLAG = index === o_startIndex ? true : '*');
        }

        //

        // Вставляем в контейнер:
        $img.off('load error');

        if (!dataFrame.noImg) {
          $img
              .addClass('fotorama__img' + (fullFLAG ? ' fotorama__img--full' : ''))
              .prependTo($frame);

          fit($img, imgMeasures, specialMeasures || measures, specialFit || dataFrame.fit || (fotoramaData.fullscreen ? options.fit : o_fit));
        }

//        if (fullFLAG) {
//          if (frameData.$img) {
//            frameData.$img.remove();
//          }
//          frameData.$img = $img;
//        }

        // Записываем в кеш, что картинка загрузилась:

        if (!dataFrame.noImg) $.Fotorama.cache[src] = 'loaded';
        frameData.state = 'loaded';

        setTimeout(function () {
          $frame
              .trigger('f:load')
              .removeClass(loadingClass + ' ' + errorClass)
              .addClass('fotorama__loaded ' + (fullFLAG ? 'fotorama__loaded--full' : 'fotorama__loaded--img'));


          if (type === 'stage') {
            $fotorama.trigger('fotorama:load', eventData(normalizeIndex(index)));
          }
        }, 4);
      }

      if (!src && !dummy) {
        $img.remove();
        dataFrame.noImg = true;
        //if (!dataFrame.video) {
          loaded();
        //}
        return;
      }

      function waitAndLoad () {
        waitFor(function () {
          return !isHidden(img);
        }, function () {
          loaded();
        });
      }

      // Вставляем в лоадер:



      if (!$.Fotorama.cache[src]) {
        //

        // Если адреса картинки в кеше нет,
        // загружаем картинку:
        ////
        $.Fotorama.cache[src] = '*';

        $img
            .on('load', waitAndLoad)
            .on('error', error);
      } else {
        // Возьмём из кеша
        ////
        (function justWait () {
          if ($.Fotorama.cache[src] === 'error') {
            // Ошибка
            ////
            error();
          } else if ($.Fotorama.cache[src] === 'loaded') {
            // Усхпех
            //////
            waitAndLoad();
          } else {
            // Ждём
            //////
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
    var $frame = data[activeIndex][stageFrameKey];

    if (!$frame || $frame.data().state) return;

    krutilka
        .stop()
        .spin($frame.get(0));
    $frame.on('f:load f:error', function () {
      //////////////
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
          var $html = frameData.$html = $('<div class="fotorama__html"></div>').append(dataFrame.html);
          $frame.append($html);
        }

        if (dataFrame.video) {
          var $oneVideoPlay = $videoPlay.clone();

          smartClick($oneVideoPlay, function () {
              loadVideo();
            }, {
              onStart: function () {
                stageShaftTouchTail.control = true;
              },
              tail: stageShaftTouchTail
            }
          );

          $frame.addClass(stageFrameClass + '--video')
              .append($oneVideoPlay);
        }

        $stageFrame = $stageFrame.add($frame);
      } else if (type === 'navDot') {
        // Точки

        // TODO: превьюшки
        $navDotFrame = $navDotFrame.add($frame);

        //////////////
      } else if (type === 'navThumb') {
        frameData.$wrap = $frame.children(':first');
        $navThumbFrame = $navThumbFrame.add($frame);
        if (dataFrame.video) {
          $frame.append($videoPlay.clone());
        }
      }
    });
  }

  /**
   * Позиционируем и показываем кадры с определённым индексом.
   * */
  function stageFramePosition (indexes) {
    eachIndex(indexes, 'stage', function (i, index, dataFrame, $frame, key, frameData) {
      if (!$frame) return;

      //////

      $frame
          .css(_pos, o_fade ? 0 : getPosByIndex(index, measures[_side_], MARGIN, repositionIndex))
          .css(_pos2, 0);

      $frame.fadeTo(0, o_fade && index !== activeIndex ? 0 : 1);

      if (!frameData.appended) {
        frameData.appended = true;
        $frame.appendTo($stageShaft);
        unloadVideo(dataFrame.$video);
      }

      function callFit ($img) {
        if ($img && $img.size()) {
          var imgMeasures = $img.data().measures;
          if (!imgMeasures) return;
          fit($img, imgMeasures, measures, dataFrame.fit || (fotoramaData.fullscreen ? options.fit : o_fit));
        }
      }

      callFit(frameData.$img);
      callFit(frameData.$full);

    });
  }

  function thumbsDraw (pos, loadFLAG) {
    ////
    if (o_nav !== 'thumbs' || isNaN(pos)) return;

    var $sampleThumb = $('.' + navFrameThumbClass + ':eq(1)', $nav),
        thumbSide = $sampleThumb[_innerSide](),
        thumbImgSide = $sampleThumb.data().$wrap[_innerSide](),
        startIndex = limitIndex(getIndexByPos(pos + thumbSide, thumbSide)),
        stopIndex = limitIndex(getIndexByPos(pos - measures[_side_] - thumbSide, thumbSide));

    ////
    ////

    $navThumbFrame.each(function () {
      var $this = $(this),
          thisData = $this.data(),
          eq = thisData.eq,
          specialMeasures = {width_: thumbImgSide, height_: thumbImgSide},
          specialFit = 'cover';

      if (eq < startIndex || eq > stopIndex) return;

      var $img = thisData.$img;

      if ($img && $img.size()) {
        var measures = $img.data().measures;
        if (measures) {
          fit($img, measures, specialMeasures, specialFit);
        }
      }

      if (loadFLAG) {
        
        loadImg([eq], 'navThumb', specialMeasures, specialFit);
      }
    });
  }

  /**
   * Вставляем, удаляем, сортируем точки и превьюшки:
   * */
  function navAppend () {
    //
    if (navAppend.done) return;

    //

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

          ////////////

          return actual;
        })
        .sort(function (a, b) {
          return $(a).data().eq - $(b).data().eq;
        })
        .appendTo($navShaft);

    
    setNavShaftMinMaxPos();

    navAppend.done = true;
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
    return $navFrame.position()[_pos] + $navFrame[_side]() / 2
  }

  function slideThumbBorder (time) {
    slide($thumbBorder, {
      time: time * .9,
      pos: getNavFrameCenter(data[activeIndex][navFrameKey]),
      _pos: _pos
    }, options.cssTransitions);
  }

  function slideNavShaft(_options) {
    if (!data[_options.guessIndex][navFrameKey]) return;
      

      var pos = minMaxLimit(_options.coo - getNavFrameCenter(data[_options.guessIndex][navFrameKey]), navShaftData.minPos, navShaftData.maxPos),
          time = _options.time * .9;
      slide($navShaft, {
        time: time,
        pos: pos,
        _pos: _pos,
        onEnd: function () {
          
          thumbsDraw(pos, true);
        }
      }, options.cssTransitions);

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

    navAppend();

    $navFrame.removeClass(navFrameActiveClass);
    data[activeIndex][navFrameKey].addClass(navFrameActiveClass);
  }

  /**
   * Позиционируем шахту, чтобы текущий кадр имел нулевую позицию
   * */
  function stageShaftReposition () {

    

    repositionIndex = dirtyIndex = activeIndex;

    var dataFrame = data[activeIndex],
        $frame = dataFrame[stageFrameKey];

    if (!$frame) return;

    // Скрываем все лишние кадры
    $stageFrame
        .not(data[activeIndex][stageFrameKey].addClass(stageFrameActiveClass))
        .detach()
        .data('appended', false)
        .removeClass(stageFrameActiveClass + ' ' + fadeFrontClass + ' ' + fadeRearClass);

    // Возвращаем шахту в начальную позицию
    stop($stageShaft, _pos, options.cssTransitions);
    $stageShaft.css(getTranslate(0, _pos, options.cssTransitions));

    // Force reflow
    ////readPosition($stageShaft, _pos, options.cssTransitions);

    // Показываем нужные
    stageFramePosition([activeIndex, prevIndex, nextIndex]);

    setStageShaftMinMaxPosAndSnap();

    
    setNavShaftMinMaxPos();
  }

  function flexibleResize () {
    var dataFrame = data[activeIndex],
        $frame = dataFrame[stageFrameKey];
    if ($frame) {
      var $img = $frame.data().$img;
      if (!$img) return;
      that.resize($img.data().measures, options.transitionDuration, false);
    } else {
      stageShaftReposition();
    }
  }

  function extendMeasures (_options) {
    if (!_options) return;
    $.extend(measures, {
      width: _options.width,
      height: _options.height,
      minWidth: _options.minWidth,
      maxWidth: _options.maxWidth,
      minHeight: _options.minHeight,
      maxHeight: _options.maxHeight,
      ratio: eval(_options.ratio)
    });
  }

  function eventData (index) {
    if (!data) return;

    var dataFrame = data[index];
    return {
      index: index,
      $stageFrame: dataFrame[stageFrameKey],
      $navFrame: dataFrame[navFrameKey]
    }
  }

  function resetFotoramaMargins () {
    $fotorama.css({marginLeft: 0, marginRight: 0});
  }

  function showCaption () {
    var caption = options.captions && !$videoPlaying ? data[activeIndex].caption : null;

    

    $captionInner.html(caption);
    $caption.css({marginTop: caption ? -$captionInner.innerHeight() : 0});
  }

  /**
   * Показываем кадр по индексу, или по кодовому символу '>' — вперёд, '<' — назад
   * */
  this.show = function (_options) {
    if (!data) return this;
    //////////
    var index,
        time = options.transitionDuration,
        overPos,
        activeDataFrame;

    if (typeof _options !== 'object') {
      index = _options
    } else {
      index = _options.index;
      time = typeof _options.time === 'number' ? _options.time : time;
      overPos = _options.overPos;
      //force = _options.force;
    }

    if (_options.slow) time *= 10;

    index = index === '>' ? dirtyIndex + 1 : index === '<' ? dirtyIndex - 1 : index;

    if (isNaN(index)) {
      var _index = getIndexFromHash(index, data, true);
      if (isNaN(_index)) return this;
      index = _index;
    }

    activeIndex = fotoramaData.index = o_loop ? normalizeIndex(index) : limitIndex(index);
    prevIndex = getPrevIndex(activeIndex);
    nextIndex = getNextIndex(activeIndex);

    dirtyIndex = o_loop ? index : activeIndex;

    activeDataFrame = data[activeIndex];

//    if (stageShaftTouchTail && !force && isFarAway(dirtyIndex)) {
//      //////////
//      stageShaftTouchTail.prevent = true;
//    }

    stageFramePosition([dirtyIndex/*, getPrevIndex(dirtyIndex), getNextIndex(dirtyIndex)*/]); // Проверить, как влияет на производительность


    unloadVideo(false, activeDataFrame.i !== data[normalizeIndex(repositionIndex)].i);


    $fotorama.trigger('fotorama:show', eventData(activeIndex));

    function onEnd () {
      frameDraw([activeIndex, prevIndex, nextIndex], 'stage');
      updateFotoramaState();
      loadImg([activeIndex, prevIndex, nextIndex], 'stage');
      if (!options.flexible || fotoramaData.fullscreen) {
        stageShaftReposition();
      } else {
        flexibleResize();
      }

      $fotorama.trigger('fotorama:showend', eventData(activeIndex));

      showCaption();

      if (options.hash && showedFLAG) {
        setHash(activeDataFrame.id || activeIndex + 1, that.eq);
      }

      showedFLAG = true;
    }

    if (!o_fade) {
      slide($stageShaft, {
        pos: - getPosByIndex(dirtyIndex, measures[_side_], MARGIN, repositionIndex),
        _pos: _pos,
        overPos: overPos,
        time: time,
        onEnd: onEnd
      }, options.cssTransitions);
    } else {
      var $activeFrame = activeDataFrame[stageFrameKey],
          $prevActiveFrame = activeIndex !== lastActiveIndex ? data[lastActiveIndex][stageFrameKey] : null;

      fade($activeFrame, $prevActiveFrame, {
        time: time,
        method: options.transition,
        onEnd: onEnd
      }, options.cssTransitions);
    }

    arrsUpdate();
    navUpdate();

    var guessIndex = limitIndex(activeIndex + minMaxLimit(dirtyIndex - lastActiveIndex, -1, 1)),
        cooUndefinedFLAG = typeof _options.coo === 'undefined';

    ////
    if (o_nav && (cooUndefinedFLAG || guessIndex !== activeIndex)) {
      
      slideNavShaft({time: time, coo: !cooUndefinedFLAG ? _options.coo : measures[_side_] / 2, guessIndex: !cooUndefinedFLAG ? guessIndex : activeIndex});
    }
    if (o_nav === 'thumbs') slideThumbBorder(time);

    lastActiveIndex = activeIndex;

    return this;
  }

  this.requestFullScreen = function () {
    if (!options.allowFullScreen || fotoramaData.fullscreen) return;

    fotoramaData.fullscreen = true;

    scrollTop = $WINDOW.scrollTop();
    scrollLeft = $WINDOW.scrollLeft();

    $WINDOW.scrollLeft(0).scrollTop(0);



    if (o_nativeFullScreen) {
      fullScreenApi.requestFullScreen(fotorama);
    }

    setTimeout(function () {
      // Таймаут нужен для Сафари, чтобы он успел пересчитать скрол и не залип
      $HTML.add($BODY).addClass('fullscreen');
      $fotorama
          .appendTo($BODY)
          .addClass('fotorama--fullscreen')
          .trigger('fotorama:fullscreenenter', eventData(activeIndex));

      measuresStash = $.extend({}, measures);

      //optionsStash = $.extend({}, options);

      //options.flexible = false;
      //o_fit = options.fit;

      unloadVideo($videoPlaying, true);

      that.resize();
      loadImg([activeIndex, prevIndex, nextIndex], 'stage');
    }, 0);
  }

  function cancelFullScreen () {
    
    if (!fotoramaData.fullscreen) return;

    fotoramaData.fullscreen = false;

    if (FULLSCREEN) {
      fullScreenApi.cancelFullScreen(fotorama);
    }

    $HTML.add($BODY).removeClass('fullscreen');

    $fotorama
        .insertAfter($anchor)
        .removeClass('fotorama--fullscreen')
        .trigger('fotorama:fullscreenexit', eventData(activeIndex));

    measures = $.extend({}, measuresStash);

    //if ($videoPlaying) {
    unloadVideo($videoPlaying, true);
    //}

    //$.extend(options, optionsStash);
    //o_fit = options.flexible ? false : options.fit;

//      if (options.flexible) {
//        flexibleResize();
//      } else {
    that.resize();
    loadImg([activeIndex, prevIndex, nextIndex], 'stage');
    if (options.flexible) {
      flexibleResize();
    }
    //}

    $WINDOW.scrollLeft(scrollLeft).scrollTop(scrollTop);
  }

  this.cancelFullScreen = function () {
    if (o_nativeFullScreen && fullScreenApi.isFullScreen()) {
      fullScreenApi.cancelFullScreen(document);
    } else {
      cancelFullScreen();
    }
  }

  document.addEventListener(fullScreenApi.fullScreenEventName, function (e) {
    
    if (!fullScreenApi.isFullScreen() && !$videoPlaying) {
      cancelFullScreen();
    }
  }, false);

  $DOCUMENT.bind('keydown', function (e) {
    if ($videoPlaying && e.keyCode === 27) {
      e.preventDefault();
      unloadVideo($videoPlaying, true);
    } else if (fotoramaData.fullscreen) {
      
      if (e.keyCode === 27) {
        e.preventDefault();
        that.cancelFullScreen();
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        that.show({index: '>', slow: e.altKey});
      } else if (e.keyCode === 37 || e.keyCode === 38) {
        that.show({index: '<', slow: e.altKey});
      }
    }

  });

  /**
   * Изменяем размер фоторамы
   *
   * @param {Object} _options Объект с набором размеров
   * @param {Number|String} _options.width
   * @param {Number|String} _options.height
   * @param {Number} time
   * @param {String} setFLAG
   * */
  this.resize = function (_options, time, setFLAG) {
    if (!data) return this;

    extendMeasures(!fotoramaData.fullscreen ? _options : {width: '100%', maxWidth: null, minWidth: null, height: '100%', maxHeight: null, minHeight: null});

    time = time || 0;

    ////////

    //if (setFLAG !== '*') {
      //$.extend(options, measures);
    //}

    ////////

    var width = measures.width,
        height = measures.height,
        ratio = measures.ratio,
        windowHeight = $WINDOW.height() - (o_nav && !o_vertical ? $nav.height() : 0),
        navWidth = $nav.width();
        //widthCorrection = o_nav && o_vertical ? $nav.width() : 0;

    if (!measureIsValid(width)) return this;

    resetFotoramaMargins();

    if (o_vertical && o_nav) {
      $fotorama.css('margin-' + (o_navBefore ? 'left' : 'right'), navWidth);
    }

    $wrap.css({width: width, minWidth: measures.minWidth, maxWidth: measures.maxWidth});

    width = measures.width_ = $wrap.width()/* - widthCorrection*/;
    height = numberFromPercent(height) / 100 * windowHeight || numberFromMeasure(height);

    

    if (!height) {
      if (isNaN(ratio)) return this;
      height = Math.round(width / ratio);
    }

    height = measures.height_ = minMaxLimit(height, numberFromPercent(measures.minHeight) / 100 * windowHeight || numberFromMeasure(measures.minHeight), numberFromPercent(measures.maxHeight) / 100 * windowHeight || numberFromMeasure(measures.maxHeight));

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

      
      slideNavShaft({guessIndex: activeIndex, time: time, coo: measures[_side_] / 2});
      if (o_nav === 'thumbs' && navAppend.done) slideThumbBorder(time);
    }

    if (options.captions) showCaption();

    //////////
    measuresSetFLAG = setFLAG || true;
    ready();

    return this;
  }

  /**
   * Применяем любые опции после инициализации
   * */
  this.setOptions = function (_options) {
    if (!data) return this;

    $.extend(options, _options);

    reset();

    return this;
  }


  function setShadow ($el, edge) {
    $el.removeClass('fotorama__shadows--left fotorama__shadows--right');

    if (edge /*&& options.shadows*/ && !$videoPlaying) {
      $el
          .addClass(edge.replace(/^|\s/g, ' fotorama__shadows--'));
    }
  }

  this.destroy = function () {
    if (!data) return this;
    // Убиваем фотораму.
    // Возвращаем исходное состояние:
    resetFotoramaMargins();
    $fotorama.html(fotoramaData.urtext);

    fotoramaData.data = data = undefined;
    $.Fotorama.size--;
    return this;
  }

  this.initialize = function (_options) {
    if (data) return this;
    // Восстанавливаем фотораму
    fotoramaData.api = undefined;
    $fotorama.fotorama(_options);

    return this;
  }

  function loadVideo () {
    var dataFrame = data[activeIndex],
        video = dataFrame.video;

    //

    if (typeof video !== 'object' || !dataFrame.videoReady) return;

    if (o_nativeFullScreen && fotoramaData.fullscreen) {
      that.cancelFullScreen();
    }

    waitFor(function () {
      return !fullScreenApi.isFullScreen();
    }, function () {
      if (!dataFrame.$video) {
        dataFrame.$video = $(VIDEO_IFRAME.replace(X, VIDEO_IFRAME_SRC[video.type].replace(X, video.id)));
      }

      dataFrame.$video.appendTo(dataFrame[stageFrameKey]);

      $wrap
          .addClass(wrapVideoClass);
      $videoPlaying = dataFrame.$video;
      stageShaftTouchTail.noMove = true;

      if (options.captions) showCaption();
    });
  }


  function unloadVideo ($video, unloadActive) {
    if (unloadActive) {
      $wrap
          .removeClass(wrapVideoClass);
      $videoPlaying = false;

      stageNoMove();

      //showArrows();
    }

    if ($video) {
      $video.remove();
    }
  }

  //function toggleTapClass () {
    //$stage.toggleClass(stageTapClass, onStageTap.tap || false);
  //}

  /**
   * Тап по сцене:
   * */
  function onStageTap (e) {
    //if (loadVideo()) return;

    if ($videoPlaying) {
      unloadVideo($videoPlaying, true);
    } else {
      that.show({index: e.shiftKey ? '<' : '>', slow: e.altKey});
    }


    //onStageTap.tap = !onStageTap.tap;
    //toggleTapClass();
  }

  // Подключаем перелистывание кадров в шахте на сцене
  stageShaftTouchTail = moveOnTouch($stageShaft, {
    onMove: function (e, result) {
      setShadow($stage, result.edge);
    },
    onEnd: function(result) {
      //////

      setShadow($stage);

      if (result.pos === result.newPos) {
        if (!result.moved) {
          onStageTap(result.startEvent);
        }
        return;
      }

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
//    control: '.' + controlClass,
    $wrap: $stage,
    orientation: options.orientation,
    cssTransitions: options.cssTransitions
  });

  // Подключаем таскание шахты в навигации
  navShaftTouchTail = moveOnTouch($navShaft, {
    onMove: function (e, result) {
      setShadow($nav, result.edge);
    },
    onEnd: function (result) {
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
        ////
        slide($navShaft, {
          time: result.time,
          pos: result.newPos,
          _pos: _pos,
          overPos: result.overPos,
          onEnd: function () {
            thumbsDraw(result.newPos, true);
          }
        }, options.cssTransitions);
        thumbsDraw(result.newPos);
        setShadow($nav, findShadowEdge(result.newPos, navShaftData.minPos, navShaftData.maxPos));
      } else {
        thumbsDraw(result.pos, true);
      }
    },
    timeLow:.5,
    timeHigh: 2,
    friction: 5,
//    control: '.' + navFrameClass,
    $wrap: $nav,
    orientation: options.orientation,
    cssTransitions: options.cssTransitions
  });

  // Клик по точкам и превьюшкам
  function onNavFrameClick (e) {
    var index = $(this).data().eq;
    ////
    that.show({index: index, slow: e.altKey, coo: e[_coo] - $nav.offset()[_pos]});
  }

  // Клик по стрелкам
  smartClick($arrs, function (e) {
    e.preventDefault();
    if ($videoPlaying) {
      unloadVideo($videoPlaying, true);
    } else {
      that.show({index: $arrs.index(this) ? '>' : '<', slow: e.altKey});
    }
  }, {
    onStart: function () {
      stageShaftTouchTail.control = true;
    },
    tail: stageShaftTouchTail
  });

  // Клик по иконке фуллскрина
  smartClick($fullscreenIcon, function () {
    if (fotoramaData.fullscreen) {
      that.cancelFullScreen();
    } else {
      that.requestFullScreen();
    }
  }, {
    onStart: function () {
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
      if (options.hash && location.hash) {
        options.startIndex = getIndexFromHash(location.hash.replace(/^#/, ''), data, that.eq === 0) || 0;
      }

      if (options.startIndex === 'random') {
        options.startIndex = getRandomInt(0, size - 1);
      }
      o_startIndex = o_loop ? normalizeIndex(options.startIndex) : limitIndex(options.startIndex);
      if (isNaN(o_startIndex)) {
        var _index = getIndexFromHash(options.startIndex, data, true);
        o_startIndex = isNaN(_index) ? 0 : _index;
      }

      activeIndex = repositionIndex = dirtyIndex = lastActiveIndex = o_startIndex;
      ////
    }

    if (size) {
      that.show({index: activeIndex, time: 0});
      that.resize();
    } else {
      that.destroy();
    }

    //
  }

  /**
   * Создаём пачку методов для добавления и удаления кадров на лету
   * */
  $.each('load push pop shift unshift reverse sort splice'.split(' '), function (i, method) {
    that[method] = function () {
      if (method !== 'load') {
        Array.prototype[method].apply(data, arguments);
      } else if (arguments[0] && typeof arguments[0] === 'object') {
          options.data = arguments[0];
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
  }

  /* Включаем фотораму */
  this.eq = $.Fotorama._size;
  $.Fotorama.size++; $.Fotorama._size++;
  $.Fotorama.api[this.eq] = this;

  reset();

  $WINDOW.on('resize', this.resize);


  //$DOCUMENT.on()

//  $WINDOW.on('fotorama:hashchange', function () {
//    if (setHash.on) return;
//    that.show({index: getIndexFromHash(that.eq, data), saveHash: true});
//  });
}

var methods = {};

// Создаём алиасы публичных методов, для доступа к ним через $(elem).fotorama('method', argument1, argument2, argument3/*, ...*/)
$.each('show resize load push pop shift unshift reverse sort splice setOptions destroy'.split(' '), function (i, method) {
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
    var options = method === 'initialize' ? arguments[1] : method;

    return this.each(function () {
      var that = this,
          $fotorama = $(this),
          fotoramaData = $fotorama.data();

      ////


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
               * 3. Дефолтные значения ($.Fotorama.defaults) */
              $.extend(
                  {},
                  $.Fotorama.defaults,
                  $.extend(
                      {},
                      options,
                      fotoramaData
                  )
              )
          );

          if (typeof options === 'object') {
            options.data = null;
          }
          if (typeof $.Fotorama.defaults === 'object') {
            $.Fotorama.defaults.data = null;
          }
        });
      }
    });
  }
};



//$.Fotorama = {};

// Настройка по умолчанию.
// Чтобы задать свои дефолты, нужно писать так:
//   $.extend($.Fotorama.defaults, {loop: true});
$.Fotorama.defaults = {
  loop: false,
  data: null, // [{}, {}, {}] // TODO ?
  startIndex: 0, // 'random' || id
  orientation: 'horizontal', // 'vertical'
  transition: 'slide',
  cssTransitions: true,
  arrows: true,
  fit: true, // 'contain' || 'cover' || false
  flexible: false,
  nav: 'dots', // 'thumbs' || false
  navPosition: 'after',
  hash: false,
  allowFullScreen: false, // true || 'native'
  transitionDuration: TRANSITION_DURATION,
  captions: false

//  width: null,
//  minWidth: null,
//  maxWidth: null,
//  height: null,
//  minHeight: null,
//  maxHeight: null
}

// Глобальный массив для хранения адресов загруженных фоток, (чтобы не загружать дважды)
$.Fotorama.cache = {};

$.Fotorama.size = $.Fotorama._size = 0;
$.Fotorama.api = [];

// Когда DOM готов:
$(function () {
  $HTML = $('html');
  $BODY = $('body');

  // Блок-спутник для загрузки в нём фотографий и проверки размеров,
  // прямо в фотораме это не всегда удобно делать:
  $.Fotorama.$load = $('<div class="fotorama__load"></div>').appendTo($BODY);

  // Авто-инициализация по классу
  $('.fotorama').fotorama();
});

}(window, document, jQuery);
