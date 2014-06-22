document.write(
    '<div class="fotorama" id="fotorama">' +
        '<a href="http://s.fotorama.io/okonechnikov/1-lo.jpg"></a>' +
        '<a href="http://s.fotorama.io/nyc/thumbs/crazyjohn.jpg"></a>' +
    '</div>'
);

describe('Dimensions', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
  });

  it('fotorama’s dimensions are the dimensions of the first image (works only if script able to connect to the Internet)', function (done) {
    var $body = $('body'),
        $stage = $('.fotorama__stage', $fotorama);

    waitsFor(function () {
      return $stage.height() > 0
    }, function () {
      expect($stage.height()).toBeGreaterThan(0);
      expect($stage.width()).toEqual($body.width());
      expect($stage.height()).toEqual(Math.round($body.width()/(700/467)));

      done();
    });
  });
});