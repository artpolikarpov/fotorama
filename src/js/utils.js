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


function stop ($el, left) {
  if ($el.length) {
  if (CSS3) {
    $el
        .css(getDuration(0))
        .data('onEndFn', noop);
  } else {
    $el.stop();
  }
    //console.log('$el.length', $el);
    var lockedLeft = left || readPosition($el);
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
  //console.log('getVideoThumbs');

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

function isDetached (el) {
  return !$.contains(document.documentElement, el);
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
  //console.log('fit');

  var elData = $el.data(),
      measures = elData.measures;

  if (measures && (!elData.l ||
      elData.l.W !== measures.width ||
      elData.l.H !== measures.height ||
      elData.l.r !== measures.ratio ||
      elData.l.w !== measuresToFit.w ||
      elData.l.h !== measuresToFit.h ||
      elData.l.m !== method)) {

    //console.log('fit execute', measures, measuresToFit);

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
  if (!isNaN(hash)) return hash - 1;

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