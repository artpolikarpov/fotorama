document.write(
    '<div class="fotorama" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg" data-caption="One">' +
        '<img src="test/i/okonechnikov/2-lo.jpg" data-caption="Two">' +
        '<img src="test/i/okonechnikov/9-lo.jpg" data-caption="Nine">' +
        '<img src="test/i/okonechnikov/6-lo.jpg" data-caption="Six">' +
        '<img src="test/i/okonechnikov/5-lo.jpg" data-caption="Five">' +
    '</div>'
);

describe('Manipulates the fotorama options at runtime', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
  });

  it('arrows', function () {
    var $prev = $('.fotorama__arr--prev'),
        $next = $('.fotorama__arr--next');

    function _expect (that) {
      expect($prev.is(':visible')).toBe(that);
      expect($next.is(':visible')).toBe(that);
    }

    _expect(true);

    fotorama.setOptions({arrows: false});
    _expect(false);

    fotorama.setOptions({arrows: true});
    _expect(true);
  });

  it('captions', function () {
    var $activeCaption = $('.fotorama__caption', fotorama.activeFrame.$stageFrame);

    expect($activeCaption.text()).toBe('One');
    expect($activeCaption.is(':visible')).toBe(true);

    fotorama.setOptions({captions: false});
    expect($activeCaption.is(':visible')).toBe(false);

    fotorama.setOptions({captions: true});
    expect($activeCaption.is(':visible')).toBe(true);
  });

  // more coming soon...
});