function noop () {}

function minMaxLimit (value, min, max) {
  return Math.max(isNaN(min) ? -Infinity : min, Math.min(isNaN(max) ? Infinity : max, value));
}

function readTransform (css) {
  return css.match(/ma/) && css.match(/-?\d+(?!d)/g)[css.match(/3d/) ? 12 : 4];
}

function readPosition ($el) {
  if (CSS3) {
    return +readTransform($el.css('transform'));
  } else {
    return +$el.css('left').replace('px', '');
  }
}

function getTranslate (pos/*, _001*/) {
  var obj = {};
  if (CSS3) {
    obj.transform = 'translate3d(' + (pos/* + (_001 ? 0.001 : 0)*/) + 'px,0,0)'; // 0.001 to remove Retina artifacts
  } else {
    obj.left = pos;
  }
  return obj;
}

function getDuration (time) {
  return {'transition-duration': time + 'ms'};
}

function unlessNaN (value, alternative) {
  return isNaN(value) ? alternative : value;
}

function numberFromMeasure (value, measure) {
  return unlessNaN(+String(value).replace(measure || 'px', ''));
}

function numberFromPercent (value) {
  return /%$/.test(value) ? numberFromMeasure(value, '%') : undefined;
}

function numberFromWhatever (value, whole) {
  return unlessNaN(numberFromPercent(value) / 100 * whole, numberFromMeasure(value));
}

function measureIsValid (value) {
  return (!isNaN(numberFromMeasure(value)) || !isNaN(numberFromMeasure(value, '%'))) && value;
}

function getPosByIndex (index, side, margin, baseIndex) {
  //console.log('getPosByIndex', index, side, margin, baseIndex);
  //console.log((index - (baseIndex || 0)) * (side + (margin || 0)));

  return (index - (baseIndex || 0)) * (side + (margin || 0));
}

function getIndexByPos (pos, side, margin, baseIndex) {
  return -Math.round(pos / (side + (margin || 0)) - (baseIndex || 0));
}

function bindTransitionEnd ($el) {
  var elData = $el.data();

  if (elData.tEnd) return;

  var el = $el[0],
      transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        msTransition: 'MSTransitionEnd',
        transition: 'transitionend'
      };
  addEvent(el, transitionEndEvent[Modernizr.prefixed('transition')], function (e) {
    elData.tProp && e.propertyName.match(elData.tProp) && elData.onEndFn();
  });
  elData.tEnd = true;
}

function afterTransition ($el, property, fn, time) {
  var ok,
      elData = $el.data();

  if (elData) {
    elData.onEndFn = function () {
      if (ok) return;
      ok = true;
      clearTimeout(elData.tT);
      fn();
    };
    elData.tProp = property;

    // Passive call, just in case of fail of native transition-end event
    clearTimeout(elData.tT);
    elData.tT = setTimeout(function () {
      elData.onEndFn();
    }, time * 1.5);

    bindTransitionEnd($el);
  }
}


function stop ($el, left/*, _001*/) {
  if ($el.length) {
    var elData = $el.data();
    if (CSS3) {
      $el.css(getDuration(0));
      elData.onEndFn = noop;
      clearTimeout(elData.tT);
    } else {
      $el.stop();
    }
    var lockedLeft = getNumber(left, function () {
      return readPosition($el);
    });

    $el.css(getTranslate(lockedLeft/*, _001*/));//.width(); // `.width()` for reflow
    return lockedLeft;
  }
}

function getNumber () {
  var number;
  for (var _i = 0, _l = arguments.length; _i < _l; _i++) {
    number = _i ? arguments[_i]() : arguments[_i];
    if (typeof number === 'number') {
      break;
    }
  }

  return number;
}

function edgeResistance (pos, edge) {
  return Math.round(pos + ((edge - pos) / 1.5));
}

function getProtocol () {
  getProtocol.p = getProtocol.p || (location.protocol === 'https:' ? 'https://' : 'http://');
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

  if ((!id || !type) && forceVideo) {
    id = href.href;
    type = 'custom';
  }

  return id ? {id: id, type: type, s: href.search.replace(/^\?/, ''), p: getProtocol()} : false;
}

function getVideoThumbs (dataFrame, data, fotorama) {
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
        updateData(data, {img: json[0].thumbnail_large, thumb: json[0].thumbnail_small}, dataFrame.i, fotorama);
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

function updateData (data, _dataFrame, i, fotorama) {
  for (var _i = 0, _l = data.length; _i < _l; _i++) {
    var dataFrame = data[_i];

    if (dataFrame.i === i && dataFrame.thumbsReady) {
      var clear = {videoReady: true};
      clear[STAGE_FRAME_KEY] = clear[NAV_THUMB_FRAME_KEY] = clear[NAV_DOT_FRAME_KEY] = false;

      fotorama.splice(_i, 1, $.extend(
          {},
          dataFrame,
          clear,
          _dataFrame
      ));

      break;
    }
  }
}

function getDataFromHtml ($el) {
  var data = [];

  function getDataFromImg ($img, imgData, checkVideo) {
    var $child = $img.children('img').eq(0),
        _imgHref = $img.attr('href'),
        _imgSrc = $img.attr('src'),
        _thumbSrc = $child.attr('src'),
        _video = imgData.video,
        video = checkVideo ? findVideoId(_imgHref, _video === true) : false;

    if (video) {
      _imgHref = false;
    } else {
      video = _video;
    }

    getDimensions($img, $child, $.extend(imgData, {
      video: video,
      img: imgData.img || _imgHref || _imgSrc || _thumbSrc,
      thumb: imgData.thumb || _thumbSrc || _imgSrc || _imgHref
    }));
  }

  function getDimensions ($img, $child, imgData) {
    var separateThumbFLAG = imgData.thumb && imgData.img !== imgData.thumb,
        width = numberFromMeasure(imgData.width || $img.attr('width')),
        height = numberFromMeasure(imgData.height || $img.attr('height'));

    $.extend(imgData, {
      width: width,
      height: height,
      thumbratio: getRatio(imgData.thumbratio || (numberFromMeasure(imgData.thumbwidth || ($child && $child.attr('width')) || separateThumbFLAG || width) / numberFromMeasure(imgData.thumbheight || ($child && $child.attr('height')) || separateThumbFLAG || height)))
    });
  }

  $el.children().each(function () {
    var $this = $(this),
        dataFrame = optionsToLowerCase($.extend($this.data(), {id: $this.attr('id')}));
    if ($this.is('a, img')) {
      getDataFromImg($this, dataFrame, true);
    } else if (!$this.is(':empty')) {
      getDimensions($this, null, $.extend(dataFrame, {
        html: this,
        _html: $this.html() // Because of IE
      }));
    } else return;

    data.push(dataFrame);
  });

  return data;
}

function isHidden (el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

function isDetached (el) {
  return !$.contains(document.documentElement, el);
}

function waitFor (test, fn, timeout, i) {
  if (!waitFor.i) {
    waitFor.i = 1;
    waitFor.ii = [true];
  }

  i = i || waitFor.i;

  if (typeof waitFor.ii[i] === 'undefined') {
    waitFor.ii[i] = true;
  }

  if (test()) {
    fn();
  } else {
    waitFor.ii[i] && setTimeout(function () {
      waitFor.ii[i] && waitFor(test, fn, timeout, i);
    }, timeout || 100);
  }

  return waitFor.i++;
}

waitFor.stop = function (i) {
  waitFor.ii[i] = false;
};

function setHash (hash) {
  ////console.time('setHash ' + hash);
  location.replace(location.protocol
      + '//'
      + location.host
      + location.pathname.replace(/^\/?/, '/')
      + location.search
      + '#' + hash);
  ////console.timeEnd('setHash ' + hash);
}

function fit ($el, measuresToFit, method, position) {
  var elData = $el.data(),
      measures = elData.measures;

  if (measures && (!elData.l ||
      elData.l.W !== measures.width ||
      elData.l.H !== measures.height ||
      elData.l.r !== measures.ratio ||
      elData.l.w !== measuresToFit.w ||
      elData.l.h !== measuresToFit.h ||
      elData.l.m !== method ||
      elData.l.p !== position)) {

    console.log('fit');

    var width = measures.width,
        height = measures.height,
        ratio = measuresToFit.w / measuresToFit.h,
        biggerRatioFLAG = measures.ratio >= ratio,
        fitFLAG = method === 'scaledown',
        containFLAG = method === 'contain',
        coverFLAG = method === 'cover',
        pos = parsePosition(position);

    if (biggerRatioFLAG && (fitFLAG || containFLAG) || !biggerRatioFLAG && coverFLAG) {
      width = minMaxLimit(measuresToFit.w, 0, fitFLAG ? width : Infinity);
      height = width / measures.ratio;
    } else if (biggerRatioFLAG && coverFLAG || !biggerRatioFLAG && (fitFLAG || containFLAG)) {
      height = minMaxLimit(measuresToFit.h, 0, fitFLAG ? height : Infinity);
      width = height * measures.ratio;
    }

    $el.css({
      width: width,
      height: height,
      left: numberFromWhatever(pos.x, measuresToFit.w - width),
      top: numberFromWhatever(pos.y, measuresToFit.h- height)
    });

    elData.l = {
      W: measures.width,
      H: measures.height,
      r: measures.ratio,
      w: measuresToFit.w,
      h: measuresToFit.h,
      m: method,
      p: position
    };
  }

  return true;
}

function setStyle ($el, style) {
  var el = $el[0];
  if (el.styleSheet) {
    el.styleSheet.cssText = style;
  } else {
    $el.html(style);
  }
}

function findShadowEdge (pos, min, max) {
  return min === max ? false : pos <= min ? 'left' : pos >= max ? 'right' : 'left right';
}

function getIndexFromHash (hash, data, ok, startindex) {
  if (!ok) return false;
  if (!isNaN(hash)) return hash - (startindex ? 0 : 1);

  var index;

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
      onTouchEnd: _options.onTouchEnd || noop,
      onEnd: function (result) {
        //console.log('smartClick → result.moved', result.moved);
        if (result.moved) return;
        fn.call(this, startEvent);
      }
    }), {noMove: true});
  });
}

function div (classes, child) {
  return '<div class="' + classes + '">' + (child || '') + '</div>';
}

// Fisher–Yates Shuffle
// http://bost.ocks.org/mike/shuffle/
function shuffle (array) {
  // While there remain elements to shuffle
  var l = array.length;
  while (l) {
    // Pick a remaining element
    var i = Math.floor(Math.random() * l--);

    // And swap it with the current element
    var t = array[l];
    array[l] = array[i];
    array[i] = t;
  }

  return array;
}

function clone (array) {
  return Object.prototype.toString.call(array) == '[object Array]'
      && $.map(array, function (frame) {
       return $.extend({}, frame);
      });
}

function lockScroll ($el, left, top) {
  $el
    .scrollLeft(left || 0)
    .scrollTop(top || 0);
}

function optionsToLowerCase (options) {
  if (options) {
    var opts = {};
    $.each(options, function (key, value) {
      opts[key.toLowerCase()] = value;
    });

    return opts;
  }
}

function getRatio (_ratio) {
  if (!_ratio) return;
  var ratio = +_ratio;
  if (!isNaN(ratio)) {
    return ratio;
  } else {
    ratio = _ratio.split('/');
    return +ratio[0] / +ratio[1] || undefined;
  }
}

function addEvent (el, e, fn, bool) {
  if (!e) return;
  el.addEventListener ? el.addEventListener(e, fn, !!bool) : el.attachEvent('on'+e, fn);
}

function elIsDisabled (el) {
  return !!el.getAttribute('disabled');
}

function disableAttr (FLAG) {
  return {tabindex: FLAG * -1 + '', disabled: FLAG};
}

function addEnterUp (el, fn) {
  addEvent(el, 'keyup', function (e) {
    elIsDisabled(el) || e.keyCode == 13 && fn.call(el, e);
  });
}

function addFocus (el, fn) {
  addEvent(el, 'focus', el.onfocusin = function (e) {
    fn.call(el, e);
  }, true);
}

function stopEvent (e, stopPropagation) {
  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  stopPropagation && e.stopPropagation && e.stopPropagation();
}

function getDirectionSign (forward) {
  return forward ? '>' : '<';
}

function parsePosition (rule) {
  rule = (rule + '').split(/\s+/);
  return {
    x: measureIsValid(rule[0]) || FIFTYFIFTY,
    y: measureIsValid(rule[1]) || FIFTYFIFTY
  }
}