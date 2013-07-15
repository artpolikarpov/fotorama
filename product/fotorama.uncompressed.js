/*!
 * Fotorama 4.1.17 | http://fotorama.io/license/
 */
(function (window, document, $, undefined) {
  "use strict";
// My little Underscore

// List of HTML entities for escaping.
var escapeEntityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// Regexes containing the keys and values listed immediately above.
var escapeRegex = new RegExp('[&<>"\'/]', 'g');

var _ = {
  escape: function (string) {
    if (string == null) return '';
    return ('' + string).replace(escapeRegex, function (match) {
      return escapeEntityMap[match];
    });
  }
}
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */

var Modernizr = (function (window, document, undefined) {

  var version = '2.6.2',

      Modernizr = {},

      docElement = document.documentElement,

      mod = 'modernizr',
      modElem = document.createElement(mod),
      mStyle = modElem.style,

      inputElem,

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

      injectElementWithStyles = function (rule, callback, nodes, testnames) {

        var style, ret, node, docOverflow,
            div = document.createElement('div'),
            body = document.body,
            fakeBody = body || document.createElement('body');

        if (parseInt(nodes, 10)) {
          while (nodes--) {
            node = document.createElement('div');
            node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
            div.appendChild(node);
          }
        }

        style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
        div.id = mod;
        (body ? div : fakeBody).innerHTML += style;
        fakeBody.appendChild(div);
        if (!body) {
          fakeBody.style.background = '';
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
        }

        ret = callback(div, rule);
        if (!body) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
        } else {
          div.parentNode.removeChild(div);
        }

        return !!ret;

      },
      _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

  if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
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
    Function.prototype.bind = function bind (that) {

      var target = this;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1),
          bound = function () {

            if (this instanceof bound) {

              var F = function () {
              };
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

  function setCss (str) {
    mStyle.cssText = str;
  }

  function setCssAll (str1, str2) {
    return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
  }

  function is (obj, type) {
    return typeof obj === type;
  }

  function contains (str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  function testProps (props, prefixed) {
    for (var i in props) {
      var prop = props[i];
      if (!contains(prop, "-") && mStyle[prop] !== undefined) {
        return prefixed == 'pfx' ? prop : true;
      }
    }
    return false;
  }

  function testDOMProps (props, obj, elem) {
    for (var i in props) {
      var item = obj[props[i]];
      if (item !== undefined) {

        if (elem === false) return props[i];

        if (is(item, 'function')) {
          return item.bind(elem || obj);
        }

        return item;
      }
    }
    return false;
  }

  function testPropsAll (prop, prefixed, elem) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    if (is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed);

    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  tests['csstransforms3d'] = function () {

    var ret = !!testPropsAll('perspective');

// Chrome fails that test, ignore
//		if (ret && 'webkitPerspective' in docElement.style) {
//
//			injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function (node, rule) {
//				ret = node.offsetLeft === 9 && node.offsetHeight === 3;
//			});
//		}
    return ret;
  };

  for (var feature in tests) {
    if (hasOwnProp(tests, feature)) {
      featureName = feature.toLowerCase();
      Modernizr[featureName] = tests[feature]();

      classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
    }
  }

  Modernizr.addTest = function (feature, test) {
    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          Modernizr.addTest(key, feature[ key ]);
        }
      }
    } else {

      feature = feature.toLowerCase();

      if (Modernizr[feature] !== undefined) {
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


  Modernizr._version = version;

  Modernizr._prefixes = prefixes;
  Modernizr._domPrefixes = domPrefixes;
  Modernizr._cssomPrefixes = cssomPrefixes;

  Modernizr.testProp = function (prop) {
    return testProps([prop]);
  };

  Modernizr.testAllProps = testPropsAll;

  Modernizr.testStyles = injectElementWithStyles;
  Modernizr.prefixed = function (prop, obj, elem) {
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      return testPropsAll(prop, obj, elem);
    }
  };

  return Modernizr;
})(window, document);
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
function bez (coOrdArray) {
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

    grabClass = _fotoramaClass + '__grab',

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

    captionClass = _fotoramaClass + '__caption',

    ooooClass = _fotoramaClass + '__oooo';

var $WINDOW = $(window),
    $DOCUMENT = $(document),
    $HTML,
    $BODY,

    COMPAT = document.compatMode === 'CSS1Compat',
    QUIRKS_FORCE = document.location.hash.replace('#', '') === 'quirks',
    CSS3 = Modernizr.csstransforms3d && !QUIRKS_FORCE,
    FULLSCREEN = fullScreenApi.ok,

    TOUCH_TIMEOUT = 300,
    TRANSITION_DURATION = 333,
    AUTOPLAY_INTERVAL = 5000,
    MARGIN = 2,
    THUMB_SIZE = 64,

    WIDTH = 500,
    HEIGHT = 333,

    BEZIER = bez([.1, 0, .25, 1]);

function noop () {}

function minMaxLimit (value, min, max) {
  return Math.max(isNaN(min) ? -Infinity : min, Math.min(isNaN(max) ? Infinity : max, value));
}

function readTransform (css) {
  return css.match(/^m/) && css.match(/-?\d+/g)[4];
}

function readPosition ($el) {
  if (CSS3) {
    return +readTransform($el.css('transform'));
  } else {
    return +$el.css('left').replace('px', '');
  }
}

function getTranslate (pos) {
  var obj = {};
  if (CSS3) {
    obj.transform = 'translate3d(' + pos + 'px,0,0)';
  } else {
    obj.left = pos;
  }
  return obj;
}

function getDuration (time) {
  return {'transition-duration': time + 'ms'};
}

function numberFromMeasure (value, measure) {
  return +String(value).replace(measure || 'px', '');
}

function numberFromPercent (value) {
  return /%$/.test(value) && numberFromMeasure(value, '%');
}

function measureIsValid (value) {
  return (!!numberFromMeasure(value) || !!numberFromMeasure(value, '%')) && value;
}

function getPosByIndex (index, side, margin, baseIndex) {
  return (index - (baseIndex || 0)) * (side + (margin || 0));
}

function getIndexByPos (pos, side, margin, baseIndex) {
  return -Math.round(pos / (side + (margin || 0)) - (baseIndex || 0));
}

function bindTransitionEnd ($el) {
  var elData = $el.data();

  if (elData.tEnd) return;

  //console.log('bindTransitionEnd', $('img', $el).attr('src'));

  var el = $el[0],
      transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        msTransition: 'MSTransitionEnd',
        transition: 'transitionend'
      };
  el.addEventListener(transitionEndEvent[Modernizr.prefixed('transition')], function (e) {
    //console.log('NATIVE transitionend', e.propertyName, elData.tProp && e.propertyName.match(elData.tProp) && 'CALL');
    elData.tProp && e.propertyName.match(elData.tProp) && elData.onEndFn.call(this);
  });
  elData.tEnd = true;
}

function afterTransition ($el, property, fn, time) {
  var done,
      elData = $el.data();

  //console.log('afterTransition', $el);

  if (elData) {
    //clearTimeout(elData.tT);

    elData.onEndFn = function () {
      if (done) return;
      //.log('elData.onEndFn()', fn);
      fn.call(this);
      done = true;
    };
    elData.tProp = property;

    bindTransitionEnd($el);

//    if (!time) return;
//
//    elData.tT = setTimeout(function () {
//      // Если не сработал нативный transitionend (а такое бывает),
//      // через таймаут вызываем onEndFn насильно:
//      //.log('request for FALLBACK', $el, fn);
//      if (done) return;
//      //.log('FALLBACK!!! for transition', $el, fn);
//      elData.onEndFn();
//    }, time * 5);
  }
}

function stop ($el) {
  if (CSS3) {
    $el
        .css(getDuration(0))
        .data('onEndFn', noop);
  } else {
    $el.stop();
  }
  if ($el.length) {
    ////console.log('$el.length', $el);
    var lockedLeft = readPosition($el);
    $el.css(getTranslate(lockedLeft));
    return lockedLeft;
  }
}

function edgeResistance (pos, edge) {
  return Math.round(pos + ((edge - pos) / 1.5));
}

function getProtocol () {
  getProtocol.p = getProtocol.p || (location.protocol === 'https://' ? 'https://' : 'http://');
  return getProtocol.p;
}

function parseHref (href) {
  var a = document.createElement('a');
  a.href = href;
  return a;
}

function findVideoId (href, forceVideo) {
  if (typeof href !== 'string') return href;
  href = parseHref(href);

  // href.host = href.host.replace(/^www./, '').replace(/:80$/, '');

  var id,
      type;

  if (href.host.match(/youtube\.com/) && href.search) {
    //.log();
    id = href.search.split('v=')[1];
    if (id) {
      var ampersandPosition = id.indexOf('&');
      if (ampersandPosition !== -1) {
        id = id.substring(0, ampersandPosition);
      }
      type = 'youtube';
    }
  } else if (href.host.match(/youtube\.com|youtu\.be/)) {
    id = href.pathname.replace(/^\/(embed\/|v\/)?/, '').replace(/\/.*/, '');
    type = 'youtube';
  } else if (href.host.match(/vimeo\.com/)) {
    type = 'vimeo';
    id = href.pathname.replace(/^\/(video\/)?/, '').replace(/\/.*/, '');
  }

  //.log('id, type ', id, type);

  if ((!id || !type) && forceVideo) {
    id = href.href;
    type = 'custom';
  }

  return id ? {id: id, type: type} : false;
}

function getVideoThumbs (dataFrame, data, api) {
  ////console.log('getVideoThumbs');

  var img, thumb, video = dataFrame.video;
  if (video.type === 'youtube') {
    thumb = getProtocol() + 'img.youtube.com/vi/' + video.id + '/default.jpg';
    img = thumb.replace(/\/default.jpg$/, '/hqdefault.jpg');
    dataFrame.thumbsReady = true;
  } else if (video.type === 'vimeo') {
    $.ajax({
      url: getProtocol() + 'vimeo.com/api/v2/video/' + video.id + '.json',
      dataType: 'jsonp',
      success: function (json) {
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
        thumb: dataFrame.thumb || _dataFrame.thumb,
        id: dataFrame.id,
        fit: dataFrame.fit
      });

      break;
    }
  }
}

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
      thumb: imgData.thumb || _thumbSrc || _imgSrc || _imgHref
    }
  }

  $el.children().each(function (i) {
    var $this = $(this),
        dataFrame = $.extend($this.data(), {id: $this.attr('id')});
    if ($this.is('a, img')) {
      $.extend(dataFrame, getDataFromImg($this, true));
    } else if (!$this.is(':empty')) {
      $.extend(dataFrame, {
        html: this,
        _html: $this.html() // Because of IE
      });
    } else return;

    data.push(dataFrame);
  });

  return data;
}

function isHidden (el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

function waitFor (test, fn, timeout) {
  if (test()) {
    fn();
  } else {
    setTimeout(function () {
      waitFor(test, fn);
    }, timeout || 100);
  }
}

function setHash (hash) {
  location.replace(location.protocol
      + '//'
      + location.host
      + location.pathname.replace(/^\/?/, '/')
      + location.search
      + '#' + hash);
}

function fit ($el, measuresToFit, method) {
  ////console.log('fit');

  var elData = $el.data(),
      measures = elData.measures;

  if (measures && (!elData.l ||
      elData.l.W !== measures.width ||
      elData.l.H !== measures.height ||
      elData.l.r !== measures.ratio ||
      elData.l.w !== measuresToFit.w ||
      elData.l.h !== measuresToFit.h ||
      elData.l.m !== method)) {

    ////console.log('fit execute', measures, measuresToFit);

    var width = measures.width,
        height = measures.height,
        ratio = measuresToFit.w / measuresToFit.h,
        biggerRatioFLAG = measures.ratio >= ratio,
        fitFLAG = method === 'scale-down',
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
      marginLeft: Math.round(-width / 2),
      marginTop: Math.round(-height / 2)
    });

    elData.l = {
      W: measures.width,
      H: measures.height,
      r: measures.ratio,
      w: measuresToFit.w,
      h: measuresToFit.h,
      m: method
    }
  }
}

function setStyle ($el, style) {
  var el = $el[0];
  if (el.styleSheet) {
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

  var index;
  if (!isNaN(hash)) return +hash;

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

function div (classes, child) {
  return '<div class="' + classes + '">' + (child || '') + '</div>';
}
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
  //console.log('fade', !!$el1, !!$el2);

  var _$el1 = $el1, _$el2 = $el2, crossfadeFLAG = options.method === 'crossfade';
  /*fade.$el1 = */$el1 = $el1 || $($el1);
  /*fade.$el2 = */$el2 = $el2 || $($el2);

  var onEndFn = function () {
        if (!onEndFn.done) {
          //$el1.removeClass(fadeRearClass);
          //$el2.removeClass(fadeFrontClass);
          //console.log('onEndFn');
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
      .addClass(fadeRearClass);
  //.removeClass(fadeRearClass);
  $el2
      .addClass(fadeFrontClass);
  //.removeClass(fadeFrontClass);

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

    if (_$el2) {
      $el1.fadeTo(0, 0);
    }

    $el1.fadeTo(options.time, 1, onEndFn);
    crossfadeFLAG && $el2.fadeTo(options.time, 0);

    if (!_$el1 && !_$el2) onEndFn();
  }
}
var lastEvent,
    moveEventType,
    preventEvent,
    preventEventTimeout;

function extendEvent (e, touchFLAG) {
  ////console.log(e.type);
  e._x = touchFLAG ? e.touches[0].pageX : e.pageX;
  e._y = touchFLAG ? e.touches[0].pageY : e.pageY;
}

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
      targetIsSelectFLAG,
      targetIsLinkFlag;

  function onStart (e) {

    $target = $(e.target);
    tail.checked = movableFLAG = movedFLAG = targetIsSelectFLAG = targetIsLinkFlag = false;

    if (touchEnabledFLAG
        || eventFlowFLAG
        || (e.touches && e.touches.length > 1)
        || e.which > 1
        /*|| tail.prevent*/
        || (lastEvent && lastEvent.type !== e.type && preventEvent)
        || (targetIsSelectFLAG = options.select && $target.is(options.select, el))) return /*tail.prevent !== true || */targetIsSelectFLAG;

    touchFLAG = e.type.match('touch');
    targetIsLinkFlag = $target.is('a, a *', el);
    extendEvent(e, touchFLAG);

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
        xWin = !tail.stable || xyDiff >= 3,
        yWin = xyDiff <= -3;

    if (!movedFLAG) {
      movedFLAG = /*!tail.noMove && */ !(!xWin && !yWin);
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
    var _touchEnabledFLAG = touchEnabledFLAG;
    eventFlowFLAG = tail.control = touchEnabledFLAG = false;
    if (!_touchEnabledFLAG || (targetIsLinkFlag && !tail.checked)) return;
    ////console.log('onEnd', e && e.type);
    e && e.preventDefault();
    preventEvent = true;
    clearTimeout(preventEventTimeout);
    preventEventTimeout = setTimeout(function () {
      preventEvent = false;
    }, 1000);
    (options.onEnd || noop).call(el, {moved: !!movedFLAG, $target: $target, control: controlTouch, startEvent: startEvent, aborted: !e, touch: touchFLAG});
  }


  if (el.addEventListener) {
    el.addEventListener('touchstart', onStart);
    el.addEventListener('touchmove', onMove);
    el.addEventListener('touchend', onEnd);
  }

  $el.on('mousedown', onStart);
  $DOCUMENT
      .on('mousemove', onMove)
      .on('mouseup', onEnd);

  $el.on('click', 'a', function (e) {
    ////console.log('a click', tail.checked);
    if (tail.checked) {
      e.preventDefault();
    }
  });

  return tail;
}
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
      movedFLAG,
      stableFLAG;

  function startTracking (e) {
    startCoo = coo = e._x;

    moveTrack = [
      [new Date().getTime(), startCoo]
    ];

    startElPos = moveElPos = stop($el);

    stableFLAG = tail.stable = !(startElPos % snap);
    !stableFLAG && e.preventDefault();

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
        longTouchFLAG = timeDiff > TOUCH_TIMEOUT,
        swipeFLAG = !longTouchFLAG && moveElPos !== startElPos && newPos === moveElPos;

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

    (options.onEnd || noop).call(el, $.extend(result, {pos: moveElPos, newPos: newPos, overPos: overPos, time: time, moved: (longTouchFLAG && snap) || result.moved}));
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
var $oooo = $(div('', div(ooooClass))),
    ooooInterval,
    ooooStep = function () {
      $oooo.attr('class', ooooClass + ' ' + ooooClass + '--' + ooooI);
      ooooI++;
      if (ooooI > 4) ooooI = 0;
    },
    ooooI;

function ooooStart ($el) {
  ooooStop(true);
  $oooo.appendTo($el);
  ooooI = 0;
  ooooStep();
  ooooInterval = setInterval(ooooStep, 200);
}

function ooooStop (leave) {
  leave || $oooo.detach();
  clearInterval(ooooInterval);
}

jQuery.Fotorama = function ($fotorama, opts) {
  $HTML = $HTML || $('html');
  $BODY = $BODY || $('body');

  //$.Fotorama.$load = $.Fotorama.$load || $('<div class="' + loadClass + '"></div>').appendTo($BODY);

  var that = this,
      index = _size,
      stamp = new Date().getTime(),
      fotorama = $fotorama.addClass(_fotoramaClass + stamp)[0],
      data,
      dataFrameCount = 1,
      fotoramaData = $fotorama.data(),
      size,

      $style = $('<style></style>').insertBefore($fotorama),

      $anchor = $(div(hiddenClass)).insertBefore($fotorama),
      $wrap = $(div(wrapClass + ' ' + wrapNotReadyClass)),
      $stage = $(div(stageClass)).appendTo($wrap),
      stage = $stage[0],
      $stageShaft = $(div(stageShaftClass)).appendTo($stage),
      $stageFrame = $(),
      $arrPrev = $(div(arrClass + ' ' + arrPrevClass, div(arrArrClass))),
      $arrNext = $(div(arrClass + ' ' + arrNextClass, div(arrArrClass))),
      $arrs = $arrPrev.add($arrNext).appendTo($stage),
      $navWrap = $(div(navWrapClass)),
      $nav = $(div(navClass)).appendTo($navWrap),
      $navShaft = $(div(navShaftClass)).appendTo($nav),
      $navFrame,
      $navDotFrame = $(),
      $navThumbFrame = $(),
      stageFrameKey = '$stageFrame',
      navFrameKey,
      navDotFrameKey = '$navDotFrame',
      navThumbFrameKey = '$navThumbFrame',

      stageShaftData = $stageShaft.data(),
      navShaftData = $navShaft.data(),

      $thumbBorder = $(div(thumbBorderClass)).appendTo($navShaft),

      $fullscreenIcon = $(div(fullscreenIconClass)),
      $videoPlay = $(div(videoPlayClass)),
      $videoClose = $(div(videoCloseClass)).appendTo($stage),

      $videoPlaying,

      activeIndex = false,
      activeFrame,
      repositionIndex,
      dirtyIndex,
      lastActiveIndex,
      prevIndex,
      nextIndex,
      startIndex = false,

      o_loop,
      o_nav,
      o_navTop,
      o_allowFullScreen,
      o_nativeFullScreen,
      o_fade,
      o_thumbSide,
      o_thumbSide2,
      lastOptions = {},

      measures = {},
      measuresSetFLAG,

      stageShaftTouchTail = {},
      navShaftTouchTail = {},

      scrollTop,
      scrollLeft,
      showedFLAG,
      pausedAutoplayFLAG,
      stoppedAutoplayFLAG,
      wrapAppendedFLAG,

      measuresStash;

  $wrap[stageFrameKey] = $(div(stageFrameClass));
  $wrap[navThumbFrameKey] = $(div(navFrameClass + ' ' + navFrameThumbClass, div(thumbClass)));
  $wrap[navDotFrameKey] = $(div(navFrameClass + ' ' + navFrameDotClass, div(dotClass)));


  if (CSS3) {
    $wrap.addClass(wrapCss3Class);
  }

  fotoramaData.fotorama = this;
  that.options = opts;
  _size++;

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
            //////console.log('thumbs', thumbs)
          } else {
            dataFrame.thumbsReady = true;
          }
          updateData(data, {img: thumbs.img, thumb: thumbs.thumb}, dataFrame.i, that);
        }
      }
    });
  }

  function setData () {
    data = that.data = data || getDataFromHtml($fotorama);
    size = that.size = data.length;

    checkForVideo();

    activeIndex = limitIndex(activeIndex);
    navAppend.ok = false;

    if (!size) {
      //that.destroy();
    } else if (!wrapAppendedFLAG) {
      // Заменяем содержимое блока:
      $fotorama
          .html('')
          .append($wrap);

      $.Fotorama.size++;

      wrapAppendedFLAG = true;
    }
  }

  function stageNoMove () {
    stageShaftTouchTail.noMove = size < 2 || $videoPlaying || o_fade;

    $stageShaft.toggleClass(grabClass, !stageShaftTouchTail.noMove);
  }

  function setAutoplayInterval (interval) {
    if (interval === true) interval = '';
    opts.autoplay = Math.max(Number(interval) || AUTOPLAY_INTERVAL, TRANSITION_DURATION * 1.5);
  }

  function addOrRemove (FLAG) {
    return FLAG ? 'add' : 'remove';
  }

  /**
   * Options on the fly
   * */
  function setOptions () {
    o_fade = opts.transition === 'crossfade' || opts.transition === 'dissolve';

    o_loop = opts.loop && (size > 2 || o_fade);

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

    classes[addOrRemove(size > 1)].push('fotorama__wrap--navigation');

    if (opts.autoplay) setAutoplayInterval(opts.autoplay);

    o_thumbSide = numberFromMeasure(opts.thumbWidth) || THUMB_SIZE;
    o_thumbSide2 = numberFromMeasure(opts.thumbHeight) || THUMB_SIZE;

    stageNoMove();

    extendMeasures(opts, true);

    if (o_nav === true || o_nav === 'dots') {
      $nav
          .addClass(navDotsClass)
          .removeClass(navThumbsClass);
      frameDraw(size, 'navDot');
    } else if (o_nav === 'thumbs') {
      setStyle($style, $.Fotorama.jst.style({w: o_thumbSide, h: o_thumbSide2, m: MARGIN, s: stamp, q: !COMPAT}));

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

    classes[addOrRemove(o_fade)].push(wrapFadeClass);
    classes[addOrRemove(!o_fade)].push(wrapSlideClass);

    ooooStop();

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

  function getPrevIndex (index) {
    return index > 0 || o_loop ? index - 1 : false;
  }

  function getNextIndex (index) {
    return index < size - 1 || o_loop ? index + 1 : false;
  }

  function setStageShaftMinMaxPosAndSnap () {
    stageShaftData.minPos = o_loop ? -Infinity : -getPosByIndex(size - 1, measures.w, MARGIN, repositionIndex);
    stageShaftData.maxPos = o_loop ? Infinity : -getPosByIndex(0, measures.w, MARGIN, repositionIndex);
    stageShaftData.snap = measures.w + MARGIN;
  }

  function setNavShaftMinMaxPos () {
    navShaftData.minPos = Math.min(0, measures.w - $navShaft.width());
    navShaftData.maxPos = 0;

    navShaftTouchTail.noMove = navShaftData.minPos === navShaftData.maxPos;

    $navShaft.toggleClass(grabClass, !navShaftTouchTail.noMove);
  }

  function eachIndex (indexes, type, fn) {
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
      width = measureIsValid(opts.width) || measureIsValid(width) || WIDTH;
      height = measureIsValid(opts.height) || measureIsValid(height) || HEIGHT;
      that.resize({
        width: width,
        ratio: opts.ratio || ratio || width / height
      }, 0, index === startIndex ? true : '*');
    }
  }

  function loadImg (indexes, type, specialMeasures, specialFit, again) {
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

      function triggerTriggerEvent (event) {
        var _index = normalizeIndex(index);
        triggerEvent(event, {
          index: _index,
          src: src,
          frame: data[_index]
        });
      }

      function error () {
        //////console.log('error', index, src);
        $img.remove();

        $.Fotorama.cache[src] = 'error';

        if ((!dataFrame.$html || type !== 'stage') && dummy && dummy !== src) {
          dataFrame[srcKey] = src = dummy;
          loadImg([index], type, specialMeasures, specialFit, true);
        } else {
          if (src && !frameData.$html) {
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

          if (size > 1 && !dataFrame.html && !dataFrame.deleted && !dataFrame.video && !fullFLAG) {
            dataFrame.deleted = true;
            that.splice(index, 1);
          }
        }
      }

      function loaded () {
        //////console.log('loaded', index, src);

        var width = img.width,
            height = img.height,
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
            triggerTriggerEvent('load');
          }
        }, 5);
      }

      if (!src) {
        error();
        return;
      }

      function waitAndLoad () {
        waitFor(function () {
          return true;/*!isHidden(img)*//* && !touchedFLAG*/;
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
            waitAndLoad();
          } else {
            setTimeout(justWait, 100);
          }
        })();
      }

      img.src = src;
      //$img.appendTo($.Fotorama.$load);
    });
  }

  function updateFotoramaState () {
    var $frame = that.activeFrame[stageFrameKey];

    if ($frame && !$frame.data().state) {
      ooooStart($frame);
      $frame.on('f:load f:error', function () {
        $frame.off('f:load f:error');
        ooooStop();
      });
    }
  }

  function frameDraw (indexes, type) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {
      //////console.log('frameDraw');

      if ($frame) return;

      //////console.log('frameDraw execute');

      $frame = dataFrame[key] = $wrap[key].clone();
      frameData = $frame.data();
      frameData.data = dataFrame;

      if (type === 'stage') {

        ////////console.log('dataFrame.html', $(dataFrame.html).html());

        if (dataFrame.html) {
          $('<div class="' + htmlClass + '"></div>')
              .append(
                  $(dataFrame.html)
                      .removeAttr('id')
                      .html(dataFrame._html) // Because of IE
              )
              .appendTo($frame);
        }

        if (opts.captions && dataFrame.caption) {
          $('<div class="' + captionClass + '"></div>').append(dataFrame.caption).appendTo($frame);
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

  function stageFramePosition (indexes) {
    eachIndex(indexes, 'stage', function (i, index, dataFrame, $frame, key, frameData) {
      if (!$frame) return;

      $frame
          .css($.extend({left: o_fade ? 0 : getPosByIndex(index, measures.w, MARGIN, repositionIndex)/*, display: 'block'*/}, o_fade && getDuration(0)));
      //.fadeTo(0, o_fade && index !== activeIndex ? 0 : 1);

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

  function getNavFrameCenter ($navFrame) {
    return $navFrame.position().left + (o_thumbSide) / 2
  }

  function slideThumbBorder (time) {
    slide($thumbBorder, {
      time: time * .9,
      pos: getNavFrameCenter(that.activeFrame[navFrameKey])
    });
  }

  function slideNavShaft (options) {
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

  function navUpdate () {
    //////console.log('navUpdate', o_nav);
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
      $stageFrame
          .not(that.activeFrame[stageFrameKey].addClass(activeClass))
          //.css({display: 'none'})
        //.hide()
        //.data('hidden', true)
          .detach()
          .data('appended', false)
          .removeClass(activeClass);

      stop($stageShaft);
      $stageShaft.css(getTranslate(0));

      stageFramePosition([activeIndex, prevIndex, nextIndex]);
      setStageShaftMinMaxPosAndSnap();
      setNavShaftMinMaxPos();
    }
  }

  function extendMeasures (options, optsLeave) {
    options && $.extend(measures, {
      width: options.width || measures.width,
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
    })
        && !optsLeave && $.extend(opts, {
      width: measures.width,
      height: measures.height,
      minWidth: measures.minWidth,
      maxWidth: measures.maxWidth,
      minHeight: measures.minHeight,
      maxHeight: measures.maxHeight,
      ratio: measures.ratio
    });
  }

  function triggerEvent (event, extra) {
    ////console.log('triggerEvent', event, extra);
    $fotorama.trigger(_fotoramaClass + ':' + event, [that, extra]);
  }

  function eventData (index) {
    ////console.log('eventData', index);
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
        triggerEvent('stopautoplay');
      }

      return;
    }

    if (!that.autoplay) {
      that.autoplay = true;
      triggerEvent('startautoplay');
    }

    var _activeIndex = activeIndex;

    changeAutoplay.t = setTimeout(function () {
      var frameData = that.activeFrame[stageFrameKey].data();
      waitFor(function () {
        return frameData.state || _activeIndex !== activeIndex;
      }, function () {
        if (pausedAutoplayFLAG || _activeIndex !== activeIndex) return;
        that.show({index: normalizeIndex(activeIndex + 1)});
      });
    }, opts.autoplay);
  }


  that.startAutoplay = function (interval) {
    if (that.autoplay) return this;
    pausedAutoplayFLAG = stoppedAutoplayFLAG = false;
    setAutoplayInterval(interval || opts.autoplay);
    changeAutoplay();

    return this;
  }

  that.stopAutoplay = function () {
    if (that.autoplay) {
      pausedAutoplayFLAG = stoppedAutoplayFLAG = true;
      changeAutoplay();
    }
    return this;
  };

  that.show = function (options) {
    var index,
        time = TRANSITION_DURATION,
        overPos;

    if (typeof options !== 'object') {
      index = options;
      options = {};
    } else {
      index = options.index;
      time = typeof options.time === 'number' ? options.time : time;
      overPos = options.overPos;
    }

    if (options.slow) time *= 10;

//    index = index === '>' ? dirtyIndex + 1 : index === '<' ? dirtyIndex - 1 : index === '<<' ? 0 : index === '>>' ? size - 1 : typeof index === 'string' ? getIndexFromHash(index, data, true) : index;
//    index = isNaN(index) ? activeIndex || 0 : index;

    index = index === '>' ? dirtyIndex + 1 : index === '<' ? dirtyIndex - 1 : index === '<<' ? 0 : index === '>>' ? size - 1 : index;
    index = isNaN(index) ? getIndexFromHash(index, data, true) : index;
    index = typeof index === 'undefined' ? activeIndex || 0 : index;

    that.activeIndex = activeIndex = o_loop ? normalizeIndex(index) : limitIndex(index);
    prevIndex = getPrevIndex(activeIndex);
    nextIndex = getNextIndex(activeIndex);

    dirtyIndex = o_loop ? index : activeIndex;

    that.activeFrame = activeFrame = data[activeIndex];

    unloadVideo(false, activeFrame.i !== data[normalizeIndex(repositionIndex)].i);

    frameDraw([activeIndex, prevIndex, nextIndex], 'stage');
    stageFramePosition([dirtyIndex]);

    triggerEvent('show', options.direct); // TODO: test that .activeFrame is ready event on the first show

    function onEnd () {

      updateFotoramaState();
      loadImg([activeIndex, prevIndex, nextIndex], 'stage');
      stageShaftReposition(); /////

      triggerEvent('showend', options.direct);

      releaseAutoplay();
      changeAutoplay();
    }

    if (!o_fade) {
      slide($stageShaft, {
        pos: -getPosByIndex(dirtyIndex, measures.w, MARGIN, repositionIndex),
        overPos: overPos,
        time: time,
        onEnd: onEnd
      });
    } else {
      var $activeFrame = activeFrame[stageFrameKey],
          $prevActiveFrame = activeIndex !== lastActiveIndex ? data[lastActiveIndex][stageFrameKey] : null;

      fade($activeFrame, $prevActiveFrame, $stageFrame, {
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

    showedFLAG = typeof lastActiveIndex !== 'undefined' && lastActiveIndex !== activeIndex;
    lastActiveIndex = activeIndex;
    opts.hash && showedFLAG && !that.eq && setHash(activeFrame.id || activeIndex + 1);

    return this;
  };

  that.requestFullScreen = function () {
    if (o_allowFullScreen && !that.fullScreen) {
      scrollTop = $WINDOW.scrollTop();
      scrollLeft = $WINDOW.scrollLeft();

      $WINDOW.scrollTop(0).scrollLeft(0);

      measuresStash = $.extend({}, measures);

      $fotorama
          .addClass(fullscreenClass)
          .appendTo($BODY.addClass(_fullscreenClass));


      ////console.log('measuresStash', measuresStash, measures);

      unloadVideo($videoPlaying, true);

      that.fullScreen = true;

      if (o_nativeFullScreen) {
        fullScreenApi.request(fotorama);
      }

      //setTimeout(function () {
        //$WINDOW.scrollTop(scrollTop).scrollLeft(scrollLeft);
        // Timeout for Safari
        //$BODY;

        that.resize();
        loadImg([activeIndex, prevIndex, nextIndex], 'stage');
      //}, 0);

      triggerEvent('fullscreenenter');
    }

    return this;
  };

  function cancelFullScreen () {
    ////console.log('/!\ cancelFullScreen');

    if (that.fullScreen) {
      that.fullScreen = false;

      if (FULLSCREEN) {
        fullScreenApi.cancel(fotorama);
      }

      $BODY.removeClass(_fullscreenClass);

      $fotorama
          .removeClass(fullscreenClass)
          .insertAfter($anchor);

      triggerEvent('fullscreenexit');

      measures = $.extend({}, measuresStash);

      ////console.log('measures', measures, measuresStash);

      unloadVideo($videoPlaying, true);

      that.resize();
      loadImg([activeIndex, prevIndex, nextIndex], 'stage');

      $WINDOW.scrollLeft(scrollLeft).scrollTop(scrollTop);
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
        that.show({index: '>', slow: e.altKey, direct: true});
      } else if (e.keyCode === 37 || (e.keyCode === 38 && that.fullScreen)) {
        e.preventDefault();
        that.show({index: '<', slow: e.altKey, direct: true});
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

  that.resize = function (options) {
    if (!data) return;

    extendMeasures(!that.fullScreen ? options : {width: '100%', maxWidth: null, minWidth: null, height: '100%', maxHeight: null, minHeight: null}, that.fullScreen);

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
        width = Math.round(width);
        height = measures.h = Math.round(minMaxLimit(height, numberFromPercent(measures.minHeight) / 100 * windowHeight || numberFromMeasure(measures.minHeight), numberFromPercent(measures.maxHeight) / 100 * windowHeight || numberFromMeasure(measures.maxHeight)));

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
  };

  that.setOptions = function (options) {
    $.extend(opts, options);
    reset();
    return this;
  };


  function setShadow ($el, edge) {
    $el.removeClass(shadowsLeftClass + ' ' + shadowsRightClass);
    edge && !$videoPlaying && $el.addClass(edge.replace(/^|\s/g, ' ' + shadowsClass + '--'));
  }

  that.destroy = function () {
    ////console.log('destroy');
    that.stopAutoplay();
    $wrap.detach();
    $fotorama.html(fotoramaData.urtext);
    wrapAppendedFLAG = false;
    data = that.data = null;
    $.Fotorama.size--;
    return this;
  };

  that.playVideo = function () {
    var dataFrame = that.activeFrame,
        video = dataFrame.video,
        _activeIndex = activeIndex;

    if (typeof video === 'object' && dataFrame.videoReady) {
      o_nativeFullScreen && that.fullScreen && that.cancelFullScreen();

      waitFor(function () {
        return !fullScreenApi.is() || _activeIndex !== activeIndex;
      }, function () {
        if (_activeIndex === activeIndex) {
          dataFrame.$video = dataFrame.$video || $($.Fotorama.jst.video(video));
          dataFrame.$video.appendTo(dataFrame[stageFrameKey]);

          $wrap.addClass(wrapVideoClass);
          $videoPlaying = dataFrame.$video;
          stageShaftTouchTail.noMove = true;

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

  $wrap.hover(
      function () {
        toggleControlsClass(false);
      }, function () {
        toggleControlsClass(true);
      }
  );

  function onStageTap (e, touch) {
    if ($videoPlaying) {
      unloadVideo($videoPlaying, true, true);
    } else {
      if (touch) {
        toggleControlsClass();
      } else {
        that.show({index: e.shiftKey || e._x - $stage.offset().left < measures.w / 3 ? '<' : '>', slow: e.altKey, direct: true});
      }
    }
  }

  stageShaftTouchTail = moveOnTouch($stageShaft, {
    onStart: onTouchStart,
    onMove: function (e, result) {
      setShadow($stage, result.edge);
    },
    onEnd: function (result) {
      setShadow($stage);

      if (result.moved || (result.touch && result.pos !== result.newPos)) {
        var index = getIndexByPos(result.newPos, measures.w, MARGIN, repositionIndex);
        that.show({
          index: index,
          time: result.time,
          overPos: result.overPos,
          direct: true
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

  function onNavFrameClick (e, time) {
    var index = $(this).data().eq;
    that.show({index: index, slow: e.altKey, direct: true, coo: e._x - $nav.offset().left, time: time});
  }

  smartClick($arrs, function (e) {
    e.preventDefault();
    if ($videoPlaying) {
      unloadVideo($videoPlaying, true, true);
    } else {
      that.show({index: $arrs.index(this) ? '>' : '<', slow: e.altKey, direct: true});
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
      that.show({index: activeIndex, time: 0});
      that.resize();
    } else {
      that.destroy();
    }
  }

  $.each('load push pop shift unshift reverse sort splice'.split(' '), function (i, method) {
    that[method] = function () {
      data = data || [];
      if (method !== 'load') {
        Array.prototype[method].apply(data, arguments);
      } else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].length) {
        data = arguments[0];
      }
      reset();
      return that;
    }
  });

  function ready () {
    if (!ready.ok) {
      ready.ok = true;
      $wrap.removeClass(wrapNotReadyClass);
      triggerEvent('ready');
    }
  }

  $WINDOW.on('resize', that.resize);
  reset();
};

$.fn.fotorama = function (opts) {
  return this.each(function () {
    var that = this,
        $fotorama = $(this),
        fotoramaData = $fotorama.data(),
        fotorama = fotoramaData.fotorama;

    if (!fotorama) {
      waitFor(function () {
        return !isHidden(that);
      }, function () {
        fotoramaData.urtext = $fotorama.html();
        new $.Fotorama($fotorama,
            /* Priority for options:
             * 1. <div data-loop="true"></div>
             * 2. $('div').fotorama({loop: false})
             * 3. Defaults */
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
                  ratio: null, // '16/9' || 500/333 || 1.5

                  // navigation, thumbs
                  nav: 'dots', // 'thumbs' || false
                  navPosition: 'bottom', // 'top'
                  thumbWidth: THUMB_SIZE,
                  thumbHeight: THUMB_SIZE,

                  allowFullScreen: false, // true || 'native'

                  fit: 'contain', // 'cover' || 'scale-down' || 'none'

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
      fotorama.setOptions(opts);
    }
  });
//  }
};

$.Fotorama.cache = {};

var _size = 0;
$.Fotorama.size = 0;

$(function () {
  $('.' + _fotoramaClass + ':not([data-auto="false"])').fotorama();
});
$ = $ || {};
$.Fotorama = $.Fotorama || {};
$.Fotorama.jst = $.Fotorama.jst || {};

$.Fotorama.jst.style = function(v) {
var __t, __p = '', __e = _.escape;
__p += '.fotorama' +
((__t = ( v.s )) == null ? '' : __t) +
' .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:' +
((__t = ( v.m )) == null ? '' : __t) +
'px;\npadding-left:0;\nwidth:' +
((__t = ( v.w )) == null ? '' : __t) +
'px;\nheight:' +
((__t = ( v.h )) == null ? '' : __t) +
'px}\n.fotorama' +
((__t = ( v.s )) == null ? '' : __t) +
' .fotorama__nav--thumbs .fotorama__nav__frame:last-child{\npadding-right:0}\n.fotorama' +
((__t = ( v.s )) == null ? '' : __t) +
' .fotorama__thumb{\nwidth:' +
((__t = ( v.w )) == null ? '' : __t) +
'px;\nheight:' +
((__t = ( v.h )) == null ? '' : __t) +
'px}\n.fotorama' +
((__t = ( v.s )) == null ? '' : __t) +
' .fotorama__thumb-border{\nwidth:' +
((__t = ( v.w - v.m * (v.q ? 0 : 2) )) == null ? '' : __t) +
'px;\nheight:' +
((__t = ( v.h - v.m * (v.q ? 0 : 2) )) == null ? '' : __t) +
'px;\nborder-width:' +
((__t = ( v.m )) == null ? '' : __t) +
'px;\nmargin-top:' +
((__t = ( v.m )) == null ? '' : __t) +
'px;\nmargin-left:' +
((__t = ( - v.w / 2 )) == null ? '' : __t) +
'px}';
return __p
};

$.Fotorama.jst.video = function(v) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="fotorama__video"><iframe src="';
 print(v.type == 'youtube' ? 'http://youtube.com/embed/' + v.id +'?autoplay=1' : v.type == 'vimeo' ? 'http://player.vimeo.com/video/' + v.id + '?autoplay=1&amp;badge=0' : v.id) ;
__p += '" frameborder="0" allowfullscreen></iframe></div>';
return __p
};
})
(window, document, jQuery);
