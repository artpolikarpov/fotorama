document.write(
    '<div class="fotorama" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg">' +
        '<img src="test/i/okonechnikov/6-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
    '</div>'
);

describe('setOptions()', function () {
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

  // more coming soon...
});