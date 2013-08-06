document.write(
    '<div class="fotorama" style="position: absolute;" data-auto="false" id="fotorama">' +
        '<a href="test/i/okonechnikov/1-lo.jpg"></a>' +
        '<a href="test/i/okonechnikov/2-lo.jpg"></a>' +
        '<a href="test/i/okonechnikov/9-lo.jpg"></a>' +
        '<a href="test/i/okonechnikov/6-lo.jpg"></a>' +
        '<a href="test/i/okonechnikov/5-lo.jpg"></a>' +
    '</div>'
);

describe('Initialization', function () {
  var $fotorama, fotorama;

  beforeEach(function () {
    $fotorama = $fotorama || $('#fotorama');
  });

  it('not initialized because of data-auto="false"', function () {
    expect($fotorama.data('fotorama')).toBeUndefined();
  });

  it('initialized after .fotorama()', function () {
    $fotorama.fotorama();
    // will fail without `.fotorama { min-width: 1px; }` because of visibility
    expect($fotorama.data('fotorama')).toBeDefined();
  });
});