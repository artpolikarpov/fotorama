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
                  minwidth: null,
                  maxwidth: '100%', // '100%'
                  height: null,
                  minheight: null,
                  maxheight: null,
                  ratio: null, // '16/9' || 500/333 || 1.5

                  // navigation, thumbs
                  nav: 'dots', // 'thumbs' || false
                  navposition: 'bottom', // 'top'
                  thumbwidth: THUMB_SIZE,
                  thumbheight: THUMB_SIZE,

                  arrows: true,
                  click: true,
                  swipe: true,

                  allowfullscreen: false, // true || 'native'

                  fit: 'contain', // 'cover' || 'scaledown' || 'none'

                  transition: 'slide', // 'crossfade' || 'dissolve'
                  transitionduration: TRANSITION_DURATION,

                  captions: true,

                  hash: false,

                  autoplay: false,
                  stopautoplayontouch: true,

                  keyboard: false,

                  loop: false,

                  shuffle: false,

                  shadows: true
                },
                opts,
                fotoramaData
            )
        );
      });
    } else {
      fotorama.setOptions(opts);
    }
  });
};