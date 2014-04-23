document.write(
    '<div id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg">' +
        '<img src="test/i/okonechnikov/6-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
    '</div>'
);

describe('jQuery 1.6.4', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
    fotorama = fotorama || $fotorama.data('fotorama');
  });

  it('jQuery version is actually 1.6.4', function () {
    expect($fotorama.jquery).toBe('1.6.4');
  });

  it('...and it is to old, fotorama.js throws an exception', function (done) {
    $.ajax('out/fotorama.js', {
      success: function (script) {
        var tryToRunFotorama = function () {
          eval(script);
        };

        expect(tryToRunFotorama).toThrow();

        done();
      }
    });
  });
});