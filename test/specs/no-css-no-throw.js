document.write(
    '<div class="fotorama" data-auto="false" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/9-lo.jpg">' +
        '<img src="test/i/okonechnikov/6-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
    '</div>'
);

describe('No CSS, but no throw', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
  });

  it('initialized after .fotorama()', function () {
    $fotorama.fotorama();
  });

  it('no css here', function () {
    expect($('.fotorama__wrap', $fotorama).css('position')).toBe('static');
  });
});