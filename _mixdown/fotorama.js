/*!
 * Fotorama 4.0.4 | http://fotorama.io/license/
 */
(function (window, document, $, undefined) {

// Underscore

// List of HTML entities for escaping.
var escapeEntityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
}

// Regexes containing the keys and values listed immediately above.
var escapeRegex = new RegExp('[&<>"\'/]', 'g');

var _ = {
  escape: function (string) {
    if (string == null) return '';
    return ('' + string).replace(escapeRegex, function(match) {
      return escapeEntityMap[match];
    });
  }
}
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
      ok: false,
      is: function () {
        return false;
      },
      request: function () {
      },
      cancel: function () {
      },
      event: '',
      prefix: ''
    },
    browserPrefixes = 'webkit moz o ms khtml'.split(' ');

// check for native support
if (typeof document.cancelFullScreen != 'undefined') {
  fullScreenApi.ok = true;
} else {
  // check for fullscreen support by vendor prefix
  for (var i = 0, il = browserPrefixes.length; i < il; i++) {
    fullScreenApi.prefix = browserPrefixes[i];
    if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined') {
      fullScreenApi.ok = true;
      break;
    }
  }
}

// update methods to do something useful
if (fullScreenApi.ok) {
  fullScreenApi.event = fullScreenApi.prefix + 'fullscreenchange';
  fullScreenApi.is = function () {
    switch (this.prefix) {
      case '':
        return document.fullScreen;
      case 'webkit':
        return document.webkitIsFullScreen;
      default:
        return document[this.prefix + 'FullScreen'];
    }
  };
  fullScreenApi.request = function (el) {
    return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
  };
  fullScreenApi.cancel = function (el) {
    return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
  };
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
var _fotoramaClass = 'fotorama',
    _fullscreenClass = 'fullscreen',
    
    wrapClass = _fotoramaClass + '__wrap',
    wrapNotReadyClass = wrapClass + '--not-ready',
    wrapCss3Class = wrapClass + '--css3',
    wrapVideoClass = wrapClass + '--video',
    wrapFadeClass = wrapClass + '--fade',
    wrapSlideClass = wrapClass + '--slide',
		wrapNoControlsClass = wrapClass + '--no-controls',

    stageClass = _fotoramaClass + '__stage',
    stageFrameClass = stageClass + '__frame',
    stageFrameVideoClass = stageFrameClass + '--video',
    stageShaftClass = stageClass + '__shaft',
    stageOnlyActiveClass = stageClass + '--only-active',

    arrClass = _fotoramaClass + '__arr',
    arrDisabledClass = arrClass + '--disabled',
    arrPrevClass = arrClass + '--prev',
    arrNextClass = arrClass + '--next',
    arrArrClass = arrClass + '__arr',

    navClass = _fotoramaClass + '__nav',
    navWrapClass = navClass + '-wrap',
    navShaftClass = navClass + '__shaft',
    navDotsClass = navClass + '--dots',
    navThumbsClass = navClass + '--thumbs',
    navFrameClass = navClass + '__frame',
    navFrameDotClass = navFrameClass + '--dot',
    navFrameThumbClass = navFrameClass + '--thumb',

    fadeClass = _fotoramaClass + '__fade',
    fadeFrontClass = fadeClass + '-front',
    fadeRearClass = fadeClass + '-rear',


    shadowClass = _fotoramaClass + '__shadow',
    shadowLeftClass = shadowClass + '--left',
    shadowRightClass = shadowClass + '--right',
    shadowsClass = shadowClass + 's',
    shadowsLeftClass = shadowsClass + '--left',
    shadowsRightClass = shadowsClass + '--right',

    activeClass = _fotoramaClass + '__active',
    selectClass = _fotoramaClass + '__select',
    
    hiddenClass = _fotoramaClass + '--hidden',

    fullscreenClass = _fotoramaClass + '--fullscreen',
    fullscreenIconClass = _fotoramaClass + '__fullscreen-icon',

    errorClass = _fotoramaClass + '__error',
    loadingClass = _fotoramaClass + '__loading',
    loadedClass = _fotoramaClass + '__loaded',
    loadedFullClass = loadedClass + '--full',
    loadedImgClass = loadedClass + '--img',
    loadClass = _fotoramaClass + '__load',

    imgClass = _fotoramaClass + '__img',
    imgFullClass = imgClass + '--full',

    dotClass = _fotoramaClass + '__dot',
    thumbClass = _fotoramaClass + '__thumb',
    thumbBorderClass = thumbClass + '-border',

    htmlClass = _fotoramaClass + '__html',

    videoClass = _fotoramaClass + '__video',
    videoPlayClass = videoClass + '-play',
    videoCloseClass = videoClass + '-close',

    captionClass = _fotoramaClass + '__caption';

var $WINDOW = $(window),
    $DOCUMENT = $(document),
    $HTML,
    $BODY,

    TOUCH = Modernizr.touch,
    QUIRKS_FORCE = document.location.hash.replace('#', '') === 'quirks',
    CSS3 = Modernizr.csstransforms3d && Modernizr.csstransitions && !QUIRKS_FORCE,
    FULLSCREEN = fullScreenApi.ok,

    TOUCH_TIMEOUT = 300,
    TRANSITION_DURATION = 333,
    SPINNER_COLOR = '#777',
    AUTOPLAY_INTERVAL = 5000,
    MARGIN = 2,
    THUMB_SIZE = 64,

		//_pos = 'left',
		//_pos2 = 'top',
		//_coo = '_x',
		//_coo2 = '_y',
		//_side = 'width',
		//_side_ = _side + '_',
		//_side2 = 'height',
		//_side2_ = _side2 + '_',

    // Размеры на тот случай, если пользователь не укажет и брать не откуда
    WIDTH = 500,
    HEIGHT = 333,

    BEZIER = bez([.1, 0, .25, 1]),

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
  var id,
      type;

  if (href.host.match('youtube.com') && href.search) {
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
    } else if (checkVideo) {
      video = findVideoId(_imgSrc, _video === true);
      if (video) {
        _imgSrc = false;
      } else {
        video = findVideoId(_video, _video);
      }
    }

    return {
      video: video,
      img: _imgHref || _imgSrc || _thumbSrc,
      thumb: _thumbSrc || _imgSrc || _imgHref,
      full: $img.attr('data-full') || $child.attr('data-full'),
      caption: $img.attr('title') || $child.attr('title'),
      fit: imgData.fit || $child.data('fit'),
      id: $img.attr('id') || $child.attr('id')
    }
  }

  $el.children().each(function (i) {
    var $this = $(this),
        dataFrame = $this.data();
    if ($this.is('a, img')) {
      dataFrame = getDataFromImg($this, true);
    } else if (!$this.is(':empty')) {
      dataFrame.html = this;
      dataFrame.caption = dataFrame.caption || $this.attr('title');
    } else {
      return;
    }

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

var lastEvent,
    moveEventType,
    preventEvent,
    preventEventTimeout;

function extendEvent (e, touchFLAG) {
  e._x = touchFLAG ? e.touches[0].pageX : e.pageX;
  e._y = touchFLAG ? e.touches[0].pageY : e.pageY;
}

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
  var el = $el[0],
      tail = {},
      touchEnabledFLAG,
      movableFLAG,
      startEvent,
      eventFlowFLAG,
      movedFLAG,
      $target,
      controlTouch,
      touchFLAG,
      targetIsSelectFLAG;

  function onStart (e) {

    $target = $(e.target);
    targetIsSelectFLAG = false;

    if (touchEnabledFLAG
        || eventFlowFLAG
        || (e.touches && e.touches.length > 1)
        || e.which > 1
        || tail.prevent
        || (lastEvent && lastEvent.type !== e.type && preventEvent)
        || (targetIsSelectFLAG = options.select && $target.is(options.select, el))) return tail.prevent !== true || targetIsSelectFLAG;

    touchFLAG = e.type.match('touch');
    extendEvent(e, touchFLAG);

    tail.checked = movableFLAG = movedFLAG = false;

    lastEvent = e;
    moveEventType = e.type.replace(/down|start/, 'move');
    startEvent = e;
    controlTouch = tail.control;

    (options.onStart || noop).call(el, e, {control: controlTouch, $target: $target});

    touchEnabledFLAG = eventFlowFLAG = true;

    if (!touchFLAG) {
      e.preventDefault();
    }
  }

  function onMove (e) {

    if (!touchEnabledFLAG
        || (e.touches && e.touches.length > 1)) {
      onEnd();
      return;
    } else if (moveEventType !== e.type) {
      return;
    }

    extendEvent(e, touchFLAG);

    var xDiff = Math.abs(e._x - startEvent._x), // opt _x → _pageX
        yDiff = Math.abs(e._y - startEvent._y),
        xyDiff = xDiff - yDiff,
        xWin = xyDiff >= 3,
        yWin = xyDiff <= -3;

    if (!movedFLAG) {
      movedFLAG = /*!tail.noMove && */!(!xWin && !yWin);
    }

    if (touchFLAG && !tail.checked) {
      if (xWin || yWin) {
        tail.checked = true;
        movableFLAG = xWin;
      }

      if (!tail.checked || movableFLAG) {
        e.preventDefault();
      }
    } else if (!touchFLAG || movableFLAG) {
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
    e && e.preventDefault && e.preventDefault();
    preventEvent = true;
    clearTimeout(preventEventTimeout);
    preventEventTimeout = setTimeout(function () {
      preventEvent = false;
    }, 1000);
    (options.onEnd || noop).call(el, {moved: !!movedFLAG, $target: $target, control: controlTouch, startEvent: startEvent, aborted: !e});
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
    // Клик по ссылкам только если не начато перетаскивание
    if (tail.checked) {
      e.preventDefault();
    }
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
  var el = $el[0],
      elData = $el.data(),
			tail = {},
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
      controlFLAG,
      movedFLAG;

  function startTracking (e) {
    startCoo = coo = e._x;

    // Начинаем запись маршрута курсора
    moveTrack = [[new Date().getTime(), startCoo]];

    startElPos = moveElPos = stop($el);

    (options.onStart || noop).call(el, e, {pos: startElPos});
  }

  function onStart (e, result) {
    minPos = elData.minPos;
    maxPos = elData.maxPos;
    snap = elData.snap;

    slowFLAG = e.altKey;
    movedFLAG = false;

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

    coo = e._x;

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
      $el.css(getTranslate(moveElPos));
      if (!movedFLAG) {
        movedFLAG = true;
        $BODY.addClass('grabbing');
      }
    }

    (options.onMove || noop).call(el, e, {pos: moveElPos, edge: edge});
  }

  function onEnd (result) {
    if (controlFLAG) return;

    $BODY.removeClass('grabbing');

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
    select: options.select,
    control: options.control
  }), tail);

  return tail;
}
//fgnass.github.com/spin.js#v1.2.6

/* !FOTORAMA: добавил var Spinner для локального доступа, убрал ! перед function */
var Spinner;

(function (window, document, undefined) {

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

})(window, document)
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

      // Некоторые опции, которые могут измениться:
      o_loop,
      o_nav,
      o_navTop,
      o_startIndex = false,
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
        startIndex = limitIndex(getIndexByPos(pos + thumbSide, thumbSide)),
        stopIndex = limitIndex(getIndexByPos(pos - measures.w/* - thumbSide*/, thumbSide)),
        specialMeasures = {};

    specialMeasures.w = o_thumbSide;
    specialMeasures.h = o_thumbSide2;

    $navThumbFrame.each(function () {
      var $this = $(this),
          thisData = $this.data(),
          eq = thisData.eq,
          specialFit = 'cover';

      if (eq < startIndex
					|| eq > stopIndex
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

	 /*function onTouchEnd () {
		onTouchEnd.t = setTimeout(function () {
			touchedFLAG = 0;
		}, 100);

	}*/

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

  /**
   * Тап по сцене:
   * */
  function onStageTap () {
    if ($videoPlaying) {
      unloadVideo($videoPlaying, true, true);
    } else {
      $wrap.toggleClass(wrapNoControlsClass);
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
				onStageTap();
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
										// Настройка по умолчанию.
										loop: false,
										startIndex: 0, // 'random' || id
										transition: 'slide', // 'crossfade' || 'dissolve'
										keyboard: false,
										fit: 'contain', // true || 'cover' || false
										nav: 'dots', // 'thumbs' || false
										navPosition: 'bottom', // 'top'
										hash: false,
										allowFullScreen: false, // true || 'native'
										captions: true,
										autoplay: false,
										stopAutoplayOnTouch: true,
										width: null, // 500 || '100%'
										minWidth: null,
										maxWidth: null, // '100%'
										height: null,
										minHeight: null,
										maxHeight: null,
										ratio: null, // '16/9' || 500/333
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
this["$"] = this["$"] || {};
this["$"]["Fotorama"] = this["$"]["Fotorama"] || {};
this["$"]["Fotorama"]["jst"] = this["$"]["Fotorama"]["jst"] || {};

this["$"]["Fotorama"]["jst"]["style"] = function(v) {
var __t, __p = '', __e = _.escape;
__p += '.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__nav--thumbs .fotorama__nav__frame {\n  padding: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px ' +
((__t = ( v.thumbMargin / 2 )) == null ? '' : __t) +
'px;\n  width: ' +
((__t = ( v.thumbWidth )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( v.thumbHeight )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__thumb {\n  width: ' +
((__t = ( v.thumbWidth )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( v.thumbHeight )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__thumb-border {\n  width: ' +
((__t = ( v.thumbWidth - v.thumbMargin * 2 )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( v.thumbHeight - v.thumbMargin * 2 )) == null ? '' : __t) +
'px;\n  border-width: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n  margin-top: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n  margin-left: ' +
((__t = ( - v.thumbWidth / 2 + v.thumbMargin / 2 )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__nav--thumbs {\n  width: ' +
((__t = ( v.thumbWidth + v.thumbMargin * 2 )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__nav__frame {\n  padding: ' +
((__t = ( v.thumbMargin / 2 )) == null ? '' : __t) +
'px ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__thumb-border {\n  margin-left: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n  margin-top: ' +
((__t = ( - v.thumbHeight / 2 + v.thumbMargin / 2 )) == null ? '' : __t) +
'px;\n}\n';
return __p
};
})(window, document, jQuery);
