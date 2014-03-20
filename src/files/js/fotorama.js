$(function () {
  var $fotorama = $('#fotorama');

  if ($fotorama[0] && window.Photos) {
    var $window = $(window),
        pixelRatio = window.devicePixelRatio || 1,
        width = Math.min(window.innerWidth * pixelRatio, 1280),
        ratio = 1.5,
        maxRatio = 2.5,
        _thumbSize = 64,
        _thumbMargin = 2,
        maxThumbSize = _thumbSize * pixelRatio,
        hash = location.hash.replace(/^#/, ''),
        hashIndex = +(hash.split('__'))[0],
        albumIndex = hashIndex > 0 ? hashIndex - 1 : Math.round(Math.random() * (Photos.length - 1)),
        album = Photos[albumIndex];


    var data = $.map(album.uuids, function (uuid) {
      var full = 'http://www.ucarecdn.com/' + uuid + '/';
      return {
        full: full,
        img: full + '-/stretch/off/-/resize/' + width + 'x/',
        thumb: full + '-/scale_crop/' + maxThumbSize + 'x' + maxThumbSize + '/center/',
        id: (albumIndex + 1) + '__' + uuid
      }
    });

    console.log('# Fotorama events');

    $fotorama
        .on('fotorama:ready '            // Fotorama is fully ready, dimensions are set
            + 'fotorama:show '           // Start of transition to the new frame
            + 'fotorama:showend '        // End of the show transition
            + 'fotorama:load '           // Stage image of some frame is loaded
            + 'fotorama:error '          // Stage image of some frame is broken
            //+ 'fotorama:startautoplay ' // Slideshow is started
            //+ 'fotorama:stopautoplay '  // Slideshow is stopped
            + 'fotorama:fullscreenenter ' // Fotorama is fullscreened
            + 'fotorama:fullscreenexit '  // Fotorama is unfullscreened
            //+ 'fotorama:loadvideo '    // Video iframe is loaded
            //+ 'fotorama:unloadvideo'   // Video iframe is removed
            , function (e, fotorama, extra) {
              console.log('## ' + e.type);

              if (!extra || !extra.src) {
                console.log('active image: ' + fotorama.activeFrame.img);
              }

              if (extra) {
                extra.time && console.log('transition duration: ' + Math.round(extra.time) + 'ms');
                extra.src && console.log((e.type === 'fotorama:load' ? 'loaded' : 'broken') + ' image: ' + extra.src);
              }

              console.log('');
            }
        )
        .fotorama({
          data: data,
          width: '100%',
          ratio: ratio,
          hash: true,
          maxheight: '100%',
          nav: 'thumbs',
          margin: 0,
          shuffle: true,
          thumbmargin: _thumbMargin,
          /*allowfullscreen: 'native',*/
          keyboard: true,
          shadows: false,
          fit: 'cover',
          spinner: {
            color: 'rgba(255, 255, 255, .75)'
          }
        });

    $('#photos-by').html('Photos by <a href="' + album.by.href +'" class="js-analytics-click" data-action="outbound">by ' + album.by.title + '</a>');

    var fotorama = $fotorama.data('fotorama');
    var lastThumbSize, lastMinHeight;

    $window.on('resize', function () {
      var innerWidth = window.innerWidth,
          thumbSize = _thumbSize,
          options = {};

      if (innerWidth < 520) {
        thumbSize = _thumbSize - 8 * 2;
      } else if (innerWidth < 640) {
        thumbSize = _thumbSize - 8;
      }

      var minHeight = Math.round(innerWidth / maxRatio);

      if (thumbSize !== lastThumbSize) {
        console.log('Resize thumbs to ' + thumbSize + '×' + thumbSize + 'px');
        console.log('');

        $.extend(options, {thumbwidth: thumbSize, thumbheight: thumbSize});

        lastThumbSize = thumbSize;
      }

      if (minHeight !== lastMinHeight) {
        console.log('Set min height to ' + minHeight + 'px');
        console.log('');

        $.extend(options, {minheight: minHeight});

        lastMinHeight = minHeight;
      }

      fotorama.setOptions(options);
    }).resize();
  }
});