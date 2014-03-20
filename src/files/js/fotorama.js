$(function () {
  var $window = $(window),
      $fotorama = $('#fotorama');

  if ($fotorama[0]) {
    if (window.innerWidth * (window.devicePixelRatio || 1) > 768) {
      $('a', $fotorama).each(function () {
        var $a = $(this);
        $a.attr('href', $a.attr('href').replace('-lo.jpg', '.jpg'));
      });
    }

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
          spinner: {
            color: 'rgba(255, 255, 255, .75)'
          }
        })
        .parent()
        .next('.photos-by')
        .show();

    var fotorama = $fotorama.data('fotorama');
    var lastThumbHeight;

    $window.on('resize', function () {
      var innerWidth = window.innerWidth,
          thumbHeight;

      if (innerWidth < 520) {
        thumbHeight = 32;
      } else if (innerWidth < 640) {
        thumbHeight = 40;
      } else {
        thumbHeight = 48;
      }

      if (thumbHeight !== lastThumbHeight) {
        console.log('Change thumbs height to ' + thumbHeight + 'px');
        console.log('');

        fotorama.setOptions({thumbheight: (lastThumbHeight = thumbHeight)});
      }
    }).resize();
  }
});